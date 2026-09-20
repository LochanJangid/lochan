import "./style.css";

export default function LochanEDA() {
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

  return (
    <main className="case-study">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="section case-hero">
        <div className="container">

          <div className="case-kicker mono">
            03 / DEVELOPER TOOL · PYTHON PACKAGE
          </div>

          <div className="case-hero-grid">

            <div>

              <h1 className="case-title display">
                Lochan EDA
                <br />
                <span>Preprocessing that starts with the data.</span>
              </h1>

              <p className="case-lede">
                A reusable Python toolkit for understanding tabular data and
                turning its behaviour into practical preprocessing decisions
                before machine learning.
              </p>

              <div className="case-actions">

                <a
                  className="project-link"
                  href="https://pypi.org/project/lochan-eda/"
                  target="_blank"
                  rel="noreferrer"
                >
                  PyPI ↗
                </a>

                <a
                  className="project-link"
                  href="https://github.com/LochanJangid/lochan-eda"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
                <a
                  className="project-link"
                  href="/work/lochan-eda/docs"
                  target="_blank"
                  rel="noreferrer"
                >
                  Docs ↗
                </a>

              </div>

            </div>

            <aside className="case-hero-card">

              <div className="case-card-label mono">
                PACKAGE SNAPSHOT
              </div>

              <div className="case-version">
                v2
              </div>

              <div className="case-card-line">
                <span>LANGUAGE</span>
                <strong>Python</strong>
              </div>

              <div className="case-card-line">
                <span>FOCUS</span>
                <strong>Tabular EDA + preprocessing</strong>
              </div>

              <div className="case-card-line">
                <span>INTERFACE</span>
                <strong>Profiler / AutomatedEDA</strong>
              </div>

            </aside>

          </div>
        </div>
      </section>


      {/* =========================================================
          PROBLEM
      ========================================================= */}

      <section className="section case-section">

        <div className="container case-two-column">

          <div>

            <div className="kicker mono">
              THE PROBLEM
            </div>

            <h2 className="section-title display">
              Preprocessing is not just writing a pipeline.
            </h2>

          </div>

          <div className="case-copy">

            <p>
              A typical tabular ML workflow quickly becomes a collection of
              repeated decisions: inspect missing values, separate numerical
              and categorical features, investigate outliers, understand
              distributions, choose transformations, and finally construct a
              preprocessing pipeline.
            </p>

            <p>
              The code is repetitive. The difficult part is the reasoning
              behind the code.
            </p>

            <p>
              <strong>lochan-eda</strong> is built around a simple idea:
              preprocessing should respond to the behaviour of the dataset,
              not begin with a fixed list of transformers.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          CASE 01
      ========================================================= */}

      <section className="section case-section case-dark-panel">

        <div className="container">

          <div className="kicker mono">
            CASE 01 / MANUAL EDA
          </div>

          <h2 className="section-title display">
            Every dataset becomes another notebook.
          </h2>

          <div className="case-two-column">

            <div className="case-copy">

              <p>
                Without reusable tooling, the same investigation gets
                repeated for almost every dataset.
              </p>

              <p>
                First inspect missing values. Then identify numerical and
                categorical columns. Then investigate distributions, outliers,
                cardinality, rare categories, and finally decide what
                transformations make sense.
              </p>

              <p>
                The next dataset arrives and the process starts again.
              </p>

            </div>

            <div className="case-code-card">

              <div className="case-code-label mono">
                REPETITIVE EDA
              </div>

              <pre>
                <code>{`# inspect missing values
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
# repeat for another dataset...`}</code>
              </pre>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          CASE 02
      ========================================================= */}

      <section className="section case-section">

        <div className="container">

          <div className="kicker mono">
            CASE 02 / BLIND PIPELINE
          </div>

          <h2 className="section-title display">
            A pipeline can be reusable and still be thoughtless.
          </h2>

          <div className="case-two-column">

            <div className="case-code-card">

              <div className="case-code-label mono">
                GENERIC PREPROCESSING
              </div>

              <pre>
                <code>{`preprocessor = ColumnTransformer([
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
])`}</code>
              </pre>

            </div>

            <div className="case-copy">

              <p>
                This pipeline is perfectly valid. It is also easy to write
                without asking whether each transformation fits the data.
              </p>

              <div className="question-list">

                <div>
                  <span className="mono">?</span>
                  <strong>
                    Why median imputation?
                  </strong>
                </div>

                <div>
                  <span className="mono">?</span>
                  <strong>
                    Why standard scaling?
                  </strong>
                </div>

                <div>
                  <span className="mono">?</span>
                  <strong>
                    Why most-frequent categorical imputation?
                  </strong>
                </div>

                <div>
                  <span className="mono">?</span>
                  <strong>
                    Why this encoding strategy?
                  </strong>
                </div>

              </div>

              <p>
                Scikit-learn gives you excellent preprocessing building
                blocks. The developer still has to determine which blocks
                make sense for the dataset.
              </p>

            </div>

          </div>

        </div>

      </section>

