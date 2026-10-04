"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RED = "#dc2626";
const RED_DARK = "#7f1d1d";
const BLUE = "#172554";
const BLUE_DARK = "#0f172a";
const WHITE = "#f8fafc";

function createWebPattern(radius, radialCount, ringCount) {
  const positions = [];

  const pointOnDome = (theta, phi) => [
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta),
  ];

  for (let ray = 0; ray < radialCount; ray += 1) {
    const phi = (ray / radialCount) * Math.PI * 2;

    for (let step = 0; step < 18; step += 1) {
      const start = pointOnDome(
        0.08 + (1.42 * step) / 18,
        phi,
      );
      const end = pointOnDome(
        0.08 + (1.42 * (step + 1)) / 18,
        phi,
      );
      positions.push(...start, ...end);
    }
  }

  for (let ring = 1; ring <= ringCount; ring += 1) {
    const theta = (1.46 * ring) / (ringCount + 1);

    for (let step = 0; step < 48; step += 1) {
      const start = pointOnDome(
        theta,
        (step / 48) * Math.PI * 2,
      );
      const end = pointOnDome(
        theta,
        ((step + 1) / 48) * Math.PI * 2,
      );
      positions.push(...start, ...end);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  return geometry;
}

/* =========================================================
   SPIDEY HERO
   ========================================================= */

function SpideyHero({ bridgeRef }) {
  const root = useRef(null);
  const maskWeb = useMemo(
    () => createWebPattern(0.446, 10, 5),
    [],
  );
  const chestWeb = useMemo(
    () => createWebPattern(1.012, 8, 4),
    [],
  );

  const torso = useRef(null);
  const chest = useRef(null);
  const head = useRef(null);

  const leftUpperArm = useRef(null);
  const leftForeArm = useRef(null);

  const rightUpperArm = useRef(null);
  const rightForeArm = useRef(null);

  const leftThigh = useRef(null);
  const leftShin = useRef(null);

  const rightThigh = useRef(null);
  const rightShin = useRef(null);

  const leftFoot = useRef(null);
  const rightFoot = useRef(null);

  useEffect(() => {
    return () => {
      maskWeb.dispose();
      chestWeb.dispose();
    };
  }, [maskWeb, chestWeb]);

  useFrame(({ clock, delta }) => {
    if (!root.current || !bridgeRef.current) {
      return;
    }

    const bridge = bridgeRef.current;

    const t = clock.elapsedTime;

    const state = bridge.state || "ROAM";

    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;

    const px = bridge.x || 0;
    const py = bridge.y || 0;

    const vx = bridge.vx || 0;
    const vy = bridge.vy || 0;

    const direction = bridge.direction || 1;
    const scrollProgress = THREE.MathUtils.clamp(
      bridge.scrollProgress || 0,
      0,
      1,
    );
    const swingPath = Math.sin(scrollProgress * Math.PI * 2);
    const follow = 1 - Math.exp(-delta * 18);

    /*
     * Existing 2D Spidey position
     * → 3D world position
     */

    const targetX =
      0.85 +
      THREE.MathUtils.clamp(
        (px + 24) / width - 0.5,
        -0.4,
        0.4,
      ) *
        0.9 +
      swingPath * 1.15;

    const targetY =
      0.2 +
      THREE.MathUtils.clamp(
        (0.5 - (py + 22) / height) * 0.08,
        -0.06,
        0.06,
      ) +
      scrollProgress * 7.5 +
      Math.sin(scrollProgress * Math.PI * 4) * 0.3;

    root.current.position.x =
      THREE.MathUtils.lerp(
        root.current.position.x,
        targetX,
        follow,
      );

    root.current.position.y =
      THREE.MathUtils.lerp(
        root.current.position.y,
        targetY,
        follow,
      );

    /*
     * Cursor influence
     */

    const pointerX =
      bridge.pointerX ?? 0;

    const pointerY =
      bridge.pointerY ?? 0;

    const cursorWorldX =
      pointerX * 0.5;

    const cursorWorldY =
      pointerY * 0.25;

    head.current.rotation.y =
      THREE.MathUtils.lerp(
        head.current.rotation.y,
        cursorWorldX * 0.35,
        0.08,
      );

    head.current.rotation.x =
      THREE.MathUtils.lerp(
        head.current.rotation.x,
        -cursorWorldY * 0.2,
        0.08,
      );

    /*
     * Default pose
     */

    torso.current.rotation.set(0, 0, 0);

    chest.current.rotation.set(0, 0, 0);

    leftUpperArm.current.rotation.set(
      0,
      0,
      -0.15,
    );

    leftForeArm.current.rotation.set(
      0,
      0,
      -0.1,
    );

    rightUpperArm.current.rotation.set(
      0,
      0,
      0.15,
    );

    rightForeArm.current.rotation.set(
      0,
      0,
      0.1,
    );

    leftThigh.current.rotation.set(
      0,
      0,
      0,
    );

    rightThigh.current.rotation.set(
      0,
      0,
      0,
    );

    leftShin.current.rotation.set(
      0,
      0,
      0,
    );

    rightShin.current.rotation.set(
      0,
      0,
      0,
    );

    leftFoot.current.rotation.set(
      0,
      0,
      0,
    );

    rightFoot.current.rotation.set(
      0,
      0,
      0,
    );

    /*
     * ROAM
     */

    if (state === "ROAM") {
      const run = Math.sin(t * 8);

      torso.current.rotation.z =
        -run * 0.035;

      root.current.position.y =
        THREE.MathUtils.lerp(
          root.current.position.y,
          targetY + Math.abs(run) * 0.045,
          follow,
        );

      leftUpperArm.current.rotation.z =
        -0.15 - run * 0.3;

      rightUpperArm.current.rotation.z =
        0.15 + run * 0.3;

      leftThigh.current.rotation.z =
        run * 0.27;

      rightThigh.current.rotation.z =
        -run * 0.27;

      leftShin.current.rotation.z =
        Math.max(0, -run) * 0.3;

      rightShin.current.rotation.z =
        Math.max(0, run) * 0.3;
    }

    /*
     * JUMP
     */

    if (state === "JUMP") {
      torso.current.rotation.z =
        direction * 0.12;

      torso.current.rotation.x =
        -0.12;

      leftUpperArm.current.rotation.z =
        -0.8;

      rightUpperArm.current.rotation.z =
        0.8;

      leftForeArm.current.rotation.z =
        -0.3;

      rightForeArm.current.rotation.z =
        0.3;

      leftThigh.current.rotation.z =
        0.38;

      rightThigh.current.rotation.z =
        -0.38;

      leftShin.current.rotation.z =
        -0.35;

      rightShin.current.rotation.z =
        0.35;
    }

    /*
     * SHOOT
     */

    if (state === "SHOOT") {
      torso.current.rotation.z =
        direction * 0.14;

      rightUpperArm.current.rotation.z =
        direction * 1.15;

      rightForeArm.current.rotation.z =
        direction * 0.35;

      leftUpperArm.current.rotation.z =
        -0.3;

      leftForeArm.current.rotation.z =
        -0.15;
    }

    /*
     * FLY
     */

    if (state === "FLY") {
      torso.current.rotation.z =
        direction * 0.16;

      torso.current.rotation.x =
        -0.16;

      leftUpperArm.current.rotation.z =
        -1.0;

      rightUpperArm.current.rotation.z =
        1.0;

      leftForeArm.current.rotation.z =
        -0.42;

      rightForeArm.current.rotation.z =
        0.42;

      leftThigh.current.rotation.z =
        0.2;

      rightThigh.current.rotation.z =
        -0.2;
    }

    /*
     * SWING
     */

    if (state === "SWING") {
      const rope = bridge.rope;

      if (rope?.anchor) {
        const dx =
          rope.anchor.x - px;

        const dy =
          rope.anchor.y - py;

        const angle =
          Math.atan2(dy, dx);

        torso.current.rotation.z =
          -angle * 0.3;
      }

      torso.current.rotation.x =
        Math.sin(t * 3.2) * 0.08;

      leftUpperArm.current.rotation.z =
        -1.15;

      rightUpperArm.current.rotation.z =
        1.15;

      leftForeArm.current.rotation.z =
        -0.3;

      rightForeArm.current.rotation.z =
        0.3;

      leftThigh.current.rotation.z =
        -0.38;

      rightThigh.current.rotation.z =
        0.28;

      leftShin.current.rotation.z =
        0.18;

      rightShin.current.rotation.z =
        -0.15;

      root.current.position.z =
        -0.2 +
        Math.sin(t * 4) * 0.18;
    }

    /*
     * CLIMB
     */

    if (state === "CLIMB") {
      const climb =
        Math.sin(t * 5);

      torso.current.rotation.z =
        direction === -1
          ? -Math.PI / 2
          : Math.PI / 2;

      leftUpperArm.current.rotation.z =
        -0.8 + climb * 0.4;

      rightUpperArm.current.rotation.z =
        0.8 - climb * 0.4;

      leftThigh.current.rotation.z =
        climb * 0.45;

      rightThigh.current.rotation.z =
        -climb * 0.45;

      leftShin.current.rotation.z =
        -climb * 0.25;

      rightShin.current.rotation.z =
        climb * 0.25;
    }

    /*
     * Direction
     */

    root.current.rotation.y =
      0;

    /*
     * Velocity squash/stretch
     */

    const speed =
      Math.hypot(vx, vy);

    const stretch =
      THREE.MathUtils.clamp(
        speed / 700,
        0,
        0.11,
      );

    root.current.scale.x =
      0.52 - stretch * 0.12;

    root.current.scale.y =
      0.52 + stretch * 0.45;

    root.current.scale.z =
      0.52;
  });

  return (
    <group
      ref={root}
      position={[0, 0, 0]}
    >
      {/* BODY */}

      <group ref={torso}>
        <mesh
          position={[0, 0.12, 0]}
          castShadow
        >
          <capsuleGeometry args={[0.36, 0.68, 8, 24]} />

          <meshPhysicalMaterial
            color={BLUE_DARK}
            roughness={0.48}
            metalness={0.08}
            clearcoat={0.45}
            clearcoatRoughness={0.34}
          />
        </mesh>

        <group
          ref={chest}
          position={[0, 0.43, 0.285]}
          scale={[0.36, 0.3, 0.055]}
        >
          <mesh castShadow>
            <sphereGeometry args={[1, 32, 24]} />
            <meshPhysicalMaterial
              color={RED}
              roughness={0.38}
              metalness={0.04}
              clearcoat={0.65}
              clearcoatRoughness={0.28}
            />
          </mesh>

          <lineSegments geometry={chestWeb}>
            <lineBasicMaterial
              color="#410d20"
              transparent
              opacity={0.62}
              depthWrite={false}
            />
          </lineSegments>
        </group>

        <mesh
          position={[0, -0.38, 0]}
        >
          <capsuleGeometry args={[0.3, 0.12, 4, 10]} />

          <meshStandardMaterial
            color={BLUE}
            roughness={0.74}
          />
        </mesh>
      </group>

      {/* NECK */}

      <mesh position={[0, 0.79, 0]}>
        <sphereGeometry args={[0.16, 12, 10]} />

        <meshStandardMaterial
          color={BLUE_DARK}
        />
      </mesh>

      {/* HEAD */}

      <group
        ref={head}
        position={[0, 1.2, 0]}
        scale={1.28}
      >
        <mesh castShadow>
          <sphereGeometry args={[0.44, 36, 28]} />

          <meshPhysicalMaterial
            color={RED}
            roughness={0.35}
            metalness={0.03}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </mesh>

        <lineSegments geometry={maskWeb}>
          <lineBasicMaterial
            color="#5b1421"
            transparent
            opacity={0.48}
            depthWrite={false}
          />
        </lineSegments>

        {/* EYES */}

        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.17, 0.065, 0.43]}
            rotation={[0.04, side * 0.14, -side * 0.18]}
          >
            <mesh scale={[0.17, 0.12, 0.045]}>
              <sphereGeometry args={[1, 24, 18]} />
              <meshBasicMaterial color="#11131c" />
            </mesh>
            <mesh
              position={[0, 0, 0.022]}
              scale={[0.135, 0.084, 0.046]}
            >
              <sphereGeometry args={[1, 24, 18]} />
              <meshBasicMaterial color={WHITE} />
            </mesh>
          </group>
        ))}
      </group>

      {/* LEFT ARM */}

      <group
        ref={leftUpperArm}
        position={[-0.57, 0.4, 0]}
      >
        <mesh
          position={[-0.17, -0.12, 0]}
          castShadow
        >
          <capsuleGeometry args={[0.18, 0.24, 5, 10]} />

          <meshPhysicalMaterial
            color={RED}
            roughness={0.4}
            clearcoat={0.45}
          />
        </mesh>

        <group
          ref={leftForeArm}
          position={[-0.39, -0.52, 0]}
        >
          <mesh castShadow>
            <capsuleGeometry args={[0.16, 0.3, 5, 10]} />

            <meshStandardMaterial
              color={BLUE}
              roughness={0.72}
            />
          </mesh>

          <mesh
            position={[0, -0.38, 0]}
          >
            <sphereGeometry args={[0.18, 20, 16]} />
            <meshPhysicalMaterial
              color={RED}
              roughness={0.4}
              clearcoat={0.5}
            />
          </mesh>
        </group>
      </group>

      {/* RIGHT ARM */}

      <group
        ref={rightUpperArm}
        position={[0.57, 0.4, 0]}
      >
        <mesh
          position={[0.17, -0.12, 0]}
          castShadow
        >
          <capsuleGeometry args={[0.18, 0.24, 5, 10]} />

          <meshPhysicalMaterial
            color={RED}
            roughness={0.4}
            clearcoat={0.45}
          />
        </mesh>

        <group
          ref={rightForeArm}
          position={[0.39, -0.52, 0]}
        >
          <mesh castShadow>
            <capsuleGeometry args={[0.16, 0.3, 5, 10]} />

            <meshStandardMaterial
              color={BLUE}
              roughness={0.72}
            />
          </mesh>

          <mesh
            position={[0, -0.38, 0]}
          >
            <sphereGeometry args={[0.18, 20, 16]} />
            <meshPhysicalMaterial
              color={RED}
              roughness={0.4}
              clearcoat={0.5}
            />
          </mesh>
        </group>
      </group>

      {/* LEFT LEG */}

      <group
        ref={leftThigh}
        position={[-0.24, -0.52, 0]}
      >
        <mesh castShadow>
          <capsuleGeometry args={[0.19, 0.38, 5, 10]} />

          <meshStandardMaterial
            color={BLUE}
            roughness={0.75}
          />
        </mesh>

        <group
          ref={leftShin}
          position={[0, -0.58, 0]}
        >
          <mesh castShadow>
            <capsuleGeometry args={[0.16, 0.24, 5, 10]} />

            <meshStandardMaterial
              color={BLUE}
              roughness={0.78}
            />
          </mesh>

          <group
            ref={leftFoot}
            position={[0, -0.37, 0.08]}
          >
            <mesh
              scale={[0.18, 0.1, 0.29]}
            >
              <sphereGeometry args={[1, 16, 12]} />
              <meshPhysicalMaterial
                color={RED}
                roughness={0.42}
                clearcoat={0.5}
              />
            </mesh>
            <mesh
              position={[0, 0.075, 0.02]}
              scale={[0.14, 0.025, 0.22]}
            >
              <sphereGeometry args={[1, 16, 12]} />
              <meshBasicMaterial color="#fda4af" />
            </mesh>
          </group>
        </group>
      </group>

      {/* RIGHT LEG */}

      <group
        ref={rightThigh}
        position={[0.24, -0.52, 0]}
      >
        <mesh castShadow>
          <capsuleGeometry args={[0.19, 0.38, 5, 10]} />

          <meshStandardMaterial
            color={BLUE}
            roughness={0.75}
          />
        </mesh>

        <group
          ref={rightShin}
          position={[0, -0.58, 0]}
        >
          <mesh castShadow>
            <capsuleGeometry args={[0.16, 0.24, 5, 10]} />

            <meshStandardMaterial
              color={BLUE}
              roughness={0.78}
            />
          </mesh>

          <group
            ref={rightFoot}
            position={[0, -0.37, 0.08]}
          >
            <mesh
              scale={[0.18, 0.1, 0.29]}
            >
              <sphereGeometry args={[1, 16, 12]} />
              <meshPhysicalMaterial
                color={RED}
                roughness={0.42}
                clearcoat={0.5}
              />
            </mesh>
            <mesh
              position={[0, 0.075, 0.02]}
              scale={[0.14, 0.025, 0.22]}
            >
              <sphereGeometry args={[1, 16, 12]} />
              <meshBasicMaterial color="#fda4af" />
            </mesh>
          </group>
        </group>
      </group>

      {/* SPIDER EMBLEM */}

      <group
        position={[0, 0.37, 0.32]}
      >
        <mesh>
          <boxGeometry
            args={[0.075, 0.4, 0.035]}
          />

          <meshStandardMaterial
            color={WHITE}
          />
        </mesh>

        <mesh
          position={[-0.14, 0.07, 0]}
          rotation={[0, 0, -0.6]}
        >
          <boxGeometry
            args={[0.055, 0.28, 0.035]}
          />

          <meshStandardMaterial
            color={WHITE}
          />
        </mesh>

        <mesh
          position={[0.14, 0.07, 0]}
          rotation={[0, 0, 0.6]}
        >
          <boxGeometry
            args={[0.055, 0.28, 0.035]}
          />

          <meshStandardMaterial
            color={WHITE}
          />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================
   CITY
   ========================================================= */

