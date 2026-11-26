"use client";

import Link from "next/link";
import PixelDigit from "../components/PixelDigit";
import { burstConfetti } from "../utils/confetti";

export default function NotFound() {
  const handleHomeClick = (e) => {
    burstConfetti(e, ["🚀", "✨", "🏠", "⚡", "🧪"]);
  };

  return (
    <main className="relative mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
      {/* Handwritten subtitle */}
      <div className="inline-flex items-center gap-2 font-handwriting text-2xl sm:text-3xl font-bold text-[var(--pink)] -rotate-2 mb-4">
        <span>Oops! Latent vector out of bounds</span>
        <span className="text-xl">🧪</span>
      </div>

      {/* 404 Pixel Digit Display */}
      <div className="my-6 flex items-center justify-center gap-3 sm:gap-6">
        <PixelDigit
          initialDigit={4}
          sequence={[4]}
          autoCycle={false}
          showStickers={false}
          label="Class: 4"
          className="scale-90 sm:scale-100"
        />
        <PixelDigit
          initialDigit={0}
          sequence={[0]}
          autoCycle={false}
          showStickers={false}
          label="Class: 0"
          className="scale-90 sm:scale-100"
        />
        <PixelDigit
          initialDigit={4}
          sequence={[4]}
          autoCycle={false}
          showStickers={false}
          label="Class: 4"
          className="scale-90 sm:scale-100"
        />
      </div>

      {/* Section rainbow bar */}
      <div className="rainbow-bar my-6" aria-hidden="true" />

      {/* Headline & description */}
      <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
        404 — Page Not Found in the Lab
      </h1>
      <p className="mt-4 max-w-lg font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed">
        The experiment, notebook, or model checkpoint you are looking for does not exist in this branch. Let&apos;s get you back to the main lab shelf!
      </p>

      {/* Return button */}
      <div className="mt-8">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="btn-pill inline-flex items-center gap-2 bg-[var(--sun)] px-6 py-3 font-sans text-base font-extrabold text-[#1b1840]"
        >
          <span>← Back to Lab Shelf</span>
          <span>🏠</span>
        </Link>
      </div>
    </main>
  );
}
