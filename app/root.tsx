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
    <header className="sticky top-0 z-[60] border-b border-brand-ink/15 bg-brand-bg/90 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <a
          href="https://playlab.ai"
          className="flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
          aria-label="Playlab home"
        >
          <img src={playlabLogo} alt="Playlab" className="h-9 w-auto sm:h-10" />
        </a>
        <a
          href="mailto:support@playlab.ai"
          className="inline-flex items-center justify-center rounded-full border-2 border-brand-ink bg-brand-bg px-4 py-1.5 font-display text-sm text-brand-ink transition-colors hover:bg-brand-ink hover:text-brand-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg sm:px-5 sm:py-2"
        >
          Get in touch
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
