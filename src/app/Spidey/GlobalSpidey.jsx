"use client";

import { useRef } from "react";
import Spidey from "./Spidey";

export default function GlobalSpidey() {
  const bridgeRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    state: "ROAM",
    direction: 1,
    target: null,
    rope: null,
  });

  return <Spidey bridgeRef={bridgeRef} />;
}
