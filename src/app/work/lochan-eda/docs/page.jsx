import Link from "next/link";
import styles from "./docs.module.css";

const sections = [
  ["Getting Started", "/work/lochan-eda/docs/getting-started"],
  ["Automated Workflow", "/work/lochan-eda/docs/automated-eda"],
  ["Dataset Profiling", "/work/lochan-eda/docs/profiler"],
  ["Numerical Analysis", "/work/lochan-eda/docs/numerical"],
  ["Categorical Analysis", "/work/lochan-eda/docs/categorical"],
  ["Missing Values", "/work/lochan-eda/docs/missing"],
  ["Preprocessing Philosophy", "/work/lochan-eda/docs/preprocessing"],
  ["Train / Test Workflow", "/work/lochan-eda/docs/train-test"],
  ["Reports", "/work/lochan-eda/docs/reports"],
];

const api = [
  ["AutomatedEDA", "#automatededa"],
  ["Profiler", "#profiler"],
  ["Numerical", "#numerical"],
  ["Categorical", "#categorical"],
  ["Missing", "#missing"],
  ["Report", "#report"],
];

export default function DocsHome() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> Documentation
      </div>

      <header className={styles.pageHeader}>
        <h1>lochan-eda documentation</h1>
        <p>
          Exploratory data analysis and behaviour-driven preprocessing for
          tabular machine learning.
        </p>
      </header>

      <div className={styles.notice}>
        <strong>Documentation</strong>
        <span>
          This reference follows the package's public API and separates the
          high-level workflow from the component-level interfaces.
        </span>
      </div>

      <section className={styles.docSection}>
        <h2>User Guide</h2>
        <p className={styles.sectionIntro}>
          Learn the workflow before using the individual API components.
        </p>

        <div className={styles.linkTable}>
          {sections.map(([name, href]) => (
            <Link href={href} key={href}>
              <strong>{name}</strong>
              <span>Read documentation →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.docSection} id="api">
        <h2>API Reference</h2>
        <p className={styles.sectionIntro}>
          Public classes and their documented interfaces.
        </p>

        <div className={styles.apiGrid}>
          {api.map(([name, anchor]) => (
            <a href={`/work/lochan-eda/docs/api${anchor}`} key={name}>
              <code>{name}</code>
              <span>API reference →</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.docSection}>
        <h2>Design</h2>
        <p>
          lochan-eda separates two levels of use. <code>AutomatedEDA</code> is
          the high-level interface for the common preprocessing workflow.
          <code>Profiler</code>, <code>Numerical</code>, and{" "}
          <code>Categorical</code> expose explicit inspection and component
          control.
        </p>

        <pre className={styles.referenceCode}>
          <code>{`Dataset
   │
   ▼
Profiler
   │
   ├── Numerical
   │
   └── Categorical
   │
   ▼
Preprocessing workflow
   │
   ▼
Model-ready data`}</code>
        </pre>
      </section>

      <footer className={styles.referenceFooter}>
        <Link href="/work/lochan-eda">lochan-eda project</Link>
        <a
          href="https://github.com/LochanJangid/lochan-eda"
          target="_blank"
          rel="noreferrer"
        >
          Source repository ↗
        </a>
      </footer>
    </article>
  );
}
