"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   PIXEL SPIDEY
========================================================= */

const FRAMES = {
  idle: [
    "....RRRR....",
    "..RRRRRRRR..",
    ".RRWWRRWWRR.",
    ".RRRRRRRRRR.",
    "..RRRRRRRR..",
    "...BBBBBB...",
    "..BBBBBBBB..",
    ".RRBBBBBBRR.",
    ".RRBBBBBBRR.",
    "..BB....BB..",
    ".BB......BB.",
  ],

  walk1: [
    "....RRRR....",
    "..RRRRRRRR..",
    ".RRWWRRWWRR.",
    ".RRRRRRRRRR.",
    "..RRRRRRRR..",
    "...BBBBBB...",
    "..BBBBBBBB..",
    ".RRBBBBBBRR.",
    ".RRBBBBBBRR.",
    "..BBB...BB..",
    ".BB.....BBB.",
  ],

  walk2: [
    "....RRRR....",
    "..RRRRRRRR..",
    ".RRWWRRWWRR.",
    ".RRRRRRRRRR.",
    "..RRRRRRRR..",
    "...BBBBBB...",
    "..BBBBBBBB..",
    ".RRBBBBBBRR.",
    ".RRBBBBBBRR.",
    "..BB...BBB..",
    ".BBB.....BB.",
  ],

  jump: [
    "....RRRR....",
    "..RRRRRRRR..",
    ".RRWWRRWWRR.",
    ".RRRRRRRRRR.",
    "..RRRRRRRR..",
    "...BBBBBB...",
    "..BBBBBBBB..",
    ".RRBBBBBBRR.",
    ".RRBBBBBBRR.",
    ".BB......BB.",
    "BB........BB",
  ],

  shoot: [
    "....RRRR....",
    "..RRRRRRRR..",
    ".RRWWRRWWRR.",
    ".RRRRRRRRRR.",
    "..RRRRRRRR..",
    "...BBBBBB...",
    "..BBBBBBBBBB",
    ".RRBBBBBBBBB",
    ".RRBBBBBBBBB",
    "..BB....BB..",
    ".BB......BB.",
  ],

  swing: [
    "....RRRR....",
    "..RRRRRRRR..",
    ".RRWWRRWWRR.",
    ".RRRRRRRRRR.",
    "..RRRRRRRR..",
    "...BBBBBB...",
    "..BBBBBBBB..",
    ".RRBBBBBBRR.",
    ".RRBBBBBBRR.",
    "..BB....BB..",
    ".BB......BB.",
  ],

  climb: [
    "...RRRR.....",
    "..RRRRRR....",
    ".RRWWRRWW...",
    ".RRRRRRRR...",
    "..RRRRRR....",
    "...BBBBBB...",
    "..BBBBBBBB..",
    ".RRBBBBBB...",
    ".RRBBBBBB...",
    "..BB........",
    ".BB.........",
  ],
};

const COLORS = {
  R: "#d71920",
  B: "#174ea6",
  W: "#ffffff",
};

const PIXEL = 4;
const W = 48;
const H = 44;

const GRAVITY = 1100;
const GROUND_MARGIN = 24;

/* =========================================================
   PIXEL CHARACTER
========================================================= */

