import Link from "next/link";
import styles from "../docs.module.css";

export default function DocsNav() {
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/work/lochan-eda/docs" className={styles.brand}>
          <span className={styles.brandMark}>L</span>
          <span className={styles.brandText}>lochan-eda</span>
        </Link>

        <div className={styles.navRight}>
          <span className={styles.version}>documentation</span>
          <Link href="/work/lochan-eda">Project</Link>
          <a
            href="https://github.com/LochanJangid/lochan-eda"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </header>
  );
}
