"use client";

import Link from "next/link";
import PixelDigit from "./PixelDigit";
import { burstConfetti } from "../utils/confetti";

export default function HeroSection() {
  const handlePrimaryClick = (e) => {
    burstConfetti(e, ["🚀", "📺", "✨", "⚡"]);
  };

  const handleSecondaryClick = (e) => {
    burstConfetti(e, ["🧪", "💡", "🔬", "🤖"]);
  };

  return (
    <section className="relative mx-auto mt-6 sm:mt-12 max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Greeting, Headline, Bio, Action Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Handwritten greeting in Caveat */}
          <div className="inline-flex items-center gap-2 font-handwriting text-2xl sm:text-3xl text-[var(--pink)] font-bold tracking-wide -rotate-1 mb-2">
            <span>Hey there! Welcome to my lab notebook</span>
            <span className="text-xl">✍️</span>
          </div>

          {/* Big Headline with highlighted phrase */}
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--ink)] leading-[1.08]">
            Engineering &amp; teaching{" "}
            <span className="relative inline-block mt-1">
              <span className="relative z-10 rounded-xl border-2 border-[var(--ink)] bg-[var(--sun)] px-3 py-0.5 text-[#1b1840] shadow-[3px_3px_0_var(--shadow)]">
                ML from scratch
              </span>
            </span>
          </h1>

          {/* Short lead from real bio */}
          <p className="mt-5 max-w-xl font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed">
            I&apos;m <strong className="text-[var(--ink)]">Lochan Jangid</strong>, an AI/ML Engineer
            at REGEx Software Services and creator at{" "}
            <strong className="text-[var(--ink)]">@lochanjangidcoder</strong>.
            I design <span className="marker-highlight">vector pipelines</span>, train{" "}
            <span className="marker-highlight">transformer models</span>, and teach{" "}
            <span className="marker-highlight">production AI</span> down to the tensor math.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
              onClick={handlePrimaryClick}
              className="btn-pill bg-[#ff0000] text-white px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-black shadow-[3px_3px_0_var(--shadow)] hover:bg-[#cc0000] inline-flex items-center gap-2"
            >
              <span className="text-lg leading-none">▶</span>
              <span>Subscribe</span>
            </a>

            <a
              href="https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ"
              target="_blank"
              rel="noreferrer"
              onClick={handlePrimaryClick}
              className="btn-pill btn-primary px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base"
            >
              Watch channel ↗
            </a>

            <Link
              href="#projects"
              onClick={handleSecondaryClick}
              className="btn-pill btn-secondary px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base"
            >
              See projects ↓
            </Link>
          </div>

          {/* Quick status badge */}
          <div className="mt-6 flex items-center gap-3 font-mono text-xs text-[var(--mute)]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--aqua)] ring-4 ring-[var(--aqua)]/30 animate-pulse" />
            <span>Currently engineering RAG &amp; Deep Vision in Jaipur, India</span>
          </div>
        </div>

        {/* Right Column: Interactive Pixel-Digit Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <PixelDigit />
        </div>
      </div>
    </section>
  );
}
