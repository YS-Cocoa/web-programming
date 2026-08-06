import { useState } from 'react';
import { Link } from 'react-router-dom';
import WorkModal from '../components/WorkModal';
import { featuredWorks } from '../data/works';
import { getWorkCover } from '../utils/workImages';
import cloudImage from '../assets/cloud.webp';
import homeDrawingImage from '../assets/home_drawing.webp';
import logoImage from '../assets/logo.png';
import title1Image from '../assets/title1.svg';
import title2Image from '../assets/title2.svg';
import portfolioTextImage from '../assets/Yoshika’s Portfolio.svg';

function Home() {
  const [selectedWork, setSelectedWork] = useState(null);
  const [heroReady, setHeroReady] = useState(false);
  const previewWorks = featuredWorks;
  const carouselWorks = [...previewWorks, ...previewWorks];

  return (
    <main>
      <section className={`hero${heroReady ? ' hero-ready' : ''}`} id="home">
        <img className="cloud cloud-top" src={cloudImage} alt="" />
        <img
          className="hero-title hero-title-top"
          src={title1Image}
          alt="好奇心の赴くままに"
          onAnimationEnd={(event) => {
            if (event.animationName === 'heroFocus') setHeroReady(true);
          }}
        />
        <div className="hero-logo">
          <img className="hero-logo-mark" src={logoImage} alt="" />
          <img className="hero-logo-text" src={portfolioTextImage} alt="Yoshika's Portfolio" />
        </div>
        <h1 className="hero-main-title">
          <img className="hero-title hero-title-main" src={title2Image} alt="世界基準で没頭する" />
        </h1>
        <div className="scroll-cue" aria-hidden="true" />
        <div className="intro">
          <p>こんにちは、下口慶夏（よしか）です。<br />5歳児のような好奇心のまま、気になったことへまず手を伸ばします。</p>
          <p>科学・バイオ・AI・文章・絵・音楽。<br />分野を横断しながら、実験と制作を繰り返してきました。</p>
          <p>求められた答えに収まらず、「もっとできる」を試し、<br />想定の先までつくることを大切にしています。</p>
          <p>今は酵母に関する研究と論文執筆に取り組み、<br />中学2年からバイオ系スタートアップでインターンを続けています。</p>
          <p>このサイトは、そんな探究と制作の過程を集めた、よしかのひみつきちです。</p>
          <p>よかったら、のぞいていってください。</p>
        </div>

        <div className="home-feature">
          <img src={homeDrawingImage} alt="手描きの作品" />
          <aside>
            <h2>下口慶夏です。</h2>
            <p>5歳児のような好奇心で、気になったことにまず手をつけます。</p>
            <p>科学から絵や音楽まで、違う世界を行き来しながら、想定された答えの先までつくる人です。</p>
            <Link className="text-link" to="/about">よしかについて</Link>
          </aside>
        </div>

        <section className="home-preview" aria-labelledby="home-works">
          <h2 id="home-works">モノづくりが大好きです。</h2>
          <div className="home-card-row">
            <div className="home-card-track">
              {carouselWorks.map((work, index) => (
                <button
                  aria-hidden={index >= previewWorks.length}
                  className="work-card compact"
                  key={`${work.title}-${index}`}
                  onClick={() => setSelectedWork(work)}
                  tabIndex={index >= previewWorks.length ? -1 : 0}
                  type="button"
                >
                  <div className="work-thumb">
                    {getWorkCover(work.id) ? (
                      <img
                        src={getWorkCover(work.id)}
                        alt=""
                        style={{
                          objectPosition:
                            work.cardImagePosition ?? work.imagePositions?.cover ?? 'center',
                        }}
                      />
                    ) : (
                      work.category
                    )}
                  </div>
                  <h3>{work.title}</h3>
                  <p>{work.summary}</p>
                </button>
              ))}
            </div>
          </div>
          <Link className="text-link align-end" to="/journey">もっと見る</Link>
        </section>
        {selectedWork && (
          <WorkModal
            onClose={() => setSelectedWork(null)}
            work={selectedWork}
          />
        )}

        <section className="home-note" aria-labelledby="home-philosophy">
          <h2 id="home-philosophy">よしかの「没頭」って？</h2>
          <p>
            私は日々、好奇心の赴くままに活動しています。気づけば没頭し、いつでも没頭。
            今いる場所から少しだけ背伸びして、世界基準に近づくことを大切にしています。
          </p>
          <Link className="text-link" to="/philosophy">よしかの哲学を知る</Link>
        </section>

        <section className="home-contact">
          <h2>つながる</h2>
          <Link className="text-link" to="/contact">ご連絡・お問い合わせはこちらから</Link>
        </section>
      </section>
    </main>
  );
}

export default Home;
