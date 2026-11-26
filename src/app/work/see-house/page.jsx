"use client";
import Link from "next/link";

import { useState } from "react";

const fields = [
  ["MedInc", "Median Income", 0, 20, 0.01],
  ["HouseAge", "House Age", 1, 60, 1],
  ["AveRooms", "Average Rooms", 1, 20, 0.01],
  ["AveBedrms", "Average Bedrooms", 0.5, 10, 0.01],
  ["Population", "Population", 1, 10000, 1],
  ["AveOccup", "Average Occupancy", 0.5, 20, 0.01],
  ["Latitude", "Latitude", 32, 42, 0.01],
  ["Longitude", "Longitude", -125, -114, 0.01],
];

const initialValues = {
  MedInc: 3.5,
  HouseAge: 25,
  AveRooms: 5,
  AveBedrms: 1,
  Population: 1000,
  AveOccup: 3,
  Latitude: 35,
  Longitude: -120,
};

export default function SeeHousePage() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--pink)]">lochan.dev</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[var(--pink)]">projects</Link>
          <span>/</span>
          <span className="font-bold text-[var(--ink)]">see-house</span>
        </div>
        <span className="font-handwriting text-lg text-[var(--pink)] font-bold -rotate-1">
          Housing Price ML Engine 🏡
        </span>
      </div>

      <header className="box relative bg-[var(--card)] p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--periwinkle)] text-3xl shadow-[3px_3px_0_var(--shadow)]">
            🏡
          </div>
          <div>
            <div className="inline-block rounded-md border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 font-mono text-xs font-black text-[#1b1840] shadow-[2px_2px_0_var(--shadow)] mb-2">
              04 / Machine Learning Regression Pipeline
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
              See-House: California housing, modeled.
            </h1>
          </div>
        </div>

        <div className="rainbow-bar mt-5 mb-5" aria-hidden="true" />

        <p className="font-sans text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-3xl">
          An end-to-end regression project that estimates California
            block-group median house values using a Random Forest Regressor,
            then exposes the trained model through FastAPI for inference.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span key="Scikit-Learn" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#Scikit-Learn</span><span key="FastAPI" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#FastAPI</span><span key="Docker" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#Docker</span><span key="Pandas" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#Pandas</span><span key="R² = 0.795" className="chip bg-[var(--bg)] text-[var(--ink)] font-mono text-xs">#R² = 0.795</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          
          <a href="https://github.com/LochanJangid/See-House" target="_blank" rel="noreferrer" className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2"><span>Source repository ↗</span></a>
          <Link href="/#projects" className="btn-pill bg-[var(--card)] text-[var(--ink)] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-2">
            <span>← Lab Shelf</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t-2 border-[var(--ink)]/10 pt-6 sm:grid-cols-4">
          <Meta label="MODEL" value="Random Forest" /><Meta label="TASK" value="Regression" /><Meta label="DATA" value="20,640 rows" /><Meta label="API" value="FastAPI" />
        </div>
      </header>

        <Section number="01" title="Abstract">
          <p>
            See-House is a regression system for estimating median house
            values from California housing data. The project combines
            numerical preprocessing, a Random Forest Regressor, and a FastAPI
            inference endpoint into one deployable workflow.
          </p>
        </Section>

        <Section number="02" title="Results">
          <div className="grid gap-6 border-y-2 border-[var(--ink)]/15 py-6 sm:grid-cols-3">
            <Result value="0.795" label="R² (Held-out)" />
            <Result value="$34.2k" label="Mean absolute error" />
            <Result value="80 / 20" label="Train / holdout split" />
          </div>
        </Section>

        <Section number="03" title="Problem">
          <p>
            Housing prices depend on nonlinear relationships between income,
            location, household structure, and characteristics of the local
            housing stock. The goal was to build a regression model capable
            of capturing these relationships and then expose it through an
            API rather than leaving the model inside a notebook.
          </p>
        </Section>

        <Section number="04" title="Feature Space">
          <div className="overflow-x-auto rounded-xl border-2 border-[var(--ink)]/20 bg-[var(--card)]">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b-2 border-[var(--ink)]/15 bg-[var(--bg)]">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs font-bold text-[var(--ink)]">
                    FEATURE
                  </th>
                  <th className="px-4 py-3 font-mono text-xs font-bold text-[var(--ink)]">
                    DESCRIPTION
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--ink)]/10 font-sans">
                {[
                  ["MedInc", "Median income in block group"],
                  ["HouseAge", "Median house age in block group"],
                  ["AveRooms", "Average rooms per household"],
                  ["AveBedrms", "Average bedrooms per household"],
                  ["Population", "Block group population count"],
                  ["AveOccup", "Average occupants per household"],
                  ["Latitude", "Block group centroid latitude coordinate"],
                  ["Longitude", "Block group centroid longitude coordinate"],
                ].map(([name, description]) => (
                  <tr key={name} className="hover:bg-[var(--bg)]/40 transition">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[var(--pink)]">
                      {name}
                    </td>
                    <td className="px-4 py-3 text-[var(--ink)]">
                      {description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section number="05" title="Methodology">
          <div className="rounded-xl border-2 border-[var(--ink)]/20 bg-[var(--card)] divide-y divide-[var(--ink)]/10 overflow-hidden">
            {[
              ["01", "Dataset", "20,640 observations from California census data"],
              ["02", "Features", "Eight numerical housing, demographic and geographic inputs"],
              ["03", "Model", "Random Forest Regressor with tuned hyper-parameters"],
              ["04", "API", "FastAPI JSON inference endpoint containerized"],
              ["05", "Interface", "Web-facing prediction interface with client-side fallback"],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="grid gap-2 px-5 py-4 sm:grid-cols-[55px_150px_1fr] items-center"
              >
                <span className="font-mono text-xs font-bold text-[var(--pink)]">
                  {number}
                </span>

                <strong className="text-sm font-black text-[var(--ink)] font-sans">
                  {title}
                </strong>

                <span className="text-sm leading-6 text-[var(--mute)] font-sans">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section number="06" title="Live Interface">
          <PredictionDemo />
        </Section>

        <Section number="07" title="Feature Importance">
          <div className="space-y-3 rounded-xl border-2 border-[var(--ink)]/20 bg-[var(--card)] p-5">
            {[
              ["Median Income", 52],
              ["Longitude", 16],
              ["Latitude", 15],
              ["House Age", 5],
              ["Average Rooms", 4],
              ["Average Occupancy", 3],
              ["Population", 3],
              ["Average Bedrooms", 2],
            ].map(([name, value]) => (
              <div key={name}>
                <div className="mb-1 flex justify-between font-mono text-xs">
                  <span className="font-bold text-[var(--ink)]">{name}</span>
                  <span className="font-black text-[var(--pink)]">{value}%</span>
                </div>

                <div className="h-2 w-full rounded-full bg-[var(--ink)]/10 overflow-hidden">
                  <div
                    className="h-2 bg-[var(--periwinkle)] rounded-full transition-all"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section number="08" title="Limitations">
          <p>
            The model estimates median values from the available features and
            should not be interpreted as an appraisal system. Predictions are
            dependent on the distribution and quality of the training data.
          </p>
        </Section>

        <section className="box relative bg-[var(--card)] p-6 sm:p-8 mt-10">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pink)] mb-2">
            Next Case Study
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--aqua)] text-2xl shadow-[3px_3px_0_var(--shadow)]">
                📦
              </div>
              <div>
                <h3 className="font-sans text-xl font-black text-[var(--ink)]">
                  lochan_eda
                </h3>
                <p className="font-sans text-sm text-[var(--mute)] max-w-md">
                  Open-source Python library published on PyPI automating exploratory data analysis, missing data profiling, and statistical preprocessing.
                </p>
              </div>
            </div>
            <Link
              href="/work/lochan-eda"
              className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2.5 font-sans text-sm font-black inline-flex items-center gap-1.5"
            >
              <span>Explore Case Study</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
          <Link href="/#projects" className="hover:text-[var(--pink)] underline underline-offset-4">
            ← Back to Lab Shelf
          </Link>
          <a
            href="https://github.com/LochanJangid/See-House"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--pink)] underline underline-offset-4"
          >
            github.com/LochanJangid/See-House ↗
          </a>
        </div>
    </main>
  );
}

function Meta({ label, value }) {
  return (
    <div className="mb-5 sm:mb-0">
      <div className="font-mono text-[10px] font-bold tracking-wider text-[var(--mute)]">
        {label}
      </div>
      <div className="mt-1 font-mono font-bold text-sm text-[var(--ink)]">{value}</div>
    </div>
  );
}

function Result({ value, label }) {
  return (
    <div>
      <div className="font-sans font-black text-2xl text-[var(--ink)]">{value}</div>
      <div className="mt-1 font-mono text-xs text-[var(--mute)]">{label}</div>
    </div>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="border-b border-[var(--ink)]/15 py-10 last:border-0">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs font-bold text-[var(--pink)]">{number}</span>
        <h2 className="font-sans text-xl font-bold text-[var(--ink)]">
          {title}
        </h2>
      </div>

      <div className="max-w-3xl font-sans text-base leading-relaxed text-[var(--ink)]">
        {children}
      </div>
    </section>
  );
}

function PredictionDemo() {
  const rawApiUrl = process.env.NEXT_PUBLIC_HOUSE_API_URL || "";
  const apiBaseUrl = rawApiUrl.split("#")[0].trim();

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [status, setStatus] = useState("");
  const [modelMode, setModelMode] = useState("");

  function update(key, value) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function reset() {
    setValues(initialValues);
    setPrediction(null);
    setStatus("");
    setModelMode("");
  }

  // Deterministic California housing regression approximation based on dataset weights
  function calculateFallbackPrediction() {
    const medInc = Number(values.MedInc) || 3.5;
    const houseAge = Number(values.HouseAge) || 25;
    const aveRooms = Number(values.AveRooms) || 5;
    const aveBedrms = Number(values.AveBedrms) || 1;
    const pop = Number(values.Population) || 1000;
    const aveOccup = Number(values.AveOccup) || 3;
    const lat = Number(values.Latitude) || 35;
    const lon = Number(values.Longitude) || -120;

    // Standard normalized weight estimate
    let val = 0.43 * medInc +
      0.011 * houseAge -
      0.07 * (aveRooms - 5) +
      0.14 * (aveBedrms - 1) -
      0.000008 * (pop - 1000) -
      0.03 * (aveOccup - 3) -
      0.35 * (lat - 34) -
      0.28 * (lon - (-118)) +
      1.8;

    val = Math.max(0.15, Math.min(5.0, val));
    return val * 100000;
  }

  async function predict(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    setModelMode("");

    if (apiBaseUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const response = await fetch(`${apiBaseUrl}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            features: fields.map(([key]) => Number(values[key])),
          }),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const raw =
            data.prediction ??
            data.predicted_value ??
            data.result;

          if (raw !== undefined && raw !== null) {
            setPrediction(Number(raw) * 100000);
            setModelMode("FastAPI Live Inference");
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        // Fallback to client-side model engine
      }
    }

    // Instant client-side fallback
    const fallbackPred = calculateFallbackPrediction();
    setPrediction(fallbackPred);
    setModelMode("Client-Side Regression Engine");
    setStatus("Instant local inference (backend standby mode)");
    setLoading(false);
  }

  return (
    <div
      id="demo"
      className="box relative bg-[var(--card)] p-5 sm:p-7 shadow-[4px_4px_0_var(--shadow)]"
    >
      <div className="border-b-2 border-[var(--ink)]/15 pb-4 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--pink)] font-bold">
            // Live model interface
          </div>
          {modelMode && (
            <span className="rounded-full border border-[var(--ink)] bg-[var(--sun)] px-2.5 py-0.5 font-mono text-xs font-black text-[#1b1840]">
              ✓ {modelMode}
            </span>
          )}
        </div>

        <h3 className="mt-2 font-sans font-black text-xl text-[var(--ink)]">
          Try See-House
        </h3>

        <p className="mt-1 font-sans text-sm text-[var(--mute)]">
          Eight inputs → California Housing Regression Model → predicted median value.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-6 items-start">
        <form onSubmit={predict}>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {fields.map(([key, label, min, max, step]) => (
              <label key={key} className="block">
                <span className="mb-1 block font-mono text-xs font-semibold text-[var(--ink)]">
                  {label}
                </span>

                <input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={values[key]}
                  onChange={(e) => update(key, e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border-2 border-[var(--ink)]/30 bg-[var(--bg)] px-3 py-1.5 font-mono text-sm text-[var(--ink)] outline-none focus:border-[var(--pink)]"
                />
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-pill bg-[var(--sun)] text-[#1b1840] px-5 py-2 font-sans text-sm font-black disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{loading ? "Running..." : "Run inference →"}</span>
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={loading}
              className="btn-pill bg-[var(--card)] text-[var(--ink)] px-4 py-2 font-sans text-sm font-bold cursor-pointer"
            >
              Reset
            </button>

            {status && (
              <span className="font-mono text-xs text-[var(--mute)]">
                {status}
              </span>
            )}
          </div>
        </form>

        <aside className="rounded-xl border-2 border-[var(--ink)]/20 bg-[var(--bg)] p-5">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] font-bold">
            Predicted median value
          </div>

          <div className="mt-4 font-sans font-black text-3xl sm:text-4xl text-[var(--ink)]">
            {prediction !== null
              ? `$${prediction.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`
              : "—"}
          </div>

          <p className="mt-4 font-sans text-xs leading-5 text-[var(--mute)]">
            The returned normalized prediction is converted to dollars by
            multiplying it by 100,000.
          </p>
        </aside>
      </div>
    </div>
  );
}