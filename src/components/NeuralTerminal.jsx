"use client";

import { useEffect, useRef, useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

const INITIAL_LOGS = [
  "LOCHAN NEURAL ENGINE v2.6.0 [x86_64-linux]",
  "Type 'help' for available commands or 'rag <query>' to retrieve vectors.",
  "System initialized. All 9 ML services active.",
];

export default function NeuralTerminal({ isOpen, onClose, onToggleSpidey }) {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    spiderAudio.playNeuralChirp(620);
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    const newLogs = [...logs, `> ${trimmed}`];

    switch (cmd) {
      case "help":
        newLogs.push(
          "Available Commands:",
          "  about      - Display identity, role & philosophy",
          "  youtube    - Channel info, latest masterclass & subscribe link",
          "  projects   - Summary of 9 production ML systems",
          "  skills     - Technical competencies & frameworks",
          "  rag <q>    - Test terminal vector retrieval for <q>",
          "  spidey     - Toggle secret Spider-Verse alter ego mode",
          "  contact    - Reach out directly via email/LinkedIn",
          "  clear      - Clear the terminal screen",
          "  exit       - Close this terminal"
        );
        break;

      case "about":
        newLogs.push(
          "LOCHAN JANGID — Machine Learning Engineer & Educator",
          "Location: Jaipur, Rajasthan, India",
          "Company: REGEx Software Services",
          "Philosophy: 'Models are only the beginning. The real work is understanding the problem, preparing the data, making the system reliable, exposing it through an API, deploying it, and making sure someone can actually use it.'",
          "YouTube: Deep-teaching AI & ML from first principles."
        );
        break;

      case "youtube":
        newLogs.push(
          "YOUTUBE CHANNEL: Lochan Jangid (@lochanjangidcoder)",
          "Link: https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ",
          "Flagship: 'RAG: Zero to Hero | From Naive RAG to Advanced RAG' (79 mins)",
          "Mission: Teaching AI without frameworks hiding the implementation."
        );
        break;

      case "projects":
        newLogs.push(
          "01. WebLens AI       - Multimodal Visual Audit Studio",
          "02. BankMarketer      - XGBoost + SHAP Explainability API",
          "03. MedicalAI         - DenseNet-121 CheXNet + Grad-CAM Heatmaps",
          "04. MNIST Classifier  - 784->286->120->10 PyTorch Network",
          "05. nanoCalc-GPT      - 1.2M Decoder Transformer solving Carry",
          "06. zero-sql          - DuckDB + Monaco Local Database Client",
          "07. Sanjeevni Clinic  - OPD Token & Acoustic Patient Dispatch",
          "08. See-House         - California Housing Random Forest API",
          "09. lochan_eda        - Open-Source Automated EDA on PyPI"
        );
        break;

      case "skills":
        newLogs.push(
          "CORE: Python, PyTorch, Scikit-Learn, Transformers, Linear Algebra",
          "SYSTEMS: FastAPI, Docker, FAISS Vector Search, DuckDB, SQL",
          "GENAI: RAG Architectures, Query Rewriting, RRF, Prompt Engineering",
          "FRONTEND: Next.js, React Three Fiber (WebGL), Web Audio API, Canvas"
        );
        break;

      case "rag":
        if (!args) {
          newLogs.push("Error: Please provide a query. Example: rag faiss indexing");
        } else {
          newLogs.push(
            `Vectorizing query: "${args}" via TF-IDF & Cosine Similarity...`,
            `Match #1 [0.932]: FAISS IndexFlatIP exact cosine search`,
            `Match #2 [0.864]: Modular RAG Reciprocal Rank Fusion`,
            `Inference latency: 1.42ms. Zero hallucinations detected.`
          );
        }
        break;

      case "spidey":
        newLogs.push("Activating Earth-616 Cybernetic Protocol...");
        if (onToggleSpidey) onToggleSpidey();
        break;

      case "contact":
        newLogs.push(
          "Email:    lochanjangidcoder@gmail.com",
          "LinkedIn: https://www.linkedin.com/in/lochanjangid/",
          "GitHub:   https://github.com/LochanJangid"
        );
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      default:
        newLogs.push(
          `Command not recognized: '${cmd}'. Type 'help' for available commands.`
        );
    }

    setLogs(newLogs);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative flex h-[82vh] w-full max-w-3xl flex-col rounded-3xl border border-cyan-500/30 bg-[#06080e] shadow-2xl font-mono text-xs overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#090d16] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 font-bold text-neutral-300">
              neural-cli // lochan@earth-616:~$
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-neutral-500">ESC to close</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-white/10 px-2 py-1 text-neutral-300 hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Terminal Log Output */}
        <div className="flex-1 overflow-y-auto p-5 space-y-1.5 text-neutral-300">
          {logs.map((log, index) => {
            const isUser = log.startsWith(">");
            return (
              <div
                key={index}
                className={isUser ? "text-cyan-400 font-bold" : "text-neutral-300"}
              >
                {log}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="flex items-center gap-2 border-t border-white/10 bg-[#090d16] px-4 py-3"
        >
          <span className="text-cyan-400 font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command ('help', 'rag faiss', 'projects', 'youtube')..."
            className="flex-1 bg-transparent text-cyan-200 placeholder-neutral-600 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded bg-cyan-500 px-3 py-1 font-bold text-black hover:bg-cyan-400"
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}
