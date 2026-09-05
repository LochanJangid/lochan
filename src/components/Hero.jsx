export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow mono">ML / AI / Intelligent Systems</div>
          <h1 className="display">I build intelligent systems.</h1>
          <p className="hero-copy">
            I like the part where an idea becomes a model, the model becomes an API,
            and the API becomes something people can actually use.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">See the work ↓</a>
            <a className="btn btn-secondary" href="https://github.com/LochanJangid" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>

        <aside className="hero-art" aria-label="Current focus">
          <div className="status-line"><span className="status-dot" /> currently learning + building</div>
          <div className="orbit" aria-hidden="true">
            <div className="orbit-label mono">MODEL</div>
            <div className="orbit-core" />
          </div>
          <div className="mono" style={{fontSize: 11, color: 'var(--ink-soft)', lineHeight: 1.8}}>
            python · sklearn · pytorch<br />
            llms · rag · vision · fastapi
          </div>
        </aside>
      </div>
    </section>
  );
}
