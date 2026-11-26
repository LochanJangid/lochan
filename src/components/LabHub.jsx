"use client";

import { useState } from "react";
import InteractiveRagLab from "./InteractiveRagLab";
import InteractiveTransformerLab from "./InteractiveTransformerLab";
import InteractiveMnistLab from "./InteractiveMnistLab";
import InteractiveMedicalLab from "./InteractiveMedicalLab";
import { spiderAudio } from "../app/Spidey/spiderAudio";

const LAB_TABS = [
  {
    id: "rag",
    label: "01 // RAG Engine",
    title: "Modular RAG & FAISS",
    badge: "Vector Search",
    accent: "bg-[#8584D5] text-white border-[#8584D5]",
  },
  {
    id: "transformer",
    label: "02 // Transformer",
    title: "nanoCalc-GPT Reversal",
    badge: "Attention Bottleneck",
    accent: "bg-[#9574C4] text-white border-[#9574C4]",
  },
  {
    id: "mnist",
    label: "03 // PyTorch Vision",
    title: "28×28 Digit Classifier",
    badge: "Canvas API",
    accent: "bg-[#080808] text-white border-[#080808]",
  },
  {
    id: "medical",
    label: "04 // DenseNet Medical",
    title: "Grad-CAM Chest X-Ray",
    badge: "Feature Localization",
    accent: "bg-[#DC2626] text-white border-[#DC2626]",
  },
];

export default function LabHub({ onDiscovery }) {
  const [activeTab, setActiveTab] = useState("rag");

  const handleTabChange = (tabId) => {
    spiderAudio.playHudClick();
    setActiveTab(tabId);
  };

  return (
    <section id="neural-lab" className="mt-14 sm:mt-20">
      {/* Section Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#ECECEC] pb-5">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#8584D5]">
            01 // INTERACTIVE COMPUTATIONAL LABORATORY
          </p>
          <h3 className="mt-1 font-display text-3xl sm:text-4xl font-black tracking-tight text-[#080808]">
            Live Machine Learning Sandboxes
          </h3>
          <p className="mt-2 font-sans text-sm sm:text-base text-[#555555] max-w-2xl leading-relaxed">
            Don&rsquo;t just take our word for it—interact with the actual mathematics, causal attention mechanics, and convolutional feature maps in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#555555]">
          <span className="rounded-full bg-white border border-[#E5E5E5] px-3.5 py-1.5 font-bold text-[#080808] shadow-sm">
            4 CLIENT-SIDE ENGINES
          </span>
        </div>
      </div>

      {/* Tab Switcher Pills */}
      <div className="mb-6 flex flex-wrap gap-2 sm:gap-2.5">
        {LAB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 font-display text-xs sm:text-sm font-bold transition-all duration-200 ${
                isActive
                  ? `${tab.accent} shadow-md scale-[1.02]`
                  : "border-[#E5E5E5] bg-white text-[#555555] hover:border-[#D0D0D0] hover:text-[#080808] shadow-sm"
              }`}
            >
              <span>{tab.title}</span>
              <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-normal ${
                isActive ? "bg-white/20 text-white" : "bg-[#F3F3F3] text-[#555555]"
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Lab Component */}
      <div className="transition-all duration-300">
        {activeTab === "rag" && <InteractiveRagLab onDiscovery={onDiscovery} />}
        {activeTab === "transformer" && (
          <InteractiveTransformerLab onDiscovery={onDiscovery} />
        )}
        {activeTab === "mnist" && (
          <InteractiveMnistLab onDiscovery={onDiscovery} />
        )}
        {activeTab === "medical" && (
          <InteractiveMedicalLab onDiscovery={onDiscovery} />
        )}
      </div>
    </section>
  );
}
