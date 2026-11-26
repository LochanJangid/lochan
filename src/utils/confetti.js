/**
 * Lightweight Web Animations API emoji confetti burst (~14 particles, ~900ms)
 * Automatically respects prefers-reduced-motion.
 */

const DEFAULT_EMOJIS = ["✨", "🧪", "🚀", "💡", "⚡", "🤖", "🧬", "🎯", "⭐", "🎉"];

export function burstConfetti(eventOrCoords, customEmojis = DEFAULT_EMOJIS) {
  if (typeof window === "undefined") return;

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  let originX = window.innerWidth / 2;
  let originY = window.innerHeight / 2;

  if (eventOrCoords) {
    if (typeof eventOrCoords.clientX === "number" && typeof eventOrCoords.clientY === "number") {
      originX = eventOrCoords.clientX;
      originY = eventOrCoords.clientY;
    } else if (typeof eventOrCoords.x === "number" && typeof eventOrCoords.y === "number") {
      originX = eventOrCoords.x;
      originY = eventOrCoords.y;
    } else if (eventOrCoords.currentTarget && typeof eventOrCoords.currentTarget.getBoundingClientRect === "function") {
      const rect = eventOrCoords.currentTarget.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }
  }

  const count = 14;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.textContent = customEmojis[Math.floor(Math.random() * customEmojis.length)];
    el.style.position = "fixed";
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.fontSize = `${14 + Math.random() * 12}px`;
    el.style.pointerEvents = "none";
    el.style.zIndex = "99999";
    el.style.userSelect = "none";
    el.style.willChange = "transform, opacity";

    document.body.appendChild(el);

    const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
    const distance = 55 + Math.random() * 75;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 20; // slight upward bias
    const rot = (Math.random() - 0.5) * 360;

    const anim = el.animate(
      [
        {
          transform: "translate(-50%, -50%) translate(0px, 0px) scale(0.6) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translate(-50%, -50%) translate(${destX * 0.5}px, ${destY * 0.5 - 15}px) scale(1.2) rotate(${rot * 0.5}deg)`,
          opacity: 1,
          offset: 0.4,
        },
        {
          transform: `translate(-50%, -50%) translate(${destX}px, ${destY + 25}px) scale(0.8) rotate(${rot}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 900,
        easing: "cubic-bezier(0.2, 0.8, 0.4, 1)",
        fill: "forwards",
      }
    );

    anim.onfinish = () => {
      el.remove();
    };
  }
}
