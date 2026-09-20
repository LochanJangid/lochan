import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";
import ApiClass from "../components/ApiClass";

export default function ApiReference() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> API Reference
      </div>

      <header className={styles.pageHeader}>
        <h1>API Reference</h1>
        <p>
          Public classes, methods, and attributes documented by the current
          lochan-eda API.
        </p>
      </header>

      <div className={styles.apiContents}>
        <a href="#automatededa">AutomatedEDA</a>
        <a href="#profiler">Profiler</a>
        <a href="#numerical">Numerical</a>
        <a href="#categorical">Categorical</a>
        <a href="#missing">Missing</a>
        <a href="#report">Report</a>
      </div>

      <ApiClass
        id="automatededa"
        name="AutomatedEDA"
        description="High-level interface for the complete preprocessing workflow."
        importCode={`from lochan_eda import AutomatedEDA

eda = AutomatedEDA()`}
        methods={[
          ["prepare()", "High-level interface for the common tabular preprocessing workflow."],
          ["fit()", "Fit the preprocessing workflow using training data."],
          ["transform()", "Apply the fitted preprocessing workflow to data."],
        ]}
      />

      <ApiClass
        id="profiler"
        name="Profiler"
        description="Dataset-level analysis interface."
        importCode={`from lochan_eda import Profiler

profile = Profiler(df)`}
        methods={[
          ["overview()", "Dataset-level inspection."],
          ["numerical", "Access to the numerical analysis component."],
          ["categorical", "Access to the categorical analysis component."],
        ]}
      />

      <ApiClass
        id="numerical"
        name="Numerical"
        description="Numerical feature analysis and preprocessing."
        importCode={`from lochan_eda import Numerical

numerical = Numerical(df)`}
        methods={[
          ["fit()", "Learn data behaviour."],
          ["transform()", "Execute Learnt things."],
          ["summary()", "Statistical summaries."],
          ["plot()", "Visualization."],
        ]}
      />

      <ApiClass
        id="categorical"
        name="Categorical"
        description="Categorical feature analysis and preprocessing."
        importCode={`from lochan_eda import Categorical

categorical = Categorical(df)`}
        methods={[
          ["fit()", "Learn data behaviour."],
          ["transform()", "Execute Learnt things."],
          ["summary()", "Statistical summaries."],
          ["plot()", "Visualization."],
        ]}
      />

      <ApiClass
        id="missing"
        name="Missing"
        description="Missing-value visualization."
        methods={[["plot()", "Missing-value visualization."]]}
      />

      <ApiClass
        id="report"
        name="Report"
        description="Generate a shareable analysis report."
        methods={[["save()", "Save the analysis report."]]}
      />

      <section className={styles.docSection}>
        <h2>High-level API</h2>
        <p>
          Use <code>AutomatedEDA</code> when the goal is to move efficiently
          from a DataFrame to model-ready data.
        </p>
        <CodeBlock>{`eda = AutomatedEDA()

X_train, X_test, y_train, y_test = eda.prepare(
    df,
    target="target"
)`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Component-level API</h2>
        <p>
          Use <code>Profiler</code>, <code>Numerical</code>, and{" "}
          <code>Categorical</code> when explicit control or inspection is
          required.
        </p>
        <CodeBlock>{`profile = Profiler(df)

profile.overview()

profile.numerical
profile.categorical`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Package structure</h2>
        <CodeBlock>{`lochan_eda/
│
├── automated_eda/
├── profiler/
├── numerical/
├── categorical/
├── missing/
└── report/`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Dependencies</h2>
        <div className={styles.dependencyList}>
          <span>pandas</span>
          <span>NumPy</span>
          <span>scikit-learn</span>
          <span>matplotlib</span>
          <span>reportlab</span>
        </div>
      </section>

      <section className={styles.docSection}>
        <h2>Contributing</h2>
        <p>
          Keep the public API consistent with the existing design. Add or
          update tests for behavioural changes. Keep preprocessing decisions
          explicit and reproducible. Avoid unnecessary dependencies. Document
          new public functionality.
        </p>
      </section>

      <div className={styles.pageNav}>
        <Link href="/work/lochan-eda/docs">← Documentation home</Link>
        <Link href="/work/lochan-eda/docs/getting-started">Getting started →</Link>
      </div>
    </article>
  );
}
