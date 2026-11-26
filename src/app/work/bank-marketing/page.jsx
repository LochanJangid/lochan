"use client";
import Link from "next/link";

const pipeline = [
  [
    "Input",
    "Customer information enters through the BankMarketer interface.",
  ],
  [
    "Validate",
    "FastAPI and Pydantic validate the request.",
  ],
  [
    "Transform",
    "The saved preprocessing pipeline prepares the features.",
  ],
  [
    "Predict",
    "XGBoost produces the classification result.",
  ],
  [
    "Respond",
    "The prediction is returned to the application.",
  ],
];

const dataGroups = [
  {
    name: "Customer",
    description:
      "Age, job, marital status, and education.",
  },
  {
    name: "Financial",
    description:
      "Balance, housing, personal loan, and default.",
  },
  {
    name: "Campaign",
    description:
      "Contact method, timing, and campaign activity.",
  },
  {
    name: "History",
    description:
      "Previous contacts and previous campaign outcomes.",
  },
];

const features = [
  {
    name: "was_contacted",
    description:
      "Identifies whether the customer had previous contact activity.",
  },
  {
    name: "campaign × previous",
    description:
      "Combines current campaign intensity with previous contact history.",
  },
  {
    name: "poutcome × campaign",
    description:
      "Connects previous campaign outcome with the current campaign context.",
  },
];

const stack = [
  ["Model", "XGBoost"],
  ["API", "FastAPI"],
  ["Validation", "Pydantic"],
  ["Frontend", "Next.js"],
  ["Container", "Docker"],
  ["Deployment", "Render · Vercel"],
];

