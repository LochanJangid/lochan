"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "neural-lab", label: "AI Labs" },
  { id: "youtube-studio", label: "YouTube" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function SlimVerticalNav() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Slim Vertical Navigation (Left Edge Sticky Dock) */}
      <nav
        aria-label="Sidebar Navigation"
        className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 rounded-full border border-[#E5E5E5] bg-white/85 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-lg"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`group relative flex items-center justify-center rounded-full p-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8584D5] ${
                isActive
                  ? "bg-[#080808] text-white shadow-sm"
                  : "text-[#555555] hover:bg-[#F3F3F3] hover:text-[#080808]"
              }`}
              title={item.label}
              aria-label={`Scroll to ${item.label}`}
            >
              {/* Dot indicator */}
              <span
                className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-[#FFC568] scale-110"
                    : "bg-[#CCCCCC] group-hover:bg-[#8584D5]"
                }`}
              />

              {/* Tooltip Label on Hover / Active */}
              <span className="pointer-events-none absolute left-full ml-3.5 hidden rounded-xl bg-[#080808] px-3 py-1 font-display text-xs font-semibold text-white shadow-lg whitespace-nowrap group-hover:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Floating Bottom Dock */}
      <nav
        aria-label="Mobile Navigation"
        className="xl:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex max-w-[92vw] items-center gap-1 rounded-full border border-[#E5E5E5] bg-white/95 px-2.5 py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-md"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`rounded-full px-2.5 sm:px-3 py-1 font-display text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#080808] text-white shadow-sm"
                  : "text-[#555555] hover:text-[#080808]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