function City({ bridgeRef }) {
  const buildingGroups = useRef([]);
  const buildings = useMemo(() => {
    const list = [];

    let seed = 77;

    const random = () => {
      seed =
        (seed * 9301 + 49297) % 233280;

      return seed / 233280;
    };

    for (let i = 0; i < 46; i += 1) {
      list.push({
        id: i,
        x: (random() - 0.5) * 19,
        y: -3 + random() * 0.5,
        z: -3 - random() * 9,
        width: 0.35 + random() * 1.15,
        depth: 0.5 + random() * 1.2,
        height: 0.8 + random() * 5.5,
        windows: Array.from({ length: 6 }, () => ({
          x: (random() - 0.5) * 0.55,
          y: (random() - 0.5) * 0.78,
          color: ["#fb7185", "#38bdf8", "#a78bfa", "#fbbf24"][
            Math.floor(random() * 4)
          ],
          width: 0.025 + random() * 0.025,
          height: 0.05 + random() * 0.055,
        })),
      });
    }

    return list;
  }, []);

  useFrame(({ clock }) => {
    const bridge = bridgeRef.current;

    if (!bridge) return;

    const parallax =
      bridge.pointerX || 0;

    const drift =
      Math.sin(clock.elapsedTime * 0.2) *
      0.04;

    for (const building of buildings) {
      building.offset =
        parallax *
        (building.z + 3) *
        0.008 +
        drift;
    }

    for (let layer = 0; layer < 3; layer += 1) {
      for (const building of buildings) {
        const group =
          buildingGroups.current[layer * buildings.length + building.id];

        if (group) {
          group.position.x =
            building.x + building.offset;
        }
      }
    }
  });

  return (
    <group>
      {Array.from({ length: 3 }, (_, layer) =>
        buildings.map((building) => (
        <group
          key={`${layer}-${building.id}`}
          ref={(node) => {
            buildingGroups.current[layer * buildings.length + building.id] =
              node;
          }}
          position={[
            building.x + (building.offset || 0),
            building.y + building.height / 2 + layer * 8,
            building.z,
          ]}
        >
          <mesh>
            <boxGeometry
              args={[
                building.width,
                building.height,
                building.depth,
              ]}
            />

            <meshStandardMaterial
              color={
                building.id % 3 === 0
                  ? "#101117"
                  : "#08090c"
              }
              roughness={0.96}
            />
          </mesh>

          <mesh
            position={[
              0,
              0.2,
              building.depth / 2 + 0.012,
            ]}
          >
            <planeGeometry
              args={[
                building.width * 0.55,
                0.025,
              ]}
            />

            <meshBasicMaterial
              color={
                building.id % 4 === 0
                  ? RED
                  : "#64748b"
              }
              transparent
              opacity={0.28}
            />
          </mesh>

          {building.windows.map((window, index) => (
            <mesh
              key={index}
              position={[
                window.x * building.width,
                window.y * building.height,
                building.depth / 2 + 0.018,
              ]}
            >
              <planeGeometry args={[window.width, window.height]} />
              <meshBasicMaterial
                color={window.color}
                transparent
                opacity={0.78}
              />
            </mesh>
          ))}
        </group>
        )),
      )}
    </group>
  );
}

