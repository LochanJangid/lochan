"use client";

import { useState } from "react";

export default function VideoFacade({
  youtubeId,
  title,
  duration,
  className = "",
  spideyMode = false,
  startSeconds = 0,
  isPlaying: externalIsPlaying,
  onPlay,
}) {
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const isPlaying =
    externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;

  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const startParam = startSeconds > 0 ? `start=${startSeconds}&` : "";
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?${startParam}autoplay=1&rel=0`;

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay();
    } else {
      setInternalIsPlaying(true);
    }
  };

  if (isPlaying) {
    return (
      <div
        className={`relative w-full aspect-video overflow-hidden rounded-md border ${
          spideyMode
            ? "border-red-600/50 bg-black shadow-[0_0_24px_rgba(220,38,38,0.3)]"
            : "border-neutral-300 bg-black shadow-sm"
        } ${className}`}
      >
        <iframe
          key={`${youtubeId}-${startSeconds}`}
          src={embedUrl}
          title={title}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlayClick}
      aria-label={`Play video: ${title}`}
      className={`group relative block w-full aspect-video overflow-hidden rounded-md border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        spideyMode
          ? "border-white/15 bg-black/80 focus-visible:ring-red-500 focus-visible:ring-offset-black"
          : "border-neutral-300 bg-neutral-900 focus-visible:ring-neutral-900 focus-visible:ring-offset-white"
      } ${className}`}
    >
      {/* Thumbnail image (plain img - zero pre-click iframe/network overhead) */}
      <img
        src={thumbnailUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105"
      />

      {/* Dimming gradient overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          spideyMode
            ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-75"
            : "bg-black/35 group-hover:bg-black/25"
        }`}
      />

      {/* Centered Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`flex h-9 w-12 sm:h-11 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl shadow-md transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 ${
            spideyMode
              ? "bg-red-600/90 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] group-hover:bg-red-500"
              : "bg-[var(--sun)] text-[#1b1840] border-2 border-[var(--ink)] shadow-[2px_2px_0_var(--shadow)] group-hover:scale-110"
          }`}
        >
          <svg
            className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Duration Badge */}
      {duration && (
        <span
          className={`absolute bottom-2 right-2 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider ${
            spideyMode
              ? "border border-red-500/40 bg-black/90 text-red-300"
              : "bg-black/80 text-white"
          }`}
        >
          {duration}
        </span>
      )}
    </button>
  );
}
