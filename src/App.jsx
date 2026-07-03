import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import cloudImage from './assets/cloud.png';
import footerCloudImage from './assets/cloud_footer.png';
import homeDrawingImage from './assets/home-drawing.png';
import logoImage from './assets/logo.png';
import profileImage from './assets/profile.JPG';
import title1Image from './assets/title1.svg';
import title2Image from './assets/title2.svg';
import portfolioTextImage from './assets/Yoshika’s Portfolio.svg';

const navItems = [
  { to: '/about', label: 'よしかとは' },
  { to: '/journey', label: '探究の旅路' },
  { to: '/philosophy', label: 'よしかの哲学' },
  { to: '/contact', label: 'つながる' },
];

const works = [
  {
    title: 'ロゴパネル制作プロジェクト',
    category: 'プロジェクト成果物',
    meta: 'モノづくり / 神山まるごと高専',
    summary: '場の記憶やチームの思いを、手で触れられるかたちにした制作。',
  },
  {
    title: '折り紙啓発プロジェクト',
    category: 'プロジェクト成果物',
    meta: 'モノづくり',
    summary: '小さな紙の構造から、伝え方と体験のデザインを考えた試作。',
  },
  {
    title: '光染堂',
    category: 'プロジェクト成果物',
    meta: 'モノづくり / まるごと祭2025',
    summary: '色、光、展示の関係を使い、見る人の感覚に残る表現を制作。',
  },
  {
    title: '高森町街並立体観光マッププロジェクト',
    category: 'クライアントワーク',
    meta: '3Dアバター / YouTube生配信出演',
    summary: '地域の魅力を立体的に伝えるため、視点設計と見せ方を探究。',
  },
  {
    title: '絵、描きます。アクリルガッシュ編',
    category: '授業成果物',
    meta: '中学校の美術の課題',
    summary: '色と構図を試しながら、画面の中に物語を残した制作。',
  },
  {
    title: '閲覧アート',
    category: '授業成果物',
    meta: '数学 / アート',
    summary: '情報を見る行為そのものを、表現の題材として扱った試作。',
  },
  {
    title: '古民家リノベーションプロジェクト',
    category: 'ボランティア活動',
    meta: '高森市 / 古民家',
    summary: '既存の空間を読み解き、暮らしと表現が重なる場づくりに参加。',
  },
  {
    title: '箏笛・獅子舞',
    category: 'ボランティア活動',
    meta: '芸能',
    summary: '地域文化に身体で触れ、表現の背景を学んだ記録。',
  },
  {
    title: 'お米づくりプロジェクト',
    category: '授業成果物',
    meta: '神山まるごと高専 / 高森',
    summary: '自然と人の営みを観察し、身体で学ぶプロセスを記録。',
  },
  {
    title: '理想の指標薬づくり',
    category: '授業成果物',
    meta: 'オリジナルのグラデーション試験紙を開発',
    summary: '実験と観察を重ね、色の変化をわかりやすく扱う試み。',
  },
  {
    title: '株式会社WAKUにてインターン',
    category: 'クライアントワーク',
    meta: 'インターン',
    summary: '現場での制作と検証を通じて、実装の進め方を学んだ経験。',
  },
  {
    title: '習字ロボ',
    category: '授業成果物',
    meta: 'プログラミング演習 / 神山まるごと高専',
    summary: '機械の動きと文字表現を組み合わせた制作。',
  },
  {
    title: 'ステンドグラス風アート',
    category: '授業成果物',
    meta: '工作',
    summary: '光を通したときの見え方を意識した平面作品。',
  },
  {
    title: 'はじめて油画',
    category: '授業成果物',
    meta: 'モノづくり / 神山まるごと高専 / 美術',
    summary: '素材の扱い方を試しながら、色と質感を探った制作。',
  },
  {
    title: '木炭デッサン',
    category: '授業成果物',
    meta: 'モノづくり',
    summary: '濃淡と形の取り方を観察しながら描いた習作。',
  },
  {
    title: '自然と人工をテーマとした造形',
    category: '授業成果物',
    meta: 'モノづくり / 神山まるごと高専',
    summary: '自然物と人工物の関係を立体で考えた制作。',
  },
  {
    title: 'あなたにとっての「ローイング」とは?',
    category: '授業成果物',
    meta: 'モノづくり / 神山まるごと高専',
    summary: '問いを受け取り、解釈をかたちにするための表現。',
  },
  {
    title: '電気回路、分解、大好きです',
    category: '授業成果物',
    meta: 'モノづくり / 神山まるごと高専 / 分解',
    summary: '仕組みを知るために手を動かし、観察を重ねた記録。',
  },
];

