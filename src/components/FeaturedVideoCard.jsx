"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeaturedVideoCard({ article }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    `https://i.ytimg.com/vi/${article.youtubeId}/maxresdefault.jpg`
  );

  const embedUrl = `https://www.youtube-nocookie.com/embed/${article.youtubeId}?autoplay=1&rel=0`;

  return (
    <div className="group relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-[#E8E8E8] bg-white p-4 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]">
      {/* Decorative top-right corner arrow */}
      <a
        href={`https://www.youtube.com/watch?v=${article.youtubeId}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Open video on YouTube"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F7F7] text-[#080808] transition-all duration-200 hover:bg-[#8584D5] hover:text-white hover:rotate-45"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>

      {/* Featured Header Pill Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2 pr-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8A9F4] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#080808]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#080808]" />
          FEATURED MASTERCLASS
        </span>
        <span className="rounded-full bg-[#F0F0F0] px-3 py-1 font-mono text-[11px] font-semibold text-[#555555]">
          {article.chapters.length} CHAPTERS
        </span>
      </div>

      {/* Video Container (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#080808] shadow-inner">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={article.title}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play lecture: ${article.title}`}
            className="group/player relative block h-full w-full overflow-hidden text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8584D5]"
          >
            {/* High Quality Thumbnail Image */}
            <img
              src={imgSrc}
              alt={article.title}
              onError={() =>
                setImgSrc(`https://i.ytimg.com/vi/${article.youtubeId}/hqdefault.jpg`)
              }
              className="h-full w-full object-cover transition-transform duration-500 group-hover/player:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover/player:opacity-80" />

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-20 sm:h-20 sm:w-24 items-center justify-center rounded-2xl sm:rounded-3xl bg-[#8584D5] text-white shadow-[0_12px_32px_rgba(133,132,213,0.5)] transition-all duration-300 group-hover/player:scale-110 group-hover/player:bg-[#FFC568] group-hover/player:text-[#080808] group-hover/player:shadow-[0_12px_32px_rgba(255,197,104,0.6)]">
                <svg
                  className="ml-1 h-7 w-7 sm:h-9 sm:w-9 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Duration Badge Bottom Right */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/85 px-2.5 py-1 font-mono text-xs font-bold text-white shadow-md backdrop-blur-md">
              <svg className="h-3.5 w-3.5 text-[#FFC568]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{article.duration}</span>
            </div>

            {/* Bottom-left quick hint */}
            <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white/90 backdrop-blur-md">
              <span>Click to play session inline</span>
            </div>
          </button>
        )}
      </div>

      {/* Meta, Title & Description Below Video */}
      <div className="mt-5">
        <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight text-[#080808]">
          <Link
            href={`/writing/${article.slug}`}
            className="transition hover:text-[#8584D5]"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-2.5 font-sans text-sm sm:text-base leading-relaxed text-[#555555]">
          {article.summary}
        </p>

        {/* Stack Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.stack.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#F3F3F3] px-3 py-1 font-mono text-xs font-semibold text-[#080808]"
            >
              {item}
            </span>
          ))}
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#E5E5E5] bg-white px-2.5 py-1 font-mono text-xs text-[#555555]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Link Buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-3 pt-3 border-t border-[#F0F0F0]">
          <Link
            href={`/writing/${article.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#080808] px-5 py-2.5 font-display text-xs sm:text-sm font-bold text-white transition hover:bg-[#8584D5] hover:shadow-md"
          >
            <span>Read Architecture Study</span>
            <span aria-hidden="true">→</span>
          </Link>

          <a
            href={`https://www.youtube.com/watch?v=${article.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 font-display text-xs sm:text-sm font-semibold text-[#080808] transition hover:border-[#080808] hover:bg-[#F7F7F7]"
          >
            <span>YouTube</span>
            <span className="font-mono text-xs">↗</span>
          </a>

          {article.repoUrl && (
            <a
              href={article.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 font-display text-xs sm:text-sm font-semibold text-[#555555] transition hover:text-[#080808] hover:border-[#080808]"
            >
              <span>Colab Notebooks</span>
              <span className="font-mono text-xs">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
