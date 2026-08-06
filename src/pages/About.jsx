import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { profileCareer } from '../data/profile';
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
            <p>
              岡山県出身。現在は全寮制の神山まるごと高専で学びながら、
              科学、AI、文章、アート、地域文化などを横断して活動しています。
            </p>
            <div className="about-traits" aria-label="よしかを表す3つの特徴">
              <section>
                <h4>好奇心旺盛</h4>
                <p>5歳児のような好奇心のまま、気になったらまず手を動かします。</p>
              </section>
              <section>
                <h4>分野横断</h4>
                <p>科学と表現、地域と世界など、異なる分野を行き来して考えます。</p>
              </section>
              <section>
                <h4>想定の先までつくる</h4>
                <p>求められた水準を終点にせず、試行錯誤しながら可能性を広げます。</p>
              </section>
            </div>
            <Link className="text-link" to="/philosophy">よしかの哲学を知る</Link>
            <section className="career-section" aria-labelledby="career-title">
              <h3 id="career-title">経歴</h3>
              <ol className="career-list">
                {profileCareer.map((item) => (
                  <li key={`${item.period}-${item.title}`}>
                    <p className="career-period">{item.period}</p>
                    <div>
                      <h4>
                        {item.workId ? (
                          <Link
                            className="career-work-link"
                            to={`/journey?work=${item.workId}`}
                          >
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h4>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
