# RAG From Scratch in Plain Python: Naive, Advanced and Modular

By Lochan Jangid

A language model answers from what it memorised during training. Ask about something it never saw, or something that changed after training, and it either guesses or goes stale. Retrieval-Augmented Generation (RAG) fixes this by fetching relevant text at question time and placing it in the prompt, so the model answers from evidence instead of memory.

This article builds RAG in plain Python in three stages: **Naive RAG**, **Advanced RAG** and **Modular RAG**. There is no LangChain or LlamaIndex, so every step is visible. The stack is small: TF-IDF for vectors, FAISS for search, and `openai/gpt-oss-20b` on Groq for generation, called through the OpenAI SDK.

Everything below comes from one notebook. Where its saved outputs show something useful, I quote them. Where the code has a flaw, I say so and show the fix.

## Setup

```bash
pip install scikit-learn faiss-cpu openai numpy
export GROQ_API_KEY="your-key"
```

```python
import os
import faiss
from openai import OpenAI
from sklearn.feature_extraction.text import TfidfVectorizer

client = OpenAI(
    api_key=os.environ["GROQ_API_KEY"],
    base_url="https://api.groq.com/openai/v1",
)
MODEL = "openai/gpt-oss-20b"
```

Read the key from an environment variable. API keys pasted into notebook cells end up in shared notebooks, screenshots and videos. If one has ever been pasted into a notebook you shared, revoke it and create a new one.

Groq exposes an OpenAI-compatible endpoint, which is why the standard `OpenAI` client works with only a different `base_url`. Calls use the Responses API: `client.responses.create(input=..., model=...).output_text`.

## The knowledge base

The knowledge base is one plain-text file: a RAG-friendly story guide to *The Amazing Spider-Man* films, written as an original summary. Any text file works.

A detail about the notebook: its first cell writes a longer version of the guide and prints a length of 26,226 characters. The later class runs load a 12,145-character version of the file. The numbers below (13 chunks, 542 terms) belong to that 12,145-character version.

## Naive RAG

Naive RAG has three steps: **index** the document, **retrieve** the chunks closest to the question, and **generate** an answer from them. The alternative is pasting the whole document into every prompt, which wastes tokens on text that has nothing to do with the question.

### Step 1: Chunking

The notebook tries three chunkers, and the differences teach more than the final one.

**Attempt 1: fixed-size slicing.**

```python
chunk_size = 200
chunks = [document[i:i+chunk_size] for i in range(0, len(document), chunk_size)]
```

This gives 61 chunks. It is fast and it cuts blindly: a sentence can be split in half, and a word can be split in the middle. TF-IDF then sees broken fragments as separate terms.

**Attempt 2: paragraph-aware chunking with overlap.** The idea is to build each chunk from whole lines and start the next chunk with a short overlap from the end of the previous one, beginning on a word boundary so no word is cut.

```python
paragraphs = [line.strip() for line in document.split("\n") if line.strip()]
new_chunks, current = [], ""
for para in paragraphs:
    if len(para) + len(current) <= 200:
        current += para + "\n"
    else:
        new_chunks.append(current)
        i = 50
        while current[-i-1] != " ":
            i += 1
        current = current[-i:]
```

The notebook reports 63 chunks. The loop has two problems, though. In the `else` branch, the line that triggered the flush is never added to `current`, so it is lost. And the last `current` is never appended after the loop. In a quick test on 12 synthetic lines, this loop kept only 7 of them.

The saved retrieval output shows the symptom. One retrieved chunk reads *"He understands that he"* followed directly by *"life he has."*, a jump in the middle of a sentence. This is the paragraph that went missing.

The fix is to flush first, then always add the current line, then append the remainder:

```python
for para in paragraphs:
    if current and len(current) + len(para) > 200:
        new_chunks.append(current)
        i = 50
        while i < len(current) and current[-i-1] != " ":
            i += 1
        current = current[-i:]
    current += para + "\n"
if current.strip():
    new_chunks.append(current)
```

On the same 12-line test, the fixed version keeps all 12 lines.

