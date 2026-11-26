export const writingArticles = [
  {
    slug: "rag-zero-to-hero",
    title: "RAG: Zero to Hero | From Naive RAG to Advanced RAG",
    summary:
      "Learn Retrieval-Augmented Generation (RAG) from scratch with Python in this comprehensive RAG tutorial. This hands-on guide takes you from Naive RAG to Advanced RAG and Modular RAG, explaining how RAG systems work internally and how to build them step by step.",
    metaDescription:
      "Learn Retrieval-Augmented Generation (RAG) from scratch with Python. This hands-on guide takes you from Naive RAG to Advanced RAG and Modular RAG.",
    youtubeId: "aenpTk8blIs",
    publishedAt: "2026-11-04",
    duration: "79:21",
    durationSeconds: 4761,
    durationIso: "PT1H19M21S",
    tags: ["RAG", "RAGTutorial", "Python", "GenerativeAI", "LLM"],
    stack: ["Python", "Scikit-learn", "FAISS", "Groq"],
    repoUrl:
      "https://colab.research.google.com/drive/1mnmYSLZqQSMRXXdvdJdZJnml7_PHgJrC?usp=sharing",
    references: [
      {
        label: "Original RAG paper (Lewis et al., 2020)",
        url: "https://arxiv.org/abs/2005.11401",
      },
      {
        label: "RAG survey (Gao et al., 2023)",
        url: "https://arxiv.org/abs/2312.10997",
      },
      {
        label: "Scikit-learn TF-IDF",
        url: "https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html",
      },
      {
        label: "Groq Cloud",
        url: "https://console.groq.com/",
      },
      {
        label: "Colab Notebooks",
        url: "https://colab.research.google.com/drive/1mnmYSLZqQSMRXXdvdJdZJnml7_PHgJrC?usp=sharing",
      },
    ],
    chapters: [
      {
        time: "00:00",
        seconds: 0,
        title: "Introduction: Overcoming LLM Hallucinations with RAG",
      },
      {
        time: "02:07",
        seconds: 127,
        title: "RAG System Architecture: Naive vs. Advanced vs. Modular",
      },
      {
        time: "02:45",
        seconds: 165,
        title: "Loading Raw Text Corpora & Preprocessing",
      },
      {
        time: "03:32",
        seconds: 212,
        title: "Text Chunking Strategies: Fixed-Window vs. Context Windows",
      },
      {
        time: "06:21",
        seconds: 381,
        title: "Sparse Retrieval: TF-IDF Vectorizer Implementation",
      },
      {
        time: "11:09",
        seconds: 669,
        title: "Vector Normalization & FAISS Indexing",
      },
      {
        time: "14:17",
        seconds: 857,
        title: "Query Vectorization & Top-K Retrieval",
      },
      {
        time: "18:11",
        seconds: 1091,
        title: "Prompt Engineering & LLM Context Augmentation",
      },
      {
        time: "23:42",
        seconds: 1422,
        title: "Chunk Optimization: Boundary Errors, Overlap & Word Truncation",
      },
      {
        time: "36:35",
        seconds: 2195,
        title: "Building the Naive RAG Pipeline",
      },
      {
        time: "39:58",
        seconds: 2398,
        title: "Advanced RAG: Query Rewriting & Expansion",
      },
      {
        time: "48:36",
        seconds: 2916,
        title: "Advanced RAG: Context Reranking & Noise Filtering",
      },
      {
        time: "55:51",
        seconds: 3351,
        title: "Benchmarking the Advanced RAG Pipeline",
      },
      {
        time: "58:14",
        seconds: 3494,
        title: "Modular RAG: Intent-Based Query Routing",
      },
      {
        time: "01:01:58",
        seconds: 3718,
        title: "Multi-Query Generation & Parallel Retrieval",
      },
      {
        time: "01:10:00",
        seconds: 4200,
        title: "Reciprocal Rank Fusion (RRF): Algorithm & Scoring",
      },
      {
        time: "01:14:05",
        seconds: 4445,
        title: "Integrating & Testing Modular RAG",
      },
      {
        time: "01:15:32",
        seconds: 4532,
        title: "Original RAG Paper vs. 2023 Survey: Design Tradeoffs",
      },
    ],
  },
];
