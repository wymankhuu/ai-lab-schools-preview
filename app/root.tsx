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
        <Meta />
        <Links />
      </head>
      <body className="bg-[#e1e7d9]">
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#1a311d] focus:px-4 focus:py-2 focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ffd956]"
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
    <header className="bg-[#e1e7d9]">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a
          href="https://playlab.ai"
          className="flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a311d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e1e7d9]"
          aria-label="Playlab home"
        >
          <img src={playlabLogo} alt="Playlab" className="h-7 w-auto" />
        </a>
        <a
          href="https://playlab.ai"
          className="rounded text-sm font-medium text-[#122134] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a311d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e1e7d9]"
        >
          playlab.ai
        </a>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#e1e7d9] py-10 text-center text-sm text-[#122134]/80">
      <div className="container mx-auto px-4">
        © Playlab Education · AI Lab Schools preview
      </div>
    </footer>
  );
}
