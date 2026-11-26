"use client";

import { useState } from "react";
import Link from "next/link";
import { burstConfetti } from "../utils/confetti";

export const PROJECTS = [
  {
    id: "nanocalc-gpt",
    title: "nanoCalc-GPT",
    category: "Deep Learning",
    emoji: "🔢",
    tileBg: "bg-[var(--sun)]",
    status: null,
    problem: "Left-to-right transformers fail when carries propagate right-to-left.",
    built: "Decoder transformer trained with reversed targets, achieving 0.977 test match.",
    metric: "0.977 Match",
    tech: ["PyTorch", "Decoder", "Causal Attention", "AdamW"],
    customViz: "nanocalc",
    links: [
      { label: "Case Study", url: "/work/nanocalc-gpt", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/nanocalc-gpt", isExternal: true },
    ],
  },
  {
    id: "lochan-eda",
    title: "lochan_eda",
    category: "Open Source & Tools",
    emoji: "📦",
    tileBg: "bg-[var(--aqua)]",
    status: "Shipped",
    problem: "Repetitive data profiling easily introduces subtle data leakage.",
    built: "Automated EDA & preprocessing library on PyPI with leakage prevention.",
    metric: "v0.2.0 PyPI",
    tech: ["Python", "Pandas", "Matplotlib", "PyPI"],
    customViz: "lochan-eda",
    links: [
      { label: "11-P Docs", url: "/work/lochan-eda/docs", isExternal: false },
      { label: "Case Study", url: "/work/lochan-eda", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/lochan_eda", isExternal: true },
    ],
  },
  {
    id: "gradlab",
    title: "gradlab",
    category: "Deep Learning",
    emoji: "🔬",
    tileBg: "bg-[var(--pink)]",
    status: null,
    problem: "Understanding backpropagation without high-level library wrappers.",
    built: "Scalar autograd engine with built-in diagnostics and MLP classifiers from scratch.",
    metric: "Autograd",
    tech: ["Python", "NumPy", "PyTorch", "Diagnostics"],
    customViz: "gradlab",
    links: [
      { label: "GitHub", url: "https://github.com/LochanJangid", isExternal: true },
    ],
  },
  {
    id: "mnist",
    title: "Digit Recognition",
    category: "Deep Learning",
    emoji: "✏️",
    tileBg: "bg-[var(--aqua)]",
    status: "Shipped",
    problem: "Connecting PyTorch neural weights to an interactive web drawing canvas.",
    built: "Neural classifier transforming drawn strokes into 784 features with sub-50ms inference.",
    metric: "784→10",
    tech: ["Python", "PyTorch", "Canvas API", "FastAPI"],
    links: [
      { label: "Draw Live", url: "/work/mnist#demo", isExternal: false },
      { label: "Case Study", url: "/work/mnist", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/MNIST", isExternal: true },
    ],
  },
  {
    id: "zero-sql",
    title: "ZeroSQL",
    category: "Open Source & Tools",
    emoji: "🗄️",
    tileBg: "bg-[var(--pink)]",
    status: "In Progress",
    problem: "Querying databases via natural language without leaking private credentials.",
    built: "Desktop studio where an LLM writes SQL guided by RAG schema rules.",
    metric: "SQLite First",
    tech: ["Electron", "React", "FastAPI", "SQLite"],
    links: [
      { label: "Web Client", url: "https://zero-sql.vercel.app", isExternal: true },
      { label: "Case Study", url: "/work/zero-sql", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/zero_sql", isExternal: true },
    ],
  },
  {
    id: "auditor-ai",
    title: "auditor.ai",
    category: "GenAI & Multimodal",
    emoji: "🔍",
    tileBg: "bg-[var(--sun)]",
    status: "In Progress",
    problem: "Web audits give opaque scores without citing verified technical standards.",
    built: "AI auditor retrieving web standards via RAG and proposing automated code fixes.",
    metric: "Evidence RAG",
    tech: ["RAG", "Multimodal", "FastAPI", "Standards"],
    links: [
      { label: "GitHub", url: "https://github.com/LochanJangid", isExternal: true },
    ],
  },
  {
    id: "bank-marketing",
    title: "BankMarketer",
    category: "ML Systems & APIs",
    emoji: "📈",
    tileBg: "bg-[var(--periwinkle)]",
    status: "In Progress",
    problem: "Classifying customer term-deposit propensity with explainable features.",
    built: "Logistic regression on 45,211 Portuguese bank records with SHAP explainability.",
    metric: "45,211 Rows",
    tech: ["Scikit-Learn", "FastAPI", "SHAP", "Docker"],
    links: [
      { label: "Case Study", url: "/work/bank-marketing", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/Bank-Marketing", isExternal: true },
      { label: "API Docs", url: "https://bankmarketing-ml.onrender.com/docs", isExternal: true },
    ],
  },
  {
    id: "medical-ai",
    title: "MedicalAI",
    category: "Deep Learning",
    emoji: "🩻",
    tileBg: "bg-[var(--aqua)]",
    status: null,
    problem: "Explaining chest X-ray deep learning classifications with visual proof.",
    built: "CheXNet 121-layer DenseNet identifying 14 pulmonary pathologies with Grad-CAM.",
    metric: "14 Classes",
    tech: ["PyTorch", "DenseNet-121", "Grad-CAM", "FastAPI"],
    links: [
      { label: "Web Studio", url: "https://medicalai.vercel.app/", isExternal: true },
      { label: "Case Study", url: "/work/medical-ai", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/medicalAI", isExternal: true },
    ],
  },
  {
    id: "weblens-ai",
    title: "WebLens AI",
    category: "GenAI & Multimodal",
    emoji: "🌐",
    tileBg: "bg-[var(--sun)]",
    status: null,
    problem: "Multimodal LLMs hallucinate web UI fixes without bounding box data.",
    built: "Visual audit studio extracting Playwright DOM coordinates for multimodal agents.",
    metric: "Sub-2s Audit",
    tech: ["Playwright", "Multimodal LLM", "Next.js", "Tailwind"],
    links: [
      { label: "Live Demo", url: "https://weblensai.vercel.app/", isExternal: true },
      { label: "Case Study", url: "/work/weblens-ai", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/WebLens-AI", isExternal: true },
    ],
  },
  {
    id: "sanjeevni-clinic",
    title: "Sanjeevni Clinic",
    category: "ML Systems & APIs",
    emoji: "🏥",
    tileBg: "bg-[var(--pink)]",
    status: null,
    problem: "Coordinating outpatient queue status and chime broadcasts in active clinics.",
    built: "Full-stack OPD queue state machine with Web Audio acoustic patient dispatch.",
    metric: "In Clinic Use",
    tech: ["Web Audio API", "FastAPI", "WebSockets", "React"],
    links: [
      { label: "Case Study", url: "/work/sanjeevni-clinic", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/sanjeevni-clinic", isExternal: true },
    ],
  },
  {
    id: "see-house",
    title: "See-House",
    category: "ML Systems & APIs",
    emoji: "🏡",
    tileBg: "bg-[var(--periwinkle)]",
    status: null,
    problem: "Estimating block-level housing prices from multi-variable census records.",
    built: "California housing regression engine predicting block values with FastAPI.",
    metric: "R² = 0.795",
    tech: ["Scikit-Learn", "FastAPI", "Docker", "Pandas"],
    links: [
      { label: "Case Study", url: "/work/see-house", isExternal: false },
      { label: "GitHub", url: "https://github.com/LochanJangid/See-House", isExternal: true },
    ],
  },
];

const CATEGORIES = [
  "All",
  "GenAI & Multimodal",
  "Deep Learning",
  "ML Systems & APIs",
  "Open Source & Tools",
];

export default function ProjectsShelf() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleChipClick = (e, cat) => {
    burstConfetti(e, ["📁", "🧪", "✨"]);
    setSelectedCategory(cat);
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 section-gap">
      {/* Section Title with Rainbow Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--periwinkle)]">
            // 02 // Lab Shelf
          </div>
          <h2 className="mt-1 font-sans text-3xl sm:text-4xl font-black text-[var(--ink)] tracking-tight">
            Production ML &amp; Systems
          </h2>
          <div className="rainbow-bar mt-3" />
        </div>

        <div className="font-mono text-xs font-bold text-[var(--mute)]">
          Showing {filteredProjects.length} of {PROJECTS.length} Systems
        </div>
      </div>

      <p className="max-w-2xl font-sans text-base text-[var(--mute)] leading-relaxed mb-6">
        Every system is mathematically verified, fully open-source or deployed live, and built
        from first principles.
      </p>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={(e) => handleChipClick(e, cat)}
              className={`chip cursor-pointer text-xs font-bold ${
                isActive
                  ? "bg-[var(--sun)] text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] scale-105"
                  : "bg-[var(--card)] text-[var(--ink)] hover:bg-[var(--periwinkle)]/20"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* High-Density Compact 4-Column Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProjects.map((project, idx) => {
          const isTiltLeft = idx % 2 === 0;
          return (
            <div
              key={project.id}
              className={`box ${
                isTiltLeft ? "box-tilt-left" : "box-tilt-right"
              } p-4 bg-[var(--card)] flex flex-col justify-between group transition-all`}
            >
              <div>
                {/* Header: Compact Icon Tile + Status + Metric */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[var(--ink)] ${project.tileBg} text-xl shadow-[2px_2px_0_var(--shadow)] text-[#1b1840] shrink-0`}
                  >
                    <span className="spin-on-hover select-none" aria-hidden="true">
                      {project.emoji}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    {project.status && (
                      <span className="rounded-full border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-[10px] font-black text-[#1b1840] shadow-[1px_1px_0_var(--shadow)]">
                        {project.status}
                      </span>
                    )}
                    <span className="rounded-full border border-[var(--ink)] bg-[var(--ink)]/5 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--mute)]">
                      {project.metric}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-sans text-base sm:text-lg font-black text-[var(--ink)] group-hover:text-[var(--periwinkle)] transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Concise Built Description */}
                <p className="mt-1.5 font-sans text-xs text-[var(--mute)] leading-snug line-clamp-2">
                  <strong className="text-[var(--ink)] font-semibold">Built:</strong> {project.built}
                </p>

                {/* Sleek Compact Mini Visualizations */}
                {project.customViz === "nanocalc" && (
                  <div className="mt-2.5 rounded-lg border border-[var(--ink)]/20 bg-[var(--bg)] p-2 font-mono text-[10px]">
                    <div className="flex justify-between font-bold text-[var(--ink)] mb-1">
                      <span>4-Op Run:</span>
                      <span className="text-[var(--pink)] font-black">0.977 Match</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-10 text-[var(--ink)]">+ / -</span>
                        <div className="h-1.5 flex-1 rounded-full bg-[var(--ink)]/10 overflow-hidden">
                          <div className="h-full bg-[var(--aqua)] w-full" />
                        </div>
                        <span className="font-bold">100%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-10 text-[var(--ink)]">* mul</span>
                        <div className="relative h-1.5 flex-1 rounded-full bg-[var(--ink)]/10">
                          <div className="h-full bg-[var(--sun)] w-[94%]" />
                          <div className="absolute top-0 bottom-0 w-1 bg-red-500 rounded" style={{ left: "62.8%" }} title="No decay: 62.8%" />
                        </div>
                        <span className="font-bold">94%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-10 text-[var(--ink)]">/ div*</span>
                        <div className="h-1.5 flex-1 rounded-full bg-[var(--ink)]/10 overflow-hidden">
                          <div className="h-full bg-[var(--periwinkle)] w-[84.2%]" />
                        </div>
                        <span className="font-bold">84%</span>
                      </div>
                    </div>
                    <div className="mt-1 text-[9px] text-[var(--mute)] italic truncate">
                      *57 test examples | marker: 62.8%
                    </div>
                  </div>
                )}

                {project.customViz === "lochan-eda" && (
                  <div className="mt-2.5 rounded-lg border border-[var(--ink)]/20 bg-[var(--bg)] p-2 font-mono text-[10px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[var(--ink)]">Pipeline Flow</span>
                      <span className="rounded bg-[var(--aqua)] px-1 text-[9px] font-black text-[#1b1840]">
                        🛡️ Leakage Free
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-center gap-0.5 text-[9px] text-[var(--ink)]">
                      <span className="rounded bg-[var(--card)] px-1 py-0.5 border border-[var(--ink)]/15">Raw</span>
                      <span>→</span>
                      <span className="rounded bg-[var(--card)] px-1 py-0.5 border border-[var(--ink)]/15 font-bold">AutoEDA</span>
                      <span>→</span>
                      <span className="rounded bg-[var(--card)] px-1 py-0.5 border border-[var(--ink)]/15">Profile</span>
                    </div>
                  </div>
                )}

                {project.customViz === "gradlab" && (
                  <div className="mt-2.5 rounded-lg border border-[var(--ink)]/20 bg-[var(--bg)] p-2 font-mono text-[10px]">
                    <div className="font-bold text-[var(--ink)] mb-1">Diagnostics</div>
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded bg-[var(--sun)] px-1.5 py-0.5 font-bold text-[#1b1840]">gradcheck</span>
                      <span className="rounded bg-[var(--aqua)] px-1.5 py-0.5 font-bold text-[#1b1840]">suggest_lr</span>
                      <span className="rounded bg-[var(--pink)] px-1.5 py-0.5 font-bold text-[#1b1840]">collinear</span>
                    </div>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-[var(--ink)]/20 bg-[var(--bg)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--ink)]"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="rounded border border-[var(--ink)]/10 bg-[var(--bg)] px-1 py-0.5 font-mono text-[10px] text-[var(--mute)]">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[var(--ink)]/15 flex flex-wrap items-center gap-1.5">
                {project.links.map((link) =>
                  link.isExternal ? (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-pill btn-secondary px-2.5 py-1 text-xs font-bold"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.url}
                      className="btn-pill btn-primary px-2.5 py-1 text-xs font-bold"
                    >
                      {link.label} →
                    </Link>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
