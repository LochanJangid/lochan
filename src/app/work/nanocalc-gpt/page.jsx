"use client";

import Link from "next/link";
import { useState } from "react";

const results = [
  { op: "+ Addition", testCount: "1,000", accuracy: "100.00%", note: "Zero carry errors across all 2-digit pairs" },
  { op: "- Subtraction", testCount: "1,000", accuracy: "100.00%", note: "Sign bit handling and borrow propagation solved" },
  { op: "* Multiplication", testCount: "1,000", accuracy: "99.30%", note: "Generalized across 10,000 combinatorial products" },
  { op: "/ Division", testCount: "57", accuracy: "85.96%", note: "Integer quotient long division (MSB-first)" },
];

const hyperparams = [
  ["Embedding Dimension (n_emb)", "128"],
  ["Transformer Blocks (n_layer)", "6"],
  ["Attention Heads (n_head)", "4 (32 dims per head)"],
  ["Context Length", "12 tokens"],
  ["Vocabulary Size", "16 characters"],
  ["Total Trainable Parameters", "1,195,536 (~1.2M)"],
  ["Batch Size", "128"],
  ["Total Optimization Steps", "30,000 (~3 mins on T4 GPU)"],
  ["Optimizer", "AdamW (weight_decay = 0.1)"],
  ["Learning Rate Schedule", "OneCycleLR (peak 1e-3, cosine decay, 3% warmup)"],
];

const designDecisions = [
  {
    title: "01. Right-to-Left Target Reversal (+, -, *)",
    desc: "Autoregressive generation runs left-to-right, but addition carries propagate right-to-left. In standard format '11+06=17', the model must emit the tens digit before calculating the ones carry. Storing answers reversed ('+7100' for 17) conditions each digit on already-generated carries. Addition accuracy surged from ~50% to 100.0%.",
  },
  {
    title: "02. Forward Natural Order for Division (/)",
    desc: "Unlike addition, division is inherently long division: quotient calculation naturally proceeds from most significant to least significant digit. Preserving unreversed format for division raised quotient accuracy from 80.70% to 85.96%.",
  },
  {
    title: "03. Invariant 12-Character Sequence Format",
    desc: "Every training sample is exactly 12 characters: 'AA{op}BB={S}DDDD\\n'. Removing variable-length padding tokens eliminates positional ambiguity, allowing positional embeddings to develop invariant semantic coordinates for operands and operator slots.",
  },
  {
    title: "04. Answer-Only Loss Masking",
    desc: "Operands and operators are uniformly random inputs with zero learnable internal logic. Computing cross-entropy loss strictly on positions 6 through 10 (the answer tokens) prevents gradient budget from being wasted on predicting input noise.",
  },
  {
    title: "05. Weight Decay against Memorization",
    desc: "Two-digit multiplication contains 10,000 possible pairs—small enough for an unregularized 1.2M parameter network to memorize without learning arithmetic rules. Introducing weight_decay=0.1 into AdamW forced the model to generalize, leaping from 62% to 99.30%.",
  },
];

