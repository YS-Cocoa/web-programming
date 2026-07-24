import { Link, NavLink } from 'react-router-dom';
import { navItems } from '../data/navItems';
import logoImage from '../assets/logo.png';

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

export default Header;
