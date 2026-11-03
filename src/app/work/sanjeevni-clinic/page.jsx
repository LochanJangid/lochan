"use client";

import Link from "next/link";
import { useState } from "react";

const stack = [
  ["Frontend", "Next.js 16 (App Router) · React · Tailwind CSS"],
  ["Real-Time Audio / Video", "WebRTC (RTCPeerConnection, STUN) · Web Audio API"],
  ["AI Clinical Layer", "Groq Cloud (Llama-3.3-70B-Versatile) · Medical Triage Guardrails"],
  ["Backend & DB", "PostgreSQL · Node.js API · Role-Based Access Control"],
  ["Financial Gateway", "Dynamic Bharat QR · PhonePe UPI Settlement Reconciliation"],
  ["Deployment", "Vercel · Multi-tier Cloud Architecture"],
];

const portals = [
  {
    role: "Hospital Administrator",
    badge: "EXECUTIVE ERP",
    summary:
      "Global operational command center overseeing physician faculty CRUD, Inpatient Department (IPD) bed allocation, daily POS cash drawer reconciliation, pharmacy inventory turnover, and PhonePe QR payment verification.",
  },
  {
    role: "Attending Physicians",
    badge: "CLINICIAN COCKPIT",
    summary:
      "Isolated OPD cabin queue controllers, 1-click digital prescription generation, on-behalf pharmacy order dispatch, P2P WebRTC telemedicine with screen sharing, and real-time patient vitals telemetry.",
  },
  {
    role: "Patients & Family",
    badge: "PATIENT DESK",
    summary:
      "Frictionless self-service booking, dynamic OPD waiting room ticket tracking, live bed availability transparency, direct PhonePe UPI checkout, P2P video calls, and downloadable clinical records.",
  },
];

const queueFeatures = [
  {
    title: "Isolated Doctor Cabins",
    desc: "Clinicians manage strictly their own designated waiting cabin. Token dispatch, patient callouts, and conclusion signals are partitioned by doctor ID.",
  },
  {
    title: "Dual-Oscillator Web Audio Chimes",
    desc: "Generates synthesized acoustic hospital chimes (E5 to C5 frequencies) directly in the browser via Web Audio API without relying on external MP3 audio assets.",
  },
  {
    title: "60-Second Real-Time Absent Timer",
    desc: "When a token is called, an automated 1-minute countdown begins. If the patient fails to report, the system auto-shifts their ticket to the end of today's queue (MAX(token) + 1).",
  },
  {
    title: "Continuous TV Signage Wall",
    desc: "A responsive, high-contrast display designed for public waiting lounges, streaming active cabin assignments, recently called numbers, and acoustic announcements.",
  },
];

