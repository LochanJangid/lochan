"use client";

import { useEffect, useRef } from "react";
import SpiderControls from "./SpiderControls";
import SpiderHero from "./SpiderHero";
import SpiderMissions from "./SpiderMissions";
import SpiderTimeline from "./SpiderTimeline";
import SpiderDossier from "./SpiderDossier";
import SpiderDebrief from "./SpiderDebrief";

export default function SpiderExperience({ projects, onExit }) {
  const containerRef = useRef(null);

  // Scroll to top upon entry
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="spider-verse-experience fixed inset-0 z-30 overflow-y-auto overflow-x-hidden bg-[#02040b] text-white selection:bg-red-600 selection:text-white scroll-smooth"
    >
      {/* Spider-Verse Persistent Ambient Grid / Halftone Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ef4444 1px, transparent 1px)",
          backgroundSize: "12px 12px, 24px 24px",
          backgroundPosition: "0 0, 6px 6px",
        }}
      />

      {/* TOP NAVIGATION HUD, SOUND & CONTROLS */}
      <SpiderControls onExit={onExit} />

      {/* 1. CINEMATIC HERO SCENE */}
      <SpiderHero />

      {/* 2. MACHINE LEARNING MISSIONS */}
      <SpiderMissions />

      {/* 3. CLASSIFIED MISSION ARCHIVE (EXPERIENCE) */}
      <SpiderTimeline />

      {/* 4. CHARACTER DOSSIER (ABOUT ME & SKILLS) */}
      <SpiderDossier />

      {/* 5. MISSION DEBRIEF & SECURE COMMS (CONTACT) */}
      <SpiderDebrief onExitSpiderVerse={onExit} />
    </div>
  );
}
