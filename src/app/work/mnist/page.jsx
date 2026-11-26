"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const apiBaseUrl = process.env.NEXT_PUBLIC_MNIST_API_URL;
const predictUrl = apiBaseUrl ? `${apiBaseUrl}/predict` : "";

const architecture = [
  [
    "01",
    "Input",
    "The 28 × 28 drawing becomes 784 normalized pixel values.",
  ],
  [
    "02",
    "Linear",
    "784 features are transformed into 286 learned activations.",
  ],
  [
    "03",
    "Tanh",
    "The nonlinear activation reshapes the representation.",
  ],
  [
    "04",
    "Linear",
    "286 activations are compressed into 120 neurons.",
  ],
  [
    "05",
    "Output",
    "Ten outputs represent the digit classes from 0 to 9.",
  ],
];

const pipeline = [
  ["01", "Draw", "Capture the handwritten digit."],
  ["02", "Resize", "Reduce it to 28 × 28 pixels."],
  ["03", "Normalize", "Convert intensity values to 0–1."],
  ["04", "Infer", "Send 784 features to the model."],
  ["05", "Predict", "Return the strongest digit class."],
];

const modelCode = `model = torch.nn.Sequential(
    torch.nn.Linear(784, 286),
    torch.nn.Tanh(),
    torch.nn.Linear(286, 120),
    torch.nn.Tanh(),
    torch.nn.Linear(120, 10)
)`;

function Section({ number, title, children }) {
  return (
    <section className="box relative bg-[var(--card)] p-6 sm:p-8 my-6">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-xs font-black uppercase text-[var(--pink)]">
          {number}
        </span>

        <h2 className="font-sans text-2xl font-black text-[var(--ink)]">
          {title}
        </h2>
      </div>

      <div className="font-sans text-base leading-relaxed text-[var(--mute)]">
        {children}
      </div>
    </section>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-wider text-neutral-400">
        {label}
      </div>

      <div className="mt-1 text-sm text-neutral-800">
        {value}
      </div>
    </div>
  );
}

