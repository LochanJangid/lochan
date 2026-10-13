"use client";

import { spiderAudio } from "./spiderAudio";

const profileImage = "https://github.com/LochanJangid.png";

const TECHNICAL_SKILLS = [
  { category: "CORE AI / ML", items: ["Python", "PyTorch", "Scikit-learn", "XGBoost", "Deep Learning", "Regression & Classification"] },
  { category: "ENGINEERING & OPS", items: ["FastAPI", "Docker", "REST APIs", "C", "SQL", "Git / GitHub", "Linux CLI"] },
  { category: "FRONTEND & INTERFACES", items: ["Next.js", "React", "HTML5 Canvas", "Tailwind CSS", "JavaScript"] },
];

export default function SpiderDossier() {
  return (
    <section
      id="dossier"
      data-spidey-target="dossier-sector"
      className="relative z-10 w-full bg-[#020510] text-white py-24 px-6 sm:px-12 lg:px-20 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-2 font-mono text-[11px] tracking-[0.3em] text-red-500 font-bold uppercase">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            IDENTITY DOSSIER // AGENT PROFILE
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
            CHARACTER{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-sky-400">
              DOSSIER.
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-neutral-400 font-sans">
            Verified identity file, engineering principles, and core technical capabilities.
          </p>
        </div>

        {/* DOSSIER CARD (SPIDER-SUIT HUD MOTIF) */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-[#060b20]/95 p-6 sm:p-10 lg:p-12 shadow-[0_16px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Spider-Suit HUD Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT: PROFILE IMAGE WITH SPIDER-SUIT BIOMETRIC RETICLE */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group w-48 h-48 sm:w-56 sm:h-56">
                {/* Rotating Cybernetic HUD Ring */}
                <div className="absolute -inset-3 rounded-full border border-dashed border-red-500/60 animate-[spin_20s_linear_infinite] pointer-events-none" />
                <div className="absolute -inset-1 rounded-full border border-sky-400/40 pointer-events-none" />

                {/* Profile Photo with Comic Halftone & Border */}
                <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-slate-900 shadow-[0_0_30px_rgba(239,68,68,0.35)]">
                  <img
                    src={profileImage}
                    alt="Lochan Jangid - Machine Learning Engineer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle red/blue rim overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-transparent to-blue-500/20 pointer-events-none" />
                </div>

                {/* Biometric Clearance Stamp */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded bg-black/90 border border-red-500 font-mono text-[9px] tracking-widest text-red-400 font-bold shadow-lg">
                  CLEARANCE: LEVEL 5 // ACTIVE
                </div>
              </div>

              {/* Status Details */}
              <div className="mt-8 text-center font-mono text-xs space-y-1">
                <div className="font-bold text-white tracking-wider text-sm">
                  LOCHAN JANGID
                </div>
                <div className="text-red-400 tracking-widest text-[10px]">
                  MACHINE LEARNING ENGINEER
                </div>
                <div className="text-neutral-400 text-[10px]">
                  BASE: JAIPUR, RAJASTHAN, INDIA
                </div>
              </div>
            </div>

            {/* RIGHT: BIOGRAPHY & PHILOSOPHY & SKILLS */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              
              {/* Mission Statement */}
              <div className="space-y-3 font-sans">
                <h3 className="font-mono text-xs tracking-widest text-red-400 uppercase font-bold">
                  PHILOSOPHY // FROM DATA TO USEFUL AI
                </h3>
                <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
                  I specialize in designing and shipping machine learning systems that operate in real software environments. 
                  A model only creates value when the problem formulation is precise, the data preparation is rigorous, and the resulting pipeline is exposed through dependable APIs.
                </p>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                  Author of the open-source library <a href="https://pypi.org/project/lochan-eda/" target="_blank" rel="noreferrer" className="text-sky-400 underline decoration-sky-500/50 hover:text-white transition">lochan-eda</a> on PyPI for automated exploratory data analysis. 
                  My engineering workflow spans dataset discovery, PyTorch / Scikit-Learn training, FastAPI orchestration, Dockerization, and intuitive front-end integration.
                </p>
              </div>

              {/* Verified Technical Arsenal */}
              <div className="space-y-4 pt-2">
                <h4 className="font-mono text-xs tracking-widest text-neutral-400 uppercase font-semibold">
                  TECHNICAL CAPABILITY MATRIX
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {TECHNICAL_SKILLS.map((grp) => (
                    <div
                      key={grp.category}
                      className="rounded-lg border border-white/10 bg-black/40 p-3.5 space-y-2"
                    >
                      <div className="font-mono text-[9px] font-bold text-red-400 tracking-wider">
                        {grp.category}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {grp.items.map((it) => (
                          <span
                            key={it}
                            className="rounded bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9px] text-neutral-300"
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                <a
                  href="https://github.com/LochanJangid"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => spiderAudio.playHudClick()}
                  className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-4 py-2 text-white hover:bg-white/15 hover:border-red-400 transition"
                >
                  <span>GITHUB</span>
                  <span>↗</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/lochan-jangid/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => spiderAudio.playHudClick()}
                  className="inline-flex items-center gap-2 rounded border border-blue-500/40 bg-blue-950/30 px-4 py-2 text-blue-300 hover:bg-blue-900/50 hover:text-white transition"
                >
                  <span>LINKEDIN</span>
                  <span>↗</span>
                </a>

                <a
                  href="mailto:lochanjangid@gmail.com"
                  onClick={() => spiderAudio.playHudClick()}
                  className="inline-flex items-center gap-2 rounded border border-red-500/40 bg-red-950/30 px-4 py-2 text-red-300 hover:bg-red-900/50 hover:text-white transition"
                >
                  <span>EMAIL</span>
                  <span>↗</span>
                </a>

                <a
                  href="https://pypi.org/user/lochanjangidcoder/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => spiderAudio.playHudClick()}
                  className="inline-flex items-center gap-2 rounded border border-amber-500/40 bg-amber-950/30 px-4 py-2 text-amber-300 hover:bg-amber-900/50 hover:text-white transition"
                >
                  <span>PYPI REPOSITORY</span>
                  <span>↗</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
