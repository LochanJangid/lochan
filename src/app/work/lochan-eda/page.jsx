"use client";
import Link from "next/link";

const apiGroups = [
  {
    number: "01",
    name: "AutomatedEDA",
    label: "ORCHESTRATE",
    description:
      "Connects inspection, preprocessing decisions, train/test splitting, fitting, and transformation into one reusable workflow.",
    methods: ["prepare()", "fit()", "transform()"],
  },
  {
    number: "02",
    name: "Profiler",
    label: "INSPECT",
    description:
      "A dataset-level entry point for understanding structure, distributions, missingness, and feature behaviour.",
    methods: ["overview()", "numerical", "categorical"],
  },
  {
    number: "03",
    name: "Numerical",
    label: "NUMERIC",
    description:
      "Works with numerical feature behaviour including imputation, outliers, scaling, summaries, and visual analysis.",
    methods: [
      "imputer()",
      "outlier_manager()",
      "scaler()",
      "summary()",
      "plot()",
    ],
  },
  {
    number: "04",
    name: "Categorical",
    label: "CATEGORICAL",
    description:
      "Handles categorical feature behaviour including missing values, rare categories, encoding, summaries, and plots.",
    methods: [
      "imputer()",
      "rare_manager()",
      "encoder()",
      "summary()",
      "plot()",
    ],
  },
  {
    number: "05",
    name: "Missing",
    label: "QUALITY",
    description:
      "Provides focused visualization for understanding missing-value patterns before preprocessing.",
    methods: ["plot()"],
  },
  {
    number: "06",
    name: "Report",
    label: "OUTPUT",
    description:
      "Turns a profiling session into a shareable PDF report for documenting dataset behaviour.",
    methods: ["save()"],
  },
];

