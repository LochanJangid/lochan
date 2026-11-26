"use client";

import { useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

export default function NeuralContactBanner() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    spiderAudio.playMissionUnlock();
    navigator.clipboard.writeText("lochanjangidcoder@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="contact" className="mt-14 sm:mt-20">
      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] bg-[#080808] p-8 sm:p-12 md:p-16 text-white shadow-2xl">
        {/* Playful background decorative shapes */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#8584D5]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#FFC568]/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFC568] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#080808]">
            <span>✦</span>
            LET&rsquo;S COLLABORATE
          </span>

          <h3 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
            Let&rsquo;s Build Something Intelligent.
          </h3>

          <p className="mt-4 font-sans text-base sm:text-lg leading-relaxed text-neutral-300">
            Open for full-time Machine Learning Engineer opportunities, ML systems engineering roles, research collaborations, and deep-dive technical lectures. Reach out directly:
          </p>

          {/* Action Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-3 rounded-full bg-[#8584D5] px-7 py-3.5 font-display text-sm sm:text-base font-bold text-white shadow-lg transition-all hover:bg-[#FFC568] hover:text-[#080808] hover:scale-105 active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>
                {copiedEmail ? "Copied to Clipboard! ✓" : "lochanjangidcoder@gmail.com"}
              </span>
            </button>

            <a
              href="mailto:lochanjangidcoder@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-6 py-3.5 font-display text-sm sm:text-base font-semibold text-white transition hover:border-white hover:bg-neutral-800"
            >
              <span>Send Direct Email</span>
              <span aria-hidden="true">✉</span>
            </a>
          </div>

          {/* Social Channels Row */}
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-neutral-800 pt-8 font-display text-sm font-semibold">
            <a
              href="https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ"
              target="_blank"
              rel="noreferrer"
              className="text-[#FFC568] hover:underline transition flex items-center gap-1.5"
            >
              <span>▶</span>
              <span>YouTube: @lochanjangidcoder ↗</span>
            </a>
            <a
              href="https://github.com/LochanJangid"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/lochan-jangid/"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://colab.research.google.com/drive/1mnmYSLZqQSMRXXdvdJdZJnml7_PHgJrC?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition"
            >
              Colab Notebooks ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
