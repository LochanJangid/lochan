"use client";

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
    <main className="min-h-screen bg-[#eeeeec] py-6 sm:py-10">
      <article className="mx-auto w-[calc(100%-24px)] max-w-[850px] bg-white px-7 py-10 shadow-sm sm:px-14 sm:py-16 md:px-20 md:py-20">
        <header className="border-b border-neutral-300 pb-10">
          <div className="mb-5 font-mono text-xs uppercase tracking-wider text-neutral-500">
            01 / Machine Learning Case Study
          </div>

          <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-neutral-950 sm:text-5xl">
            See-House: California housing, modeled.
          </h1>

          <p className="mt-6 max-w-2xl font-serif text-base leading-7 text-neutral-600">
            An end-to-end regression project that estimates California
            block-group median house values using a Random Forest Regressor,
            then exposes the trained model through FastAPI for inference.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a
              href="#demo"
              className="text-blue-700 underline underline-offset-4"
            >
              Try the model ↓
            </a>

            <a
              href="https://github.com/LochanJangid/See-House"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline underline-offset-4"
            >
              View source ↗
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 border-t border-neutral-200 pt-6 sm:grid-cols-4">
            <Meta label="MODEL" value="Random Forest" />
            <Meta label="TASK" value="Regression" />
            <Meta label="DATA" value="20,640 rows" />
            <Meta label="API" value="FastAPI" />
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
          <div className="grid gap-6 border-y border-neutral-200 py-6 sm:grid-cols-3">
            <Result value="0.795" label="R²" />
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
          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-neutral-300 bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs font-normal text-neutral-500">
                    FEATURE
                  </th>
                  <th className="px-4 py-3 font-mono text-xs font-normal text-neutral-500">
                    DESCRIPTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["MedInc", "Median income"],
                  ["HouseAge", "House age"],
                  ["AveRooms", "Average rooms"],
                  ["AveBedrms", "Average bedrooms"],
                  ["Population", "Population"],
                  ["AveOccup", "Average occupancy"],
                  ["Latitude", "Geographic latitude"],
                  ["Longitude", "Geographic longitude"],
                ].map(([name, description]) => (
                  <tr key={name} className="border-b border-neutral-200 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-neutral-700">
                      {name}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section number="05" title="Methodology">
          <div className="border border-neutral-200">
            {[
              ["01", "Dataset", "20,640 observations"],
              ["02", "Features", "Eight numerical housing, demographic and geographic inputs"],
              ["03", "Model", "Random Forest Regressor"],
              ["04", "API", "FastAPI JSON inference endpoint"],
              ["05", "Interface", "Web-facing prediction interface"],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="grid gap-2 border-b border-neutral-200 px-5 py-5 last:border-0 sm:grid-cols-[55px_150px_1fr]"
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
            ))}
          </div>
        </Section>

        <Section number="06" title="Live Interface">
          <PredictionDemo />
        </Section>

        <Section number="07" title="Feature Importance">
          <div className="space-y-3">
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
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-neutral-700">{name}</span>
                  <span className="font-mono text-neutral-500">{value}%</span>
                </div>

                <div className="h-1 bg-neutral-100">
                  <div
                    className="h-1 bg-neutral-700"
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

        <footer className="mt-16 border-t border-neutral-300 pt-7">
          <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
            Source
          </div>

          <a
            href="https://github.com/LochanJangid/See-House"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-sm text-blue-700 underline underline-offset-4"
          >
            github.com/LochanJangid/See-House ↗
          </a>
        </footer>
      </article>
    </main>
  );
}

function Meta({ label, value }) {
  return (
    <div className="mb-5 sm:mb-0">
      <div className="font-mono text-[10px] tracking-wider text-neutral-400">
        {label}
      </div>
      <div className="mt-1 text-sm text-neutral-800">{value}</div>
    </div>
  );
}

function Result({ value, label }) {
  return (
    <div>
      <div className="font-serif text-2xl text-neutral-950">{value}</div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="border-b border-neutral-200 py-10 last:border-0">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs text-neutral-400">{number}</span>
        <h2 className="font-serif text-xl font-bold text-neutral-950">
          {title}
        </h2>
      </div>

      <div className="max-w-3xl font-serif text-[15px] leading-7 text-neutral-700">
        {children}
      </div>
    </section>
  );
}

function PredictionDemo() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_HOUSE_API_URL;

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [status, setStatus] = useState("");

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
  }

  async function predict(event) {
    event.preventDefault();

    if (!apiBaseUrl) {
      setStatus("API URL is not configured.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${apiBaseUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          features: fields.map(([key]) => Number(values[key])),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed.");
      }

      const data = await response.json();

      const raw =
        data.prediction ??
        data.predicted_value ??
        data.result;

      setPrediction(Number(raw) * 100000);
    } catch (error) {
      setStatus(error.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="demo"
      className="border border-neutral-300"
    >
      <div className="border-b border-neutral-200 px-5 py-5">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
          Live model interface
        </div>

        <h3 className="mt-2 font-serif text-xl text-neutral-950">
          Try See-House
        </h3>

        <p className="mt-2 text-sm text-neutral-500">
          Eight inputs → FastAPI → Random Forest → predicted median value.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_260px]">
        <form onSubmit={predict} className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([key, label, min, max, step]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-xs text-neutral-500">
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
                  className="w-full border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-700"
                />
              </label>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {loading ? "Running..." : "Run inference"}
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={loading}
              className="border border-neutral-300 px-4 py-2 text-sm text-neutral-700"
            >
              Reset
            </button>

            {status && (
              <span className="text-xs text-red-600">
                {status}
              </span>
            )}
          </div>
        </form>

        <aside className="border-t border-neutral-200 bg-neutral-50 p-5 md:border-l md:border-t-0">
          <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
            Predicted median value
          </div>

          <div className="mt-5 font-serif text-3xl text-neutral-950">
            {prediction !== null
              ? `$${prediction.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`
              : "—"}
          </div>

          <p className="mt-5 text-xs leading-5 text-neutral-500">
            The returned normalized prediction is converted to dollars by
            multiplying it by 100,000.
          </p>
        </aside>
      </div>
    </div>
  );
}