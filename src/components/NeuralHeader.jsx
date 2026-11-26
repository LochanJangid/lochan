"use client";

import { useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

export default function NeuralHeader({
  viewMode,
  setViewMode,
  onOpenTerminal,
  onToggleSound,
  isMuted,
}) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    spiderAudio.playHudClick();
    navigator.clipboard.writeText("lochanjangidcoder@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleModeChange = (mode) => {
    spiderAudio.playDimensionalGlitch();
    setViewMode(mode);
  };

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#ECECEC] pb-6">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#8584D5] font-display text-base font-black text-white shadow-sm">
          LJ
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-black tracking-tight text-[#080808]">
              LOCHAN JANGID
            </span>
            <span className="rounded-full bg-[#EAEAEA] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#555555]">
              ML ENGINEER
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#666666]">
            <span>REGEx Software Services</span>
            <span>·</span>
            <a
              href="https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#DC2626] hover:underline"
            >
              <span>▶</span>
              <span>@lochanjangidcoder</span>
            </a>
          </div>
        </div>
      </div>

      {/* Center: Multiverse Persona Switcher */}
      <div className="flex items-center rounded-full bg-white p-1 border border-[#E5E5E5] font-mono text-xs font-bold shadow-sm">
        <button
          type="button"
          onClick={() => handleModeChange("neural")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
            viewMode === "neural"
              ? "bg-[#080808] text-white shadow-sm"
              : "text-[#666666] hover:text-[#080808]"
          }`}
          title="Interactive ML Studio"
        >
          <span>⚡</span>
          <span className="hidden sm:inline">Interactive Studio</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("monograph")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
            viewMode === "monograph"
              ? "bg-[#8584D5] text-white shadow-sm"
              : "text-[#666666] hover:text-[#080808]"
          }`}
          title="Clean Editorial Monograph Mode"
        >
          <span>📄</span>
          <span className="hidden sm:inline">Monograph</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("spidey")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
            viewMode === "spidey"
              ? "bg-red-600 text-white shadow-sm"
              : "text-[#666666] hover:text-[#080808]"
          }`}
          title="Spider-Verse Mode"
        >
          <span>🕷️</span>
          <span className="hidden sm:inline">Spider-Verse</span>
        </button>
      </div>

      {/* Right Controls: Sound + CLI + Email */}
      <div className="flex items-center gap-3">
        {/* Terminal Button */}
        <button
          type="button"
          onClick={onOpenTerminal}
          className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-[#555555] shadow-sm transition hover:border-[#8584D5] hover:text-[#8584D5]"
          title="Open Neural Terminal (~ or Esc)"
        >
          <span>&gt;_</span>
          <span>CLI</span>
        </button>

        {/* Audio Mute/Unmute */}
        <button
          type="button"
          onClick={onToggleSound}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-xs text-[#555555] shadow-sm transition hover:border-[#080808] hover:text-[#080808]"
          title={isMuted ? "Unmute Synthetic Audio" : "Mute Audio"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* Get in Touch CTA */}
        <a
          href="mailto:lochanjangidcoder@gmail.com"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#080808] px-4 py-2 font-display text-xs font-bold text-white shadow-sm transition hover:bg-[#8584D5] hover:scale-105 active:scale-95"
        >
          <span>Get in touch</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
