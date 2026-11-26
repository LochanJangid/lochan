"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { burstConfetti } from "../utils/confetti";
import { writingArticles } from "../../content/writing";

export default function VideosSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [showAllChapters, setShowAllChapters] = useState(false);
  const playerRef = useRef(null);

  const ragArticle = writingArticles[0] || {};
  const chapters = ragArticle.chapters || [];

  const featuredVideo = {
    id: ragArticle.youtubeId || "aenpTk8blIs",
    title: ragArticle.title || "RAG: Zero to Hero | From Naive RAG to Advanced RAG",
    duration: "79:21",
    publishedDate: "Nov 4, 2026",
    whyMade:
      "Made because no existing tutorial covered RAG from zero to advanced in an in-depth, first-principles teaching approach.",
    tags: ragArticle.tags || ["RAG", "RAGTutorial", "Python", "GenerativeAI", "LLM"],
    colabUrl:
      ragArticle.repoUrl ||
      "https://colab.research.google.com/drive/1mnmYSLZqQSMRXXdvdJdZJnml7_PHgJrC?usp=sharing",
    articleUrl: "/writing/rag-zero-to-hero",
    channelUrl: "https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ",
    subscribeUrl:
      "https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ?sub_confirmation=1",
  };

  const handlePlayClick = (e) => {
    burstConfetti(e, ["▶", "🍿", "🧠", "✨"]);
    setIsPlaying(true);
  };

  const handleChapterClick = (seconds, e) => {
    burstConfetti(e, ["⏱️", "▶", "⚡"]);
    setCurrentSeconds(seconds);
    setIsPlaying(true);
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="videos" className="mx-auto max-w-6xl px-4 sm:px-6 section-gap">
      {/* Section Header with Subscribe Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)]">
            // 01 // On The Channel
          </div>
          <h2 className="mt-1 font-sans text-3xl sm:text-4xl font-black text-[var(--ink)] tracking-tight">
            Teaching ML deeply from scratch
          </h2>
          <div className="rainbow-bar mt-3" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Subscribe Button */}
          <a
            href={featuredVideo.subscribeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => burstConfetti(e, ["📺", "⭐", "🎉", "🔔"])}
            className="btn-pill bg-[#ff0000] text-white px-5 py-2.5 text-xs sm:text-sm font-black shadow-[3px_3px_0_var(--shadow)] hover:bg-[#cc0000] inline-flex items-center gap-2"
          >
            <span className="text-base leading-none">▶</span>
            <span>Subscribe on YouTube</span>
          </a>

          <a
            href={featuredVideo.channelUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => burstConfetti(e, ["📺", "⭐", "🎉"])}
            className="btn-pill btn-primary px-5 py-2.5 text-xs sm:text-sm self-start sm:self-auto"
          >
            Visit @lochanjangidcoder ↗
          </a>
        </div>
      </div>

      <p className="max-w-2xl font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed mb-8">
        No black-box framework wrappers. We build vector indexes, sparse retrieval engines, and
        transformer attention line-by-line so you master machine learning mechanics from the ground up.
      </p>

      {/* Main Grid: Featured Video Card (Left/Main) & Secondary Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Featured Video (8 cols) */}
        <div className="lg:col-span-8 box p-5 sm:p-7 bg-[var(--card)] flex flex-col">
          {/* Card Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[var(--ink)]/15 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wide text-[var(--ink)]">
                PUBLISHED // {featuredVideo.publishedDate}
              </span>
            </div>
            <span className="rounded-full border border-[var(--ink)] bg-[var(--sun)] px-2.5 py-0.5 font-mono text-xs font-black text-[#1b1840]">
              ⏱ {featuredVideo.duration} (~79 min)
            </span>
          </div>

          {/* Click-to-load Facade & In-Place Video Player Frame */}
          <div
            ref={playerRef}
            id="featured-video-player"
            className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-[var(--ink)] bg-black shadow-[3px_3px_0_var(--shadow)]"
          >
            {isPlaying ? (
              <iframe
                key={currentSeconds}
                src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?autoplay=1&start=${currentSeconds}&rel=0`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={handlePlayClick}
                aria-label={`Play ${featuredVideo.title}`}
                className="group relative h-full w-full cursor-pointer overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--periwinkle)]"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${featuredVideo.id}/hqdefault.jpg`}
                  alt={featuredVideo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                {/* Big Pill Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="btn-pill flex items-center gap-3 bg-[var(--sun)] px-6 py-3 text-[#1b1840] shadow-[4px_4px_0_var(--shadow)] transition-transform group-hover:scale-110">
                    <span className="text-xl">▶</span>
                    <span className="font-sans text-sm sm:text-base font-black tracking-wide">
                      WATCH TUTORIAL
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 rounded-md bg-black/80 px-2.5 py-1 font-mono text-xs text-white">
                  Click to load video (privacy friendly)
                </div>
              </button>
            )}
          </div>

          {/* Video Title & Why It Was Made */}
          <h3 className="mt-5 font-sans text-xl sm:text-2xl font-black text-[var(--ink)] leading-snug">
            {featuredVideo.title}
          </h3>
          <p className="mt-2.5 font-sans text-sm sm:text-base text-[var(--mute)] leading-relaxed">
            <strong className="text-[var(--ink)] font-bold">Why it was made:</strong>{" "}
            {featuredVideo.whyMade}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {featuredVideo.tags.map((tag) => (
              <span
                key={tag}
                className="chip bg-[var(--periwinkle)]/20 text-[var(--ink)] text-xs font-bold"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactive Chapters List that seeks directly inside the website player frame */}
          {chapters.length > 0 && (
            <div className="mt-6 rounded-2xl border-2 border-[var(--ink)]/20 bg-[var(--bg)] p-4 sm:p-5">
              <div className="flex items-center justify-between border-b-2 border-[var(--ink)]/15 pb-2.5 mb-3">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[var(--ink)]">
                  // Lesson Timeline &amp; Chapters ({chapters.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowAllChapters(!showAllChapters)}
                  className="font-mono text-xs font-bold text-[var(--ink)] underline hover:text-[var(--pink)] cursor-pointer"
                >
                  {showAllChapters ? "Collapse ↑" : "Show All ↓"}
                </button>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {(showAllChapters ? chapters : chapters.slice(0, 6)).map((ch, i) => {
                  const isActive = isPlaying && currentSeconds === ch.seconds;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => handleChapterClick(ch.seconds, e)}
                      title={`Jump to ${ch.time} in video frame`}
                      className={`w-full flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-xs text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-[var(--sun)] text-[#1b1840] font-black shadow-[2px_2px_0_var(--shadow)]"
                          : "hover:bg-[var(--card)] text-[var(--ink)]"
                      }`}
                    >
                      <span className="font-mono font-bold shrink-0">{ch.time}</span>
                      <span className="flex-1 font-sans truncate">{ch.title}</span>
                      <span className="font-mono text-[11px] font-bold text-[var(--pink)] shrink-0">
                        {isActive ? "● PLAYING" : "▶ JUMP"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Links Row */}
          <div className="mt-6 pt-4 border-t-2 border-[var(--ink)]/15 flex flex-wrap items-center gap-3">
            <Link
              href={featuredVideo.articleUrl}
              className="btn-pill btn-secondary px-4 py-2 text-xs sm:text-sm font-bold"
            >
              📖 Field Notes &amp; Code
            </Link>

            <a
              href={featuredVideo.colabUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-pill btn-secondary px-4 py-2 text-xs sm:text-sm font-bold"
            >
              ⚡ Colab Notebook ↗
            </a>
          </div>
        </div>

        {/* Secondary Cards (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card 2: MNIST Digit Recognition Project Showcase */}
          <div className="box box-sun box-tilt-right p-5 sm:p-6 text-[#1b1840]">
            <div className="flex items-center justify-between border-b-2 border-[#1b1840]/20 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1b1840]">
                PROJECT SHOWCASE // #02
              </span>
              <span className="rounded-full border border-[#1b1840] bg-[#1b1840] px-2 py-0.5 font-mono text-xs font-bold text-[var(--sun)]">
                SHIPPED
              </span>
            </div>

            <div className="mt-4">
              <span className="text-3xl" aria-hidden="true">
                ✏️
              </span>
              <h4 className="mt-2 font-sans text-xl font-black text-[#1b1840]">
                MNIST Digit Recognition | Project Showcase
              </h4>
              <p className="mt-2 font-sans text-xs sm:text-sm text-[#1b1840] leading-relaxed">
                Draw a digit on a 28×28 web canvas, a trained neural network transforms it into 784
                numerical features and predicts the digit class in real time.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-xs">
                <span className="rounded-md border border-[#1b1840] bg-white/80 px-2 py-0.5 font-bold text-[#1b1840]">
                  PyTorch
                </span>
                <span className="rounded-md border border-[#1b1840] bg-white/80 px-2 py-0.5 font-bold text-[#1b1840]">
                  FastAPI
                </span>
                <span className="rounded-md border border-[#1b1840] bg-white/80 px-2 py-0.5 font-bold text-[#1b1840]">
                  Next.js
                </span>
                <span className="rounded-md border border-[#1b1840] bg-white/80 px-2 py-0.5 font-bold text-[#1b1840]">
                  Canvas API
                </span>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-[#1b1840]/20 flex flex-wrap items-center gap-3">
                <Link
                  href="/work/mnist#demo"
                  className="font-mono text-xs font-black underline hover:no-underline text-[#1b1840]"
                >
                  Try Live Drawing Canvas →
                </Link>
                <Link
                  href="/work/mnist"
                  className="font-mono text-xs font-bold text-[#1b1840] hover:underline"
                >
                  Case Study →
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Teaching Philosophy */}
          <div className="box box-aqua box-tilt-left p-5 sm:p-6 text-[#1b1840]">
            <div className="flex items-center justify-between border-b-2 border-[#1b1840]/20 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1b1840]">
                METHODOLOGY // FROM FIRST PRINCIPLES
              </span>
              <span className="rounded-full border border-[#1b1840] bg-white px-2 py-0.5 font-mono text-xs font-bold text-[#1b1840]">
                FIRST PRINCIPLES
              </span>
            </div>

            <div className="mt-4">
              <span className="text-3xl" aria-hidden="true">
                📐
              </span>
              <h4 className="mt-2 font-sans text-xl font-black text-[#1b1840]">
                Every Project Becomes a Video
              </h4>
              <p className="mt-2 font-sans text-xs sm:text-sm text-[#1b1840] leading-relaxed">
                Teaching from scratch with mathematical rigor: abstract algebra, real analysis, and
                calculus applied directly to tensor operations and production code.
              </p>
              <div className="mt-4 pt-3 border-t-2 border-[#1b1840]/20 flex flex-wrap items-center gap-3">
                <a
                  href={featuredVideo.subscribeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-black underline hover:no-underline text-[#1b1840]"
                >
                  🔔 Subscribe to Lochan Jangid on YouTube ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
