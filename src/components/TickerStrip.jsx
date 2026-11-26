"use client";

const STACK_KEYWORDS = [
  "PyTorch",
  "RAG From Scratch",
  "Transformers",
  "FAISS Vector Index",
  "FastAPI Microservices",
  "DenseNet-121 Vision",
  "Grad-CAM Heatmaps",
  "Scikit-Learn",
  "DuckDB",
  "Playwright Multimodal",
  "Docker Containerization",
  "PyPI Packaging",
  "SHAP Explainability",
  "TF-IDF Sparse Retrieval",
  "Reciprocal Rank Fusion",
];

export default function TickerStrip() {
  return (
    <div className="relative mt-8 sm:mt-12 mb-0 w-full overflow-hidden py-2">
      {/* Tilted Yellow Pill Container */}
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="relative transform -rotate-1 rounded-full border-[2.5px] border-[var(--ink)] bg-[var(--sun)] py-2.5 px-4 shadow-[4px_4px_0_var(--shadow)] overflow-hidden">
          <div
            tabIndex={0}
            aria-label="Technical skills marquee: PyTorch, RAG, Transformers, FastAPI, Docker, and more."
            className="marquee-track flex items-center gap-6 whitespace-nowrap font-mono text-xs sm:text-sm font-black text-[#1b1840]"
          >
            {/* Repeated twice for seamless loop */}
            {[...STACK_KEYWORDS, ...STACK_KEYWORDS].map((tech, idx) => (
              <span key={idx} className="inline-flex items-center gap-4">
                <span>{tech}</span>
                <span className="text-base select-none" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
