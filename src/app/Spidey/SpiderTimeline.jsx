"use client";

export default function SpiderTimeline() {
  return (
    <section
      id="archive"
      data-spidey-target="timeline-sector"
      className="relative z-10 w-full bg-[#030614] text-white py-24 px-6 sm:px-12 lg:px-20 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-2 font-mono text-[11px] tracking-[0.3em] text-red-500 font-bold uppercase">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            CLASSIFIED LOG // FIELD OPERATIONS
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
            MISSION{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-sky-400">
              ARCHIVE.
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-neutral-400 font-sans">
            Professional trajectory and operational engineering deployments in the field.
          </p>
        </div>

        {/* TIMELINE ARCHIVE CONTAINER */}
        <div className="relative border-l-2 border-red-600/70 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12">
          
          {/* TIMELINE ENTRY 01 */}
          <article
            data-spidey-target="timeline-entry-01"
            className="group relative rounded-xl border border-slate-800 bg-[#070d24]/90 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-red-500/80 hover:shadow-[0_8px_32px_rgba(239,68,68,0.18)]"
          >
            {/* Pulsing Connector Node on Web Thread */}
            <div className="absolute -left-[41px] sm:-left-[57px] top-8 flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-500 bg-[#02050f] shadow-[0_0_14px_rgba(239,68,68,0.8)]">
              <span className="h-2 w-2 rounded-full bg-red-500" />
            </div>

            {/* Entry Header Bar */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-red-400 uppercase font-semibold">
                  RECORD // ML-OPS-01
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  AI/ML Intern
                </h3>
                <a
                  href="https://www.linkedin.com/company/30204738/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-sky-400 hover:text-white transition mt-1 underline decoration-sky-500/50 underline-offset-4"
                >
                  <span>REGex Software Services</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="text-left sm:text-right font-mono">
                <div className="text-xs font-bold text-neutral-200 tracking-wider">
                  DEC 2025 – PRESENT
                </div>
                <div className="text-[10px] text-neutral-400 tracking-widest mt-0.5">
                  11 MONTHS · FULL-TIME · ON-SITE
                </div>
                <div className="inline-block mt-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-[9px] text-emerald-400 tracking-wider">
                  STATUS: ACTIVE DEPLOYMENT
                </div>
              </div>
            </div>

            {/* Location & Sector */}
            <div className="mt-4 flex items-center gap-2 font-mono text-xs text-neutral-400">
              <span className="text-red-500">📍</span>
              <span>Jaipur, Rajasthan, India</span>
            </div>

            {/* Core Responsibilities & Impact */}
            <div className="mt-5 space-y-3 font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
              <p>
                Developing end-to-end machine learning pipelines from initial exploratory data analysis to model selection, training, and production integration.
              </p>
              <p>
                Engineering high-performance data transformation routines in Python and C, implementing feature stores, and architecting reliable REST inference services for real-world client workloads.
              </p>
            </div>

            {/* Operational Skill Badges */}
            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-[10px]">
              {[
                "Python",
                "Machine Learning",
                "Deep Learning",
                "C",
                "FastAPI",
                "Data Pipelines",
                "Scikit-Learn",
                "Model Deployment",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-red-500/30 bg-red-950/20 px-3 py-1 text-red-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>

          {/* TIMELINE ARCHIVE FOOTNOTE */}
          <div className="relative rounded-lg border border-white/10 bg-black/40 p-5 font-mono text-xs text-neutral-400 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-red-500 font-bold">LOG STATUS:</span>
              <span>RECORD COMPLETE · CONTINUOUS OPERATIONS ACTIVE</span>
            </div>
            <div className="hidden sm:block text-[10px] text-neutral-500">
              JAIPUR REGION HQ
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
