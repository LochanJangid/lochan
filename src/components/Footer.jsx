"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { burstConfetti } from "../utils/confetti";

export default function Footer() {
  const [countdown, setCountdown] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          burstConfetti(null, ["👀", "✨", "🌱", "🧘"]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const startEyeBreak = (e) => {
    burstConfetti(e, ["👀", "🌿", "🧘"]);
    setIsCompleted(false);
    setCountdown(20);
  };

  const socials = [
    {
      label: "YouTube",
      url: "https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ",
      handle: "@lochanjangidcoder",
      icon: "📺",
    },
    {
      label: "GitHub",
      url: "https://github.com/LochanJangid",
      handle: "@LochanJangid",
      icon: "💻",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/lochanjangid/",
      handle: "in/lochanjangid",
      icon: "💼",
    },
  ];

  return (
    <footer className="mx-auto max-w-6xl px-4 sm:px-6 mt-16 sm:mt-24 pb-12">
      <div className="box p-6 sm:p-10 bg-[var(--card)] flex flex-col gap-8">
        {/* Top: Eye break widget + Social links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2 border-[var(--ink)]/15 pb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--periwinkle)]">
              // LAB WELLNESS UTILITY
            </div>
            <h3 className="mt-1 font-sans text-xl sm:text-2xl font-black text-[var(--ink)]">
              The 20-20-20 Rule
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--mute)] max-w-md">
              Every 20 minutes, look at an object 20 feet away for at least 20 seconds to protect your eyes.
            </p>
          </div>

          {/* Interactive Eye Break Button */}
          <div>
            {countdown > 0 ? (
              <div className="btn-pill bg-[var(--aqua)] px-6 py-3 font-mono text-xs sm:text-sm font-bold text-[#1b1840] animate-pulse">
                Resting eyes... {countdown}s remaining 👀
              </div>
            ) : isCompleted ? (
              <button
                type="button"
                onClick={startEyeBreak}
                className="btn-pill bg-[var(--sun)] px-6 py-3 font-mono text-xs sm:text-sm font-bold text-[#1b1840]"
              >
                Eyes refreshed! 🧘 Click to repeat
              </button>
            ) : (
              <button
                type="button"
                onClick={startEyeBreak}
                className="btn-pill btn-primary px-6 py-3 font-mono text-xs sm:text-sm font-bold text-[#1b1840]"
              >
                👁️ Take a 20s Eye Break
              </button>
            )}
          </div>
        </div>

        {/* Middle: Social Links */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-secondary px-4 py-2 text-xs font-bold flex items-center gap-2"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
                <span className="font-mono text-xs text-[var(--mute)]">
                  {s.handle}
                </span>
                <span>↗</span>
              </a>
            ))}
          </div>

          <div className="font-mono text-xs text-[var(--mute)]">
            Jaipur, Rajasthan, India 🇮🇳
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[var(--ink)]/10 font-mono text-xs text-[var(--mute)]">
          <div>
            © {new Date().getFullYear()} Lochan Jangid. Built from scratch with Next.js &amp; CSS tokens.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>•</span>
            <Link href="/writing" className="hover:underline">
              Writing
            </Link>
            <span>•</span>
            <Link href="/work/mnist#demo" className="hover:underline">
              MNIST Canvas Demo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
