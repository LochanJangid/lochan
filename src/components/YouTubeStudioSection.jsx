"use client";

import { useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

const CHAPTERS = [
  { time: "00:00", title: "Introduction: Overcoming LLM Hallucinations with RAG", seconds: 0 },
  { time: "02:07", title: "RAG Architecture: Naive vs. Advanced vs. Modular", seconds: 127 },
  { time: "06:21", title: "Sparse Retrieval: TF-IDF Implementation", seconds: 381 },
  { time: "11:09", title: "Vector Normalization & FAISS Indexing", seconds: 669 },
  { time: "18:11", title: "Prompt Engineering & Context Augmentation", seconds: 1091 },
  { time: "23:42", title: "Chunk Optimization & Boundary Overlap", seconds: 1422 },
  { time: "39:58", title: "Advanced RAG: Query Rewriting & Expansion", seconds: 2398 },
  { time: "48:36", title: "Advanced RAG: Context Reranking & Noise Filtering", seconds: 2916 },
  { time: "58:14", title: "Modular RAG: Intent-Based Query Routing", seconds: 3494 },
  { time: "01:10:00", title: "Reciprocal Rank Fusion (RRF): Algorithm & Math", seconds: 4200 },
  { time: "01:15:32", title: "Lewis et al. (2020) Paper vs. 2023 Survey", seconds: 4532 },
];

const LECTURE_SERIES = [
  {
    number: "01",
    title: "RAG: Zero to Hero",
    status: "WATCH NOW",
    duration: "79 min",
    topics: ["TF-IDF", "FAISS", "Modular RAG", "RRF", "Groq LLaMA-3"],
    isCurrent: true,
  },
  {
    number: "02",
    title: "Decoder Transformers From Scratch",
    status: "IN PRODUCTION",
    duration: "65 min",
    topics: ["Multi-Head Attention", "Positional Encodings", "nanoCalc-GPT"],
    isCurrent: false,
  },
  {
    number: "03",
    title: "DenseNets & Grad-CAM Medical Vision",
    status: "COMING SOON",
    duration: "55 min",
    topics: ["NIH ChestX-ray14", "Feature Reuse", "Heatmap Math"],
    isCurrent: false,
  },
  {
    number: "04",
    title: "Writing & Publishing PyPI Packages",
    status: "COMING SOON",
    duration: "45 min",
    topics: ["lochan_eda", "Setup.py", "Packaging", "Distribution"],
    isCurrent: false,
  },
];

export default function YouTubeStudioSection({ onDiscovery }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);
  const [videoTimestamp, setVideoTimestamp] = useState(0);

  const youtubeId = "aenpTk8blIs";
  const channelUrl = "https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ";

  const handleSelectChapter = (chap) => {
    spiderAudio.playNeuralChirp(600);
    setActiveChapter(chap);
    setVideoTimestamp(chap.seconds);
    setIsPlaying(true);
    if (onDiscovery) onDiscovery("youtube");
  };

  const handlePlayClick = () => {
    spiderAudio.playMissionUnlock();
    setIsPlaying(true);
    if (onDiscovery) onDiscovery("youtube");
  };

  return (
    <section id="youtube-studio" className="mt-14 sm:mt-20">
      <div className="rounded-[32px] sm:rounded-[44px] border border-[#E8E8E8] bg-white p-6 sm:p-10 text-[#080808] shadow-sm">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#ECECEC] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#DC2626] font-bold tracking-widest uppercase">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#DC2626] animate-pulse" />
              <span>YOUTUBE DEEP-TEACHING CHANNEL // @lochanjangidcoder</span>
            </div>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#080808]">
              Teaching Machine Learning Deeply From Scratch
            </h3>
            <p className="mt-2 font-sans text-sm sm:text-base text-[#555555] max-w-2xl leading-relaxed">
              No black-box framework abstractions. We build the vector indexes, attention matrices, and deployment pipelines line-by-line so you understand how AI works down to the byte.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={channelUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => spiderAudio.playThwip()}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#DC2626] px-6 py-3 font-display text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-[#B91C1C] hover:scale-105 active:scale-95"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Subscribe on YouTube</span>
            </a>

            <a
              href="https://colab.research.google.com/drive/1mnmYSLZqQSMRXXdvdJdZJnml7_PHgJrC?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#E0E0E0] bg-[#F7F7F7] px-4 py-3 font-mono text-xs font-semibold text-[#080808] transition hover:bg-[#EAEAEA]"
            >
              <span>Open Colab Notebook</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Video Player & Interactive Chapter Navigator */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 items-start">
          {/* Main Video Viewport */}
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E8E8E8] bg-[#080808] shadow-md">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&start=${videoTimestamp}&rel=0`}
                  title="RAG: Zero to Hero | Lochan Jangid"
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={handlePlayClick}
                  className="group relative block h-full w-full overflow-hidden text-left focus:outline-none"
                  aria-label="Play RAG Zero to Hero Masterclass"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
                    alt="RAG Zero to Hero by Lochan Jangid"
                    onError={(e) => {
                      e.currentTarget.src = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors" />

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-20 sm:h-20 sm:w-24 items-center justify-center rounded-2xl bg-[#DC2626] text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#B91C1C]">
                      <svg className="ml-1 h-8 w-8 sm:h-10 sm:w-10 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-lg bg-black/85 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur-md">
                      79:21 FULL MASTERCLASS
                    </span>
                    <span className="rounded-lg bg-[#DC2626] px-3 py-1 font-mono text-xs font-bold text-white shadow">
                      CLICK TO PLAY ▷
                    </span>
                  </div>
                </button>
              )}
            </div>

            {/* Video Subtitle & Manifesto Quote */}
            <div className="mt-4 rounded-2xl border border-[#EEEEEE] bg-[#FAFAFA] p-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#666666]">
                <span className="text-[#DC2626] font-bold">CURRENT CHAPTER:</span>
                <span>{activeChapter.time}</span>
              </div>
              <h4 className="mt-1 font-display text-lg font-bold text-[#080808]">
                {activeChapter.title}
              </h4>
              <p className="mt-2 font-sans text-xs sm:text-sm text-[#555555] leading-relaxed italic">
                &ldquo;When you rely on high-level wrappers like LangChain, you are driving a car with a welded hood. When it breaks in production, you can&rsquo;t diagnose whether it&rsquo;s chunk overlap, cosine normalization, or reranker weights. We build it from scratch so you master the engine.&rdquo;
              </p>
            </div>
          </div>

          {/* Interactive Chapter Navigator (Light Theme) */}
          <div className="flex flex-col rounded-2xl sm:rounded-3xl border border-[#EAEAEA] bg-[#FAFAFA] p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
              <span className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider">
                Interactive Lecture Chapters ({CHAPTERS.length})
              </span>
              <span className="font-mono text-[11px] text-[#DC2626] font-bold">
                Click to Jump
              </span>
            </div>

            <div className="mt-3 space-y-1.5 max-h-[380px] overflow-y-auto pr-1 text-xs">
              {CHAPTERS.map((chap, idx) => {
                const isActive = activeChapter.time === chap.time;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectChapter(chap)}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl p-2.5 text-left transition-all ${
                      isActive
                        ? "bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] shadow-sm font-bold"
                        : "text-[#555555] hover:bg-white hover:text-[#080808]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className={`font-mono text-[11px] font-bold shrink-0 ${
                          isActive ? "text-[#DC2626]" : "text-[#888888]"
                        }`}
                      >
                        {chap.time}
                      </span>
                      <span className="truncate font-sans font-medium">
                        {chap.title}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-[#888888] shrink-0">
                      {isActive ? "▶ ACTIVE" : "JUMP →"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Future Roadmap / Syllabus Cards */}
        <div className="mt-10">
          <span className="font-mono text-xs font-bold text-[#888888] uppercase tracking-widest block mb-4">
            FROM-SCRATCH CURRICULUM &amp; ROADMAP
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LECTURE_SERIES.map((lecture) => (
              <div
                key={lecture.number}
                className={`flex flex-col justify-between rounded-2xl border p-4 transition-all duration-300 ${
                  lecture.isCurrent
                    ? "border-[#FCA5A5] bg-[#FEF2F2] shadow-sm"
                    : "border-[#EAEAEA] bg-[#FAFAFA] hover:border-[#D0D0D0] hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#DC2626]">
                      MODULE {lecture.number}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold ${
                        lecture.isCurrent
                          ? "bg-[#DC2626] text-white"
                          : "bg-[#EAEAEA] text-[#666666]"
                      }`}
                    >
                      {lecture.status}
                    </span>
                  </div>

                  <h5 className="mt-3 font-display text-base font-bold text-[#080808]">
                    {lecture.title}
                  </h5>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {lecture.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white border border-[#E5E5E5] px-2 py-0.5 font-mono text-[10px] text-[#555555]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex items-center justify-between font-mono text-xs text-[#666666]">
                  <span>Duration: {lecture.duration}</span>
                  {lecture.isCurrent && (
                    <span className="text-[#DC2626] font-bold">Watch Free ↗</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
