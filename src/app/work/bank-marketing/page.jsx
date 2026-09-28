"use client";

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
    <main className="min-h-screen bg-[#eeeeec] py-6 sm:py-10">
      {/* Paper */}
      <article className="mx-auto w-[calc(100%-24px)] max-w-[850px] bg-white px-7 py-10 shadow-sm sm:px-14 sm:py-16 md:px-20 md:py-20">

        {/* Paper header */}
        <header className="border-b border-neutral-300 pb-8">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <a
              href="/"
              className="font-medium text-neutral-800 hover:underline"
            >
              Lochan Jangid
            </a>

            <span>Machine Learning Case Study · 2026</span>
          </div>

          <h1 className="mt-12 font-serif text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
            Bank Marketing
          </h1>

          <p className="mt-4 max-w-2xl font-serif text-xl leading-8 text-neutral-600">
            An end-to-end classification system for predicting
            term deposit subscriptions.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href="https://bank-marketing-alpha.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Live application ↗
            </a>

            <a
              href="https://github.com/LochanJangid/bank-marketing"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Source ↗
            </a>
          </div>
        </header>

        {/* Abstract */}
        <section className="mt-10">
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
        <section className="mt-14">
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
        <section className="mt-14">
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
        <section className="mt-14">
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
        <section className="mt-14">
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
        <section className="mt-14">
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
        <section className="mt-14">
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
        <section className="mt-14">
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
        <section className="mt-14">
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
        <section className="mt-14">
          <SectionHeading number="7" title="Deployment" />

          <p className="mt-5 font-serif text-[15px] leading-7 text-neutral-700">
            The backend is containerized with Docker and deployed
            separately from the Next.js frontend. Render hosts the
            backend while Vercel hosts the frontend.
          </p>
        </section>

        {/* Conclusion */}
        <section className="mt-14 border-t border-neutral-300 pt-8">
          <h2 className="font-serif text-lg font-bold">
            Conclusion
          </h2>

          <p className="mt-4 font-serif text-[15px] leading-7 text-neutral-700">
            Bank Marketing takes a classification model from
            preprocessing and feature engineering to a deployed
            inference service and usable frontend.
          </p>
        </section>

        {/* Links */}
        <footer className="mt-14 border-t border-neutral-300 pt-6">
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-serif text-sm">
            <a
              href="https://github.com/LochanJangid/bank-marketing"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              GitHub repository ↗
            </a>

            <a
              href="https://bank-marketing-alpha.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              Live application ↗
            </a>

            <a
              href="/"
              className="text-blue-700 underline underline-offset-2"
            >
              Portfolio
            </a>
          </div>

          <p className="mt-6 text-xs text-neutral-400">
            © 2026 Lochan Jangid
          </p>
        </footer>
      </article>
    </main>
  );
}

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
  );
}