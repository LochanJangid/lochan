"use client";
import Link from "next/link";

const architecture = [
  {
    number: '01',
    title: 'Conversation',
    description:
      'The user describes symptoms through a conversational interface rather than filling out a rigid medical form.',
  },
  {
    number: '02',
    title: 'Authentication',
    description:
      'Authenticated users can maintain conversations, while guest users can explore the experience with a limited number of messages.',
  },
  {
    number: '03',
    title: 'Validation',
    description:
      'The API receives structured requests and validates the data before passing the conversation to the AI layer.',
  },
  {
    number: '04',
    title: 'AI reasoning',
    description:
      'The model is used as a symptom-gathering assistant that asks focused follow-up questions instead of presenting itself as a diagnostic authority.',
  },
  {
    number: '05',
    title: 'Care discovery',
    description:
      'When appropriate, the application can use the conversation context to search for nearby hospitals, clinics, doctors, or specialists.',
  },
]

const productDecisions = [
  {
    title: 'Conversation before conclusions',
    description:
      'The interface is designed around gathering context: onset, duration, severity, location, and related symptoms. The goal is to structure the conversation before producing useful health information.',
  },
  {
    title: 'Diagnosis is not the product promise',
    description:
      'MedicalAI is deliberately framed as AI-assisted health information rather than a replacement for professional medical diagnosis.',
  },
  {
    title: 'Guest access without permanent commitment',
    description:
      'A guest can experience the core conversation flow without creating an account. The guest experience is intentionally bounded rather than silently creating persistent user data.',
  },
  {
    title: 'Persistent conversations for signed-in users',
    description:
      'Authentication changes the experience from a temporary interaction into a conversation that can be associated with the user and revisited later.',
  },
  {
    title: 'Incognito as a separate interaction mode',
    description:
      'The application supports a mode where the conversation is treated differently from a normal persistent conversation, making privacy a product-level interaction rather than only a policy statement.',
  },
]

const engineering = [
  {
    title: 'Frontend / API separation',
    description:
      'The React application communicates with a dedicated backend rather than embedding AI and data-access logic directly into the browser.',
  },
  {
    title: 'Conversation history',
    description:
      'Messages are represented as role/content pairs so the backend can receive the relevant conversational context instead of treating every request as an isolated prompt.',
  },
  {
    title: 'Authentication boundary',
    description:
      'Authenticated API requests carry the Supabase access token, allowing the backend to distinguish protected conversations from guest interactions.',
  },
  {
    title: 'Failure handling',
    description:
      'The chat interface exposes request failures without replacing the entire conversation state, keeping the user inside the interaction instead of forcing a reload.',
  },
  {
    title: 'Responsive interaction',
    description:
      'The interface separates the conversation surface from secondary functionality such as nearby-care discovery, allowing the chat to remain the primary task.',
  },
]

const stack = [
  ['Frontend', 'React · Vite · Tailwind CSS'],
  ['Backend', 'FastAPI'],
  ['AI layer', 'Groq'],
  ['Authentication', 'Supabase Auth'],
  ['Database', 'Supabase'],
  ['Location / care', 'Nearby doctor and clinic discovery'],
  ['Deployment', 'Vercel · API deployment'],
]

const principles = [
  'AI-assisted health information',
  'Symptom gathering before conclusions',
  'Explicit medical disclaimer',
  'Authenticated and guest experiences',
  'Privacy-aware conversation modes',
  'Human care remains the final authority',
]

