'use client';

import { useMemo, useState } from 'react';

const initial = {
  medinc: 3.87,
  houseage: 28,
  averooms: 5.43,
  avebedrms: 1.1,
  population: 1425,
  aveoccup: 3.07,
  latitude: 35.63,
  longitude: -119.57,
};

const fields = [
  ['medinc', 'Median income (× $10k)', '0', '20', '0.01'],
  ['houseage', 'House age', '1', '52', '1'],
  ['averooms', 'Average rooms', '0.5', '20', '0.1'],
  ['avebedrms', 'Average bedrooms', '0.2', '6', '0.1'],
  ['population', 'Population', '1', '40000', '1'],
  ['aveoccup', 'Average occupancy', '0.5', '20', '0.1'],
  ['latitude', 'Latitude', '32', '42.5', '0.01'],
  ['longitude', 'Longitude', '-124.5', '-114', '0.01'],
];

export default function PredictionDemo() {
  const [values, setValues] = useState(initial);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('Ready for inference.');
  const [loading, setLoading] = useState(false);

  // Base API URL comes from .env.local / deployment environment.
  const apiBaseUrl = process.env.NEXT_PUBLIC_HOUSE_API_URL;

  // Your FastAPI endpoint.
  const predictUrl = apiBaseUrl ? `${apiBaseUrl}/predict` : '';

  const formatted = useMemo(() => {
    if (result === null) return '—';

    return `$${result.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    })}`;
  }, [result]);

  function update(key, value) {
    setValues((current) => ({
      ...current,
      [key]: Number(value),
    }));
  }

  async function predict(event) {
    event.preventDefault();

    if (loading) return;

    if (!apiBaseUrl) {
      setStatus(
        'API URL is missing. Set NEXT_PUBLIC_HOUSE_API_URL and rebuild the site.'
      );
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setStatus('Calling FastAPI inference endpoint…');

    try {
      const inputs = [
        values.medinc,
        values.houseage,
        values.averooms,
        values.avebedrms,
        values.population,
        values.aveoccup,
        values.latitude,
        values.longitude,
      ];

      // Basic validation
      if (inputs.some((value) => !Number.isFinite(value))) {
        throw new Error('Please enter valid numeric values.');
      }

      const response = await fetch(predictUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          inputs,
        }),
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          `API returned an invalid response. HTTP ${response.status}`
        );
      }

      if (!response.ok) {
        const detail =
          data?.detail ||
          data?.message ||
          `HTTP ${response.status}`;

        throw new Error(detail);
      }

      if (typeof data?.prediction !== 'number') {
        throw new Error(
          'API response does not contain a numeric prediction.'
        );
      }

      // FastAPI returns the normalized California Housing value.
      // Convert it back to dollars.
      const predictedValue = data.prediction * 100000;

      setResult(predictedValue);
      setStatus('Inference completed successfully.');
    } catch (error) {
      console.error('See-House API error:', error);

      setResult(null);

      setStatus(
        error instanceof Error
          ? `Inference failed: ${error.message}`
          : 'Inference failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  function resetValues() {
    setValues(initial);
    setResult(null);
    setStatus('Ready for inference.');
  }

  return (
    <div className="demo-shell">
      <div className="demo-head">
        <div>
          <div
            className="kicker mono"
            style={{ color: 'var(--terracotta)' }}
          >
            Live model interface
          </div>

          <h3
            className="display"
            style={{
              fontSize: 42,
              margin: '7px 0 0',
            }}
          >
            Try See-House
          </h3>

          <p>
            Eight inputs → FastAPI → Random Forest → predicted median value.
          </p>
        </div>

        <div className="api-pill">
          POST /predict
        </div>
      </div>

      <div className="demo-body">
        <form className="demo-form" onSubmit={predict}>
          {fields.map(([key, label, min, max, step]) => (
            <div className="input-group" key={key}>
              <label htmlFor={`house-${key}`}>
                {label}
              </label>

              <input
                id={`house-${key}`}
                type="number"
                min={min}
                max={max}
                step={step}
                value={values[key]}
                onChange={(event) =>
                  update(key, event.target.value)
                }
                disabled={loading}
              />
            </div>
          ))}

          <div className="demo-submit">
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Running model…' : 'Run inference ↗'}
            </button>

            <button
              type="button"
              onClick={resetValues}
              disabled={loading}
              style={{
                marginLeft: 10,
                opacity: loading ? 0.5 : 1,
              }}
            >
              Reset
            </button>

            <span
              className="demo-status"
              aria-live="polite"
            >
              {status}
            </span>
          </div>
        </form>

        <aside className="demo-result">
          <div className="result-label">
            Predicted median value
          </div>

          <div className="result-value">
            {formatted}
          </div>

          <div className="result-foot">
            See-House sends the eight housing features to the
            deployed FastAPI Random Forest model. The returned
            normalized prediction is converted to dollars by
            multiplying it by 100,000.
          </div>

          {apiBaseUrl && (
            <div
              style={{
                marginTop: 18,
                fontSize: 12,
                opacity: 0.6,
                wordBreak: 'break-all',
              }}
            >
              API: {apiBaseUrl}/predict
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}