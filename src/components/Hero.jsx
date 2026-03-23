"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

const name = "Lochan Jangid";

export default function Hero() {

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const glow = document.getElementById("glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,200,0.15), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="min-h-screen flex items-center px-10 relative overflow-hidden">

      {/* 🔮 MOUSE REACTIVE GLOW */}
      <div id="glow" className="absolute inset-0 pointer-events-none"></div>

      {/* 🧠 GRID BACKGROUND */}
      <div className="absolute inset-0 
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
        linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:80px_80px]" />

      {/* 🌌 FLOATING ORBS */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-400 opacity-10 blur-[120px] top-[-100px] right-[-100px] rounded-full animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-10 blur-[120px] bottom-[-100px] left-[-100px] rounded-full animate-pulse"></div>

      <div className="relative z-10 max-w-3xl">

        {/* 🚀 STATUS CHIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 border border-white/10 px-4 py-1 rounded-full text-xs text-gray-400 mb-6"
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
          Data Scientist · ML · AI
        </motion.div>

        {/* 🔥 NAME (LETTER REVEAL + SCI-FI GRADIENT) */}
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-tight flex flex-wrap">

          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className={char !== " " ? "gradient-text" : ""}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}

        </h1>

        {/* ⚡ TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-xl mt-6"
        >
          Turning data into{" "}
          <span className="text-cyan-400 font-mono">intelligence</span>
        </motion.p>

        {/* 🧠 DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-500 mt-4 max-w-lg"
        >
          Building data-driven systems, exploring Machine Learning, and experimenting
          with AI to solve real-world problems.
        </motion.p>

        {/* ⚡ ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex gap-4"
        >
          <a
            href="/resume.pdf"
            className="bg-cyan-400 text-black px-6 py-3 rounded hover:opacity-80 transition"
          >
            Resume
          </a>

          <a
            href="#work"
            className="border border-white/10 px-6 py-3 rounded hover:border-cyan-400 hover:text-cyan-400 transition"
          >
            View Work →
          </a>
        </motion.div>

      </div>
    </section>
  );
}