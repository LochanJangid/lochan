"use client";

import { useEffect, useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

const MILESTONES = {
  rag: {
    title: "First-Principles Thinker",
    desc: "Ran the From-Scratch RAG vector similarity simulator",
    icon: "🧠",
  },
  transformer: {
    title: "Attention Decoder",
    desc: "Discovered the target reversal arithmetic carry solution",
    icon: "⚡",
  },
  mnist: {
    title: "Neural Artist",
    desc: "Drew a digit on the 28×28 PyTorch classifier canvas",
    icon: "✏️",
  },
  medical: {
    title: "Clinical Inspector",
    desc: "Localized pathology with DenseNet Grad-CAM gradients",
    icon: "🩺",
  },
  youtube: {
    title: "YouTube Scholar",
    desc: "Explored the 80-minute deep-teaching lecture syllabus",
    icon: "📺",
  },
  spidey: {
    title: "Earth-616 Clearance",
    desc: "Discovered the secret Spider-Verse alter ego mode",
    icon: "🕷️",
  },
};

export default function DiscoveryTracker({ discoveries }) {
  const [toast, setToast] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const total = Object.keys(MILESTONES).length;
  const unlockedCount = Object.keys(discoveries).length;

  useEffect(() => {
    const latestKey = Object.keys(discoveries).pop();
    if (latestKey && MILESTONES[latestKey]) {
      const item = MILESTONES[latestKey];
      setToast(item);
      spiderAudio.playDiscoveryUnlock();
      const timer = setTimeout(() => setToast(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [discoveries]);

  return (
    <>
      {/* Toast Notification for newly unlocked discovery */}
      {toast && (
        <div className="fixed bottom-20 right-5 z-50 flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-white p-4 text-[#080808] shadow-[0_15px_40px_rgba(0,0,0,0.15)] animate-bounce">
          <span className="text-2xl">{toast.icon}</span>
          <div>
            <div className="font-mono text-[10px] font-bold text-[#8584D5] uppercase tracking-wider">
              ✦ DISCOVERY UNLOCKED!
            </div>
            <div className="font-display text-sm font-bold text-[#080808]">
              {toast.title}
            </div>
            <div className="font-sans text-xs text-[#555555]">
              {toast.desc}
            </div>
          </div>
        </div>
      )}

      {/* Floating Status Pill Button */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          type="button"
          onClick={() => {
            spiderAudio.playHudClick();
            setIsOpen(!isOpen);
          }}
          className="group flex items-center gap-2.5 rounded-full border border-[#E0E0E0] bg-white/95 px-4 py-2 font-mono text-xs font-bold text-[#080808] shadow-[0_8px_25px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all hover:border-[#8584D5] hover:scale-105"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                unlockedCount === total
                  ? "bg-[#10b981] animate-ping"
                  : "bg-[#8584D5] animate-pulse"
              }`}
            />
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                unlockedCount === total ? "bg-[#10b981]" : "bg-[#8584D5]"
              }`}
            />
          </span>
          <span>
            DISCOVERIES: {unlockedCount} / {total}
          </span>
          <span className="text-[#888888] group-hover:text-[#8584D5]">
            {isOpen ? "✕" : "▲"}
          </span>
        </button>

        {/* Popover drawer showing all milestones */}
        {isOpen && (
          <div className="mt-2 w-80 sm:w-96 rounded-2xl border border-[#E5E5E5] bg-white p-4 text-[#080808] shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2">
              <span className="font-mono text-xs font-bold text-[#8584D5] uppercase">
                Interactive Exploration Progress
              </span>
              <span className="font-mono text-xs text-[#666666]">
                {Math.round((unlockedCount / total) * 100)}% Complete
              </span>
            </div>

            <p className="mt-2 font-sans text-xs text-[#555555]">
              Interact with the live neural labs, draw on the canvas, test the transformer, and explore YouTube chapters to unlock all engineering clearances.
            </p>

            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
              {Object.entries(MILESTONES).map(([key, item]) => {
                const isUnlocked = Boolean(discoveries[key]);
                return (
                  <div
                    key={key}
                    className={`flex items-start gap-2.5 rounded-xl p-2.5 text-xs transition ${
                      isUnlocked
                        ? "bg-[#F0EFFE] border border-[#D5D3F7] text-[#080808]"
                        : "bg-[#F8F8F8] border border-[#EEEEEE] text-[#888888]"
                    }`}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold">
                          {item.title}
                        </span>
                        <span className="font-mono text-[9px] uppercase font-bold text-[#8584D5]">
                          {isUnlocked ? "✓ UNLOCKED" : "LOCKED"}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#666666] leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {unlockedCount === total && (
              <div className="mt-3 rounded-xl bg-[#080808] p-3 text-center font-display text-xs font-bold text-[#FFC568] shadow">
                🎉 All Discoveries Completed! Full Level-5 Clearance Granted.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