export default function MedicalAI() {
  return (
        <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--pink)]">lochan.dev</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[var(--pink)]">projects</Link>
          <span>/</span>
          <span className="font-bold text-[var(--ink)]">medical-ai</span>
        </div>
        <span className="font-handwriting text-lg text-[var(--pink)] font-bold -rotate-1">
          Deep Learning Diagnostics 🩻
        </span>
      </div>

      <header className="box relative bg-[var(--card)] p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--periwinkle)] text-3xl shadow-[3px_3px_0_var(--shadow)]">
            🩻
          </div>
          <div>
            <div className="inline-block rounded-md border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-xs font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] mb-2">
              03 / Deep Learning &amp; Computer Vision
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
              MedicalAI: CheXNet Pulmonary Diagnostic Engine
            </h1>
          </div>
        </div>

        <div className="rainbow-bar mt-5 mb-5" aria-hidden="true" />

        <p className="font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-3xl">
          CheXNet 121-layer DenseNet diagnostic engine identifying 14 pulmonary pathologies from chest X-rays with Grad-CAM heatmaps and interactive patient symptom intake.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {["PyTorch", "DenseNet-121", "Grad-CAM", "FastAPI", "React", "14 Pathologies"].map((t) => (
            <span key={t} className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="https://medicalai.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>Live Web Studio ↗</span>
          </a>

          <a
            href="https://github.com/LochanJangid/medicalAI"
            target="_blank"
            rel="noreferrer"
            className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>GitHub Repository ↗</span>
          </a>

          <Link
            href="/#projects"
            className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>← Lab Shelf</span>
          </Link>
        </div>
      </header>

        {/* =====================================================
            ABSTRACT
        ====================================================== */}
        <section className="mt-10">
          <h2 className="font-serif text-lg font-bold">
            Abstract
          </h2>

          <p className="mt-3 font-serif text-[15px] leading-7 text-neutral-700">
            MedicalAI is an end-to-end conversational health
            application built around a simple product question:
            how can an AI interface help a person describe what they
            are experiencing without pretending to replace a medical
            professional?
          </p>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            Instead of reducing the experience to a single prediction,
            the system uses conversation to gather symptom context,
            supports authenticated and guest interactions, provides
            privacy-oriented conversation modes, and connects users
            with nearby care when that becomes useful.
          </p>
        </section>

        {/* =====================================================
            METADATA
        ====================================================== */}
        <section className="mt-8 border-y border-neutral-200 py-5">
          <div className="grid grid-cols-2 gap-y-5 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-neutral-400">
                Product
              </p>
              <p className="mt-1">
                Conversational health AI
              </p>
            </div>

            <div>
              <p className="text-xs text-neutral-400">
                AI
              </p>
              <p className="mt-1">
                Groq
              </p>
            </div>

            <div>
              <p className="text-xs text-neutral-400">
                Backend
              </p>
              <p className="mt-1">
                FastAPI
              </p>
            </div>

            <div>
              <p className="text-xs text-neutral-400">
                Frontend
              </p>
              <p className="mt-1">
                React · Vite
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            01 PROBLEM
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="1"
            title="The problem"
          />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            Describing a health problem is surprisingly difficult.
            People often know that something feels wrong without
            knowing which information matters, how to describe it,
            or what kind of care they should look for.
          </p>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            A conventional form can collect structured information,
            but it places the burden of knowing the right questions
            on the user. A generic chatbot has the opposite problem:
            it can produce fluent answers without necessarily
            gathering enough context.
          </p>

          <div className="mt-7 border-l-2 border-neutral-300 pl-5">
            <p className="font-serif text-lg leading-7 text-neutral-800">
              The design challenge was therefore not simply
              “connect an LLM to a chat box.”
            </p>

            <p className="mt-2 font-serif text-[15px] leading-7 text-neutral-600">
              It was to build a conversation flow that gathers useful
              information while maintaining a clear boundary between
              AI assistance and medical diagnosis.
            </p>
          </div>
        </section>

        {/* =====================================================
            02 PRODUCT MODEL
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="2"
            title="Product model"
          />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            MedicalAI is organized around three connected jobs:
          </p>

          <div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
            <ProductRow
              number="01"
              title="Understand"
              description="Turn an unstructured description into a clearer symptom context through focused follow-up questions."
            />

            <ProductRow
              number="02"
              title="Inform"
              description="Provide AI-assisted health information without presenting the system as a diagnostic authority."
            />

            <ProductRow
              number="03"
              title="Connect"
              description="When appropriate, help the user move from information toward nearby hospitals, clinics, doctors, or specialists."
            />
          </div>
        </section>

        {/* =====================================================
            03 CONVERSATION DESIGN
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="3"
            title="Conversation design"
          />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The conversation is intentionally structured around
            symptom gathering rather than an immediate answer.
            Important dimensions include onset, duration, severity,
            location, and related symptoms.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <InfoCard
              title="User message"
              description="The user describes what they are experiencing in their own words."
            />

            <InfoCard
              title="AI follow-up"
              description="The assistant asks a short clarifying question when more context is needed."
            />

            <InfoCard
              title="Conversation context"
              description="Previous messages are retained as conversational context for subsequent requests."
            />

            <InfoCard
              title="Health information"
              description="The interaction is framed as informational assistance rather than a clinical diagnosis."
            />
          </div>
        </section>

        {/* =====================================================
            04 SAFETY BOUNDARY
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="4"
            title="The safety boundary"
          />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            Medical software has a different failure profile from
            an ordinary productivity application. A confident but
            incorrect answer can be more harmful than an incomplete
            one.
          </p>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            MedicalAI therefore treats the AI as a conversational
            information layer rather than as an autonomous medical
            authority.
          </p>

          <div className="mt-7 border border-amber-200 bg-amber-50 p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-amber-700">
              Product boundary
            </p>

            <p className="mt-2 font-serif text-lg font-bold text-neutral-900">
              AI-assisted health information · Not a diagnosis
            </p>

            <p className="mt-2 font-serif text-sm leading-6 text-neutral-600">
              The interface makes this distinction part of the
              product experience rather than hiding it inside
              documentation.
            </p>
          </div>
        </section>

        {/* =====================================================
            05 ACCESS MODEL
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="5"
            title="Guest and authenticated access"
          />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            One of the engineering decisions was to avoid making
            authentication the first barrier to the product.
            MedicalAI supports a limited guest experience while
            authenticated users receive the persistent conversation
            experience.
          </p>

          <div className="mt-6 border-y border-neutral-200">
            <AccessRow
              label="Guest"
              value="Temporary conversation experience with bounded usage."
            />

            <AccessRow
              label="Signed in"
              value="Conversation requests can be associated with an authenticated user."
            />

            <AccessRow
              label="Incognito"
              value="A separate interaction mode for conversations that should not behave like normal persistent chats."
            />
          </div>
        </section>

        {/* =====================================================
            06 ARCHITECTURE
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="6"
            title="System architecture"
          />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The application is separated into a browser-facing
            interface and a backend service. This keeps authentication,
            AI requests, validation, and application logic outside
            the client.
          </p>

          <div className="mt-7 border-y border-neutral-200">
            {architecture.map((item) => (
              <div
                key={item.number}
                className="grid grid-cols-[35px_100px_1fr] gap-3 border-b border-neutral-200 py-4 last:border-b-0"
              >
                <span className="text-xs text-neutral-400">
                  {item.number}
                </span>

                <span className="font-serif font-bold">
                  {item.title}
                </span>

                <span className="font-serif text-sm leading-6 text-neutral-600">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            07 ENGINEERING
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="7"
            title="Engineering decisions"
          />

          <div className="mt-6 space-y-5">
            {engineering.map((item) => (
              <div
                key={item.title}
                className="border-b border-neutral-200 pb-5"
              >
                <h3 className="font-serif font-bold text-neutral-900">
                  {item.title}
                </h3>

                <p className="mt-1 font-serif text-sm leading-6 text-neutral-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            08 NEARBY CARE
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="8"
            title="From information to care"
          />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            A useful health application should not stop at a
            conversational response. If a user needs to move from
            understanding their situation toward finding care,
            MedicalAI provides a nearby-care workflow.
          </p>

          <div className="mt-7 border border-neutral-200 bg-neutral-50 p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-neutral-400">
              Care discovery
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <MiniCard
                title="Context"
                text="Use the conversation to inform the care search."
              />

              <MiniCard
                title="Location"
                text="Search for relevant nearby healthcare providers."
              />

              <MiniCard
                title="Action"
                text="Open a provider location through Maps."
              />
            </div>
          </div>

          <p className="mt-5 font-serif text-sm leading-6 text-neutral-500">
            This creates a deliberate transition from
            <span className="text-neutral-800">
              {' '}
              “What might this information mean?”
            </span>{' '}
            toward
            <span className="text-neutral-800">
              {' '}
              “Where can I seek appropriate care?”
            </span>
          </p>
        </section>

        {/* =====================================================
            09 STACK
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="9"
            title="Technology stack"
          />

          <div className="mt-7 border-y border-neutral-200">
            {stack.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[120px_1fr] border-b border-neutral-200 py-3 last:border-b-0"
              >
                <span className="text-sm text-neutral-400">
                  {label}
                </span>

                <span className="font-serif text-sm text-neutral-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            10 SYSTEM FLOW
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="10"
            title="Request lifecycle"
          />

          <div className="mt-6 border-y border-neutral-200">
            <PipelineRow
              number="01"
              title="User"
              description="Describes symptoms or asks a health-related question."
            />

            <PipelineRow
              number="02"
              title="Frontend"
              description="Builds the conversation request and presents the interaction."
            />

            <PipelineRow
              number="03"
              title="FastAPI"
              description="Receives the request and applies the application's backend rules."
            />

            <PipelineRow
              number="04"
              title="Auth"
              description="Authenticated requests can carry the Supabase access token."
            />

            <PipelineRow
              number="05"
              title="Groq"
              description="The AI layer generates the conversational response."
            />

            <PipelineRow
              number="06"
              title="Frontend"
              description="The response is rendered as the next message in the conversation."
            />
          </div>
        </section>

        {/* =====================================================
            11 PRODUCT PRINCIPLES
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="11"
            title="Product principles"
          />

          <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <div
                key={principle}
                className="flex items-start gap-3 border-b border-neutral-200 py-3"
              >
                <span className="font-mono text-xs text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="font-serif text-sm text-neutral-800">
                  {principle}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            12 WHAT MAKES IT AN ENGINEERING PROJECT
        ====================================================== */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading
            number="12"
            title="Why this is more than a chatbot"
          />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The interesting part of MedicalAI is not the existence
            of an LLM call. The engineering work sits around it.
          </p>

          <div className="mt-6 space-y-4">
            <Highlight
              title="State"
              text="Conversations have lifecycle and persistence semantics rather than being isolated prompts."
            />

            <Highlight
              title="Identity"
              text="The system distinguishes guests, authenticated users, and different conversation modes."
            />

            <Highlight
              title="Interface"
              text="The UI is designed around a conversation rather than around a generic AI text box."
            />

            <Highlight
              title="Integration"
              text="The product connects AI interaction with authentication, persistence, and nearby-care discovery."
            />

            <Highlight
              title="Safety"
              text="The product explicitly limits its role to AI-assisted health information rather than presenting itself as a diagnostic system."
            />
          </div>
        </section>

        {/* =====================================================
            CONCLUSION
        ====================================================== */}
        <section className="mt-14 border-t border-neutral-300 pt-8">
          <h2 className="font-serif text-lg font-bold">
            Conclusion
          </h2>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            MedicalAI takes a conversational AI capability and turns
            it into a complete product system: a user-facing
            interface, authenticated and guest experiences, backend
            request handling, conversation context, privacy-oriented
            interaction modes, and a path from symptom discussion
            toward nearby care.
          </p>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            The central engineering lesson is that an AI application
            is not defined by the model call alone. The surrounding
            system determines how that model is accessed, what
            context it receives, how users interact with it, and
            where the boundaries of the product are drawn.
          </p>
        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}
                {/* NEXT PROJECT CARD */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 mt-10">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)] mb-2">
            Next Case Study
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--sun)] text-2xl shadow-[3px_3px_0_var(--shadow)]">
                🔢
              </div>
              <div>
                <h3 className="font-sans text-xl font-black text-[var(--ink)]">
                  nanoCalc-GPT
                </h3>
                <p className="font-sans text-sm text-[var(--mute)] max-w-md">
                  1.2M parameter decoder-only transformer discovering multi-digit arithmetic carry via target reversal.
                </p>
              </div>
            </div>
            <Link
              href="/work/nanocalc-gpt"
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
            href="https://github.com/LochanJangid/medicalAI"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--pink)] underline underline-offset-4"
          >
            github.com/LochanJangid/medicalAI ↗
          </a>
        </div>
    </main>
  )
}

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function SectionHeading({ number, title }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-xs text-neutral-400">
        {number}.
      </span>

      <h2 className="font-serif text-lg font-bold">
        {title}
      </h2>
    </div>
  )
}

