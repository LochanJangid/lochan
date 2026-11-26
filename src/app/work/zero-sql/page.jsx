"use client";

import Link from "next/link";

const engines = [
  { name: "SQLite", role: "Local Embedded Storage", desc: "Single-file database support with sub-millisecond table scans and zero setup." },
  { name: "DuckDB", role: "Analytical OLAP", desc: "Columnar execution engine for fast analytical queries directly on Parquet and CSV files." },
  { name: "PostgreSQL", role: "Production Relational", desc: "Full schema introspection, JSONB query formatting, and connection pooling." },
  { name: "MySQL / MariaDB", role: "Enterprise OLTP", desc: "Comprehensive table indexing, user privilege inspection, and query execution plans." },
  { name: "SQL Server", role: "Enterprise Database", desc: "Native T-SQL query compatibility with secure Windows and SQL authentication." },
];

const pillars = [
  {
    title: "Zero Telemetry & 100% Local Privacy",
    desc: "Connection credentials and query payloads never touch an intermediary cloud proxy. Everything executes locally between the client process and the target database socket.",
  },
  {
    title: "Monaco SQL Editor & Schema RAG",
    desc: "Equipped with VS Code's Monaco editor engine, featuring syntax highlighting, error squiggles, local schema auto-completion, and query history caching.",
  },
  {
    title: "Virtualized High-Density Data Grid",
    desc: "Renders query results containing hundreds of thousands of rows smoothly at 60 FPS using virtualized DOM windowing, consuming minimal RAM.",
  },
  {
    title: "Safety Guardrails & Accidental Update Locks",
    desc: "Automatic detection of unbounded UPDATE and DELETE statements without WHERE clauses, prompting explicit confirmation before executing destructive transactions.",
  },
];

const stack = [
  ["Application Type", "Desktop Database Studio & Web Distribution Portal"],
  ["Web Portal Stack", "Next.js 14 (App Router) · React · Tailwind CSS"],
  ["Database Engines", "SQLite · DuckDB · PostgreSQL · MySQL · Microsoft SQL Server"],
  ["Editor Integration", "Monaco Editor (VS Code Engine) · SQL Language Server"],
  ["Distribution Channel", "Direct Desktop Installer · Windows SmartScreen Guidance"],
  ["Source Repository", "github.com/LochanJangid/zero_sql"],
];

