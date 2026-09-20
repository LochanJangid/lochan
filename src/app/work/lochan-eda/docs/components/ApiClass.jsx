import styles from "../docs.module.css";
import CodeBlock from "./CodeBlock";

export default function ApiClass({
  id,
  name,
  description,
  importCode,
  methods,
}) {
  return (
    <section className={styles.apiClass} id={id}>
      <div className={styles.apiClassHeader}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>

      {importCode && <CodeBlock>{importCode}</CodeBlock>}

      <div className={styles.methodTable}>
        <div className={styles.methodTableHead}>
          <span>Method / attribute</span>
          <span>Description</span>
        </div>

        {methods.map(([method, description]) => (
          <div className={styles.methodRow} key={method}>
            <code>{method}</code>
            <span>{description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
