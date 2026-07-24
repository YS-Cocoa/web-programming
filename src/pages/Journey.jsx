import { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import WorkCard from '../components/WorkCard';
import WorkModal from '../components/WorkModal';
import { workFilters, works } from '../data/works';

function Journey() {
  const [activeFilter, setActiveFilter] = useState('すべて');
  const [selectedWork, setSelectedWork] = useState(null);
  const filteredWorks = useMemo(
    () =>
      activeFilter === 'すべて'
        ? works
        : works.filter((work) => work.category === activeFilter),
    [activeFilter],
  );

  return (
    <main>
      <section className="journey page-section" aria-labelledby="journey">
        <SectionTitle
          id="journey"
          title="探究の旅路"
          lead="よしかが、これまで作ってきたモノを紹介します。"
        />
        <div className="filter-row" aria-label="作品ジャンル">
          {workFilters.map((filter) => (
            <button
              className={filter === activeFilter ? 'active' : ''}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="work-grid">
          {filteredWorks.map((work) => (
            <WorkCard
              key={work.title}
              onSelect={setSelectedWork}
              work={work}
            />
          ))}
        </div>
        {selectedWork && (
          <WorkModal
            onClose={() => setSelectedWork(null)}
            work={selectedWork}
          />
        )}
      </section>
    </main>
  );
}

export default Journey;