export default function ZeroSQLPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--pink)]">lochan.dev</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[var(--pink)]">projects</Link>
          <span>/</span>
          <span className="font-bold text-[var(--ink)]">zero-sql</span>
        </div>
        <span className="font-handwriting text-lg text-[var(--pink)] font-bold -rotate-1">
          Local Privacy Database Studio 🗄️
        </span>
      </div>

      <header className="box relative bg-[var(--card)] p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--pink)] text-3xl shadow-[3px_3px_0_var(--shadow)]">
            🗄️
          </div>
          <div>
            <div className="inline-block rounded-md border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-xs font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] mb-2">
              09 / Multi-Engine Desktop Database Studio
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
              zero-sql: High-Performance, Privacy-Focused Multi-Engine Database Studio
            </h1>
          </div>
        </div>

        <div className="rainbow-bar mt-5 mb-5" aria-hidden="true" />

        <p className="font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-3xl">
          A fast, privacy-first desktop database client engineered for SQLite,
            PostgreSQL, MySQL, DuckDB, and SQL Server with zero telemetry, local
            schema RAG, and high-density virtualized data grids.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span key="DuckDB" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#DuckDB</span><span key="Monaco Editor" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#Monaco Editor</span><span key="PostgreSQL" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#PostgreSQL</span><span key="SQLite" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#SQLite</span><span key="Local Privacy" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#Local Privacy</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="https://zero-sql.vercel.app" target="_blank" rel="noreferrer" className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"><span>Live application ↗</span></a>
          <a href="https://github.com/LochanJangid/zero_sql" target="_blank" rel="noreferrer" className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"><span>Source repository ↗</span></a>
          <Link href="/#projects" className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2">
            <span>← Lab Shelf</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t-2 border-[var(--ink)]/10 pt-6 sm:grid-cols-4">
          <Meta label="SUPPORTED ENGINES" value="5 Relational & OLAP" /><Meta label="PRIVACY" value="100% Local / 0 Telemetry" /><Meta label="EDITOR" value="Monaco SQL Engine" /><Meta label="DATA GRID" value="Virtualized Windowing" />
        </div>
      </header>

        {/* =====================================================
            01 / ABSTRACT
        ====================================================== */}
        <Section number="01" title="Abstract">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            Modern database GUIs have grown increasingly bloated, sluggish, or cloud-dependent,
            often requiring accounts and transmitting schema telemetry to external servers. For
            developers and data analysts working with local databases or sensitive production
            credentials, this introduces both performance friction and data security risks.
          </p>
          <p className="mt-4 font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            <strong>zero-sql</strong> was engineered to solve this dilemma: a lightweight,
            instant-startup desktop studio with zero telemetry, direct driver connections,
            and native support across embedded (SQLite, DuckDB) and enterprise relational engines
            (PostgreSQL, MySQL, SQL Server).
          </p>
        </Section>

        {/* =====================================================
            02 / KEY CAPABILITIES
        ====================================================== */}
        <Section number="02" title="Core Capabilities & Architecture">
          <div className="grid gap-6 border-y border-neutral-200 py-6 sm:grid-cols-3">
            <Result value="0% Telemetry" label="Local Socket Execution Only" />
            <Result value="60 FPS" label="Virtualized Million-Row Table Grid" />
            <Result value="5 Engines" label="Unified Query Driver Abstraction" />
          </div>

          <div className="mt-8 space-y-4">
            {pillars.map((p) => (
              <div key={p.title} className="border border-neutral-200 p-5 bg-white">
                <h3 className="font-serif font-bold text-base text-neutral-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 font-serif">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* =====================================================
            03 / MULTI-ENGINE SUPPORT
        ====================================================== */}
        <Section number="03" title="Unified Multi-Engine Driver Abstraction">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)] mb-5">
            Different database engines expose divergent connection protocols and dialect nuances.
            zero-sql implements an abstracted driver interface normalizing query execution,
            parameterization, and schema metadata discovery:
          </p>

          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-neutral-300 bg-neutral-50 font-mono text-xs text-neutral-500">
                <tr>
                  <th className="px-4 py-3">ENGINE</th>
                  <th className="px-4 py-3">SPECIALIZATION</th>
                  <th className="px-4 py-3">CAPABILITIES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {engines.map((e) => (
                  <tr key={e.name}>
                    <td className="px-4 py-3 font-mono font-semibold text-neutral-800">{e.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-600">{e.role}</td>
                    <td className="px-4 py-3 font-serif text-neutral-600 text-[13px]">{e.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* =====================================================
            04 / VIRTUALIZED DATA GRID
        ====================================================== */}
        <Section number="04" title="High-Density Virtualized Data Grid">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            Rendering large result sets in standard web views often leads to thousands of DOM
            nodes and browser crashes. zero-sql utilizes DOM windowing to keep memory constant:
          </p>

          <div className="mt-6 rounded bg-neutral-900 p-4 font-mono text-xs text-neutral-200 overflow-x-auto">
            <div className="text-neutral-400 mb-2">// Virtualized Viewport Calculation</div>
{`const visibleRowStart = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
const visibleRowEnd = Math.min(totalRows, Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan);
// Only ~30 rows mounted in DOM at any instant regardless of 500,000+ total rows`}
          </div>
        </Section>

        {/* =====================================================
            05 / DISTRIBUTION & SMART SCREEN
        ====================================================== */}
        <Section number="05" title="Desktop Distribution & SmartScreen Guidance">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            Newly distributed Windows binaries frequently trigger false-positive Microsoft
            SmartScreen warnings (&quot;Windows protected your PC&quot;). The official zero-sql web
            portal proactively guides users through seamless, safe verification steps, ensuring
            frictionless desktop onboarding.
          </p>
        </Section>

        {/* =====================================================
            06 / TECHNICAL SPECIFICATIONS
        ====================================================== */}
        <Section number="06" title="Technical Specification">
          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-neutral-300 bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs font-normal text-neutral-500">
                    LAYER
                  </th>
                  <th className="px-4 py-3 font-mono text-xs font-normal text-neutral-500">
                    SPECIFICATION
                  </th>
                </tr>
              </thead>
              <tbody>
                {stack.map(([layer, spec]) => (
                  <tr key={layer} className="border-b border-neutral-200 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-neutral-700">
                      {layer}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 font-serif text-[14px]">
                      {spec}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 mt-10">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)] mb-2">
            Next Case Study
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--sun)] text-2xl shadow-[3px_3px_0_var(--shadow)]">
                🏥
              </div>
              <div>
                <h3 className="font-sans text-xl font-black text-[var(--ink)]">
                  Sanjeevni Clinic
                </h3>
                <p className="font-sans text-sm text-[var(--mute)] max-w-md">
                  Full-stack OPD queue state machine and acoustic patient dispatch engine with TV signage deployed in active clinics.
                </p>
              </div>
            </div>
            <Link
              href="/work/sanjeevni-clinic"
              className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-1.5"
            >
              <span>Explore Case Study</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
          <Link href="/#projects" className="hover:text-[var(--pink)] underline underline-offset-4">
            ← Back to Lab Shelf
          </Link>
          <a
            href="https://github.com/LochanJangid/zero_sql"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--pink)] underline underline-offset-4"
          >
            github.com/LochanJangid/zero_sql ↗
          </a>
        </div>
    </main>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--mute)]">
        {label}
      </div>
      <div className="mt-1 font-sans text-sm sm:text-base font-extrabold text-[var(--ink)]">{value}</div>
    </div>
  );
}

function Result({ value, label }) {
  return (
    <div>
      <div className="font-sans text-2xl font-black text-[var(--ink)]">{value}</div>
      <div className="mt-1 font-sans text-xs text-[var(--mute)]">{label}</div>
    </div>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs font-black uppercase text-[var(--pink)]">{number}</span>
        <h2 className="font-sans text-2xl font-black text-[var(--ink)]">
          {title}
        </h2>
      </div>
      <div className="font-sans text-base leading-relaxed text-[var(--mute)]">
        {children}
      </div>
    </section>
  );
}
