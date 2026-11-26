"use client";

import { burstConfetti } from "../utils/confetti";

export default function StorySection() {
  const cards = [
    {
      role: "01 // THE MATHEMATICIAN",
      title: "Math Foundations in Hindi Medium",
      boxClass: "box-aqua",
      tiltClass: "box-tilt-left",
      emoji: "📐",
      body:
        "BSc Mathematics from the University of Kota, studied in Hindi medium. Rigorously grounded in abstract algebra, real analysis, and partial differential equations (PDEs). These mathematical foundations translate directly into how I reason about high-dimensional embedding spaces, gradient dynamics, and loss manifolds.",
      highlights: ["Abstract Algebra", "Real Analysis", "PDEs", "University of Kota"],
    },
    {
      role: "02 // THE DEVELOPER",
      title: "Self-Taught Python & SQL Systems",
      boxClass: "box-sun",
      tiltClass: "box-tilt-right",
      emoji: "⚙️",
      body:
        "Self-taught developer with a non-CS degree, mastering Python and SQL through disciplined hands-on execution. Currently learning as an AI/ML intern at Regex Software Services (with 11+ months tenure developing production ML pipelines). I implement from-scratch transformers, autograd engines, and high-throughput APIs.",
      highlights: ["Self-Taught Python", "Relational SQL", "Regex Software Services", "PyTorch Systems"],
    },
    {
      role: "03 // THE EDUCATOR",
      title: "Every Project Becomes a Video",
      boxClass: "box-pink",
      tiltClass: "box-tilt-left",
      emoji: "🎙️",
      body:
        "Creator behind @lochanjangidcoder on YouTube. My core operating principle is that every project becomes a comprehensive video lesson, breaking down architectures—from TF-IDF sparse retrieval to FAISS indexing and causal self-attention—line by line without skipping mathematical mechanics.",
      highlights: ["Every Project a Video", "@lochanjangidcoder", "79-Min RAG Tutorial", "PyPI Author"],
    },
  ];

  return (
    <section id="story" className="mx-auto max-w-6xl px-4 sm:px-6 section-gap">
      {/* Section Header */}
      <div className="mb-8">
        <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)]">
          // 03 // Story &amp; Philosophy
        </div>
        <h2 className="mt-1 font-sans text-3xl sm:text-4xl font-black text-[var(--ink)] tracking-tight">
          Behind the lab notebook
        </h2>
        <div className="rainbow-bar mt-3" />
      </div>

      {/* Three Colored Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            tabIndex={0}
            role="article"
            onClick={(e) => burstConfetti(e, [card.emoji, "✨", "💡"])}
            className={`box ${card.boxClass} ${card.tiltClass} p-6 sm:p-7 flex flex-col justify-between text-[#1b1840] cursor-pointer`}
          >
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#1b1840]/20 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1b1840]">
                  {card.role}
                </span>
                <span className="text-2xl spin-on-hover select-none" aria-hidden="true">
                  {card.emoji}
                </span>
              </div>

              <h3 className="mt-4 font-sans text-xl sm:text-2xl font-black text-[#1b1840] leading-snug">
                {card.title}
              </h3>

              <p className="mt-3 font-sans text-sm sm:text-base text-[#1b1840] leading-relaxed">
                {card.body}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-[#1b1840]/20 flex flex-wrap gap-1.5 font-mono text-xs">
              {card.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-md border border-[#1b1840] bg-white/80 px-2 py-0.5 font-bold text-[#1b1840]"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
