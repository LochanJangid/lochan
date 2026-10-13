"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* =========================================================
   3D PROCEDURAL SKYLINE (WebGL / Three.js)
   ========================================================= */

function BuildingColumn({ position, size, windowColor, isHero = false }) {
  const meshRef = useRef();
  const [width, height, depth] = size;

  // Window grid lines texture using canvas
  const windowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, 64, 128);

    // Random illuminated windows
    for (let y = 4; y < 124; y += 8) {
      for (let x = 4; x < 60; x += 8) {
        if (Math.random() > 0.45) {
          ctx.fillStyle = Math.random() > 0.3 ? windowColor : "#ff2a5f";
          ctx.fillRect(x, y, 4, 5);
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, Math.max(1, Math.floor(height / 2)));
    return texture;
  }, [height, windowColor]);

  return (
    <group position={position}>
      {/* Building Body */}
      <mesh ref={meshRef} position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#080e1e"
          roughness={0.8}
          metalness={0.2}
          map={windowTexture || undefined}
        />
      </mesh>

      {/* Roof Spire / Antenna with Blinking Red Aircraft Light */}
      <mesh position={[0, height + 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 1.2, 8]} />
        <meshBasicMaterial color="#ff1744" />
      </mesh>
      <pointLight
        position={[0, height + 1.2, 0]}
        intensity={0.6}
        distance={4}
        color="#ff1744"
      />
    </group>
  );
}

