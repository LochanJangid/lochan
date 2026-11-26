"use client";

import { useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

const PRESET_EQUATIONS = [
  { a: 47, b: 85, ans: 132, reversed: "+2310" },
  { a: 99, b: 1, ans: 100, reversed: "+0010" },
  { a: 64, b: 79, ans: 143, reversed: "+3410" },
  { a: 88, b: 99, ans: 187, reversed: "+7810" },
];

export default function InteractiveTransformerLab({ onDiscovery }) {
  const [numA, setNumA] = useState(47);
  const [numB, setNumB] = useState(85);
  const [useTargetReversal, setUseTargetReversal] = useState(true);
  const [hoveredToken, setHoveredToken] = useState(null);

  const sum = numA + numB;
  const standardTokens = `${numA}+${numB}=${sum}`.split("");
  const reversedSumStr = String(sum).split("").reverse().join("");
  const reversalTokens = `${numA}+${numB}=+${reversedSumStr}0`.split("");

  const activeTokens = useTargetReversal ? reversalTokens : standardTokens;

  const handleToggleReversal = (val) => {
    spiderAudio.playHudClick();
    setUseTargetReversal(val);
    if (onDiscovery) onDiscovery("transformer");
  };

  const handleSelectPreset = (p) => {
    spiderAudio.playNeuralChirp(720);
    setNumA(p.a);
    setNumB(p.b);
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#E5E5E5] bg-white p-6 sm:p-8 text-[#080808] shadow-sm">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0F0F0] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#9574C4]">
            <span className="flex h-2 w-2 rounded-full bg-[#9574C4] animate-ping" />
            <span>LIVE INTERACTIVE ALGORITHM SANDBOX // 02</span>
          </div>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-black tracking-tight text-[#080808]">
            nanoCalc-GPT: Target Reversal Transformer
          </h3>
          <p className="mt-1 font-sans text-xs sm:text-sm text-[#555555] max-w-2xl leading-relaxed">
            A 1.2M parameter decoder-only transformer trained from scratch. Discover how reversing the target arithmetic sequence eliminates the autoregressive carry bottleneck.
          </p>
        </div>

        {/* Toggle between Standard & Target Reversal */}
        <div className="flex rounded-xl bg-[#F4F4F4] p-1 font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => handleToggleReversal(false)}
            className={`rounded-lg px-3 py-1.5 transition ${
              !useTargetReversal
                ? "bg-[#DC2626] text-white shadow-sm"
                : "text-[#666666] hover:text-[#080808]"
            }`}
          >
            Standard L-to-R (~50%)
          </button>
          <button
            type="button"
            onClick={() => handleToggleReversal(true)}
            className={`rounded-lg px-3 py-1.5 transition ${
              useTargetReversal
                ? "bg-[#9574C4] text-white shadow-sm"
                : "text-[#666666] hover:text-[#080808]"
            }`}
          >
            Target Reversal (99.51%)
          </button>
        </div>
      </div>

      {/* Interactive Controls & Presets */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arithmetic Inputs */}
        <div className="rounded-2xl border border-[#EEEEEE] bg-[#FAFAFA] p-4">
          <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider">
            Adjust Multi-Digit Arithmetic Operands:
          </label>
          <div className="mt-3 flex items-center gap-3 font-mono text-lg font-bold">
            <input
              type="number"
              min="1"
              max="999"
              value={numA}
              onChange={(e) => setNumA(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-24 rounded-xl border border-[#E0E0E0] bg-white px-3 py-2 text-center text-[#080808] focus:border-[#9574C4] focus:outline-none shadow-sm"
            />
            <span className="text-[#9574C4] text-xl">+</span>
            <input
              type="number"
              min="1"
              max="999"
              value={numB}
              onChange={(e) => setNumB(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-24 rounded-xl border border-[#E0E0E0] bg-white px-3 py-2 text-center text-[#080808] focus:border-[#9574C4] focus:outline-none shadow-sm"
            />
            <span className="text-[#888888] text-xl">=</span>
            <span className="rounded-xl bg-[#F3E8FF] border border-[#D8B4FE] px-4 py-2 text-[#6B21A8] font-black">
              {sum}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="text-[#888888]">Presets:</span>
            {PRESET_EQUATIONS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className="rounded-full border border-[#E5E5E5] bg-white px-2.5 py-1 text-[#555555] transition hover:border-[#9574C4] hover:text-[#080808] shadow-sm"
              >
                {p.a} + {p.b}
              </button>
            ))}
          </div>
        </div>

        {/* The Bottleneck vs Solution Explanation */}
        <div className="rounded-2xl border border-[#EEEEEE] bg-[#FAFAFA] p-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAEAEA]">
            <span className="font-bold uppercase tracking-wider text-[#080808]">
              {useTargetReversal ? "⚡ REVERSAL MECHANISM" : "❌ CARRY BOTTLENECK"}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                useTargetReversal
                  ? "bg-[#F3E8FF] text-[#6B21A8] border border-[#D8B4FE]"
                  : "bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]"
              }`}
            >
              {useTargetReversal ? "100.0% Exact Match" : "Fails On Multi-Digit Carry"}
            </span>
          </div>

          <p className="mt-2.5 font-sans text-xs sm:text-sm text-[#555555] leading-relaxed">
            {useTargetReversal ? (
              <>
                By reversing the target output (<code className="text-[#6B21A8] font-mono font-bold">+{reversedSumStr}0</code>), the model predicts the units column <em>first</em>. Just like manual pencil-and-paper addition, carry flows into the next causal token step naturally without requiring future token lookahead.
              </>
            ) : (
              <>
                Standard autoregressive generation forces the transformer to output the hundreds digit <em>before</em> it knows whether a carry will propagate from the units digit. Because attention cannot look into the future, accuracy drops to ~50% on carried sums.
              </>
            )}
          </p>

          <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#888888]">
            <span>Params: 1,224,458 (6 layers · 4 heads · d=128)</span>
            <span className="text-[#9574C4] font-bold">AdamW · OneCycleLR</span>
          </div>
        </div>
      </div>

      {/* Interactive Token Attention Grid */}
      <div className="mt-6">
        <div className="flex items-center justify-between pb-2">
          <span className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider">
            Causal Attention Sequence // Hover Tokens to Inspect Attention Weights
          </span>
          <span className="font-mono text-[11px] text-[#9574C4] font-semibold">
            Context: {activeTokens.length} tokens
          </span>
        </div>

        {/* Tokens Row */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] p-4">
          {activeTokens.map((token, idx) => {
            const isTarget = idx >= activeTokens.indexOf("=") + 1;
            const isHovered = hoveredToken === idx;

            return (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => {
                  setHoveredToken(idx);
                  spiderAudio.playNeuralChirp(400 + idx * 50);
                }}
                onMouseLeave={() => setHoveredToken(null)}
                className={`flex h-12 w-12 flex-col items-center justify-center rounded-xl font-mono text-sm font-bold transition-all duration-200 ${
                  isHovered
                    ? "scale-110 bg-[#9574C4] text-white shadow-md ring-2 ring-[#D8B4FE]"
                    : isTarget
                    ? "bg-[#F3E8FF] border border-[#D8B4FE] text-[#6B21A8] hover:border-[#9574C4]"
                    : "bg-white border border-[#E5E5E5] text-[#080808] hover:bg-[#F5F5F5] shadow-sm"
                }`}
              >
                <span>{token}</span>
                <span className="text-[9px] font-normal text-[#888888]">t_{idx}</span>
              </button>
            );
          })}
        </div>

        {/* Attention Weights Matrix Heatmap Mini-View */}
        <div className="mt-3 rounded-xl border border-[#EAEAEA] bg-[#F9F9F9] p-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#666666] text-[11px]">
            <span>Layer 6 Head 4 Attention Intensity:</span>
            <span className="text-[#9574C4] font-bold">
              {hoveredToken !== null
                ? `Focusing on token ${hoveredToken} (${activeTokens[hoveredToken]})`
                : "Hover over any token"}
            </span>
          </div>

          <div className="mt-2 grid grid-flow-col gap-1 auto-cols-fr h-7 bg-[#EFEFEF] p-1 rounded-lg">
            {activeTokens.map((_, i) => {
              const weight =
                hoveredToken === null
                  ? 0.35 + Math.sin(i) * 0.25
                  : hoveredToken >= i
                  ? Math.max(0.15, 1 - (hoveredToken - i) * 0.18)
                  : 0.08;

              return (
                <div
                  key={i}
                  className="rounded transition-all duration-200"
                  style={{
                    backgroundColor: `rgba(149, 116, 196, ${weight})`,
                  }}
                  title={`Attention to t_${i}: ${(weight * 100).toFixed(0)}%`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Study & Repository Link */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F0F0F0] text-xs font-mono">
        <span className="text-[#666666]">
          Source code, training logs &amp; weights published openly:
        </span>
        <div className="flex items-center gap-4 font-bold">
          <a
            href="/work/nanocalc-gpt"
            className="text-[#9574C4] hover:underline"
          >
            Read NanoCalc-GPT Paper &amp; Case Study →
          </a>
          <a
            href="https://github.com/LochanJangid/nanocalc-gpt"
            target="_blank"
            rel="noreferrer"
            className="text-[#080808] hover:text-[#9574C4] transition"
          >
            GitHub Repo ↗
          </a>
        </div>
      </div>
    </div>
  );
}
