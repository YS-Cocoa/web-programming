import { Link } from 'react-router-dom';
import { navItems } from '../data/navItems';
import footerCloudImage from '../assets/cloud_footer.png';

function Footer() {
  return (
    <footer className="site-footer">
      <img className="footer-cloud" src={footerCloudImage} alt="" />
      <div className="footer-main">
        <Link className="footer-brand" to="/">よしかのひみつきち</Link>
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

export default Footer;
