"use client";
import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      company: "Regex Software Services",
      type: "INTERNSHIP",
      date: "NOV 2025 — Present",
      location: "Jaipur, India",
      desc: "Learning Python, SQL, ML, and LLMs while working on real-world problems.",
    },
  ];

  return (
    <section id="experience" className="px-10 py-20">
      <h2 className="text-4xl mb-10">Experience</h2>

      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b border-white/10 pb-6"
          >
            <p className="text-green-400 text-sm mb-2">{exp.type}</p>

            <h3 className="text-xl font-bold">{exp.company}</h3>

            <p className="text-gray-400 text-sm">
              {exp.date} • {exp.location}
            </p>

            <p className="text-gray-500 mt-2 max-w-xl">
              {exp.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}