import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import PredictionDemo from '../../../components/PredictionDemo';

const featureImportance = [
  ['Median Income', 52],
  ['Longitude', 16],
  ['Latitude', 15],
  ['House Age', 5],
  ['Average Rooms', 4],
  ['Average Occupancy', 3],
  ['Population', 3],
  ['Average Bedrooms', 2],
];

const fields = [
  ['MedInc', 'Median income in block group', '× $10k'],
  ['HouseAge', 'Median house age', 'years'],
  ['AveRooms', 'Average rooms per household', 'rooms'],
  ['AveBedrms', 'Average bedrooms per household', 'rooms'],
  ['Population', 'Total block group population', 'people'],
  ['AveOccup', 'Average household size', 'people'],
  ['Latitude', 'Block group latitude', 'coordinate'],
  ['Longitude', 'Block group longitude', 'coordinate'],
];

const architecture = [
  ['01', 'Dataset', '20,640 observations from the California Housing dataset.'],
  ['02', 'Features', 'Eight numerical housing, demographic, and geographic inputs.'],
  ['03', 'Model', 'Random Forest Regressor with tuned tree parameters.'],
  ['04', 'API', 'FastAPI endpoint accepting a JSON input list.'],
  ['05', 'Product', 'A web-facing inference interface built for fast exploration.'],
];

const scatterDots = [
  [14, 76], [19, 65], [24, 70], [31, 53], [36, 60], [41, 44], [46, 49],
  [51, 38], [57, 42], [62, 30], [67, 34], [73, 23], [78, 29], [84, 18], [89, 15],
  [29, 82], [55, 57], [70, 47], [81, 39], [44, 72], [64, 62], [76, 55],
];

export default function SeeHousePage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="project-page-hero">
        <div className="container">
          <div className="kicker mono">01 / Machine learning case study</div>
          <h1 className="project-page-title display">See-House:<br />California housing, modeled.</h1>
          <p className="project-page-sub">
            An end-to-end regression project that estimates California block-group median house values
            using a Random Forest Regressor, then exposes the trained model through FastAPI for inference.
          </p>

          <div className="hero-actions" style={{marginTop:30}}>
            <a className="btn btn-primary" href="#demo">Try the model ↓</a>
            <a className="btn btn-secondary" href="https://github.com/LochanJangid/See-House" target="_blank" rel="noreferrer">View source ↗</a>
          </div>

          <div className="project-hero-meta">
            <div className="meta-block"><div className="meta-label mono">Model</div><div className="meta-value">Random Forest</div></div>
            <div className="meta-block"><div className="meta-label mono">Task</div><div className="meta-value">Regression</div></div>
            <div className="meta-block"><div className="meta-label mono">Data</div><div className="meta-value">20,640 rows</div></div>
            <div className="meta-block"><div className="meta-label mono">API</div><div className="meta-value">FastAPI</div></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="metrics-title">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker mono">Observed results</div><h2 id="metrics-title" className="section-title display">Numbers first.</h2></div>
            <p className="section-note">These headline figures come from the project documentation and are kept separate from any visual estimates.</p>
          </div>
          <div className="metric-grid">
            <div className="metric"><div className="metric-value">0.795</div><div className="metric-label">R² on the documented holdout evaluation</div></div>
            <div className="metric"><div className="metric-value">$34.2k</div><div className="metric-label">Mean absolute error</div></div>
            <div className="metric"><div className="metric-value">80 / 20</div><div className="metric-label">Training / holdout split</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker mono">The problem</div><h2 className="section-title display">Can geography<br />predict value?</h2></div>
            <p className="section-note">Housing prices depend on nonlinear interactions between income, location, household structure, and the local housing stock.</p>
          </div>
          <div className="story-grid">
            <article className="story-card">
              <div className="kicker mono">01 / Input</div>
              <h3>Eight signals</h3>
              <p>
                The model receives median income, house age, average rooms, average bedrooms,
                population, average occupancy, latitude, and longitude for a California block group.
              </p>
            </article>
            <article className="story-card">
              <div className="kicker mono">02 / Output</div>
              <h3>One estimate</h3>
              <p>
                The prediction is a normalized median-house-value estimate. The existing See-House interface
                converts the raw model output to a dollar display by multiplying by 100,000.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker mono">Feature space</div><h2 className="section-title display">What the model<br />listens to.</h2></div>
            <p className="section-note">The repository's documented global feature importance places Median Income clearly ahead, with location also playing a large role.</p>
          </div>

          <div className="chart-grid">
            <div className="chart-card">
              <div className="chart-title">Global feature importance · relative percentage</div>
              <div className="bars">
                {featureImportance.map(([label, value]) => (
                  <div className="bar-row" key={label}>
                    <span>{label}</span>
                    <div className="bar-track"><div className="bar-fill" style={{width:`${value}%`}} /></div>
                    <span className="mono">{value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title">Actual vs predicted · visual study</div>
              <div className="scatter" aria-label="Illustrative actual versus predicted scatter plot">
                {scatterDots.map(([x,y], index) => (
                  <span key={index} className="dot" style={{left:`${x}%`,top:`${y}%`}} />
                ))}
              </div>
              <p className="note" style={{marginTop:18}}>
                This chart is intentionally a visual approximation, not a fabricated copy of held-out observations.
                The documented evaluation reports R² = 0.795 and MAE = $34,285.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker mono">Methodology</div><h2 className="section-title display">Why a forest?</h2></div>
            <p className="section-note">The project uses tree-based partitioning to model nonlinear relationships across economic and geographic features without explicit polynomial feature engineering.</p>
          </div>

          <div className="story-card" style={{marginBottom:22}}>
            <p style={{fontFamily:'DM Mono, monospace',fontSize:14,overflowX:'auto'}}>
              f̂<sub>RF</sub>(x) = 1 / B × Σ<sub>b=1</sub><sup>B</sup> T<sub>b</sub>(x)
            </p>
            <p style={{marginTop:18}}>
              The documented tuned configuration uses <strong>100 estimators</strong>, a maximum tree depth of <strong>12</strong>,
              and a minimum samples-per-leaf of <strong>5</strong>.
            </p>
          </div>

          <div className="architecture">
            {architecture.map(([number,title,text]) => (
              <div className="arch-step" key={number}>
                <div className="arch-num">{number}</div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="demo">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker mono">Live interface</div><h2 className="section-title display">Use the model.</h2></div>
          </div>
          <PredictionDemo />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker mono">Feature dictionary</div><h2 className="section-title display">What goes in.</h2></div>
            <p className="section-note">The input order below mirrors the current See-House FastAPI contract exactly.</p>
          </div>
          <div className="chart-card">
            {fields.map(([name, description, unit]) => (
              <div className="stack-row" key={name}>
                <span className="mono">{name}</span>
                <span>{description}</span>
                <span className="mono">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story-grid">
            <article className="story-card">
              <div className="kicker mono">Limitations</div>
              <h3>Interpolation, not magic.</h3>
              <p>
                The project documentation notes an important limitation of tree-based methods: they do not extrapolate
                beyond the patterns represented in the training data. Predictions should therefore be interpreted within the model's learned domain.
              </p>
            </article>
            <article className="story-card">
              <div className="kicker mono">Source</div>
              <h3>Inspect everything.</h3>
              <p>
                The public repository contains the model artifacts, notebooks, source, Docker configuration, FastAPI entry point,
                and Streamlit interface used to develop and demonstrate See-House.
              </p>
              <a className="project-link" href="https://github.com/LochanJangid/See-House" target="_blank" rel="noreferrer">Open GitHub repository ↗</a>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
