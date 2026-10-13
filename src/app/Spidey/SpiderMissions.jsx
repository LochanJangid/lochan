"use client";

import { useState, useEffect } from "react";
import { spiderAudio } from "./spiderAudio";

const MISSION_DATA = [
  {
    number: "01",
    id: "MISSION_01",
    sector: "PREDICTIVE REAL ESTATE",
    title: "See-House",
    category: "REGRESSION // RANDOM FOREST",
    tagline: "California Housing Price Inference Engine",
    description:
      "End-to-end regression system estimating California block-group median house values from spatial, demographic, and housing attributes. Trained with Random Forest and deployed via FastAPI for sub-second inference.",
    systemPipeline: "Dataset (20,640 records) → Preprocessing → Random Forest Regressor → FastAPI REST → Web Interface",
    techStack: ["Python", "Scikit-Learn", "Random Forest", "FastAPI", "Docker", "Pandas"],
    verifiedMetrics: [
      { label: "R² SCORE", value: "0.795" },
      { label: "MEAN ABSOLUTE ERROR", value: "$34.2k" },
      { label: "TRAIN / TEST SPLIT", value: "80 / 20" },
      { label: "INPUT DIMENSION", value: "8 Features" },
    ],
    accentColor: "from-rose-500 to-red-600",
    borderAccent: "group-hover:border-red-500",
    glowColor: "rgba(239, 68, 68, 0.25)",
    links: [
      { label: "Live Demo", href: "/work/see-house#demo", primary: true },
      { label: "Case Study", href: "/work/see-house" },
      { label: "Source Code", href: "https://github.com/LochanJangid/See-House", external: true },
    ],
    coverGraphic: "housing",
  },
  {
    number: "02",
    id: "MISSION_02",
    sector: "NEURAL PATTERN RECOGNITION",
    title: "Digit Recognition",
    category: "DEEP LEARNING // COMPUTER VISION",
    tagline: "PyTorch Neural Digit Classifier & Canvas",
    description:
      "Deep learning digit classification pipeline trained on MNIST dataset. Features an interactive 28×28 canvas input with real-time tensor normalization and confidence scoring across 10 digit classes.",
    systemPipeline: "HTML5 Canvas → 28×28 Downscale → Min-Max Normalize → PyTorch (784→286→120→10 Tanh) → Prediction Vector",
    techStack: ["PyTorch", "Python", "Deep Learning", "FastAPI", "Canvas API", "Next.js"],
    verifiedMetrics: [
      { label: "ARCHITECTURE", value: "784→286→120→10" },
      { label: "ACTIVATION", value: "Hyperbolic Tanh" },
      { label: "OUTPUT CLASSES", value: "10 (0-9 Digits)" },
      { label: "INPUT RESOLUTION", value: "28 × 28 px" },
    ],
    accentColor: "from-sky-500 to-blue-600",
    borderAccent: "group-hover:border-sky-500",
    glowColor: "rgba(56, 189, 248, 0.25)",
    links: [
      { label: "Interactive Canvas", href: "/work/mnist#demo", primary: true },
      { label: "Architecture Study", href: "/work/mnist" },
      { label: "Source Code", href: "https://github.com/LochanJangid/MNIST", external: true },
    ],
    coverGraphic: "mnist",
  },
  {
    number: "03",
    id: "MISSION_03",
    sector: "DATA SCIENCE TOOLING",
    title: "Automated EDA Toolkit",
    category: "OPEN SOURCE // DATA ENGINEERING",
    tagline: "Python Package for Automated EDA Workflows",
    description:
      "A published open-source Python library (lochan-eda) built to automate exploratory data analysis, dataset profiling, missing value imputation, and preprocessing pipelines before model training.",
    systemPipeline: "Raw Dataset → AutomatedEDA.prepare() → Profiler Inspection → Imputation & Encoding → Pipeline Export",
    techStack: ["Python", "PyPI Package", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    verifiedMetrics: [
      { label: "DISTRIBUTION", value: "PyPI Package" },
      { label: "CORE MODULES", value: "AutomatedEDA, Profiler" },
      { label: "PIPELINE", value: "Fit & Transform" },
      { label: "LICENSE", value: "Open Source" },
    ],
    accentColor: "from-amber-500 to-red-600",
    borderAccent: "group-hover:border-amber-500",
    glowColor: "rgba(245, 158, 11, 0.25)",
    links: [
      { label: "PyPI Package", href: "https://pypi.org/project/lochan-eda/", external: true, primary: true },
      { label: "Documentation", href: "/work/lochan-eda/docs" },
      { label: "Case Study", href: "/work/lochan-eda" },
      { label: "Source Code", href: "https://github.com/LochanJangid/lochan-eda", external: true },
    ],
    coverGraphic: "eda",
  },
  {
    number: "04",
    id: "MISSION_04",
    sector: "FINANCIAL INTELLIGENCE",
    title: "Bank Marketing",
    category: "CLASSIFICATION // GRADIENT BOOSTING",
    tagline: "Term Deposit Conversion Predictor",
    description:
      "End-to-end customer subscription prediction system using XGBoost. Includes structured validation with Pydantic, data preprocessing pipelines, and a deployed web service for financial campaigns.",
    systemPipeline: "Customer Features → Pydantic Validation → Column Transformers → XGBoost Model → Conversion Odds",
    techStack: ["XGBoost", "Python", "FastAPI", "Pydantic", "Scikit-Learn", "Docker"],
    verifiedMetrics: [
      { label: "CLASSIFIER", value: "XGBoost" },
      { label: "VALIDATION", value: "Pydantic Schemas" },
      { label: "DEPLOYMENT", value: "Live Cloud API" },
      { label: "TARGET", value: "Deposit Opt-In" },
    ],
    accentColor: "from-blue-600 to-indigo-700",
    borderAccent: "group-hover:border-blue-500",
    glowColor: "rgba(37, 99, 235, 0.25)",
    links: [
      { label: "Deployed App", href: "https://bank-marketing-alpha.vercel.app/", external: true, primary: true },
      { label: "Case Study", href: "/work/bank-marketing" },
      { label: "Source Code", href: "https://github.com/LochanJangid/bank-marketing", external: true },
    ],
    coverGraphic: "banking",
  },
  {
    number: "05",
    id: "MISSION_05",
    sector: "HEALTHCARE INTELLIGENCE",
    title: "Medical AI",
    category: "CONVERSATIONAL AI // CLINICAL NLP",
    tagline: "Triage & Healthcare Guidance Assistant",
    description:
      "Conversational clinical guidance system designed to gather patient symptom history naturally, perform non-diagnostic triage analysis, and suggest nearby medical specialties and care centers.",
    systemPipeline: "Natural Dialogue → Structured Extraction → Clinical LLM Triage → Safety Boundary Filter → Care Directory",
    techStack: ["FastAPI", "Conversational AI", "Python", "Next.js", "Clinical Triage NLP"],
    verifiedMetrics: [
      { label: "MODALITY", value: "Conversational UI" },
      { label: "PURPOSE", value: "Symptom Gathering" },
      { label: "SAFETY PROTOCOL", value: "Non-Diagnostic Guardrails" },
      { label: "OUTPUT", value: "Specialist Direction" },
    ],
    accentColor: "from-emerald-500 to-teal-700",
    borderAccent: "group-hover:border-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.25)",
    links: [
      { label: "Live System", href: "https://medical-ai-gules.vercel.app/", external: true, primary: true },
      { label: "Case Study", href: "/work/medical-ai" },
      { label: "Source Code", href: "https://github.com/LochanJangid/MedicalAI", external: true },
    ],
    coverGraphic: "medical",
  },
  {
    number: "06",
    id: "MISSION_06",
    sector: "CLINICAL TELEMETRY",
    title: "SANJEEVNI-CLINIC",
    category: "FULL-STACK // HEALTHCARE ERP",
    tagline: "Unified Clinical Operating System & ERP",
    description:
      "Next-generation clinical operating platform integrating encrypted WebRTC video telemedicine consultations, electronic medical record tracking, and LLM-assisted doctor note generation.",
    systemPipeline: "Patient Portal → WebRTC Video Signaling → Secure EMR Store → LLM Clinical Scribe → Pharmacopeia",
    techStack: ["WebRTC", "LLM Integration", "Next.js", "FastAPI", "Full-Stack ERP"],
    verifiedMetrics: [
      { label: "TELEMEDICINE", value: "Encrypted WebRTC" },
      { label: "CLINICAL SCRIBE", value: "LLM Assisted" },
      { label: "PLATFORM", value: "Complete ERP" },
      { label: "STATUS", value: "Production Deployed" },
    ],
    accentColor: "from-rose-600 to-indigo-800",
    borderAccent: "group-hover:border-rose-500",
    glowColor: "rgba(225, 29, 72, 0.25)",
    links: [
      { label: "Live Deployment", href: "https://sanjeevni-clinic.vercel.app/", external: true, primary: true },
      { label: "Source Code", href: "https://github.com/LochanJangid/sanjeevni-clinic", external: true },
    ],
    coverGraphic: "telehealth",
  },
];

function GraphicCover({ type }) {
  if (type === "housing") {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
        <rect width="320" height="180" fill="#090d1e" />
        {/* Topographic price contour lines */}
        <path d="M-20,160 Q80,100 160,130 T340,90" fill="none" stroke="#ff1744" strokeWidth="2.5" opacity="0.8" />
        <path d="M-20,130 Q100,70 200,110 T340,60" fill="none" stroke="#ff5252" strokeWidth="2" opacity="0.6" />
        <path d="M-20,100 Q120,40 220,80 T340,30" fill="none" stroke="#ff8a80" strokeWidth="1.5" opacity="0.4" />
        {/* Housing price scatter clusters */}
        <circle cx="120" cy="80" r="16" fill="none" stroke="#00e5ff" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="120" cy="80" r="4" fill="#00e5ff" />
        <circle cx="210" cy="65" r="22" fill="none" stroke="#ff1744" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="210" cy="65" r="5" fill="#ff1744" />
        <text x="24" y="32" fill="#ff5252" fontFamily="monospace" fontSize="10" letterSpacing="2">
          MODEL: RANDOM FOREST // R²: 0.795
        </text>
      </svg>
    );
  }

  if (type === "mnist") {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
        <rect width="320" height="180" fill="#060c22" />
        {/* 28x28 Tensor pixel grid simulation */}
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 14 }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={20 + c * 14}
              y={24 + r * 14}
              width="10"
              height="10"
              fill={
                (r >= 2 && r <= 5 && c >= 5 && c <= 8) || (r === 6 && c === 7)
                  ? "#00e5ff"
                  : "#1e293b"
              }
              opacity={
                (r >= 2 && r <= 5 && c >= 5 && c <= 8) ? "0.9" : "0.35"
              }
            />
          ))
        )}
        {/* Neural Network connections */}
        <line x1="230" y1="40" x2="280" y2="30" stroke="#ff1744" strokeWidth="2" />
        <line x1="230" y1="80" x2="280" y2="80" stroke="#00e5ff" strokeWidth="2" />
        <line x1="230" y1="120" x2="280" y2="130" stroke="#ff1744" strokeWidth="2" />
        <circle cx="280" cy="30" r="6" fill="#ff1744" />
        <circle cx="280" cy="80" r="8" fill="#00e5ff" />
        <circle cx="280" cy="130" r="6" fill="#ff1744" />
        <text x="220" y="160" fill="#00e5ff" fontFamily="monospace" fontSize="10" letterSpacing="2">
          PYTORCH // TANH 784→10
        </text>
      </svg>
    );
  }

  if (type === "eda") {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
        <rect width="320" height="180" fill="#0b0e1e" />
        {/* Automated distribution histograms */}
        <rect x="30" y="100" width="16" height="50" fill="#f59e0b" opacity="0.8" />
        <rect x="52" y="70" width="16" height="80" fill="#f59e0b" opacity="0.9" />
        <rect x="74" y="45" width="16" height="105" fill="#ef4444" opacity="0.9" />
        <rect x="96" y="80" width="16" height="70" fill="#f59e0b" opacity="0.8" />
        <rect x="118" y="115" width="16" height="35" fill="#f59e0b" opacity="0.7" />
        {/* Distribution curve */}
        <path d="M25,140 Q82,20 140,140" fill="none" stroke="#00e5ff" strokeWidth="2" />
        {/* Code snippet badge */}
        <rect x="170" y="45" width="130" height="90" fill="#1e293b" rx="4" stroke="#475569" />
        <text x="180" y="75" fill="#38bdf8" fontFamily="monospace" fontSize="10">lochan_eda.fit()</text>
        <text x="180" y="95" fill="#a5b4fc" fontFamily="monospace" fontSize="9">Profiler.report()</text>
        <text x="180" y="115" fill="#fcd34d" fontFamily="monospace" fontSize="9">AutomatedEDA</text>
      </svg>
    );
  }

  if (type === "banking") {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
        <rect width="320" height="180" fill="#080e28" />
        {/* Decision tree gradient branches */}
        <line x1="80" y1="90" x2="160" y2="45" stroke="#3b82f6" strokeWidth="2" />
        <line x1="80" y1="90" x2="160" y2="135" stroke="#3b82f6" strokeWidth="2" />
        <line x1="160" y1="45" x2="240" y2="25" stroke="#00e5ff" strokeWidth="2" />
        <line x1="160" y1="45" x2="240" y2="65" stroke="#ef4444" strokeWidth="2" />
        <circle cx="80" cy="90" r="10" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
        <circle cx="160" cy="45" r="8" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
        <circle cx="160" cy="135" r="8" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
        <circle cx="240" cy="25" r="6" fill="#00e5ff" />
        <circle cx="240" cy="65" r="6" fill="#ef4444" />
        <text x="24" y="32" fill="#60a5fa" fontFamily="monospace" fontSize="10" letterSpacing="2">
          XGBOOST // TERM DEPOSIT PREDICTOR
        </text>
      </svg>
    );
  }

  if (type === "medical") {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
        <rect width="320" height="180" fill="#05151e" />
        {/* ECG pulse waveform */}
        <path
          d="M 20 90 L 80 90 L 95 60 L 110 120 L 125 40 L 140 105 L 155 85 L 170 90 L 300 90"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
        />
        {/* Triage node markers */}
        <circle cx="125" cy="40" r="5" fill="#34d399" />
        <circle cx="240" cy="90" r="12" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="240" cy="90" r="4" fill="#10b981" />
        <text x="24" y="36" fill="#34d399" fontFamily="monospace" fontSize="10" letterSpacing="2">
          CLINICAL NLP // SYMPTOM TRIAGE
        </text>
      </svg>
    );
  }

  // Telehealth / Sanjeevni
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
      <rect width="320" height="180" fill="#0d091e" />
      {/* WebRTC Video Call Grid */}
      <rect x="40" y="30" width="110" height="70" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" rx="4" />
      <rect x="170" y="30" width="110" height="70" fill="#312e81" stroke="#f43f5e" strokeWidth="1.5" rx="4" />
      {/* Waveform connecting audio */}
      <path d="M40,130 Q160,110 280,130" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
      <text x="24" y="160" fill="#f43f5e" fontFamily="monospace" fontSize="10" letterSpacing="2">
        WEBRTC // CLINICAL OPERATING SYSTEM
      </text>
    </svg>
  );
}

