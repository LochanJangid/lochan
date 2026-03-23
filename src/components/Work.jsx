"use client";

import { motion } from "framer-motion";

const works = [
  {
    name: "MOOVE — Movie Recommendation System",
    desc: "Flask-based movie recommendation web application that suggests movies based on user preferences. Demonstrates backend development, data handling, and recommendation logic.",
    tech: ["Python", "Flask", "HTML", "Recommendation System"],
    github: "https://github.com/LochanJangid/MOOVE---Movie-Finds-You",
    highlight: true,
  },
  {
    name: "CS50 Problem Solving Repository",
    desc: "Collection of solutions to CS50 problems covering algorithms, C, Python, and SQL. Focused on logic building and computational thinking.",
    tech: ["C", "Python", "Algorithms", "SQL"],
    github: "https://github.com/LochanJangid/CS50-Problems-Solutions",
    highlight: true,
  },
  {
    name: "Python Projects Collection",
    desc: "Set of Python-based mini projects exploring problem solving, scripting, and basic data handling concepts.",
    tech: ["Python"],
    github: "https://github.com/LochanJangid/Py_projects",
  },
  {
    name: "MTS School Website (Forked)",
    desc: "Forked full-stack website project. Explored structure, routing, and frontend integration.",
    tech: ["JavaScript", "Next.js"],
    github: "https://github.com/LochanJangid/mts",
  }
];

export default function Work() {
  return (
    <section id="work" className="px-10 py-24">
      <h2 className="text-4xl mb-12 text-center">Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">

        {works.map((w, i) => (
          <motion.a
            key={i}
            href={w.github}
            target="_blank"
            whileHover={{ y: -6 }}
            className={`group p-6 rounded-xl border transition 
              ${w.highlight 
                ? "border-cyan-400 bg-white/5" 
                : "border-white/10 hover:border-cyan-400"}
            `}
          >

            {/* TITLE */}
            <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition">
              {w.name}
            </h3>

            {/* DESC */}
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              {w.desc}
            </p>

            {/* TECH */}
            <div className="flex flex-wrap gap-2 mt-4">
              {w.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs border border-white/10 px-2 py-1 rounded group-hover:border-cyan-400 transition"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* FOOTER */}
            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
              <span>View Project</span>
              <span className="group-hover:translate-x-1 transition">→</span>
            </div>

          </motion.a>
        ))}

      </div>
    </section>
  );
}