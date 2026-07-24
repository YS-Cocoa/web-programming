import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

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

export default NotFound;
