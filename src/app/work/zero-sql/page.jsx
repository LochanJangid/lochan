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
    <main className="min-h-screen bg-[#eeeeec] py-6 sm:py-10">
      <article className="mx-auto w-[calc(100%-24px)] max-w-[880px] bg-white px-7 py-10 shadow-sm sm:px-14 sm:py-16 md:px-20 md:py-20">
        
        {/* =====================================================
            HEADER
        ====================================================== */}
        <header className="border-b border-neutral-300 pb-8">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <Link
              href="/"
              className="font-medium text-neutral-800 hover:underline"
            >
              Lochan Jangid
            </Link>

            <span>Database Systems Case Study · 2026</span>
          </div>

          <div className="mt-8 font-mono text-xs uppercase tracking-wider text-neutral-500">
            09 / Multi-Engine Desktop Database Studio
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
            zero-sql: High-Performance, Privacy-Focused Multi-Engine Database Studio
          </h1>

          <p className="mt-5 max-w-3xl font-serif text-xl leading-8 text-neutral-600">
            A fast, privacy-first desktop database client engineered for SQLite,
            PostgreSQL, MySQL, DuckDB, and SQL Server with zero telemetry, local
            schema RAG, and high-density virtualized data grids.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href="https://zero-sql.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Official website & download ↗
            </a>

            <a
              href="https://github.com/LochanJangid/zero_sql"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Source repository ↗
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-4">
            <Meta label="SUPPORTED ENGINES" value="5 Relational & OLAP" />
            <Meta label="PRIVACY" value="100% Local / 0 Telemetry" />
            <Meta label="EDITOR" value="Monaco SQL Engine" />
            <Meta label="DATA GRID" value="Virtualized Windowing" />
          </div>
        </header>

        {/* =====================================================
            01 / ABSTRACT
        ====================================================== */}
        <Section number="01" title="Abstract">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            Modern database GUIs have grown increasingly bloated, sluggish, or cloud-dependent,
            often requiring accounts and transmitting schema telemetry to external servers. For
            developers and data analysts working with local databases or sensitive production
            credentials, this introduces both performance friction and data security risks.
          </p>
          <p className="mt-4 font-serif text-[16px] leading-[1.75] text-[#292725]">
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
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725] mb-5">
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
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
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
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
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
        <footer className="mt-16 border-t border-neutral-300 pt-7 flex flex-col sm:flex-row justify-between items-baseline gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Source Code & Website
            </div>
            <a
              href="https://github.com/LochanJangid/zero_sql"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-sm text-blue-700 underline underline-offset-4"
            >
              github.com/LochanJangid/zero_sql ↗
            </a>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-neutral-700 hover:text-black underline underline-offset-4"
          >
            ← Back to portfolio
          </Link>
        </footer>
      </article>
    </main>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-wider text-neutral-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-neutral-800">{value}</div>
    </div>
  );
}

function Result({ value, label }) {
  return (
    <div>
      <div className="font-serif text-2xl font-bold text-neutral-950">{value}</div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="border-b border-neutral-200 py-10 last:border-0">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs text-neutral-400">{number}</span>
        <h2 className="font-serif text-2xl font-bold text-neutral-900">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
