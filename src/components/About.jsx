export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <div className="kicker mono">About</div>
          <p className="about-text">
            I am Lochan, a student building toward machine learning and AI engineering.
          </p>
        </div>
        <div>
          <p className="about-small">
            I enjoy going beneath the interface: understanding the data, testing assumptions,
            comparing models, serving inference, and turning experiments into systems.
            I am especially interested in LLM applications and the engineering around them.
          </p>
          <div className="stack">
            {[
              ['Core', 'Python · SQL · Git'],
              ['ML', 'Scikit-learn · PyTorch · NumPy · Pandas'],
              ['AI', 'LLMs · RAG · Embeddings · Agents'],
              ['Vision', 'OpenCV · Detection · Tracking'],
              ['Systems', 'FastAPI · Docker · Next.js · Vercel'],
            ].map(([left,right]) => (
              <div className="stack-row" key={left}><span>{left}</span><span>{right}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
