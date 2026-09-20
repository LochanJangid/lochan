import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";

export default function TrainTest() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> User Guide <span>/</span> Train / Test
      </div>

      <header className={styles.pageHeader}>
        <h1>Train / Test Workflow</h1>
        <p>
          Fit preprocessing on training data and reuse it when transforming
          other data.
        </p>
      </header>

      <section className={styles.docSection}>
        <h2>Fit</h2>
        <CodeBlock>eda.fit(X_train)</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Transform</h2>
        <CodeBlock>{`X_train = eda.transform(X_train)
X_test = eda.transform(X_test)`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Common entry point</h2>
        <p>
          For the common workflow, <code>prepare()</code> provides a single
          entry point.
        </p>
        <CodeBlock>{`X_train, X_test, y_train, y_test = eda.prepare(
    df,
    target="target"
)`}</CodeBlock>
      </section>

      <div className={styles.pageNav}>
        <Link href="/work/lochan-eda/docs/preprocessing">← Preprocessing</Link>
        <Link href="/work/lochan-eda/docs/reports">Reports →</Link>
      </div>
    </article>
  );
}
