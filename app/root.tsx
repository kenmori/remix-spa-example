// import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import appStylesHref from './app.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
// ];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <div>here is navi</div>
          <Link to="/todos">todos</Link>
        </nav>
        <hr />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
