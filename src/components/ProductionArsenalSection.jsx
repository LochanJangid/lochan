"use client";

import { useState } from "react";
import Link from "next/link";
import { spiderAudio } from "../app/Spidey/spiderAudio";

const PROJECTS = [
  {
    id: "weblens-ai",
    number: "01",
    title: "WebLens AI",
    category: "GENAI & MULTIMODAL",
    tagline: "Autonomous visual audit & code generation studio using Playwright DOM coordinate extraction and multimodal LLMs.",
    pipeline: "Playwright Headless → DOM Bounding Boxes → Multi-Model Vision → Tailwind Code",
    metric: "Sub-2s Audit",
    tech: ["Playwright", "Multimodal LLM", "Next.js", "Tailwind CSS"],
    status: "DEPLOYED",
    theme: {
      bg: "bg-[#A5DAD4]",
      text: "text-[#080808]",
      border: "border-[#8ecdc6]",
      badgeBg: "bg-[#080808]",
      badgeText: "text-white",
      pillBg: "bg-white/80",
      pillText: "text-[#080808]",
    },
    links: [
      { label: "Live Demo", url: "https://weblensai.vercel.app/", external: true },
      { label: "Case Study", url: "/work/weblens-ai", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/WebLens-AI", external: true },
    ],
  },
  {
    id: "bank-marketer",
    number: "02",
    title: "BankMarketer",
    category: "ML SYSTEMS & APIS",
    tagline: "Term deposit propensity classification engine with SHAP waterfall explainability deployed on FastAPI.",
    pipeline: "16 Client Features → Pydantic Schemas → Random Forest → SHAP Force Plots → FastAPI",
    metric: "91.2% ROC-AUC",
    tech: ["FastAPI", "Scikit-Learn", "SHAP", "Docker", "Pydantic"],
    status: "PRODUCTION",
    theme: {
      bg: "bg-[#E8A9F4]",
      text: "text-[#080808]",
      border: "border-[#dc97e8]",
      badgeBg: "bg-[#080808]",
      badgeText: "text-white",
      pillBg: "bg-white/80",
      pillText: "text-[#080808]",
    },
    links: [
      { label: "API Docs", url: "https://bankmarketing-ml.onrender.com/docs", external: true },
      { label: "Case Study", url: "/work/bank-marketing", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/Bank-Marketing", external: true },
    ],
  },
  {
    id: "medical-ai",
    number: "03",
    title: "MedicalAI",
    category: "DEEP LEARNING",
    tagline: "CheXNet 121-layer DenseNet diagnostic engine identifying 14 pulmonary pathologies from chest X-rays with Grad-CAM.",
    pipeline: "Chest X-Ray (224×224) → DenseNet-121 → Grad-CAM Gradients → 14 Pathology Scores",
    metric: "14 Pathologies",
    tech: ["PyTorch", "DenseNet-121", "Grad-CAM", "FastAPI", "React"],
    status: "PRODUCTION",
    theme: {
      bg: "bg-[#080808]",
      text: "text-white",
      subText: "text-neutral-300",
      border: "border-neutral-800",
      badgeBg: "bg-[#A5DAD4]",
      badgeText: "text-[#080808]",
      pillBg: "bg-neutral-800",
      pillText: "text-neutral-200",
    },
    links: [
      { label: "Web Studio", url: "https://medicalai.vercel.app/", external: true },
      { label: "Case Study", url: "/work/medical-ai", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/medicalAI", external: true },
    ],
  },
  {
    id: "nanocalc-gpt",
    number: "04",
    title: "nanoCalc-GPT",
    category: "DEEP LEARNING",
    tagline: "1.2M parameter decoder-only transformer discovering multi-digit arithmetic carry via target reversal.",
    pipeline: "Token Sequence → 6× Causal Layers → Right-to-Left Reversal → 100% Addition Carry",
    metric: "99.51% Match",
    tech: ["PyTorch", "Decoder Transformer", "Causal Attention", "OneCycleLR"],
    status: "OPEN SOURCE",
    theme: {
      bg: "bg-[#9574C4]",
      text: "text-white",
      subText: "text-white/90",
      border: "border-[#8563b4]",
      badgeBg: "bg-[#FFC568]",
      badgeText: "text-[#080808]",
      pillBg: "bg-white/20",
      pillText: "text-white",
    },
    links: [
      { label: "Case Study", url: "/work/nanocalc-gpt", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/nanocalc-gpt", external: true },
    ],
  },
  {
    id: "mnist",
    number: "05",
    title: "Digit Recognition",
    category: "DEEP LEARNING",
    tagline: "Low-latency PyTorch neural classifier with real-time 28×28 interactive drawing board and tensor visualizer.",
    pipeline: "Canvas Drawing → 28×28 Downscale → PyTorch (784→286→120→10) → Softmax Vector",
    metric: "784→286→120→10",
    tech: ["PyTorch", "Canvas API", "Tanh Activations", "Next.js"],
    status: "OPEN SOURCE",
    theme: {
      bg: "bg-white",
      text: "text-[#080808]",
      border: "border-[#E5E5E5]",
      badgeBg: "bg-[#8584D5]",
      badgeText: "text-white",
      pillBg: "bg-[#F3F3F3]",
      pillText: "text-[#080808]",
    },
    links: [
      { label: "Draw Live", url: "/work/mnist#demo", internal: true },
      { label: "Case Study", url: "/work/mnist", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/MNIST", external: true },
    ],
  },
  {
    id: "zero-sql",
    number: "06",
    title: "zero-sql",
    category: "OPEN SOURCE & TOOLS",
    tagline: "High-performance privacy-focused desktop database client for DuckDB, SQLite, PostgreSQL, MySQL & SQL Server.",
    pipeline: "Local Drivers → Monaco Editor → Local RAG Autocomplete → Virtualized Windowing Grid",
    metric: "Local Privacy",
    tech: ["DuckDB", "Monaco Editor", "PostgreSQL", "SQLite", "Next.js"],
    status: "DEPLOYED",
    theme: {
      bg: "bg-[#A5DAD4]",
      text: "text-[#080808]",
      border: "border-[#8ecdc6]",
      badgeBg: "bg-[#080808]",
      badgeText: "text-white",
      pillBg: "bg-white/80",
      pillText: "text-[#080808]",
    },
    links: [
      { label: "Web Client", url: "https://zero-sql.vercel.app", external: true },
      { label: "Case Study", url: "/work/zero-sql", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/zero_sql", external: true },
    ],
  },
  {
    id: "sanjeevni-clinic",
    number: "07",
    title: "Sanjeevni Clinic",
    category: "ML SYSTEMS & APIS",
    tagline: "Full-stack OPD queue state machine and acoustic patient dispatch engine with TV signage deployed in active clinics.",
    pipeline: "OPD Registration → State Machine Engine → Web Audio Dual Chimes → TV Signage Wall",
    metric: "In Clinic Use",
    tech: ["Web Audio API", "FastAPI", "WebSockets", "React"],
    status: "PRODUCTION",
    theme: {
      bg: "bg-[#FFC568]",
      text: "text-[#080808]",
      border: "border-[#eeb457]",
      badgeBg: "bg-[#080808]",
      badgeText: "text-white",
      pillBg: "bg-white/80",
      pillText: "text-[#080808]",
    },
    links: [
      { label: "Case Study", url: "/work/sanjeevni-clinic", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/sanjeevni-clinic", external: true },
    ],
  },
  {
    id: "see-house",
    number: "08",
    title: "See-House",
    category: "ML SYSTEMS & APIS",
    tagline: "California housing price regression engine predicting median block values with sub-second FastAPI endpoints.",
    pipeline: "20,640 Records → Outlier Filtering → Random Forest Regressor → FastAPI REST",
    metric: "R² = 0.795",
    tech: ["Scikit-Learn", "FastAPI", "Docker", "Pandas"],
    status: "DEPLOYED",
    theme: {
      bg: "bg-white",
      text: "text-[#080808]",
      border: "border-[#E5E5E5]",
      badgeBg: "bg-[#8584D5]",
      badgeText: "text-white",
      pillBg: "bg-[#F3F3F3]",
      pillText: "text-[#080808]",
    },
    links: [
      { label: "Case Study", url: "/work/see-house", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/See-House", external: true },
    ],
  },
  {
    id: "lochan-eda",
    number: "09",
    title: "lochan_eda",
    category: "OPEN SOURCE & TOOLS",
    tagline: "Open-source Python library published on PyPI automating exploratory data analysis, missing data profiling, and statistical preprocessing.",
    pipeline: "Raw DataFrame → Type Inference → Automated Missing Profiler → PyPI Package",
    metric: "PyPI Package",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "PyPI"],
    status: "PUBLISHED",
    theme: {
      bg: "bg-[#E8A9F4]",
      text: "text-[#080808]",
      border: "border-[#dc97e8]",
      badgeBg: "bg-[#080808]",
      badgeText: "text-white",
      pillBg: "bg-white/80",
      pillText: "text-[#080808]",
    },
    links: [
      { label: "11-Page Docs", url: "/work/lochan-eda/docs", internal: true },
      { label: "Case Study", url: "/work/lochan-eda", internal: true },
      { label: "GitHub", url: "https://github.com/LochanJangid/lochan_eda", external: true },
    ],
  },
];

const CATEGORIES = [
  "ALL",
  "GENAI & MULTIMODAL",
  "DEEP LEARNING",
  "ML SYSTEMS & APIS",
  "OPEN SOURCE & TOOLS",
];

export default function ProductionArsenalSection() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredProjects =
    selectedCategory === "ALL"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleFilter = (cat) => {
    spiderAudio.playHudClick();
    setSelectedCategory(cat);
  };

  return (
    <section id="projects" className="mt-14 sm:mt-20">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#ECECEC] pb-6">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#8584D5]">
            03 // PRODUCTION ARSENAL
          </p>
          <h3 className="mt-1 font-display text-3xl sm:text-4xl font-black tracking-tight text-[#080808]">
            End-to-End Machine Learning Systems
          </h3>
          <p className="mt-2 font-sans text-sm sm:text-base text-[#555555] max-w-2xl leading-relaxed">
            From exploratory mathematical analysis and PyTorch tensor architectures to FastAPI microservices, containerization, and production edge deployments.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#555555]">
          <span className="rounded-full bg-white border border-[#E5E5E5] px-3.5 py-1.5 font-bold text-[#080808] shadow-sm">
            09 SYSTEMS VERIFIED
          </span>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilter(cat)}
              className={`rounded-full px-4 py-2 font-mono text-xs font-bold transition-all duration-200 ${
                isActive
                  ? "bg-[#080808] text-white shadow-md scale-105"
                  : "bg-white border border-[#E5E5E5] text-[#555555] hover:text-[#080808] hover:border-[#D0D0D0] shadow-sm"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-[28px] border ${project.theme.border} ${project.theme.bg} ${project.theme.text} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div>
              {/* Top Row: Category + Metric / Status Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                  project.id === "medical-ai" ? "text-[#A5DAD4]" : "text-[#080808]/70"
                }`}>
                  {project.category}
                </span>

                <span
                  className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${project.theme.badgeBg} ${project.theme.badgeText} shadow-sm`}
                >
                  {project.metric || project.status}
                </span>
              </div>

              {/* Title & Number */}
              <div className="mt-4 flex items-baseline justify-between">
                <h4 className="font-display text-2xl font-black tracking-tight">
                  {project.title}
                </h4>
                <span className="font-mono text-xs opacity-60">
                  #{project.number}
                </span>
              </div>

              {/* Description */}
              <p className={`mt-2.5 font-sans text-sm leading-relaxed ${
                project.theme.subText || "text-[#080808]/85"
              }`}>
                {project.tagline}
              </p>

              {/* Pipeline Flow Box */}
              <div className={`mt-4 rounded-xl p-3 font-mono text-[11px] leading-relaxed ${
                project.id === "medical-ai"
                  ? "bg-neutral-900 border border-neutral-800 text-neutral-300"
                  : project.id === "nanocalc-gpt"
                  ? "bg-white/20 text-white"
                  : "bg-white/70 text-[#080808]"
              }`}>
                <span className="font-bold">Pipeline: </span>
                <span>{project.pipeline}</span>
              </div>
            </div>

            {/* Bottom: Tech Stack & Action Links */}
            <div className={`mt-6 pt-4 border-t flex flex-col gap-3 ${
              project.id === "medical-ai"
                ? "border-neutral-800"
                : project.id === "nanocalc-gpt"
                ? "border-white/20"
                : "border-[#080808]/15"
            }`}>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-medium ${project.theme.pillBg} ${project.theme.pillText}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between font-display text-xs font-bold pt-1">
                <div className="flex items-center gap-3">
                  {project.links.map((link) => {
                    if (link.internal) {
                      return (
                        <Link
                          key={link.label}
                          href={link.url}
                          className="hover:underline"
                        >
                          {link.label} →
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {link.label} ↗
                      </a>
                    );
                  })}
                </div>

                <span className="font-mono text-[10px] uppercase opacity-75">
                  VERIFIED
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