const activityItems = [
  {
    title: 'シリコンバレー渡航 KAMIYAMA AWARD 副賞',
    meta: '神山まるごと高専 / 5日間',
  },
  {
    title: 'Professor Harry Messel International Science School',
    meta: 'シドニー大学 / 文部科学省 / 14日間',
  },
  {
    title: 'FIRST Robotics Competition Chicago Regional',
    meta: 'Hanabi / 8日間',
  },
  {
    title: 'Quest Forward Academy 訪問',
    meta: '神山まるごと高専',
  },
];

const filters = ['すべて', '授業成果物', 'プロジェクト成果物', 'クライアントワーク', 'ボランティア活動'];

const values = [
  {
    label: 'Mission',
    title: '冷静に没頭する',
    body: '自分の状態と置かれた状況を把握し、一歩踏み出した瞬間から世界は変わる。焦らず、けれど止まらず、好奇心の向く先へ進みます。',
  },
  {
    label: 'Vision',
    title: '半径10mのみんなが没頭し、高め合える社会',
    body: '隣にいる人の足踏みに気づき、声をかけ合える環境をつくる。没頭が孤独ではなく、互いを照らすものになる日常を目指します。',
  },
  {
    label: 'Concept',
    title: '好奇心の赴くままに世界基準で没頭する',
    body: '自分の現在地より少し高い世界基準を見つめ、そこへ近づくために手を動かす。振り返ればすべてはつながっていくと信じています。',
  },
];

