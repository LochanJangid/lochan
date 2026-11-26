"use client";

import { useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

const SAMPLE_DOCS = [
  {
    id: "doc-1",
    title: "Lewis et al. (2020) RAG Foundation",
    text: "Retrieval-Augmented Generation combines parametric memory (pre-trained seq2seq model) with non-parametric memory (dense vector index of Wikipedia accessed via DPR).",
    keywords: ["rag", "parametric", "dense", "wikipedia", "dpr", "retrieval"],
    rawScore: 0.94,
    rrfRank: 1,
  },
  {
    id: "doc-2",
    title: "Gao et al. (2023) Modular RAG Survey",
    text: "Modular RAG establishes routing, query rewriting, expansion, and fusion patterns beyond naive top-k vector similarity to prevent hallucination in multi-hop reasoning.",
    keywords: ["modular", "routing", "rewriting", "fusion", "survey", "multihop"],
    rawScore: 0.88,
    rrfRank: 2,
  },
  {
    id: "doc-3",
    title: "FAISS Vector Indexing & Cosine Normalization",
    text: "L2 normalization before IndexFlatIP converts inner product computations into exact cosine similarity matrices in sub-millisecond latency on high-dimensional embeddings.",
    keywords: ["faiss", "normalization", "cosine", "vector", "index", "latency"],
    rawScore: 0.82,
    rrfRank: 3,
  },
  {
    id: "doc-4",
    title: "Chunk Overlap & Boundary Truncation",
    text: "Fixed-window chunking without sentence boundary awareness causes split semantic entities. Overlap windows of 15-20% maintain cross-chunk narrative continuity.",
    keywords: ["chunk", "overlap", "boundary", "window", "semantic", "continuity"],
    rawScore: 0.74,
    rrfRank: 4,
  },
];

const PRESET_QUERIES = [
  "How does FAISS achieve exact cosine similarity?",
  "What is the difference between Naive RAG and Modular RAG?",
  "Why is chunk boundary overlap critical for retrieval?",
  "How does Reciprocal Rank Fusion combine multi-query results?",
];

export default function InteractiveRagLab({ onDiscovery }) {
  const [activeTab, setActiveTab] = useState("modular"); // "naive" | "advanced" | "modular"
  const [query, setQuery] = useState(PRESET_QUERIES[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [rerankMultiplier] = useState(1.2);
  const [rrfK] = useState(60);

  const handleSimulate = (selectedQuery = query) => {
    spiderAudio.playNeuralChirp(580);
    setIsSimulating(true);
    setQuery(selectedQuery);
    setTimeout(() => {
      setIsSimulating(false);
      spiderAudio.playNeuralChirp(880);
      if (onDiscovery) onDiscovery("rag");
    }, 450);
  };

  const calculateScore = (doc) => {
    if (activeTab === "naive") {
      return (doc.rawScore * 0.9).toFixed(3);
    }
    if (activeTab === "advanced") {
      return Math.min(0.999, doc.rawScore * rerankMultiplier).toFixed(3);
    }
    // modular: RRF formula S = 1 / (k + rank)
    const rrfScore = 1 / (rrfK + doc.rrfRank);
    return (rrfScore * 10).toFixed(4);
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#E5E5E5] bg-white p-6 sm:p-8 text-[#080808] shadow-sm">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0F0F0] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#8584D5]">
            <span className="flex h-2 w-2 rounded-full bg-[#8584D5] animate-ping" />
            <span>LIVE INTERACTIVE ALGORITHM SANDBOX // 01</span>
          </div>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-black tracking-tight text-[#080808]">
            From-Scratch RAG Simulator
          </h3>
          <p className="mt-1 font-sans text-xs sm:text-sm text-[#555555] max-w-2xl leading-relaxed">
            Derived directly from Lochan&rsquo;s 80-minute YouTube lecture. Explore how raw vector similarity transforms into multi-hop Modular RAG without black-box framework abstractions.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex rounded-xl bg-[#F4F4F4] p-1 font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              spiderAudio.playHudClick();
              setActiveTab("naive");
            }}
            className={`rounded-lg px-3 py-1.5 transition ${
              activeTab === "naive"
                ? "bg-white text-[#080808] shadow-sm"
                : "text-[#666666] hover:text-[#080808]"
            }`}
          >
            Naive RAG
          </button>
          <button
            type="button"
            onClick={() => {
              spiderAudio.playHudClick();
              setActiveTab("advanced");
            }}
            className={`rounded-lg px-3 py-1.5 transition ${
              activeTab === "advanced"
                ? "bg-white text-[#080808] shadow-sm"
                : "text-[#666666] hover:text-[#080808]"
            }`}
          >
            Advanced RAG
          </button>
          <button
            type="button"
            onClick={() => {
              spiderAudio.playHudClick();
              setActiveTab("modular");
            }}
            className={`rounded-lg px-3 py-1.5 transition ${
              activeTab === "modular"
                ? "bg-[#8584D5] text-white shadow-sm"
                : "text-[#666666] hover:text-[#080808]"
            }`}
          >
            Modular RRF
          </button>
        </div>
      </div>

      {/* Query Bar & Presets */}
      <div className="mt-6 space-y-3">
        <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider">
          Select or Type Retrieval Prompt:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter technical query..."
              className="w-full rounded-xl border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 font-mono text-xs sm:text-sm text-[#080808] placeholder-[#888888] focus:border-[#8584D5] focus:bg-white focus:outline-none"
            />
            {isSimulating && (
              <span className="absolute right-3 top-3 font-mono text-xs text-[#8584D5] font-bold animate-pulse">
                Vectorizing...
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleSimulate()}
            disabled={isSimulating}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#080808] px-5 py-3 font-display text-xs sm:text-sm font-bold text-white shadow-md transition hover:bg-[#8584D5] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Execute Vector Retrieval</span>
            <span aria-hidden="true">⚡</span>
          </button>
        </div>

        {/* Preset query chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
          <span className="text-[#888888]">Presets:</span>
          {PRESET_QUERIES.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSimulate(p)}
              className="rounded-full border border-[#EAEAEA] bg-[#F8F8F8] px-2.5 py-1 text-[#555555] transition hover:border-[#8584D5] hover:bg-[#F0EFFE] hover:text-[#080808]"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Stage Pipeline View */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
        <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-3.5">
          <span className="text-[#8584D5] font-bold">STAGE 1: EMBED &amp; INDEX</span>
          <p className="mt-1 text-[#444444] font-sans">
            {activeTab === "naive"
              ? "TF-IDF Sparse + Scikit-Learn L2 normalization"
              : activeTab === "advanced"
              ? "Query Rewriter + Dense Multi-Hop expansion"
              : "Parallel Vector Queues (FAISS IndexFlatIP)"}
          </p>
          <div className="mt-2 text-[10px] text-[#888888]">
            Lecture ref: 06:21 &amp; 11:09
          </div>
        </div>

        <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-3.5">
          <span className="text-[#10b981] font-bold">STAGE 2: SCORING ENGINE</span>
          <p className="mt-1 text-[#444444] font-sans">
            {activeTab === "naive"
              ? "Single-pass Cosine Similarity: dot(q, d) / (||q|| * ||d||)"
              : activeTab === "advanced"
              ? "Cross-Encoder Rescoring + Noise Penalty Filter"
              : `Reciprocal Rank Fusion: S = ∑ 1 / (${rrfK} + r)`}
          </p>
          <div className="mt-2 text-[10px] text-[#888888]">
            Lecture ref: 48:36 &amp; 01:10:00
          </div>
        </div>

        <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-3.5">
          <span className="text-[#9574C4] font-bold">STAGE 3: CONTEXT SYNTHESIS</span>
          <p className="mt-1 text-[#444444] font-sans">
            Filtered top-k chunks bounded by token window and fed to Groq LLaMA-3 with hallucination prevention prompts.
          </p>
          <div className="mt-2 text-[10px] text-[#888888]">
            Lecture ref: 18:11 &amp; 01:14:05
          </div>
        </div>
      </div>

      {/* Live Chunk Ranking Output */}
      <div className="mt-6">
        <div className="flex items-center justify-between pb-2">
          <span className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider">
            Vector Chunks Retrieved // Top-K Ranking
          </span>
          <span className="font-mono text-[11px] text-[#8584D5] font-semibold">
            {activeTab === "modular" ? "RRF Fusion Active" : "Cosine Top-K"}
          </span>
        </div>

        <div className="space-y-2.5">
          {SAMPLE_DOCS.map((doc, idx) => {
            const score = calculateScore(doc);
            const percentage =
              activeTab === "modular"
                ? Math.min(100, Math.round(score * 580))
                : Math.round(score * 100);

            return (
              <div
                key={doc.id}
                className="group rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-4 transition duration-200 hover:border-[#8584D5] hover:bg-white shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#8584D5]/10 font-mono text-xs font-bold text-[#8584D5] border border-[#8584D5]/20">
                      #{idx + 1}
                    </span>
                    <h4 className="font-display text-sm font-bold text-[#080808] group-hover:text-[#8584D5] transition">
                      {doc.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-[#666666]">
                      Score: <strong className="text-[#080808]">{score}</strong>
                    </span>
                    <span className="rounded-full bg-[#EAF7F5] border border-[#D5EFEA] px-2.5 py-0.5 text-[10px] font-bold text-[#080808]">
                      Match: {percentage}%
                    </span>
                  </div>
                </div>

                <p className="mt-2 font-sans text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {doc.text}
                </p>

                {/* Visual Similarity Score Bar */}
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#8584D5] to-[#A5DAD4] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* YouTube Masterclass Integration Card */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#FEE2E2] bg-[#FEF2F2] p-4 text-xs font-sans">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DC2626] text-white font-bold shadow-md">
            ▶
          </div>
          <div>
            <span className="font-mono font-bold text-[#991B1B] uppercase tracking-wider block">
              Want to see this built in pure Python?
            </span>
            <p className="text-[#7F1D1D] mt-0.5">
              Lochan Jangid teaches all 18 chapters of this system from raw math on YouTube.
            </p>
          </div>
        </div>

        <a
          href="https://www.youtube.com/watch?v=aenpTk8blIs"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#080808] px-4 py-2 font-display text-xs font-bold text-white shadow transition hover:bg-[#DC2626]"
        >
          <span>Watch 80-Min Masterclass</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}