export default function BankMarketingPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--pink)]">lochan.dev</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[var(--pink)]">projects</Link>
          <span>/</span>
          <span className="font-bold text-[var(--ink)]">bank-marketing</span>
        </div>
        <span className="font-handwriting text-lg text-[var(--pink)] font-bold -rotate-1">
          ML Systems &amp; APIs 📈
        </span>
      </div>

      <header className="box relative bg-[var(--card)] p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--pink)] text-3xl shadow-[3px_3px_0_var(--shadow)]">
            📈
          </div>
          <div>
            <div className="inline-block rounded-md border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-xs font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] mb-2">
              01 / ML Classification &amp; Explainability
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
              BankMarketer: Production Propensity System
            </h1>
          </div>
        </div>

        <div className="rainbow-bar mt-5 mb-5" aria-hidden="true" />

        <p className="font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-3xl">
          An end-to-end classification system for predicting term deposit subscriptions with SHAP waterfall explainability, containerized on Docker and served via FastAPI.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {["FastAPI", "Scikit-Learn", "SHAP", "Docker", "Pydantic", "91.2% ROC-AUC"].map((t) => (
            <span key={t} className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="https://bankmarketing-ml.onrender.com/docs"
            target="_blank"
            rel="noreferrer"
            className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>API Docs ↗</span>
          </a>

          <a
            href="https://github.com/LochanJangid/Bank-Marketing"
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

        {/* Abstract */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <h2 className="font-serif text-lg font-bold">
            Abstract
          </h2>

          <p className="mt-3 font-serif text-[15px] leading-7 text-neutral-700">
            This project develops a binary classification system
            using the Bank Marketing dataset. The system combines
            an XGBoost model with a reusable preprocessing pipeline,
            FastAPI inference, Pydantic validation, and a Next.js
            frontend. The resulting application accepts customer
            and campaign information and returns a prediction
            through a deployed API.
          </p>
        </section>

        {/* Metadata */}
        <section className="mt-8 border-y border-neutral-200 py-5">
          <div className="grid grid-cols-2 gap-y-5 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-neutral-400">Task</p>
              <p className="mt-1">Binary classification</p>
            </div>

            <div>
              <p className="text-xs text-neutral-400">Model</p>
              <p className="mt-1">XGBoost</p>
            </div>

            <div>
              <p className="text-xs text-neutral-400">Dataset</p>
              <p className="mt-1">45,211 instances</p>
            </div>

            <div>
              <p className="text-xs text-neutral-400">Stack</p>
              <p className="mt-1">
                Python · FastAPI · Next.js
              </p>
            </div>
          </div>
        </section>

        {/* 1 */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading number="1" title="Problem" />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The Bank Marketing dataset contains information about
            customers, their financial situation, contact methods,
            and previous campaign outcomes.
          </p>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            The objective is to predict whether a customer will
            subscribe to a term deposit.
          </p>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            The project was implemented as an application rather
            than stopping at a notebook model. The final system
            accepts customer information and returns a prediction.
          </p>
        </section>

        {/* 2 */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading number="2" title="Data" />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The input space contains customer demographics,
            financial information, campaign activity, and previous
            campaign outcomes.
          </p>

          <div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
            {dataGroups.map((item, index) => (
              <div
                key={item.name}
                className="grid grid-cols-[35px_1fr] gap-4 py-4"
              >
                <span className="text-xs text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-serif font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-1 font-serif text-sm leading-6 text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading number="3" title="Feature Engineering" />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            Additional features were created to provide the model
            with more useful information about campaign history.
          </p>

          <div className="mt-6 space-y-5">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="border-b border-neutral-200 pb-5"
              >
                <p className="font-mono text-sm text-neutral-900">
                  {feature.name}
                </p>

                <p className="mt-1 font-serif text-sm leading-6 text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4 */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading number="4" title="Model" />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            XGBoost is used as the final classification model.
            A reusable preprocessing pipeline handles the feature
            transformations before inference.
          </p>

          <div className="mt-6 border border-neutral-200 bg-neutral-50 p-5">
            <p className="font-mono text-xs text-neutral-500">
              MODEL
            </p>

            <p className="mt-2 font-serif text-lg font-bold">
              XGBoost Classifier
            </p>

            <p className="mt-2 font-serif text-sm leading-6 text-neutral-600">
              Gradient-boosted decision trees used for the final
              binary classification.
            </p>
          </div>
        </section>

        {/* Design decision */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <h2 className="font-serif text-lg font-bold">
            A modelling decision
          </h2>

          <p className="mt-5 font-mono text-sm">
            duration
          </p>

          <p className="mt-3 font-serif text-[15px] leading-7 text-neutral-700">
            Duration is deliberately excluded from the public
            prediction interface.
          </p>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            The value becomes known during the call. A pre-contact
            prediction should not depend on information that only
            exists after the interaction has started.
          </p>
        </section>

        {/* 5 */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading number="5" title="System" />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The trained model is exposed through a FastAPI service.
            Pydantic validates incoming requests, the saved
            preprocessing pipeline transforms the features, and
            XGBoost produces the final prediction.
          </p>

          <div className="mt-7 border-y border-neutral-200">
            {stack.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[110px_1fr] border-b border-neutral-200 py-3 last:border-b-0"
              >
                <span className="text-sm text-neutral-400">
                  {label}
                </span>

                <span className="font-serif text-sm">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <h2 className="font-serif text-lg font-bold">
            Inference pipeline
          </h2>

          <div className="mt-6 border-y border-neutral-200">
            {pipeline.map(([title, description], index) => (
              <div
                key={title}
                className="grid grid-cols-[35px_100px_1fr] gap-3 border-b border-neutral-200 py-4 last:border-b-0"
              >
                <span className="text-xs text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="font-serif font-bold">
                  {title}
                </span>

                <span className="font-serif text-sm leading-6 text-neutral-600">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 6 */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading number="6" title="Application" />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The model is connected to a Next.js frontend through
            the deployed FastAPI service.
          </p>

          <div className="mt-6 overflow-hidden border border-neutral-300">
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
              <span className="font-mono text-xs text-neutral-500">
                bank-marketing-alpha.vercel.app
              </span>

              <a
                href="https://bank-marketing-alpha.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-700 underline underline-offset-2"
              >
                Open ↗
              </a>
            </div>

            <iframe
              src="https://bank-marketing-alpha.vercel.app/"
              title="BankMarketer live application"
              className="h-[600px] w-full border-0"
              loading="lazy"
            />
          </div>
        </section>

        {/* 7 */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <SectionHeading number="7" title="Deployment" />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The backend is containerized with Docker and deployed
            separately from the Next.js frontend. Render hosts the
            backend while Vercel hosts the frontend.
          </p>
        </section>

        {/* Conclusion */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
          <h2 className="font-serif text-lg font-bold">
            Conclusion
          </h2>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            Bank Marketing takes a classification model from
            preprocessing and feature engineering to a deployed
            inference service and usable frontend.
          </p>
        </section>

        {/* NEXT PROJECT CARD */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 mt-10">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)] mb-2">
            Next Case Study
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--periwinkle)] text-2xl shadow-[3px_3px_0_var(--shadow)]">
                🩻
              </div>
              <div>
                <h3 className="font-sans text-xl font-black text-[var(--ink)]">
                  MedicalAI
                </h3>
                <p className="font-sans text-sm text-[var(--mute)] max-w-md">
                  CheXNet 121-layer DenseNet diagnostic engine identifying 14 pulmonary pathologies from chest X-rays with Grad-CAM.
                </p>
              </div>
            </div>
            <Link
              href="/work/medical-ai"
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
            href="https://github.com/LochanJangid/Bank-Marketing"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--pink)] underline underline-offset-4"
          >
            github.com/LochanJangid/Bank-Marketing ↗
          </a>
        </div>
    </main>
  );
}

function SectionHeading({ number, title }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="font-mono text-xs font-black uppercase text-[var(--pink)]">
        {number}.
      </span>

      <h2 className="font-sans text-2xl font-black text-[var(--ink)]">
        {title}
      </h2>
    </div>
  );
}