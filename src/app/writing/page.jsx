"use client";

import { useState } from "react";
import Link from "next/link";
import VideoFacade from "../../components/VideoFacade";
import { writingArticles } from "../../../content/writing";
import { burstConfetti } from "../../utils/confetti";

export default function WritingIndexPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const allTags = [
    "All",
    ...Array.from(new Set(writingArticles.flatMap((a) => a.tags || []))),
  ];

  const filteredArticles =
    selectedTag === "All"
      ? writingArticles
      : writingArticles.filter((a) => a.tags?.includes(selectedTag));

  const handleTagClick = (tag, e) => {
    burstConfetti(e, ["📝", "✨", "🧠", "⚡"]);
    setSelectedTag(tag);
  };

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header section */}
      <div className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 font-handwriting text-2xl sm:text-3xl font-bold text-[var(--pink)] -rotate-1 mb-2">
          <span>Field notes, lecture sessions &amp; deep dives</span>
          <span className="text-xl">✍️</span>
        </div>

        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] tracking-tight">
          Writing &amp; Research Notes
        </h1>

        <div className="rainbow-bar mt-4 mb-5" aria-hidden="true" />

        <p className="max-w-2xl font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed">
          In-depth architectural breakdowns, lecture sessions, and implementation notes.
          Focused on building mathematically grounded, reliable machine learning systems from scratch.
        </p>

        {/* Filter chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={(e) => handleTagClick(tag, e)}
                className={`chip transition-all duration-200 ${
                  isSelected
                    ? "bg-[var(--sun)] text-[#1b1840] font-black border-[var(--ink)] shadow-[2px_2px_0_var(--shadow)]"
                    : "bg-[var(--card)] text-[var(--mute)] hover:text-[var(--ink)]"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid / List */}
      <div className="space-y-8">
        {filteredArticles.map((article, idx) => (
          <article
            key={article.slug}
            className="box relative bg-[var(--card)] p-6 sm:p-8 transition-transform hover:-translate-y-1"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-center">
              {/* Left col: Video Facade */}
              <div className="lg:col-span-5 overflow-hidden rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--shadow)]">
                <VideoFacade
                  youtubeId={article.youtubeId}
                  title={article.title}
                  duration={article.duration}
                />
              </div>

              {/* Right col: Content */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[var(--pink)] uppercase tracking-wider">
                      Entry {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-[var(--mute)]">✦</span>
                    <span className="font-mono text-xs text-[var(--mute)]">
                      {article.publishedAt}
                    </span>
                    <span className="text-xs text-[var(--mute)]">✦</span>
                    <span className="font-mono text-xs text-[var(--mute)]">
                      ⏱ {article.duration} ({Math.round(article.durationSeconds / 60)} min deep dive)
                    </span>
                  </div>

                  <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[var(--ink)] leading-snug">
                    <Link
                      href={`/writing/${article.slug}`}
                      className="hover:text-[var(--pink)] transition-colors underline-offset-4 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-3 font-sans text-sm sm:text-base text-[var(--mute)] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--ink)]/10 flex flex-wrap items-center justify-between gap-4">
                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {article.stack?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--ink)]/30 bg-[var(--bg)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--ink)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/writing/${article.slug}`}
                      onClick={(e) => burstConfetti(e, ["📖", "🧪", "✨"])}
                      className="btn-pill bg-[var(--sun)] text-[#1b1840] px-4 py-2 font-bold text-sm inline-flex items-center gap-1.5"
                    >
                      <span>Read Study Notes</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