/* =========================================================
   PARTICLES
   ========================================================= */

function Particles({ bridgeRef }) {
  const group = useRef(null);
  const geometry = useMemo(() => {
    const count = 220;
    const positions =
      new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = ["#fda4af", "#7dd3fc", "#c4b5fd", "#fde68a"];

    let seed = 41;

    const random = () => {
      seed =
        (seed * 9301 + 49297) % 233280;

      return seed / 233280;
    };

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] =
        (random() - 0.5) * 17;

      positions[i * 3 + 1] =
        (random() - 0.5) * 10;

      positions[i * 3 + 2] =
        -1 - random() * 10;

      const color = new THREE.Color(
        palette[Math.floor(random() * palette.length)],
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo =
      new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3,
      ),
    );
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );
    geo.userData.basePositions = positions.slice();

    return geo;
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const progress = THREE.MathUtils.clamp(
      bridgeRef.current.scrollProgress || 0,
      0,
      1,
    );
    group.current.position.y = progress * 5.6;

    const attribute =
      geometry.attributes.position;

    const array = attribute.array;
    const basePositions = geometry.userData.basePositions;

    for (
      let i = 0;
      i < array.length;
      i += 3
    ) {
      array[i + 1] =
        basePositions[i + 1] +
        Math.sin(clock.elapsedTime * 0.55 + i) * 0.13;
    }

    attribute.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <points geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.032}
        transparent
        opacity={0.68}
        sizeAttenuation
      />
      </points>
    </group>
  );
}

