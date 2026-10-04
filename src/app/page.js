"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import SpiderExperience from "./Spidey/SpiderExperience";

const projects = [
  {
    number: "01",
    title: "See-House",
    subtitle: "CALIFORNIA / REGRESSION",
    description:
      "California housing price prediction using a Random Forest Regressor.",
    system: "Dataset → preprocessing → model → FastAPI → interface",
    status: "DEPLOYED",
    links: [
      ["Demo", "/work/see-house#demo"],
      ["Case study", "/work/see-house"],
      ["Source", "https://github.com/LochanJangid/See-House"],
    ],
  },
  {
    number: "02",
    title: "Handwritten Digit Recognition",
    subtitle: "MNIST / DEEP LEARNING",
    description:
      "Handwritten digit classification using a neural network built with PyTorch.",
    system: "Canvas → preprocessing → PyTorch → API → prediction",
    status: "DEPLOYED",
    links: [
      ["Demo", "/work/mnist#demo"],
      ["Case study", "/work/mnist"],
      ["Source", "https://github.com/LochanJangid/MNIST"],
    ],
  },
  {
    number: "03",
    title: "Automated EDA Toolkit",
    subtitle: "PYTHON / DATA ANALYSIS",
    description:
      "A Python package for automated exploratory data analysis and preprocessing workflows.",
    system: "Inspect → decide → preprocess → transform → report",
    status: "OPEN SOURCE",
    links: [
      ["PyPI", "https://pypi.org/project/lochan-eda/"],
      ["Docs", "/work/lochan-eda/docs"],
      ["Case study", "/work/lochan-eda"],
      ["Source", "https://github.com/LochanJangid/lochan-eda"],
    ],
  },
  {
    number: "04",
    title: "Bank Marketing",
    subtitle: "BANKING / CLASSIFICATION",
    description:
      "An end-to-end machine learning system for predicting term deposit subscriptions.",
    system: "Validate → engineer → transform → XGBoost → API",
    status: "DEPLOYED",
    links: [
      ["Demo", "https://bank-marketing-alpha.vercel.app/"],
      ["Case study", "/work/bank-marketing"],
      ["Source", "https://github.com/LochanJangid/bank-marketing"],
    ],
  },
  {
    number: "05",
    title: "Medical AI",
    subtitle: "HEALTHCARE / CONVERSATIONAL AI",
    description:
      "An end-to-end conversational AI system for providing health information and support.",
    system: "Validate → engineer → transform → LLM → API",
    status: "DEPLOYED",
    links: [
      ["Demo", "https://medical-ai-gules.vercel.app/"],
      ["Case study", "/work/medical-ai"],
      ["Source", "https://github.com/LochanJangid/MedicalAI"],
    ],
  },
];

const documentationPages = [
  ["Documentation home", "/work/lochan-eda/docs"],
  ["Getting started", "/work/lochan-eda/docs/getting-started"],
  ["Automated workflow", "/work/lochan-eda/docs/automated-eda"],
  ["Dataset profiling", "/work/lochan-eda/docs/profiler"],
  ["Numerical analysis", "/work/lochan-eda/docs/numerical"],
  ["Categorical analysis", "/work/lochan-eda/docs/categorical"],
  ["Missing values", "/work/lochan-eda/docs/missing"],
  ["Preprocessing", "/work/lochan-eda/docs/preprocessing"],
  ["Train / test workflow", "/work/lochan-eda/docs/train-test"],
  ["Reports", "/work/lochan-eda/docs/reports"],
  ["API reference", "/work/lochan-eda/docs/api"],
];

const spiderBackground =
  "https://wallpapercat.com/w/full/a/8/7/5815535-3840x2160-desktop-hd-4k-wallpaper-image.jpg";

const profileImage =
  "https://github.com/LochanJangid.png";


/* =========================================================
   PROFILE → FULLSCREEN SPIDER-MAN TRANSITION
   ========================================================= */

function SpideyTransition({ rect, spideyMode }) {
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (!spideyMode) return undefined;

    let firstFrame;
    let secondFrame;
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const portrait = document.getElementById("personal-profile-frame");
        if (!portrait) return;

        const bounds = portrait.getBoundingClientRect();
        setDestination({
          left: bounds.left,
          top: bounds.top,
          width: bounds.width,
          height: bounds.height,
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [spideyMode]);

  const imageRect = destination || rect;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        className="absolute inset-0 bg-[#f7f3ed] transition-opacity duration-700 ease-out"
        style={{ opacity: destination ? 0 : 1 }}
      />
      <div
        className="absolute rounded-full border border-[#ed7654]/70"
        style={{
          left: rect.left + rect.width / 2,
          top: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
          transform: `translate(-50%, -50%) scale(${destination ? 26 : 1})`,
          opacity: destination ? 0 : 0.9,
          boxShadow: "0 0 32px rgba(237,118,84,.24)",
          transition:
            "transform 950ms cubic-bezier(0.2, 0.75, 0.2, 1), opacity 750ms ease-out",
        }}
      />
      <img
        src={profileImage}
        alt=""
        className="absolute border-[8px] border-[#fff9f1] object-cover sm:border-[12px]"
        style={{
          left: imageRect.left,
          top: imageRect.top,
          width: imageRect.width,
          height: imageRect.height,
          objectPosition: "center",
          borderRadius: destination
            ? "46% 54% 48% 52% / 48% 43% 57% 52%"
            : "9999px",
          boxShadow: "0 24px 70px rgba(88,55,38,.2)",
          transition:
            "left 950ms cubic-bezier(0.2, 0.75, 0.2, 1), top 950ms cubic-bezier(0.2, 0.75, 0.2, 1), width 950ms cubic-bezier(0.2, 0.75, 0.2, 1), height 950ms cubic-bezier(0.2, 0.75, 0.2, 1), border-radius 700ms ease-out",
        }}
      />
    </div>
  );
}

