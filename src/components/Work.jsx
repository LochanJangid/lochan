"use client";

import { useEffect, useState } from "react";

const seeHouseTags = ["Python", "Scikit-learn", "Random Forest", "FastAPI"];
const mnistTags = ["Python", "PyTorch", "Neural Networks", "FastAPI"];

function MNISTNeuralPreview() {
  const [step, setStep] = useState(0);

  const layers = [
    {
      name: "INPUT",
      size: 784,
      type: "pixels",
    },
    {
      name: "HIDDEN",
      size: 286,
      type: "neurons",
    },
    {
      name: "HIDDEN",
      size: 120,
      type: "neurons",
    },
    {
      name: "OUTPUT",
      size: 10,
      type: "output",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((current) => (current + 1) % 100);
    }, 180);

    return () => clearInterval(timer);
  }, []);

  const neuronIntensity = (index, layerIndex) => {
    const wave = Math.sin(step * 0.35 + index * 0.7 + layerIndex * 2.2);

    return Math.max(0.06, (wave + 1) / 2);
  };

  const outputs = [3, 8, 6, 11, 7, 4, 2, 94, 5, 16];

  return (
    <div className="mnist-live-model">
      <div className="mnist-live-header">
        <div>
          <div className="panel-eyebrow mono">Live inference</div>

          <div className="mnist-live-title">
            7<span>DRAWN INPUT</span>
          </div>
        </div>

        <div className="inference-status">
          <span className="status-pulse" />
          PROCESSING
        </div>
      </div>

      <div className="network-flow">
        {/* INPUT */}
        <div className="flow-stage input-stage">
          <div className="drawn-digit">7</div>

          <div className="stage-label mono">28 × 28</div>

          <div className="pixel-stream">
            {Array.from({ length: 49 }).map((_, i) => {
              const intensity = neuronIntensity(i, 0);

              return (
                <span
                  key={i}
                  style={{
                    opacity: intensity,
                  }}
                />
              );
            })}
          </div>

          <div className="stage-count mono">784 PIXELS</div>
        </div>

        {/* CONNECTION */}
        <div className="flow-connector">
          <span />
          <span />
          <span />
        </div>

        {/* HIDDEN 1 */}
        <div className="flow-stage">
          <div className="neuron-cloud large">
            {Array.from({ length: 42 }).map((_, i) => {
              const intensity = neuronIntensity(i, 1);

              return (
                <span
                  key={i}
                  style={{
                    opacity: intensity,
                    transform: `scale(${0.65 + intensity * 0.65})`,
                  }}
                />
              );
            })}
          </div>

          <div className="stage-label mono">LINEAR + TANH</div>

          <div className="stage-count mono">286 NEURONS</div>
        </div>

        {/* CONNECTION */}
        <div className="flow-connector">
          <span />
          <span />
          <span />
        </div>

        {/* HIDDEN 2 */}
        <div className="flow-stage">
          <div className="neuron-cloud medium">
            {Array.from({ length: 30 }).map((_, i) => {
              const intensity = neuronIntensity(i, 2);

              return (
                <span
                  key={i}
                  style={{
                    opacity: intensity,
                    transform: `scale(${0.7 + intensity * 0.6})`,
                  }}
                />
              );
            })}
          </div>

          <div className="stage-label mono">LINEAR + TANH</div>

          <div className="stage-count mono">120 NEURONS</div>
        </div>

        {/* CONNECTION */}
        <div className="flow-connector">
          <span />
          <span />
          <span />
        </div>

        {/* OUTPUT */}
        <div className="flow-stage output-stage">
          <div className="output-bars">
            {outputs.map((value, index) => (
              <div className="output-row" key={index}>
                <span className="output-digit">{index}</span>

                <div className="output-track">
                  <span
                    style={{
                      width: `${
                        value +
                        Math.sin(step * 0.3 + index) * (index === 8 ? 3 : 8)
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="output-result">
            <span className="mono">PREDICTION</span>

            <strong>7</strong>

            <em>98.7%</em>
          </div>
        </div>
      </div>

      <div className="network-footer">
        <div>
          <span className="mono">ARCHITECTURE</span>
          <strong>784 → 286 → 120 → 10</strong>
        </div>

        <div>
          <span className="mono">ACTIVATION</span>
          <strong>Tanh</strong>
        </div>

        <div>
          <span className="mono">PARAMETERS</span>
          <strong>259,760</strong>
        </div>

        <div>
          <span className="mono">OUTPUT</span>
          <strong>10 classes</strong>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker mono">01 / Featured work</div>
            <h2 className="section-title display">A model you can inspect.</h2>
          </div>
          <p className="section-note">
            The portfolio currently focuses on one substantial ML project rather
            than fifteen tiny rectangles pretending to be a career.
          </p>
        </div>

        <div className="project-feature">
          {/* SEE HOUSE */}
          <article className="project-card project-card-main">
            <div>
              <div className="project-meta mono">
                <span>SEE HOUSE</span>
                <span>REGRESSION</span>
              </div>
              <h3 className="project-title display">
                California Housing
                <br />
                Price Intelligence
              </h3>
              <p className="project-desc">
                An end-to-end housing price prediction system built around a
                Random Forest Regressor, exposed through a FastAPI inference
                service and packaged for deployment.
              </p>
              <div className="tags">
                {seeHouseTags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a className="project-link" href="/work/see-house">
              Explore the case study ↗
            </a>
          </article>
          {/* SEE HOUSE MODEL PANEL */}
          <aside className="project-card model-panel">
            <div className="panel-content">
              <div>
                <div className="panel-eyebrow mono">Inference snapshot</div>
                <div className="prediction-display">
                  <div className="prediction-label">
                    Example estimated median value
                  </div>
                  <div className="prediction-value">$421,700</div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "color-mix(in oklab,var(--cream) 48%,transparent)",
                    }}
                  >
                    raw model output × 100,000
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="spark-bars"
                  aria-label="Illustrative model signal bars"
                >
                  {[48, 67, 58, 85, 73, 91, 64, 78, 52, 88, 72, 96].map(
                    (height, i) => (
                      <span
                        key={i}
                        style={{
                          height: `${height}%`,
                          animationDelay: `${i * 55}ms`,
                        }}
                      />
                    ),
                  )}
                </div>
                <div className="model-foot">
                  <div>
                    <span>MODEL</span>
                    <strong>Random Forest Regressor</strong>
                  </div>
                  <div>
                    <span>FEATURES</span>
                    <strong>8 numeric inputs</strong>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          {/* MNIST */}
          <article className="project-card project-card-main mnist-project">
            <div>
              <div className="project-meta mono">
                <span>MNIST</span> <span>CLASSIFICATION</span>
              </div>
              <h3 className="project-title display">
                Handwritten Digit <br /> Recognition
              </h3>
              <p className="project-desc">
                An interactive computer vision demo where a handwritten digit is
                drawn on a canvas, converted into a 28×28 grayscale image, and
                passed to a trained model for prediction.
              </p>
              <div className="tags">
                {mnistTags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a className="project-link" href="/work/mnist">
              Try the live demo ↗
            </a>
          </article>
          {/* MNIST MODEL ARCHITECTURE */}
          <aside className="project-card model-panel mnist-panel">
            <MNISTNeuralPreview />
          </aside>
        </div>
      </div>
    </section>
  );
}
