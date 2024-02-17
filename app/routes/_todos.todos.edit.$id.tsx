import { useParams } from '@remix-run/react';
import { Link } from '@remix-run/react';

export default function Todo() {
  const params = useParams();
  return (
    <div>
      <hr />
      詳細ページ
      <div>{params.id}</div>
      <Link to="/todos">/todos page</Link>
    </div>
  );
}