function CitySkylineScene({ pointerX = 0, pointerY = 0 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Parallax damping
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointerX * 0.12,
      delta * 2.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointerY * 0.05,
      delta * 2.5
    );
  });

  // Procedural skyline layout
  const buildings = useMemo(() => {
    const list = [];
    const colors = ["#38bdf8", "#0284c7", "#fef08a", "#ff2a5f"];

    // Background silhouettes (Z = -14 to -8)
    for (let i = -14; i <= 14; i += 2.4) {
      const h = 7 + Math.sin(i * 1.5) * 3 + Math.random() * 2.5;
      list.push({
        id: `bg-${i}`,
        position: [i * 1.3, -3, -12 - Math.random() * 4],
        size: [1.8 + Math.random() * 0.8, h, 1.8],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Midground skyscrapers (Z = -7 to -3)
    for (let i = -10; i <= 10; i += 3.2) {
      const h = 5 + Math.cos(i * 1.8) * 3 + Math.random() * 3.5;
      list.push({
        id: `mid-${i}`,
        position: [i * 1.4 + (Math.random() - 0.5), -3, -6 - Math.random() * 2],
        size: [2.2 + Math.random() * 0.9, h, 2.2],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    return list;
  }, []);

  // Floating dimensional particles
  const particleGeo = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Lighting: Spider-Verse red & blue rim */}
      <ambientLight intensity={0.35} color="#0a122c" />
      <directionalLight
        position={[-12, 10, 8]}
        intensity={2.2}
        color="#ff0055" // Electric red
      />
      <directionalLight
        position={[12, 8, 6]}
        intensity={2.4}
        color="#00a8ff" // Cobalt blue
      />
      <pointLight
        position={[0, 4, 2]}
        intensity={1.2}
        distance={20}
        color="#38bdf8"
      />

      {/* Buildings */}
      {buildings.map((b) => (
        <BuildingColumn
          key={b.id}
          position={b.position}
          size={b.size}
          windowColor={b.color}
        />
      ))}

      {/* Dimensional Ember Particles */}
      <points geometry={particleGeo}>
        <pointsMaterial
          size={0.14}
          color="#38bdf8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* =========================================================
   2D RESILIENT FALLBACK SKYLINE (Pure SVG/Canvas)
   ========================================================= */

function FallbackSkyline({ pointerX = 0, pointerY = 0 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#020617] via-[#050b24] to-[#010410]">
      {/* Searchlights */}
      <div
        className="absolute -bottom-20 left-1/4 h-[120vh] w-48 -rotate-12 bg-gradient-to-t from-red-600/20 via-red-500/05 to-transparent blur-2xl transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${pointerX * 40}px) rotate(-14deg)` }}
      />
      <div
        className="absolute -bottom-20 right-1/4 h-[120vh] w-56 rotate-12 bg-gradient-to-t from-blue-600/20 via-sky-500/05 to-transparent blur-2xl transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${pointerX * -40}px) rotate(14deg)` }}
      />

      {/* Layer 3: Far Silhouette */}
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[55%] opacity-40 transition-transform duration-500"
        style={{ transform: `translateX(${pointerX * -12}px)` }}
      >
        <path
          d="M0 400 L0 260 L40 260 L40 230 L80 230 L80 280 L140 280 L140 200 L180 200 L180 270 L240 270 L240 180 L290 180 L290 280 L360 280 L360 160 L420 160 L420 280 L490 280 L490 210 L540 210 L540 270 L620 270 L620 170 L680 170 L680 290 L760 290 L760 190 L820 190 L820 270 L900 270 L900 150 L960 150 L960 270 L1040 270 L1040 220 L1110 220 L1110 260 L1200 260 L1200 400 Z"
          fill="#060f2e"
        />
      </svg>

      {/* Layer 2: Midground Skyscrapers with windows */}
      <svg
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[65%] opacity-75 transition-transform duration-300"
        style={{ transform: `translateX(${pointerX * -24}px)` }}
      >
        <path
          d="M0 500 L0 320 L50 320 L50 250 L110 250 L110 320 L170 320 L170 210 L230 210 L230 310 L310 310 L310 180 L390 180 L390 310 L470 310 L470 240 L530 240 L530 330 L610 330 L610 190 L690 190 L690 320 L780 320 L780 230 L840 230 L840 310 L920 310 L920 170 L1000 170 L1000 320 L1080 320 L1080 260 L1150 260 L1150 320 L1200 320 L1200 500 Z"
          fill="#04091a"
        />
        {/* Glowing window dots */}
        <circle cx="200" cy="240" r="2.5" fill="#38bdf8" />
        <circle cx="215" cy="260" r="2.5" fill="#fef08a" />
        <circle cx="350" cy="210" r="2.5" fill="#ff2a5f" />
        <circle cx="370" cy="240" r="2.5" fill="#38bdf8" />
        <circle cx="650" cy="220" r="2.5" fill="#38bdf8" />
        <circle cx="670" cy="250" r="2.5" fill="#fef08a" />
        <circle cx="960" cy="200" r="2.5" fill="#ff2a5f" />
        <circle cx="980" cy="230" r="2.5" fill="#38bdf8" />
      </svg>

      {/* Layer 1: Foreground rooftops and antennas */}
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[75%] opacity-90 transition-transform duration-200"
        style={{ transform: `translateX(${pointerX * -36}px)` }}
      >
        <path
          d="M0 600 L0 390 L80 390 L80 310 L160 310 L160 390 L260 390 L260 280 L350 280 L350 400 L460 400 L460 330 L540 330 L540 410 L650 410 L650 290 L740 290 L740 410 L860 410 L860 320 L940 320 L940 400 L1040 400 L1040 300 L1130 300 L1130 400 L1200 400 L1200 600 Z"
          fill="#020510"
        />
        {/* Antennas with blinking lights */}
        <line x1="305" y1="280" x2="305" y2="240" stroke="#ff1744" strokeWidth="2" />
        <circle cx="305" cy="238" r="3" fill="#ff1744" className="animate-pulse" />
        <line x1="695" y1="290" x2="695" y2="250" stroke="#ff1744" strokeWidth="2" />
        <circle cx="695" cy="248" r="3" fill="#ff1744" className="animate-pulse" />
        <line x1="990" y1="300" x2="990" y2="260" stroke="#ff1744" strokeWidth="2" />
        <circle cx="990" cy="258" r="3" fill="#ff1744" className="animate-pulse" />
      </svg>
    </div>
  );
}

/* =========================================================
   EXPORTED SPIDER CITY CANVAS WITH DETECT & AUTO-FALLBACK
   ========================================================= */

export default function SpiderCityCanvas() {
  const [webglSupported, setWebglSupported] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    // Detect WebGL capability safely
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (gl && gl instanceof WebGLRenderingContext) {
        setWebglSupported(true);
      } else if (gl && typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext) {
        setWebglSupported(true);
      }
    } catch {
      setWebglSupported(false);
    }

    const handlePointerMove = (e) => {
      const px = (e.clientX / window.innerWidth - 0.5) * 2;
      const py = (e.clientY / window.innerHeight - 0.5) * 2;
      setPointer({ x: px, y: py });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {webglSupported && !reducedMotion ? (
        <Canvas
          camera={{ position: [0, 2.5, 9], fov: 48 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <CitySkylineScene pointerX={pointer.x} pointerY={pointer.y} />
        </Canvas>
      ) : (
        <FallbackSkyline pointerX={pointer.x} pointerY={pointer.y} />
      )}

      {/* Spider-Verse Halftone Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ef4444 1px, transparent 1px)",
          backgroundSize: "8px 8px, 16px 16px",
          backgroundPosition: "0 0, 4px 4px",
        }}
      />

      {/* Atmospheric Vignette & Color Gradients */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/50 to-[#02040b] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040b] via-[#02040b]/80 to-transparent pointer-events-none" />
    </div>
  );
}
