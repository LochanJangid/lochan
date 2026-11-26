"use client";

import Link from "next/link";
import { useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

export default function MonographView({ onSwitchMode }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    spiderAudio.playHudClick();
    navigator.clipboard.writeText("lochanjangidcoder@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl bg-white p-6 sm:p-12 md:p-16 rounded-[32px] border border-neutral-300 shadow-sm font-sans text-neutral-900">
      {/* Monograph Top Bar */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-6 text-xs font-mono">
        <div>
          <span className="font-bold">LOCHAN JANGID</span> — Machine Learning Engineer
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSwitchMode("neural")}
            className="rounded-full bg-neutral-900 px-3 py-1 font-bold text-white hover:bg-neutral-800"
          >
            ⚡ Neural Studio View
          </button>
        </div>
      </div>

      {/* Main Title & Statement */}
      <div className="mt-10">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Curriculum Vitae &amp; Selected Works
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-neutral-950 font-normal leading-tight">
          Machine Learning Systems &amp; First-Principles Education
        </h1>
        <p className="mt-4 font-serif text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-2xl">
          &ldquo;Models are only the beginning. The real work is understanding the problem, preparing the data, making the system reliable, exposing it through an API, deploying it, and making sure someone can actually use it.&rdquo;
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono">
          <span className="bg-neutral-100 px-3 py-1 rounded">Jaipur, Rajasthan, India</span>
          <span className="bg-neutral-100 px-3 py-1 rounded">REGEx Software Services</span>
          <a
            href="https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ"
            target="_blank"
            rel="noreferrer"
            className="bg-neutral-100 px-3 py-1 rounded text-red-700 font-bold hover:underline"
          >
            YouTube: @lochanjangidcoder ↗
          </a>
        </div>
      </div>

      {/* Section 1: Deep-Teaching & YouTube */}
      <section className="mt-12 border-t border-neutral-200 pt-8">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
          01 // Technical Education
        </span>
        <h2 className="mt-2 font-serif text-2xl font-bold text-neutral-950">
          Teaching Machine Learning Deeply From Scratch
        </h2>
        <p className="mt-3 text-sm text-neutral-700 leading-relaxed max-w-2xl">
          Creator of deep-dive video lectures demystifying complex artificial intelligence architectures without framework abstractions.
        </p>

        <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
            <span>MASTERCLASS LECTURE</span>
            <span>79:21 FULL RUNTIME</span>
          </div>
          <h3 className="mt-2 font-serif text-xl font-bold text-neutral-950">
            RAG: Zero to Hero | From Naive RAG to Advanced RAG
          </h3>
          <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
            Covers sparse TF-IDF, dense FAISS indexing, chunk boundary overlap, cross-encoder rerankers, and Reciprocal Rank Fusion without LangChain.
          </p>
          <div className="mt-4 flex gap-3 text-xs font-bold">
            <a
              href="https://www.youtube.com/watch?v=aenpTk8blIs"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-950 underline hover:text-blue-700"
            >
              Watch Lecture on YouTube ↗
            </a>
            <a
              href="https://colab.research.google.com/drive/1mnmYSLZqQSMRXXdvdJdZJnml7_PHgJrC?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 underline hover:text-neutral-950"
            >
              Colab Notebook ↗
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Production Systems Summary */}
      <section className="mt-12 border-t border-neutral-200 pt-8">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
          02 // Selected Works &amp; Systems
        </span>
        <h2 className="mt-2 font-serif text-2xl font-bold text-neutral-950">
          9 Verified Production Repositories
        </h2>

        <div className="mt-6 space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold">WebLens AI</h4>
              <span className="font-mono text-xs text-neutral-500">Multimodal Vision</span>
            </div>
            <p className="mt-1 text-xs text-neutral-600">
              Visual website audit studio powered by Playwright DOM extraction and multimodal LLMs.
            </p>
            <div className="mt-2 flex gap-3 text-xs font-mono">
              <Link href="/work/weblens-ai" className="underline font-bold">Case Study</Link>
              <a href="https://weblensai.vercel.app/" target="_blank" rel="noreferrer" className="underline">Live Demo ↗</a>
              <a href="https://github.com/LochanJangid/WebLens-AI" target="_blank" rel="noreferrer" className="underline">GitHub ↗</a>
            </div>
          </div>

          <div className="border-b border-neutral-100 pb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold">BankMarketer</h4>
              <span className="font-mono text-xs text-neutral-500">91.2% ROC-AUC</span>
            </div>
            <p className="mt-1 text-xs text-neutral-600">
              Term deposit propensity classification with SHAP waterfall explainability for financial analysts.
            </p>
            <div className="mt-2 flex gap-3 text-xs font-mono">
              <Link href="/work/bank-marketing" className="underline font-bold">Case Study</Link>
              <a href="https://github.com/LochanJangid/Bank-Marketing" target="_blank" rel="noreferrer" className="underline">GitHub ↗</a>
            </div>
          </div>

          <div className="border-b border-neutral-100 pb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold">MedicalAI</h4>
              <span className="font-mono text-xs text-neutral-500">DenseNet-121</span>
            </div>
            <p className="mt-1 text-xs text-neutral-600">
              CheXNet 121-layer DenseNet diagnostic engine identifying 14 pulmonary conditions with Grad-CAM heatmaps.
            </p>
            <div className="mt-2 flex gap-3 text-xs font-mono">
              <Link href="/work/medical-ai" className="underline font-bold">Case Study</Link>
              <a href="https://github.com/LochanJangid/medicalAI" target="_blank" rel="noreferrer" className="underline">GitHub ↗</a>
            </div>
          </div>

          <div className="border-b border-neutral-100 pb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold">nanoCalc-GPT</h4>
              <span className="font-mono text-xs text-neutral-500">99.51% Exact Match</span>
            </div>
            <p className="mt-1 text-xs text-neutral-600">
              1.2M parameter decoder-only transformer trained from scratch discovering arithmetic carry via target reversal.
            </p>
            <div className="mt-2 flex gap-3 text-xs font-mono">
              <Link href="/work/nanocalc-gpt" className="underline font-bold">Case Study</Link>
              <a href="https://github.com/LochanJangid/nanocalc-gpt" target="_blank" rel="noreferrer" className="underline">GitHub ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="mt-12 border-t border-neutral-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
        <div>
          lochanjangidcoder@gmail.com · Jaipur, India
        </div>
        <button
          type="button"
          onClick={copyEmail}
          className="rounded-full bg-neutral-900 px-4 py-2 font-bold text-white hover:bg-neutral-800"
        >
          {copied ? "Copied! ✓" : "Copy Email"}
        </button>
      </footer>
    </div>
  );
}
