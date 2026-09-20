import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";
import ApiMethod from "../components/ApiMethod";

export default function Profiler() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> User Guide <span>/</span> Profiler
      </div>

      <header className={styles.pageHeader}>
        <h1>Profiler</h1>
        <p>
          Dataset-level analysis interface with access to numerical and
          categorical analysis components.
        </p>
      </header>

      <section className={styles.docSection}>
        <h2>Class</h2>
        <CodeBlock>{`from lochan_eda import Profiler

profile = Profiler(df, target=None)`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Methods and attributes</h2>

        <ApiMethod
          id="overview"
          name="overview()"
          signature="overview()"
          description="Provides dataset-level inspection."
          usage="profile.overview()"
        />

        <div className={styles.attribute}>
          <h3>numerical</h3>
          <p>Access the numerical analysis component.</p>
          <CodeBlock>profile.numerical</CodeBlock>
          <CodeBlock>profile.numerical.summary()</CodeBlock>
          <CodeBlock>profile.numerical.plot()</CodeBlock>
        </div>

        <div className={styles.attribute}>
          <h3>categorical</h3>
          <p>Access the categorical analysis component.</p>
          <CodeBlock>profile.categorical</CodeBlock>
          <CodeBlock>profile.categorical.summary()</CodeBlock>
          <CodeBlock>profile.categorical.plot()</CodeBlock>
        </div>
        <div className={styles.attribute}>
          <h3>Report</h3>
          <p>A Data Exploratory Report PDF.</p>
          <CodeBlock>profile.report</CodeBlock>
          <CodeBlock>profile.report.save("report.pdf")</CodeBlock>
        </div>
      </section>

      <div className={styles.pageNav}>
        <Link href="/work/lochan-eda/docs/automated-eda">← AutomatedEDA</Link>
        <Link href="/work/lochan-eda/docs/numerical">Numerical →</Link>
      </div>
    </article>
  );
}