/* =========================================================
   INTERACTIVE RETICLE
   ========================================================= */

function TargetReticle({ bridgeRef }) {
  const group = useRef(null);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const bridge =
      bridgeRef.current;

    const x =
      (bridge.pointerX || 0) * 4.2;

    const y =
      (bridge.pointerY || 0) * 2.5;

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      x,
      0.13,
    );

    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      y,
      0.13,
    );

    const pulse =
      1 +
      Math.sin(clock.elapsedTime * 7) *
        0.08;

    group.current.scale.setScalar(pulse);
  });

  return (
    <group
      ref={group}
      position={[0, 0, 0]}
    >
      <mesh>
        <ringGeometry
          args={[0.12, 0.135, 32]}
        />

        <meshBasicMaterial
          color={RED}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry
          args={[0.025, 8, 8]}
        />

        <meshBasicMaterial
          color={WHITE}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   WEB
   ========================================================= */

function WebLine({ bridgeRef }) {
  const geometry = useMemo(
    () => new THREE.BufferGeometry(),
    [],
  );

  const positions = useMemo(
    () => new Float32Array(18),
    [],
  );

  useEffect(() => {
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3,
      ),
    );

    return () => {
      geometry.dispose();
    };
  }, [geometry, positions]);

  useFrame(() => {
    const bridge =
      bridgeRef.current;

    const rope = bridge?.rope;

    if (!rope?.anchor) {
      geometry.setDrawRange(0, 0);
      return;
    }

    const width =
      window.innerWidth || 1;

    const height =
      window.innerHeight || 1;

    const x =
      ((bridge.x + 24) / width - 0.5) * 11;

    const y =
      (0.5 -
        (bridge.y + 22) / height) *
      6;

    const ax =
      (rope.anchor.x / width - 0.5) *
      11;

    const ay =
      (0.5 - rope.anchor.y / height) *
      6;

    const dx = ax - x;
    const dy = ay - y;

    const len =
      Math.max(
        Math.hypot(dx, dy),
        0.001,
      );

    const nx =
      -dy / len;

    const ny =
      dx / len;

    positions[0] = x;
    positions[1] = y;
    positions[2] = 0;

    positions[3] =
      x + dx * 0.25 + nx * 0.14;

    positions[4] =
      y + dy * 0.25 + ny * 0.14;

    positions[5] = 0;

    positions[6] =
      x + dx * 0.5 - nx * 0.09;

    positions[7] =
      y + dy * 0.5 - ny * 0.09;

    positions[8] = 0;

    positions[9] =
      x + dx * 0.75 + nx * 0.07;

    positions[10] =
      y + dy * 0.75 + ny * 0.07;

    positions[11] = 0;

    positions[12] = ax;
    positions[13] = ay;
    positions[14] = 0;

    geometry.attributes.position.needsUpdate = true;

    geometry.setDrawRange(0, 5);
  });

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={WHITE}
        transparent
        opacity={0.82}
      />
    </line>
  );
}

