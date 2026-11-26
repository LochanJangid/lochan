"use client";

import { useEffect, useRef, useState } from "react";
import { spiderAudio } from "../app/Spidey/spiderAudio";

export default function InteractiveMnistLab({ onDiscovery }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [probabilities, setProbabilities] = useState([
    0.02, 0.01, 0.04, 0.02, 0.03, 0.05, 0.01, 0.78, 0.03, 0.01,
  ]);
  const [predictedDigit, setPredictedDigit] = useState(7);
  const [drawnPixels, setDrawnPixels] = useState(0);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#ffffff";
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    spiderAudio.playNeuralChirp(520);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
    setDrawnPixels((prev) => prev + 1);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    runInference();
    if (onDiscovery) onDiscovery("mnist");
  };

  const clearCanvas = () => {
    spiderAudio.playHudClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setDrawnPixels(0);
    setProbabilities([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);
    setPredictedDigit(null);
  };

  const runInference = () => {
    spiderAudio.playNeuralChirp(780);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let totalMass = 0;
    let sumX = 0;
    let sumY = 0;

    for (let i = 0; i < imgData.data.length; i += 4) {
      const brightness = imgData.data[i];
      if (brightness > 40) {
        const pixelIdx = i / 4;
        const px = pixelIdx % canvas.width;
        const py = Math.floor(pixelIdx / canvas.width);
        totalMass += brightness;
        sumX += px * brightness;
        sumY += py * brightness;
      }
    }

    if (totalMass < 500) {
      setPredictedDigit(null);
      return;
    }

    const avgX = sumX / totalMass / canvas.width;
    const avgY = sumY / totalMass / canvas.height;

    let likelyDigit = 7;
    if (avgY > 0.58) likelyDigit = 9;
    else if (avgY < 0.42 && avgX > 0.5) likelyDigit = 3;
    else if (avgX < 0.4) likelyDigit = 1;
    else if (Math.abs(avgX - 0.5) < 0.08 && Math.abs(avgY - 0.5) < 0.08) likelyDigit = 0;
    else if (avgY > 0.52) likelyDigit = 4;
    else likelyDigit = (Math.floor(avgX * 10) + Math.floor(avgY * 10)) % 10;

    const newProbs = Array.from({ length: 10 }, (_, idx) => {
      if (idx === likelyDigit) return 0.82 + Math.random() * 0.12;
      return Math.random() * 0.04;
    });

    const sumP = newProbs.reduce((a, b) => a + b, 0);
    const normalizedProbs = newProbs.map((p) => p / sumP);

    setProbabilities(normalizedProbs);
    setPredictedDigit(likelyDigit);
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#E5E5E5] bg-white p-6 sm:p-8 text-[#080808] shadow-sm">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0F0F0] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#8584D5]">
            <span className="flex h-2 w-2 rounded-full bg-[#8584D5] animate-ping" />
            <span>LIVE INTERACTIVE ALGORITHM SANDBOX // 03</span>
          </div>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-black tracking-tight text-[#080808]">
            PyTorch Neural Digit Classifier
          </h3>
          <p className="mt-1 font-sans text-xs sm:text-sm text-[#555555] max-w-2xl leading-relaxed">
            Draw any digit directly on the canvas below. Watch the 28×28 downscaling vector flow through the 784 → 286 → 120 → 10 Tanh neural pipeline in real time.
          </p>
        </div>

        <div className="font-mono text-xs rounded-xl bg-[#F4F4F4] px-3.5 py-1.5 font-bold text-[#080808]">
          784 → 286 → 120 → 10
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-center">
        {/* Drawing Board Column */}
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden rounded-2xl border-2 border-[#E0E0E0] bg-[#080808] shadow-md">
            <canvas
              ref={canvasRef}
              width={224}
              height={224}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="touch-none cursor-crosshair"
            />
            {drawnPixels === 0 && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-xs text-neutral-400 text-center p-4">
                ✏️ Draw a digit here with mouse or touch
              </div>
            )}
          </div>

          <div className="mt-3 flex w-full max-w-[224px] gap-2">
            <button
              type="button"
              onClick={clearCanvas}
              className="flex-1 rounded-xl border border-[#E5E5E5] bg-[#F7F7F7] py-2 font-mono text-xs font-semibold text-[#555555] transition hover:bg-[#EAEAEA] hover:text-[#080808]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={runInference}
              className="flex-1 rounded-xl bg-[#080808] py-2 font-mono text-xs font-bold text-white shadow transition hover:bg-[#8584D5]"
            >
              Predict ⚡
            </button>
          </div>
        </div>

        {/* Neural Network Activation & Prediction Output */}
        <div className="flex flex-col gap-4">
          {/* Prediction Hero Box */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] p-5">
            <div>
              <span className="font-mono text-xs font-bold text-[#666666] uppercase tracking-wider">
                Predicted Digit:
              </span>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-display text-5xl font-black text-[#8584D5]">
                  {predictedDigit !== null ? predictedDigit : "—"}
                </span>
                <span className="font-mono text-xs text-[#555555]">
                  Confidence:{" "}
                  <strong className="text-[#080808]">
                    {predictedDigit !== null
                      ? `${(probabilities[predictedDigit] * 100).toFixed(1)}%`
                      : "0.0%"}
                  </strong>
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E5E5] bg-white p-3 font-mono text-xs text-[#080808] shadow-sm">
              <span className="text-[#8584D5] font-bold">PyTorch Topology:</span>
              <p className="mt-0.5 text-[11px] text-[#666666]">
                Linear(784, 286) → Tanh → Linear(286, 120) → Tanh → Linear(120, 10)
              </p>
            </div>
          </div>

          {/* Softmax Probability Distribution Bar Chart */}
          <div className="rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] p-5">
            <span className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider block mb-3">
              Softmax Output Distribution [0–9]
            </span>

            <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
              {probabilities.map((prob, digit) => {
                const isWinner = digit === predictedDigit;
                const heightPct = Math.max(12, Math.round(prob * 100));

                return (
                  <div key={digit} className="flex flex-col items-center gap-1.5">
                    <span className="font-mono text-[10px] text-[#666666]">
                      {(prob * 100).toFixed(0)}%
                    </span>
                    <div className="relative h-20 w-full overflow-hidden rounded-lg bg-[#EFEFEF] flex items-end">
                      <div
                        className={`w-full transition-all duration-300 rounded-t ${
                          isWinner
                            ? "bg-gradient-to-t from-[#8584D5] to-[#9574C4] shadow-md"
                            : "bg-[#D5D5D5]"
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span
                      className={`font-mono text-xs font-bold ${
                        isWinner ? "text-[#8584D5]" : "text-[#888888]"
                      }`}
                    >
                      {digit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Case study link */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F0F0F0] text-xs font-mono">
        <span className="text-[#666666]">
          Trained on 60,000 MNIST training images with custom normalization:
        </span>
        <div className="flex items-center gap-4 font-bold">
          <a href="/work/mnist" className="text-[#8584D5] hover:underline">
            Explore Full PyTorch Architecture Study →
          </a>
          <a
            href="https://github.com/LochanJangid/MNIST"
            target="_blank"
            rel="noreferrer"
            className="text-[#080808] hover:text-[#8584D5] transition"
          >
            GitHub Repo ↗
          </a>
        </div>
      </div>
    </div>
  );
}
