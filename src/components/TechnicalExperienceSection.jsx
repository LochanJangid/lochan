"use client";

import { spiderAudio } from "../app/Spidey/spiderAudio";

const SKILLS = [
  { name: "Machine Learning", category: "Core" },
  { name: "Deep Learning (CNNs, Transformers)", category: "Deep Learning" },
  { name: "Retrieval-Augmented Generation (RAG)", category: "GenAI" },
  { name: "PyTorch & Attention Mechanisms", category: "Frameworks" },
  { name: "Vector Search & FAISS", category: "Information Retrieval" },
  { name: "Scikit-Learn & XGBoost", category: "ML" },
  { name: "FastAPI REST Deployments", category: "Production Systems" },
  { name: "Docker & Container Architecture", category: "DevOps" },
  { name: "Computer Vision & Grad-CAM Heatmaps", category: "Deep Learning" },
  { name: "Python Packaging (PyPI)", category: "Open Source" },
];

export default function TechnicalExperienceSection() {
  return (
    <section id="experience" className="mt-14 sm:mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Professional Experience Card (Teal #A5DAD4) */}
        <div className="rounded-[32px] sm:rounded-[38px] border border-[#8ecdc6] bg-[#A5DAD4] p-6 sm:p-8 md:p-10 text-[#080808] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#080808]/15 pb-4">
              <span className="rounded-full bg-[#080808] px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                04 // PROFESSIONAL EXPERIENCE
              </span>
              <span className="font-mono text-xs font-bold text-[#080808]">
                DEC 2025 – PRESENT
              </span>
            </div>

            <div className="mt-6">
              <h4 className="font-display text-2xl sm:text-3xl font-black text-[#080808]">
                AI / Machine Learning Engineer
              </h4>
              <p className="mt-1 font-display text-xl font-bold text-[#080808]/85">
                <a
                  href="https://www.linkedin.com/company/30204738/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-white"
                >
                  REGEx Software Services
                </a>
              </p>
              <p className="mt-1 font-mono text-xs text-[#080808]/70">
                Full-time · On-site · Jaipur, Rajasthan, India
              </p>

              <p className="mt-4 font-sans text-sm sm:text-base text-[#080808]/90 leading-relaxed">
                Developing end-to-end machine learning pipelines, structured data preprocessing engines, and exposing models via resilient REST APIs. Responsible for model experimentation, feature engineering, and deploying practical software architectures.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
                <span className="rounded-full bg-white/90 px-3 py-1 font-semibold text-[#080808]">
                  Python
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 font-semibold text-[#080808]">
                  PyTorch
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 font-semibold text-[#080808]">
                  FastAPI
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 font-semibold text-[#080808]">
                  Data Pipelines
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#080808]/15 flex items-center justify-between font-mono text-xs font-bold text-[#080808]">
            <span>VERIFIED TENURE: 11+ MONTHS</span>
            <a
              href="https://www.linkedin.com/in/lochan-jangid/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </div>

        {/* Technical Competencies Matrix (Warm Yellow #FFC568) */}
        <div className="rounded-[32px] sm:rounded-[38px] border border-[#eeb457] bg-[#FFC568] p-6 sm:p-8 md:p-10 text-[#080808] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#080808]/15 pb-4">
              <span className="rounded-full bg-[#080808] px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#FFC568]">
                TECHNICAL EXPERTISE
              </span>
              <span className="font-mono text-xs font-bold text-[#080808]">
                09 PRODUCTION REPOSITORIES
              </span>
            </div>

            <h4 className="mt-6 font-display text-2xl sm:text-3xl font-black text-[#080808]">
              Full-Cycle Machine Learning Stack
            </h4>
            <p className="mt-2 font-sans text-sm sm:text-base text-[#080808]/85 leading-relaxed">
              Equally comfortable deriving linear algebra equations on paper, training deep neural networks from scratch, and building low-latency production microservices.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill.name}
                  onClick={() => spiderAudio.playNeuralChirp(600)}
                  className="rounded-full bg-white px-3.5 py-1.5 font-display text-xs font-bold text-[#080808] shadow-sm transition hover:scale-105 cursor-pointer"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#080808]/15 flex items-center justify-between font-mono text-xs font-bold text-[#080808]">
            <span>MODELS · FASTAPI REST · PYTHON · PYTORCH</span>
            <a
              href="https://github.com/LochanJangid"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white"
            >
              Explore GitHub Profile ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
