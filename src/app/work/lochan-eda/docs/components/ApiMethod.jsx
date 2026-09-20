import styles from "../docs.module.css";
import CodeBlock from "./CodeBlock";

export default function ApiMethod({
  id,
  name,
  description,
  signature,
  usage,
  children,
}) {
  return (
    <section className={styles.method} id={id}>
      <div className={styles.methodTitle}>
        <h3>{name}</h3>
      </div>

      {signature && (
        <CodeBlock>{signature}</CodeBlock>
      )}

      <p>{description}</p>

      {usage && (
        <>
          <h4>Example</h4>
          <CodeBlock>{usage}</CodeBlock>
        </>
      )}

      {children}
    </section>
  );
}
