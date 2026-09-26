"use client";

import "./style.css";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";


function BankMarketerWindow() {
  return (
    <div className="bank-live-window">

      {/* Browser / application frame */}

      <div className="bank-live-window-bar">

        <div className="bank-window-controls">
          <span />
          <span />
          <span />
        </div>


        <div className="bank-window-address mono">
          bank-marketing-alpha.vercel.app
        </div>


        <a
          href="https://bank-marketing-alpha.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="bank-window-open"
        >
          OPEN ↗
        </a>

      </div>


      {/* ACTUAL PROJECT WEBSITE */}

      <div className="bank-live-website">

        <iframe
          src="https://bank-marketing-alpha.vercel.app/"
          title="BankMarketer live application"
          className="bank-live-iframe"
          loading="lazy"
        />

      </div>

    </div>
  );
}


const pipeline = [
  [
    "01",
    "Input",
    "Customer information enters through the BankMarketer interface."
  ],
  [
    "02",
    "Validate",
    "FastAPI and Pydantic validate the request."
  ],
  [
    "03",
    "Transform",
    "The saved preprocessing pipeline prepares the features."
  ],
  [
    "04",
    "Predict",
    "XGBoost produces the classification result."
  ],
  [
    "05",
    "Respond",
    "The prediction is returned to the application."
  ],
];


const engineering = [
  [
    "MODEL",
    "XGBoost",
    "Gradient-boosted decision trees for the final classification."
  ],
  [
    "API",
    "FastAPI",
    "Production inference endpoint with Pydantic validation."
  ],
  [
    "FRONTEND",
    "Next.js",
    "The customer-facing BankMarketer application."
  ],
  [
    "DEPLOYMENT",
    "Docker · Render · Vercel",
    "Containerized backend and separately deployed frontend."
  ],
];


