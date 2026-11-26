"use client";

import { useState, useEffect } from "react";
import { burstConfetti } from "../utils/confetti";

// 5x7 font bitmaps for digits 0-9
const DIGIT_BITMAPS = {
  0: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  1: [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  2: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  3: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  4: [
    [0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  5: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  6: [
    [0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  7: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  8: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  9: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
  ],
};

export default function PixelDigit({
  initialDigit = 0,
  autoCycle = true,
  cycleInterval = 2600,
  sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  showStickers = true,
  label = "MNIST Class Sensor",
  className = "",
  onDigitChange,
}) {
  const [index, setIndex] = useState(
    Math.max(0, sequence.indexOf(initialDigit))
  );

  const currentDigit = sequence[index % sequence.length];
  const grid = DIGIT_BITMAPS[currentDigit] || DIGIT_BITMAPS[0];

  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % sequence.length;
        if (onDigitChange) onDigitChange(sequence[next]);
        return next;
      });
    }, cycleInterval);
    return () => clearInterval(interval);
  }, [autoCycle, cycleInterval, sequence, onDigitChange]);

  const handleClick = (e) => {
    burstConfetti(e, ["✨", "🧪", "⚡", "🤖", "🔢", "🧬"]);
    setIndex((prev) => {
      const next = (prev + 1) % sequence.length;
      if (onDigitChange) onDigitChange(sequence[next]);
      return next;
    });
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Floating sticker emojis around the card */}
      {showStickers && (
        <>
          <div
            aria-hidden="true"
            className="animate-bob absolute -top-4 -left-4 z-20 flex h-11 w-11 select-none items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--sun)] text-xl shadow-[3px_3px_0_var(--shadow)]"
          >
            🧪
          </div>
          <div
            aria-hidden="true"
            className="animate-bob-delayed absolute -top-5 -right-3 z-20 flex h-11 w-11 select-none items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--pink)] text-xl shadow-[3px_3px_0_var(--shadow)]"
          >
            ⚡
          </div>
          <div
            aria-hidden="true"
            className="animate-bob-slow absolute -bottom-3 -left-4 z-20 flex h-11 w-11 select-none items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--aqua)] text-xl shadow-[3px_3px_0_var(--shadow)]"
          >
            🤖
          </div>
          <div
            aria-hidden="true"
            className="animate-bob absolute -bottom-4 -right-3 z-20 flex h-11 w-11 select-none items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--periwinkle)] text-xl shadow-[3px_3px_0_var(--shadow)]"
          >
            ✨
          </div>
        </>
      )}

      {/* Interactive Pixel-Digit Card Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Interactive pixel digit display showing ${currentDigit}. Tap or press Enter to advance digit and burst confetti.`}
        className="box box-tilt-left group relative z-10 flex flex-col items-center p-5 sm:p-6 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--periwinkle)] active:scale-95"
      >
        {/* Card header chip */}
        <div className="flex w-full items-center justify-between gap-3 border-b-2 border-[var(--ink)]/20 pb-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--mute)]">
            {label}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-[var(--ink)] bg-[var(--sun)] px-2.5 py-0.5 font-mono text-xs font-black text-[#1b1840]">
            <span className="h-2 w-2 rounded-full bg-[#1b1840] animate-pulse" />
            DIGIT: {currentDigit}
          </span>
        </div>

        {/* 5x7 Pixel Dot Matrix Grid */}
        <div className="my-5 grid grid-cols-5 gap-2 sm:gap-2.5 rounded-xl border-2 border-[var(--ink)] bg-[var(--ink)]/5 p-3.5 sm:p-4">
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`h-4 w-4 sm:h-5 sm:w-5 rounded-md transition-all duration-200 border ${
                  cell
                    ? "bg-[var(--pink)] border-[var(--ink)] shadow-[1px_1px_0_var(--shadow)] scale-100"
                    : "bg-[var(--mute)]/15 border-transparent scale-90"
                }`}
              />
            ))
          )}
        </div>

        {/* Card footer details */}
        <div className="flex w-full items-center justify-between border-t-2 border-[var(--ink)]/20 pt-3 font-mono text-xs">
          <span className="text-[var(--mute)] font-semibold">interactive demo</span>
          <span className="font-bold text-[var(--ink)] group-hover:underline">
            Tap to test ↗
          </span>
        </div>
      </button>
    </div>
  );
}
