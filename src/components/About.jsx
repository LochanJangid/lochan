"use client";

import { motion } from "framer-motion";

export default function About() {
  const tech = [
    "Python",
    "SQL",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Machine Learning",
    "LLMs",
    "Data Visualization",
  ];

  return (
    <section id="about" className="px-10 py-20">
      <h2 className="text-4xl mb-10">About</h2>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-300 mb-4 leading-relaxed">
            I’m a Data Science intern with a strong interest in solving real-world
            problems using data. My journey started with web development, but I
            gradually shifted toward data, machine learning, and AI-driven systems.
          </p>

          <p className="text-gray-400 mb-4 leading-relaxed">
            Currently, I work with Python, SQL, and machine learning techniques to
            analyze data, build predictive models, and extract meaningful insights.
            I’m also exploring Large Language Models (LLMs) and how they can be used
            to build intelligent applications.
          </p>

          <p className="text-gray-400 mb-6 leading-relaxed">
            I focus on understanding data deeply, not just applying models blindly,
            and aim to build solutions that are both practical and impactful.
          </p>

          {/* TECH STACK */}
          <div className="flex flex-wrap gap-3">
            {tech.map((t) => (
              <span
                key={t}
                className="border border-white/10 px-3 py-1 text-sm rounded hover:border-cyan-400 hover:text-cyan-400 transition"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-white/10 p-6 rounded bg-white/5"
        >
          <div className="mb-5">
            <p className="text-sm text-gray-400">Current Role</p>
            <h3 className="text-xl font-bold">
              Data Science Intern
            </h3>
          </div>

          <div className="mb-5">
            <p className="text-sm text-gray-400">Focus</p>
            <h3 className="text-lg">
              Machine Learning · Data Analysis · LLMs
            </h3>
          </div>

          <div className="mb-5">
            <p className="text-sm text-gray-400">Location</p>
            <h3 className="text-lg">Jaipur, India</h3>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <h3 className="text-sm">
              lochanjangidcoder@gmail.com
            </h3>
          </div>
        </motion.div>

      </div>
    </section>
  );
}