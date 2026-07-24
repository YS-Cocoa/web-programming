import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navItems } from '../data/navItems';
import logoImage from '../assets/logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link
        aria-label="ホームへ戻る"
        className="brand"
        onClick={() => setMenuOpen(false)}
        to="/"
      >
        <img src={logoImage} alt="" />
        <span>よしかのひみつきち</span>
      </Link>
      <button
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        aria-label="主要ナビゲーション"
        className={menuOpen ? 'is-open' : ''}
        id="primary-navigation"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            onClick={() => setMenuOpen(false)}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
