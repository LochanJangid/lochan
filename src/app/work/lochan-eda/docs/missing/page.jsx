import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";
import ApiMethod from "../components/ApiMethod";

export default function Missing() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> User Guide <span>/</span> Missing
      </div>

      <header className={styles.pageHeader}>
        <h1>Missing</h1>
        <p>Missing-value visualization and inspection.</p>
      </header>
      <section className={styles.docSection}>
        <h2>Class</h2>
        <CodeBlock>{`from lochan_eda import Missing

missing = Missing(profiler_df=df)`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Interface</h2>
        <ApiMethod
          id="plot"
          name="plot()"
          signature="plot()"
          description="Visualizes missing-value patterns."
          usage="missing.plot()"
        />
      </section>

      <section className={styles.docSection}>
        <h2>Role in the workflow</h2>
        <p>
          Missing-value analysis is available independently so missingness can
          be inspected before deciding how it should be handled.
        </p>
      </section>

      <div className={styles.pageNav}>
        <Link href="/work/lochan-eda/docs/categorical">← Categorical</Link>
        <Link href="/work/lochan-eda/docs/preprocessing">Preprocessing →</Link>
      </div>
    </article>
  );
}