function roomHotspotProps(onSelect, section) {
  return {
    onClick: (event) => {
      event.stopPropagation();
      onSelect(section);
    },
    onPointerOver: () => {
      document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      document.body.style.cursor = "auto";
    },
  };
}

function BedroomScene({ bridgeRef, onSelect }) {
  const room = useRef(null);
  const lamp = useRef(null);
  const nightLight = useRef(null);

  useFrame(({ clock }, delta) => {
    if (!room.current) return;

    const bridge = bridgeRef.current;
    const pointerX = bridge.pointerX || 0;
    const pointerY = bridge.pointerY || 0;
    const follow = 1 - Math.exp(-delta * 2.5);
    room.current.rotation.y = THREE.MathUtils.lerp(
      room.current.rotation.y,
      pointerX * 0.045,
      follow,
    );
    room.current.rotation.x = THREE.MathUtils.lerp(
      room.current.rotation.x,
      pointerY * -0.018,
      follow,
    );

    if (lamp.current) {
      lamp.current.intensity = 1.7 + Math.sin(clock.elapsedTime * 1.2) * 0.08;
    }
    if (nightLight.current) {
      nightLight.current.intensity =
        0.8 + Math.sin(clock.elapsedTime * 0.8) * 0.12;
    }
  });

  return (
    <>
      <color attach="background" args={["#080b16"]} />
      <fog attach="fog" args={["#101525", 10, 24]} />
      <ambientLight intensity={0.65} color="#9bb5e8" />
      <directionalLight
        position={[-3, 7, 5]}
        intensity={1.5}
        color="#d9e8ff"
      />
      <pointLight
        ref={lamp}
        position={[0.35, 2.2, -0.55]}
        color="#ffad63"
        intensity={1.7}
        distance={7}
      />
      <pointLight
        ref={nightLight}
        position={[-3.4, 3.6, -3.45]}
        color="#4388ff"
        intensity={0.8}
        distance={8}
      />

      <group ref={room}>
        {/* Room shell */}
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[11, 0.35, 9]} />
          <meshStandardMaterial color="#252638" roughness={0.88} />
        </mesh>
        <mesh position={[0, 2.9, -4.48]}>
          <boxGeometry args={[11, 6, 0.2]} />
          <meshStandardMaterial color="#293047" roughness={0.95} />
        </mesh>
        <mesh position={[-5.42, 2.9, 0]}>
          <boxGeometry args={[0.16, 6, 9]} />
          <meshStandardMaterial color="#20263a" roughness={0.95} />
        </mesh>
        <mesh position={[5.42, 2.9, 0]}>
          <boxGeometry args={[0.16, 6, 9]} />
          <meshStandardMaterial color="#20263a" roughness={0.95} />
        </mesh>
        <mesh position={[0, 5.92, 0]}>
          <boxGeometry args={[11, 0.14, 9]} />
          <meshStandardMaterial color="#171b2b" roughness={0.95} />
        </mesh>

        {/* Night window */}
        <group {...roomHotspotProps(onSelect, "window")}>
          <mesh position={[-3.55, 3.48, -4.34]}>
            <boxGeometry args={[2.2, 1.8, 0.06]} />
            <meshBasicMaterial color="#172b55" />
          </mesh>
          <mesh position={[-3.55, 3.48, -4.29]}>
            <boxGeometry args={[0.09, 1.8, 0.1]} />
            <meshStandardMaterial color="#b8c5df" metalness={0.45} />
          </mesh>
          <mesh position={[-3.55, 3.48, -4.28]}>
            <boxGeometry args={[2.2, 0.09, 0.1]} />
            <meshStandardMaterial color="#b8c5df" metalness={0.45} />
          </mesh>
          <mesh position={[-4.28, 3.4, -4.2]}>
            <boxGeometry args={[0.43, 1.68, 0.025]} />
            <meshBasicMaterial color="#101a33" />
          </mesh>
          <mesh position={[-2.8, 3.32, -4.19]}>
            <boxGeometry args={[0.58, 1.63, 0.025]} />
            <meshBasicMaterial color="#111c38" />
          </mesh>
        </group>

        {/* Bed and night thoughts */}
        <group {...roomHotspotProps(onSelect, "thoughts")}>
          <mesh position={[-2.5, 0.7, -0.4]} castShadow>
            <boxGeometry args={[2.55, 0.42, 3.15]} />
            <meshStandardMaterial color="#5b3455" roughness={0.82} />
          </mesh>
          <mesh position={[-2.5, 0.42, -0.4]}>
            <boxGeometry args={[2.75, 0.35, 3.35]} />
            <meshStandardMaterial color="#322b3e" roughness={0.76} />
          </mesh>
          <mesh position={[-2.5, 0.98, 0.12]} castShadow>
            <boxGeometry args={[2.38, 0.28, 2.05]} />
            <meshStandardMaterial color="#b55372" roughness={0.96} />
          </mesh>
          <mesh position={[-2.5, 1.13, -1.12]} castShadow>
            <boxGeometry args={[2.25, 0.23, 0.78]} />
            <meshStandardMaterial color="#e5d5c9" roughness={0.98} />
          </mesh>
          <mesh position={[-2.5, 0.98, 1.04]}>
            <boxGeometry args={[2.35, 0.3, 0.25]} />
            <meshStandardMaterial color="#e6c888" roughness={0.8} />
          </mesh>
          <mesh position={[-2.5, 1.23, -1.95]}>
            <boxGeometry args={[2.7, 1.25, 0.18]} />
            <meshStandardMaterial color="#453751" roughness={0.76} />
          </mesh>
        </group>

        {/* Bedside table and warm lamp */}
        <group {...roomHotspotProps(onSelect, "thoughts")}>
          <mesh position={[-0.68, 0.64, -1.2]}>
            <boxGeometry args={[0.82, 1.05, 0.78]} />
            <meshStandardMaterial color="#604238" roughness={0.76} />
          </mesh>
          <mesh position={[-0.68, 1.2, -1.2]}>
            <boxGeometry args={[0.9, 0.1, 0.86]} />
            <meshStandardMaterial color="#8d6245" roughness={0.7} />
          </mesh>
          <mesh position={[-0.68, 1.75, -1.2]}>
            <cylinderGeometry args={[0.035, 0.045, 0.9, 12]} />
            <meshStandardMaterial color="#e4b276" metalness={0.45} />
          </mesh>
          <mesh position={[-0.68, 2.23, -1.2]}>
            <coneGeometry args={[0.34, 0.5, 20, 1, true]} />
            <meshStandardMaterial
              color="#ffca83"
              emissive="#a64c15"
              emissiveIntensity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Desk */}
        <group {...roomHotspotProps(onSelect, "projects")}>
          <mesh position={[2.35, 1.22, -1.2]} castShadow>
            <boxGeometry args={[2.65, 0.16, 1.4]} />
            <meshStandardMaterial color="#80573f" roughness={0.69} />
          </mesh>
          {[1.25, 3.45].map((x) => (
            <mesh key={x} position={[x, 0.56, -1.2]}>
              <boxGeometry args={[0.12, 1.2, 1.12]} />
              <meshStandardMaterial color="#443540" roughness={0.76} />
            </mesh>
          ))}
          <mesh position={[2.35, 1.12, -1.2]}>
            <boxGeometry args={[2.42, 0.08, 1.12]} />
            <meshStandardMaterial color="#392d39" roughness={0.8} />
          </mesh>
        </group>

        {/* Laptop: the project portal */}
        <group {...roomHotspotProps(onSelect, "projects")}>
          <mesh position={[2.35, 1.36, -0.78]} rotation={[-0.08, 0, 0]}>
            <boxGeometry args={[1.12, 0.08, 0.76]} />
            <meshStandardMaterial color="#a8b4c8" metalness={0.75} roughness={0.28} />
          </mesh>
          <mesh position={[2.35, 1.76, -1.12]} rotation={[-0.12, 0, 0]}>
            <boxGeometry args={[1.12, 0.76, 0.07]} />
            <meshStandardMaterial color="#9ba9bd" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[2.35, 1.76, -1.075]}>
            <boxGeometry args={[1.01, 0.63, 0.012]} />
            <meshBasicMaterial color="#0b1930" />
          </mesh>
          <mesh position={[2.35, 1.82, -1.064]}>
            <boxGeometry args={[0.77, 0.055, 0.014]} />
            <meshBasicMaterial color="#2ed5e6" />
          </mesh>
          <mesh position={[2.28, 1.69, -1.062]}>
            <boxGeometry args={[0.62, 0.025, 0.014]} />
            <meshBasicMaterial color="#f67f8b" />
          </mesh>
          <mesh position={[2.42, 1.57, -1.062]}>
            <boxGeometry args={[0.72, 0.025, 0.014]} />
            <meshBasicMaterial color="#a99aff" />
          </mesh>
          <mesh position={[2.22, 1.45, -1.062]}>
            <boxGeometry args={[0.52, 0.025, 0.014]} />
            <meshBasicMaterial color="#f5c96a" />
          </mesh>
        </group>

        {/* Bookshelf / skills */}
        <group {...roomHotspotProps(onSelect, "skills")}>
          <mesh position={[4.42, 1.7, -2.55]}>
            <boxGeometry args={[1.05, 3.3, 0.7]} />
            <meshStandardMaterial color="#49343d" roughness={0.86} />
          </mesh>
          {[0.62, 1.45, 2.28].map((y) => (
            <mesh key={y} position={[4.42, y, -2.13]}>
              <boxGeometry args={[1.02, 0.09, 0.08]} />
              <meshStandardMaterial color="#c18a5e" roughness={0.63} />
            </mesh>
          ))}
          {[
            ["#e57d6f", 3.98, 0.98, 0.16],
            ["#73a9c4", 4.2, 1.02, 0.19],
            ["#e2bd68", 4.46, 0.99, 0.17],
            ["#8aa47c", 4.7, 1.04, 0.21],
            ["#b58dbd", 4.98, 1.0, 0.16],
            ["#72b4aa", 4.05, 1.84, 0.2],
            ["#e3ad59", 4.33, 1.82, 0.18],
            ["#d97c76", 4.61, 1.86, 0.19],
            ["#82a3ce", 4.88, 1.83, 0.18],
          ].map(([color, x, y, width], index) => (
            <mesh key={index} position={[x, y, -2.06]}>
              <boxGeometry args={[width, 0.56, 0.3]} />
              <meshStandardMaterial color={color} roughness={0.77} />
            </mesh>
          ))}
        </group>

        {/* Moodboard and personal story */}
        <group {...roomHotspotProps(onSelect, "about")}>
          <mesh position={[1.5, 3.6, -4.32]}>
            <boxGeometry args={[1.85, 1.36, 0.12]} />
            <meshStandardMaterial color="#9a765c" roughness={0.92} />
          </mesh>
          <mesh position={[1.5, 3.6, -4.245]}>
            <boxGeometry args={[1.68, 1.18, 0.025]} />
            <meshStandardMaterial color="#e4d3ad" roughness={0.95} />
          </mesh>
          <mesh position={[1.5, 3.83, -4.22]}>
            <boxGeometry args={[1.16, 0.08, 0.02]} />
            <meshBasicMaterial color="#a64a45" />
          </mesh>
          <mesh position={[1.14, 3.55, -4.21]} rotation={[0, 0, -0.12]}>
            <boxGeometry args={[0.42, 0.42, 0.025]} />
            <meshBasicMaterial color="#6a8caa" />
          </mesh>
          <mesh position={[1.76, 3.54, -4.21]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[0.48, 0.46, 0.025]} />
            <meshBasicMaterial color="#d88a67" />
          </mesh>
        </group>

        {/* Contact notebook */}
        <group {...roomHotspotProps(onSelect, "contact")}>
          <mesh position={[3.25, 1.37, -0.72]} rotation={[0, -0.16, 0]}>
            <boxGeometry args={[0.48, 0.07, 0.62]} />
            <meshStandardMaterial color="#e7c877" roughness={0.82} />
          </mesh>
          <mesh position={[3.25, 1.415, -0.72]} rotation={[0, -0.16, 0]}>
            <boxGeometry args={[0.43, 0.015, 0.55]} />
            <meshStandardMaterial color="#f5e9c7" roughness={0.9} />
          </mesh>
        </group>

        {/* Small graphic accents */}
        <mesh position={[-4.9, 0.15, 3.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.42, 32]} />
          <meshBasicMaterial color="#e5a954" />
        </mesh>
        <mesh position={[0, 5.78, -0.7]}>
          <sphereGeometry args={[0.18, 20, 16]} />
          <meshStandardMaterial
            color="#f5df9b"
            emissive="#d3a847"
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </>
  );
}

