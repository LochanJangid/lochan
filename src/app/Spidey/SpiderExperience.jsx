"use client";

import { useEffect, useRef } from "react";

const profileImage = "https://github.com/LochanJangid.png";

const capabilities = [
  {
    number: "01",
    title: "Machine learning",
    description:
      "Framing the right problem, preparing thoughtful data, and building models that earn their place.",
  },
  {
    number: "02",
    title: "Applied AI",
    description:
      "Turning new AI capabilities into practical, clear experiences for real people.",
  },
  {
    number: "03",
    title: "Product engineering",
    description:
      "Taking ideas past the notebook with APIs, deployment, and a careful user experience.",
  },
];

const tools = [
  "Python",
  "PyTorch",
  "Scikit-learn",
  "FastAPI",
  "Docker",
  "Next.js",
  "SQL",
  "Git",
];

function Arrow({ className = "" }) {
  return (
    <span aria-hidden="true" className={className}>
      ↗
    </span>
  );
}

function ProjectCard({ project, index }) {
  const palettes = [
    "from-[#f3c5a8] via-[#e8aa98] to-[#d9958e]",
    "from-[#c3c5eb] via-[#a8b2dd] to-[#8b9ac9]",
    "from-[#e9d69d] via-[#ddb878] to-[#d59e66]",
    "from-[#b8d1c4] via-[#9dbba9] to-[#779c8a]",
    "from-[#edb4a4] via-[#df978e] to-[#c77d83]",
  ];

  return (
    <article
    data-scroll-side={index % 2 === 0 ? "left" : "right"}
    className="group overflow-hidden rounded-[1.6rem] border border-[#25211e]/10 bg-[#fffdf9] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(44,31,23,0.12)]">
      <div
        className={`relative flex min-h-[190px] items-end overflow-hidden bg-gradient-to-br p-6 sm:min-h-[230px] sm:p-8 ${palettes[index % palettes.length]}`}
      >
        <div className="absolute -right-5 -top-16 h-52 w-52 rounded-full border border-white/50 transition duration-700 group-hover:scale-110 sm:h-64 sm:w-64" />
        <div className="absolute -right-1 top-1 h-40 w-40 rounded-full border border-white/40 sm:h-52 sm:w-52" />
        <div className="absolute right-10 top-10 h-24 w-24 rounded-[2rem] border border-white/50 bg-white/20 backdrop-blur-sm transition duration-500 group-hover:rotate-6 group-hover:scale-105 sm:right-16 sm:top-12 sm:h-32 sm:w-32" />
        <div className="relative z-10 flex w-full items-center justify-between">
          <span className="rounded-full border border-white/50 bg-white/35 px-3 py-1.5 font-mono text-[9px] tracking-[0.14em] text-[#2a2726] backdrop-blur-sm">
            {project.subtitle}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#24201d] text-lg text-white transition duration-300 group-hover:rotate-45">
            <Arrow />
          </span>
        </div>
        <span className="absolute left-7 top-5 font-mono text-[10px] tracking-[0.2em] text-[#302a25]/70">
          SELECTED WORK / {project.number}
        </span>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="max-w-[28rem] font-serif text-3xl leading-[1.05] tracking-[-0.03em] text-[#24201d] sm:text-4xl">
            {project.title}
          </h3>
          <span className="rounded-full border border-[#29231f]/15 px-3 py-1.5 font-mono text-[8px] tracking-[0.12em] text-[#6c635b]">
            {project.status}
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#625b55]">
          {project.description}
        </p>
        <p className="mt-4 border-l-2 border-[#ed7654] pl-3 font-mono text-[10px] leading-5 text-[#777067]">
          {project.system}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
          {project.links.map(([label, href]) => {
            const external = href.startsWith("http");
            return (
              <a
                key={`${label}-${href}`}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38312b] underline decoration-[#ed7654]/50 underline-offset-4 transition hover:text-[#d45739]"
              >
                {label} <Arrow className="text-[11px]" />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function SpiderExperience({ projects, onExit }) {
  const experienceRef = useRef(null);
  const orbitRef = useRef(null);
  const profileRef = useRef(null);
  const brandMarkRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const experience = experienceRef.current;
    const cursor = cursorRef.current;

    if (!experience || !cursor) return undefined;

    const handlePointerMove = (event) => {
      if (event.pointerType === "touch") return;

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("is-visible");
      cursor.classList.toggle(
        "is-hovering",
        Boolean(event.target.closest("a, button, [role='button']")),
      );
    };
    const hideCursor = () => {
      cursor.classList.remove("is-visible", "is-hovering");
    };

    experience.addEventListener("pointermove", handlePointerMove);
    experience.addEventListener("pointerleave", hideCursor);

    return () => {
      experience.removeEventListener("pointermove", handlePointerMove);
      experience.removeEventListener("pointerleave", hideCursor);
    };
  }, []);

  useEffect(() => {
    const experience = experienceRef.current;
    const orbit = orbitRef.current;

    if (!experience || !orbit) return undefined;

    let frameId;
    const updateOrbit = () => {
      const scrollRange =
        experience.scrollHeight - experience.clientHeight;
      const progress =
        scrollRange > 0 ? experience.scrollTop / scrollRange : 0;
      const angle = progress * 360;

      orbit.style.setProperty("--personal-orbit-angle", `${angle}deg`);
      profileRef.current?.style.setProperty(
        "--personal-profile-angle",
        `${angle}deg`,
      );
      brandMarkRef.current?.style.setProperty(
        "--personal-brand-angle",
        `${angle}deg`,
      );
      orbit.style.setProperty(
        "--personal-orbit-counter-angle",
        `${-angle}deg`,
      );
      orbit.style.setProperty(
        "--personal-orbit-reverse-angle",
        `${-angle}deg`,
      );
      orbit.style.setProperty(
        "--personal-orbit-counter-reverse-angle",
        `${angle}deg`,
      );

      const viewportCenter = experience.clientHeight / 2;
      const travelRange = experience.clientHeight * 0.55;
      const scrollActivation = Math.min(
        experience.scrollTop / (experience.clientHeight * 0.35),
        1,
      );
      const maxTravel = window.matchMedia("(max-width: 640px)").matches
        ? 28
        : 72;

      experience.querySelectorAll("[data-scroll-side]").forEach((item) => {
        const bounds = item.getBoundingClientRect();
        const itemCenter = bounds.top + bounds.height / 2;
        const distance = Math.min(
          Math.abs(itemCenter - viewportCenter) / travelRange,
          1,
        );
        const direction = item.dataset.scrollSide === "left" ? -1 : 1;

        item.style.setProperty(
          "--personal-scroll-x",
          `${direction * distance * scrollActivation * maxTravel}px`,
        );
      });
    };
    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = undefined;
        updateOrbit();
      });
    };

    updateOrbit();
    experience.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      experience.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <main
      ref={experienceRef}
      className="personal-experience fixed inset-0 z-[20] overflow-x-hidden overflow-y-auto overscroll-contain bg-[#f7f3ed] text-[#24201d] selection:bg-[#ed7654] selection:text-white"
    >
      <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true">
        <span className="portfolio-cursor__ring">
          <span className="portfolio-cursor__dot" />
        </span>
      </div>
      <header className="sticky top-0 z-30 border-b border-[#29231f]/10 bg-[#f7f3ed]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between px-5 sm:h-[5.25rem] sm:px-9 lg:px-14">
          <a href="#top" className="group flex items-center gap-3">
            <span
              ref={brandMarkRef}
              className="personal-brand-mark grid h-9 w-9 place-items-center rounded-full bg-[#27221f] font-serif text-lg text-[#f7f3ed] transition-colors group-hover:bg-[#ed7654]"
            >
              L
            </span>
            <span>
              <span className="block text-[11px] font-bold tracking-[0.13em]">
                LOCHAN JANGID
              </span>
              <span className="mt-0.5 block font-mono text-[8px] tracking-[0.13em] text-[#817870]">
                ML ENGINEER · JAIPUR, INDIA
              </span>
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            <a
              href="#work"
              className="text-xs font-semibold text-[#5b534c] transition hover:text-[#d45739]"
            >
              Selected work
            </a>
            <a
              href="#experience"
              className="text-xs font-semibold text-[#5b534c] transition hover:text-[#d45739]"
            >
              Experience
            </a>
            <a
              href="#about"
              className="text-xs font-semibold text-[#5b534c] transition hover:text-[#d45739]"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-xs font-semibold text-[#5b534c] transition hover:text-[#d45739]"
            >
              Say hello
            </a>
          </nav>

          <button
            type="button"
            onClick={onExit}
            className="group inline-flex items-center gap-2 rounded-full border border-[#28221e]/15 bg-white/50 px-3.5 py-2.5 text-[10px] font-semibold transition hover:border-[#ed7654]/60 hover:bg-white sm:px-4 sm:text-[11px]"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#ed7654] text-[10px] text-white transition group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="hidden sm:inline">FORMAL PORTFOLIO</span>
            <span className="sm:hidden">FORMAL</span>
          </button>
        </div>
      </header>

      <section
        id="top"
        className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[1320px] items-center gap-8 overflow-hidden px-5 py-12 sm:min-h-[calc(100svh-5.25rem)] sm:px-9 sm:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:px-14 lg:py-20"
      >
        <div className="pointer-events-none absolute -left-36 top-24 h-80 w-80 rounded-full bg-[#f4d9bd]/55 blur-3xl" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-0.08em] right-[-0.06em] z-0 select-none whitespace-nowrap font-sans text-[clamp(7rem,22vw,20rem)] font-semibold leading-none tracking-[-0.12em] text-[#211d1a]/[0.035]"
        >
          LOCHAN
        </span>
        <div data-scroll-side="left" className="relative z-10 max-w-[760px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#28221e]/10 bg-white/60 px-3.5 py-2">
            <span className="h-2 w-2 rounded-full bg-[#6a9f78] shadow-[0_0_0_4px_rgba(106,159,120,0.12)]" />
            <span className="font-mono text-[9px] tracking-[0.11em] text-[#655d56] sm:text-[10px]">
              MACHINE LEARNING · APPLIED AI · PRODUCT BUILDING
            </span>
          </div>

          <h1 className="font-sans text-[clamp(3.35rem,10.3vw,8.7rem)] font-semibold leading-[0.83] tracking-[-0.09em] text-[#211d1a]">
            From data
            <br />
            <span className="font-serif font-normal italic tracking-[-0.065em] text-[#df6c4b]">
              to useful
              <br />
              AI.
            </span>
          </h1>

          <p className="mt-7 max-w-[510px] text-[15px] leading-7 text-[#655d56] sm:mt-9 sm:text-lg sm:leading-8">
            I&apos;m Lochan, an ML engineer building practical systems that
            carry an idea from a messy dataset through a model and into
            software people can actually use.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <a
              href="#work"
              className="group inline-flex items-center gap-5 rounded-full bg-[#25211e] px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-[#df6c4b] sm:px-7 sm:py-4"
            >
              EXPLORE MY WORK
              <Arrow className="text-base transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs font-semibold text-[#39322c] transition hover:text-[#d45739]"
            >
              A LITTLE ABOUT ME <Arrow />
            </a>
          </div>
          <p className="mt-8 font-mono text-[9px] tracking-[0.13em] text-[#968b80]">
            JAIPUR, INDIA · BUILDING BEYOND THE NOTEBOOK
          </p>
        </div>

        <div
          ref={orbitRef}
          data-scroll-side="right"
          className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center lg:justify-self-end"
        >
          <div className="absolute inset-[8%] rounded-full bg-[#f0c9a9]" />
          <div className="personal-orbit-track absolute inset-[2%] rounded-full border border-[#d77f60]/25">
            <span className="personal-orbit-badge absolute left-1/2 top-0 z-20">
              <span className="whitespace-nowrap rounded-full bg-[#fffdf9] px-3 py-2 font-mono text-[8px] tracking-[0.1em] text-[#4b443e] shadow-md sm:text-[9px]">
                DATA → DECISIONS
              </span>
            </span>
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 440 440"
            className="personal-orbit-ring pointer-events-none absolute inset-0 h-full w-full"
          >
            <circle
              cx="220"
              cy="220"
              r="210"
              fill="none"
              stroke="#df6c4b"
              strokeDasharray="250 1070"
              strokeLinecap="round"
              strokeOpacity="0.58"
              strokeWidth="1.5"
            />
            <circle
              cx="220"
              cy="220"
              r="178"
              fill="none"
              stroke="#d77f60"
              strokeDasharray="110 1008"
              strokeLinecap="round"
              strokeOpacity="0.48"
              strokeWidth="1"
            />
          </svg>
          <div className="personal-orbit-track-reverse absolute inset-[12%] rounded-full border border-dashed border-[#d77f60]/35">
            <span className="personal-orbit-badge-reverse absolute bottom-0 left-1/2 z-20">
              <span className="whitespace-nowrap rounded-full bg-[#28221e] px-3 py-2 font-mono text-[8px] tracking-[0.1em] text-white shadow-md sm:text-[9px]">
                IDEAS → IMPACT
              </span>
            </span>
          </div>
          <div className="absolute right-[7%] top-[14%] h-8 w-8 rounded-full bg-[#92a99b] shadow-[0_12px_30px_rgba(70,98,80,0.2)]" />
          <div className="absolute bottom-[12%] left-[5%] h-5 w-5 rounded-full bg-[#df6c4b]" />
          <div
            ref={profileRef}
            id="personal-profile-frame"
            className="personal-profile-portrait relative z-10 h-[66%] w-[66%] overflow-hidden rounded-[46%_54%_48%_52%/48%_43%_57%_52%] border-[8px] border-[#fff9f1] bg-[#e7b69c] shadow-[0_24px_70px_rgba(88,55,38,0.18)] sm:border-[12px]"
          >
            <img
              src={profileImage}
              alt="Lochan Jangid"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-[14%] right-0 z-20 rotate-[-5deg] rounded-2xl border border-[#28221e]/10 bg-[#fffdf9] px-4 py-3 shadow-[0_16px_40px_rgba(44,31,23,0.12)] sm:right-[-1%] sm:px-5 sm:py-4">
            <p className="font-mono text-[8px] tracking-[0.14em] text-[#95897e]">
              BASED IN
            </p>
            <p className="mt-1 font-serif text-lg text-[#28221e] sm:text-xl">
              Jaipur, India <span className="text-[#df6c4b]">↗</span>
            </p>
          </div>
          <div className="absolute bottom-[-1%] left-1/2 h-px w-16 -translate-x-1/2 bg-[#c9b9a9] lg:hidden" />
        </div>
      </section>

      <section
        id="work"
        className="scroll-mt-20 bg-[#eee7dd] px-5 py-20 sm:px-9 sm:py-28 lg:px-14"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div data-scroll-side="left">
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#d56545]">
                A FEW THINGS I&apos;VE PUT INTO THE WORLD
              </p>
              <h2 className="mt-3 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
                Selected work<span className="text-[#df6c4b]">.</span>
              </h2>
            </div>
            <p
              data-scroll-side="right"
              className="max-w-xs pb-1 text-sm leading-6 text-[#70675e]"
            >
              Practical machine learning, thoughtful engineering, and ideas
              that made it out of the notebook.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.number}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="scroll-mt-20 bg-[#f7f3ed] px-5 py-20 sm:px-9 sm:py-28 lg:px-14"
      >
        <div className="mx-auto max-w-[1180px]">
          <div data-scroll-side="left">
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#d56545]">
              WHERE I&apos;M LEARNING BY BUILDING
            </p>
            <h2 className="mt-3 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
              Experience<span className="text-[#df6c4b]">.</span>
            </h2>
          </div>

          <article
            data-scroll-side="right"
            className="mt-10 rounded-[1.6rem] border border-[#29231f]/10 bg-[#fffdf9] p-6 shadow-[0_24px_70px_rgba(44,31,23,0.06)] sm:p-9"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
              <a
                href="https://www.linkedin.com/company/30204738/"
                target="_blank"
                rel="noreferrer"
                aria-label="REGex Software Services on LinkedIn"
                className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#29231f]/10 bg-white"
              >
                <img
                  src="https://media.licdn.com/dms/image/v2/C510BAQG-rlPs90C2EA/company-logo_100_100/company-logo_100_100/0/1630589399099?e=1792627200&v=beta&t=4v-beAQ9nIUC9_cHqD0B08Rr7rvPJu5wMHooXX41Sss"
                  alt="REGex Software Services logo"
                  className="h-full w-full object-contain"
                />
              </a>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl leading-tight tracking-[-0.03em] text-[#24201d] sm:text-4xl">
                      AI/ML Intern
                    </h3>
                    <a
                      href="https://www.linkedin.com/company/30204738/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-[#514941] transition hover:text-[#d45739]"
                    >
                      REGex Software Services
                      <Arrow className="ml-1 text-[11px]" />
                    </a>
                    <p className="mt-1 text-sm text-[#817870]">
                      Full-time · On-site
                    </p>
                  </div>
                  <p className="font-mono text-[10px] leading-5 tracking-[0.04em] text-[#817870] sm:text-right">
                    DEC 2025 – PRESENT
                    <br />
                    11 MONTHS
                  </p>
                </div>

                <p className="mt-5 text-sm leading-6 text-[#655d56]">
                  Jaipur, Rajasthan, India
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Python (Programming Language)", "C (Programming Language)", "+1 skill"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-[#29231f]/10 bg-[#f7f3ed] px-3.5 py-2 font-mono text-[9px] tracking-[0.04em] text-[#5b534c]"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-20 bg-[#26221f] px-5 py-20 text-[#f7f3ed] sm:px-9 sm:py-28 lg:px-14"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <div data-scroll-side="left">
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#f09978]">
                THE PERSON BEHIND THE MODELS
              </p>
              <h2 className="mt-4 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">
                Serious about
                <br />
                the work.
                <br />
                <span className="italic text-[#f09978]">Curious about</span>
                <br />
                everything.
              </h2>
            </div>
            <div data-scroll-side="right" className="pt-1 lg:pt-12">
              <p className="max-w-2xl text-base leading-8 text-[#d0c7be] sm:text-lg sm:leading-9">
                I care about the whole journey: framing a useful problem,
                understanding the data, measuring what works, and shipping
                dependable software. A good model matters; so do the APIs,
                deployment, and product decisions around it.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#a99f95]">
                I also built and published{" "}
                <a
                  href="https://pypi.org/project/lochan-eda/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#f09978] underline decoration-[#f09978]/40 underline-offset-4 transition hover:text-white"
                >
                  lochan-eda
                </a>
                , an open-source Python toolkit for exploratory data analysis
                and preprocessing. I enjoy making technical work easier to
                understand and useful to the next person who picks it up.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/15 px-3.5 py-2 font-mono text-[9px] tracking-[0.06em] text-[#e6ddd4]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-3 border-t border-white/15 pt-7 sm:mt-20 sm:grid-cols-3 sm:gap-5 sm:pt-10">
            {capabilities.map((capability) => (
              <article
                key={capability.number}
                data-scroll-side={
                  Number(capability.number) % 2 === 1 ? "left" : "right"
                }
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6"
              >
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#f09978]">
                  {capability.number} / WHAT I DO
                </p>
                <h3 className="mt-5 font-serif text-2xl sm:text-3xl">
                  {capability.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#bdb3aa]">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 bg-[#f2d6c1] px-5 py-20 sm:px-9 sm:py-28 lg:px-14"
      >
        <div className="mx-auto grid max-w-[1180px] gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div data-scroll-side="left">
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#a84e36]">
              GOOD THINGS START WITH A CONVERSATION
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-6xl leading-[0.9] tracking-[-0.055em] text-[#28221e] sm:text-8xl">
              Let&apos;s make
              <br />
              something matter.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#68564a] sm:text-base">
              Have a thoughtful problem, an interesting role, or an idea you
              can&apos;t stop thinking about? I&apos;d love to hear it.
            </p>
          </div>
          <div
            data-scroll-side="right"
            className="flex flex-wrap gap-3 lg:flex-col lg:items-start"
          >
            <a
              href="mailto:lochanjangid@gmail.com"
              className="inline-flex items-center gap-3 rounded-full bg-[#28221e] px-6 py-4 text-xs font-semibold text-white transition hover:bg-[#df6c4b]"
            >
              SAY HELLO <Arrow />
            </a>
            <a
              href="https://www.linkedin.com/in/lochan-jangid/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#28221e]/20 px-5 py-4 text-xs font-semibold text-[#28221e] transition hover:bg-white/50"
            >
              LINKEDIN <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 bg-[#f7f3ed] px-5 py-5 text-[10px] text-[#766c62] sm:px-9 lg:px-14">
        <span data-scroll-side="left">LOCHAN JANGID · BUILT WITH CURIOSITY</span>
        <a
          data-scroll-side="right"
          href="#top"
          className="font-semibold transition hover:text-[#d45739]"
        >
          BACK TO TOP ↑
        </a>
      </footer>
    </main>
  );
}
