const tags = ['Python', 'Scikit-learn', 'Random Forest', 'FastAPI', 'Docker', 'Streamlit'];

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
            The portfolio currently focuses on one substantial ML project rather than fifteen tiny rectangles pretending to be a career.
          </p>
        </div>

        <div className="project-feature">
          <article className="project-card project-card-main">
            <div>
              <div className="project-meta mono"><span>SEE HOUSE</span><span>REGRESSION</span></div>
              <h3 className="project-title display">California Housing<br />Price Intelligence</h3>
              <p className="project-desc">
                An end-to-end housing price prediction system built around a Random Forest Regressor,
                exposed through a FastAPI inference service and packaged for deployment.
              </p>
              <div className="tags">
                {tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            </div>
            <a className="project-link" href="/work/see-house">Explore the case study ↗</a>
          </article>

          <aside className="project-card model-panel">
            <div className="panel-content">
              <div>
                <div className="panel-eyebrow mono">Inference snapshot</div>
                <div className="prediction-display">
                  <div className="prediction-label">Example estimated median value</div>
                  <div className="prediction-value">$421,700</div>
                  <div className="mono" style={{fontSize:11,color:'color-mix(in oklab,var(--cream) 48%,transparent)'}}>raw model output × 100,000</div>
                </div>
              </div>
              <div>
                <div className="spark-bars" aria-label="Illustrative model signal bars">
                  {[48,67,58,85,73,91,64,78,52,88,72,96].map((height, i) => <span key={i} style={{height:`${height}%`, animationDelay:`${i*55}ms`}} />)}
                </div>
                <div className="model-foot">
                  <div><span>MODEL</span><strong>Random Forest Regressor</strong></div>
                  <div><span>FEATURES</span><strong>8 numeric inputs</strong></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
