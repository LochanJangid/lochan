"use client";

import { useState, useEffect, useRef } from "react";
import { burstConfetti } from "../utils/confetti";

const STATS = [
  {
    targetNumber: 9,
    formattedFallback: "09",
    format: (v) => String(Math.round(v)).padStart(2, "0"),
    label: "ML Case Studies",
    desc: "Interactive neural models, open-source tools & ML systems",
    boxClass: "box-aqua",
    tiltClass: "box-tilt-left",
    icon: "🚀",
  },
  {
    targetNumber: 79,
    formattedFallback: "79 min",
    format: (v) => `${Math.round(v)} min`,
    label: "Deep RAG Masterclass",
    desc: "From Naive to Advanced & Modular RAG in Python",
    boxClass: "box-sun",
    tiltClass: "box-tilt-right",
    icon: "🧠",
  },
  {
    targetNumber: 97.7,
    formattedFallback: "97.7%",
    format: (v) => `${v.toFixed(1)}%`,
    label: "nanoCalc-GPT Match",
    desc: "Four-operation transformer arithmetic exact match",
    boxClass: "box-pink",
    tiltClass: "box-tilt-left",
    icon: "🔢",
  },
  {
    targetNumber: 45211,
    formattedFallback: "45,211",
    format: (v) => Math.round(v).toLocaleString("en-US"),
    label: "Bank Marketing Records",
    desc: "Portuguese bank term-deposit dataset classified",
    boxClass: "box-periwinkle",
    tiltClass: "box-tilt-right",
    icon: "📈",
  },
];

export default function StatsStrip() {
  const [counts, setCounts] = useState(() => STATS.map((s) => s.formattedFallback));
  const sectionRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    // If prefers-reduced-motion is enabled, leave values as static fallbacks
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;

          const durationMs = 1200;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS.map((s) => s.format(s.targetNumber * easeOut))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(STATS.map((s) => s.formattedFallback));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1, rootMargin: "60px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleStatClick = (e, stat) => {
    burstConfetti(e, [stat.icon, "✨", "📊", "🎯"]);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Key Milestones"
      className="mx-auto max-w-6xl px-4 sm:px-6 stats-gap"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat, idx) => (
          <div
            key={idx}
            onClick={(e) => handleStatClick(e, stat)}
            tabIndex={0}
            role="button"
            aria-label={`${stat.formattedFallback} ${stat.label}: ${stat.desc}`}
            className={`box ${stat.boxClass} ${stat.tiltClass} p-5 sm:p-6 cursor-pointer flex flex-col justify-between select-none`}
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1b1840]">
                // {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl spin-on-hover select-none" aria-hidden="true">
                {stat.icon}
              </span>
            </div>

            <div className="mt-4">
              <div className="font-sans text-4xl sm:text-5xl font-black text-[#1b1840] tracking-tight">
                {counts[idx]}
              </div>
              <div className="mt-1 font-sans text-base font-black text-[#1b1840]">
                {stat.label}
              </div>
              <p className="mt-1 font-sans text-xs sm:text-sm font-medium text-[#1b1840] leading-snug">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
