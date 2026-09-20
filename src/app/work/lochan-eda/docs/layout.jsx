import DocsNav from "./components/DocsNav";
import DocsSidebar from "./components/DocsSidebar";
import styles from "./docs.module.css";

export default function DocsLayout({ children }) {
  return (
    <div className={styles.docsRoot}>
      <DocsNav />
      <div className={styles.layout}>
        <DocsSidebar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
