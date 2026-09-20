"use client";

import { useEffect, useState } from "react";

const seeHouseTags = ["Python", "Scikit-learn", "Random Forest", "FastAPI"];
const mnistTags = ["Python", "PyTorch", "Neural Networks", "FastAPI"];
const lochanedaTags = ["Python", "Pandas", "Matplotlib", "Scikit-learn", "EDA"];

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker mono">Featured work</div>
            <h2 className="section-title display">Models, tools, and systems I’ve built.</h2>
          </div>
          <p className="section-note">
            The portfolio currently focuses on one substantial ML project rather
            than fifteen tiny rectangles pretending to be a career.
          </p>
        </div>

        <div className="project-grid">
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
    <a className="project-link" href="https://github.com/LochanJangid/See-House">
      Source Code ↗
    </a>
    </div>
  </article>

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
    <a className="project-link" href="https://github.com/LochanJangid/MNIST">
      Source Code ↗
    </a>
    </div>
  </article>

  <article className="project-card compact-project-card">
    <div>
      <div className="project-meta mono">
        <span>03</span>
        <span>Developer Tool</span>
      </div>

      <h3 className="project-title display">
        Automated EDA Toolkit
      </h3>

      <p className="project-desc">
        A reusable Python package that automates exploratory data analysis and preprocessing workflows.
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
    <a className="project-link" href="https://pypi.org/project/lochan-eda/" target="_blank">
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
</div>
      </div>
    </section>
  );
}
