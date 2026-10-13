"use client";

import { useEffect, useState } from "react";
import { spiderAudio } from "./spiderAudio";

export default function SpideyTransition({ rect, spideyMode, direction = "enter", onComplete }) {
  const [phase, setPhase] = useState("init"); // init -> web -> tear -> reveal -> complete
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 250);
      return () => clearTimeout(timer);
    }

    if (direction === "exit") {
      spiderAudio.playThwip();
      setPhase("exit-collapse");
      const t = setTimeout(() => {
        if (onComplete) onComplete();
      }, 450);
      return () => clearTimeout(t);
    }

    // Entering Spider-Man mode: 5-step signature transition
    spiderAudio.playThwip();
    setPhase("web");

    const t1 = setTimeout(() => {
      spiderAudio.playDimensionalGlitch();
      setPhase("tear");
    }, 180);

    const t2 = setTimeout(() => {
      setPhase("reveal");
    }, 520);

    const t3 = setTimeout(() => {
      setPhase("complete");
      if (onComplete) onComplete();
    }, 920);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [direction, onComplete]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none bg-[#02050f] transition-opacity duration-200 opacity-90" />
    );
  }

  // Handle Exit Transition
  if (direction === "exit") {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none bg-black/60 transition-opacity duration-300">
        <div
          className="absolute inset-0 bg-[#02050f] transform transition-transform duration-400 ease-in origin-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            animation: "reverseCollapse 420ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }}
        />
        <style jsx>{`
          @keyframes reverseCollapse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(0.05);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  const triggerX = rect && rect.width ? rect.left + rect.width / 2 : (typeof window !== "undefined" ? window.innerWidth / 2 : 200);
  const triggerY = rect && rect.height ? rect.top + rect.height / 2 : (typeof window !== "undefined" ? window.innerHeight / 2 : 200);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none">
      
      {/* 1. PAUSE & WEB SHOOT ANCHOR TO VIEWPORT */}
      {phase === "web" && (
        <svg className="absolute inset-0 w-full h-full">
          {/* Target Reticle */}
          <circle
            cx={triggerX}
            cy={triggerY}
            r="44"
            fill="none"
            stroke="#ff1744"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            className="animate-spin"
          />
          <circle cx={triggerX} cy={triggerY} r="7" fill="#00e5ff" />
          
          {/* Web Lines Anchored to Viewport Corners */}
          <line
            x1={triggerX}
            y1={triggerY}
            x2={0}
            y2={0}
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="8 4"
          />
          <line
            x1={triggerX}
            y1={triggerY}
            x2={typeof window !== "undefined" ? window.innerWidth : 1200}
            y2={0}
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="8 4"
          />
          <line
            x1={triggerX}
            y1={triggerY}
            x2={0}
            y2={typeof window !== "undefined" ? window.innerHeight : 800}
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="8 4"
          />
          <line
            x1={triggerX}
            y1={triggerY}
            x2={typeof window !== "undefined" ? window.innerWidth : 1200}
            y2={typeof window !== "undefined" ? window.innerHeight : 800}
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="8 4"
          />
        </svg>
      )}

      {/* 2 & 3. COMIC-BOOK PANEL TEAR & CHROMATIC DISTORTION */}
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-out ${
          phase === "init" || phase === "web"
            ? "scale-0 opacity-0"
            : phase === "tear"
            ? "scale-105 opacity-100"
            : "scale-150 opacity-0"
        }`}
      >
        {/* Diagonal Dimensional Rift Panel */}
        <div
          className="absolute inset-0 bg-[#02050f] transform -skew-x-12 origin-center"
          style={{
            boxShadow: "0 0 120px rgba(255, 0, 85, 0.9), 0 0 120px rgba(0, 229, 255, 0.9)",
          }}
        />

        {/* RGB Glitch Strips */}
        <div className="absolute inset-0 flex flex-col justify-around opacity-40">
          <div className="h-1.5 w-full bg-[#ff0055] translate-x-3" />
          <div className="h-2.5 w-full bg-[#00e5ff] -translate-x-4" />
          <div className="h-1.5 w-full bg-[#ff0055] translate-x-5" />
          <div className="h-2 w-full bg-[#00e5ff] -translate-x-3" />
        </div>

        {/* Halftone Dot Blast */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px), radial-gradient(#ff0055 2px, transparent 2px)",
            backgroundSize: "16px 16px, 32px 32px",
            backgroundPosition: "0 0, 8px 8px",
          }}
        />
      </div>

      {/* 4 & 5. CITY ENVIRONMENT REVEAL & INTERFACE ASSEMBLY */}
      <div
        className="absolute rounded-full transition-all duration-700 ease-out"
        style={{
          left: triggerX,
          top: triggerY,
          transform: `translate(-50%, -50%) scale(${phase === "reveal" || phase === "complete" ? 36 : 0.1})`,
          opacity: phase === "reveal" ? 0.95 : phase === "complete" ? 0 : 0.5,
          width: 80,
          height: 80,
          background: "radial-gradient(circle, #02050f 45%, #ff0055 75%, transparent 100%)",
          boxShadow: "0 0 80px rgba(0, 229, 255, 0.8)",
        }}
      />

      {/* Comic Action Tag */}
      {phase === "tear" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-black font-sans text-5xl sm:text-8xl tracking-widest text-amber-300 uppercase transform -rotate-6 select-none"
            style={{
              textShadow: "5px 5px 0 #000, -3px -3px 0 #ff0055, 5px -3px 0 #00e5ff",
            }}
          >
            ENTER THE SPIDER-VERSE!
          </span>
        </div>
      )}
    </div>
  );
}
