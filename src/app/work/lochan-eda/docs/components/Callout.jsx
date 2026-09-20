import styles from "../docs.module.css";

export default function Callout({ label = "Note", children }) {
  return (
    <div className={styles.callout}>
      <strong>{label}</strong>
      <div>{children}</div>
    </div>
  );
}