function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="ホームへ戻る">
        <img src={logoImage} alt="" />
        <span>よしかのひみつきち</span>
      </Link>
      <nav aria-label="主要ナビゲーション">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function SectionTitle({ id, title, lead }) {
  return (
    <div className="section-title">
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

function Home() {
  const previewWorks = works.slice(0, 3);

  return (
    <main>
      <section className="hero" id="home">
        <img className="cloud cloud-top" src={cloudImage} alt="" />
        <img className="hero-title hero-title-top" src={title1Image} alt="好奇心の赴くままに" />
        <div className="hero-logo">
          <img className="hero-logo-mark" src={logoImage} alt="" />
          <img className="hero-logo-text" src={portfolioTextImage} alt="Yoshika's Portfolio" />
        </div>
        <h1 className="hero-main-title">
          <img className="hero-title hero-title-main" src={title2Image} alt="世界基準で没頭する" />
        </h1>
        <div className="intro">
          <p>こんにちは、よしかです。</p>
          <p>科学と自然とアートのあいだで、「なぜ？」をかたちにするのが好きです。</p>
          <p>実験もデザインも、プロジェクトづくりも、ぜんぶ没頭。</p>
          <p>世界の不思議を拾い集めながら、自分なりの言葉と作品で表現しています。</p>
          <p>このサイトは、そんな私のワクワクを集めた、世界にひとつだけのひみつきち。</p>
          <p>よかったら、のぞいていってください。</p>
        </div>

        <div className="home-feature">
          <img src={homeDrawingImage} alt="手描きの作品" />
          <aside>
            <h2>下口慶夏です。</h2>
            <p>「よしか」は精神年齢がずっと変わらない不思議ちゃんです。</p>
            <p>「よしか」がどんな人なのか、今までどう生きてきたのかを紹介します。</p>
            <Link className="text-link" to="/about">よしかとは</Link>
          </aside>
        </div>

        <section className="home-preview" aria-labelledby="home-works">
          <h2 id="home-works">モノづくりが大好きです。</h2>
          <div className="home-card-row">
            {previewWorks.map((work) => (
            <article className="work-card compact" key={work.title}>
              <div className="work-thumb">{work.category}</div>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
            </article>
            ))}
          </div>
          <Link className="text-link align-end" to="/journey">モノづくりを見る</Link>
        </section>

        <section className="home-note" aria-labelledby="home-philosophy">
          <h2 id="home-philosophy">よしかの「没頭」って?</h2>
          <p>
            私は日々、好奇心の赴くままに活動しています。気づけば没頭し、いつでも没頭。
            今いる場所から少しだけ背伸びして、世界基準に近づくことを大切にしています。
          </p>
          <Link className="text-link" to="/philosophy">よしかの哲学を知る</Link>
        </section>

        <section className="home-contact">
          <h2>つながる</h2>
          <p>ご連絡・お問い合わせはこちらから</p>
          <Link className="text-link" to="/contact">つながる</Link>
        </section>
      </section>
    </main>
  );
}

function About() {
  return (
    <main>
      <section className="about page-section" aria-labelledby="about">
        <SectionTitle id="about" title="よしかとは" />
        <div className="about-grid">
          <img className="profile-photo" src={profileImage} alt="下口慶夏のプロフィール写真" />
          <div className="about-text">
            <h3>下口 慶夏 - Yoshika Shimoguchi</h3>
            <p>岡山県出身。中学校まで地元の学校に通う。</p>
            <p>現在は全寮制の神山まるごと高専で学んでいる。</p>
            <p>平たく言えば好奇心モンスター。幼い頃から読書とお絵描きが好き。</p>
            <p>論文調査や記事執筆、イラスト、市場調査など幅広い分野に手を出す。</p>
            <p>今日も、この世界のどこかで好奇心の赴くままに探究を続ける。</p>
            <Link className="text-link" to="/philosophy">よしかの哲学を知る</Link>
          </div>
        </div>
        <section className="activity-carousel" aria-labelledby="activity-title">
          <h2 id="activity-title">プログラム参加経験</h2>
          <div className="activity-track">
            {activityItems.map((item) => (
              <article className="activity-card" key={item.title}>
                <div className="activity-thumb" />
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </article>
            ))}
          </div>
          <Link className="text-link align-end" to="/journey">よしかのモノづくりを見る</Link>
        </section>
      </section>
    </main>
  );
}

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

  useEffect(() => {
    if (!selectedWork) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedWork(null);
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedWork]);

  return (
    <main>
      <section className="journey page-section" aria-labelledby="journey">
        <SectionTitle
          id="journey"
          title="探究の旅路"
          lead="よしかが、これまで作ってきたモノを紹介します。"
        />
        <div className="filter-row" aria-label="作品ジャンル">
          {filters.map((filter) => (
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
            <button
              className="work-card"
              key={work.title}
              onClick={() => setSelectedWork(work)}
              type="button"
            >
              <div className="work-thumb">{work.category}</div>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
            </button>
          ))}
        </div>
        {selectedWork && (
          <div
            className="work-modal-backdrop"
            onClick={() => setSelectedWork(null)}
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
                onClick={() => setSelectedWork(null)}
                type="button"
              >
                ×
              </button>
              <div className="work-modal-images" aria-label="作品画像">
                <div className="work-modal-image">画像 1</div>
                <div className="work-modal-image">画像 2</div>
              </div>
              <div className="work-modal-text">
                <p className="work-modal-category"><span>ジャンル</span>{selectedWork.category}</p>
                <h3 id="work-modal-title">{selectedWork.title}</h3>
                <p>{selectedWork.summary}</p>
              </div>
            </article>
          </div>
        )}
      </section>
    </main>
  );
}

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

function Contact() {
  return (
    <main>
      <section className="contact page-section" aria-labelledby="contact">
        <SectionTitle id="contact" title="つながる" lead="必須事項（*）はご入力ください。" />
        <form className="contact-form">
          <label>
            会社名
            <input type="text" name="company" />
          </label>
          <label>
            お名前 *
            <input required type="text" name="name" />
          </label>
          <label>
            メールアドレス *
            <input required type="email" name="email" />
          </label>
          <label>
            電話番号
            <input type="tel" name="tel" />
          </label>
          <label>
            お問い合わせ内容 *
            <textarea required name="message" rows="7" />
          </label>
          <button type="submit">送信</button>
        </form>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main>
      <section className="page-section">
        <SectionTitle title="ページが見つかりません" lead="HOMEから見直してください。" />
        <Link className="text-link" to="/">HOMEへ戻る</Link>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <img className="footer-cloud" src={footerCloudImage} alt="" />
      <div className="footer-main">
        <p className="footer-brand">よしかのひみつきち</p>
        <nav aria-label="フッターナビゲーション">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <small>©Yoshika Shimoguchi All Rights Reserved.</small>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter basename="/web-programming">
      <div className="portfolio-shell">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
