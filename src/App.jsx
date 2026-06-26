import { useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import cloudImage from './assets/cloud.png';
import footerCloudImage from './assets/cloud_footer.png';
import logoImage from './assets/logo.png';
import profileImage from './assets/profile.JPG';

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
    title: '高森町街並立体観光マッププロジェクト',
    category: 'プロジェクト成果物',
    meta: '3Dアバター / YouTube生配信出演',
    summary: '地域の魅力を立体的に伝えるため、視点設計と見せ方を探究。',
  },
  {
    title: '古民家リノベーションプロジェクト',
    category: 'プロジェクト成果物',
    meta: '高森市 / 古民家',
    summary: '既存の空間を読み解き、暮らしと表現が重なる場づくりに参加。',
  },
  {
    title: '折り紙啓発プロジェクト',
    category: 'デザイン',
    meta: 'モノづくり',
    summary: '小さな紙の構造から、伝え方と体験のデザインを考えた試作。',
  },
  {
    title: '光染堂',
    category: 'デザイン',
    meta: 'モノづくり / まるごと祭2025',
    summary: '色、光、展示の関係を使い、見る人の感覚に残る表現を制作。',
  },
  {
    title: 'お米づくりプロジェクト',
    category: '授業成果物',
    meta: '神山まるごと高専 / 高森',
    summary: '自然と人の営みを観察し、身体で学ぶプロセスを記録。',
  },
];

const filters = ['すべて', '授業成果物', 'デザイン', 'プロジェクト成果物'];

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
  return (
    <main>
      <section className="hero" id="home">
        <img className="cloud cloud-top" src={cloudImage} alt="" />
        <div className="hero-logo">
          <img src={logoImage} alt="Yoshika's Portfolio" />
        </div>
        <p className="hero-copy">好奇心の赴くままに</p>
        <h1>世界基準で没頭する</h1>
        <div className="intro">
          <p>こんにちは、よしかです。</p>
          <p>科学と自然とアートのあいだで、「なぜ？」をかたちにするのが好きです。</p>
          <p>実験もデザインも、プロジェクトづくりも、ぜんぶ没頭。</p>
          <p>世界の不思議を拾い集めながら、自分なりの言葉と作品で表現しています。</p>
        </div>
        <div className="home-links" aria-label="ページ案内">
          <Link to="/about">よしかとは</Link>
          <Link to="/journey">モノづくりを見る</Link>
          <Link to="/philosophy">よしかの哲学を知る</Link>
        </div>
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
      </section>
    </main>
  );
}

function Journey() {
  const [activeFilter, setActiveFilter] = useState('すべて');
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
            <article className="work-card" key={work.title}>
              <div className="work-thumb">{work.category}</div>
              <h3>{work.title}</h3>
              <p className="work-meta">{work.meta}</p>
              <p>{work.summary}</p>
            </article>
          ))}
        </div>
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
      <p className="footer-brand">よしかのひみつきち</p>
      <nav aria-label="フッターナビゲーション">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
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
