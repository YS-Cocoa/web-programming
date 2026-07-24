import SectionTitle from '../components/SectionTitle';

function Contact() {
  return (
    <main>
      <section className="contact page-section" aria-labelledby="contact">
        <SectionTitle id="contact" title="つながる" lead="必須事項（*）はご入力ください。" />
        <form action="https://formspree.io/f/xnjkowpj" className="contact-form" method="POST">
          <input type="hidden" name="_subject" value="ポートフォリオサイトからのお問い合わせ" />
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

export default Contact;