function Section({ number, title, children, dark = false }) {
  return (
    <section
      className={
        dark
          ? "border-b border-neutral-800 bg-neutral-950 py-12 text-white"
          : "border-b border-neutral-200 py-12"
      }
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-baseline gap-3">
          <span
            className={`font-mono text-xs ${
              dark ? "text-neutral-500" : "text-neutral-400"
            }`}
          >
            {number}
          </span>

          <h2
            className={`font-sans text-xl font-bold ${
              dark ? "text-white" : "text-[var(--ink)]"
            }`}
          >
            {title}
          </h2>
        </div>

        <div
          className={`font-sans text-base leading-relaxed ${
            dark ? "text-neutral-300" : "text-[var(--ink)]"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function CodeBlock({ label, children, dark = false }) {
  return (
    <div
      className={
        dark
          ? "border border-neutral-800 bg-neutral-900"
          : "border border-neutral-200 bg-neutral-50"
      }
    >
      <div
        className={`border-b px-5 py-3 font-mono text-[10px] uppercase tracking-wider ${
          dark
            ? "border-neutral-800 text-neutral-500"
            : "border-neutral-200 text-neutral-400"
        }`}
      >
        {label}
      </div>

      <pre
        className={`overflow-x-auto p-5 font-mono text-xs leading-6 ${
          dark ? "text-neutral-300" : "text-neutral-700"
        }`}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function LochanEDA() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--pink)]">lochan.dev</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[var(--pink)]">projects</Link>
          <span>/</span>
          <span className="font-bold text-[var(--ink)]">lochan-eda</span>
        </div>
        <span className="font-handwriting text-lg text-[var(--pink)] font-bold -rotate-1">
          PyPI Automated EDA Tooling 📦
        </span>
      </div>

      <header className="box relative bg-[var(--card)] p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--aqua)] text-3xl shadow-[3px_3px_0_var(--shadow)]">
            📦
          </div>
          <div>
            <div className="inline-block rounded-md border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-xs font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] mb-2">
              05 / Open Source Python Package
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
              Lochan EDA
            <br />
            <span className="text-neutral-500">
              Preprocessing that starts with the data.
            </span>
            </h1>
          </div>
        </div>

        <div className="rainbow-bar mt-5 mb-5" aria-hidden="true" />

        <p className="font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-3xl">
          A reusable Python toolkit for understanding tabular data and
            turning its behaviour into practical preprocessing decisions
            before machine learning.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span key="PyPI Package" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#PyPI Package</span><span key="Automated EDA" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#Automated EDA</span><span key="Statistical Profiling" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#Statistical Profiling</span><span key="Python 3" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#Python 3</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="https://pypi.org/project/lochan-eda/" target="_blank" rel="noreferrer" className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"><span>Live application ↗</span></a>
          <a href="https://github.com/LochanJangid/lochan_eda" target="_blank" rel="noreferrer" className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"><span>Source repository ↗</span></a>
          <Link href="/#projects" className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2">
            <span>← Lab Shelf</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t-2 border-[var(--ink)]/10 pt-6 sm:grid-cols-4">
          <Meta label="VERSION" value="v0.2.0 (PyPI)" /><Meta label="LANGUAGE" value="Python" /><Meta label="FOCUS" value="Tabular EDA + preprocessing" /><Meta label="INTERFACE" value="Profiler / AutomatedEDA" />
        </div>
      </header>

      {/* Architecture & Leakage Prevention Pipeline Flow */}
      <div className="box relative bg-[var(--card)] p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[var(--ink)]/15 pb-4 mb-6">
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-wider text-[var(--pink)]">
              // ARCHITECTURE &amp; LEAKAGE PREVENTION PIPELINE
            </span>
            <h2 className="font-sans text-xl sm:text-2xl font-black text-[var(--ink)]">
              v0.2.0 API Pipeline Architecture
            </h2>
          </div>
          <span className="rounded-full border border-[var(--ink)] bg-[var(--aqua)] px-3 py-1 font-mono text-xs font-black text-[#1b1840] shadow-[1px_1px_0_var(--shadow)]">
            🛡️ Leakage Prevention
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch font-mono text-xs">
          <div className="rounded-2xl border-2 border-[var(--ink)]/20 bg-[var(--bg)] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[var(--pink)] uppercase tracking-wider">Step 01</span>
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-sans text-lg font-black text-[var(--ink)]">Raw Tabular Data</h3>
              <p className="mt-2 font-sans text-xs text-[var(--mute)] leading-relaxed">
                Input Pandas DataFrame or CSV files containing uncleaned numerical, categorical, and missing columns.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--ink)]/10 font-mono text-xs text-[var(--ink)]">
              <code>pd.DataFrame (train / test)</code>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[var(--ink)]/20 bg-[var(--bg)] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[var(--aqua)] uppercase tracking-wider">Step 02 // Core</span>
                <span className="text-xl">⚙️</span>
              </div>
              <h3 className="font-sans text-lg font-black text-[var(--ink)]">AutomatedEDA</h3>
              <p className="mt-2 font-sans text-xs text-[var(--mute)] leading-relaxed">
                Guarantees zero data leakage by computing statistics strictly on train partition.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--ink)]/10 space-y-1 font-mono text-xs text-[var(--ink)]">
              <div className="rounded bg-[var(--card)] px-2 py-1 border border-[var(--ink)]/20"><code>.prepare()</code> // split &amp; detect</div>
              <div className="rounded bg-[var(--card)] px-2 py-1 border border-[var(--ink)]/20"><code>.fit()</code> // learn train params</div>
              <div className="rounded bg-[var(--card)] px-2 py-1 border border-[var(--ink)]/20"><code>.transform()</code> // apply cleanly</div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[var(--ink)]/20 bg-[var(--bg)] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[var(--sun)] uppercase tracking-wider">Step 03</span>
                <span className="text-xl">📄</span>
              </div>
              <h3 className="font-sans text-lg font-black text-[var(--ink)]">Profiler</h3>
              <p className="mt-2 font-sans text-xs text-[var(--mute)] leading-relaxed">
                Generates statistical summaries, interactive distribution plots, correlation matrices, and standalone PDF reports.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--ink)]/10 space-y-1 font-mono text-xs text-[var(--ink)]">
              <div className="rounded bg-[var(--card)] px-2 py-1 border border-[var(--ink)]/20"><code>.overview()</code> // dimensions</div>
              <div className="rounded bg-[var(--card)] px-2 py-1 border border-[var(--ink)]/20"><code>.plots()</code> // distributions</div>
              <div className="rounded bg-[var(--card)] px-2 py-1 border border-[var(--ink)]/20"><code>.export_pdf()</code> // full report</div>
            </div>
          </div>
        </div>
      </div>

        {/* =====================================================
            ABSTRACT
        ===================================================== */}

        <div className="mx-7 border-y border-neutral-300 py-8 sm:mx-14 md:mx-20">
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
            Abstract
          </div>

          <p className="mt-4 max-w-3xl font-serif text-[15px] leading-7 text-neutral-700">
            lochan-eda is designed around a simple idea: preprocessing should
            respond to the behaviour of the dataset instead of beginning with
            a fixed list of transformations.
          </p>
        </div>

        {/* =====================================================
            PROBLEM
        ===================================================== */}

        <Section number="01" title="The Problem">
          <p>
            A typical tabular ML workflow quickly becomes a collection of
            repeated decisions: inspect missing values, separate numerical and
            categorical features, investigate outliers, understand
            distributions, choose transformations, and finally construct a
            preprocessing pipeline.
          </p>

          <p className="mt-5">
            The code is repetitive. The difficult part is the reasoning behind
            the code.
          </p>

          <p className="mt-5">
            <strong>lochan-eda</strong> is built around a simple idea:
            preprocessing should respond to the behaviour of the dataset, not
            begin with a fixed list of transformers.
          </p>
        </Section>

        {/* =====================================================
            MANUAL EDA
        ===================================================== */}

        <Section number="02" title="Manual EDA" dark>
          <h3 className="font-serif text-2xl leading-tight text-white">
            Every dataset becomes another notebook.
          </h3>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p>
                Without reusable tooling, the same investigation gets
                repeated for almost every dataset.
              </p>

              <p className="mt-5">
                First inspect missing values. Then identify numerical and
                categorical columns. Then investigate distributions, outliers,
                cardinality, rare categories, and finally decide what
                transformations make sense.
              </p>

              <p className="mt-5">
                The next dataset arrives and the process starts again.
              </p>
            </div>

            <CodeBlock label="REPETITIVE EDA" dark>
{`# inspect missing values
df.isnull().sum()

# inspect data types
df.dtypes

# numerical features
numeric_cols = df.select_dtypes(
    include="number"
).columns

# categorical features
categorical_cols = df.select_dtypes(
    exclude="number"
).columns

# inspect distributions
df[numeric_cols].describe()

# inspect categories
for col in categorical_cols:
    print(col, df[col].nunique())

# investigate outliers
# decide imputation
# decide scaling
# decide encoding
# build pipeline
# repeat for another dataset...`}
            </CodeBlock>
          </div>
        </Section>

        {/* =====================================================
            BLIND PIPELINE
        ===================================================== */}

        <Section number="03" title="Blind Pipeline">
          <h3 className="font-sans text-2xl font-bold leading-tight text-[var(--ink)]">
            A pipeline can be reusable and still be thoughtless.
          </h3>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <CodeBlock label="GENERIC PREPROCESSING">
{`preprocessor = ColumnTransformer([
    (
        "numeric",
        Pipeline([
            ("imputer", SimpleImputer(
                strategy="median"
            )),
            ("scaler", StandardScaler())
        ]),
        numeric_cols
    ),

    (
        "categorical",
        Pipeline([
            ("imputer", SimpleImputer(
                strategy="most_frequent"
            )),
            ("encoder", OneHotEncoder(
                handle_unknown="ignore"
            ))
        ]),
        categorical_cols
    )
])`}
            </CodeBlock>

            <div>
              <p>
                This pipeline is perfectly valid. It is also easy to write
                without asking whether each transformation fits the data.
              </p>

              <div className="my-7 space-y-3 border-y border-neutral-200 py-5">
                {[
                  "Why median imputation?",
                  "Why standard scaling?",
                  "Why most-frequent categorical imputation?",
                  "Why this encoding strategy?",
                ].map((question) => (
                  <div
                    key={question}
                    className="flex gap-3 text-sm text-neutral-700"
                  >
                    <span className="font-mono text-neutral-400">?</span>
                    <span>{question}</span>
                  </div>
                ))}
              </div>

              <p>
                Scikit-learn provides excellent preprocessing building blocks.
                The developer still has to determine which blocks make sense
                for the dataset.
              </p>
            </div>
          </div>
        </Section>

        {/* =====================================================
            NOTEBOOK
        ===================================================== */}

        <Section number="04" title="Run the Workflow">
          <div className="grid gap-8">
            <div>
              <h3 className="font-sans text-2xl font-bold leading-tight text-[var(--ink)]">
                Don't just read the workflow. Run it.
              </h3>

              <p className="mt-4">
                A complete notebook is included so the workflow can be
                inspected, executed, and modified with a real dataset.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "01 · Load data",
                  "02 · Profile",
                  "03 · Inspect behaviour",
                  "04 · Prepare",
                  "05 · Transform",
                  "06 · Model",
                ].map((step) => (
                  <span
                    key={step}
                    className="border border-neutral-200 px-3 py-2 font-mono text-[10px] text-neutral-500"
                  >
                    {step}
                  </span>
                ))}
              </div>

              <a
                href="https://colab.research.google.com/drive/1Vr4LbymtbitsuOcFmpuYyRHkiD_lGe_X?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block text-sm text-blue-700 underline underline-offset-4"
              >
                Open notebook ↗
              </a>
            </div>

            <div className="border border-neutral-300">
              <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
                <span className="font-mono text-[10px] text-neutral-500">
                  lochan_eda_example.ipynb
                </span>

                <span className="font-mono text-[10px] text-neutral-400">
                  JUPYTER NOTEBOOK
                </span>
              </div>

              <div className="divide-y divide-neutral-200">
                <NotebookCell number="In [1]:">
{`from lochan_eda import (
    Profiler,
    AutomatedEDA
)

profile = Profiler(df)
profile.report.save("report.pdf")`}
                </NotebookCell>

                <NotebookCell number="In [2]:">
{`eda = AutomatedEDA()

X_train, X_test, y_train, y_test = eda.prepare(
    df,
    target="target",
    exclude=None,
    split=True,
    test_size=0.2,
    random_state=42,
    stratify=df["target"],
    in_return="ndarray"/"dataframe"/"tensor"
)`}
                </NotebookCell>

                <div className="bg-neutral-50 px-5 py-5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    Output
                  </div>

                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Dataset inspected and transformed into model-ready
                    training and testing data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* =====================================================
            DATA FIRST
        ===================================================== */}

        <Section number="05" title="Data-First Preprocessing" dark>
          <h3 className="font-serif text-2xl leading-tight text-white">
            Let the data influence the preprocessing.
          </h3>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <p>
              Instead of starting with a fixed recipe, lochan-eda starts by
              understanding the dataset.
            </p>

            <div>
              <p>
                Numerical and categorical features are analysed according to
                their behaviour. Missingness, distributions, categories,
                outliers, and feature characteristics can then inform the
                preprocessing workflow.
              </p>

              <p className="mt-5">
                The goal is not to hide preprocessing behind magic. It is to
                reduce repetitive investigation while keeping the reasoning
                visible and the workflow reusable.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-7 sm:items-center">
            <FlowNode number="01" title="DataFrame" text="Raw data" />
            <FlowArrow />
            <FlowNode number="02" title="Behaviour" text="Understand" />
            <FlowArrow />
            <FlowNode number="03" title="Decision" text="Choose" />
            <FlowArrow />
            <FlowNode number="04" title="Pipeline" text="Transform" />
          </div>
        </Section>

        {/* =====================================================
            WORKFLOW
        ===================================================== */}

        <Section number="06" title="Workflow">
          <div className="mb-8">
            <h3 className="font-sans text-2xl font-bold leading-tight text-[var(--ink)]">
              From behaviour to model-ready data.
            </h3>

            <p className="mt-4">
              The package separates inspection from reusable transformation.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <CodeBlock label="01 / INSTALL">
{`pip install lochan-eda`}
            </CodeBlock>

            <CodeBlock label="02 / INSPECT">
{`from lochan_eda import Profiler

profile = Profiler(df)

profile.overview()`}
            </CodeBlock>

            <CodeBlock label="03 / PREPARE">
{`from lochan_eda import AutomatedEDA

eda = AutomatedEDA()

Xtr, Xte, ytr, yte = eda.prepare(
    df,
    target="target"
)`}
            </CodeBlock>
          </div>
        </Section>

        {/* =====================================================
            BEHAVIOUR
        ===================================================== */}

        <Section number="07" title="Feature Behaviour">
          <h3 className="mb-8 font-sans text-2xl font-bold leading-tight text-[var(--ink)]">
            Different features can require different treatment.
          </h3>

          <div className="grid gap-0 border border-neutral-200 sm:grid-cols-3">
            <Principle
              number="01"
              title="Numerical"
              text="Missing values, scale, distributions, and outliers can affect how numerical features should be prepared."
            />

            <Principle
              number="02"
              title="Categorical"
              text="Missing categories, cardinality, and rare values can influence how categorical features should be represented."
            />

            <Principle
              number="03"
              title="Dataset-level"
              text="Understanding the dataset before transformation gives the preprocessing workflow context instead of blindly applying the same recipe everywhere."
            />
          </div>
        </Section>

        {/* =====================================================
            FIT / TRANSFORM
        ===================================================== */}

        <Section number="08" title="Fit and Transform" dark>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl leading-tight text-white">
                Learn on train. Reuse on test.
              </h3>
            </div>

            <div>
              <p>
                The important part of <code>AutomatedEDA</code> is not simply
                applying preprocessing. The workflow separates{" "}
                <code>fit()</code> from <code>transform()</code>.
              </p>

              <p className="mt-5">
                This allows preprocessing decisions to be learned from the
                training data and then reused when transforming another
                dataset.
              </p>

              <div className="mt-6">
                <CodeBlock label="FIT → TRANSFORM" dark>
{`eda.fit(X_train)

X_train = eda.transform(X_train)
X_test  = eda.transform(X_test)`}
                </CodeBlock>
              </div>

              <p className="mt-5">
                <code>prepare()</code> wraps the common workflow when you want
                one entry point for target handling, train/test splitting,
                fitting, and transformation.
              </p>
            </div>
          </div>
        </Section>

        {/* =====================================================
            API
        ===================================================== */}

        <Section number="09" title="API Surface">
          <h3 className="mb-8 font-sans text-2xl font-bold leading-tight text-[var(--ink)]">
            Small public surface. Focused jobs.
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {apiGroups.map((api) => (
              <article
                key={api.name}
                className="border border-neutral-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-neutral-400">
                    {api.number}
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                    {api.label}
                  </span>
                </div>

                <h3 className="mt-5 font-sans text-xl font-bold text-[var(--ink)]">
                  {api.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {api.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {api.methods.map((method) => (
                    <code
                      key={method}
                      className="border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-[10px] text-neutral-600"
                    >
                      {method}
                    </code>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* =====================================================
            WHY
        ===================================================== */}

        <Section number="10" title="Why I Built It">
          <h3 className="mb-8 font-sans text-2xl font-bold leading-tight text-[var(--ink)]">
            From transformer-first to data-first preprocessing.
          </h3>

          <div className="grid gap-0 border border-neutral-200 sm:grid-cols-3">
            <Principle
              number="01"
              title="Inspect"
              text="Understand missing values, distributions, categories, outliers, and feature behaviour before choosing transformations."
            />

            <Principle
              number="02"
              title="Decide"
              text="Use what the dataset reveals to guide preprocessing rather than blindly applying the same recipe to every dataset."
            />

            <Principle
              number="03"
              title="Reuse"
              text="Turn those decisions into a consistent workflow that can be fitted on training data and reused on new data."
            />
          </div>
        </Section>

        {/* =====================================================
            API INVENTORY
        ===================================================== */}

        <section className="border-b border-neutral-300 px-7 py-12 sm:px-14 md:px-20">
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
            Package inventory
          </div>

          <div className="mt-7 space-y-0 border-t border-neutral-200">
            {apiGroups.map((api) => (
              <div
                key={api.name}
                className="grid gap-3 border-b border-neutral-200 py-5 sm:grid-cols-[50px_150px_1fr]"
              >
                <span className="font-mono text-xs text-neutral-400">
                  {api.number}
                </span>

                <strong className="text-sm text-neutral-900">
                  {api.name}
                </strong>

                <span className="text-sm leading-6 text-neutral-600">
                  {api.description}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            CLOSING
        ===================================================== */}

        <section className="box relative bg-[var(--card)] p-6 sm:p-8 mt-10">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)] mb-2">
            Next Case Study
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--aqua)] text-2xl shadow-[3px_3px_0_var(--shadow)]">
                🌐
              </div>
              <div>
                <h3 className="font-sans text-xl font-black text-[var(--ink)]">
                  WebLens AI
                </h3>
                <p className="font-sans text-sm text-[var(--mute)] max-w-md">
                  Autonomous visual audit & code generation studio using Playwright DOM coordinate extraction and multimodal LLMs.
                </p>
              </div>
            </div>
            <Link
              href="/work/weblens-ai"
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
            href="https://github.com/LochanJangid/lochan_eda"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--pink)] underline underline-offset-4"
          >
            github.com/LochanJangid/lochan_eda ↗
          </a>
        </div>
    </main>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-wider text-neutral-400">
        {label}
      </div>

      <div className="mt-1 text-sm text-neutral-800">
        {value}
      </div>
    </div>
  );
}

function NotebookCell({ number, children }) {
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-[65px_1fr]">
      <span className="font-mono text-[10px] text-neutral-400">
        {number}
      </span>

      <pre className="overflow-x-auto font-mono text-xs leading-6 text-neutral-700">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function FlowNode({ number, title, text }) {
  return (
    <div className="border border-neutral-800 p-4">
      <div className="font-mono text-[10px] text-neutral-500">
        {number}
      </div>

      <div className="mt-3 text-sm font-medium text-white">
        {title}
      </div>

      <div className="mt-1 text-xs text-neutral-500">
        {text}
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden text-center font-mono text-neutral-600 sm:block">
      →
    </div>
  );
}

function Principle({ number, title, text }) {
  return (
    <div className="border-b border-neutral-200 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="font-mono text-xs text-neutral-400">
        {number}
      </div>

      <h3 className="mt-5 font-sans font-bold text-lg text-[var(--ink)]">
        {title}
      </h3>

      <p className="mt-3 font-sans text-sm leading-6 text-[var(--mute)]">
        {text}
      </p>
    </div>
  );
}