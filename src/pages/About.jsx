import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import profileImage from '../assets/profile.JPG';

function About() {
  return (
    <main>
      <section className="about page-section" aria-labelledby="about">
        <SectionTitle id="about" title="よしかについて" />
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

export default About;