/* =========================================================
   CAMERA
   ========================================================= */

function BedroomCameraRig({ bridgeRef }) {
  useFrame(({ camera }, delta) => {
    const bridge = bridgeRef.current;
    const pointerX = bridge.pointerX || 0;
    const pointerY = bridge.pointerY || 0;
    const follow = 1 - Math.exp(-delta * 2.2);
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointerX * 0.42,
      follow,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      3.55 + pointerY * 0.2,
      follow,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      11.8,
      follow,
    );
    camera.lookAt(pointerX * 0.18, 1.85 + pointerY * 0.08, -0.65);
  });

  return null;
}

function CameraRig({ bridgeRef }) {
  useFrame(({ camera }) => {
    const bridge =
      bridgeRef.current;

    const pointerX =
      bridge.pointerX || 0;

    const pointerY =
      bridge.pointerY || 0;

    const state =
      bridge.state || "ROAM";

    const scrollProgress = THREE.MathUtils.clamp(
      bridge.scrollProgress || 0,
      0,
      1,
    );
    const swingPath = Math.sin(scrollProgress * Math.PI * 2);

    const targetX =
      pointerX * 0.22 +
      swingPath * 0.48;

    const targetY =
      0.12 +
      pointerY * 0.08 -
      scrollProgress * 7.5 +
      Math.sin(scrollProgress * Math.PI * 4) * 0.3;

    const targetZ =
      state === "SWING"
        ? 4.65 - Math.max(0, swingPath) * 0.16
        : state === "FLY"
          ? 4.85
          : 5.1;

    camera.position.x =
      THREE.MathUtils.lerp(
        camera.position.x,
        targetX,
        0.035,
      );

    camera.position.y =
      THREE.MathUtils.lerp(
        camera.position.y,
        targetY,
        0.035,
      );

    camera.position.z =
      THREE.MathUtils.lerp(
        camera.position.z,
        targetZ,
        0.035,
      );

    const tilt =
      state === "SWING"
        ? pointerX * 0.035 + swingPath * 0.055
        : pointerX * 0.012 + swingPath * 0.035;

    camera.rotation.z =
      THREE.MathUtils.lerp(
        camera.rotation.z,
        tilt,
        0.04,
      );
  });

  return null;
}

