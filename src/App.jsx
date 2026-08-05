import { useEffect, useRef } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Journey from './pages/Journey';
import Philosophy from './pages/Philosophy';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const shellRef = useRef(null);

  useEffect(() => {
    // AI使用: Codexと相談してマウス追従演出を実装し、速度や変形量は動作確認しながら調整した。
    const shell = shellRef.current;
    if (!shell) return undefined;

    const canFollowPointer = window.matchMedia('(pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canFollowPointer) return undefined;

    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const current = { ...target };
    const previous = { ...target };
    let frameId = 0;

    const updateTarget = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const animate = () => {
      previous.x = current.x;
      previous.y = current.y;
      current.x += (target.x - current.x) * 0.015;
      current.y += (target.y - current.y) * 0.015;

      const velocityX = current.x - previous.x;
      const velocityY = current.y - previous.y;
      const speed = Math.min(Math.hypot(velocityX, velocityY), 42);
      const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
      const stretch = 1 + speed * 0.02;
      const squash = Math.max(0.82, 1 - speed * 0.01);

      shell.style.setProperty('--mouse-x', `${current.x}px`);
      shell.style.setProperty('--mouse-y', `${current.y}px`);
      shell.style.setProperty('--blob-angle', `${angle}deg`);
      shell.style.setProperty('--blob-stretch', stretch.toFixed(3));
      shell.style.setProperty('--blob-squash', squash.toFixed(3));
      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', updateTarget);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', updateTarget);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="portfolio-shell" ref={shellRef}>
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
    </HashRouter>
  );
}

export default App;
