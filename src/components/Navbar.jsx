"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { burstConfetti } from "../utils/confetti";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentTheme =
      document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(currentTheme);
  }, []);

  const toggleTheme = (e) => {
    burstConfetti(e, ["☀️", "🌙", "✨", "💫"]);
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (err) {
      // LocalStorage access might be restricted
    }
  };

  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-6xl px-4 sm:px-6">
      <nav
        aria-label="Main Navigation"
        className="box flex items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5 bg-[var(--card)]"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="group inline-flex items-center gap-1 font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--ink)] focus-visible:ring-2 focus-visible:ring-[var(--periwinkle)] rounded-lg"
        >
          <span>lochan</span>
          <span className="inline-block rounded-md border-2 border-[var(--ink)] bg-[var(--pink)] px-1.5 py-0.5 text-sm sm:text-base font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] transition-transform group-hover:rotate-6 group-hover:scale-105">
            .dev
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-mono text-sm font-bold text-[var(--ink)]">
          <Link
            href="/#videos"
            className="hover:text-[var(--periwinkle)] transition-colors underline-offset-4 hover:underline"
          >
            // Videos
          </Link>
          <Link
            href="/#projects"
            className="hover:text-[var(--periwinkle)] transition-colors underline-offset-4 hover:underline"
          >
            // Projects
          </Link>
          <Link
            href="/#story"
            className="hover:text-[var(--periwinkle)] transition-colors underline-offset-4 hover:underline"
          >
            // Story &amp; About
          </Link>
          <Link
            href="/writing"
            className="hover:text-[var(--periwinkle)] transition-colors underline-offset-4 hover:underline"
          >
            // Articles
          </Link>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="btn-pill flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-[var(--sun)] text-lg text-[#1b1840]"
            title={`Toggle theme (current: ${mounted ? theme : "light"})`}
          >
            {mounted && theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden btn-pill flex h-10 w-10 items-center justify-center bg-[var(--card)] text-[var(--ink)]"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mt-2 box md:hidden flex flex-col gap-3 p-4 bg-[var(--card)] font-mono text-sm font-bold text-[var(--ink)] animate-in fade-in slide-in-from-top-2">
          <Link
            href="/#videos"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 hover:bg-[var(--periwinkle)]/20"
          >
            // Videos
          </Link>
          <Link
            href="/#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 hover:bg-[var(--periwinkle)]/20"
          >
            // Projects
          </Link>
          <Link
            href="/#story"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 hover:bg-[var(--periwinkle)]/20"
          >
            // Story &amp; About
          </Link>
          <Link
            href="/writing"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 hover:bg-[var(--periwinkle)]/20"
          >
            // Articles
          </Link>
        </div>
      )}
    </header>
  );
}
