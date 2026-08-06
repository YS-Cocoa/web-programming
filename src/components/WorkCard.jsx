import { getWorkCover } from '../utils/workImages';

function WorkCard({ work, onSelect }) {
  const coverImage = getWorkCover(work.id);
  const coverPosition = work.cardImagePosition ?? work.imagePositions?.cover ?? 'center';

  return (
    <button
      className="work-card"
      onClick={() => onSelect(work)}
      type="button"
    >
      <div className="work-thumb">
        {coverImage ? (
          <img src={coverImage} alt="" style={{ objectPosition: coverPosition }} />
        ) : (
          work.category
        )}
      </div>
      <h3>{work.title}</h3>
      <p>{work.summary}</p>
    </button>
  );
}

export default WorkCard;
