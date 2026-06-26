import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'ホーム' },
  { to: '/profile', label: 'プロフィール' },
  { to: '/contact', label: 'お問い合わせ' },
];

const pageStyle = {
  minHeight: '100svh',
  padding: '104px 24px 40px',
  boxSizing: 'border-box',
  backgroundColor: '#f8fafc',
  color: '#111827',
  fontFamily: 'system-ui, sans-serif',
};

const contentStyle = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '56px 32px 64px',
  position: 'relative',
  backgroundColor: '#ffffff',
  textAlign: 'center',
};

const linkStyle = ({ isActive }) => ({
  padding: '10px 14px',
  borderRadius: '8px',
  color: '#ffffff',
  backgroundColor: isActive ? '#1d4ed8' : 'transparent',
  textDecoration: 'none',
  fontWeight: '700',
});

const Header = () => (
  <header
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: '#111827',
      boxShadow: '0 8px 24px rgba(2, 6, 23, 0.45)',
    }}
  >
    <nav
      style={{
        maxWidth: '960px',
        height: '64px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} style={linkStyle}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </header>
);

const Page = ({ title, children }) => (
  <main style={pageStyle}>
    <section style={contentStyle}>
      <h1
        style={{
          margin: '0 0 16px',
          color: '#111827',
          fontSize: '32px',
          fontWeight: '700',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          position: 'relative',
          zIndex: 1,
          margin: 0,
          color: '#111827',
          fontSize: '18px',
          fontWeight: '700',
          lineHeight: 1.5,
        }}
      >
        {children}
      </p>
    </section>
  </main>
);

const Home = () => <Page title="ホーム">トップページです。</Page>;

const Profile = () => <Page title="プロフィール">プロフィールページです。</Page>;

const Contact = () => <Page title="お問い合わせ">お問い合わせページです。</Page>;

const NotFound = () => (
  <Page title="404 Not Found">ページが見つかりません。</Page>
);

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