**Attempt 3: word windows (used by the `NaiveRag` class).** The class chunks by words instead of characters:

```python
words = self.document.split()
chunks, start = [], 0
while start < len(words):
    end = start + self.chunk_size          # 200 words
    chunks.append(" ".join(words[start:end]))
    if end >= len(words):
        break
    start = end - self.overlap_size        # step back 50 words
```

This is a sliding window: each chunk is 200 words and neighbouring chunks share 50 words, so a fact near a boundary appears in two chunks. It never cuts a word, because it splits on whitespace. Note the unit change: `chunk_size=200` meant 200 characters in the step-by-step cells and means 200 words in the class. On the 12,145-character document the class produces 13 chunks, and from here on every number refers to those 13.

Whitespace splitting also flattens line breaks, so each chunk becomes one line of text.

### Step 2: TF-IDF vectors

```python
vectorizer = TfidfVectorizer(stop_words="english")
vectors = vectorizer.fit_transform(chunks).toarray().astype("float32")
```

TF-IDF scores each word by how often it appears in a chunk (term frequency) and down-weights words that appear in many chunks (inverse document frequency). `stop_words="english"` drops words like "the".

The notebook prints the shape `(13, 542)`: 13 chunks, each described over 542 distinct terms. These vectors are sparse and lexical. They are not learned embeddings, so a query only matches chunks that share its words.

### Step 3: Indexing with FAISS

```python
faiss.normalize_L2(vectors)
index = faiss.IndexFlatIP(vectors.shape[1])
index.add(vectors)
```

`normalize_L2` scales each vector to length 1. `IndexFlatIP` ranks by inner product, and for unit-length vectors the inner product equals cosine similarity. A good mental picture: each chunk is a point in a 542-dimensional space, and search returns the k points pointing in the most similar direction to the query.

`TfidfVectorizer` already returns L2-normalised rows by default, so this call changes nothing for TF-IDF. Keep it anyway: you will need it the day you swap in dense embeddings.

### Step 4: Retrieve and generate

```python
def retrieve(self, query):
    q = self.vectorizer.transform([query]).toarray().astype("float32")
    faiss.normalize_L2(q)
    scores, indices = self.index.search(q, min(self.top_k, len(self.chunks)))
    return [
        {"chunk": self.chunks[idx], "score": float(score)}
        for score, idx in zip(scores[0], indices[0]) if idx != -1
    ]
```

The query goes through the same fitted vectorizer. Words that were not in the chunks are ignored. Generation then puts the retrieved chunks in a prompt that forbids outside knowledge:

```python
prompt = f"""
You are a helpful question-answering assistant.

Answer the question using ONLY the provided context.

If the answer is not present in the context,
respond with: I don't know based on the provided document.

Context:
{context}

Question:
{query}

Answer:
"""
```

That "say you don't know" instruction is what keeps the model grounded in the context instead of answering from memory. The notebook wraps all of this in a `NaiveRag` class with `load_document`, `chunk_document`, `vectorize`, `create_index`, `retrieve` and `generate_answer` methods, plus a `build()` that runs the first four in order. For `"who is spider man?"` the saved output is a one-line answer: `Peter Parker.`

A useful comparison is the early cell where the notebook sends the retrieved text to the model. That answer is a longer, vaguer paragraph. The stricter prompt in the class produced the short, grounded one.

One limit to notice: top-3 of 13 chunks is about 23% of the document. With chunks this large, retrieval is not very selective yet. Smaller chunks or a larger document would show retrieval doing more work.

## Advanced RAG

Advanced RAG keeps the same index and adds steps **before** and **after** retrieval. The notebook's `AdvancedRag` class inherits from `NaiveRag`, so chunking, vectors and the index are reused unchanged.

### Pre-retrieval: query rewriting

A user's question is often a weak search query. The model rewrites it to match the document's vocabulary:

