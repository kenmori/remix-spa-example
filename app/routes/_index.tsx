import type { MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export function HydrateFallback() {
  return <>Loading...</>;
}

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Remix SPA example top page [/]</h1>
      <Outlet />
    </div>
  );
}
