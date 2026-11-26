"use client";

import { useState } from "react";
import VideoFacade from "./VideoFacade";

export default function VideoPlayerSection({ article, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSeconds, setActiveSeconds] = useState(0);

  const handleSelectChapter = (seconds) => {
    setActiveSeconds(seconds);
    setIsPlaying(true);
  };

  return (
    <div className={className}>
      <VideoFacade
        youtubeId={article.youtubeId}
        title={article.title}
        duration={article.duration}
        startSeconds={activeSeconds}
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(true)}
      />

      <div className="mt-8 border-t border-[var(--ink)]/15 pt-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--pink)] font-bold">
              LECTURE TIMESTAMPS
            </span>
            <h3 className="mt-0.5 font-sans text-lg font-black text-[var(--ink)]">
              Chapters ({article.chapters.length})
            </h3>
          </div>
          <span className="font-mono text-xs text-[var(--mute)]">
            Click any row to jump to timestamp in player
          </span>
        </div>

        <div className="divide-y divide-[var(--ink)]/10 overflow-hidden rounded-xl border-2 border-[var(--ink)]/20 bg-[var(--bg)]">
          {article.chapters.map((chapter) => {
            const isActive = isPlaying && activeSeconds === chapter.seconds;

            return (
              <button
                key={chapter.seconds}
                type="button"
                onClick={() => handleSelectChapter(chapter.seconds)}
                aria-label={`Jump player to ${chapter.title} at ${chapter.time}`}
                className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 transition text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--periwinkle)] ${
                  isActive
                    ? "bg-[var(--sun)] text-[#1b1840] font-bold shadow-[inset_3px_0_0_var(--ink)]"
                    : "hover:bg-[var(--card)] text-[var(--ink)]"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-baseline gap-3">
                  <span
                    className={`shrink-0 font-mono text-xs font-bold ${
                      isActive ? "text-[#1b1840]" : "text-[var(--pink)]"
                    }`}
                  >
                    {chapter.time}
                  </span>
                  <span
                    className={`truncate font-sans text-sm ${
                      isActive ? "font-black text-[#1b1840]" : "text-[var(--ink)]"
                    }`}
                  >
                    {chapter.title}
                  </span>
                </div>

                <span
                  className={`shrink-0 rounded px-2 py-0.5 font-mono text-xs font-black ${
                    isActive
                      ? "bg-[#1b1840] text-[var(--sun)]"
                      : "text-[var(--mute)] group-hover:text-[var(--ink)]"
                  }`}
                >
                  {isActive ? "● PLAYING" : "▶ JUMP"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
