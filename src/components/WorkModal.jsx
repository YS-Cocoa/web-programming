import { Fragment, useEffect } from 'react';
import { getWorkImages } from '../utils/workImages';

const detailLabels = {
  background: '背景',
  role: '役割',
  process: '取り組みの過程',
  challenge: '課題と工夫',
  outcome: '得られたこと',
  learning: '学び',
};

const detailOrder = ['background', 'role', 'process', 'challenge', 'outcome', 'learning'];

const factLabels = {
  period: '期間',
  team: '体制',
  methods: '手法・技術',
  basis: '受賞基準',
};

function DetailImage({ imageUrl, imageNumber, imagePositions, imageCaptions, title }) {
  return (
    <figure
      className={`work-modal-image work-modal-image-${imageNumber}`}
    >
      <img
        src={imageUrl}
        alt={`${title} ${imageNumber}`}
        style={{ objectPosition: imagePositions[`image${imageNumber}`] ?? 'center' }}
      />
      {imageCaptions[`image${imageNumber}`] && (
        <figcaption>{imageCaptions[`image${imageNumber}`]}</figcaption>
      )}
    </figure>
  );
}

function WorkModal({ work, onClose }) {
  // AI使用: Codexを用いて、作品データから事実・画像・詳細を共通表示する構成へ整理した。
  const workImages = getWorkImages(work.id).slice(0, 3);
  const coverImage = workImages[0];
  const detailImages = workImages.slice(1);
  const imagePositions = work.imagePositions ?? {};
  const imageCaptions = work.imageCaptions ?? {};
  const coverPosition = imagePositions.cover ?? 'center';
  const factEntries = [
    { label: '分野・場所', body: work.meta },
    ...Object.entries(work.facts ?? {}).map(([key, body]) => ({
      label: factLabels[key] ?? key,
      body,
    })),
  ].filter(({ body }) => body);
  const detailEntries = detailOrder
    .filter((key) => work.details?.[key])
    .map((key) => ({
      key,
      label: detailLabels[key] ?? key,
      body: work.details[key],
    }));
  const firstImageIndex = Math.max(
    detailEntries.findIndex(({ key }) => key === 'role'),
    detailEntries.findIndex(({ key }) => key === 'background'),
    0,
  );
  const secondImagePreferredIndex = detailEntries.findIndex(
    ({ key }) => key === 'challenge' || key === 'process',
  );
  const secondImageIndex = secondImagePreferredIndex >= 0
    ? secondImagePreferredIndex
    : Math.max(firstImageIndex, detailEntries.length - 2);
  const imagePlacements = detailImages.map((imageUrl, index) => ({
    imageNumber: index + 2,
    imageUrl,
    afterDetailIndex: index === 0 ? firstImageIndex : secondImageIndex,
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
        <div className="work-modal-close-dock">
          <button
            aria-label="閉じる"
            className="work-modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
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
          {factEntries.length > 0 && (
            <dl className="work-modal-facts">
              {factEntries.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.body}</dd>
                </div>
              ))}
            </dl>
          )}
          {(detailEntries.length > 0 || detailImages.length > 0) && (
            <div className="work-modal-story">
              {detailEntries.map((detail, detailIndex) => (
                <Fragment key={detail.key}>
                  <dl className="work-modal-details">
                    <div>
                      <dt>{detail.label}</dt>
                      <dd>{detail.body}</dd>
                    </div>
                  </dl>
                  {imagePlacements
                    .filter(({ afterDetailIndex }) => afterDetailIndex === detailIndex)
                    .map((image) => (
                      <DetailImage
                        imageCaptions={imageCaptions}
                        imageNumber={image.imageNumber}
                        imagePositions={imagePositions}
                        imageUrl={image.imageUrl}
                        key={image.imageUrl}
                        title={work.title}
                      />
                    ))}
                </Fragment>
              ))}
              {detailEntries.length === 0 && imagePlacements.map((image) => (
                <DetailImage
                  imageCaptions={imageCaptions}
                  imageNumber={image.imageNumber}
                  imagePositions={imagePositions}
                  imageUrl={image.imageUrl}
                  key={image.imageUrl}
                  title={work.title}
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default WorkModal;
