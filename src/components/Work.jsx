"use client";

import { useEffect, useState } from "react";

const seeHouseTags = ["Python", "Scikit-learn", "Random Forest", "FastAPI"];
const mnistTags = ["Python", "PyTorch", "Neural Networks", "FastAPI"];
const lochanedaTags = [
  "Python",
  "Pandas",
  "Matplotlib",
  "Scikit-learn",
  "EDA",
];
const bankMarketingTags = [
  "Python",
  "XGBoost",
  "FastAPI",
  "Next.js",
  "Docker",
];

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker mono">Featured work</div>

            <h2 className="section-title display">
              Models, tools, and systems I’ve built.
            </h2>
          </div>

          <p className="section-note">
            The portfolio currently focuses on one substantial ML project
            rather than fifteen tiny rectangles pretending to be a career.
          </p>
        </div>

        <div className="project-grid">

          {/* 01 — SEE HOUSE */}
          <article className="project-card compact-project-card">
            <div>
              <div className="project-meta mono">
                <span>01</span>
                <span>REGRESSION</span>
              </div>

              <h3 className="project-title display">
                California Housing
              </h3>

              <p className="project-desc">
                Housing price prediction using Random Forest and FastAPI.
              </p>

              <div className="tags">
                {seeHouseTags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <a className="project-link" href="/work/see-house#demo">
                Live Demo ↗
              </a>

              <a className="project-link" href="/work/see-house">
                Case study ↗
              </a>

              <a
                className="project-link"
                href="https://github.com/LochanJangid/See-House"
                target="_blank"
                rel="noreferrer"
              >
                Source Code ↗
              </a>
            </div>
          </article>


          {/* 02 — MNIST */}
          <article className="project-card compact-project-card">
            <div>
              <div className="project-meta mono">
                <span>02</span>
                <span>CLASSIFICATION</span>
              </div>

              <h3 className="project-title display">
                Handwritten Digit Recognition
              </h3>

              <p className="project-desc">
                MNIST digit recognition using a neural network and FastAPI.
              </p>

              <div className="tags">
                {mnistTags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <a className="project-link" href="/work/mnist#demo">
                Live Demo ↗
              </a>

              <a className="project-link" href="/work/mnist">
                Case study ↗
              </a>

              <a
                className="project-link"
                href="https://github.com/LochanJangid/MNIST"
                target="_blank"
                rel="noreferrer"
              >
                Source Code ↗
              </a>
            </div>
          </article>


          {/* 03 — LOCHAN EDA */}
          <article className="project-card compact-project-card">
            <div>
              <div className="project-meta mono">
                <span>03</span>
                <span>DEVELOPER TOOL</span>
              </div>

              <h3 className="project-title display">
                Automated EDA Toolkit
              </h3>

              <p className="project-desc">
                A reusable Python package that automates exploratory data
                analysis and preprocessing workflows.
              </p>

              <div className="tags">
                {lochanedaTags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <a
                className="project-link"
                href="https://pypi.org/project/lochan-eda/"
                target="_blank"
                rel="noreferrer"
              >
                PyPI ↗
              </a>

              <a className="project-link" href="/work/lochan-eda">
                Case study ↗
              </a>

              <a className="project-link" href="/work/lochan-eda/docs">
                Docs ↗
              </a>
            </div>
          </article>


          {/* 04 — BANK MARKETING */}
          <article className="project-card compact-project-card">
            <div>
              <div className="project-meta mono">
                <span>04</span>
                <span>CLASSIFICATION</span>
              </div>

              <h3 className="project-title display">
                Bank Marketing
              </h3>

              <p className="project-desc">
                Customer subscription prediction using XGBoost, FastAPI,
                Next.js, and Docker.
              </p>

              <div className="tags">
                {bankMarketingTags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <a
                className="project-link"
                href="https://bank-marketing-alpha.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Live Demo ↗
              </a>

              <a className="project-link" href="/work/bank-marketing">
                Case study ↗
              </a>

              <a
                className="project-link"
                href="https://github.com/LochanJangid/bank-marketing"
                target="_blank"
                rel="noreferrer"
              >
                Source Code ↗
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}