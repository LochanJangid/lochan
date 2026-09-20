import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";
import ApiMethod from "../components/ApiMethod";

const methods = [
  ["fit", "Learn the data behaviour."],
  ["transform", "Execute the Learnt things."],
  ["summary", "Statistical summaries."],
  ["plot", "Visualization."],
];

export default function Numerical() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> User Guide <span>/</span> Numerical
      </div>

      <header className={styles.pageHeader}>
        <h1>Categorical</h1>
        <p>Categorical feature analysis and preprocessing.</p>
      </header>

      <section className={styles.docSection}>
        <h2>Class</h2>
        <CodeBlock>{`from lochan_eda import Categorical

categorical = Categorical()
categoricalProfile = Categorical(profiler_df=df)`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Methods</h2>
        <div className={styles.compactIndex}>
          {methods.map(([name, text]) => (
            <a href={`#${name}`} key={name}>
              <code>{name}()</code>
              <span>{text}</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.docSection}>
        <ApiMethod
          id="fit"
          name="fit()"
          signature="fit(data, exclude=None)"
          description="learn data behaviour and return None."
          usage="categorical.fit(df, exclude=None)"
        />

        <ApiMethod
          id="transform"
          name="transform()"
          signature="transform(data, exclude=None)"
          description="Execute learnt things and return preprocessed df."
          usage="categorical.transform(df, exclude=None)"
        />

        <ApiMethod
          id="summary"
          name="summary()"
          signature="summary()"
          description="Return Categorical statistical summary."
          usage="categoricalProfile.summary()"
        />

        <ApiMethod
          id="plot"
          name="plot()"
          signature="plot()"
          description="Return Categorical visualization and download its image in your local environment."
          usage="categoricalProfile.plot()"
        />
      </section>

      <div className={styles.pageNav}>
        <Link href="/work/lochan-eda/docs/profiler">← Profiler</Link>
        <Link href="/work/lochan-eda/docs/categorical">Categorical →</Link>
      </div>
    </article>
  );
}
