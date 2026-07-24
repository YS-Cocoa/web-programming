import { useEffect } from 'react';
import { getWorkImages } from '../utils/workImages';

const detailLabels = {
  background: '背景',
  role: '役割',
  outcome: '成果',
  learning: '学び',
};

function WorkModal({ work, onClose }) {
  const workImages = getWorkImages(work.id).slice(0, 3);
  const coverImage = workImages[0];
  const detailImages = workImages.slice(1);
  const imagePositions = work.imagePositions ?? {};
  const coverPosition = imagePositions.cover ?? 'center';
  const detailEntries = Object.entries(work.details ?? {})
    .filter(([, body]) => body)
    .map(([key, body]) => ({
      label: detailLabels[key] ?? key,
      body,
    }));

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className="work-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <article
        aria-labelledby="work-modal-title"
        aria-modal="true"
        className="work-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="閉じる"
          className="work-modal-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <div className="work-modal-cover">
          {coverImage ? (
            <img src={coverImage} alt="" style={{ objectPosition: coverPosition }} />
          ) : (
            <div className="work-modal-cover-placeholder">{work.category}</div>
          )}
          <div className="work-modal-cover-text">
            <p>{work.category}</p>
            <h3 id="work-modal-title">{work.title}</h3>
          </div>
        </div>
        <div className="work-modal-text">
          <p className="work-modal-summary">{work.summary}</p>
          {work.description && (
            <p className="work-modal-description">{work.description}</p>
          )}
          {detailImages.length > 0 && (
            <div className="work-modal-images" aria-label="作品画像">
              {detailImages.map((imageUrl, index) => (
                <div className="work-modal-image" key={imageUrl}>
                  <img
                    src={imageUrl}
                    alt={`${work.title} ${index + 2}`}
                    style={{ objectPosition: imagePositions[`image${index + 2}`] ?? 'center' }}
                  />
                </div>
              ))}
            </div>
          )}
          {detailEntries.length > 0 && (
            <dl className="work-modal-details">
              {detailEntries.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.body}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </article>
    </div>
  );
}

export default WorkModal;
