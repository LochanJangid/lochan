import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";

export default function GettingStarted() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> Getting Started
      </div>

      <header className={styles.pageHeader}>
        <h1>Getting Started</h1>
        <p>
          Installation and the two public ways to enter the lochan-eda
          workflow.
        </p>
      </header>

      <section className={styles.docSection}>
        <h2>Installation</h2>
        <CodeBlock>{`pip install lochan-eda`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Automated workflow</h2>
        <p>
          <code>AutomatedEDA</code> provides the high-level interface for the
          common tabular preprocessing workflow.
        </p>

        <CodeBlock>{`import pandas as pd
from lochan_eda import AutomatedEDA

df = pd.read_csv("data.csv")

eda = AutomatedEDA()

X_train, X_test, y_train, y_test = eda.prepare(
    df,
    target="target"
)`}</CodeBlock>

        <Link className={styles.inlineLink} href="/work/lochan-eda/docs/automated-eda">
          See AutomatedEDA →
        </Link>
      </section>

      <section className={styles.docSection}>
        <h2>Component-level analysis</h2>
        <p>
          Use <code>Profiler</code> when you want explicit dataset inspection.
        </p>

        <CodeBlock>{`from lochan_eda import Profiler

profile = Profiler(df)

profile.overview()

profile.numerical
profile.categorical`}</CodeBlock>
      </section>

      <Callout label="PRINCIPLE">
        Understand the behaviour of the data before choosing how to
        preprocess it.
      </Callout>
    </article>
  );
}