function NetworkVisualization() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((value) => value + 1);
    }, 140);

    return () => clearInterval(timer);
  }, []);

  function glow(index, layer) {
    const wave = Math.sin(
      frame * 0.27 +
        index * 0.91 +
        layer * 1.7
    );

    return 0.15 + ((wave + 1) / 2) * 0.85;
  }

  const outputs = [3, 5, 2, 4, 3, 2, 4, 97, 8, 3];

  return (
    <div className="border border-neutral-300 bg-neutral-50">
      <div className="border-b border-neutral-200 px-5 py-5 sm:px-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Inference architecture
            </div>

            <h3 className="mt-2 font-sans font-bold text-xl text-[var(--ink)]">
              From pixels to prediction.
            </h3>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
            784 → 286 → 120 → 10
          </span>
        </div>
      </div>

      <div className="overflow-x-auto p-5 sm:p-7">
        <div className="grid min-w-[760px] grid-cols-[100px_35px_145px_35px_125px_35px_180px] items-center gap-2">
          {/* INPUT */}

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center border border-neutral-300 bg-white font-serif text-4xl text-neutral-900">
              7
            </div>

            <div className="mt-3">
              <div className="font-mono text-[9px] uppercase text-neutral-400">
                INPUT
              </div>

              <div className="mt-1 text-xs font-medium">
                28 × 28
              </div>

              <div className="text-[10px] text-neutral-500">
                784 pixels
              </div>
            </div>
          </div>

          <Wire />

          {/* 286 */}

          <div className="text-center">
            <div className="mx-auto flex h-20 w-28 flex-wrap content-center justify-center gap-[3px]">
              {Array.from({ length: 30 }).map((_, index) => {
                const opacity = glow(index, 1);

                return (
                  <span
                    key={index}
                    className="block h-2 w-2 rounded-full bg-neutral-800 transition-all"
                    style={{
                      opacity,
                      transform: `scale(${0.7 + opacity * 0.45})`,
                    }}
                  />
                );
              })}
            </div>

            <div className="mt-3">
              <div className="font-mono text-[9px] uppercase text-neutral-400">
                LINEAR + TANH
              </div>

              <div className="mt-1 text-xs font-medium">
                286 neurons
              </div>

              <div className="text-[10px] text-neutral-500">
                hidden layer 01
              </div>
            </div>
          </div>

          <Wire />

          {/* 120 */}

          <div className="text-center">
            <div className="mx-auto flex h-20 w-24 flex-wrap content-center justify-center gap-[4px]">
              {Array.from({ length: 20 }).map((_, index) => {
                const opacity = glow(index, 2);

                return (
                  <span
                    key={index}
                    className="block h-2.5 w-2.5 rounded-full bg-neutral-800 transition-all"
                    style={{
                      opacity,
                      transform: `scale(${0.7 + opacity * 0.45})`,
                    }}
                  />
                );
              })}
            </div>

            <div className="mt-3">
              <div className="font-mono text-[9px] uppercase text-neutral-400">
                LINEAR + TANH
              </div>

              <div className="mt-1 text-xs font-medium">
                120 neurons
              </div>

              <div className="text-[10px] text-neutral-500">
                hidden layer 02
              </div>
            </div>
          </div>

          <Wire />

          {/* OUTPUT */}

          <div>
            <div className="space-y-1">
              {outputs.map((value, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <span className="w-3 font-mono text-[9px] text-neutral-500">
                    {index}
                  </span>

                  <div className="h-2 flex-1 bg-neutral-200">
                    <div
                      className={
                        index === 7
                          ? "h-2 bg-neutral-900"
                          : "h-2 bg-neutral-500"
                      }
                      style={{
                        width: `${value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-3">
              <div className="font-mono text-[9px] uppercase text-neutral-400">
                Prediction
              </div>

              <div className="mt-1 flex items-baseline gap-2">
                <strong className="font-serif text-3xl">
                  7
                </strong>

                <span className="text-xs text-neutral-500">
                  98.7%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid border-t border-neutral-200 sm:grid-cols-3">
        <div className="border-b border-neutral-200 px-5 py-4 sm:border-b-0 sm:border-r">
          <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            Architecture
          </div>

          <div className="mt-1 text-sm">
            784 → 286 → 120 → 10
          </div>
        </div>

        <div className="border-b border-neutral-200 px-5 py-4 sm:border-b-0 sm:border-r">
          <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            Activation
          </div>

          <div className="mt-1 text-sm">
            Tanh
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            Output
          </div>

          <div className="mt-1 text-sm">
            10 classes
          </div>
        </div>
      </div>
    </div>
  );
}

function Wire() {
  return (
    <div className="flex flex-col gap-2">
      <span className="h-px w-full bg-neutral-300" />
      <span className="h-px w-full bg-neutral-300" />
      <span className="h-px w-full bg-neutral-300" />
    </div>
  );
}

function MNISTDemo() {
  const canvasRef = useRef(null);
  const previewRef = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    initializeCanvas();
  }, []);

  function initializeCanvas() {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.strokeStyle = "#080808";
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    updatePreview();
  }

  function position(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const point =
      event.touches?.length > 0
        ? event.touches[0]
        : event;

    return {
      x:
        ((point.clientX - rect.left) /
          rect.width) *
        canvas.width,

      y:
        ((point.clientY - rect.top) /
          rect.height) *
        canvas.height,
    };
  }

  function startDrawing(event) {
    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const { x, y } = position(event);

    ctx.beginPath();
    ctx.moveTo(x, y);

    setDrawing(true);
    setHasDrawing(true);
    setError("");
  }

  function draw(event) {
    if (!drawing) return;

    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const { x, y } = position(event);

    ctx.lineTo(x, y);
    ctx.stroke();

    updatePreview();
  }

  function endDrawing(event) {
    if (event) {
      event.preventDefault();
    }

    setDrawing(false);
    updatePreview();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    setHasDrawing(false);
    setPrediction(null);
    setConfidence(null);
    setError("");

    updatePreview();
  }

  function getPixels() {
    const canvas = canvasRef.current;

    const w = canvas.width;
    const h = canvas.height;

    const raw =
      canvas
        .getContext("2d")
        .getImageData(
          0,
          0,
          w,
          h
        );

    const gray =
      new Float32Array(w * h);

    for (
      let i = 0, p = 0;
      i < raw.data.length;
      i += 4, p++
    ) {
      gray[p] =
        255 - raw.data[i];
    }

    const threshold = 20;

    let minX = w;
    let maxX = -1;
    let minY = h;
    let maxY = -1;

    let sum = 0;
    let sumX = 0;
    let sumY = 0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const value =
          gray[y * w + x];

        if (value > threshold) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;

          sum += value;
          sumX += value * x;
          sumY += value * y;
        }
      }
    }

    if (maxX < 0) {
      return new Array(784).fill(0);
    }

    const boxW =
      maxX - minX + 1;

    const boxH =
      maxY - minY + 1;

    const src =
      document.createElement(
        "canvas"
      );

    src.width = w;
    src.height = h;

    const srcCtx =
      src.getContext("2d");

    const invertedImg =
      srcCtx.createImageData(
        w,
        h
      );

    for (
      let p = 0;
      p < gray.length;
      p++
    ) {
      const value = gray[p];

      invertedImg.data[p * 4] =
        value;

      invertedImg.data[
        p * 4 + 1
      ] = value;

      invertedImg.data[
        p * 4 + 2
      ] = value;

      invertedImg.data[
        p * 4 + 3
      ] = 255;
    }

    srcCtx.putImageData(
      invertedImg,
      0,
      0
    );

    const target = 20;

    const scale =
      target /
      Math.max(boxW, boxH);

    const destW =
      Math.max(
        1,
        Math.round(
          boxW * scale
        )
      );

    const destH =
      Math.max(
        1,
        Math.round(
          boxH * scale
        )
      );

    const scaled =
      document.createElement(
        "canvas"
      );

    scaled.width = destW;
    scaled.height = destH;

    const scaledCtx =
      scaled.getContext("2d");

    scaledCtx.imageSmoothingEnabled =
      true;

    scaledCtx.imageSmoothingQuality =
      "high";

    scaledCtx.drawImage(
      src,
      minX,
      minY,
      boxW,
      boxH,
      0,
      0,
      destW,
      destH
    );

    const comXCropped =
      (sumX / sum - minX) *
      scale;

    const comYCropped =
      (sumY / sum - minY) *
      scale;

    const offsetX =
      Math.round(
        14 - comXCropped
      );

    const offsetY =
      Math.round(
        14 - comYCropped
      );

    const final =
      document.createElement(
        "canvas"
      );

    final.width = 28;
    final.height = 28;

    const finalCtx =
      final.getContext("2d");

    finalCtx.fillStyle =
      "#000000";

    finalCtx.fillRect(
      0,
      0,
      28,
      28
    );

    finalCtx.drawImage(
      scaled,
      offsetX,
      offsetY
    );

    const data =
      finalCtx.getImageData(
        0,
        0,
        28,
        28
      );

    const pixels = [];

    for (
      let i = 0;
      i < data.data.length;
      i += 4
    ) {
      pixels.push(
        Number(
          (
            data.data[i] /
            255
          ).toFixed(4)
        )
      );
    }

    return pixels;
  }

  function updatePreview() {
    const preview =
      previewRef.current;

    if (
      !preview ||
      !canvasRef.current
    ) {
      return;
    }

    const ctx =
      preview.getContext("2d");

    const pixels =
      getPixels();

    const imageData =
      ctx.createImageData(
        28,
        28
      );

    pixels.forEach(
      (pixel, index) => {
        const value =
          Math.round(
            pixel * 255
          );

        const offset =
          index * 4;

        imageData.data[offset] =
          value;

        imageData.data[
          offset + 1
        ] = value;

        imageData.data[
          offset + 2
        ] = value;

        imageData.data[
          offset + 3
        ] = 255;
      }
    );

    ctx.putImageData(
      imageData,
      0,
      0
    );
  }

  async function predictDigit() {
    if (!hasDrawing) {
      setError(
        "Draw a digit before running inference."
      );

      return;
    }

    if (!predictUrl) {
      setError(
        "NEXT_PUBLIC_MNIST_API_URL is missing from .env.local."
      );

      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);
    setConfidence(null);

    try {
      const response =
        await fetch(
          predictUrl,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              pixels: getPixels(),
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}.`
        );
      }

      const data =
        await response.json();

      const result =
        data.prediction ??
        data.predicted_digit ??
        data.digit ??
        data.result;

      const score =
        data.confidence ??
        data.probability ??
        data.score ??
        null;

      if (
        result === undefined ||
        result === null
      ) {
        throw new Error(
          "The API returned no prediction."
        );
      }

      setPrediction(result);

      if (score !== null) {
        const number =
          Number(score);

        setConfidence(
          number <= 1
            ? number * 100
            : number
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Prediction failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="demo"
      className="box relative bg-[var(--card)] p-6 sm:p-8 shadow-[5px_5px_0_var(--periwinkle)] my-8"
    >
      <div className="border-b border-neutral-200 px-5 py-5 sm:px-7">
        <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
          Live model interface
        </div>

        <h3 className="mt-2 font-sans font-bold text-xl text-[var(--ink)]">
          Draw a digit and run inference.
        </h3>

        <p className="mt-2 text-sm text-neutral-500">
          The browser converts the drawing into the same
          784-feature representation expected by the model.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_300px]">
        {/* DRAWING */}

        <div className="border-b border-neutral-200 p-5 md:border-b-0 md:border-r sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                Input
              </div>

              <div className="mt-1 text-sm text-neutral-800">
                280 × 280 canvas
              </div>
            </div>

            <div className="font-mono text-[10px] text-neutral-400">
              0–9
            </div>
          </div>

          <div className="relative mx-auto aspect-square max-w-[360px] border border-neutral-300 bg-white">
            {!hasDrawing && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300">
                  Draw here
                </span>
              </div>
            )}

            <canvas
              ref={canvasRef}
              width={280}
              height={280}
              className="h-full w-full touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearCanvas}
              className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2 text-sm font-bold"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={predictDigit}
              disabled={loading}
              className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2 text-sm font-black disabled:opacity-50"
            >
              {loading ? "Running..." : "Predict digit →"}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-xs leading-5 text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* RESULT */}

        <div className="bg-neutral-50">
          <div className="border-b border-neutral-200 p-5 sm:p-7">
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Representation
            </div>

            <h3 className="mt-2 font-sans font-bold text-lg text-[var(--ink)]">
              28 × 28 input
            </h3>

            <p className="mt-2 text-xs leading-5 text-neutral-500">
              Bounding-box scaling and center-of-mass alignment
              produce the normalized model input.
            </p>

            <div className="mt-5 flex justify-center">
              <div className="border border-neutral-300 bg-black p-3">
                <canvas
                  ref={previewRef}
                  width={28}
                  height={28}
                  className="h-28 w-28"
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 border-t border-neutral-200 pt-4">
              <Meta
                label="SIZE"
                value="28 × 28"
              />

              <Meta
                label="FEATURES"
                value="784"
              />

              <Meta
                label="RANGE"
                value="0 → 1"
              />
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Prediction
            </div>

            {prediction !== null ? (
              <>
                <div className="mt-3 font-sans font-black text-6xl text-[var(--ink)]">
                  {prediction}
                </div>

                {confidence !== null && (
                  <div className="mt-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">
                        Confidence
                      </span>

                      <span className="font-mono text-neutral-800">
                        {confidence.toFixed(1)}%
                      </span>
                    </div>

                    <div className="mt-2 h-1 bg-neutral-200">
                      <div
                        className="h-1 bg-neutral-900"
                        style={{
                          width: `${Math.min(
                            confidence,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-6">
                <div className="font-serif text-5xl text-neutral-300">
                  ?
                </div>

                <p className="mt-3 text-xs leading-5 text-neutral-500">
                  Run inference to reveal the predicted digit.
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-neutral-200 pt-4">
              <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                Output space
              </div>

              <div className="mt-1 text-sm text-neutral-700">
                10 classes · 0–9
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MNISTPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--pink)]">lochan.dev</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[var(--pink)]">projects</Link>
          <span>/</span>
          <span className="font-bold text-[var(--ink)]">mnist</span>
        </div>
        <span className="font-handwriting text-lg text-[var(--pink)] font-bold -rotate-1">
          Neural Drawing Board ✏️
        </span>
      </div>

      {/* Hero Header Box */}
      <header className="box relative bg-[var(--card)] p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--aqua)] text-3xl shadow-[3px_3px_0_var(--shadow)]">
            ✏️
          </div>
          <div>
            <div className="inline-block rounded-md border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-xs font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] mb-2">
              02 / Machine Learning Case Study
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
              MNIST: handwriting, modeled.
            </h1>
          </div>
        </div>

        <div className="rainbow-bar mt-5 mb-5" aria-hidden="true" />

        <p className="font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-3xl">
          An interactive handwritten-digit classifier that transforms a drawn character into 784 numerical features, passes them through a PyTorch neural network, and returns one of ten digit classes.
        </p>

        {/* Tag chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {["PyTorch", "Classification", "Canvas API", "Tanh Activations", "784→286→120→10"].map((t) => (
            <span key={t} className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">
              #{t}
            </span>
          ))}
        </div>

        {/* Action button row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#demo"
            className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>Try the model ↓</span>
          </a>

          <a
            href="https://github.com/LochanJangid/MNIST"
            target="_blank"
            rel="noreferrer"
            className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>View source ↗</span>
          </a>

          <Link
            href="/#projects"
            className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"
          >
            <span>← Lab Shelf</span>
          </Link>
        </div>

        {/* Metadata stats bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t-2 border-[var(--ink)]/10 pt-6 sm:grid-cols-4">
          <Meta label="FRAMEWORK" value="PyTorch" />
          <Meta label="TASK" value="Classification" />
          <Meta label="INPUT" value="28 × 28" />
          <Meta label="OUTPUT" value="10 classes" />
        </div>
      </header>

        {/* ABSTRACT */}

        <Section number="01" title="Abstract">
          <p>
            The MNIST project explores handwritten-digit
            classification with a small fully connected neural
            network. A browser canvas captures the handwritten
            character, preprocessing converts it into 784
            normalized values, and a PyTorch model maps those
            values to one of ten digit classes.
          </p>
        </Section>

        {/* MODEL */}

        <Section number="02" title="Model Architecture">
          <p className="mb-7">
            The network consists of three Linear layers with
            Tanh activations between the hidden layers.
            Information moves from 784 input features through
            286 and 120 hidden neurons before reaching the ten
            output classes.
          </p>

          <NetworkVisualization />
        </Section>

        {/* CODE */}

        <Section number="03" title="Implementation">
          <p className="mb-5">
            The core model is represented as a PyTorch
            Sequential module.
          </p>

          <pre className="overflow-x-auto border border-neutral-200 bg-neutral-50 p-5 font-mono text-xs leading-6 text-neutral-700">
            <code>{modelCode}</code>
          </pre>
        </Section>

        {/* PIPELINE */}

        <Section number="04" title="Inference Pipeline">
          <div className="border border-neutral-200">
            {pipeline.map(
              ([number, title, description]) => (
                <div
                  key={number}
                  className="grid gap-3 border-b border-neutral-200 px-5 py-5 last:border-0 sm:grid-cols-[55px_120px_1fr]"
                >
                  <span className="font-mono text-xs text-neutral-400">
                    {number}
                  </span>

                  <strong className="text-sm font-medium text-neutral-900">
                    {title}
                  </strong>

                  <span className="text-sm leading-6 text-neutral-600">
                    {description}
                  </span>
                </div>
              )
            )}
          </div>
        </Section>

        {/* ARCHITECTURE TABLE */}

        <Section number="05" title="Layer-by-Layer">
          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left">
              <thead className="border-b border-neutral-300 bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-wider text-neutral-400">
                    STEP
                  </th>

                  <th className="px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-wider text-neutral-400">
                    LAYER
                  </th>

                  <th className="px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-wider text-neutral-400">
                    ROLE
                  </th>
                </tr>
              </thead>

              <tbody>
                {architecture.map(
                  ([number, name, description]) => (
                    <tr
                      key={number}
                      className="border-b border-neutral-200 last:border-0"
                    >
                      <td className="px-4 py-4 font-mono text-xs text-neutral-400">
                        {number}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-neutral-900">
                        {name}
                      </td>

                      <td className="px-4 py-4 text-sm leading-6 text-neutral-600">
                        {description}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* LIVE DEMO */}

        <Section number="06" title="Live Interface">
          <p className="mb-7">
            The browser-side interface keeps the inference
            process visible. A handwritten digit is captured,
            converted to the model input representation, sent
            to the API, and returned as a predicted class.
          </p>

          <MNISTDemo />
        </Section>

        {/* DESIGN DECISION */}

        <Section number="07" title="Design Decision">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                Make the model visible
              </div>

              <p className="mt-3">
                The interface exposes the input representation,
                network structure, intermediate layers, and
                final output instead of treating the classifier
                as a black box.
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                Keep inference concrete
              </div>

              <p className="mt-3">
                The drawing interface demonstrates the complete
                path from a human-generated input to an actual
                model prediction.
              </p>
            </div>
          </div>
        </Section>

        {/* SOURCE */}

        {/* NEXT PROJECT CARD */}
        <section className="box relative bg-[var(--card)] p-6 sm:p-8 mt-10">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)] mb-2">
            Next Case Study
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--aqua)] text-2xl shadow-[3px_3px_0_var(--shadow)]">
                🌐
              </div>
              <div>
                <h3 className="font-sans text-xl font-black text-[var(--ink)]">
                  WebLens AI
                </h3>
                <p className="font-sans text-sm text-[var(--mute)] max-w-md">
                  Autonomous visual audit & code generation studio using Playwright DOM coordinate extraction and multimodal LLMs.
                </p>
              </div>
            </div>
            <Link
              href="/work/weblens-ai"
              className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-1.5"
            >
              <span>Explore Case Study</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* FOOTER BREADCRUMB */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
          <Link href="/#projects" className="hover:text-[var(--pink)] underline underline-offset-4">
            ← Back to Lab Shelf
          </Link>
          <a
            href="https://github.com/LochanJangid/MNIST"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--pink)] underline underline-offset-4"
          >
            github.com/LochanJangid/MNIST ↗
          </a>
        </div>
    </main>
  );
}