export default function NanoCalcGPTPage() {
  const [demoInput, setDemoInput] = useState("43*57");
  const [demoAnswer, setDemoAnswer] = useState("+1542"); // 43*57 = 2451 -> reversed is 1542

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

            <span>Deep Learning Research · 2026</span>
          </div>

          <div className="mt-8 font-mono text-xs uppercase tracking-wider text-neutral-500">
            08 / Transformer Mechanics & Arithmetic Reasoning
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
            nanoCalc-GPT: Teaching a 1.2M Transformer Arithmetic from Scratch
          </h1>

          <p className="mt-5 max-w-3xl font-serif text-xl leading-8 text-neutral-600">
            An empirical investigation into whether a decoder-only transformer can
            discover multi-digit arithmetic and right-to-left carry propagation
            without hardcoded rules or external calculators, achieving 99.51%
            exact-match accuracy.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href="https://github.com/LochanJangid/nanocalc-gpt"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Source repository & notebooks ↗
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-4">
            <Meta label="ARCHITECTURE" value="Decoder Transformer" />
            <Meta label="PARAMETERS" value="1,195,536 (~1.2M)" />
            <Meta label="EXACT MATCH" value="99.51% (Held-Out)" />
            <Meta label="TRAIN TIME" value="~3 Mins (Single GPU)" />
          </div>
        </header>

        {/* =====================================================
            01 / SCIENTIFIC QUESTION
        ====================================================== */}
        <Section number="01" title="The Core Scientific Question">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            Autoregressive GPT architectures predict next tokens in a strictly left-to-right
            sequence. Human arithmetic, however, is calculated from right to left because carries
            propagate from lower-order to higher-order digits:
          </p>
          <div className="my-6 border-l-2 border-neutral-400 pl-4 py-1 italic font-serif text-neutral-700">
            When asked to solve 47 + 38 = 85, a standard causal language model must output &apos;8&apos;
            (the tens place) before emitting &apos;5&apos; (the units place). Yet the tens digit cannot be
            known with certainty until 7 + 8 = 15 is evaluated.
          </div>
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            Does a transformer have the representational capacity to resolve this structural
            information bottleneck on its own? <strong>nanoCalc-GPT</strong> proves that with one
            deliberate inductive bias—reversing the target digits on the right-hand side—a 1.2M
            parameter model learns genuine arithmetic logic rather than memorizing pairs.
          </p>
        </Section>

        {/* =====================================================
            02 / EMPIRICAL BENCHMARKS
        ====================================================== */}
        <Section number="02" title="Exact-Match Empirical Benchmarks">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725] mb-5">
            Evaluated on 3,057 held-out test examples that never appeared in the training set.
            Exact match requires every single token (sign, digits, newline) to be 100% correct
            with zero partial credit:
          </p>

          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-neutral-300 bg-neutral-50 font-mono text-xs text-neutral-500">
                <tr>
                  <th className="px-4 py-3">OPERATOR</th>
                  <th className="px-4 py-3">TEST EXAMPLES</th>
                  <th className="px-4 py-3">EXACT MATCH ACCURACY</th>
                  <th className="px-4 py-3">OBSERVATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {results.map((r) => (
                  <tr key={r.op}>
                    <td className="px-4 py-3 font-mono font-semibold text-neutral-800">{r.op}</td>
                    <td className="px-4 py-3 font-mono text-neutral-600">{r.testCount}</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700">{r.accuracy}</td>
                    <td className="px-4 py-3 font-serif text-neutral-600 text-[13px]">{r.note}</td>
                  </tr>
                ))}
                <tr className="bg-neutral-50 font-semibold border-t-2 border-neutral-300">
                  <td className="px-4 py-3 font-mono text-neutral-900">Overall Suite</td>
                  <td className="px-4 py-3 font-mono text-neutral-900">3,057</td>
                  <td className="px-4 py-3 font-mono text-emerald-800 font-black">99.51%</td>
                  <td className="px-4 py-3 font-serif text-neutral-800 text-[13px]">
                    3,042 / 3,057 perfectly solved without calculator
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* =====================================================
            03 / ARCHITECTURAL BREAKTHROUGHS
        ====================================================== */}
        <Section number="03" title="Five Key Architectural Breakthroughs">
          <div className="space-y-4">
            {designDecisions.map((d) => (
              <div key={d.title} className="border border-neutral-200 p-5 bg-white">
                <h3 className="font-serif font-bold text-base text-neutral-900">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 font-serif">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* =====================================================
            04 / MODEL SPECIFICATIONS
        ====================================================== */}
        <Section number="04" title="Network Topology & Hyperparameters">
          <div className="rounded bg-neutral-900 p-4 font-mono text-xs text-neutral-200 mb-6 overflow-x-auto">
            <div className="text-neutral-400 mb-2">// PyTorch Decoder-Only Forward Flow</div>
{`Input Sequence (12 tokens)
  ├── Token Embedding (vocab=16, dim=128)
  └── Learned Positional Embedding (context=12, dim=128)
        │
        ▼
  6× Transformer Blocks:
    ├── LayerNorm → Multi-Head Attention (4 heads, causal mask, head_dim=32)
    └── LayerNorm → Feed-Forward Network (128 → 512 → 128, ReLU activation)
        │
        ▼
  LayerNorm → Linear Projection (128 → 16 logits)`}
          </div>

          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-neutral-300 bg-neutral-50 font-mono text-xs text-neutral-500">
                <tr>
                  <th className="px-4 py-2.5">PARAMETER</th>
                  <th className="px-4 py-2.5">CONFIGURED VALUE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {hyperparams.map(([k, v]) => (
                  <tr key={k}>
                    <td className="px-4 py-2.5 font-mono text-xs font-medium text-neutral-700">{k}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-neutral-900">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* =====================================================
            05 / MECHANISTIC INTERPRETABILITY
        ====================================================== */}
        <Section number="05" title="Mechanistic Insights: What the Heads Learn">
          <p className="font-serif text-[16px] leading-[1.75] text-[#292725]">
            Inspecting the 4 attention heads across the 6 transformer layers revealed that
            the model organized computation into modular stages:
          </p>
          <ul className="mt-4 space-y-3 list-disc list-inside font-serif text-[15px] text-neutral-700">
            <li>
              <strong>Layers 1–2 (Operand Alignment):</strong> Head 1 attends strictly to the
              tens digits of operand A and operand B, while Head 2 binds the operator token
              (&apos;+&apos;, &apos;-&apos;, &apos;*&apos;) to modulate downstream attention weights.
            </li>
            <li>
              <strong>Layers 3–4 (Carry & Cross-Product Computation):</strong> In multiplication,
              Head 3 computes the units product (A0 × B0) and passes its overflow carry into
              the residual stream for the tens generation step.
            </li>
            <li>
              <strong>Layers 5–6 (Token Projection & Sign Normalization):</strong> Formats the
              final output token according to the designated sign character and padded zeroes.
            </li>
          </ul>
        </Section>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <footer className="mt-16 border-t border-neutral-300 pt-7 flex flex-col sm:flex-row justify-between items-baseline gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Source Code & Experiments
            </div>
            <a
              href="https://github.com/LochanJangid/nanocalc-gpt"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-sm text-blue-700 underline underline-offset-4"
            >
              github.com/LochanJangid/nanocalc-gpt ↗
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
