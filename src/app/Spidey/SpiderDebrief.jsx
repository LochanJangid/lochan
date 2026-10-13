"use client";

import { spiderAudio } from "./spiderAudio";

export default function SpiderDebrief({ onExitSpiderVerse }) {
  return (
    <section
      id="contact"
      data-spidey-target="contact-sector"
      className="relative z-10 w-full bg-[#02040b] text-white py-24 px-6 sm:px-12 lg:px-20 border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* MISSION DEBRIEF HUD CARD */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-red-600/80 bg-[#060b1e]/90 p-8 sm:p-14 shadow-[0_0_50px_rgba(239,68,68,0.25)] backdrop-blur-xl">
          
          {/* Top Classification Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span className="font-mono text-xs tracking-widest text-emerald-400 font-bold">
                MISSION STATUS: COMPLETE // TRANSMISSION READY
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-widest text-neutral-400">
              CHANNEL: SECURE // 256-BIT ENCRYPTED
            </span>
          </div>

          {/* Main Headline */}
          <div className="mt-8 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
              LET&apos;S ENGINEER{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
                SOMETHING EXTRAORDINARY.
              </span>
            </h2>

            <p className="max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
              Have an ambitious machine learning problem, a production system to architect, or an engineering role where models must deliver real value? 
              Transmission lines are open.
            </p>
          </div>

          {/* Comms Action Bar */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="mailto:lochanjangid@gmail.com"
              onClick={() => spiderAudio.playThwip()}
              className="inline-flex items-center gap-3 rounded bg-red-600 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(239,68,68,0.5)] transition hover:bg-red-500 hover:shadow-[0_0_36px_rgba(239,68,68,0.8)]"
            >
              <span>TRANSMIT MESSAGE (EMAIL)</span>
              <span>↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/lochan-jangid/"
              target="_blank"
              rel="noreferrer"
              onClick={() => spiderAudio.playHudClick()}
              className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-6 py-4 font-mono text-xs uppercase tracking-wider text-white transition hover:border-sky-400 hover:bg-sky-950/40"
            >
              <span>CONNECT ON LINKEDIN</span>
              <span>↗</span>
            </a>

            <a
              href="https://github.com/LochanJangid"
              target="_blank"
              rel="noreferrer"
              onClick={() => spiderAudio.playHudClick()}
              className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-6 py-4 font-mono text-xs uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              <span>EXPLORE GITHUB</span>
              <span>↗</span>
            </a>
          </div>

          {/* Return to Formal Mode CTA */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-400">
            <div>
              <span>ORIGIN DIMENSION: </span>
              <span className="text-white font-semibold">FORMAL ML ENGINEER PORTFOLIO</span>
            </div>

            <button
              type="button"
              onClick={onExitSpiderVerse}
              className="group inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-4 py-2 text-white hover:border-red-400 hover:bg-red-950/40 transition"
            >
              <span className="text-red-400 transition-transform group-hover:-translate-x-1">←</span>
              <span>RETURN TO FORMAL PORTFOLIO</span>
            </button>
          </div>

        </div>

        {/* Global Footer */}
        <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-neutral-500">
          <div>
            LOCHAN JANGID // EARTH-616 ML ARCHIVE // 2026
          </div>
          <div>
            BUILT WITH PURPOSE, CODE & RESPONSIBILITY
          </div>
        </footer>
      </div>
    </section>
  );
}