function ProductRow({
  number,
  title,
  description,
}) {
  return (
    <div className="grid grid-cols-[35px_100px_1fr] gap-3 py-4">
      <span className="text-xs text-neutral-400">
        {number}
      </span>

      <span className="font-serif font-bold">
        {title}
      </span>

      <span className="font-serif text-sm leading-6 text-neutral-600">
        {description}
      </span>
    </div>
  )
}

function AccessRow({ label, value }) {
  return (
    <div className="grid grid-cols-[110px_1fr] border-b border-neutral-200 py-4 last:border-b-0">
      <span className="font-serif font-bold text-neutral-900">
        {label}
      </span>

      <span className="font-serif text-sm leading-6 text-neutral-600">
        {value}
      </span>
    </div>
  )
}

function PipelineRow({
  number,
  title,
  description,
}) {
  return (
    <div className="grid grid-cols-[35px_100px_1fr] gap-3 border-b border-neutral-200 py-4 last:border-b-0">
      <span className="text-xs text-neutral-400">
        {number}
      </span>

      <span className="font-serif font-bold">
        {title}
      </span>

      <span className="font-serif text-sm leading-6 text-neutral-600">
        {description}
      </span>
    </div>
  )
}

function InfoCard({ title, description }) {
  return (
    <div className="border border-neutral-200 bg-neutral-50 p-5">
      <h3 className="font-serif font-bold text-neutral-900">
        {title}
      </h3>

      <p className="mt-2 font-serif text-sm leading-6 text-neutral-600">
        {description}
      </p>
    </div>
  )
}

function MiniCard({ title, text }) {
  return (
    <div className="border border-neutral-200 bg-white p-4">
      <p className="font-mono text-[10px] uppercase tracking-wide text-neutral-400">
        {title}
      </p>

      <p className="mt-2 font-serif text-sm leading-6 text-neutral-600">
        {text}
      </p>
    </div>
  )
}

function Highlight({ title, text }) {
  return (
    <div className="flex gap-4 border-b border-neutral-200 pb-4">
      <span className="w-20 shrink-0 font-mono text-xs text-neutral-400">
        {title}
      </span>

      <p className="font-serif text-sm leading-6 text-neutral-600">
        {text}
      </p>
    </div>
  )
}