<section className="section case-section">

  <div className="container">

    <div className="section-head">

      <div>
        <div className="kicker mono">
          RUN IT YOURSELF
        </div>

        <h2 className="section-title display">
          Don't just read the workflow. Run it.
        </h2>
      </div>

      <p className="section-note">
        A complete notebook is included so the workflow can be inspected,
        executed, and modified with a real dataset.
      </p>

    </div>


    <div className="case-notebook">

      <div className="case-notebook-copy">

        <div className="mono case-notebook-number">
          NOTEBOOK / 01
        </div>

        <h3 className="display">
          From DataFrame to model-ready data.
        </h3>

        <p>
          The accompanying notebook walks through the complete workflow:
          profiling the dataset, inspecting feature behaviour, preparing
          numerical and categorical features, and producing data ready for
          machine learning.
        </p>

        <div className="case-notebook-steps">

          <span>01 · Load data</span>
          <span>02 · Profile</span>
          <span>03 · Inspect behaviour</span>
          <span>04 · Prepare</span>
          <span>05 · Transform</span>
          <span>06 · Model</span>

        </div>

        <div className="case-actions">

          <a
            className="project-link"
            href="https://colab.research.google.com/drive/1Vr4LbymtbitsuOcFmpuYyRHkiD_lGe_X?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Open notebook ↗
          </a>
{/* 
          <a
            className="project-link"
            href="https://colab.research.google.com/drive/1Vr4LbymtbitsuOcFmpuYyRHkiD_lGe_X?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            View examples ↗
          </a> */}

        </div>

      </div>


      <div className="case-notebook-preview">

        <div className="notebook-bar">
          <span className="mono">
            lochan_eda_example.ipynb
          </span>

          <span className="mono">
            JUPYTER NOTEBOOK
          </span>
        </div>

        <div className="notebook-screen">

          <div className="notebook-cell">
            <span className="cell-number">
              In [1]:
            </span>

            <pre>
              <code>{`from lochan_eda import (
    Profiler,
    AutomatedEDA
)

profile = Profiler(df)
profile.report.save("report.pdf")`}</code>
            </pre>
          </div>


          <div className="notebook-cell">
            <span className="cell-number">
              In [2]:
            </span>

            <pre>
              <code>{`eda = AutomatedEDA()

X_train, X_test, y_train, y_test = eda.prepare(df, target="target", 
                          exclude=None, split=True, test_size=0.2, 
                          random_state=42, stratify=df["target"])
`}</code>
            </pre>
          </div>


          <div className="notebook-output">
            <span className="mono">
              OUTPUT
            </span>

            <p>
              Dataset inspected and transformed into
              model-ready training and testing data.
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>
      {/* =========================================================
          CASE 03
      ========================================================= */}

      <section className="section case-section case-dark-panel">

        <div className="container">

          <div className="kicker mono">
            CASE 03 / LOCHAN-EDA
          </div>

          <h2 className="section-title display">
            Let the data influence the preprocessing.
          </h2>

          <div className="case-two-column">

            <div>

              <p className="case-lead">
                Instead of starting with a fixed recipe, lochan-eda starts by
                understanding the dataset.
              </p>

            </div>

            <div className="case-copy">

              <p>
                Numerical and categorical features are analysed according to
                their behaviour. Missingness, distributions, categories,
                outliers, and feature characteristics can then inform the
                preprocessing workflow.
              </p>

              <p>
                The goal is not to hide preprocessing behind magic. It is to
                reduce repetitive investigation while keeping the reasoning
                visible and the workflow reusable.
              </p>

            </div>

          </div>


          <div className="case-flow">

            <div className="flow-node">
              <span className="mono">01</span>
              <strong>DataFrame</strong>
              <small>Raw tabular data</small>
            </div>

            <div className="flow-arrow">
              →
            </div>

            <div className="flow-node">
              <span className="mono">02</span>
              <strong>Behaviour</strong>
              <small>Understand the features</small>
            </div>

            <div className="flow-arrow">
              →
            </div>

            <div className="flow-node">
              <span className="mono">03</span>
              <strong>Decision</strong>
              <small>Choose preprocessing</small>
            </div>

            <div className="flow-arrow">
              →
            </div>

            <div className="flow-node">
              <span className="mono">04</span>
              <strong>Pipeline</strong>
              <small>Transform consistently</small>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          EXAMPLE
      ========================================================= */}

      <section className="section case-section">

        <div className="container">

          <div className="section-head">

            <div>

              <div className="kicker mono">
                THE WORKFLOW
              </div>

              <h2 className="section-title display">
                From behaviour to model-ready data.
              </h2>

            </div>

            <p className="section-note">
              The package separates inspection from reusable transformation.
            </p>

          </div>


          <div className="case-code-grid">

            <div className="case-code-card">

              <div className="case-code-label mono">
                01 / INSTALL
              </div>

              <pre>
                <code>{`pip install lochan-eda`}</code>
              </pre>

            </div>


            <div className="case-code-card">

              <div className="case-code-label mono">
                02 / INSPECT
              </div>

              <pre>
                <code>{`from lochan_eda import Profiler

profile = Profiler(df)

profile.overview()`}</code>
              </pre>

            </div>


            <div className="case-code-card">

              <div className="case-code-label mono">
                03 / PREPARE
              </div>

              <pre>
                <code>{`from lochan_eda import AutomatedEDA

eda = AutomatedEDA()

Xtr, Xte, ytr, yte = eda.prepare(
    df,
    target="target"
)`}</code>
              </pre>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          BEHAVIOUR
      ========================================================= */}

      <section className="section case-section">

        <div className="container">

          <div className="kicker mono">
            DATA BEHAVIOUR
          </div>

          <h2 className="section-title display">
            Different features can require different treatment.
          </h2>

          <div className="case-principles">

            <div>

              <span className="mono">
                01
              </span>

              <h3>
                Numerical
              </h3>

              <p>
                Missing values, scale, distributions, and outliers can affect
                how numerical features should be prepared.
              </p>

            </div>


            <div>

              <span className="mono">
                02
              </span>

              <h3>
                Categorical
              </h3>

              <p>
                Missing categories, cardinality, and rare values can influence
                how categorical features should be represented.
              </p>

            </div>


            <div>

              <span className="mono">
                03
              </span>

              <h3>
                Dataset-level
              </h3>

              <p>
                Understanding the dataset before transformation gives the
                preprocessing workflow context instead of blindly applying
                the same recipe everywhere.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FIT / TRANSFORM
      ========================================================= */}

      <section className="section case-section case-dark-panel">

        <div className="container case-two-column">

          <div>

            <div className="kicker mono">
              DESIGN DECISION
            </div>

            <h2 className="section-title display">
              Learn on train. Reuse on test.
            </h2>

          </div>


          <div className="case-copy">

            <p>
              The important part of <code>AutomatedEDA</code> is not simply
              applying preprocessing. The workflow separates
              <code>fit()</code> from <code>transform()</code>.
            </p>

            <p>
              This allows preprocessing decisions to be learned from the
              training data and then reused when transforming another dataset.
            </p>

            <div className="case-code-card">

              <div className="case-code-label mono">
                FIT → TRANSFORM
              </div>

              <pre>
                <code>{`eda.fit(X_train)

X_train = eda.transform(X_train)
X_test  = eda.transform(X_test)`}</code>
              </pre>

            </div>

            <p>
              <code>prepare()</code> wraps the common workflow when you want
              one entry point for target handling, train/test splitting,
              fitting, and transformation.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          API
      ========================================================= */}

      <section className="section case-section">

        <div className="container">

          <div className="kicker mono">
            API SURFACE
          </div>

          <h2 className="section-title display">
            Small public surface. Focused jobs.
          </h2>

          <div className="api-grid">

            {apiGroups.map((api) => (

              <article
                className="api-card"
                key={api.name}
              >

                <div className="api-card-top">

                  <span className="mono">
                    {api.number}
                  </span>

                  <span className="mono">
                    {api.label}
                  </span>

                </div>

                <h3 className="display">
                  {api.name}
                </h3>

                <p>
                  {api.description}
                </p>

                <div className="api-methods">

                  {api.methods.map((method) => (

                    <code key={method}>
                      {method}
                    </code>

                  ))}

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          WHY BUILT
      ========================================================= */}

      <section className="section case-section">

        <div className="container">

          <div className="kicker mono">
            WHY I BUILT IT
          </div>

          <h2 className="section-title display">
            From transformer-first to data-first preprocessing.
          </h2>

          <div className="case-principles">

            <div>

              <span className="mono">
                01
              </span>

              <h3>
                Inspect
              </h3>

              <p>
                Understand missing values, distributions, categories,
                outliers, and feature behaviour before choosing
                transformations.
              </p>

            </div>


            <div>

              <span className="mono">
                02
              </span>

              <h3>
                Decide
              </h3>

              <p>
                Use what the dataset reveals to guide preprocessing rather
                than blindly applying the same recipe to every dataset.
              </p>

            </div>


            <div>

              <span className="mono">
                03
              </span>

              <h3>
                Reuse
              </h3>

              <p>
                Turn those decisions into a consistent workflow that can be
                fitted on training data and reused on new data.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          CLOSING
      ========================================================= */}

      <section className="section case-footer">

        <div className="container">

          <div className="case-footer-inner">

            <div>

              <div className="kicker mono">
                LOCHAN-EDA
              </div>

              <h2 className="section-title display">
                Less repetitive EDA.
                <br />
                More deliberate preprocessing.
              </h2>

            </div>

            <a
              className="project-link"
              href="https://github.com/LochanJangid/lochan-eda"
              target="_blank"
              rel="noreferrer"
            >
              Inspect the source ↗
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}