"use client";

import Link from "next/link";
import { useState } from "react";

const stack = [
  ["Frontend Engine", "Next.js 14.2 (App Router) · React 18 · Tailwind CSS 3.4"],
  ["Browser Automation", "Playwright Chromium Headless Crawler"],
  ["Backend API", "FastAPI 0.115 · Python 3.11 · Pydantic V2"],
  ["Multimodal AI Calibration", "Claude 3.7 / 3.5 Sonnet · GPT-4o Vision · Groq LLM"],
  ["Design Heuristics", "60-30-10 Design System Engine · WCAG 2.1 AA Contrast Validator"],
  ["Deployment", "Vercel Edge Platform · Render Cloud"],
];

const promptEngines = [
  {
    target: "Claude 3.7 / 3.5 Sonnet Vision",
    role: "Aesthetic Hierarchy & Modern UI Architecture",
    output:
      "Generates hyper-refined, accessible JSX/TSX components preserving exact copy while upgrading typography scale, breathing room, and micro-interactions.",
  },
  {
    target: "OpenAI GPT-4o Vision",
    role: "Conversion Rate Optimization (CRO) & Eye-Path Routing",
    output:
      "Performs cognitive load analysis, eye-tracking scanpath modeling, visual hierarchy reorganization, and primary CTA contrast recalibration.",
  },
  {
    target: "Cursor Composer & Windsurf",
    role: "Zero-Breaking-Change Refactoring Prompts",
    output:
      "Generates structured prompt specifications for AI coding agents with strict file preservation constraints and step-by-step diff rules.",
  },
];

const auditMetrics = [
  {
    name: "Bounding Box Telemetry",
    spec: "Exact pixel coordinates (x, y, width, height) captured directly via Playwright DOM evaluation.",
  },
  {
    name: "Core Web Vitals",
    spec: "Synthetic profiling for Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Total Blocking Time (TBT).",
  },
  {
    name: "Accessibility & WCAG 2.1 AA",
    spec: "Luminance contrast ratio math (minimum 4.5:1 for body copy, 3:1 for large display headers).",
  },
  {
    name: "Deterministic Level-1 Guardrails",
    spec: "Instant zero-token templates for standard HTML/CSS violations, eliminating LLM latency for common layout pitfalls.",
  },
];