```python
prompt = f"""
You are a query optimization system for RAG.

Rewrite the user's question to improve document retrieval.

Instructions:
- Preserve the original meaning.
- Add useful keywords and context.
- Make the query clear and specific.
- Do not answer the question.
- Return only the rewritten query.

Original query:
{query}

Rewritten query:
"""
```

In the saved output, `"who is spiderman?"` becomes `Identity of Spider-Man (Peter Parker)`. The instruction "do not answer the question" matters: a rewriter that answers would put hallucinated words into your search.

### Retrieval

Retrieval runs with the **rewritten** query. The Advanced class uses `top_k=5`, so five chunks come back.

### Post-retrieval: context refinement

The retrieved chunks go to the model again, this time to keep only what helps answer the question:

```python
prompt = f"""
You are a context refinement system in an Advanced RAG pipeline.

Instructions:
1. Identify information relevant to the question.
2. Remove irrelevant information and noise.
3. Preserve important facts and details.
4. Do not introduce new information.
5. Do not answer the question.
6. If no relevant information exists, return: NO_RELEVANT_CONTEXT

Original Question:
{query}

Retrieved Chunks:
{content}

Refined Context:
"""
```

The `NO_RELEVANT_CONTEXT` sentinel is a small but important design choice. The generation step checks for it and short-circuits:

```python
def generate_answer(self, query, context):
    if not context or context == "NO_RELEVANT_CONTEXT":
        return "I don't know based on the provided document."
    ...
```

When retrieval finds nothing useful, the pipeline refuses without making a final model call and without a chance to invent an answer.

### The full pipeline

```python
def ask(self, query):
    rewritten_query = self.rewrite_query(query)
    retrieved_chunks = self.retrieve(rewritten_query)
    refined_context = self.post_retrieval(query, retrieved_chunks)
    answer = self.generate_answer(query, refined_context)
    return {
        "original_query": query,
        "rewritten_query": rewritten_query,
        "retrieved_chunks": retrieved_chunks,
        "refined_context": refined_context,
        "answer": answer,
    }
```

The answer in the saved output reads: Spider-Man is Peter Parker, the two identities are inseparable, Peter chooses to help others even when the world is against him, and his parents, Richard and Mary Parker, left him in the care of a guardian. Every part of that traces to the retrieved chunks.

Two honest notes about this class:

- The constructor takes a `final_top_k=3` argument and stores it, but nothing uses it. All five retrieved chunks go to the refinement step. Either apply it or remove it.
- Every question now costs **three** model calls (rewrite, refine, answer) instead of one. Quality has a price in latency and money.

Also, a refinement step that rewrites chunks means the final context may be paraphrased, not quoted. If you need exact citations, have the model return chunk ids instead and keep the original text.

## Modular RAG

Modular RAG treats the pipeline as a set of modules you can add, remove or reorder. The notebook adds two on top of Advanced RAG, again by inheritance: `ModularRAG(AdvancedRag)`.

### Module 1: Routing

Not every question needs the document. A router asks the model to decide:

```python
def routing(self, query):
    prompt = f"""
    Decide whether the question requires searching
    the Spider-Man document.

    Return DOC if document retrieval is required.
    Return CHAT if general knowledge is sufficient.

    Question: {query}

    Return only DOC or CHAT.
    """
    result = self.call_llm(prompt).strip().upper()
    return "CHAT" if result == "CHAT" else "DOC"
```

The last line is a safe default: anything other than an exact `CHAT` falls back to `DOC`. If the model's reply is messy, you retrieve unnecessarily, which is cheaper than skipping retrieval when you needed it.

### Module 2: Multi-query fusion with Reciprocal Rank Fusion

One query is one guess at the right wording. Fusion asks the model for three variants, searches each one, and merges the ranked lists.

```python
def generate_queries(self, query):
    output = self.call_llm(
        f"Generate 3 different search queries based on this user question: {query}\n"
        "Return each query on a separate line. Do not number them."
    )
    queries = [line.strip().lstrip("0123456789.-) ")
               for line in output.splitlines() if line.strip()]
    queries.append(query)                       # keep the original too
    return list(dict.fromkeys(queries))         # drop duplicates, keep order
```