export default function SanjeevniClinicPage() {
  const [activeTab, setActiveTab] = useState("admin");

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

            <span>Healthcare Engineering Case Study · 2026</span>
          </div>

          <div className="mt-8 font-mono text-xs uppercase tracking-wider text-neutral-500">
            06 / Enterprise Healthcare Operating System
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
            Sanjeevni Clinic: Unified Clinical Operating System & Healthcare ERP
          </h1>

          <p className="mt-5 max-w-3xl font-serif text-xl leading-8 text-neutral-600">
            A production-grade hospital management platform engineered for
            Sanjeevni Medical Pavilion. Designed for multi-tenant clinical
            workflows with strict role isolation, real-time WebRTC
            teleconsultations, dynamic live OPD queue signage with Web Audio chimes,
            and executive hospital ERP controls.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href="https://sanjeevni-clinic.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Live application ↗
            </a>

            <a
              href="https://github.com/LochanJangid/sanjeevni-clinic"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Source repository ↗
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-4">
            <Meta label="CATEGORY" value="Clinical ERP & Telehealth" />
            <Meta label="TELECONSULT" value="Encrypted WebRTC P2P" />
            <Meta label="AI MODEL" value="Llama-3.3-70B (Groq)" />
            <Meta label="PAYMENT" value="Dynamic PhonePe QR" />
          </div>
        </header>

        {/* =====================================================
            01 / ABSTRACT
        ====================================================== */}
        <Section number="01" title="Abstract">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            Hospital systems frequently suffer from fragmented tools: one vendor handles
            patient registration, another manages waiting queues, a third handles video calls,
            and accounting relies on isolated spreadsheets. <strong>Sanjeevni Clinic</strong>{" "}
            unifies these critical systems into one cohesive, role-isolated operational platform.
          </p>
          <p className="mt-4 font-serif text-[16px] leading-[1.75] text-[#292725]">
            From patient symptom triage powered by an LLM clinical assistant, to automated
            outpatient queue management with browser-synthesized acoustic chimes, encrypted
            teleconsultations, and pharmaceutical inventory with daily cash drawer audits,
            every layer is engineered to minimize administrative latency while maintaining strict
            clinical guardrails.
          </p>
        </Section>

        {/* =====================================================
            02 / KEY RESULTS & METRICS
        ====================================================== */}
        <Section number="02" title="Operational Telemetry">
          <div className="grid gap-6 border-y border-neutral-200 py-6 sm:grid-cols-3">
            <Result value="P2P WebRTC" label="Sub-second Video Latency" />
            <Result value="60 Seconds" label="Absent Patient Requeue Threshold" />
            <Result value="100% Isolated" label="Role & Cabin Boundary Security" />
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Metrics established across simulated multi-doctor OPD sessions and continuous
            waiting hall signage broadcasts.
          </p>
        </Section>

        {/* =====================================================
            03 / SYSTEM ARCHITECTURE
        ====================================================== */}
        <Section number="03" title="Role-Isolated System Boundaries">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            A cornerstone requirement was strict role segregation. Doctors must not tamper
            with administrative financial reconciliations, patients cannot trigger doctor-side
            actions, and doctors cannot interfere with another clinician&apos;s queue.
          </p>

          <div className="mt-6 space-y-4">
            {portals.map((p) => (
              <div
                key={p.role}
                className="border border-neutral-200 p-5 transition-colors hover:border-neutral-400"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    {p.role}
                  </h3>
                  <span className="font-mono text-[10px] tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded">
                    {p.badge}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {p.summary}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* =====================================================
            04 / WEBRTC TELEMEDICINE
        ====================================================== */}
        <Section number="04" title="Peer-to-Peer Teleconsultation Engine">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            Remote consultations are conducted over native WebRTC connections without
            expensive third-party video subscription services.
          </p>

          <div className="mt-6 border border-neutral-200 divide-y divide-neutral-200 text-sm">
            <div className="p-4 grid sm:grid-cols-[180px_1fr] gap-2">
              <span className="font-mono text-xs font-semibold text-neutral-700">
                Signaling & STUN
              </span>
              <span className="text-neutral-600">
                P2P session negotiation via Google STUN servers (<code>stun.l.google.com:19302</code>)
                with dynamic ICE candidate exchange.
              </span>
            </div>
            <div className="p-4 grid sm:grid-cols-[180px_1fr] gap-2">
              <span className="font-mono text-xs font-semibold text-neutral-700">
                Clinical Screen Sharing
              </span>
              <span className="text-neutral-600">
                Physicians invoke <code>navigator.mediaDevices.getDisplayMedia</code> to share
                radiology scans, laboratory CBC panels, and ECG waveforms live with patients.
              </span>
            </div>
            <div className="p-4 grid sm:grid-cols-[180px_1fr] gap-2">
              <span className="font-mono text-xs font-semibold text-neutral-700">
                Integrated Workstation
              </span>
              <span className="text-neutral-600">
                The teleconsult view integrates real-time digital prescription authoring and
                patient vital signs side-by-side with the active video feed.
              </span>
            </div>
          </div>
        </Section>

        {/* =====================================================
            05 / SMART OPD QUEUE & AUDIO
        ====================================================== */}
        <Section number="05" title="Smart OPD Queue & Web Audio Dispatch">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            In busy hospitals, missed calls and disordered queues cause severe operational
            bottlenecks. Sanjeevni implements an algorithmic waiting room protocol:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {queueFeatures.map((f) => (
              <div key={f.title} className="bg-neutral-50 p-4 border border-neutral-200">
                <h4 className="font-serif font-bold text-sm text-neutral-900">
                  {f.title}
                </h4>
                <p className="mt-2 text-xs leading-5 text-neutral-600">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded bg-neutral-900 p-4 font-mono text-xs text-neutral-200 overflow-x-auto">
            <div className="text-neutral-400 mb-2">// Web Audio Dual Oscillator Chime (E5 -&gt; C5)</div>
            {`const ctx = new (window.AudioContext || window.webkitAudioContext)();
const osc1 = ctx.createOscillator();
const osc2 = ctx.createOscillator();
osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5 Note
osc2.frequency.setValueAtTime(523.25, ctx.currentTime + 0.3); // C5 Note
// Triggers acoustic announcement across waiting hall speakers`}
          </div>
        </Section>

        {/* =====================================================
            06 / CLINICAL AI TRIAGE
        ====================================================== */}
        <Section number="06" title="AI Symptom Triage & Red-Flag Guardrails">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            Integrated via Groq Cloud running <code>Llama-3.3-70B-Versatile</code>, the assistant
            is constrained by clinical safety guardrails:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside font-serif text-[15px] text-neutral-700">
            <li>
              <strong>Non-Diagnostic Advisory:</strong> Formatted explicitly as exploratory health
              guidance, systematically disclaiming official medical diagnosis.
            </li>
            <li>
              <strong>Emergency Red-Flag Detection:</strong> Triggers immediate alerts when symptoms
              suggest myocardial infarction, stroke, or acute respiratory distress.
            </li>
            <li>
              <strong>Doctor Note Pre-Structuring:</strong> Synthesizes reported patient symptoms into
              concise subjective/objective clinical summaries for attending doctors.
            </li>
          </ul>
        </Section>

        {/* =====================================================
            07 / TECHNICAL STACK
        ====================================================== */}
        <Section number="07" title="Technical Specification">
          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-neutral-300 bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs font-normal text-neutral-500">
                    LAYER
                  </th>
                  <th className="px-4 py-3 font-mono text-xs font-normal text-neutral-500">
                    TECHNOLOGY IMPLEMENTATION
                  </th>
                </tr>
              </thead>
              <tbody>
                {stack.map(([layer, tech]) => (
                  <tr key={layer} className="border-b border-neutral-200 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-neutral-700">
                      {layer}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 font-serif text-[14px]">
                      {tech}
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
              href="https://github.com/LochanJangid/sanjeevni-clinic"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-sm text-blue-700 underline underline-offset-4"
            >
              github.com/LochanJangid/sanjeevni-clinic ↗
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
