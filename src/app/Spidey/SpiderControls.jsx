"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { spiderAudio } from "./spiderAudio";

export default function SpiderControls({ onExit }) {
  const [muted, setMuted] = useState(false);
  const [currentSpideyState, setCurrentSpideyState] = useState("ROAM");
  const [webLines, setWebLines] = useState([]);
  const [comicPops, setComicPops] = useState([]);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Poll Spidey state from bridge
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.__LOCHAN_SPIDEY_ACTIONS__) {
        const state = window.__LOCHAN_SPIDEY_ACTIONS__.state;
        if (state) setCurrentSpideyState(state);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Contextual web shoot on click (when not clicking links or buttons)
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest("a, button, input, textarea, select, [role='button']")) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      spiderAudio.playThwip();

      // Trigger Pixel Spidey to shoot web towards clicked point if nearby
      if (typeof window !== "undefined" && window.__LOCHAN_SPIDEY_ACTIONS__?.requestWebAt) {
        window.__LOCHAN_SPIDEY_ACTIONS__.requestWebAt({ x, y, name: "interactive-click" });
      }

      // Add temporary visual web ray
      const id = Date.now() + Math.random();
      const originX = window.innerWidth * 0.5;
      const originY = 0; // Anchored to top
      setWebLines((prev) => [...prev, { id, originX, originY, targetX: x, targetY: y }]);

      // Add floating comic sound badge ("THWIP!")
      const popId = id + 1;
      const onomatopoeiaList = ["THWIP!", "ZIP!", "SNAP!", "FWIP!"];
      const text = onomatopoeiaList[Math.floor(Math.random() * onomatopoeiaList.length)];
      setComicPops((prev) => [...prev, { id: popId, x, y, text }]);

      // Clear after short duration
      setTimeout(() => {
        setWebLines((prev) => prev.filter((w) => w.id !== id));
      }, 500);

      setTimeout(() => {
        setComicPops((prev) => prev.filter((p) => p.id !== popId));
      }, 750);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Action dispatcher
  const commandSpidey = useCallback((action) => {
    const actions = typeof window !== "undefined" ? window.__LOCHAN_SPIDEY_ACTIONS__ : null;
    if (!actions) return;

    switch (action) {
      case "ROAM":
        actions.roam?.();
        spiderAudio.playHudClick();
        break;
      case "JUMP":
        actions.jump?.();
        spiderAudio.playHudClick();
        break;
      case "SHOOT":
        actions.shoot?.();
        spiderAudio.playThwip();
        break;
      case "SWING":
        actions.swing?.();
        spiderAudio.playThwip();
        break;
      case "FLY":
        actions.fly?.();
        spiderAudio.playHudClick();
        break;
      case "CLIMB":
        actions.climb?.();
        spiderAudio.playHudClick();
        break;
      default:
        break;
    }
  }, []);

  // Keyboard shortcut controls for all 6 Spidey movement mechanics
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is inside an input or typing
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        commandSpidey("JUMP");
      } else if (e.key === "r" || e.key === "R") {
        commandSpidey("ROAM");
      } else if (e.key === "w" || e.key === "W") {
        commandSpidey("SHOOT");
      } else if (e.key === "s" || e.key === "S") {
        commandSpidey("SWING");
      } else if (e.key === "f" || e.key === "F") {
        commandSpidey("FLY");
      } else if (e.key === "c" || e.key === "C") {
        commandSpidey("CLIMB");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandSpidey]);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    spiderAudio.setMuted(nextMuted);
    if (!nextMuted) spiderAudio.playHudClick();
  };

  const navLinks = [
    { label: "MISSIONS", href: "#missions" },
    { label: "ARCHIVE", href: "#archive" },
    { label: "DOSSIER", href: "#dossier" },
    { label: "DEBRIEF", href: "#contact" },
  ];

  const hudActions = [
    { id: "ROAM", label: "ROAM", key: "R", color: "hover:bg-emerald-600 hover:border-emerald-500", activeBg: "bg-emerald-600/30 border-emerald-400 text-emerald-300" },
    { id: "JUMP", label: "JUMP", key: "Space", color: "hover:bg-red-600 hover:border-red-500", activeBg: "bg-red-600/30 border-red-400 text-red-300" },
    { id: "SHOOT", label: "SHOOT", key: "W", color: "hover:bg-amber-600 hover:border-amber-500", activeBg: "bg-amber-600/30 border-amber-400 text-amber-300" },
    { id: "SWING", label: "SWING", key: "S", color: "hover:bg-blue-600 hover:border-blue-500", activeBg: "bg-blue-600/30 border-blue-400 text-blue-300" },
    { id: "FLY", label: "FLY", key: "F", color: "hover:bg-purple-600 hover:border-purple-500", activeBg: "bg-purple-600/30 border-purple-400 text-purple-300" },
    { id: "CLIMB", label: "CLIMB", key: "C", color: "hover:bg-sky-600 hover:border-sky-500", activeBg: "bg-sky-600/30 border-sky-400 text-sky-300" },
  ];

  return (
    <>
      {/* STICKY TOP HUD HEADER BAR */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-red-500/20 bg-[#030614]/90 backdrop-blur-xl px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between text-white select-none">
        
        {/* Brand / Sector Identifier */}
        <div className="flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/60 bg-red-950/40 font-mono text-sm font-black text-red-400 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(239,68,68,0.3)]">
              🕷
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-wider text-white">
                LOCHAN JANGID
              </span>
              <span className="font-mono text-[8px] tracking-widest text-red-400">
                SPIDER-VERSE PROTOCOL // 616
              </span>
            </div>
          </a>
        </div>

        {/* Section Navigation Links (Desktop) */}
        <nav aria-label="Spider-Verse navigation" className="hidden md:flex items-center gap-6 font-mono text-xs text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => spiderAudio.playHudClick()}
              className="hover:text-red-400 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Tools: Sound Toggle + Mobile Nav Button + Return to Formal */}
        <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-xs">
          {/* Audio Mute/Unmute */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Unmute audio effects" : "Mute audio effects"}
            className="p-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-neutral-300 transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            title={muted ? "Unmute SFX" : "Mute SFX"}
          >
            {muted ? "🔇" : "🔊"}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-neutral-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          {/* Exit to Formal Portfolio */}
          <button
            type="button"
            onClick={() => {
              spiderAudio.playDimensionalGlitch();
              onExit();
            }}
            className="group flex items-center gap-2 rounded-full border border-red-500/60 bg-red-950/40 px-3 sm:px-4 py-1.5 text-xs font-bold text-red-300 hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span className="hidden sm:inline">FORMAL PORTFOLIO</span>
            <span className="sm:hidden">FORMAL</span>
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[57px] inset-x-0 z-40 bg-[#030614]/95 border-b border-red-500/30 backdrop-blur-2xl p-4 flex flex-col gap-3 font-mono text-sm select-none">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                spiderAudio.playHudClick();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-red-500 hover:bg-red-950/30 text-neutral-200 transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* DOCKED SPIDEY TELEMETRY & MOVEMENT CONTROLS (BOTTOM-RIGHT) */}
      <aside
        aria-label="Spider-Man movement telemetry and controls"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto"
      >
        {hudCollapsed ? (
          /* MINIMIZED HUD PILL */
          <button
            type="button"
            onClick={() => {
              spiderAudio.playHudClick();
              setHudCollapsed(false);
            }}
            className="group flex items-center gap-2 rounded-full border border-red-500/60 bg-[#060b20]/95 px-3.5 py-1.5 font-mono text-[10px] font-bold text-red-400 shadow-xl backdrop-blur-md hover:border-red-400 hover:bg-red-950/60 transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            title="Expand Spider-Man Controls & Telemetry"
          >
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>HUD // {currentSpideyState}</span>
            <span className="text-neutral-400 group-hover:text-white transition">▲</span>
          </button>
        ) : (
          /* EXPANDED TELEMETRY HUD PANEL */
          <div className="rounded-xl border border-red-500/40 bg-[#060b20]/95 p-3.5 shadow-2xl backdrop-blur-md font-mono text-[10px] w-[290px] sm:w-[320px] transition-all">
            {/* Header with Live State and Minimize Button */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 font-bold tracking-wider">TELEMETRY</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-500/40 text-red-300 font-bold">
                  {currentSpideyState}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    spiderAudio.playHudClick();
                    setHudCollapsed(true);
                  }}
                  aria-label="Minimize telemetry panel"
                  className="px-1.5 py-0.5 rounded border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white transition"
                  title="Minimize HUD"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* Subtext info */}
            <div className="text-[9px] text-neutral-400 mb-2.5 flex items-center justify-between">
              <span>MANUAL PHYSICS COMMANDS</span>
              <span className="text-red-400/80">CLICK / HOTKEYS</span>
            </div>

            {/* 6 Grid Movement Action Buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              {hudActions.map((action) => {
                const isActive = currentSpideyState === action.id;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => commandSpidey(action.id)}
                    className={`px-2 py-1.5 rounded border text-left flex flex-col justify-between transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400 ${
                      isActive
                        ? action.activeBg
                        : `border-white/15 bg-white/5 text-neutral-300 ${action.color}`
                    }`}
                  >
                    <span className="font-bold text-[10px] leading-tight">{action.label}</span>
                    <span className="text-[8px] text-neutral-400 opacity-80">[{action.key}]</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </aside>

      {/* DYNAMIC WEB CLICK RAYS */}
      {webLines.map((line) => {
        const dx = line.targetX - line.originX;
        const dy = line.targetY - line.originY;
        const length = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        return (
          <div
            key={line.id}
            className="fixed pointer-events-none z-50 origin-left"
            style={{
              left: line.originX,
              top: line.originY,
              width: length,
              height: 2,
              transform: `rotate(${angle}rad)`,
              background: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(0,229,255,0.85))",
              boxShadow: "0 0 10px #00e5ff",
            }}
          />
        );
      })}

      {/* FLOATING COMIC ONOMATOPOEIA POPUPS ("THWIP!") */}
      {comicPops.map((pop) => (
        <div
          key={pop.id}
          className="fixed pointer-events-none z-50 font-black tracking-widest text-amber-300 font-sans text-sm -translate-x-1/2 -translate-y-1/2 select-none animate-ping"
          style={{
            left: pop.x,
            top: pop.y - 14,
            textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 2px -1px 0 #ff0055, -1px 2px 0 #00e5ff",
          }}
        >
          {pop.text}
        </div>
      ))}
    </>
  );
}
