import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";
import ApiMethod from "../components/ApiMethod";

export default function AutomatedEDA() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> User Guide <span>/</span> AutomatedEDA
      </div>

      <header className={styles.pageHeader}>
        <h1>AutomatedEDA</h1>
        <p>
          High-level interface for the complete preprocessing workflow.
        </p>
      </header>

      <section className={styles.docSection}>
        <h2>Class</h2>
        <CodeBlock>{`from lochan_eda import AutomatedEDA

eda = AutomatedEDA()`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Methods</h2>

        <ApiMethod
          id="prepare"
          name="prepare()"
          signature={`prepare( X: pd.DataFrame, target=None, exclude=None, split=True, test_size=0.2, random_state=42, stratify=None)`}
          description="Provides a high-level interface for the common tabular preprocessing workflow."
          usage={`X_train, X_test, y_train, y_test = eda.prepare(
    df,
    target="target",
    exclude=["id", "name"],
    split=True,
    test_size=0.2,
    random_state=42,
    stratify=df["target"]
)`}
        />

        <ApiMethod
          id="fit"
          name="fit()"
          signature="fit(X: pd.DataFrame, y: pd.Series=None)"
          description="Fits the preprocessing workflow using training data before it is reused for transformation."
          usage="eda.fit(X_train, y_train)"
        />

        <ApiMethod
          id="transform"
          name="transform()"
          signature="transform(X: pd.DataFrame, y: pd.Series=None)"
          description="Applies the fitted preprocessing workflow to data."
          usage={`X_train, y_train = eda.transform(X_train, y_train)
X_test, y_test = eda.transform(X_test, y_test)`}
        />
      </section>

      <section className={styles.docSection}>
        <h2>Train / test pattern</h2>
        <CodeBlock>{`eda.fit(X_train)

X_train = eda.transform(X_train)
X_test = eda.transform(X_test)`}</CodeBlock>
      </section>

      <div className={styles.pageNav}>
        <Link href="/work/lochan-eda/docs/profiler">← Profiler</Link>
        <Link href="/work/lochan-eda/docs/api">API Reference →</Link>
      </div>
    </article>
  );
}
