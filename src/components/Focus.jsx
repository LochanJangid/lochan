const items = [
  ['01', 'Machine learning', 'Regression, classification, ensembles, evaluation, and learning how models behave outside the notebook.'],
  ['02', 'LLMs', 'Retrieval, embeddings, agents, tool use, evaluation, and the systems around language models.'],
  ['03', 'Computer vision', 'Visual understanding with OpenCV, deep learning, detection, tracking, and practical inference.'],
];

export default function Focus() {
  return (
    <section className="section" id="focus">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker mono">What I like building</div>
            <h2 className="section-title display">Model first.<br />System always.</h2>
          </div>
          <p className="section-note">
            I am more interested in understanding the full path from data to behavior than collecting technology names like trading cards.
          </p>
        </div>

        <div className="capabilities">
          {items.map(([number, title, text]) => (
            <article className="capability" key={number}>
              <div className="capability-number mono">{number}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