export default function BankMarketingPage() {

  return (

    <main className="page-shell bank-page">

      <Navbar />


      {/* =================================================
          HERO
          ================================================= */}

      <section className="project-page-hero">

        <div className="container">

          <div className="kicker mono">
            04 / Machine learning case study
          </div>


          <h1 className="project-page-title display">

            Bank Marketing:
            <br />

            who gets the call?

          </h1>


          <p className="project-page-sub">

            An end-to-end classification system that turns
            customer and campaign information into a
            production prediction service.

          </p>


          <div
            className="hero-actions"
            style={{ marginTop: 30 }}
          >

            <a
              className="btn btn-primary"
              href="#product"
            >
              Open the model ↓
            </a>


            <a
              className="btn btn-secondary"
              href="https://bank-marketing-alpha.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Open actual app ↗
            </a>

          </div>


          <div className="project-hero-meta">

            <div className="meta-block">

              <div className="meta-label mono">
                Model
              </div>

              <div className="meta-value">
                XGBoost
              </div>

            </div>


            <div className="meta-block">

              <div className="meta-label mono">
                Task
              </div>

              <div className="meta-value">
                Binary classification
              </div>

            </div>


            <div className="meta-block">

              <div className="meta-label mono">
                Dataset
              </div>

              <div className="meta-value">
                45,211 customers
              </div>

            </div>


            <div className="meta-block">

              <div className="meta-label mono">
                Stack
              </div>

              <div className="meta-value">
                Python · FastAPI · Next.js
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          QUESTION
          ================================================= */}

      <section className="section">

        <div className="container">

          <div className="bank-story">

            <div>

              <span className="bank-story-number">
                THE QUESTION
              </span>

              <h2 className="display">

                Can customer
                <br />
                history help
                <br />
                target a call?

              </h2>

            </div>


            <div>

              <p className="bank-large-copy">

                The Bank Marketing dataset contains information
                about customers, their financial situation,
                contact methods, and previous campaign outcomes.

              </p>


              <p>

                The goal was not to stop at a notebook model.
                The project turns that model into an application
                that accepts a real customer and returns a prediction.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PRODUCT
          ================================================= */}

      <section
        className="section"
        id="product"
      >

        <div className="container">

          <div className="section-head">

            <div>

              <div className="kicker mono">
                01 / The product
              </div>

              <h2 className="section-title display">

                This is the
                <br />
                actual application.

              </h2>

            </div>


            <p className="section-note">

              The interface below is not a recreation.
              It is the deployed BankMarketer application
              running inside the case study.

            </p>

          </div>


          <BankMarketerWindow />

        </div>

      </section>


      {/* =================================================
          DATA
          ================================================= */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div>

              <div className="kicker mono">
                02 / The data
              </div>

              <h2 className="section-title display">

                Customer signals,
                <br />
                not just columns.

              </h2>

            </div>


            <p className="section-note">

              Demographics, financial information,
              campaign activity, and previous outcomes
              provide the model's input space.

            </p>

          </div>


          <div className="bank-data-grid">

            <article>

              <span className="mono">
                01
              </span>

              <h3>
                Customer
              </h3>

              <p>
                Age, job, marital status, and education.
              </p>

            </article>


            <article>

              <span className="mono">
                02
              </span>

              <h3>
                Financial
              </h3>

              <p>
                Balance, housing, personal loan, and default.
              </p>

            </article>


            <article>

              <span className="mono">
                03
              </span>

              <h3>
                Campaign
              </h3>

              <p>
                Contact method, timing, and campaign activity.
              </p>

            </article>


            <article>

              <span className="mono">
                04
              </span>

              <h3>
                History
              </h3>

              <p>
                Previous contacts and previous campaign outcomes.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =================================================
          FEATURE ENGINEERING
          ================================================= */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div>

              <div className="kicker mono">
                03 / Feature engineering
              </div>

              <h2 className="section-title display">

                Turn history
                <br />
                into signal.

              </h2>

            </div>


            <p className="section-note">

              Additional features were created to give the
              model more useful information about campaign history.

            </p>

          </div>


          <div className="bank-engineering">

            <article>

              <span className="mono">
                01
              </span>

              <div>

                <h3>
                  was_contacted
                </h3>

                <p>
                  Identifies whether the customer had previous
                  contact activity.
                </p>

              </div>

            </article>


            <article>

              <span className="mono">
                02
              </span>

              <div>

                <h3>
                  campaign × previous
                </h3>

                <p>
                  Combines current campaign intensity with
                  previous contact history.
                </p>

              </div>

            </article>


            <article>

              <span className="mono">
                03
              </span>

              <div>

                <h3>
                  poutcome × campaign
                </h3>

                <p>
                  Connects previous campaign outcome with
                  the current campaign context.
                </p>

              </div>

            </article>

          </div>

        </div>

      </section>


      {/* =================================================
          DURATION
          ================================================= */}

      <section className="section">

        <div className="container">

          <div className="bank-decision">

            <div>

              <span className="bank-story-number">
                DESIGN DECISION
              </span>

              <h2 className="display">

                The feature
                <br />
                I left out.

              </h2>

            </div>


            <div>

              <div className="bank-code mono">
                duration
              </div>


              <p className="bank-large-copy">

                Duration is deliberately excluded from the
                public prediction interface.

              </p>


              <p>

                The value becomes known during the call.
                A pre-contact prediction should not depend
                on information that only exists after the
                interaction has started.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PIPELINE
          ================================================= */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div>

              <div className="kicker mono">
                04 / Inference pipeline
              </div>

              <h2 className="section-title display">

                From form
                <br />
                to prediction.

              </h2>

            </div>


            <p className="section-note">

              The deployed system connects the frontend,
              validation, preprocessing, model, and response.

            </p>

          </div>


          <div className="bank-pipeline">

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


      {/* =================================================
          ENGINEERING
          ================================================= */}

      <section className="section">

        <div className="container">

          <div className="bank-stack">

            <div>

              <span className="bank-story-number">
                05 / Engineering
              </span>

              <h2 className="display">

                Not just
                <br />
                a notebook.

              </h2>

            </div>


            <div className="bank-stack-list">

              {engineering.map(
                ([label, title, text]) => (

                  <div key={label}>

                    <span className="mono">
                      {label}
                    </span>

                    <strong>
                      {title}
                    </strong>

                    <p>
                      {text}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          SOURCE
          ================================================= */}

      <section className="section">

        <div className="container">

          <div className="bank-story-grid">

            <article>

              <span className="bank-story-number">
                SOURCE
              </span>

              <h3>
                The implementation
                <br />
                is public.
              </h3>

              <p>

                The repository contains the machine learning
                workflow, preprocessing system, API,
                frontend, and deployment configuration.

              </p>

              <a
                className="project-link"
                href="https://github.com/LochanJangid/bank-marketing"
                target="_blank"
                rel="noreferrer"
              >
                Open GitHub repository ↗
              </a>

            </article>


            <article>

              <span className="bank-story-number">
                LIVE
              </span>

              <h3>
                Use the full
                <br />
                application.
              </h3>

              <p>

                The embedded window above is the same deployed
                application. Open it separately when you want
                the full browser experience.

              </p>

              <a
                className="project-link"
                href="https://bank-marketing-alpha.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Open BankMarketer ↗
              </a>

            </article>

          </div>

        </div>

      </section>


      <Footer />

    </main>

  );

}