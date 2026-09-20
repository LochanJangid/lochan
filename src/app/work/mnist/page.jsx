"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const apiBaseUrl = process.env.NEXT_PUBLIC_MNIST_API_URL;

  // Your FastAPI endpoint.
const predictUrl = apiBaseUrl ? `${apiBaseUrl}/predict` : '';

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

const code = [
  "model = torch.nn.Sequential(",
  "    torch.nn.Linear(784, 286),",
  "    torch.nn.Tanh(),",
  "    torch.nn.Linear(286, 120),",
  "    torch.nn.Tanh(),",
  "    torch.nn.Linear(120, 10)",
  ")",
];

function NetworkVisualization() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((value) => value + 1);
    }, 140);

    return () => clearInterval(timer);
  }, []);

  const glow = (index, layer) => {
    const wave =
      Math.sin(
        frame * 0.27 +
          index * 0.91 +
          layer * 1.7
      );

    return 0.15 + ((wave + 1) / 2) * 0.85;
  };

  const outputs = [3, 5, 2, 4, 3, 2, 4, 97, 8, 3];

  return (
    <div className="mnist-network-card">

      <div className="mnist-network-card-head">
        <div>
          <div className="mnist-kicker">Inference snapshot</div>
          <h3>From pixels to prediction.</h3>
        </div>

        <div className="mnist-live">
          <span />
          LIVE
        </div>
      </div>

      <div className="mnist-network-flow">

        <div className="mnist-network-unit">
          <div className="mnist-input-symbol">7</div>

          <div className="mnist-unit-label">
            <span>INPUT</span>
            <strong>28 × 28</strong>
            <small>784 pixels</small>
          </div>
        </div>

        <div className="mnist-wire">
          <i />
          <i />
          <i />
        </div>

        <div className="mnist-network-unit">
          <div className="mnist-neurons mnist-neurons-large">
            {Array.from({ length: 30 }).map((_, index) => (
              <span
                key={index}
                style={{
                  opacity: glow(index, 1),
                  transform: `scale(${0.72 + glow(index, 1) * 0.5})`,
                }}
              />
            ))}
          </div>

          <div className="mnist-unit-label">
            <span>LINEAR + TANH</span>
            <strong>286 neurons</strong>
            <small>hidden layer 01</small>
          </div>
        </div>

        <div className="mnist-wire">
          <i />
          <i />
          <i />
        </div>

        <div className="mnist-network-unit">
          <div className="mnist-neurons mnist-neurons-medium">
            {Array.from({ length: 20 }).map((_, index) => (
              <span
                key={index}
                style={{
                  opacity: glow(index, 2),
                  transform: `scale(${0.72 + glow(index, 2) * 0.5})`,
                }}
              />
            ))}
          </div>

          <div className="mnist-unit-label">
            <span>LINEAR + TANH</span>
            <strong>120 neurons</strong>
            <small>hidden layer 02</small>
          </div>
        </div>

        <div className="mnist-wire">
          <i />
          <i />
          <i />
        </div>

        <div className="mnist-network-unit mnist-output-unit">

          <div className="mnist-output-bars">
            {outputs.map((value, index) => (
              <div
                className={`mnist-output-row ${
                  index === 7 ? "winner" : ""
                }`}
                key={index}
              >
                <span>{index}</span>

                <div>
                  <i
                    style={{
                      width: `${value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mnist-network-result">
            <span>PREDICTION</span>
            <strong>7</strong>
            <em>98.7%</em>
          </div>

        </div>

      </div>

      <div className="mnist-network-specs">
        <div>
          <span>ARCHITECTURE</span>
          <strong>784 → 286 → 120 → 10</strong>
        </div>

        <div>
          <span>ACTIVATION</span>
          <strong>Tanh</strong>
        </div>

        <div>
          <span>PARAMETERS</span>
          <strong>260,160</strong>
        </div>
      </div>
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
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        ((point.clientX - rect.left) / rect.width) *
        canvas.width,
      y:
        ((point.clientY - rect.top) / rect.height) *
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
    if (event) event.preventDefault();

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

    // 1. Read the drawing and invert it: black bg, white ink, 0-255
    const raw = canvas.getContext("2d").getImageData(0, 0, w, h);
    const gray = new Float32Array(w * h);
    for (let i = 0, p = 0; i < raw.data.length; i += 4, p++) {
      gray[p] = 255 - raw.data[i]; // white bg(255) -> 0, dark ink(~8) -> ~247
    }

    // 2. Bounding box + center of mass of the ink
    const threshold = 20;
    let minX = w, maxX = -1, minY = h, maxY = -1;
    let sum = 0, sumX = 0, sumY = 0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const v = gray[y * w + x];
        if (v > threshold) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          sum += v;
          sumX += v * x;
          sumY += v * y;
        }
      }
    }

    if (maxX < 0) return new Array(784).fill(0); // empty canvas

    const boxW = maxX - minX + 1;
    const boxH = maxY - minY + 1;

    // 3. Put the inverted image on a source canvas so we can crop/scale it
    const src = document.createElement("canvas");
    src.width = w;
    src.height = h;
    const srcCtx = src.getContext("2d");
    const invertedImg = srcCtx.createImageData(w, h);
    for (let p = 0; p < gray.length; p++) {
      const v = gray[p];
      invertedImg.data[p * 4] = v;
      invertedImg.data[p * 4 + 1] = v;
      invertedImg.data[p * 4 + 2] = v;
      invertedImg.data[p * 4 + 3] = 255;
    }
    srcCtx.putImageData(invertedImg, 0, 0);

    // 4. Scale so the longer side of the bounding box becomes 20px (MNIST's convention)
    const target = 20;
    const scale = target / Math.max(boxW, boxH);
    const destW = Math.max(1, Math.round(boxW * scale));
    const destH = Math.max(1, Math.round(boxH * scale));

    const scaled = document.createElement("canvas");
    scaled.width = destW;
    scaled.height = destH;
    const scaledCtx = scaled.getContext("2d");
    scaledCtx.imageSmoothingEnabled = true;
    scaledCtx.imageSmoothingQuality = "high";
    scaledCtx.drawImage(src, minX, minY, boxW, boxH, 0, 0, destW, destH);

    // 5. Center by center of mass (not bounding-box center) in a 28x28 frame
    const comXCropped = (sumX / sum - minX) * scale;
    const comYCropped = (sumY / sum - minY) * scale;
    const offsetX = Math.round(14 - comXCropped);
    const offsetY = Math.round(14 - comYCropped);

    const final = document.createElement("canvas");
    final.width = 28;
    final.height = 28;
    const finalCtx = final.getContext("2d");
    finalCtx.fillStyle = "#000000";
    finalCtx.fillRect(0, 0, 28, 28);
    finalCtx.drawImage(scaled, offsetX, offsetY);

    // 6. Extract normalized pixel values
    const data = finalCtx.getImageData(0, 0, 28, 28);
    const pixels = [];
    for (let i = 0; i < data.data.length; i += 4) {
      pixels.push(Number((data.data[i] / 255).toFixed(4)));
    }
    return pixels;
  }

  function updatePreview() {
    const preview = previewRef.current;

    if (!preview || !canvasRef.current) return;

    const ctx = preview.getContext("2d");

    const pixels = getPixels();

    const imageData =
      ctx.createImageData(28, 28);

    pixels.forEach((pixel, index) => {
      const value = Math.round(
        pixel * 255
      );

      const offset = index * 4;

      imageData.data[offset] = value;
      imageData.data[offset + 1] = value;
      imageData.data[offset + 2] = value;
      imageData.data[offset + 3] = 255;
    });

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
      const response = await fetch(
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
        const number = Number(score);

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
    <div className="mnist-demo-grid">

      {/* LEFT */}

      <article className="mnist-demo-card mnist-input-card">

        <div className="mnist-card-heading">
          <div>
            <div className="mnist-kicker">
              01 / Input
            </div>

            <h3>
              Draw a digit.
            </h3>

            <p>
              Write any number from 0 to 9.
            </p>
          </div>

          <span className="mnist-meta">
            280 × 280
          </span>
        </div>

        <div className="mnist-canvas-frame">

          {!hasDrawing && (
            <span className="mnist-canvas-placeholder">
              WRITE HERE
            </span>
          )}

          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="mnist-drawing-canvas"

            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}

            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
          />

        </div>

        <div className="mnist-input-bottom">

          <div>
            <span className="mnist-small-label">
              CANVAS
            </span>

            <strong>
              White background · dark ink
            </strong>
          </div>

          <div className="mnist-button-row">

            <button
              type="button"
              className="mnist-button secondary"
              onClick={clearCanvas}
            >
              Clear
            </button>

            <button
              type="button"
              className="mnist-button primary"
              onClick={predictDigit}
              disabled={loading}
            >
              {loading
                ? "Running inference..."
                : "Predict digit →"}
            </button>

          </div>

        </div>

        {error && (
          <div className="mnist-error">
            {error}
          </div>
        )}

      </article>


      {/* RIGHT */}

      <div className="mnist-results-column">

        <article className="mnist-demo-card mnist-analysis-card">

          <div className="mnist-card-heading">
            <div>
              <div className="mnist-kicker">
                02 / Representation
              </div>

              <h3>
                What the model sees.
              </h3>

              <p>
                Your drawing reduced to the MNIST format.
              </p>
            </div>
          </div>

          <div className="mnist-preview-frame">

            <canvas
              ref={previewRef}
              width={28}
              height={28}
              className="mnist-preview-canvas"
            />

          </div>

          <div className="mnist-specs">

            <div>
              <span>DIMENSION</span>
              <strong>28 × 28</strong>
            </div>

            <div>
              <span>FEATURES</span>
              <strong>784</strong>
            </div>

            <div>
              <span>RANGE</span>
              <strong>0 → 1</strong>
            </div>

          </div>

        </article>


        <article className="mnist-demo-card mnist-output-card">

          <div className="mnist-card-heading">
            <div>
              <div className="mnist-kicker">
                03 / Output
              </div>

              <h3>
                Model prediction.
              </h3>

              <p>
                The strongest class becomes the result.
              </p>
            </div>
          </div>

          <div className="mnist-result-area">

            {prediction !== null ? (
              <>
                <div className="mnist-result-number">
                  {prediction}
                </div>

                {confidence !== null && (
                  <div className="mnist-confidence">

                    <div>
                      <span>
                        CONFIDENCE
                      </span>

                      <strong>
                        {confidence.toFixed(1)}%
                      </strong>
                    </div>

                    <div className="mnist-confidence-track">
                      <span
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
              <div className="mnist-empty-result">

                <div>?</div>

                <p>
                  Run inference to reveal
                  the predicted digit.
                </p>

              </div>
            )}

          </div>

          <div className="mnist-output-footer">
            <span>
              OUTPUT SPACE
            </span>

            <strong>
              10 classes · 0–9
            </strong>
          </div>

        </article>

      </div>

    </div>
  );
}


export default function MNISTPage() {
  return (
    <main className="page-shell mnist-page">

      <Navbar />


      {/* HERO */}

      <section className="project-page-hero">

        <div className="container">

          <div className="kicker mono">
            02 / Machine learning case study
          </div>

          <h1 className="project-page-title display">
            MNIST:
            <br />
            handwriting, modeled.
          </h1>

          <p className="project-page-sub">
            An interactive handwritten-digit classifier that
            transforms a drawn character into 784 numerical
            features, passes them through a PyTorch neural
            network, and returns one of ten digit classes.
          </p>

          <div
            className="hero-actions"
            style={{ marginTop: 30 }}
          >

            <a
              className="btn btn-primary"
              href="#demo"
            >
              Try the model ↓
            </a>

            <a
              className="btn btn-secondary"
              href="https://github.com/LochanJangid/MNIST"
              target="_blank"
              rel="noreferrer"
            >
              View source ↗
            </a>

          </div>

          <div className="project-hero-meta">

            <div className="meta-block">
              <div className="meta-label mono">
                Framework
              </div>

              <div className="meta-value">
                PyTorch
              </div>
            </div>

            <div className="meta-block">
              <div className="meta-label mono">
                Task
              </div>

              <div className="meta-value">
                Classification
              </div>
            </div>

            <div className="meta-block">
              <div className="meta-label mono">
                Input
              </div>

              <div className="meta-value">
                28 × 28
              </div>
            </div>

            <div className="meta-block">
              <div className="meta-label mono">
                Output
              </div>

              <div className="meta-value">
                10 classes
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* MODEL */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div>
              <div className="kicker mono">
                Model anatomy
              </div>

              <h2 className="section-title display">
                Watch the
                <br />
                signal travel.
              </h2>
            </div>

            <p className="section-note">
              The actual Sequential architecture visualized as
              a flow of information from the handwritten input
              through hidden layers into ten output classes.
            </p>

          </div>

          <NetworkVisualization />

        </div>

      </section>


      {/* SPECIFICATION */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div>
              <div className="kicker mono">
                Model specification
              </div>

              <h2 className="section-title display">
                Small network.
                <br />
                Clear structure.
              </h2>
            </div>

            <p className="section-note">
              Three Linear layers and two Tanh activations form
              the complete classifier.
            </p>

          </div>

          <div className="mnist-metrics">

            <div>
              <strong>784</strong>
              <span>Input features</span>
            </div>

            <div>
              <strong>286</strong>
              <span>Hidden layer 01</span>
            </div>

            <div>
              <strong>120</strong>
              <span>Hidden layer 02</span>
            </div>

            <div>
              <strong>10</strong>
              <span>Output classes</span>
            </div>

          </div>

        </div>

      </section>


      {/* PROBLEM */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div>
              <div className="kicker mono">
                The problem
              </div>

              <h2 className="section-title display">
                How does a
                <br />
                machine see 7?
              </h2>
            </div>

            <p className="section-note">
              A person sees a handwritten symbol. The model sees
              a structured field of numerical values.
            </p>

          </div>

          <div className="mnist-story-grid">

            <article>
              <span className="mnist-story-number">
                01 / INPUT
              </span>

              <h3>
                Pixels become features.
              </h3>

              <p>
                The drawing is reduced to a 28 × 28 grayscale
                image. Each pixel becomes one feature in a
                784-value vector.
              </p>
            </article>

            <article>
              <span className="mnist-story-number">
                02 / OUTPUT
              </span>

              <h3>
                Scores become a class.
              </h3>

              <p>
                The last Linear layer produces ten values. The
                strongest response represents the predicted digit.
              </p>
            </article>

          </div>

        </div>

      </section>


      {/* ARCHITECTURE */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div>
              <div className="kicker mono">
                Architecture
              </div>

              <h2 className="section-title display">
                Inside the
                <br />
                Sequential model.
              </h2>
            </div>

            <p className="section-note">
              The implementation mirrors the exact PyTorch model
              used for inference.
            </p>

          </div>

          <div className="mnist-code-card">

            <div className="mnist-code-top">

              <div>
                <span />
                <span />
                <span />
              </div>

              <span className="mono">
                model.py
              </span>

            </div>

            <pre>
              {code.map((line, index) => (
                <div key={`${line}-${index}`}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <code>
                    {line}
                  </code>
                </div>
              ))}
            </pre>

          </div>


          <div className="mnist-architecture-grid">

            {architecture.map(
              ([number, title, text]) => (
                <article key={number}>

                  <span className="mono">
                    {number}
                  </span>

                  <h3>
                    {title}
                  </h3>

                  <p>
                    {text}
                  </p>

                </article>
              )
            )}

          </div>

        </div>

      </section>


      {/* LIVE DEMO */}

      <section
        className="section"
        id="demo"
      >

        <div className="container">

          <div className="section-head">

            <div>
              <div className="kicker mono">
                Live interface
              </div>

              <h2 className="section-title display">
                Use the model.
              </h2>
            </div>

            <p className="section-note">
              Draw on the white canvas. Your input is converted
              into 784 normalized values before inference.
            </p>

          </div>

          <MNISTDemo />

        </div>

      </section>


      {/* PIPELINE */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div>
              <div className="kicker mono">
                Inference pipeline
              </div>

              <h2 className="section-title display">
                Five steps.
                <br />
                One prediction.
              </h2>
            </div>

            <p className="section-note">
              Every stage is visible, from the handwritten input
              to the final class.
            </p>

          </div>

          <div className="mnist-pipeline">

            {pipeline.map(
              ([number, title, text]) => (
                <article key={number}>

                  <span className="mono">
                    {number}
                  </span>

                  <h3>
                    {title}
                  </h3>

                  <p>
                    {text}
                  </p>

                </article>
              )
            )}

          </div>

        </div>

      </section>


      {/* SOURCE */}

      <section className="section">

        <div className="container">

          <div className="mnist-story-grid">

            <article>

              <span className="mnist-story-number">
                DESIGN DECISION
              </span>

              <h3>
                Make the model visible.
              </h3>

              <p>
                The interface shows the input representation,
                neural layers, activations, and output rather
                than treating the classifier as a black box.
              </p>

            </article>

            <article>

              <span className="mnist-story-number">
                SOURCE
              </span>

              <h3>
                Inspect the implementation.
              </h3>

              <p>
                The model and project implementation are publicly
                available for inspection and experimentation.
              </p>

              <a
                className="project-link"
                href="https://github.com/LochanJangid/MNIST"
                target="_blank"
                rel="noreferrer"
              >
                Open GitHub repository ↗
              </a>

            </article>

          </div>

        </div>

      </section>


      <Footer />


      <style jsx global>{`

        /* =====================================================
           MNIST CASE STUDY
           ===================================================== */

        .mnist-page {
          --mnist-cream: #fef3e7;
          --mnist-brown: #362216;
          --mnist-border: #dfcfbf;
          --mnist-muted: #806f61;

          background: var(--mnist-cream);
          color: var(--mnist-brown);

          min-height: 100vh;
        }


        /* =====================================================
           GENERAL
           ===================================================== */

        .mnist-page * {
          box-sizing: border-box;
        }

        .mnist-kicker {
          font-family: "DM Mono", monospace;

          font-size: 8px;

          line-height: 1.2;

          letter-spacing: .13em;

          text-transform: uppercase;

          color: var(--mnist-muted);
        }


        /* =====================================================
           MODEL VISUAL
           ===================================================== */

        .mnist-network-card {
          width: 100%;

          padding: 30px;

          border:
            1px solid
            rgba(255,255,255,.13);

          border-radius: 18px;

          background:
            var(--mnist-brown);

          color: var(--mnist-cream);

          overflow: hidden;
        }

        .mnist-network-card-head {
          display: flex;

          align-items: flex-start;
          justify-content: space-between;

          gap: 24px;
        }

        .mnist-network-card-head h3 {
          margin: 8px 0 0;

          font-size: 22px;

          font-weight: 500;

          letter-spacing: -.025em;
        }

        .mnist-network-card .mnist-kicker {
          color: rgba(254,243,231,.44);
        }

        .mnist-live {
          display: flex;

          align-items: center;

          gap: 7px;

          font-family: "DM Mono", monospace;

          font-size: 8px;

          letter-spacing: .12em;

          color:
            rgba(254,243,231,.48);
        }

        .mnist-live span {
          width: 6px;
          height: 6px;

          display: block;

          border-radius: 50%;

          background:
            var(--mnist-cream);

          animation:
            mnist-pulse 1.5s
            ease-in-out infinite;
        }

        @keyframes mnist-pulse {

          0%,100% {
            opacity: .25;
          }

          50% {
            opacity: 1;
          }

        }

        .mnist-network-flow {
          display: grid;

          grid-template-columns:
            minmax(90px,.8fr)
            minmax(35px,.25fr)
            minmax(115px,1fr)
            minmax(35px,.25fr)
            minmax(105px,.9fr)
            minmax(35px,.25fr)
            minmax(130px,1.1fr);

          align-items: center;

          gap: 8px;

          min-height: 260px;

          margin: 38px 0;
        }

        .mnist-network-unit {
          min-width: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          text-align: center;
        }

        .mnist-input-symbol {
          width: 86px;
          height: 86px;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(254,243,231,.27);

          border-radius: 14px;

          background:
            rgba(254,243,231,.035);

          font-family:
            Georgia,
            serif;

          font-size: 66px;

          line-height: .8;
        }

        .mnist-unit-label {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 4px;

          margin-top: 12px;
        }

        .mnist-unit-label span {
          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .1em;

          color:
            rgba(254,243,231,.42);
        }

        .mnist-unit-label strong {
          font-size: 10px;

          font-weight: 500;
        }

        .mnist-unit-label small {
          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          color:
            rgba(254,243,231,.28);
        }


        /* NEURONS */

        .mnist-neurons {
          display: grid;

          place-items: center;

          border-radius: 50%;

          border:
            1px solid
            rgba(254,243,231,.10);

          background:
            rgba(254,243,231,.025);
        }

        .mnist-neurons-large {
          width: 116px;
          height: 116px;

          grid-template-columns:
            repeat(6,1fr);

          gap: 7px;

          padding: 19px;
        }

        .mnist-neurons-medium {
          width: 94px;
          height: 94px;

          grid-template-columns:
            repeat(5,1fr);

          gap: 7px;

          padding: 16px;
        }

        .mnist-neurons span {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            var(--mnist-cream);

          box-shadow:
            0 0 8px
            rgba(254,243,231,.25);

          transition:
            opacity .18s ease,
            transform .18s ease;
        }


        /* WIRES */

        .mnist-wire {
          height: 90px;

          position: relative;

          display: flex;

          align-items: center;
        }

        .mnist-wire::before {
          content: "";

          position: absolute;

          left: 0;
          right: 0;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(254,243,231,.24),
              transparent
            );
        }

        .mnist-wire i {
          position: absolute;

          left: 0;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            var(--mnist-cream);

          opacity: 0;

          animation:
            mnist-flow 1.55s
            linear infinite;
        }

        .mnist-wire i:nth-child(2) {
          animation-delay: .48s;
        }

        .mnist-wire i:nth-child(3) {
          animation-delay: .96s;
        }

        @keyframes mnist-flow {

          0% {
            left: 0;
            opacity: 0;
          }

          15% {
            opacity: .75;
          }

          80% {
            opacity: .75;
          }

          100% {
            left: 100%;
            opacity: 0;
          }

        }


        /* OUTPUT */

        .mnist-output-bars {
          width: 100%;

          max-width: 155px;

          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .mnist-output-row {
          display: grid;

          grid-template-columns:
            10px 1fr;

          gap: 6px;

          align-items: center;
        }

        .mnist-output-row > span {
          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          color:
            rgba(254,243,231,.44);
        }

        .mnist-output-row > div {
          height: 4px;

          overflow: hidden;

          border-radius: 999px;

          background:
            rgba(254,243,231,.08);
        }

        .mnist-output-row i {
          display: block;

          height: 100%;

          border-radius: inherit;

          background:
            rgba(254,243,231,.34);

          transition:
            width .35s ease;
        }

        .mnist-output-row.winner i {
          background:
            var(--mnist-cream);

          box-shadow:
            0 0 8px
            rgba(254,243,231,.25);
        }

        .mnist-network-result {
          display: flex;

          align-items: baseline;
          justify-content: center;

          gap: 7px;

          margin-top: 12px;
        }

        .mnist-network-result span {
          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          color:
            rgba(254,243,231,.38);
        }

        .mnist-network-result strong {
          font-family:
            Georgia,
            serif;

          font-size: 31px;

          line-height: 1;
        }

        .mnist-network-result em {
          font-family:
            "DM Mono",
            monospace;

          font-style: normal;

          font-size: 8px;

          color:
            rgba(254,243,231,.48);
        }


        /* NETWORK SPECS */

        .mnist-network-specs {
          display: grid;

          grid-template-columns:
            1.5fr .8fr .9fr;

          gap: 20px;

          padding-top: 18px;

          border-top:
            1px solid
            rgba(254,243,231,.10);
        }

        .mnist-network-specs div {
          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .mnist-network-specs span {
          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          color:
            rgba(254,243,231,.34);
        }

        .mnist-network-specs strong {
          font-size: 10px;

          font-weight: 500;
        }


        /* =====================================================
           METRICS
           ===================================================== */

        .mnist-metrics {
          display: grid;

          grid-template-columns:
            repeat(4,minmax(0,1fr));

          gap: 12px;
        }

        .mnist-metrics > div {
          min-width: 0;

          padding: 23px;

          border:
            1px solid
            var(--mnist-border);

          border-radius: 13px;

          background:
            rgba(255,255,255,.20);
        }

        .mnist-metrics strong {
          display: block;

          font-family:
            Georgia,
            serif;

          font-size: 46px;

          line-height: .85;

          font-weight: 500;
        }

        .mnist-metrics span {
          display: block;

          margin-top: 12px;

          color: var(--mnist-muted);

          font-size: 11px;
        }


        /* =====================================================
           STORIES
           ===================================================== */

        .mnist-story-grid {
          display: grid;

          grid-template-columns:
            repeat(2,minmax(0,1fr));

          gap: 20px;
        }

        .mnist-story-grid article {
          min-width: 0;

          padding: 27px;

          border:
            1px solid
            var(--mnist-border);

          border-radius: 15px;

          background:
            rgba(255,255,255,.15);
        }

        .mnist-story-number {
          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .12em;

          color:
            var(--mnist-muted);
        }

        .mnist-story-grid h3 {
          margin: 37px 0 13px;

          font-size: 22px;

          line-height: 1.1;

          font-weight: 500;

          letter-spacing: -.02em;
        }

        .mnist-story-grid p {
          max-width: 600px;

          margin: 0;

          font-size: 13px;

          line-height: 1.65;

          color:
            var(--mnist-muted);
        }


        /* =====================================================
           CODE
           ===================================================== */

        .mnist-code-card {
          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.12);

          border-radius: 16px;

          background:
            var(--mnist-brown);

          color:
            var(--mnist-cream);
        }

        .mnist-code-top {
          height: 43px;

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 0 16px;

          border-bottom:
            1px solid
            rgba(255,255,255,.08);
        }

        .mnist-code-top > div {
          display: flex;

          gap: 5px;
        }

        .mnist-code-top > div span {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          border:
            1px solid
            rgba(255,255,255,.24);
        }

        .mnist-code-top > .mono {
          font-size: 8px;

          color:
            rgba(254,243,231,.37);
        }

        .mnist-code-card pre {
          margin: 0;

          padding: 23px;

          overflow-x: auto;

          font-family:
            "DM Mono",
            monospace;

          font-size: 12px;

          line-height: 1.9;
        }

        .mnist-code-card pre > div {
          display: flex;
        }

        .mnist-code-card pre > div > span {
          width: 30px;

          flex: 0 0 30px;

          margin-right: 13px;

          color:
            rgba(254,243,231,.22);
        }

        .mnist-code-card code {
          font-family: inherit;
        }


        /* =====================================================
           ARCHITECTURE
           ===================================================== */

        .mnist-architecture-grid {
          display: grid;

          grid-template-columns:
            repeat(5,minmax(0,1fr));

          gap: 1px;

          margin-top: 20px;

          overflow: hidden;

          border:
            1px solid
            var(--mnist-border);

          border-radius: 15px;

          background:
            var(--mnist-border);
        }

        .mnist-architecture-grid article {
          min-height: 185px;

          padding: 22px;

          background:
            var(--mnist-cream);
        }

        .mnist-architecture-grid article > span {
          font-size: 8px;

          color:
            var(--mnist-muted);
        }

        .mnist-architecture-grid h3 {
          margin: 43px 0 10px;

          font-size: 16px;

          font-weight: 500;
        }

        .mnist-architecture-grid p {
          margin: 0;

          font-size: 12px;

          line-height: 1.55;

          color:
            var(--mnist-muted);
        }


        /* =====================================================
           LIVE DEMO
           ===================================================== */

        .mnist-demo-grid {
          display: grid;

          grid-template-columns:
            minmax(0,1.15fr)
            minmax(360px,.85fr);

          gap: 20px;

          align-items: stretch;
        }

        .mnist-demo-card {
          min-width: 0;

          padding: 25px;

          border:
            1px solid
            var(--mnist-border);

          border-radius: 16px;

          background:
            rgba(255,255,255,.18);
        }

        .mnist-card-heading {
          display: flex;

          align-items: flex-start;
          justify-content: space-between;

          gap: 20px;

          margin-bottom: 20px;
        }

        .mnist-card-heading h3 {
          margin: 7px 0 7px;

          font-size: 21px;

          line-height: 1.05;

          font-weight: 500;

          letter-spacing: -.025em;
        }

        .mnist-card-heading p {
          margin: 0;

          color:
            var(--mnist-muted);

          font-size: 12px;

          line-height: 1.55;
        }

        .mnist-meta {
          flex: 0 0 auto;

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          color:
            var(--mnist-muted);
        }


        /* CANVAS */

        .mnist-input-card {
          display: flex;

          flex-direction: column;
        }

        .mnist-canvas-frame {
          position: relative;

          width: min(100%,560px);

          aspect-ratio: 1;

          margin: 0 auto;

          overflow: hidden;

          background: #ffffff;

          border:
            1px solid
            #d9d9d9;

          border-radius: 13px;
        }

        .mnist-drawing-canvas {
          width: 100%;
          height: 100%;

          display: block;

          background: #ffffff;

          cursor: crosshair;

          touch-action: none;
        }

        .mnist-canvas-placeholder {
          position: absolute;

          inset: 0;

          display: grid;

          place-items: center;

          pointer-events: none;

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .15em;

          color: #c6beb6;
        }

        .mnist-input-bottom {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 20px;

          margin-top: 17px;
        }

        .mnist-input-bottom > div:first-child {
          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .mnist-small-label {
          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          color:
            var(--mnist-muted);
        }

        .mnist-input-bottom strong {
          font-size: 11px;

          font-weight: 500;
        }

        .mnist-button-row {
          display: flex;

          gap: 9px;
        }

        .mnist-button {
          border: 0;

          border-radius: 999px;

          padding: 11px 16px;

          font-family: inherit;

          font-size: 12px;

          cursor: pointer;

          white-space: nowrap;
        }

        .mnist-button.primary {
          background:
            var(--mnist-brown);

          color:
            var(--mnist-cream);
        }

        .mnist-button.secondary {
          background:
            transparent;

          color:
            var(--mnist-brown);

          border:
            1px solid
            var(--mnist-border);
        }

        .mnist-button:disabled {
          opacity: .5;

          cursor: wait;
        }


        /* RIGHT */

        .mnist-results-column {
          min-width: 0;

          display: grid;

          grid-template-rows:
            minmax(0,1fr)
            minmax(0,1fr);

          gap: 20px;
        }

        .mnist-preview-frame {
          min-height: 230px;

          display: grid;

          place-items: center;

          background:
            #050403;

          border:
            1px solid
            rgba(255,255,255,.1);

          border-radius: 13px;
        }

        .mnist-preview-canvas {
          width: 165px;
          height: 165px;

          image-rendering: pixelated;

          border:
            1px solid
            rgba(255,255,255,.12);
        }

        .mnist-specs {
          display: grid;

          grid-template-columns:
            repeat(3,minmax(0,1fr));

          gap: 13px;

          margin-top: 15px;
        }

        .mnist-specs > div {
          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .mnist-specs span {
          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          color:
            var(--mnist-muted);
        }

        .mnist-specs strong {
          font-size: 11px;

          font-weight: 500;
        }


        /* RESULT */

        .mnist-output-card {
          display: flex;

          flex-direction: column;
        }

        .mnist-result-area {
          flex: 1;

          min-height: 210px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          text-align: center;
        }

        .mnist-result-number {
          font-family:
            Georgia,
            serif;

          font-size: 145px;

          line-height: .72;

          letter-spacing: -.08em;

          color:
            var(--mnist-brown);
        }

        .mnist-confidence {
          width: min(280px,100%);

          margin-top: 27px;
        }

        .mnist-confidence > div:first-child {
          display: flex;

          justify-content: space-between;

          margin-bottom: 8px;
        }

        .mnist-confidence span {
          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          color:
            var(--mnist-muted);
        }

        .mnist-confidence strong {
          font-family:
            "DM Mono",
            monospace;

          font-size: 10px;

          font-weight: 500;
        }

        .mnist-confidence-track {
          height: 4px;

          overflow: hidden;

          border-radius: 999px;

          background:
            rgba(54,34,22,.1);
        }

        .mnist-confidence-track span {
          display: block;

          height: 100%;

          background:
            var(--mnist-brown);

          border-radius: inherit;

          transition:
            width .45s ease;
        }

        .mnist-empty-result {
          color:
            var(--mnist-muted);
        }

        .mnist-empty-result > div {
          font-family:
            Georgia,
            serif;

          font-size: 85px;

          line-height: .8;

          color:
            var(--mnist-brown);

          opacity: .4;

          margin-bottom: 18px;
        }

        .mnist-empty-result p {
          margin: 0;

          font-size: 12px;
        }

        .mnist-output-footer {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          padding-top: 15px;

          border-top:
            1px solid
            var(--mnist-border);
        }

        .mnist-output-footer span {
          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          color:
            var(--mnist-muted);
        }

        .mnist-output-footer strong {
          font-size: 10px;

          font-weight: 500;
        }

        .mnist-error {
          margin-top: 13px;

          padding: 11px 13px;

          border:
            1px solid
            rgba(100,40,40,.22);

          border-radius: 9px;

          color:
            #714840;

          font-size: 12px;

          line-height: 1.5;
        }


        /* =====================================================
           PIPELINE
           ===================================================== */

        .mnist-pipeline {
          display: grid;

          grid-template-columns:
            repeat(5,minmax(0,1fr));

          gap: 1px;

          overflow: hidden;

          border:
            1px solid
            var(--mnist-border);

          border-radius: 15px;

          background:
            var(--mnist-border);
        }

        .mnist-pipeline article {
          min-width: 0;

          min-height: 175px;

          padding: 22px;

          background:
            var(--mnist-cream);
        }

        .mnist-pipeline article > span {
          font-size: 9px;

          color:
            var(--mnist-muted);
        }

        .mnist-pipeline h3 {
          margin: 43px 0 9px;

          font-size: 17px;

          font-weight: 500;
        }

        .mnist-pipeline p {
          margin: 0;

          color:
            var(--mnist-muted);

          font-size: 12px;

          line-height: 1.5;
        }


        /* =====================================================
           RESPONSIVE
           ===================================================== */

        @media (max-width: 1050px) {

          .mnist-network-flow {
            grid-template-columns: 1fr;

            gap: 13px;
          }

          .mnist-wire {
            height: 26px;

            transform: rotate(90deg);
          }

          .mnist-demo-grid {
            grid-template-columns: 1fr;
          }

          .mnist-results-column {
            grid-template-columns:
              repeat(2,minmax(0,1fr));

            grid-template-rows: none;
          }

          .mnist-architecture-grid,
          .mnist-pipeline {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .mnist-metrics {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

        }


        @media (max-width: 700px) {

          .mnist-network-card {
            padding: 19px;
          }

          .mnist-network-specs {
            grid-template-columns:
              1fr 1fr;
          }

          .mnist-network-specs div:last-child {
            grid-column: 1 / -1;
          }

          .mnist-results-column {
            grid-template-columns: 1fr;
          }

          .mnist-story-grid {
            grid-template-columns: 1fr;
          }

          .mnist-architecture-grid,
          .mnist-pipeline {
            grid-template-columns: 1fr;
          }

          .mnist-input-bottom {
            flex-direction: column;

            align-items: stretch;
          }

          .mnist-button-row {
            display: grid;

            grid-template-columns:
              auto minmax(0,1fr);
          }

          .mnist-metrics {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

        }


        @media (max-width: 450px) {

          .mnist-demo-card {
            padding: 18px;
          }

          .mnist-network-specs {
            grid-template-columns: 1fr;
          }

          .mnist-network-specs div:last-child {
            grid-column: auto;
          }

          .mnist-button-row {
            grid-template-columns: 1fr;
          }

          .mnist-metrics {
            grid-template-columns: 1fr 1fr;
          }

          .mnist-specs {
            gap: 8px;
          }

          .mnist-result-number {
            font-size: 112px;
          }

        }

      `}</style>

    </main>
  );
}