function ScrollLighting({ bridgeRef }) {
  const warm = useRef(null);
  const cool = useRef(null);
  const palettes = useMemo(
    () =>
      ["#fb3150", "#22d3ee", "#a78bfa", "#fbbf24", "#fb3150"].map(
        (color) => new THREE.Color(color),
      ),
    [],
  );
  const warmColor = useMemo(() => new THREE.Color(), []);
  const coolColor = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const progress = THREE.MathUtils.clamp(
      bridgeRef.current.scrollProgress || 0,
      0,
      1,
    );
    const stage = progress * (palettes.length - 1);
    const index = Math.min(Math.floor(stage), palettes.length - 2);
    const blend = THREE.MathUtils.smoothstep(stage - index, 0, 1);

    warmColor.lerpColors(palettes[index], palettes[index + 1], blend);
    coolColor.lerpColors(
      palettes[(index + 2) % palettes.length],
      palettes[(index + 3) % palettes.length],
      blend,
    );

    if (warm.current && cool.current) {
      warm.current.color.copy(warmColor);
      cool.current.color.copy(coolColor);
      warm.current.intensity = 2.8 + Math.sin(progress * Math.PI * 4) * 0.7;
      cool.current.intensity = 2.3 + Math.cos(progress * Math.PI * 4) * 0.5;
      warm.current.position.x = -3 + progress * 6;
      cool.current.position.x = 3 - progress * 6;
      warm.current.position.y = 2 + progress * 7.5;
      cool.current.position.y = progress * 7.5;
    }
  });

  return (
    <>
      <pointLight
        ref={warm}
        position={[-3, 2, 2]}
        intensity={3}
        color={palettes[0]}
      />
      <pointLight
        ref={cool}
        position={[3, 0, 1]}
        intensity={2.4}
        color={palettes[1]}
      />
    </>
  );
}

/* =========================================================
   MAIN
   ========================================================= */

export default function Spidey3DScene({
  bridgeRef,
  onSelectRoom,
}) {
  return (
    <>
      <div className="fixed inset-0 z-[4] pointer-events-auto">

        <Canvas
          dpr={[1, 1.5]}
          camera={{
            position: [0, 3.55, 11.8],
            fov: 44,
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference:
              "high-performance",
          }}
          onPointerMove={(event) => {
            bridgeRef.current.pointerX =
              (event.clientX / window.innerWidth - 0.5) * 2;
            bridgeRef.current.pointerY =
              (0.5 - event.clientY / window.innerHeight) * 2;
          }}
        >
          <BedroomScene
            bridgeRef={bridgeRef}
            onSelect={onSelectRoom}
          />
          <BedroomCameraRig
            bridgeRef={bridgeRef}
          />
        </Canvas>

      </div>
    </>
  );
}