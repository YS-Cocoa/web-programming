import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import WorkCard from '../components/WorkCard';
import WorkModal from '../components/WorkModal';
import { profileCareer } from '../data/profile';
import { works, workFilters } from '../data/works';

const careerWorkIds = new Set(
  profileCareer.map((item) => item.workId).filter(Boolean),
);
const journeyWorks = works.filter(
  (work) => work.featured || careerWorkIds.has(work.id),
);
const availableFilters = workFilters.filter(
  (filter) =>
    filter === 'すべて' || journeyWorks.some((work) => work.category === filter),
);

function Journey() {
  const [activeFilter, setActiveFilter] = useState('すべて');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedWork = works.find((work) => work.id === searchParams.get('work'));
  const filteredWorks = useMemo(
    () =>
      activeFilter === 'すべて'
        ? journeyWorks
        : journeyWorks.filter((work) => work.category === activeFilter),
    [activeFilter],
  );

  const openWork = (work) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('work', work.id);
    setSearchParams(nextParams);
  };

  const closeWork = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('work');
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <main>
      <section className="journey page-section" aria-labelledby="journey">
        <SectionTitle
          id="journey"
          title="探究の旅路"
          lead="よしかが、これまで作ってきたモノを紹介します。"
        />
        <div className="filter-row" aria-label="作品ジャンル">
          {availableFilters.map((filter) => (
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
              key={work.id}
              onSelect={openWork}
              work={work}
            />
          ))}
        </div>
        {selectedWork && (
          <WorkModal
            onClose={closeWork}
            work={selectedWork}
          />
        )}
      </section>
    </main>
  );
}

export default Journey;
