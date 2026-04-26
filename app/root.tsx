import { IntlProvider } from "react-intl";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import playlabLogo from "~/images/logo.png";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Spline+Sans+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-brand-bg">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <IntlProvider
      locale="en"
      defaultLocale="en"
      messages={{}}
      onError={() => undefined}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-ink focus:px-4 focus:py-2 focus:font-medium focus:text-brand-bg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow"
      >
        Skip to main content
      </a>
      <TopBar />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </IntlProvider>
  );
}

function TopBar() {
  return (
    <header className="border-b border-brand-ink/15 bg-brand-bg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a
          href="https://playlab.ai"
          className="flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
          aria-label="Playlab home"
        >
          <img src={playlabLogo} alt="Playlab" className="h-9 w-auto sm:h-10" />
        </a>
        <a
          href="https://playlab.ai"
          className="rounded font-mono text-xs uppercase tracking-[0.2em] text-brand-ink/70 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
        >
          playlab.ai
        </a>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-brand-ink/15 bg-brand-bg py-10 text-center text-sm text-brand-ink/65">
      <div className="container mx-auto px-4">
        © Playlab Education
      </div>
    </footer>
  );
}
