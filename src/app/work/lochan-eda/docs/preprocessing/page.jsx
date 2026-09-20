import Link from "next/link";
import styles from "../docs.module.css";
import CodeBlock from "../components/CodeBlock";

export default function Preprocessing() {
  return (
    <article className={styles.referencePage}>
      <div className={styles.breadcrumb}>
        lochan-eda <span>/</span> User Guide <span>/</span> Preprocessing
      </div>

      <header className={styles.pageHeader}>
        <h1>Preprocessing Philosophy</h1>
        <p>
          The package adds a behaviour-analysis layer before preprocessing
          decisions are applied.
        </p>
      </header>

      <section className={styles.docSection}>
        <h2>scikit-learn preprocessing</h2>
        <p>
          A scikit-learn preprocessing pipeline is a valid and useful approach.
          The problem is deciding whether the selected transformations are
          appropriate for the dataset.
        </p>

        <CodeBlock>{`from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

preprocessor = ColumnTransformer([
    (
        "numeric",
        Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler())
        ]),
        numeric_columns
    ),
    (
        "categorical",
        Pipeline([
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(
                handle_unknown="ignore"
            ))
        ]),
        categorical_columns
    )
])`}</CodeBlock>
      </section>

      <section className={styles.docSection}>
        <h2>Behaviour before transformation</h2>
        <pre className={styles.referenceCode}>
          <code>{`Dataset
   │
   ▼
Profile
   │
   ├──────────────┐
   ▼              ▼
Numerical    Categorical
behaviour      behaviour
   │              │
   └───────┬──────┘
           ▼
    Preprocessing
       workflow
           │
           ▼
     Model-ready data`}</code>
        </pre>
      </section>

      <section className={styles.docSection}>
        <h2>Complementary design</h2>
        <p>
          lochan-eda complements preprocessing libraries rather than attempting
          to replace them.
        </p>
      </section>

      <div className={styles.pageNav}>
        <Link href="/work/lochan-eda/docs/missing">← Missing</Link>
        <Link href="/work/lochan-eda/docs/train-test">Train / test →</Link>
      </div>
    </article>
  );
}