function PixelSpidey({ frame }) {
  const pixels = FRAMES[frame] || FRAMES.idle;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${pixels[0].length}, ${PIXEL}px)`,
        gridAutoRows: `${PIXEL}px`,
        width: pixels[0].length * PIXEL,
        height: pixels.length * PIXEL,
        imageRendering: "pixelated",
      }}
    >
      {pixels.map((row, y) =>
        [...row].map((pixel, x) => (
          <span
            key={`${x}-${y}`}
            style={{
              width: PIXEL,
              height: PIXEL,
              backgroundColor:
                pixel === "."
                  ? "transparent"
                  : COLORS[pixel],
              gridColumn: x + 1,
              gridRow: y + 1,
            }}
          />
        ))
      )}
    </div>
  );
}

/* =========================================================
   PIXEL WEB
========================================================= */

function PixelWeb({ web }) {
  if (!web) return null;

  const dx = web.x - web.startX;
  const dy = web.y - web.startY;

  const length = Math.hypot(dx, dy);

  if (length < 2) return null;

  const angle = Math.atan2(dy, dx);

  const count = Math.max(
    5,
    Math.floor(length / 7)
  );

  return (
    <div
      style={{
        position: "fixed",
        left: web.startX,
        top: web.startY,
        width: length,
        height: 2,
        transformOrigin: "0 50%",
        transform: `rotate(${angle}rad)`,
        pointerEvents: "none",
        zIndex: 9998,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: (i / count) * length,
            top: i % 2 === 0 ? 0 : 1,
            width: 4,
            height: 2,
            background: "#c7c7c7",
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   PAGE TARGETS
========================================================= */

function getTargets() {
  if (typeof document === "undefined") {
    return [];
  }

  const elements = [
    ...document.querySelectorAll(
      "img, h1, h2, h3, h4, p, a, button, article, section, [data-spidey-target]"
    ),
  ];

  const targets = [];

  for (const element of elements) {
    if (
      element.closest("[data-spidey-ignore]")
    ) {
      continue;
    }

    const rect = element.getBoundingClientRect();

    if (
      rect.width < 15 ||
      rect.height < 10
    ) {
      continue;
    }

    if (
      rect.bottom < 0 ||
      rect.top > window.innerHeight
    ) {
      continue;
    }

    targets.push({
      element,

      x:
        rect.left +
        rect.width / 2,

      y:
        rect.top +
        rect.height / 2,

      width: rect.width,
      height: rect.height,

      type:
        element.tagName === "IMG"
          ? "image"
          : element.tagName === "A"
          ? "link"
          : element.tagName === "BUTTON"
          ? "button"
          : /^H[1-4]$/.test(
              element.tagName
            )
          ? "heading"
          : "page",
    });
  }

  return targets;
}

/* =========================================================
   WALL TARGETS
========================================================= */

function getWallTargets() {
  if (typeof window === "undefined") {
    return [];
  }

  return [
    {
      x: 8,
      y: Math.max(
        60,
        window.innerHeight * 0.22
      ),
      side: "left",
      type: "wall",
    },

    {
      x:
        window.innerWidth -
        W -
        8,

      y: Math.max(
        60,
        window.innerHeight * 0.22
      ),

      side: "right",
      type: "wall",
    },
  ];
}

/* =========================================================
   TARGET SELECTION
========================================================= */

function chooseTarget(body, options = {}) {
  const {
    chain = false,
  } = options;

  const pageTargets =
    getTargets();

  const wallTargets =
    getWallTargets();

  const sx =
    body.x + W / 2;

  const sy =
    body.y + H / 2;

  const candidates = pageTargets
    .map((target) => {
      const dx =
        target.x - sx;

      const dy =
        target.y - sy;

      const targetDistance =
        Math.hypot(dx, dy);

      /*
       * Keep targets reachable.
       */
      if (
        targetDistance < 180 ||
        targetDistance > 720
      ) {
        return null;
      }

      /*
       * For chained swings we want
       * another target above us.
       */
      if (dy > -45) {
        return null;
      }

      let priority = 40;

      if (
        target.element.matches(
          "[data-spidey-target]"
        )
      ) {
        priority = 0;
      } else if (
        target.type === "image"
      ) {
        priority = 10;
      } else if (
        target.type === "heading"
      ) {
        priority = 20;
      } else if (
        target.type === "link" ||
        target.type === "button"
      ) {
        priority = 30;
      }

      const angle =
        Math.atan2(
          Math.abs(dy),
          Math.abs(dx)
        ) *
        (180 / Math.PI);

      const anglePenalty =
        Math.abs(angle - 60);

      /*
       * Chaining strongly prefers
       * targets above the current body.
       */
      const upwardBonus =
        dy < -100
          ? 50
          : dy < -45
          ? 20
          : 0;

      /*
       * Avoid choosing the current rope anchor.
       */
      const sameAnchor =
        body.rope &&
        Math.hypot(
          target.x -
            body.rope.anchor.x,
          target.y -
            body.rope.anchor.y
        ) < 140;

      if (sameAnchor) {
        return null;
      }

      return {
        ...target,

        score:
          priority * 8 +
          targetDistance * 0.25 +
          anglePenalty * 2 -
          upwardBonus +
          Math.random() * 18,
      };
    })
    .filter(Boolean);

  /*
   * Walls.
   */
  const walls = wallTargets
    .map((wall) => {
      const dx =
        wall.x - sx;

      const dy =
        wall.y - sy;

      const targetDistance =
        Math.hypot(dx, dy);

      if (
        targetDistance < 180 ||
        targetDistance > 850
      ) {
        return null;
      }

      /*
       * For chain shots, wall anchor
       * should be above Spidey.
       */
      if (
        chain &&
        dy > -50
      ) {
        return null;
      }

      const close =
        wall.side === "left"
          ? body.x <
            window.innerWidth * 0.4
          : body.x >
            window.innerWidth * 0.6;

      const upwardBonus =
        dy < -100
          ? 70
          : dy < -50
          ? 30
          : 0;

      const oppositeWall =
        body.rope?.type === "wall" &&
        body.rope.side !== wall.side;

      return {
        ...wall,

        score:
          100 -
          targetDistance * 0.08 -
          upwardBonus -
          (close ? 45 : 0) -
          (oppositeWall ? 40 : 0) +
          Math.random() * 15,
      };
    })
    .filter(Boolean);

  const all = [
    ...candidates,
    ...walls,
  ];

  if (!all.length) {
    return null;
  }

  all.sort(
    (a, b) =>
      a.score - b.score
  );

  const top = all.slice(
    0,
    Math.min(4, all.length)
  );

  return top[
    Math.floor(
      Math.random() *
        top.length
    )
  ];
}

/* =========================================================
   HELPERS
========================================================= */

function distance(a, b) {
  return Math.hypot(
    a.x - b.x,
    a.y - b.y
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function Spidey() {
  const [mounted, setMounted] =
    useState(false);

  const [position, setPosition] =
    useState({
      x: 100,
      y: 300,
    });

  const [frame, setFrame] =
    useState("idle");

  const [direction, setDirection] =
    useState(1);

  const [web, setWeb] =
    useState(null);

  const [shout, setShout] =
    useState(false);

  const body =
    useRef({
      x: 100,
      y: 300,

      vx: 100,
      vy: 0,

      direction: 1,

      state: "ROAM",

      rope: null,

      target: null,

      wallSide: null,

      /*
       * Chain control.
       */
      chainWebFired: false,
      chainShooting: false,
      chainCooldown: 0,

      /*
       * How long the current swing
       * has existed.
       */
      swingAge: 0,

      /*
       * Never release too quickly.
       */
      swingDuration: 3.4,

      stateTime: 0,

      lastTime: 0,

      frameTime: 0,

      nextAction: 2,

      climbTime: 0,

      webShot: false,

      /*
       * Limit visual rope updates.
       */
      webRenderTime: 0,
    });

  const animation =
    useRef(null);

  const webAnimation =
    useRef(null);

  const shoutTimer =
    useRef(null);

  const ownsInstance =
    useRef(false);

  /* =======================================================
     MOUNT / SINGLE INSTANCE
  ======================================================= */

  useEffect(() => {
    if (
      window.__LOCHAN_SPIDEY__
    ) {
      return;
    }

    window.__LOCHAN_SPIDEY__ =
      true;

    ownsInstance.current =
      true;

    setMounted(true);

    return () => {
      if (
        ownsInstance.current
      ) {
        delete window.__LOCHAN_SPIDEY__;
      }

      if (
        shoutTimer.current
      ) {
        clearTimeout(
          shoutTimer.current
        );
      }

      if (
        webAnimation.current
      ) {
        cancelAnimationFrame(
          webAnimation.current
        );
      }
    };
  }, []);

  /* =======================================================
     INITIAL POSITION
  ======================================================= */

  useEffect(() => {
    if (!mounted) return;

    const b = body.current;

    b.x = Math.min(
      120,
      Math.max(
        20,
        window.innerWidth - 100
      )
    );

    b.y =
      window.innerHeight -
      H -
      GROUND_MARGIN;

    b.vx = 100;
    b.vy = 0;

    b.state = "ROAM";
    b.stateTime = 0;

    b.nextAction =
      1.5 +
      Math.random() * 1.5;

    b.lastTime =
      performance.now();

    setPosition({
      x: b.x,
      y: b.y,
    });
  }, [mounted]);

  /* =======================================================
     PHYSICS LOOP
  ======================================================= */

  useEffect(() => {
    if (!mounted) return;

    let animationFrame;

    const loop = (time) => {
      const b = body.current;

      if (!b.lastTime) {
        b.lastTime = time;
      }

      let dt =
        (time -
          b.lastTime) /
        1000;

      b.lastTime = time;

      /*
       * Prevent giant physics jumps
       * when the browser tab stalls.
       */
      dt = Math.min(
        dt,
        0.022
      );

      b.stateTime += dt;

      /* ===================================================
         ROAM
      =================================================== */

      if (
        b.state === "ROAM"
      ) {
        applyGravity(
          b,
          dt
        );

        b.x +=
          b.vx * dt;

        b.y +=
          b.vy * dt;

        const ground =
          window.innerHeight -
          H -
          GROUND_MARGIN;

        if (
          b.y >= ground
        ) {
          b.y = ground;

          b.vy = 0;

          b.vx *= 0.96;

          if (
            b.stateTime >
            b.nextAction
          ) {
            b.vy =
              -480 -
              Math.random() *
                100;

            b.vx =
              (Math.random() >
              0.5
                ? 1
                : -1) *
              (120 +
                Math.random() *
                  100);

            b.state =
              "JUMP";

            b.stateTime = 0;

            b.webShot = false;
          }
        }

        handleWalls(b);

        /*
         * Occasional ground web.
         */
        if (
          b.state === "ROAM" &&
          b.stateTime >
            b.nextAction + 0.35
        ) {
          const target =
            chooseTarget(b);

          if (
            target &&
            Math.random() <
              0.42
          ) {
            shootWeb(
              target,
              {
                chain: false,
              }
            );

            b.state =
              "SHOOT";

            b.stateTime = 0;
          } else {
            b.stateTime = 0;

            b.nextAction =
              1.8 +
              Math.random() *
                2;
          }
        }
      }

      /* ===================================================
         JUMP
      =================================================== */

      else if (
        b.state === "JUMP"
      ) {
        applyGravity(
          b,
          dt
        );

        b.x +=
          b.vx * dt;

        b.y +=
          b.vy * dt;

        if (
          handleWalls(b)
        ) {
          // wall collision handled
        }

        /*
         * Do not shoot immediately.
         * Give the jump some air time.
         */
        if (
          b.state === "JUMP" &&
          b.vy < -100 &&
          b.stateTime > 0.35 &&
          !b.webShot
        ) {
          const target =
            chooseTarget(b);

          if (target) {
            b.webShot = true;

            shootWeb(
              target,
              {
                chain: false,
              }
            );

            b.state =
              "SHOOT";

            b.stateTime = 0;
          }
        }

        if (
          b.state === "JUMP"
        ) {
          landOrBounce(b);
        }
      }

      /* ===================================================
         SHOOT
      =================================================== */

      else if (
        b.state === "SHOOT"
      ) {
        /*
         * shootWeb() owns the animation
         * and eventually attaches.
         */
      }

      /* ===================================================
         SWING
      =================================================== */

      else if (
        b.state === "SWING"
      ) {
        b.swingAge += dt;

        b.chainCooldown =
          Math.max(
            0,
            b.chainCooldown - dt
          );

        swingPhysics(
          b,
          dt
        );

        /*
         * -------------------------------------------------
         * CHAIN TIMING
         * -------------------------------------------------
         *
         * Spidey gets a real swing first.
         *
         * He does NOT fire another web
         * immediately after attaching.
         *
         * He waits until:
         *
         *  - at least 1.35 seconds passed
         *  - he still has good velocity
         *  - he is not close to the bottom
         *  - no other chain shot is active
         *
         * This is the important fix.
         */

        const screenBottom =
          window.innerHeight;

        const farEnoughFromBottom =
          b.y <
          screenBottom - 180;

        const speed =
          Math.hypot(
            b.vx,
            b.vy
          );

        const safeToChain =
          b.swingAge >= 1.35 &&
          b.swingAge <= 2.55 &&
          b.chainCooldown <= 0 &&
          !b.chainWebFired &&
          !b.chainShooting &&
          speed > 180 &&
          farEnoughFromBottom;

        if (
          safeToChain
        ) {
          /*
           * Fire exactly once.
           */
          b.chainWebFired =
            true;

          chainNextWeb();
        }

        /*
         * Never intentionally drop
         * while we are trying to chain.
         */
        if (
          b.state === "SWING" &&
          !b.chainShooting &&
          b.swingAge >
            b.swingDuration &&
          b.chainWebFired === false
        ) {
          /*
           * Before releasing, make one
           * final attempt to find a target.
           */
          const emergencyTarget =
            chooseTarget(
              b,
              { chain: true }
            );

          if (
            emergencyTarget
          ) {
            b.chainWebFired =
              true;

            chainNextWeb();
          } else {
            releaseWeb();

            b.state =
              "FLY";

            b.stateTime = 0;
          }
        }

        /*
         * Absolute safety:
         * if Spidey somehow gets too low,
         * try another web immediately.
         */
        if (
          b.state === "SWING" &&
          !b.chainShooting &&
          b.y >
            screenBottom - 230 &&
          b.swingAge > 1.0 &&
          b.chainCooldown <= 0 &&
          !b.chainWebFired
        ) {
          b.chainWebFired =
            true;

          chainNextWeb();
        }
      }

      /* ===================================================
         FLY
      =================================================== */

      else if (
        b.state === "FLY"
      ) {
        applyGravity(
          b,
          dt
        );

        b.x +=
          b.vx * dt;

        b.y +=
          b.vy * dt;

        if (
          handleWalls(b)
        ) {
          // climbing
        }

        if (
          b.state === "FLY"
        ) {
          landOrBounce(b);
        }
      }

      /* ===================================================
         CLIMB
      =================================================== */

      else if (
        b.state === "CLIMB"
      ) {
        climbPhysics(
          b,
          dt
        );

        if (
          b.stateTime >
          1.8
        ) {
          jumpFromWall(b);
        }
      }

      /* ===================================================
         ANIMATION
      =================================================== */

      b.frameTime += dt;

      if (
        b.frameTime >
        0.11
      ) {
        b.frameTime = 0;

        if (
          b.state === "SWING"
        ) {
          setFrame("swing");
        } else if (
          b.state === "CLIMB"
        ) {
          setFrame("climb");
        } else if (
          b.state === "SHOOT"
        ) {
          setFrame("shoot");
        } else if (
          b.state === "JUMP" ||
          b.state === "FLY"
        ) {
          setFrame("jump");
        } else if (
          Math.abs(
            b.vx
          ) > 35
        ) {
          setFrame(
            (old) =>
              old === "walk1"
                ? "walk2"
                : "walk1"
          );
        } else {
          setFrame("idle");
        }
      }

      /* ===================================================
         DIRECTION
      =================================================== */

      if (
        b.vx > 25
      ) {
        b.direction = 1;

        setDirection(1);
      } else if (
        b.vx < -25
      ) {
        b.direction = -1;

        setDirection(-1);
      }

      /* ===================================================
         VIEWPORT
      =================================================== */

      const maxX =
        window.innerWidth -
        W -
        8;

      b.x = Math.max(
        8,
        Math.min(
          maxX,
          b.x
        )
      );

      b.y = Math.max(
        30,
        Math.min(
          window.innerHeight -
            H,
          b.y
        )
      );

      /*
       * One React position update per
       * animation frame. Physics itself
       * stays entirely in the ref.
       */
      setPosition({
        x: b.x,
        y: b.y,
      });

      animationFrame =
        requestAnimationFrame(
          loop
        );
    };

    animationFrame =
      requestAnimationFrame(
        loop
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      if (
        webAnimation.current
      ) {
        cancelAnimationFrame(
          webAnimation.current
        );

        webAnimation.current =
          null;
      }
    };
  }, [mounted]);

  /* =======================================================
     GRAVITY
  ======================================================= */

  function applyGravity(
    b,
    dt
  ) {
    b.vy +=
      GRAVITY * dt;

    b.vx *=
      Math.pow(
        0.998,
        dt * 60
      );
  }

  /* =======================================================
     WALL COLLISION
  ======================================================= */

  function handleWalls(b) {
    const maxX =
      window.innerWidth -
      W -
      8;

    if (
      b.x <= 8
    ) {
      b.x = 8;

      if (
        b.state === "FLY" ||
        b.state === "JUMP"
      ) {
        startClimb(
          b,
          "left"
        );

        return true;
      }

      b.vx =
        Math.abs(
          b.vx
        );

      b.direction = 1;

      setDirection(1);
    }

    if (
      b.x >= maxX
    ) {
      b.x = maxX;

      if (
        b.state === "FLY" ||
        b.state === "JUMP"
      ) {
        startClimb(
          b,
          "right"
        );

        return true;
      }

      b.vx =
        -Math.abs(
          b.vx
        );

      b.direction = -1;

      setDirection(-1);
    }

    return false;
  }

  /* =======================================================
     GROUND
  ======================================================= */

  function landOrBounce(b) {
    const ground =
      window.innerHeight -
      H -
      GROUND_MARGIN;

    if (
      b.y >= ground
    ) {
      b.y = ground;

      b.vy =
        -(
          420 +
          Math.random() *
            120
        );

      b.state =
        "JUMP";

      b.stateTime = 0;

      b.webShot = false;

      b.vx +=
        (Math.random() -
          0.5) *
        120;
    }
  }

  /* =======================================================
     SHOOT WEB
  ======================================================= */

  function shootWeb(
    target,
    options = {}
  ) {
    const b =
      body.current;

    const isChain =
      options.chain === true;

    if (!target) {
      if (isChain) {
        b.chainWebFired =
          false;
        b.chainShooting =
          false;
      }

      return;
    }

    /*
     * Normal shots cannot interrupt
     * an existing shooting animation.
     *
     * Chain shots are different:
     * they keep the old rope physically
     * attached while the new web flies.
     */
    if (
      !isChain &&
      b.state === "SHOOT"
    ) {
      return;
    }

    /*
     * Never start a second chain shot.
     */
    if (
      isChain &&
      b.chainShooting
    ) {
      return;
    }

    const startX =
      b.x +
      W / 2;

    const startY =
      b.y + 5;

    const webObject = {
      startX,
      startY,
      x: startX,
      y: startY,

      chain: isChain,
    };

    /*
     * A normal shot has no rope yet.
     */
    if (!isChain) {
      b.rope = null;
    }

    /*
     * Chain shot keeps the current
     * rope alive.
     */
    if (isChain) {
      b.chainShooting =
        true;

      b.state =
        "SWING";
    } else {
      b.state =
        "SHOOT";
    }

    setWeb(webObject);

    setFrame("shoot");

    const start =
      performance.now();

    /*
     * Slightly slower than before.
     * This makes the web visibly travel.
     */
    const duration =
      isChain
        ? 300
        : 260;

    const animate =
      (now) => {
        const current =
          body.current;

        /*
         * Component may have unmounted.
         */
        if (
          !mounted
        ) {
          return;
        }

        /*
         * Chain was cancelled.
         */
        if (
          isChain &&
          !current.chainShooting
        ) {
          return;
        }

        const progress =
          Math.min(
            1,
            (now - start) /
              duration
          );

        const eased =
          progress *
          progress *
          (3 -
            2 * progress);

        /*
         * Spidey can move while the
         * chain web is travelling.
         */
        const currentStartX =
          isChain
            ? current.x +
              W / 2
            : startX;

        const currentStartY =
          isChain
            ? current.y +
              H / 2
            : startY;

        webObject.startX =
          currentStartX;

        webObject.startY =
          currentStartY;

        webObject.x =
          currentStartX +
          (target.x -
            currentStartX) *
            eased;

        webObject.y =
          currentStartY +
          (target.y -
            currentStartY) *
            eased;

        setWeb({
          ...webObject,
        });

        if (
          progress < 1
        ) {
          webAnimation.current =
            requestAnimationFrame(
              animate
            );
        } else {
          webAnimation.current =
            null;

          /*
           * If this was a chain,
           * attach the new rope while
           * preserving swing momentum.
           */
          attachWeb(
            target,
            {
              chained: isChain,
            }
          );
        }
      };

    webAnimation.current =
      requestAnimationFrame(
        animate
      );
  }

  /* =======================================================
     ATTACH WEB
  ======================================================= */

  function attachWeb(
    target,
    options = {}
  ) {
    const b =
      body.current;

    if (!target) {
      b.chainShooting =
        false;

      b.chainWebFired =
        false;

      return;
    }

    const wasSwinging =
      options.chained === true &&
      b.rope !== null;

    const anchor = {
      x: target.x,
      y: target.y,
    };

    const from = {
      x:
        b.x +
        W / 2,

      y:
        b.y +
        H / 2,
    };

    let length =
      distance(
        from,
        anchor
      );

    length = Math.max(
      100,
      Math.min(
        length,
        650
      )
    );

    /*
     * Rope.
     */
    b.rope = {
      anchor,

      length,

      type:
        target.type,

      side:
        target.side ||
        null,
    };

    b.target =
      target;

    /*
     * A new swing starts here.
     */
    b.chainWebFired =
      false;

    b.chainShooting =
      false;

    b.chainCooldown =
      0.9;

    b.swingAge = 0;

    /*
     * New rope should have enough
     * time to visibly swing.
     */
    b.swingDuration =
      3.4;

    /*
     * Transfer momentum.
     */
    const dx =
      anchor.x -
      from.x;

    const dy =
      anchor.y -
      from.y;

    const angle =
      Math.atan2(
        dy,
        dx
      );

    const tangentX =
      -Math.sin(angle);

    const tangentY =
      Math.cos(angle);

    const currentSpeed =
      Math.hypot(
        b.vx,
        b.vy
      );

    if (
      wasSwinging
    ) {
      /*
       * IMPORTANT:
       *
       * For a chained web we preserve
       * the current tangential velocity.
       *
       * This prevents the "teleport +
       * instant acceleration" feeling.
       */
      const tangentialSpeed =
        b.vx *
          tangentX +
        b.vy *
          tangentY;

      const direction =
        tangentialSpeed >= 0
          ? 1
          : -1;

      const preservedSpeed =
        Math.max(
          240,
          Math.min(
            600,
            Math.abs(
              tangentialSpeed
            )
          )
        );

      b.vx =
        tangentX *
        preservedSpeed *
        direction;

      b.vy =
        tangentY *
        preservedSpeed *
        direction;
    } else {
      const speed =
        Math.max(
          280,
          Math.min(
            520,
            currentSpeed *
              0.8
          )
        );

      b.vx +=
        tangentX *
        speed;

      b.vy +=
        tangentY *
        speed;
    }

    /*
     * Keep rope visible.
     */
    setWeb({
      startX:
        b.x +
        W / 2,

      startY:
        b.y +
        H / 2,

      x: anchor.x,
      y: anchor.y,

      chain: false,
    });

    b.state =
      "SWING";

    b.stateTime = 0;

    b.webShot = false;
  }

  /* =======================================================
     CHAIN NEXT WEB
  ======================================================= */

  function chainNextWeb() {
    const b =
      body.current;

    if (
      b.state !== "SWING" ||
      !b.rope ||
      b.chainShooting
    ) {
      b.chainWebFired =
        false;

      return;
    }

    /*
     * Pick a target that is above
     * and far enough away.
     */
    const target =
      chooseTarget(
        b,
        {
          chain: true,
        }
      );

    if (!target) {
      /*
       * No target.
       *
       * IMPORTANT:
       * keep current rope.
       */
      b.chainWebFired =
        false;

      b.chainCooldown =
        0.8;

      return;
    }

    /*
     * Don't shoot the same anchor.
     */
    if (
      b.rope &&
      Math.hypot(
        target.x -
          b.rope.anchor.x,
        target.y -
          b.rope.anchor.y
      ) < 140
    ) {
      b.chainWebFired =
        false;

      b.chainCooldown =
        0.8;

      return;
    }

    /*
     * Fire while still swinging.
     *
     * The old rope stays physically
     * active until attachWeb().
     */
    shootWeb(
      target,
      {
        chain: true,
      }
    );
  }

  /* =======================================================
     REAL SWING PHYSICS
  ======================================================= */

  function swingPhysics(
    b,
    dt
  ) {
    if (!b.rope) {
      return;
    }

    const anchor =
      b.rope.anchor;

    /*
     * Gravity.
     */
    b.vy +=
      GRAVITY * dt;

    /*
     * Free movement.
     */
    b.x +=
      b.vx * dt;

    b.y +=
      b.vy * dt;

    const cx =
      b.x +
      W / 2;

    const cy =
      b.y +
      H / 2;

    const dx =
      cx -
      anchor.x;

    const dy =
      cy -
      anchor.y;

    const currentLength =
      Math.hypot(
        dx,
        dy
      );

    if (
      currentLength < 1
    ) {
      return;
    }

    const nx =
      dx /
      currentLength;

    const ny =
      dy /
      currentLength;

    /*
     * Rope only pulls when stretched.
     *
     * This creates actual pendulum-like
     * movement instead of snapping Spidey
     * around the anchor.
     */
    if (
      currentLength >
      b.rope.length
    ) {
      const correction =
        currentLength -
        b.rope.length;

      b.x -=
        nx *
        correction;

      b.y -=
        ny *
        correction;

      /*
       * Remove radial velocity.
       *
       * Tangential velocity remains.
       */
      const radial =
        b.vx * nx +
        b.vy * ny;

      b.vx -=
        radial *
        nx;

      b.vy -=
        radial *
        ny;
    }

    /*
     * Air resistance.
     */
    b.vx *= 0.998;
    b.vy *= 0.998;

    /*
     * Wall rope.
     */
    if (
      b.rope.type ===
      "wall"
    ) {
      const wallX =
        b.rope.side ===
        "left"
          ? 8
          : window.innerWidth -
            W -
            8;

      if (
        Math.abs(
          b.x -
            wallX
        ) < 24
      ) {
        startClimb(
          b,
          b.rope.side
        );

        return;
      }
    }

    /*
     * Don't overwrite the visible
     * shooting web during a chain shot.
     */
    if (
      b.chainShooting
    ) {
      return;
    }

    /*
     * Update rope visual at max ~30fps.
     *
     * Physics continues at 60fps.
     */
    b.webRenderTime +=
      dt;

    if (
      b.webRenderTime >=
      1 / 30
    ) {
      b.webRenderTime = 0;

      setWeb({
        startX:
          b.x +
          W / 2,

        startY:
          b.y +
          H / 2,

        x: anchor.x,
        y: anchor.y,

        chain: false,
      });
    }
  }

  /* =======================================================
     RELEASE WEB
  ======================================================= */

  function releaseWeb() {
    const b =
      body.current;

    /*
     * NEVER release the old rope
     * while a replacement web is flying.
     */
    if (
      b.chainShooting
    ) {
      return;
    }

    b.rope = null;

    b.target = null;

    b.chainWebFired =
      false;

    b.chainShooting =
      false;

    b.chainCooldown =
      0;

    b.swingAge = 0;

    if (
      webAnimation.current
    ) {
      cancelAnimationFrame(
        webAnimation.current
      );

      webAnimation.current =
        null;
    }

    setWeb(null);
  }

  /* =======================================================
     WALL CLIMB
  ======================================================= */

  function startClimb(
    b,
    side
  ) {
    /*
     * A wall collision should be able
     * to cancel a normal rope.
     */
    b.chainShooting =
      false;

    releaseWeb();

    const maxX =
      window.innerWidth -
      W -
      8;

    if (
      side === "left"
    ) {
      b.x = 8;

      b.wallSide =
        "left";

      b.direction = 1;
    } else {
      b.x = maxX;

      b.wallSide =
        "right";

      b.direction = -1;
    }

    b.vx = 0;
    b.vy = 0;

    b.state =
      "CLIMB";

    b.stateTime = 0;

    b.climbTime = 0;

    setDirection(
      b.direction
    );

    setFrame("climb");
  }

  function climbPhysics(
    b,
    dt
  ) {
    const maxX =
      window.innerWidth -
      W -
      8;

    /*
     * Stick to wall.
     */
    if (
      b.wallSide ===
      "left"
    ) {
      b.x = 8;
    } else {
      b.x = maxX;
    }

    /*
     * Climb.
     */
    b.y -=
      95 * dt;

    b.climbTime +=
      dt;

    if (
      b.y < 30
    ) {
      b.y = 30;
    }
  }

  /* =======================================================
     JUMP FROM WALL
  ======================================================= */

  function jumpFromWall(b) {
    if (
      b.wallSide ===
      "left"
    ) {
      b.x = 12;

      b.vx = 300;

      b.direction = 1;
    } else {
      b.x =
        window.innerWidth -
        W -
        12;

      b.vx = -300;

      b.direction = -1;
    }

    b.vy = -620;

    b.state =
      "JUMP";

    b.stateTime = 0;

    b.target = null;

    b.wallSide = null;

    b.webShot = false;

    b.chainWebFired =
      false;

    b.chainShooting =
      false;

    b.chainCooldown =
      0;

    setDirection(
      b.direction
    );

    setFrame("jump");
  }

  /* =======================================================
     SUUUUUUUU
  ======================================================= */

  function handleSpideyClick() {
    setShout(true);

    if (
      shoutTimer.current
    ) {
      clearTimeout(
        shoutTimer.current
      );
    }

    shoutTimer.current =
      setTimeout(() => {
        setShout(false);
      }, 1500);

    /*
     * Actual browser voice.
     */
    if (
      typeof window !==
        "undefined" &&
      "speechSynthesis" in
        window
    ) {
      window.speechSynthesis.cancel();

      const voice =
        new SpeechSynthesisUtterance(
          "SUUUUUUUUUUUU!"
        );

      voice.rate = 0.7;
      voice.pitch = 1.1;
      voice.volume = 1;

      window.speechSynthesis.speak(
        voice
      );
    }

    /*
     * Tiny jump when clicked.
     */
    const b =
      body.current;

    if (
      b.state === "ROAM" ||
      b.state === "FLY"
    ) {
      b.vy = -400;

      b.state =
        "JUMP";

      b.stateTime = 0;

      b.webShot = false;
    }
  }

  /* =======================================================
     HYDRATION SAFE
  ======================================================= */

  if (!mounted) {
    return null;
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <PixelWeb web={web} />

      {shout && (
        <div
          style={{
            position: "fixed",

            left:
              position.x +
              W / 2 -
              30,

            top:
              position.y -
              34,

            zIndex: 10000,

            pointerEvents:
              "none",

            fontFamily:
              "monospace",

            fontSize: 11,

            fontWeight: 700,

            color: "#111",

            background:
              "#fff",

            border:
              "1px solid #111",

            padding:
              "4px 7px",

            whiteSpace:
              "nowrap",

            boxShadow:
              "2px 2px 0 #111",
          }}
        >
          SUUUUUUUU...
        </div>
      )}

      <button
        type="button"
        aria-label="Spidey"
        onClick={
          handleSpideyClick
        }
        data-spidey-ignore
        style={{
          position: "fixed",

          left: position.x,
          top: position.y,

          width: W,
          height: H,

          padding: 0,
          margin: 0,

          border: 0,

          background:
            "transparent",

          cursor: "pointer",

          zIndex: 10000,

          transform:
            direction === -1
              ? "scaleX(-1)"
              : "scaleX(1)",

          imageRendering:
            "pixelated",

          appearance: "none",
        }}
      >
        <PixelSpidey
          frame={frame}
        />
      </button>
    </>
  );
}