/* =========================================================
   PROJECT LINKS
   ========================================================= */

function ProjectLinks({ links, spideyMode }) {
  return (
    <div
      className={`flex flex-wrap gap-x-4 gap-y-2 text-[13px] ${
        spideyMode
          ? "font-mono text-neutral-300"
          : "text-[#706b66]"
      }`}
    >
      {links.map(([label, href]) => {
        const external =
          href.startsWith("http");

        return (
          <a
            key={label}
            href={href}
            target={
              external
                ? "_blank"
                : undefined
            }
            rel={
              external
                ? "noreferrer"
                : undefined
            }
            className={
              spideyMode
                ? "text-red-300 underline decoration-red-700 underline-offset-4 transition hover:text-white"
                : "underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900"
            }
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}

/* =========================================================
   WEB PATTERN
   ========================================================= */

function WebPattern({ active }) {
  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-[0.055]">
      <div className="absolute left-1/2 top-1/2 h-[160vmax] w-px -translate-x-1/2 -translate-y-1/2 bg-white" />

      <div className="absolute left-1/2 top-1/2 h-[160vmax] w-px -translate-x-1/2 -translate-y-1/2 rotate-[30deg] bg-white" />

      <div className="absolute left-1/2 top-1/2 h-[160vmax] w-px -translate-x-1/2 -translate-y-1/2 rotate-[60deg] bg-white" />

      <div className="absolute left-1/2 top-1/2 h-[160vmax] w-px -translate-x-1/2 -translate-y-1/2 rotate-[90deg] bg-white" />

      <div className="absolute left-1/2 top-1/2 h-[160vmax] w-px -translate-x-1/2 -translate-y-1/2 rotate-[120deg] bg-white" />

      <div className="absolute left-1/2 top-1/2 h-[160vmax] w-px -translate-x-1/2 -translate-y-1/2 rotate-[150deg] bg-white" />

      <div className="absolute left-1/2 top-1/2 h-[25vmax] w-[25vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" />

      <div className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" />

      <div className="absolute left-1/2 top-1/2 h-[90vmax] w-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" />
    </div>
  );
}

/* =========================================================
   INITIAL PAGE
   ========================================================= */

function InitialPage() {
  return (
    <main className="min-h-screen bg-white text-[#292725]">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[930px] py-12 sm:w-[calc(100%-3rem)] sm:py-20">
        <h1 className="font-serif text-[32px] font-bold">
          Portfolio
        </h1>

        <p className="mt-6 max-w-[600px] font-serif text-[18px] leading-[1.65] text-[#706b66]">
          I&apos;m a{" "}
          <strong className="text-[#292725]">
            machine learning engineer
          </strong>{" "}
          building practical machine learning and AI systems.
        </p>
      </div>
    </main>
  );
}

/* =========================================================
   HOME
   ========================================================= */

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const portfolioRef = useRef(null);

  const [spideyMode, setSpideyMode] =
    useState(false);

  const [spideyTransition, setSpideyTransition] =
    useState(false);

  const [transitionRect, setTransitionRect] =
    useState({
      left: 0,
      top: 0,
      width: 88,
      height: 88,
    });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!spideyTransition) {
      return undefined;
    }

    const modeTimer =
      window.setTimeout(() => {
        setSpideyMode(true);
      }, 120);

    const cleanupTimer =
      window.setTimeout(() => {
        setSpideyTransition(false);
      }, 1450);

    return () => {
      window.clearTimeout(modeTimer);
      window.clearTimeout(cleanupTimer);
    };
  }, [spideyTransition]);

  useEffect(() => {
    const updateScrollDepth = () => {
      const portfolio = portfolioRef.current;

      if (!portfolio) return;

      const offset = Math.sin(window.scrollY * 0.002) * 5;
      portfolio.style.setProperty("--portfolio-left-scroll", `${offset}px`);
      portfolio.style.setProperty("--portfolio-right-scroll", `${-offset}px`);
    };

    window.addEventListener("scroll", updateScrollDepth, { passive: true });
    updateScrollDepth();

    return () => {
      window.removeEventListener("scroll", updateScrollDepth);
    };
  }, []);

  function handlePortfolioPointerMove(event) {
    const portfolio = portfolioRef.current;

    if (
      !portfolio ||
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    const pointerY = (event.clientY / window.innerHeight - 0.5) * 2;

    portfolio.style.setProperty("--portfolio-tilt-x", `${-pointerY * 1.1}deg`);
    portfolio.style.setProperty("--portfolio-tilt-y", `${pointerX * 1.4}deg`);
    portfolio.style.setProperty("--portfolio-pointer-x", `${pointerX * -4}px`);
    portfolio.style.setProperty("--portfolio-pointer-y", `${pointerY * -4}px`);
    portfolio.style.setProperty("--portfolio-left-x", `${pointerX * -3}px`);
    portfolio.style.setProperty("--portfolio-left-y", `${pointerY * -2}px`);
    portfolio.style.setProperty("--portfolio-right-x", `${pointerX * 4}px`);
    portfolio.style.setProperty("--portfolio-right-y", `${pointerY * 3}px`);
    portfolio.style.setProperty(
      "--portfolio-light-x",
      `${(event.clientX / window.innerWidth) * 100}%`,
    );
    portfolio.style.setProperty(
      "--portfolio-light-y",
      `${(event.clientY / window.innerHeight) * 100}%`,
    );
  }

  function resetPortfolioPointer() {
    const portfolio = portfolioRef.current;
    if (!portfolio) return;

    portfolio.style.setProperty("--portfolio-tilt-x", "0deg");
    portfolio.style.setProperty("--portfolio-tilt-y", "0deg");
    portfolio.style.setProperty("--portfolio-pointer-x", "0px");
    portfolio.style.setProperty("--portfolio-pointer-y", "0px");
    portfolio.style.setProperty("--portfolio-left-x", "0px");
    portfolio.style.setProperty("--portfolio-left-y", "0px");
    portfolio.style.setProperty("--portfolio-right-x", "0px");
    portfolio.style.setProperty("--portfolio-right-y", "0px");
    portfolio.style.setProperty("--portfolio-light-x", "50%");
    portfolio.style.setProperty("--portfolio-light-y", "35%");
  }

  if (!mounted) {
    return <InitialPage />;
  }

  if (spideyMode) {
    return (
      <>
        <SpiderExperience
          projects={projects}
          onExit={() => {
            setSpideyMode(false);
            setSpideyTransition(false);
          }}
        />
        {spideyTransition && (
          <SpideyTransition
            rect={transitionRect}
            spideyMode={spideyMode}
          />
        )}
      </>
    );
  }

  return (
    <>
      <main
        ref={portfolioRef}
        onPointerMove={handlePortfolioPointerMove}
        onPointerLeave={resetPortfolioPointer}
        className={`relative min-h-screen overflow-hidden transition-colors duration-1000 ${
          spideyMode
            ? "bg-[#020202] text-white"
            : "bg-white text-[#292725]"
        }`}
      >
      {/* =========================================================
          SPIDER-MAN BACKGROUND
         ========================================================= */}

      <div
        className={`pointer-events-none fixed inset-0 z-0 transition-all duration-1000 ${
          spideyMode
            ? "scale-100 opacity-100"
            : "scale-105 opacity-0"
        }`}
      >
        <img
          src={spiderBackground}
          alt=""
          className="h-full w-full object-cover object-[52%_38%]"
        />

        <div className="absolute inset-0 bg-black/72" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(220,20,35,0.34),transparent_34%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_70%,rgba(30,70,170,0.22),transparent_35%)]" />

        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/50 to-transparent"         />
      </div>

      {/* Cinematic transition */}

      {/* Web */}

      <WebPattern active={spideyMode} />

      {/* =========================================================
          SPIDER MODE STATUS
         ========================================================= */}

      <div
        className={`fixed right-5 top-5 z-50 transition-all duration-700 ${
          spideyMode
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0"
        }`}
      >
        <div className="border border-red-500/40 bg-black/80 px-4 py-2.5 font-mono text-[9px] tracking-[0.22em] text-red-400 shadow-2xl backdrop-blur-xl">
          JAIPUR / INDIA

          <span className="mx-2 text-neutral-700">
            /
          </span>

          ARCHIVE ACTIVE
        </div>
      </div>

      {/* =========================================================
          MAIN CONTENT
         ========================================================= */}

      <div
        className="relative z-10 mx-auto w-[calc(100%-2rem)] max-w-[1000px] py-12 sm:w-[calc(100%-4rem)] sm:py-20"
        style={{
          transform:
            "perspective(1600px) rotateX(var(--portfolio-tilt-x, 0deg)) rotateY(var(--portfolio-tilt-y, 0deg))",
          transformStyle: "preserve-3d",
          transition: "transform 180ms cubic-bezier(0.2, 0.7, 0.3, 1)",
          willChange: "transform",
        }}
      >

        {/* =======================================================
            SPIDER ARCHIVE HEADER
           ======================================================= */}

        {spideyMode && (
          <header className="mb-20 border-b border-white/10 pb-7">
            <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="font-mono text-[9px] tracking-[0.35em] text-red-500">
                  PARKER ARCHIVE / JAIPUR
                </p>

                <h1 className="mt-4 max-w-[720px] font-serif text-4xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl">
                  The work behind
                  <br />
                  <span className="text-red-500">
                    the mask.
                  </span>
                </h1>

                <p className="mt-6 max-w-[650px] font-serif text-[17px] leading-7 text-neutral-300">
                  One person. Two lives. Too many tabs open.
                  Building machine learning systems by day,
                  debugging production problems by night.
                </p>
              </div>

              <div className="border-l border-red-700/50 pl-5 font-mono text-[9px] leading-6 tracking-[0.12em] text-neutral-400">
                <div>
                  SUBJECT: LOCHAN JANGID
                </div>

                <div>
                  IDENTITY: ENGINEER
                </div>

                <div>
                  LOCATION: JAIPUR, INDIA
                </div>

                <div className="text-green-500">
                  STATUS: ACTIVE
                </div>
              </div>
            </div>
          </header>
        )}

        {/* =======================================================
            TWO-COLUMN CONTENT
           ======================================================= */}

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-[minmax(0,1.65fr)_minmax(240px,0.8fr)] sm:gap-16">

          {/* =====================================================
              LEFT COLUMN
             ===================================================== */}

          <div
            style={{
              transform:
                "translate3d(var(--portfolio-left-x, 0px), calc(var(--portfolio-left-y, 0px) + var(--portfolio-left-scroll, 0px)), 22px)",
              transformStyle: "preserve-3d",
              transition: "transform 220ms ease-out",
            }}
          >

            {/* =================================================
                NORMAL / SPIDER INTRO
               ================================================= */}

            {!spideyMode ? (
              <section>
                <h1 className="font-serif text-[32px] font-bold leading-tight tracking-tight">
                  Portfolio
                </h1>

                <p className="mt-6 max-w-[600px] font-serif text-[18px] leading-[1.65] text-[#706b66]">
                  I&apos;m a{" "}
                  <strong className="text-[#292725]">
                    machine learning engineer
                  </strong>{" "}
                  building practical machine learning and AI
                  systems.
                </p>

                <a
                  href="mailto:lochanjangid@gmail.com"
                  className="mt-5 inline-block rounded-md bg-[#292725] px-4 py-2.5 font-serif text-[15px] font-bold text-white transition-opacity hover:opacity-80"
                >
                  Let&apos;s talk
                </a>
              </section>
            ) : (
              <section className="border-l-2 border-red-600 pl-7 sm:pl-9">
                <p className="font-mono text-[9px] tracking-[0.3em] text-red-500">
                  IDENTITY FILE / PARKER PRINCIPLE
                </p>

                <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
                  A developer
                  <br />
                  with a{" "}
                  <span className="text-red-500">
                    responsibility.
                  </span>
                </h2>

                <p className="mt-7 max-w-[620px] font-serif text-[17px] leading-8 text-neutral-200">
                  I build machine learning systems that have
                  to leave the notebook eventually.
                </p>

                <p className="mt-5 max-w-[620px] font-serif text-[16px] leading-7 text-neutral-400">
                  Models are only the beginning. The real work
                  is understanding the problem, preparing the
                  data, making the system reliable, exposing it
                  through an API, deploying it, and making sure
                  someone can actually use it.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="border border-red-700/50 bg-red-950/40 px-3 py-2 font-mono text-[9px] tracking-wider text-red-300">
                    MACHINE LEARNING
                  </span>

                  <span className="border border-blue-700/50 bg-blue-950/40 px-3 py-2 font-mono text-[9px] tracking-wider text-blue-300">
                    PYTHON
                  </span>

                  <span className="border border-white/15 bg-white/[0.06] px-3 py-2 font-mono text-[9px] tracking-wider text-neutral-300">
                    PRODUCTION
                  </span>
                </div>

                <a
                  href="mailto:lochanjangid@gmail.com"
                  className="mt-8 inline-block border border-red-600 bg-red-700/90 px-5 py-3 font-mono text-[10px] font-bold tracking-[0.14em] text-white shadow-[0_0_35px_rgba(220,38,38,0.16)] transition hover:bg-red-600"
                >
                  ESTABLISH CONTACT
                </a>
              </section>
            )}

            {!spideyMode && (
              <section className="mt-10">
                <h2 className="mb-5 font-serif text-[26px] font-bold text-[#292725]">
                  Experience
                </h2>

                <article className="grid grid-cols-[44px_1fr] gap-4 border-t border-[#e8e5e1] py-5">
                  <a
                    href="https://www.linkedin.com/company/30204738/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="REGex Software Services on LinkedIn"
                    className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-[#e8e5e1] bg-white"
                  >
                    <img
                      src="https://media.licdn.com/dms/image/v2/C510BAQG-rlPs90C2EA/company-logo_100_100/company-logo_100_100/0/1630589399099?e=1792627200&v=beta&t=4v-beAQ9nIUC9_cHqD0B08Rr7rvPJu5wMHooXX41Sss"
                      alt="REGex Software Services logo"
                      className="h-full w-full object-contain"
                    />
                  </a>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <div>
                        <h3 className="font-serif text-[18px] font-bold leading-snug text-[#292725]">
                          AI/ML Intern
                        </h3>
                        <a
                          href="https://www.linkedin.com/company/30204738/"
                          target="_blank"
                          rel="noreferrer"
                          className="font-serif text-[15px] font-semibold text-[#514d49] underline decoration-[#c8c4be] underline-offset-2 transition hover:text-[#292725]"
                        >
                          REGex Software Services
                        </a>
                        <p className="mt-1 font-serif text-[14px] text-[#706b66]">
                          Full-time · On-site
                        </p>
                      </div>
                      <p className="font-mono text-[9px] leading-5 tracking-[0.06em] text-[#8b857e] sm:text-right">
                        DEC 2025 – PRESENT · 11 MOS
                      </p>
                    </div>

                    <p className="mt-2 font-serif text-[14px] text-[#706b66]">
                      Jaipur, Rajasthan, India
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-serif text-[13px] text-[#706b66]">
                      <span>Python (Programming Language)</span>
                      <span aria-hidden="true" className="text-[#c8c4be]">
                        ·
                      </span>
                      <span>C (Programming Language)</span>
                      <span aria-hidden="true" className="text-[#c8c4be]">
                        ·
                      </span>
                      <span>+1 skill</span>
                    </div>
                  </div>
                </article>
              </section>
            )}

            {/* =================================================
                WORK
               ================================================= */}

            <section className="mt-10">
              <div
                className={`mb-8 border-b pb-5 ${
                  spideyMode
                    ? "border-white/10"
                    : "border-transparent"
                }`}
              >
                {spideyMode && (
                  <p className="font-mono text-[9px] tracking-[0.3em] text-red-500">
                    FIELD REPORTS
                  </p>
                )}

                <div className="flex items-end justify-between">
                  <div>
                    <h2
                      className={`mt-1 font-serif text-[26px] font-bold ${
                        spideyMode
                          ? "text-white"
                          : "text-[#292725]"
                      }`}
                    >
                      Work
                    </h2>

                    {spideyMode && (
                      <p className="mt-2 max-w-[600px] font-serif text-sm leading-6 text-neutral-400">
                        Five systems. Five problems. One obsession:
                        make it work.
                      </p>
                    )}
                  </div>

                  {spideyMode && (
                    <span className="font-mono text-[9px] text-neutral-500">
                      05 RECORDS
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <article
                    key={project.title}
                    className={
                      spideyMode
                        ? "group relative border border-white/10 bg-black/55 p-6 backdrop-blur-xl transition-all duration-300 hover:border-red-600/60 hover:bg-red-950/20"
                        : "grid grid-cols-[12px_1fr] font-serif text-[16px] leading-[1.65]"
                    }
                  >
                    {spideyMode ? (
                      <>
                        <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-red-600/80" />

                        <div className="flex gap-5">
                          <div className="hidden pt-1 font-mono text-[10px] text-red-500 sm:block">
                            {project.number}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                              <a
                                href={
                                  project.links.find(
                                    ([label]) =>
                                      label === "Case study"
                                  )?.[1]
                                }
                                className="font-serif text-xl font-bold text-white transition hover:text-red-400"
                              >
                                {project.title}
                              </a>

                              <span className="font-mono text-[8px] tracking-[0.18em] text-neutral-400">
                                {project.subtitle}
                              </span>
                            </div>

                            <p className="mt-3 max-w-[650px] font-serif text-[15px] leading-7 text-neutral-300">
                              {project.description}
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
                              <div>
                                <p className="font-mono text-[8px] tracking-[0.18em] text-neutral-500">
                                  SYSTEM
                                </p>

                                <p className="mt-1 font-mono text-[10px] leading-5 text-neutral-300">
                                  {project.system}
                                </p>
                              </div>

                              <div>
                                <p className="font-mono text-[8px] tracking-[0.18em] text-neutral-500">
                                  STATUS
                                </p>

                                <p className="mt-1 font-mono text-[10px] text-red-300">
                                  {project.status}
                                </p>
                              </div>
                            </div>

                            <div className="mt-5">
                              <ProjectLinks
                                links={project.links}
                                spideyMode
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-[11px] text-[#c8c4be]">
                          ▪
                        </span>

                        <div>
                          <p>
                            <a
                              href={
                                project.links.find(
                                  ([label]) =>
                                    label === "Case study"
                                )?.[1]
                              }
                              className="font-bold underline decoration-neutral-400 underline-offset-2 hover:text-neutral-700"
                            >
                              {project.title}
                            </a>

                            :{" "}

                            <span className="text-[#514d49]">
                              {project.description}
                            </span>
                          </p>

                          <div className="mt-1">
                            <ProjectLinks
                              links={project.links}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* =================================================
                TRILOGY
               ================================================= */}

            {spideyMode && (
              <section className="mt-28">
                <div className="border-t border-white/10 pt-10">
                  <p className="font-mono text-[9px] tracking-[0.3em] text-red-500">
                    THE TRILOGY
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-bold text-white">
                    Three acts. One identity.
                  </h2>

                  <p className="mt-4 max-w-[650px] font-serif text-[16px] leading-7 text-neutral-300">
                    Learn the ability. Learn the responsibility.
                    Then learn how to control the power.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">

                  <article className="border border-red-900/50 bg-black/60 p-6 backdrop-blur-xl">
                    <p className="font-mono text-[9px] text-red-400">
                      ACT I / ORIGIN
                    </p>

                    <h3 className="mt-4 font-serif text-xl font-bold text-white">
                      DISCOVERY
                    </h3>

                    <p className="mt-4 font-serif text-sm leading-6 text-neutral-300">
                      Start with fundamentals. Understand the
                      tools before trying to make them impressive.
                    </p>

                    <p className="mt-6 font-mono text-[9px] tracking-wider text-neutral-500">
                      LEARN → BUILD → UNDERSTAND
                    </p>
                  </article>

                  <article className="border border-blue-900/50 bg-blue-950/20 p-6 backdrop-blur-xl">
                    <p className="font-mono text-[9px] text-blue-400">
                      ACT II / DUAL LIFE
                    </p>

                    <h3 className="mt-4 font-serif text-xl font-bold text-white">
                      ENGINEERING
                    </h3>

                    <p className="mt-4 font-serif text-sm leading-6 text-neutral-300">
                      Theory has to survive contact with real
                      software. Models need APIs, containers,
                      interfaces and deployment.
                    </p>

                    <p className="mt-6 font-mono text-[9px] tracking-wider text-neutral-500">
                      THEORY → SYSTEM → PRODUCTION
                    </p>
                  </article>

                  <article className="border border-white/15 bg-black/80 p-6 backdrop-blur-xl">
                    <p className="font-mono text-[9px] text-neutral-400">
                      ACT III / DARK SUIT
                    </p>

                    <h3 className="mt-4 font-serif text-xl font-bold text-white">
                      CONTROL
                    </h3>

                    <p className="mt-4 font-serif text-sm leading-6 text-neutral-300">
                      More tools, more power, more ways to build
                      something badly. Engineering means knowing
                      where the power should stop.
                    </p>

                    <p className="mt-6 font-mono text-[9px] tracking-wider text-neutral-500">
                      POWER → CONTROL → RESPONSIBILITY
                    </p>
                  </article>

                </div>
              </section>
            )}

            {/* =================================================
                DAILY BUGLE
               ================================================= */}

            {spideyMode && (
              <section className="mt-24 border border-black bg-[#e9e5da] p-6 text-black shadow-2xl sm:p-9">

                <div className="border-b-4 border-black pb-4">
                  <div className="flex items-end justify-between gap-4">

                    <h2 className="font-serif text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                      The Daily Bugle
                    </h2>

                    <span className="font-mono text-[8px]">
                      SPECIAL EDITION
                    </span>

                  </div>
                </div>

                <div className="mt-6 grid gap-7 sm:grid-cols-[1.5fr_1fr]">

                  <div>
                    <p className="font-mono text-[9px] font-bold tracking-[0.15em]">
                      JAIPUR / TECHNOLOGY / SCIENCE
                    </p>

                    <h3 className="mt-3 font-serif text-3xl font-black leading-[0.95] sm:text-4xl">
                      LOCAL DEVELOPER
                      <br />
                      ENTERS PRODUCTION
                    </h3>

                    <p className="mt-5 max-w-[600px] font-serif text-[15px] leading-7">
                      Reports indicate that a machine learning
                      engineer has been spotted moving models
                      out of notebooks and into APIs, containers
                      and deployed applications.
                    </p>
                  </div>

                  <div className="border-l border-black/20 pl-6">
                    <p className="font-mono text-[9px] font-bold">
                      BREAKING
                    </p>

                    <p className="mt-3 font-serif text-sm leading-6">
                      The developer reportedly uses Python,
                      PyTorch, Scikit-learn, FastAPI and Docker.
                    </p>

                    <p className="mt-5 font-serif text-sm font-bold">
                      More systems expected.
                    </p>
                  </div>

                </div>

                <div className="mt-7 border-t border-black/20 pt-3 font-mono text-[8px] tracking-[0.18em]">
                  JAIPUR EDITION / ENGINEERING DESK / 2026
                </div>

              </section>
            )}

            {/* =================================================
                EQUIPMENT
               ================================================= */}

            {spideyMode && (
              <section className="mt-24">

                <div className="border-t border-white/10 pt-10">

                  <p className="font-mono text-[9px] tracking-[0.3em] text-red-500">
                    EQUIPMENT ROOM
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-bold text-white">
                    The toolkit
                  </h2>

                  <p className="mt-4 max-w-[620px] font-serif text-[16px] leading-7 text-neutral-300">
                    Every hero has equipment. Mine happens to be
                    libraries, frameworks, terminals and a
                    suspicious number of Docker containers.
                  </p>

                </div>

                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">

                  {[
                    ["01", "PYTHON", "PRIMARY"],
                    ["02", "PYTORCH", "DEEP LEARNING"],
                    ["03", "SCIKIT-LEARN", "MACHINE LEARNING"],
                    ["04", "FASTAPI", "SERVICES"],
                    ["05", "DOCKER", "DEPLOYMENT"],
                    ["06", "NEXT.JS", "INTERFACES"],
                    ["07", "XGBOOST", "BOOSTING"],
                    ["08", "MLFLOW", "EXPERIMENTS"],
                  ].map(
                    ([number, name, type]) => (
                      <div
                        key={number}
                        className="bg-black/70 p-5 transition hover:bg-red-950/30"
                      >
                        <div className="font-mono text-[8px] text-red-500">
                          {number}
                        </div>

                        <div className="mt-4 font-mono text-[10px] text-white">
                          {name}
                        </div>

                        <div className="mt-1 font-mono text-[8px] text-neutral-400">
                          {type}
                        </div>
                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* =================================================
                FINAL ENTRY
               ================================================= */}

            {spideyMode && (
              <section className="relative mt-28 overflow-hidden border-y border-white/10 py-16">

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-700/10 blur-3xl" />

                <p className="relative font-mono text-[9px] tracking-[0.3em] text-red-500">
                  FINAL ENTRY
                </p>

                <h2 className="relative mt-5 max-w-[750px] font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
                  The point isn&apos;t just to build a model.
                  <br />

                  <span className="text-neutral-500">
                    It is to build something worth using.
                  </span>
                </h2>

                <p className="relative mt-7 max-w-[650px] font-serif text-[16px] leading-8 text-neutral-300">
                  Machine learning is a tool. The interesting part
                  is everything around the model: understanding
                  the problem, making deliberate decisions,
                  engineering the system, deploying it, and
                  learning when the first idea was wrong.
                </p>

                <div className="relative mt-10 grid max-w-[700px] gap-5 sm:grid-cols-3">

                  <div>
                    <p className="font-mono text-[8px] text-neutral-500">
                      PRINCIPLE 01
                    </p>

                    <p className="mt-2 font-serif text-sm text-neutral-300">
                      Understand before optimizing.
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[8px] text-neutral-500">
                      PRINCIPLE 02
                    </p>

                    <p className="mt-2 font-serif text-sm text-neutral-300">
                      Build beyond the notebook.
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[8px] text-neutral-500">
                      PRINCIPLE 03
                    </p>

                    <p className="mt-2 font-serif text-sm text-neutral-300">
                      Capability comes with responsibility.
                    </p>
                  </div>

                </div>

                <div className="relative mt-10 font-mono text-[9px] tracking-[0.2em] text-neutral-600">
                  ARCHIVE STATUS: OPEN
                </div>

              </section>
            )}

          </div>

          {/* =====================================================
              RIGHT COLUMN
             ===================================================== */}

          <aside
            style={{
              transform:
                "translate3d(var(--portfolio-right-x, 0px), calc(var(--portfolio-right-y, 0px) + var(--portfolio-right-scroll, 0px)), 38px)",
              transformStyle: "preserve-3d",
              transition: "transform 220ms ease-out",
            }}
          >

            <section
              className={
                spideyMode
                  ? "border border-white/10 bg-black/60 p-7 shadow-2xl backdrop-blur-xl"
                  : ""
              }
            >

              {spideyMode && (
                <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4">

                  <span className="font-mono text-[9px] tracking-[0.2em] text-red-500">
                    SUBJECT PROFILE
                  </span>

                  <span className="font-mono text-[9px] text-neutral-500">
                    001
                  </span>

                </div>
              )}

              <h2
                className={`font-serif text-[26px] font-bold leading-tight ${
                  spideyMode ? "text-white" : ""
                }`}
              >
                {spideyMode
                  ? "The person behind the mask"
                  : "About me"}
              </h2>

              {/* =================================================
                  PROFILE IMAGE
                 ================================================= */}

              <div className="mt-6 grid grid-cols-[88px_1fr] items-start gap-5">

                <button
                  type="button"
                  onClick={(event) => {

                    /* Exit Spider-Man mode */

                    if (spideyMode) {
                      setSpideyMode(false);
                      return;
                    }

                    /* Get the real screen position */

                    const rect =
                      event.currentTarget.getBoundingClientRect();

                    if (spideyTransition) return;

                    setTransitionRect({
                      left: rect.left,
                      top: rect.top,
                      width: rect.width,
                      height: rect.height,
                    });

                    setSpideyTransition(true);
                  }}
                  aria-label={
                    spideyMode
                      ? "Exit Spider-Man mode"
                      : "Activate Spider-Man mode"
                  }
                  className="group relative h-[88px] w-[88px] shrink-0 rounded-full focus:outline-none"
                >

                  {/* GLOW */}

                  <div
                    className={`pointer-events-none absolute -inset-3 rounded-full blur-xl transition-all duration-500 ${
                      spideyMode
                        ? "bg-red-600/40 opacity-100"
                        : "bg-red-600/25 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* RING */}

                  <div
                    className={`pointer-events-none absolute -inset-[3px] rounded-full transition-all duration-500 ${
                      spideyMode
                        ? "bg-gradient-to-br from-red-500 via-red-700 to-blue-700"
                        : "bg-transparent group-hover:bg-red-500/70"
                    }`}
                  />

                  {/* PHOTO */}

                  <img
                    src={profileImage}
                    alt="Lochan Jangid"
                    className="relative h-[88px] w-[88px] rounded-full border-2 border-black object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08] group-hover:shadow-[0_0_24px_rgba(220,38,38,0.3)]"
                  />

                  {/* LABEL */}

                  <span
                    className={`pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] tracking-[0.18em] transition-opacity duration-300 ${
                      spideyMode
                        ? "text-red-400 opacity-100"
                        : "text-neutral-400 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {spideyMode
                      ? "EXIT MODE"
                      : "ACTIVATE"}
                  </span>

                </button>

                <p
                  className={`font-serif text-[16px] leading-[1.7] ${
                    spideyMode
                      ? "text-neutral-200"
                      : "text-[#514d49]"
                  }`}
                >
                  Hey, I&apos;m Lochan. I&apos;m a machine learning
                  engineer focused on building practical ML and AI
                  applications.
                </p>

              </div>

              {/* ABOUT */}

              <p
                className={`mt-8 font-serif text-[16px] leading-[1.7] ${
                  spideyMode
                    ? "text-neutral-300"
                    : "text-[#514d49]"
                }`}
              >
                I work across machine learning, deep learning,
                model development, and the engineering required
                to turn models into usable software.
              </p>

              <p
                className={`mt-5 font-serif text-[16px] leading-[1.7] ${
                  spideyMode
                    ? "text-neutral-300"
                    : "text-[#514d49]"
                }`}
              >
                I primarily work with Python, Scikit-learn,
                PyTorch, FastAPI, Docker, and modern web
                technologies.
              </p>

              {/* =================================================
                  IDENTITY DATA
                 ================================================= */}

              {spideyMode && (
                <div className="mt-8 border-t border-white/10 pt-6">

                  <div className="grid grid-cols-2 gap-y-6 font-mono text-[9px]">

                    <div>
                      <div className="text-neutral-500">
                        SUBJECT
                      </div>

                      <div className="mt-1 text-white">
                        LOCHAN JANGID
                      </div>
                    </div>

                    <div>
                      <div className="text-neutral-500">
                        ROLE
                      </div>

                      <div className="mt-1 text-red-300">
                        ML ENGINEER
                      </div>
                    </div>

                    <div>
                      <div className="text-neutral-500">
                        BASE
                      </div>

                      <div className="mt-1 text-white">
                        JAIPUR, INDIA
                      </div>
                    </div>

                    <div>
                      <div className="text-neutral-500">
                        STATUS
                      </div>

                      <div className="mt-1 text-green-400">
                        BUILDING
                      </div>
                    </div>

                    <div>
                      <div className="text-neutral-500">
                        PRIMARY TOOL
                      </div>

                      <div className="mt-1 text-blue-300">
                        PYTHON
                      </div>
                    </div>

                    <div>
                      <div className="text-neutral-500">
                        MISSION
                      </div>

                      <div className="mt-1 text-white">
                        BUILD SYSTEMS
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </section>

            {/* =================================================
                CONTACT
               ================================================= */}

            <div
              className={`mt-10 border-t pt-8 font-serif text-[15px] font-bold ${
                spideyMode
                  ? "border-white/10"
                  : "border-[#dedbd6] pt-12"
              }`}
            >

              {spideyMode && (
                <p className="mb-5 font-mono text-[9px] tracking-[0.2em] text-red-500">
                  ESTABLISH CONNECTION
                </p>
              )}

              <div
                className={`flex flex-wrap gap-x-4 gap-y-2 ${
                  spideyMode
                    ? "font-mono text-[11px]"
                    : ""
                }`}
              >

                <a
                  href="https://www.linkedin.com/in/lochan-jangid/"
                  target="_blank"
                  rel="noreferrer"
                  className={
                    spideyMode
                      ? "text-red-300 transition hover:text-white"
                      : "underline decoration-neutral-400 underline-offset-2 hover:text-neutral-600"
                  }
                >
                  LinkedIn
                </a>

                <span className="text-neutral-600">
                  ·
                </span>

                <a
                  href="https://github.com/LochanJangid"
                  target="_blank"
                  rel="noreferrer"
                  className={
                    spideyMode
                      ? "text-red-300 transition hover:text-white"
                      : "underline decoration-neutral-400 underline-offset-2 hover:text-neutral-600"
                  }
                >
                  GitHub
                </a>

                <span className="text-neutral-600">
                  ·
                </span>

                <a
                  href="mailto:lochanjangid@gmail.com"
                  className={
                    spideyMode
                      ? "text-red-300 transition hover:text-white"
                      : "underline decoration-neutral-400 underline-offset-2 hover:text-neutral-600"
                  }
                >
                  Email
                </a>

              </div>
            </div>

          </aside>

        </div>

        {/* =========================================================
            FOOTER
           ========================================================= */}

        <footer
          className={`mt-24 border-t pt-6 ${
            spideyMode
              ? "border-white/10"
              : "border-[#dedbd6]"
          }`}
        >

          {spideyMode ? (
            <div className="grid gap-3 font-mono text-[8px] tracking-[0.16em] text-neutral-500 sm:grid-cols-3">

              <span>
                LOCHAN JANGID / PARKER ARCHIVE
              </span>

              <span className="text-center text-red-700">
                JAIPUR / INDIA
              </span>

              <span className="text-right">
                ARCHIVE 001 / 2026
              </span>

            </div>
          ) : (
            <div className="font-serif text-[13px] text-[#99938c]">
              © 2026 Lochan Jangid
            </div>
          )}

        </footer>

      </div>

      {/* =========================================================
          REDUCED MOTION
         ========================================================= */}

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
          }
        }

      `}</style>
      </main>
      {spideyTransition && (
        <SpideyTransition
          rect={transitionRect}
          spideyMode={spideyMode}
        />
      )}
    </>
  );
}