The `lstrip` removes numbering the model adds despite being told not to. `dict.fromkeys` removes duplicate queries while preserving order.

The merge uses **Reciprocal Rank Fusion (RRF)**. A chunk's score is the sum of `1 / (60 + rank)` over every list it appears in, with ranks starting at 1:

```python
for search_query in multi_queries:
    results = self.retrieve(search_query)
    for rank, item in enumerate(results[:k], start=1):
        chunk = item["chunk"]
        scores[chunk] = scores.get(chunk, 0.0) + 1 / (60 + rank)
        documents[chunk] = item

ranked = sorted(scores, key=lambda c: scores[c], reverse=True)
```

RRF uses ranks, not raw scores, so it does not matter that different queries produce scores on different scales. A chunk that appears near the top of several lists beats a chunk that is first in only one. With four queries (three generated plus the original), the best possible score is 4/61, about 0.0656.

Two details worth knowing:

- The earlier standalone `fusion` function in the notebook uses `enumerate(latest_chunk)`, which starts ranks at 0 and so computes `1 / (60 + 0)` for the first result. The class version uses `start=1`, which is the standard formulation. Use the class version.
- The scores that come out of `fusion` are RRF scores, but `post_retrieval` prints them under the label "Similarity Score". On the Modular path that label is misleading: these values are small (a few hundredths) and are not cosine similarities.

### The full pipeline

```python
def ask(self, query):
    route = self.routing(query)
    if route == "CHAT":
        answer = self.call_llm(f"Answer this question directly: {query}")
        return {"route": "CHAT", "answer": answer, "sources": []}

    retrieved_chunks = self.fusion(query, k=3)
    context = self.post_retrieval(query, retrieved_chunks)   # inherited
    answer = self.generate_answer(query, context)            # inherited
    return {"route": "DOC", "answer": answer,
            "sources": retrieved_chunks, "context": context}
```

This is what modularity buys you. Refinement and generation are inherited unchanged; only the front of the pipeline is new. The `CHAT` path costs two model calls (route, answer). The `DOC` path costs four (route, query generation, refinement, answer).

### Running it on an unanswerable question

The notebook ends with the most revealing test:

```python
rag = ModularRAG(
    document_path="amazing-spideey.txt",
    chunk_size=200, overlap_size=50, top_k=5, final_top_k=3,
)
rag.build()
result = rag.ask("What happened to Spider-Man yesterday?")
```

The saved output: the route is `DOC`, and the answer is `I don't know based on the provided document.`

This is the correct behaviour. The question names Spider-Man, so the router sends it to the document. The document is a summary of two films and says nothing about "yesterday". Retrieval returns chunks that mention Spider-Man, but none answers the question, and the grounding instructions in the refinement and generation prompts make the model refuse instead of making something up. A system that says "I don't know" here is working.

## What the notebook teaches, and what it does not

- **Chunking decides retrieval quality.** The 200-character slicer, the buggy paragraph chunker and the word-window class each produce different chunks from the same document. Print your chunks and read them before blaming the model.
- **Prompts do real work.** Three short instructions ("use only the context", "say you don't know", "return NO\_RELEVANT\_CONTEXT") are what turn a fluent model into a grounded one.
- **Each module adds a model call.** Naive RAG uses one call, Advanced RAG three, Modular RAG up to four. Add a module only when it fixes a failure you have seen.
- **TF-IDF is lexical.** It cannot match "automobile" to "car". The natural next step is dense embeddings: replace the vectorizer with an embedding model and keep the FAISS index and the `retrieve` interface.
- **There is no evaluation yet.** A few questions working is not evidence. Build a small set of questions with known source chunks and measure how often retrieval finds them before and after each change.
- **The corpus is tiny.** One short document hides problems that appear at scale, such as duplicate chunks, mixed formats and stale data.

## Full tutorial

The video walks through all of this step by step: [RAG: Zero to Hero | From Naive RAG to Advanced RAG](https://www.youtube.com/watch?v=aenpTk8blIs).
