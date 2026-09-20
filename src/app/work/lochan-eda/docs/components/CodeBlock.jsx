import styles from "../docs.module.css";

export default function CodeBlock({ children }) {
  return (
    <pre className={styles.codeBlock}>
      <code>{children}</code>
    </pre>
  );
}