export default function WebLensAIPage() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--pink)]">lochan.dev</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[var(--pink)]">projects</Link>
          <span>/</span>
          <span className="font-bold text-[var(--ink)]">weblens-ai</span>
        </div>
        <span className="font-handwriting text-lg text-[var(--pink)] font-bold -rotate-1">
          Visual Intelligence Studio 🌐
        </span>
      </div>

      {/* Hero Header Box */}
      <header className="box relative bg-[var(--card)] p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--aqua)] text-3xl shadow-[3px_3px_0_var(--shadow)]">
            🌐
          </div>
          <div>
            <div className="inline-block rounded-md border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-xs font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] mb-2">
              07 / Multimodal Visual Intelligence
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
              WebLens AI: Production-Grade Website Intelligence & Visual Studio
            </h1>
          </div>
        </div>

        <div className="rainbow-bar mt-5 mb-5" aria-hidden="true" />

        <p className="font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-3xl">
          A developer platform combining Playwright headless DOM coordinate extraction, Core Web Vitals profiling, and multi-model vision prompt synthesis to transform web interfaces from average to product-grade with zero paywalls.
        </p>

        {/* Tag chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {["Playwright", "Multimodal LLM", "Next.js", "Tailwind CSS", "WCAG AA"].map((t) => (
            <span key={t} className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">
              #{t}
            </span>
          ))}
        </div>

        {/* Action button row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="https://weblensai.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>Live application ↗</span>
          </a>

          <a
            href="https://github.com/LochanJangid/WebLens-AI"
            target="_blank"
            rel="noreferrer"
            className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>Source repository ↗</span>
          </a>

          <Link
            href="/#projects"
            className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>← Lab Shelf</span>
          </Link>
        </div>

        {/* Metadata stats bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t-2 border-[var(--ink)]/10 pt-6 sm:grid-cols-4">
          <Meta label="HEADLESS BROWSER" value="Playwright Chromium" />
          <Meta label="VISION MODELS" value="Claude 3.7 · GPT-4o" />
          <Meta label="COLOR ENGINE" value="60-30-10 Algorithmic" />
          <Meta label="ACCESS MODEL" value="100% Free Forever" />
        </div>
      </header>

        {/* =====================================================
            01 / ABSTRACT
        ====================================================== */}
        <Section number="01" title="Abstract">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            Most automated website audits offer generic, text-heavy recommendations
            that developers struggle to translate into actionable code. When developers turn
            to generative AI for visual improvements, the models frequently hallucinate
            layouts or completely alter the original product copy.
          </p>
          <p className="mt-4 font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            <strong>WebLens AI</strong> addresses this disconnect by fusing exact
            pixel coordinates from headless browser runs with multimodal vision prompts
            crafted specifically for modern AI engineering assistants (Claude 3.7 Sonnet,
            GPT-4o Vision, Cursor Composer, Windsurf, and Antigravity). The system extracts
            bounding box telemetry, audits accessibility contrast against WCAG 2.1 AA, and
            delivers drop-in React and Tailwind code while preserving 100% of the site&apos;s
            original content.
          </p>
        </Section>

        {/* =====================================================
            02 / CORE RESULTS & METRICS
        ====================================================== */}
        <Section number="02" title="Audit Telemetry & Heuristics">
          <div className="grid gap-6 border-y border-neutral-200 py-6 sm:grid-cols-3">
            <Result value="1:1 Viewport" label="Full-DPI Playwright Capture" />
            <Result value="≥ 48px" label="Minimum Touch Target Enforcement" />
            <Result value="0 Latency" label="Level-1 Deterministic Rule Engine" />
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Performance verified across live viewport audits and synthetic Core Web Vitals
            simulations.
          </p>
        </Section>

        {/* =====================================================
            03 / DOM & VISUAL PIPELINE
        ====================================================== */}
        <Section number="03" title="Headless DOM & Visual Coordinate Extraction">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            Rather than passing downscaled screenshots or raw unparsed HTML strings to
            vision models, WebLens AI establishes a multi-stage inspection pipeline:
          </p>

          <div className="mt-6 border border-neutral-200">
            {[
              [
                "01",
                "Headless Chromium Boot",
                "Playwright initializes a headless browser session with calibrated viewport dimensions (1440×900 for desktop, 390×844 for mobile).",
              ],
              [
                "02",
                "Bounding Box Mapping",
                "JavaScript injection queries all interactive elements, measuring getBoundingClientRect() to pinpoint exact x, y, width, and height offsets.",
              ],
              [
                "03",
                "Contrast & Typography Math",
                "Calculates foreground vs. background relative luminance using the W3C contrast ratio formula: (L1 + 0.05) / (L2 + 0.05).",
              ],
              [
                "04",
                "Visual Prompt Synthesis",
                "Packages screenshot crops, DOM coordinates, and identified UX bottlenecks into targeted multimodal vision prompts.",
              ],
            ].map(([num, stage, desc]) => (
              <div
                key={num}
                className="grid gap-2 border-b border-neutral-200 px-5 py-4 last:border-0 sm:grid-cols-[50px_180px_1fr]"
              >
                <span className="font-mono text-xs text-neutral-400">{num}</span>
                <strong className="text-sm font-semibold text-neutral-900">{stage}</strong>
                <span className="text-sm leading-6 text-neutral-600 font-serif">{desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* =====================================================
            04 / MULTIMODAL PROMPT ENGINE
        ====================================================== */}
        <Section number="04" title="Calibrated Multi-Model Vision Synthesis">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            Different foundation models excel at distinct design tasks. WebLens AI tailors
            its prompt framing to match the strengths of each model family:
          </p>

          <div className="mt-6 space-y-4">
            {promptEngines.map((engine) => (
              <div
                key={engine.target}
                className="border border-neutral-200 p-5 transition-colors hover:border-neutral-400"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-mono text-sm font-bold text-neutral-900">
                    {engine.target}
                  </h3>
                  <span className="font-mono text-[10px] tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded">
                    {engine.role}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-600 font-serif">
                  {engine.output}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* =====================================================
            05 / 60-30-10 DESIGN ENGINE
        ====================================================== */}
        <Section number="05" title="The 60-30-10 Design System Engine">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            To resolve inconsistent color usage across indie projects, WebLens AI incorporates
            an algorithmic 60-30-10 color distribution calculator:
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-neutral-200 p-4 bg-neutral-50">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                60% Primary Canvas
              </div>
              <div className="mt-2 text-2xl font-bold font-serif text-neutral-900">
                Dominant Base
              </div>
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-serif">
                Background canvas establishing overall light/dark posture without visual strain.
              </p>
            </div>

            <div className="border border-neutral-200 p-4 bg-neutral-50">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                30% Structural Cards
              </div>
              <div className="mt-2 text-2xl font-bold font-serif text-neutral-900">
                Card Surfaces
              </div>
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-serif">
                Elevated panels, sidebars, and containers providing clear hierarchical separation.
              </p>
            </div>

            <div className="border border-neutral-200 p-4 bg-neutral-50">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                10% Conversion Accent
              </div>
              <div className="mt-2 text-2xl font-bold font-serif text-rose-700">
                Action Crimson
              </div>
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-serif">
                High-contrast CTA triggers, active badges, and focus rings that draw the user&apos;s eye.
              </p>
            </div>
          </div>
        </Section>

        {/* =====================================================
            06 / DETERMINISTIC LEVEL-1 TEMPLATES
        ====================================================== */}
        <Section number="06" title="Zero-Hallucination Fallback Architecture">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)]">
            Not all audits require expensive LLM inferences. Common design flaws like missing
            image alt attributes, touch targets smaller than 48px, or improper heading order
            (h1 immediately followed by h4) are identified and diagnosed instantly via
            deterministic templates:
          </p>

          <div className="mt-6 rounded bg-neutral-900 p-4 font-mono text-xs text-neutral-200 overflow-x-auto">
            <div className="text-neutral-400 mb-2">// Deterministic Accessibility Checker</div>
            {`if (contrastRatio < 4.5 && fontSize < 18) {
  return {
    rule: "WCAG_2.1_AA_CONTRAST",
    status: "FAIL",
    measuredRatio: contrastRatio.toFixed(2),
    fixRecommendation: \`Increase foreground text color contrast from current \${contrastRatio.toFixed(2)}:1 to at least 4.5:1\`,
    zeroTokenCost: true
  };
}`}
          </div>
        </Section>

        {/* =====================================================
            07 / TECHNICAL SPECIFICATION
        ====================================================== */}
        <Section number="07" title="Technical Specification">
          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-neutral-300 bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs font-normal text-neutral-500">
                    MODULE
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

        {/* NEXT PROJECT CARD */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 mt-10">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)] mb-2">
            Next Case Study
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--pink)] text-2xl shadow-[3px_3px_0_var(--shadow)]">
                📈
              </div>
              <div>
                <h3 className="font-sans text-xl font-black text-[var(--ink)]">
                  BankMarketer
                </h3>
                <p className="font-sans text-sm text-[var(--mute)] max-w-md">
                  Term deposit propensity classification engine with SHAP waterfall explainability deployed on FastAPI.
                </p>
              </div>
            </div>
            <Link
              href="/work/bank-marketing"
              className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-1.5"
            >
              <span>Explore Case Study</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* FOOTER BREADCRUMB */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
          <Link href="/#projects" className="hover:text-[var(--pink)] underline underline-offset-4">
            ← Back to Lab Shelf
          </Link>
          <a
            href="https://github.com/LochanJangid/WebLens-AI"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--pink)] underline underline-offset-4"
          >
            github.com/LochanJangid/WebLens-AI ↗
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
