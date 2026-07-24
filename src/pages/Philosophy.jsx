import SectionTitle from '../components/SectionTitle';
import { values } from '../data/values';

function Philosophy() {
  return (
    <main>
      <section className="philosophy page-section" aria-labelledby="philosophy">
        <SectionTitle
          id="philosophy"
          title="よしかの哲学"
          lead="よしかの原点、価値観、世界へのまなざしをまとめました。"
        />
        <div className="value-list">
          {values.map((value) => (
            <article className="value-item" key={value.label}>
              <p className="value-label">{value.label}</p>
              <div>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Philosophy;
