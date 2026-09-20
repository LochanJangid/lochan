import Link from "next/link";
import styles from "../docs.module.css";

const groups = [
  {
    title: "GETTING STARTED",
    items: [
      ["Introduction", "/work/lochan-eda/docs"],
      ["Installation", "/work/lochan-eda/docs/getting-started"],
    ],
  },
  {
    title: "USER GUIDE",
    items: [
      ["Automated workflow", "/work/lochan-eda/docs/automated-eda"],
      ["Dataset profiling", "/work/lochan-eda/docs/profiler"],
      ["Numerical analysis", "/work/lochan-eda/docs/numerical"],
      ["Categorical analysis", "/work/lochan-eda/docs/categorical"],
      ["Missing values", "/work/lochan-eda/docs/missing"],
      ["Preprocessing philosophy", "/work/lochan-eda/docs/preprocessing"],
      ["Train / test workflow", "/work/lochan-eda/docs/train-test"],
      ["Reports", "/work/lochan-eda/docs/reports"],
    ],
  },
  {
    title: "API REFERENCE",
    items: [
      ["AutomatedEDA", "/work/lochan-eda/docs/api#automatededa"],
      ["Profiler", "/work/lochan-eda/docs/api#profiler"],
      ["Numerical", "/work/lochan-eda/docs/api#numerical"],
      ["Categorical", "/work/lochan-eda/docs/api#categorical"],
      ["Missing", "/work/lochan-eda/docs/api#missing"],
      ["Report", "/work/lochan-eda/docs/api#report"],
    ],
  },
];

export default function DocsSidebar() {
  return (
    <aside className={styles.sidebar}>
      <details className={styles.mobileMenu}>
        <summary>Contents</summary>
        <SidebarGroups />
      </details>

      <div className={styles.desktopMenu}>
        <SidebarGroups />
      </div>
    </aside>
  );
}

function SidebarGroups() {
  return (
    <>
      {groups.map((group) => (
        <section className={styles.sidebarGroup} key={group.title}>
          <h2>{group.title}</h2>
          {group.items.map(([name, href]) => (
            <Link href={href} key={href}>
              {name}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
}
