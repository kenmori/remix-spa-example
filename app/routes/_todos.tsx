import { Outlet } from '@remix-run/react';

export default function TodoLayout() {
  return (
    <div>
      <hr />
      詳細ページレイアウト
      <Outlet />
    </div>
  );
}
