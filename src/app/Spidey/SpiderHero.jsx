"use client";

import { useEffect, useState, useRef } from "react";
import SpiderCityCanvas from "./SpiderCityCanvas";
import { spiderAudio } from "./spiderAudio";

export default function SpiderHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spiderSense, setSpiderSense] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const triggerSpiderSense = () => {
    spiderAudio.playThwip();
    setSpiderSense(true);
    setTimeout(() => setSpiderSense(false), 900);
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-x-hidden bg-[#02040b] text-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-20 sm:pt-24 lg:pt-24 pb-6 sm:pb-8 select-none"
    >
      {/* BACKGROUND CITYSCAPE & ATMOSPHERE */}
      <SpiderCityCanvas />

      {/* DIMENSION & COORDINATE HUD BADGE */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 mb-2 sm:mb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-red-600" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-red-400 font-semibold">
            SECTOR: EARTH-616 // JAIPUR HUB
          </span>
          <span className="hidden sm:inline text-neutral-600 font-mono text-[10px]">
            |
          </span>
          <span className="hidden sm:inline font-mono text-[9px] tracking-[0.18em] text-neutral-400">
            COORD: 26.9124° N, 75.7873° E
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block px-2.5 py-0.5 rounded border border-red-500/40 bg-red-950/30 font-mono text-[9px] tracking-[0.16em] text-red-300">
            SPIDER-VERSE PROTOCOL ACTIVE
          </span>
        </div>
      </div>

      {/* MAIN HERO COMPOSITION (EDITORIAL TYPOGRAPHY + PERCHED SPIDER-MAN) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center flex-1 my-auto py-2 sm:py-6">
        
        {/* LEFT: OVERSIZED EDITORIAL TYPOGRAPHY */}
        <div
          className="lg:col-span-7 flex flex-col justify-center"
          style={{
            transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -4}px, 0)`,
            transition: "transform 240ms ease-out",
          }}
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-0.5 w-6 bg-red-600" />
            <span className="font-mono text-[11px] tracking-[0.32em] text-red-400 uppercase font-bold">
              LOCHAN JANGID
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-blue-950/70 border border-blue-500/40 text-blue-300 font-semibold">
              ML ENGINEER
            </span>
          </div>

          {/* Bold, Oversized Spider-Verse Headline */}
          <h1 className="font-black text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl tracking-tight leading-[0.95] uppercase font-sans">
            <span
              className="block text-white transition-all duration-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              style={{
                textShadow: mousePos.x > 0 ? "2px 0 #00e5ff, -2px 0 #ff0055" : "-2px 0 #00e5ff, 2px 0 #ff0055",
              }}
            >
              FROM DATA
            </span>
            <span className="block mt-1 sm:mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 drop-shadow-[0_4px_20px_rgba(239,68,68,0.3)]">
              TO USEFUL AI.
            </span>
          </h1>

          {/* Technical Manifesto Tagline */}
          <p className="mt-4 sm:mt-5 max-w-xl font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            Building machine learning systems that survive beyond notebooks.
            From structured data and deep learning architectures to high-throughput
            FastAPI backends and production systems.
          </p>

          {/* Interactive Navigation Action Badges */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#missions"
              onClick={() => spiderAudio.playHudClick()}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded border border-red-500 bg-red-600 px-5 sm:px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(239,68,68,0.4)] transition hover:bg-red-500 hover:shadow-[0_0_36px_rgba(239,68,68,0.7)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <span>ACCESS MISSIONS</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#dossier"
              onClick={() => spiderAudio.playHudClick()}
              className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-4 sm:px-5 py-3 font-mono text-xs uppercase tracking-wider text-neutral-200 backdrop-blur-sm transition hover:border-blue-400/70 hover:bg-blue-950/40 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>IDENTITY DOSSIER</span>
            </a>

            <a
              href="#archive"
              onClick={() => spiderAudio.playHudClick()}
              className="inline-flex items-center gap-2 rounded border border-white/10 bg-black/40 px-4 sm:px-5 py-3 font-mono text-xs uppercase tracking-wider text-neutral-400 transition hover:border-white/30 hover:text-neutral-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span>MISSION ARCHIVE</span>
            </a>
          </div>
        </div>

        {/* RIGHT: PERCHED SPIDER-MAN ROOFTOP COMPOSITION */}
        <div
          className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0"
          style={{
            transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 6}px, 0)`,
            transition: "transform 220ms ease-out",
          }}
        >
          {/* Spider-Sense Ripple Effect */}
          {spiderSense && (
            <div className="pointer-events-none absolute -top-12 z-20 flex flex-col items-center animate-bounce">
              <span className="font-mono text-xs font-black tracking-widest text-amber-300 bg-red-600/90 border border-amber-300 px-3 py-1 rounded shadow-[0_0_20px_rgba(245,158,11,0.8)]">
                SPIDER-SENSE TINGLING! ⚡
              </span>
              <div className="flex gap-2 mt-1">
                <span className="h-4 w-1 bg-amber-400 rotate-[-25deg]" />
                <span className="h-6 w-1 bg-amber-400" />
                <span className="h-4 w-1 bg-amber-400 rotate-[25deg]" />
              </div>
            </div>
          )}

          {/* Rooftop Perch Container */}
          <div
            onClick={triggerSpiderSense}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerSpiderSense();
              }
            }}
            className="group relative cursor-pointer flex flex-col items-center justify-end w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] xl:max-w-[400px] aspect-[4/5] p-2 sm:p-4 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl"
            title="Click or press Enter to trigger Spider-Sense!"
          >
            {/* Electric Rim Glow behind character */}
            <div className="absolute inset-x-6 bottom-10 h-64 rounded-full bg-gradient-to-t from-red-600/35 via-blue-600/25 to-transparent blur-3xl pointer-events-none" />

            {/* High-Quality Illustrated Superhero Silhouette on Skyscraper Gargoyle */}
            <svg
              viewBox="0 0 400 480"
              className="relative z-10 w-full h-full drop-shadow-[0_12px_36px_rgba(0,0,0,0.9)]"
            >
              <defs>
                {/* Comic Rim Light Gradients */}
                <linearGradient id="suitRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff1744" />
                  <stop offset="60%" stopColor="#b91c1c" />
                  <stop offset="100%" stopColor="#450a0a" />
                </linearGradient>

                <linearGradient id="suitBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="70%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                <linearGradient id="gargoyleStone" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                <filter id="comicHalftoneGlow">
                  <feDropShadow dx="-2" dy="0" stdDeviation="3" floodColor="#00e5ff" floodOpacity="0.6" />
                  <feDropShadow dx="2" dy="0" stdDeviation="3" floodColor="#ff0055" floodOpacity="0.7" />
                </filter>
              </defs>

              {/* ROOFTOP / GARGOYLE STONE LEDGE */}
              <g id="rooftop-ledge">
                <polygon
                  points="40,480 360,480 340,380 200,350 60,380"
                  fill="url(#gargoyleStone)"
                  stroke="#334155"
                  strokeWidth="2"
                />
                <polygon
                  points="140,380 260,380 240,480 160,480"
                  fill="#090d16"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />
                {/* Structural Rivets */}
                <circle cx="80" cy="390" r="3" fill="#64748b" />
                <circle cx="320" cy="390" r="3" fill="#64748b" />
                <circle cx="100" cy="420" r="3" fill="#64748b" />
                <circle cx="300" cy="420" r="3" fill="#64748b" />
              </g>

              {/* WEB LINE FROM ROOFTOP BEAM */}
              <line
                x1="200"
                y1="230"
                x2="350"
                y2="40"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.8"
              />
              <line
                x1="200"
                y1="230"
                x2="350"
                y2="40"
                stroke="#00e5ff"
                strokeWidth="1"
                opacity="0.4"
              />

              {/* CROUCHING SPIDER-MAN HERO FIGURE */}
              <g id="spiderman-crouch" filter="url(#comicHalftoneGlow)">
                {/* Left Leg / Thigh (bent in crouch) */}
                <path
                  d="M 140 330 C 110 320, 90 350, 100 375 C 115 390, 150 380, 160 360 Z"
                  fill="url(#suitBlue)"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
                {/* Left Boot */}
                <path
                  d="M 95 370 C 90 375, 110 395, 130 388 C 120 375, 105 370, 95 370 Z"
                  fill="url(#suitRed)"
                  stroke="#ff1744"
                  strokeWidth="1.5"
                />

                {/* Right Leg / Thigh (perched forward) */}
                <path
                  d="M 240 330 C 270 320, 290 350, 280 375 C 265 390, 230 380, 220 360 Z"
                  fill="url(#suitBlue)"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
                {/* Right Boot */}
                <path
                  d="M 285 370 C 290 375, 270 395, 250 388 C 260 375, 275 370, 285 370 Z"
                  fill="url(#suitRed)"
                  stroke="#ff1744"
                  strokeWidth="1.5"
                />

                {/* Torso in forward crouch lean */}
                <path
                  d="M 160 250 C 145 280, 160 340, 200 345 C 240 340, 255 280, 240 250 Z"
                  fill="url(#suitBlue)"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                />
                {/* Torso Center Red Webbing Shield */}
                <path
                  d="M 175 250 C 170 280, 180 335, 200 340 C 220 335, 230 280, 225 250 Z"
                  fill="url(#suitRed)"
                  stroke="#ff1744"
                  strokeWidth="1.5"
                />
                {/* Spider Chest Emblem */}
                <polygon
                  points="200,285 204,295 196,295"
                  fill="#020617"
                />
                <line x1="200" y1="285" x2="185" y2="275" stroke="#020617" strokeWidth="2" />
                <line x1="200" y1="285" x2="215" y2="275" stroke="#020617" strokeWidth="2" />
                <line x1="200" y1="295" x2="185" y2="305" stroke="#020617" strokeWidth="2" />
                <line x1="200" y1="295" x2="215" y2="305" stroke="#020617" strokeWidth="2" />

                {/* Left Arm resting on stone */}
                <path
                  d="M 165 260 C 135 280, 130 315, 145 350 C 150 345, 155 315, 175 290 Z"
                  fill="url(#suitRed)"
                  stroke="#ff1744"
                  strokeWidth="1.5"
                />
                {/* Right Arm balancing */}
                <path
                  d="M 235 260 C 265 280, 270 315, 255 350 C 250 345, 245 315, 225 290 Z"
                  fill="url(#suitRed)"
                  stroke="#ff1744"
                  strokeWidth="1.5"
                />

                {/* Head / Mask looking down at city */}
                <ellipse
                  cx="200"
                  cy="225"
                  rx="34"
                  ry="42"
                  fill="url(#suitRed)"
                  stroke="#ff1744"
                  strokeWidth="2"
                />
                {/* Mask Web Pattern */}
                <line x1="200" y1="183" x2="200" y2="267" stroke="#3b0712" strokeWidth="1.2" opacity="0.6" />
                <line x1="166" y1="225" x2="234" y2="225" stroke="#3b0712" strokeWidth="1.2" opacity="0.6" />
                <line x1="174" y1="200" x2="226" y2="250" stroke="#3b0712" strokeWidth="1.2" opacity="0.6" />
                <line x1="226" y1="200" x2="174" y2="250" stroke="#3b0712" strokeWidth="1.2" opacity="0.6" />

                {/* Expressive Spider-Verse Eyes */}
                {/* Left Eye */}
                <path
                  d="M 174 218 Q 192 216 195 230 Q 185 236 172 232 Z"
                  fill="#ffffff"
                  stroke="#020617"
                  strokeWidth="4"
                  className="transition-all duration-300 group-hover:scale-110"
                />
                {/* Right Eye */}
                <path
                  d="M 226 218 Q 208 216 205 230 Q 215 236 228 232 Z"
                  fill="#ffffff"
                  stroke="#020617"
                  strokeWidth="4"
                  className="transition-all duration-300 group-hover:scale-110"
                />
              </g>
            </svg>

            {/* Click to interact badge */}
            <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-sm">
              <span className="font-mono text-[9px] tracking-wider text-red-400">
                CLICK HERO FOR SPIDER-SENSE
              </span>
              <span className="text-xs">⚡</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BAR OF HERO SECTION */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 mt-2 text-neutral-400 font-mono text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-4 sm:gap-6">
          <span>STATUS: ALL SYSTEMS NOMINAL</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">TECH ARCHITECTURE: PRODUCTION ML</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-400">SCROLL DOWN TO DEPLOY MISSIONS</span>
          <span className="animate-bounce text-xs">↓</span>
        </div>
      </div>
    </section>
  );
}
