"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const dot = document.querySelector(".cur-dot");
    const ring = document.querySelector(".cur-ring");

    if (!dot || !ring) return; // 🔥 prevent crash

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    document.addEventListener("mousemove", move);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="cur">
      <div className="cur-ring" />
      <div className="cur-dot" />
    </div>
  );
}