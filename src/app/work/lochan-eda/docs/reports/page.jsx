import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";
import ApiMethod from "../components/ApiMethod";

export default function Reports() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> User Guide <span>/</span> Reports
      </div>

      <header className={styles.pageHeader}>
        <h1>Reports</h1>
        <p>Generate a shareable analysis report from the reporting interface.</p>
      </header>
      <section className={styles.docSection}>
        <h2>Class</h2>
        <CodeBlock>{`from lochan_eda import Profiler, Report

profile = Profiler(df)
report = Report(profile)`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <ApiMethod
          id="save"
          name="save()"
          signature="save(filepath='report.pdf')"
          description="Generates and saves the analysis report."
          usage="report.save()"
        />
      </section>

      <section className={styles.docSection}>
        <h2>Role in the workflow</h2>
        <p>
          Reporting sits after analysis. The analysis components expose
          information about the dataset, while the report layer presents those
          results as a shareable artifact.
        </p>
      </section>

      <div className={styles.pageNav}>
        <Link href="/work/lochan-eda/docs/train-test">← Train / test</Link>
        <Link href="/work/lochan-eda/docs/api#report">Report API →</Link>
      </div>
    </article>
  );
}
