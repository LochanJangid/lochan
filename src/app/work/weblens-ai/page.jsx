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

            <span>AI Systems Case Study · 2026</span>
          </div>

          <div className="mt-8 font-mono text-xs uppercase tracking-wider text-neutral-500">
            07 / Multimodal Visual Intelligence
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
            WebLens AI: Production-Grade AI Website Intelligence & Visual Studio
          </h1>

          <p className="mt-5 max-w-3xl font-serif text-xl leading-8 text-neutral-600">
            A developer platform combining Playwright headless DOM coordinate
            extraction, Core Web Vitals profiling, and multi-model vision prompt
            synthesis to transform web interfaces from average to product-grade
            with zero paywalls.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href="https://weblensai.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Live application ↗
            </a>

            <a
              href="https://github.com/LochanJangid/WebLens-AI"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Source repository ↗
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-4">
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
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            Most automated website audits offer generic, text-heavy recommendations
            that developers struggle to translate into actionable code. When developers turn
            to generative AI for visual improvements, the models frequently hallucinate
            layouts or completely alter the original product copy.
          </p>
          <p className="mt-4 font-serif text-[16px] leading-[1.75] text-[#292725]">
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
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
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
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
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
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
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
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
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

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <footer className="mt-16 border-t border-neutral-300 pt-7 flex flex-col sm:flex-row justify-between items-baseline gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Source Code & Deployment
            </div>
            <a
              href="https://github.com/LochanJangid/WebLens-AI"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-sm text-blue-700 underline underline-offset-4"
            >
              github.com/LochanJangid/WebLens-AI ↗
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