export default function SpiderMissions() {
  const [activeModalMission, setActiveModalMission] = useState(null);

  const openMissionDetails = (mission) => {
    spiderAudio.playMissionUnlock();
    setActiveModalMission(mission);
  };

  const closeModal = () => {
    spiderAudio.playHudClick();
    setActiveModalMission(null);
  };

  useEffect(() => {
    if (!activeModalMission) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalMission]);

  return (
    <section
      id="missions"
      data-spidey-target="mission-sector"
      className="relative z-10 w-full bg-[#02050f] text-white py-24 px-6 sm:px-12 lg:px-20 border-t border-white/10"
    >
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-red-600/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 font-mono text-[11px] tracking-[0.3em] text-red-500 font-bold uppercase">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              DEPLOYED MISSIONS ARCHIVE // SECTOR 01-06
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
              MACHINE LEARNING{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-sky-400">
                MISSIONS.
              </span>
            </h2>
          </div>
          <div className="max-w-md font-sans text-sm text-neutral-400 leading-relaxed">
            Real machine learning systems, evaluated models, and production APIs.
            Each mission carries real evaluation metrics and working source code.
          </div>
        </div>
      </div>

      {/* MISSIONS GRID (ANGULAR COMIC-PANEL MATRICES) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MISSION_DATA.map((mission) => (
          <article
            key={mission.id}
            data-spidey-target={`mission-${mission.number}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border-2 border-slate-800 bg-[#060b1d]/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500 hover:shadow-[0_12px_40px_rgba(239,68,68,0.22)]"
          >
            {/* Top Comic Panel Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0a122e] px-4 py-2 font-mono text-[10px]">
              <span className="font-bold tracking-wider text-red-400">
                {mission.id}
              </span>
              <span className="tracking-widest text-neutral-400 text-[9px]">
                {mission.sector}
              </span>
            </div>

            {/* Visual Cover Art Canvas */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-black/60">
              <GraphicCover type={mission.coverGraphic} />

              {/* Halftone Dot Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              />

              {/* Category Badge */}
              <div className="absolute bottom-2.5 left-2.5 rounded bg-black/80 border border-white/20 px-2.5 py-1 font-mono text-[9px] tracking-wider text-sky-300">
                {mission.category}
              </div>
            </div>

            {/* Mission Intel Body */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
                  {mission.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-neutral-400 tracking-wide font-medium">
                  {mission.tagline}
                </p>

                <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-sans line-clamp-3">
                  {mission.description}
                </p>
              </div>

              {/* Verified Metrics Snapshot */}
              <div className="mt-5 grid grid-cols-2 gap-2 border-y border-white/10 py-3 bg-white/[0.02] rounded my-4">
                {mission.verifiedMetrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="px-2">
                    <div className="font-mono text-[8px] tracking-widest text-neutral-400">
                      {m.label}
                    </div>
                    <div className="font-mono text-[12px] font-bold text-red-400 mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technology Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {mission.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Direct Actions & Expand Drawer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => openMissionDetails(mission)}
                  className="inline-flex items-center gap-1.5 font-bold text-red-400 hover:text-white transition-colors"
                >
                  <span>EXPAND INTEL</span>
                  <span>↗</span>
                </button>

                <div className="flex items-center gap-3">
                  {mission.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className={
                        link.primary
                          ? "px-2.5 py-1 rounded bg-red-600 text-white font-bold text-[10px] hover:bg-red-500 transition-colors shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                          : "text-neutral-400 hover:text-white text-[11px] underline underline-offset-2 transition-colors"
                      }
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* EXPANDABLE MISSION DOSSIER MODAL */}
      {activeModalMission && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-xl border-2 border-red-500/80 bg-[#090f26] p-6 sm:p-8 text-white shadow-[0_0_60px_rgba(239,68,68,0.35)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/15 pb-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-red-400 font-bold">
                  {activeModalMission.id} // DECLASSIFIED SYSTEM SPECIFICATION
                </span>
                <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">
                  {activeModalMission.title}
                </h3>
                <p className="font-mono text-xs text-sky-300 mt-1">
                  {activeModalMission.category}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs hover:bg-red-600 transition"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Description & Pipeline */}
            <div className="mt-6 space-y-5 font-sans">
              <div>
                <h4 className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
                  MISSION BRIEF & PROBLEM FORMULATION
                </h4>
                <p className="mt-2 text-sm sm:text-base text-neutral-200 leading-relaxed">
                  {activeModalMission.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
                  ARCHITECTURE & INFERENCE PIPELINE
                </h4>
                <div className="mt-2 rounded bg-black/60 border border-white/10 p-3 font-mono text-xs text-green-300">
                  {activeModalMission.systemPipeline}
                </div>
              </div>

              {/* Verified Results Matrix */}
              <div>
                <h4 className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
                  VERIFIED EVALUATION METRICS
                </h4>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeModalMission.verifiedMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded border border-red-500/30 bg-red-950/20 p-3"
                    >
                      <div className="font-mono text-[9px] tracking-wider text-neutral-400">
                        {m.label}
                      </div>
                      <div className="font-mono text-sm sm:text-base font-bold text-white mt-1">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Stack */}
              <div>
                <h4 className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
                  TECHNOLOGY ARSENAL
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeModalMission.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-sky-500/40 bg-sky-950/30 px-3 py-1 font-mono text-[10px] text-sky-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Links Action Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
              <div className="font-mono text-[10px] text-neutral-500">
                STATUS: VERIFIED PRODUCTION RUNTIME
              </div>
              <div className="flex flex-wrap gap-3">
                {activeModalMission.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className={
                      link.primary
                        ? "rounded bg-red-600 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-red-500 transition shadow-[0_0_16px_rgba(239,68,68,0.5)]"
                        : "rounded border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs text-neutral-300 hover:bg-white/10 hover:text-white transition"
                    }
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
