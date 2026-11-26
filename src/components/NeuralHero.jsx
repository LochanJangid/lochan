"use client";

import { useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

export default function NeuralHero({ onOpenTerminal, onOpenLab }) {
  const [profileImgSrc, setProfileImgSrc] = useState("/profile.jpg");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSnippetTab, setActiveSnippetTab] = useState("rag");

  const copyEmail = () => {
    spiderAudio.playHudClick();
    navigator.clipboard.writeText("lochanjangidcoder@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const SNIPPETS = {
    rag: {
      title: "Reciprocal Rank Fusion (Modular RAG)",
      file: "modular_rag.py",
      code: `def reciprocal_rank_fusion(results_by_retriever, k=60):
    rrf_score = collections.defaultdict(float)
    for retriever_results in results_by_retriever:
        for rank, doc in enumerate(retriever_results, start=1):
            rrf_score[doc.id] += 1.0 / (k + rank)
    return sorted(rrf_score.items(), key=lambda x: x[1], reverse=True)`,
      note: "From Chapter 16 of the 80-min YouTube Masterclass",
    },
    transformer: {
      title: "nanoCalc-GPT Target Reversal Loss",
      file: "nanocalc_attention.py",
      code: `class TargetReversalDecoder(nn.Module):
    # Predicts units first: '+' -> reversed digits -> '0'
    # Solves causal carry bottleneck in multi-digit addition
    def forward(self, x, targets=None):
        B, T = x.size()
        logits = self.transformer(x) # 6 layers, 4 heads
        loss = F.cross_entropy(logits.view(-1, C), targets.view(-1))
        return logits, loss # 99.51% Exact Match Accuracy`,
      note: "Eliminates right-to-left attention carry failures",
    },
    vision: {
      title: "DenseNet-121 Grad-CAM Localization",
      file: "chexnet_gradcam.py",
      code: `def compute_gradcam(model, image_tensor, target_pathology=3):
    features, logits = model.extract_dense_features(image_tensor)
    loss = logits[0, target_pathology]
    grads = torch.autograd.grad(loss, features)[0]
    weights = torch.mean(grads, dim=(2, 3), keepdim=True)
    cam = F.relu(torch.sum(weights * features, dim=1))
    return normalize_heatmap(cam) # Overlays on Chest X-Ray`,
      note: "Evaluated across 14 pulmonary conditions on NIH ChestX-ray14",
    },
  };

  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[430px_1fr] gap-6 lg:gap-8 items-start">
      {/* ---------------------------------------------------------
          LEFT COLUMN: PURPLE PROFILE IDENTITY CARD (#8584D5)
         --------------------------------------------------------- */}
      <div className="group relative overflow-hidden rounded-[32px] sm:rounded-[38px] bg-gradient-to-b from-[#8584D5] to-[#9574C4] p-6 sm:p-8 text-white shadow-[0_15px_40px_rgba(133,132,213,0.35)] transition-all duration-300 hover:shadow-[0_22px_50px_rgba(133,132,213,0.45)]">
        {/* Top header row */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase text-white backdrop-blur-md">
            <span>✦</span>
            <span>FIRST-PRINCIPLES AI</span>
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md font-mono text-xs font-bold">
            2026
          </span>
        </div>

        {/* Profile Avatar with Warm Yellow Ring */}
        <div className="my-7 flex justify-center">
          <div className="relative">
            {/* Contrasting warm yellow circular background (#FFC568) */}
            <div className="absolute -inset-2.5 rounded-full bg-[#FFC568] opacity-90 blur-[1px] transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute -inset-1 rounded-full border-2 border-white/60" />

            {/* Profile Image */}
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
              <img
                src={profileImgSrc}
                alt="Lochan Jangid - Machine Learning Engineer & Educator"
                onError={() =>
                  setProfileImgSrc("https://github.com/LochanJangid.png")
                }
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Floating YouTube channel badge */}
            <a
              href="https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ"
              target="_blank"
              rel="noreferrer"
              title="Visit Lochan's YouTube Channel"
              className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#DC2626] text-white shadow-lg border-2 border-white transition hover:scale-110"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Identity & Role */}
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#FFC568]">
            MACHINE LEARNING ENGINEER &amp; YOUTUBER
          </p>

          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            LOCHAN JANGID
          </h1>

          <p className="mt-3.5 font-sans text-sm sm:text-[15px] leading-relaxed text-white/95">
            Building practical machine learning systems at REGEx Software Services. Teaching deep learning from first principles on YouTube.
          </p>

          {/* Location & Organization Chips */}
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-mono">
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md text-white/90">
              📍 Jaipur, Rajasthan, India
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md text-white/90">
              ⚡ REGEx Software Services
            </span>
          </div>

          {/* YouTube Channel Promo Pill */}
          <div className="mt-5 rounded-2xl bg-white/15 border border-white/20 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-white font-bold text-xs shadow">
                ▶
              </span>
              <div>
                <span className="font-display text-xs font-bold text-white block">
                  @lochanjangidcoder
                </span>
                <span className="font-mono text-[10px] text-white/80">
                  ML Deep Dives From Scratch
                </span>
              </div>
            </div>

            <a
              href="https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-white px-3 py-1 font-display text-xs font-bold text-[#080808] transition hover:bg-[#FFC568]"
            >
              Subscribe ↗
            </a>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-5 border-t border-white/20 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={copyEmail}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 font-display text-xs sm:text-sm font-bold text-[#080808] shadow-md transition-all hover:bg-[#FFC568]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{copiedEmail ? "Email Copied to Clipboard! ✓" : "lochanjangidcoder@gmail.com"}</span>
            </button>

            <div className="flex gap-2 font-display text-xs font-semibold">
              <a
                href="https://github.com/LochanJangid"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-black/25 px-3 py-2 text-white backdrop-blur-md transition hover:bg-black/40"
              >
                <span>GitHub</span>
                <span className="font-mono text-[10px]">↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/lochan-jangid/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-black/25 px-3 py-2 text-white backdrop-blur-md transition hover:bg-black/40"
              >
                <span>LinkedIn</span>
                <span className="font-mono text-[10px]">↗</span>
              </a>

              <a
                href="https://colab.research.google.com/drive/1mnmYSLZqQSMRXXdvdJdZJnml7_PHgJrC?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-black/25 px-3 py-2 text-white backdrop-blur-md transition hover:bg-black/40"
              >
                <span>Colab</span>
                <span className="font-mono text-[10px]">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------
          RIGHT COLUMN: OVERSIZED "Portfolio." & CODE CONSOLE
         --------------------------------------------------------- */}
      <div className="flex flex-col gap-6">
        {/* Oversized Typography Heading */}
        <div className="rounded-[32px] sm:rounded-[40px] border border-[#E8E8E8] bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[92px] font-black tracking-tighter text-[#080808] leading-[0.88] select-none">
              Portfolio.
            </h2>

            <span className="rounded-full bg-[#FFC568] px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#080808] shadow-sm">
              ML Systems &amp; Research
            </span>
          </div>

          <h3 className="mt-5 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#080808] leading-tight">
            I Build Intelligent Systems. <br className="hidden sm:inline" />
            <span className="text-[#8584D5]">Then I Teach Them From Scratch.</span>
          </h3>

          <p className="mt-3.5 font-sans text-base sm:text-lg leading-relaxed text-[#555555] max-w-2xl">
            &ldquo;Models are only the beginning. The real work is understanding the problem, preparing the data, making the system reliable, exposing it through an API, deploying it, and making sure someone can actually use it.&rdquo;
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenLab}
              className="inline-flex items-center gap-2 rounded-full bg-[#080808] px-6 py-3 font-display text-xs sm:text-sm font-bold text-white shadow-md transition hover:bg-[#8584D5] hover:scale-105 active:scale-95"
            >
              <span>Explore Interactive Labs</span>
              <span aria-hidden="true">↓</span>
            </button>

            <a
              href="#youtube-studio"
              className="inline-flex items-center gap-2 rounded-full border border-[#DC2626]/30 bg-[#FEF2F2] px-6 py-3 font-display text-xs sm:text-sm font-bold text-[#DC2626] transition hover:bg-[#FEE2E2]"
            >
              <span>Watch 80-Min Masterclass</span>
              <span>▶</span>
            </a>
          </div>
        </div>

        {/* Interactive First-Principles Code Console (Light Theme) */}
        <div className="rounded-[28px] sm:rounded-[36px] border border-[#E5E5E5] bg-white p-5 sm:p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECECEC] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#080808]">
              <span className="h-2 w-2 rounded-full bg-[#8584D5]" />
              <span>FIRST-PRINCIPLES CODE ENGINE:</span>
            </div>

            {/* Tab switchers */}
            <div className="flex rounded-xl bg-[#F4F4F4] p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  spiderAudio.playHudClick();
                  setActiveSnippetTab("rag");
                }}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  activeSnippetTab === "rag"
                    ? "bg-white text-[#080808] shadow-sm font-bold"
                    : "text-[#666666] hover:text-[#080808]"
                }`}
              >
                RRF Fusion
              </button>
              <button
                type="button"
                onClick={() => {
                  spiderAudio.playHudClick();
                  setActiveSnippetTab("transformer");
                }}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  activeSnippetTab === "transformer"
                    ? "bg-white text-[#080808] shadow-sm font-bold"
                    : "text-[#666666] hover:text-[#080808]"
                }`}
              >
                Target Reversal
              </button>
              <button
                type="button"
                onClick={() => {
                  spiderAudio.playHudClick();
                  setActiveSnippetTab("vision");
                }}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  activeSnippetTab === "vision"
                    ? "bg-white text-[#080808] shadow-sm font-bold"
                    : "text-[#666666] hover:text-[#080808]"
                }`}
              >
                Grad-CAM
              </button>
            </div>
          </div>

          {/* Active Snippet Display in Clean Light Terminal */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#666666] mb-2">
              <span className="font-bold text-[#8584D5]">
                {SNIPPETS[activeSnippetTab].file}
              </span>
              <span>{SNIPPETS[activeSnippetTab].note}</span>
            </div>

            <pre className="overflow-x-auto rounded-2xl bg-[#080808] p-4 sm:p-5 font-mono text-xs text-[#E5E5E5] leading-relaxed shadow-inner">
              <code>{SNIPPETS[activeSnippetTab].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
