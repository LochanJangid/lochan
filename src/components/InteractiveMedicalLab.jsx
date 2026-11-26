"use client";

import { useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

const PATHOLOGIES = [
  {
    id: "cardiomegaly",
    name: "Cardiomegaly",
    auc: "0.910",
    description: "Enlargement of the heart outline beyond 50% thoracic ratio.",
    heatmapPos: { x: 52, y: 56, radius: 26, color: "rgba(220, 38, 38, 0.75)" },
  },
  {
    id: "effusion",
    name: "Pleural Effusion",
    auc: "0.882",
    description: "Fluid collection blunting the costophrenic angles.",
    heatmapPos: { x: 74, y: 72, radius: 22, color: "rgba(234, 88, 12, 0.75)" },
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    auc: "0.768",
    description: "Alveolar consolidation with ill-defined air bronchograms.",
    heatmapPos: { x: 38, y: 44, radius: 20, color: "rgba(202, 138, 4, 0.75)" },
  },
  {
    id: "atelectasis",
    name: "Atelectasis",
    auc: "0.809",
    description: "Partial lung volume collapse with mediastinal shift.",
    heatmapPos: { x: 32, y: 65, radius: 18, color: "rgba(147, 51, 234, 0.75)" },
  },
  {
    id: "infiltration",
    name: "Infiltration",
    auc: "0.735",
    description: "Subtle interstitial fluid accumulation across parenchymal lobes.",
    heatmapPos: { x: 62, y: 40, radius: 24, color: "rgba(2, 132, 199, 0.75)" },
  },
];

export default function InteractiveMedicalLab({ onDiscovery }) {
  const [selectedPathology, setSelectedPathology] = useState(PATHOLOGIES[0]);
  const [heatmapIntensity, setHeatmapIntensity] = useState(75);

  const handleSelect = (pathology) => {
    spiderAudio.playNeuralChirp(680);
    setSelectedPathology(pathology);
    if (onDiscovery) onDiscovery("medical");
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#E5E5E5] bg-white p-6 sm:p-8 text-[#080808] shadow-sm">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0F0F0] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#DC2626]">
            <span className="flex h-2 w-2 rounded-full bg-[#DC2626] animate-ping" />
            <span>LIVE INTERACTIVE ALGORITHM SANDBOX // 04</span>
          </div>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-black tracking-tight text-[#080808]">
            MedicalAI: DenseNet-121 &amp; Grad-CAM Localization
          </h3>
          <p className="mt-1 font-sans text-xs sm:text-sm text-[#555555] max-w-2xl leading-relaxed">
            Trained on 112,120 frontal chest radiographs (NIH ChestX-ray14). Select a pulmonary condition to inspect how gradients localize pathology without bounding box supervision.
          </p>
        </div>

        <div className="font-mono text-xs rounded-xl bg-[#F4F4F4] px-3.5 py-1.5 font-bold text-[#080808]">
          DenseNet-121 · NIH 14
        </div>
      </div>

      {/* Main Grid: Radiograph Simulation + Pathology Controls */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-center">
        {/* Synthetic Radiograph Viewport */}
        <div className="flex flex-col items-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-2 border-[#0F172A] bg-[#0A0E1A] shadow-lg flex items-center justify-center">
            {/* SVG Synthetic Chest Anatomy */}
            <svg
              className="absolute inset-0 h-full w-full opacity-70"
              viewBox="0 0 100 100"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            >
              {/* Clavicles & Spine */}
              <line x1="20" y1="20" x2="48" y2="24" strokeWidth="1.2" />
              <line x1="80" y1="20" x2="52" y2="24" strokeWidth="1.2" />
              <line x1="50" y1="18" x2="50" y2="85" strokeWidth="1.5" strokeDasharray="1,2" />

              {/* Rib cage contours */}
              <path d="M22 28 Q48 35 48 30" />
              <path d="M78 28 Q52 35 52 30" />
              <path d="M18 38 Q48 48 48 40" />
              <path d="M82 38 Q52 48 52 40" />
              <path d="M17 50 Q48 60 48 52" />
              <path d="M83 50 Q52 60 52 52" />
              <path d="M18 64 Q48 72 48 65" />
              <path d="M82 64 Q52 72 52 65" />

              {/* Lung field cavities */}
              <path
                d="M20 28 C20 18, 45 18, 46 35 C47 50, 48 70, 25 78 C18 70, 18 45, 20 28 Z"
                fill="#1e293b"
                opacity="0.55"
              />
              <path
                d="M80 28 C80 18, 55 18, 54 35 C53 50, 52 70, 75 78 C82 70, 82 45, 80 28 Z"
                fill="#1e293b"
                opacity="0.55"
              />

              {/* Heart Silhouette */}
              <ellipse
                cx="50"
                cy="58"
                rx="15"
                ry="18"
                fill="#334155"
                opacity="0.75"
                transform="rotate(-15 50 58)"
              />
            </svg>

            {/* Grad-CAM Heatmap Radial Layer */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: heatmapIntensity / 100,
                background: `radial-gradient(circle at ${selectedPathology.heatmapPos.x}% ${selectedPathology.heatmapPos.y}%, ${selectedPathology.heatmapPos.color} 0%, rgba(220,38,38,0.2) ${selectedPathology.heatmapPos.radius}%, transparent ${selectedPathology.heatmapPos.radius + 15}%)`,
              }}
            />

            {/* Telemetry watermark */}
            <div className="absolute bottom-2 left-2 font-mono text-[9px] text-neutral-300 bg-black/75 px-2 py-0.5 rounded backdrop-blur-sm">
              CAM_LAYER: dense4_block16 · α={heatmapIntensity}%
            </div>
          </div>

          {/* Slider for Heatmap Intensity */}
          <div className="mt-3 w-full max-w-[256px]">
            <div className="flex justify-between font-mono text-[10px] text-[#666666]">
              <span>Raw Radiograph</span>
              <span className="font-bold text-[#DC2626]">Grad-CAM: {heatmapIntensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={heatmapIntensity}
              onChange={(e) => setHeatmapIntensity(parseInt(e.target.value))}
              className="mt-1 w-full accent-[#DC2626] cursor-pointer"
            />
          </div>
        </div>

        {/* Pathology Selector & Clinical Metrics */}
        <div className="space-y-3">
          <span className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider block">
            Select Pulmonary Pathology to Localize:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PATHOLOGIES.map((p) => {
              const isSelected = p.id === selectedPathology.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelect(p)}
                  className={`flex flex-col text-left rounded-xl p-3 border transition-all duration-200 ${
                    isSelected
                      ? "bg-[#FEF2F2] border-[#DC2626] shadow-sm ring-1 ring-[#DC2626]"
                      : "bg-[#FAFAFA] border-[#E8E8E8] hover:border-[#D0D0D0] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-[#080808]">
                      {p.name}
                    </span>
                    <span className="font-mono text-xs text-[#DC2626] font-bold">
                      AUC {p.auc}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs text-[#555555] leading-normal">
                    {p.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Clinical Architecture Footnote */}
          <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-3 font-mono text-xs text-[#555555]">
            <span className="text-[#DC2626] font-bold">Gradients Localization Formula:</span>
            <p className="mt-0.5 text-[11px] text-[#666666]">
              L^c_{`{Grad-CAM}`} = ReLU(∑ α_k^c · A^k) where α_k^c = (1/Z) ∑_i ∑_j (∂y^c / ∂A_{`{i,j}`}^k)
            </p>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F0F0F0] text-xs font-mono">
        <span className="text-[#666666]">
          De-identified clinical validation and multi-label classification:
        </span>
        <div className="flex items-center gap-4 font-bold">
          <a href="/work/medical-ai" className="text-[#DC2626] hover:underline">
            Read MedicalAI Clinical Architecture Study →
          </a>
          <a
            href="https://github.com/LochanJangid/medicalAI"
            target="_blank"
            rel="noreferrer"
            className="text-[#080808] hover:text-[#DC2626] transition"
          >
            GitHub Repo ↗
          </a>
        </div>
      </div>
    </div>
  );
}
