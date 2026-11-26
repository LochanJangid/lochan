import fs from "fs";
import path from "path";
import Link from "next/link";
import VideoPlayerSection from "../../../components/VideoPlayerSection";
import { writingArticles } from "../../../../content/writing";

const article = writingArticles.find((a) => a.slug === "rag-zero-to-hero");

export const metadata = {
  title: `${article.title} — Lochan Jangid`,
  description: article.metaDescription || article.summary,
  alternates: {
    canonical: `/writing/${article.slug}`,
  },
  openGraph: {
    title: article.title,
    description: article.metaDescription || article.summary,
    url: `/writing/${article.slug}`,
    type: "video.other",
    images: [
      {
        url: `https://i.ytimg.com/vi/${article.youtubeId}/hqdefault.jpg`,
        width: 480,
        height: 360,
        alt: article.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.metaDescription || article.summary,
    images: [`https://i.ytimg.com/vi/${article.youtubeId}/hqdefault.jpg`],
  },
};

function parseInlineTokens(text) {
  const regex = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith("[") && token.includes("](")) {
      const closeBracket = token.indexOf("]");
      const label = token.slice(1, closeBracket);
      const url = token.slice(closeBracket + 2, -1);
      parts.push({ type: "link", label, url });
    } else if (token.startsWith("`")) {
      parts.push({ type: "code", value: token.slice(1, -1) });
    } else if (token.startsWith("**")) {
      parts.push({ type: "bold", value: token.slice(2, -2) });
    } else if (token.startsWith("*")) {
      parts.push({ type: "italic", value: token.slice(1, -1) });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts;
}

function renderInlineContent(text) {
  const tokens = parseInlineTokens(text);
  return tokens.map((token, idx) => {
    switch (token.type) {
      case "link": {
        const isExternal =
          token.url.startsWith("http://") || token.url.startsWith("https://");
        return (
          <a
            key={idx}
            href={token.url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="text-[var(--pink)] underline decoration-[var(--pink)]/50 underline-offset-2 transition hover:decoration-[var(--pink)] font-medium"
          >
            {token.label}
          </a>
        );
      }
      case "code":
        return (
          <code
            key={idx}
            className="rounded border border-[var(--ink)]/20 bg-[var(--bg)] px-1.5 py-0.5 font-mono text-[13px] text-[var(--ink)] font-bold"
          >
            {token.value}
          </code>
        );
      case "bold":
        return (
          <strong key={idx} className="font-extrabold text-[var(--ink)]">
            {token.value}
          </strong>
        );
      case "italic":
        return (
          <em key={idx} className="italic text-[var(--ink)]">
            {token.value}
          </em>
        );
      default:
        return token.value;
    }
  });
}

function parseMarkdownBlocks(markdown) {
  const lines = markdown.split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      i++;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    // Paragraph: collect lines until empty line or special block
    const pLines = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("```") &&
      !lines[i].trim().startsWith("## ") &&
      !lines[i].trim().startsWith("### ") &&
      !lines[i].trim().startsWith("- ")
    ) {
      pLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", text: pLines.join(" ") });
  }

  return blocks;
}

export default function RagZeroToHeroPage() {
  const filePath = path.join(
    process.cwd(),
    "content",
    "writing",
    `${article.slug}.md`
  );

  let markdownContent = null;
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8").trim();
      if (raw.length > 0) {
        markdownContent = raw;
      }
    }
  } catch {
    markdownContent = null;
  }

  const clips = article.chapters.map((chapter, index) => {
    const nextChapter = article.chapters[index + 1];
    const endOffset = nextChapter ? nextChapter.seconds : 4761;
    return {
      "@type": "Clip",
      name: chapter.title,
      startOffset: chapter.seconds,
      endOffset,
      url: `https://www.youtube.com/watch?v=${article.youtubeId}&t=${chapter.seconds}s`,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: article.title,
    description: article.metaDescription || article.summary,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${article.youtubeId}/hqdefault.jpg`,
    ],
    uploadDate: article.publishedAt,
    duration: article.durationIso || "PT1H19M21S",
    embedUrl: `https://www.youtube-nocookie.com/embed/${article.youtubeId}`,
    hasPart: clips,
  };

  const parsedBlocks = markdownContent ? parseMarkdownBlocks(markdownContent) : null;
  const headings = parsedBlocks
    ? parsedBlocks.filter((b) => b.type === "h2").map((b) => b.text)
    : [];

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Schema.org VideoObject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb / Category header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--mute)]">
          <Link href="/" className="hover:text-[var(--pink)] transition-colors">
            lochan.dev
          </Link>
          <span>/</span>
          <Link href="/writing" className="hover:text-[var(--pink)] transition-colors">
            writing
          </Link>
          <span>/</span>
          <span className="text-[var(--ink)] font-bold">{article.slug}</span>
        </div>

        <span className="font-handwriting text-lg sm:text-xl font-bold text-[var(--pink)] -rotate-1">
          Lab Study Notes ✍️
        </span>
      </div>

      {/* Main Card Container */}
      <div className="box relative bg-[var(--card)] p-6 sm:p-10 md:p-12 mb-10">
        {/* Article Header */}
        <header className="border-b-2 border-[var(--ink)]/10 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block rounded-md border-2 border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-xs font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)]">
              RAG MASTERCLASS
            </span>
            <span className="font-mono text-xs font-bold text-[var(--mute)]">
              📅 {article.publishedAt}
            </span>
            <span className="text-xs text-[var(--mute)]">✦</span>
            <span className="font-mono text-xs font-bold text-[var(--mute)]">
              ⏱ {article.duration} (79 mins)
            </span>
            <span className="text-xs text-[var(--mute)]">✦</span>
            <span className="font-mono text-xs font-bold text-[var(--mute)]">
              📑 {article.chapters.length} Chapters
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="rainbow-bar mt-4 mb-5" aria-hidden="true" />

          <p className="font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-[70ch]">
            Learn <span className="marker-highlight">Retrieval-Augmented Generation</span> from scratch with Python in this comprehensive guide. We progress from <span className="marker-highlight">Naive RAG</span> to <span className="marker-highlight">Advanced &amp; Modular RAG</span>, examining vector indexing, sparse TF-IDF retrieval, and reciprocal rank fusion step by step.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Video Player & Timestamps Section */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)]">
                01 // Full Video Session &amp; Chapter Markers
              </span>
              <h2 className="font-sans text-2xl font-black text-[var(--ink)]">
                Lecture Recording
              </h2>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${article.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="btn-pill hidden sm:inline-flex items-center gap-1.5 bg-[var(--sun)] px-3.5 py-1.5 text-xs font-black text-[#1b1840]"
            >
              <span>Watch on YouTube</span>
              <span>↗</span>
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--shadow)] bg-[var(--card)] p-2 sm:p-4">
            <VideoPlayerSection article={article} />
          </div>
        </section>

        {/* Layout with sticky TOC on desktop and readable article content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main article content - comfortable 70ch width */}
          <div className="lg:col-span-8 max-w-[72ch]">
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)]">
                02 // Written Notes &amp; Implementation
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-[var(--ink)]">
                Architecture Study Notes
              </h2>
            </div>

            {parsedBlocks && parsedBlocks.length > 0 ? (
              <div className="space-y-6">
                {parsedBlocks.map((block, index) => {
                  switch (block.type) {
                    case "h2":
                      return (
                        <h2
                          key={index}
                          id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                          className="mt-10 pt-4 border-t-2 border-[var(--ink)]/10 font-sans text-2xl font-black text-[var(--ink)] first:mt-0 first:border-0"
                        >
                          {renderInlineContent(block.text)}
                        </h2>
                      );
                    case "h3":
                      return (
                        <h3
                          key={index}
                          className="mt-6 font-sans text-xl font-bold text-[var(--ink)]"
                        >
                          {renderInlineContent(block.text)}
                        </h3>
                      );
                    case "list":
                      return (
                        <ul
                          key={index}
                          className="my-4 space-y-2.5 pl-6 font-sans text-[15px] sm:text-base leading-relaxed text-[var(--ink)]"
                        >
                          {block.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="list-disc">
                              {renderInlineContent(item)}
                            </li>
                          ))}
                        </ul>
                      );
                    case "code":
                      return (
                        <div
                          key={index}
                          className="my-6 overflow-hidden rounded-2xl border-2 border-[var(--ink)] bg-[#0f0e21] shadow-[4px_4px_0_var(--shadow)]"
                        >
                          {block.lang && (
                            <div className="flex items-center justify-between border-b border-white/10 bg-[#171631] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--sun)]">
                              <span>{block.lang}</span>
                              <span className="text-[10px] text-white/50">Notebook Snippet</span>
                            </div>
                          )}
                          <pre className="overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed text-[#f0eeff]">
                            <code>{block.code}</code>
                          </pre>
                        </div>
                      );
                    case "p":
                    default:
                      return (
                        <p
                          key={index}
                          className="font-sans text-[15px] sm:text-base leading-relaxed text-[var(--ink)] opacity-90"
                        >
                          {renderInlineContent(block.text)}
                        </p>
                      );
                  }
                })}
              </div>
            ) : (
              <div className="box bg-[var(--bg)] p-8 text-center">
                <p className="font-mono text-xs font-bold text-[var(--pink)]">
                  STATUS // COMPANION WRITE-UP
                </p>
                <h3 className="mt-2 font-sans text-xl font-bold text-[var(--ink)]">
                  Write-up coming soon
                </h3>
                <p className="mt-2 font-sans text-sm text-[var(--mute)]">
                  The companion notes and Python implementation code for this session are currently in progress.
                </p>
              </div>
            )}

            {/* References */}
            {article.references && article.references.length > 0 && (
              <section className="mt-12 pt-8 border-t-2 border-[var(--ink)]/10">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)]">
                  03 // References &amp; Paper Citations
                </span>
                <h2 className="mt-1 font-sans text-2xl font-black text-[var(--ink)]">
                  Primary Literature
                </h2>

                <ul className="mt-4 space-y-2.5">
                  {article.references.map((ref) => (
                    <li key={ref.url} className="flex items-baseline gap-2">
                      <span className="text-[var(--pink)] font-bold">✦</span>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-sm sm:text-base text-[var(--ink)] underline decoration-[var(--pink)]/60 underline-offset-4 hover:decoration-[var(--pink)] font-medium"
                      >
                        {ref.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sticky Table of Contents on Desktop */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 box bg-[var(--bg)] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">📌</span>
                <h3 className="font-sans text-sm font-black uppercase tracking-wider text-[var(--ink)]">
                  Table of Contents
                </h3>
              </div>
              <nav className="space-y-2 font-mono text-xs">
                <a
                  href="#video-session"
                  className="block text-[var(--mute)] hover:text-[var(--ink)] hover:underline truncate"
                >
                  1. Lecture Recording
                </a>
                {headings.map((h, idx) => (
                  <a
                    key={idx}
                    href={`#${h.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="block text-[var(--mute)] hover:text-[var(--ink)] hover:underline truncate pl-2 border-l border-[var(--ink)]/20"
                  >
                    {idx + 2}. {h}
                  </a>
                ))}
                {article.repoUrl && (
                  <a
                    href={article.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block rounded-lg border border-[var(--ink)] bg-[var(--sun)] px-3 py-2 text-center font-bold text-[#1b1840] shadow-[2px_2px_0_var(--shadow)]"
                  >
                    Open Google Colab ↗
                  </a>
                )}
              </nav>
            </div>
          </aside>
        </div>

        {/* Footer Navigation */}
        <footer className="mt-12 pt-8 border-t-2 border-[var(--ink)]/10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/writing"
            className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-bold text-sm inline-flex items-center gap-2"
          >
            <span>← Back to Writing Archive</span>
          </Link>

          <Link
            href="/"
            className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-bold text-sm inline-flex items-center gap-2"
          >
            <span>Lab Notebook Home →</span>
          </Link>
        </footer>
      </div>
    </main>
  );
}
