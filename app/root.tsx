import { ArrowRight } from "lucide-react";
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

const EDUCATOR_SIGNUP_URL = "https://mailchi.mp/mail/join-playlab";
const PARTNERSHIP_REQUEST_URL =
  "https://u694o.share.hsforms.com/2WT-4aa2lTtW5aSd12wymYg";
const GETTING_STARTED_URL = "https://learn.playlab.ai/introduction";
const CAREERS_URL = "https://jobs.ashbyhq.com/Playlab";

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
      <MarketingNavbar />
      <main id="main">
        <Outlet />
      </main>
      <MarketingFooter />
    </IntlProvider>
  );
}

function MarketingNavbar() {
  const navLinks = [
    { id: "about", label: "About", href: "https://www.playlab.ai/about" },
    {
      id: "partners",
      label: "Partners",
      href: "https://www.playlab.ai/partnerships",
    },
    {
      id: "ai-lab-schools",
      label: "AI Lab Schools",
      href: "/ai-lab-schools",
    },
    {
      id: "blog",
      label: "Blog",
      href: "https://www.playlab.ai/blog",
      external: true,
    },
  ];

  return (
    <header className="bg-[#122134]">
      <div
        aria-hidden="true"
        className="h-1.5 w-full bg-gradient-to-r from-[#5b6cff] via-[#7e85ff] to-[#5b6cff]"
      />
      <div className="container mx-auto flex flex-wrap items-center gap-x-6 gap-y-3 px-6 py-5 lg:px-8">
        <a
          href="https://www.playlab.ai"
          className="flex-none rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#122134]"
          aria-label="Playlab home"
        >
          <img src={playlabLogo} alt="Playlab" className="h-7 w-auto" />
        </a>
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="rounded text-base font-semibold text-white transition-colors hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#122134]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.playlab.ai/logged-in"
            className="flex items-center gap-2 rounded text-base font-semibold text-white transition-colors hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#122134]"
          >
            Login
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </nav>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <a
            href={PARTNERSHIP_REQUEST_URL}
            className="rounded-full bg-[#ffd956] px-5 py-2 text-sm font-semibold text-[#122134] transition hover:bg-[#ffe480] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#122134] sm:text-base"
          >
            Sign Up Your Org or School
          </a>
          <a
            href={EDUCATOR_SIGNUP_URL}
            className="rounded-full border border-white/80 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#122134] sm:text-base"
          >
            Educator Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}

type FooterLink = {
  label: string;
  href: string;
  target?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

function MarketingFooter() {
  const columns: FooterColumn[] = [
    {
      title: "Product",
      links: [
        {
          label: "Changelog",
          href: "https://learn.playlab.ai/changelog/Product%20Changelog",
          target: "_blank",
        },
        {
          label: "Research Inquiries",
          href: "mailto:research@playlab.ai",
        },
      ],
    },
    {
      title: "Partnerships",
      links: [
        {
          label: "Playlab for Impact",
          href: "https://www.playlab.ai/partnerships",
        },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Learning Resources", href: GETTING_STARTED_URL, target: "_blank" },
        { label: "Community Apps", href: "https://www.playlab.ai/explore" },
        { label: "Join Online Learning", href: "https://luma.com/playlab", target: "_blank" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "About Us", href: "https://www.playlab.ai/about" },
        { label: "Careers", href: CAREERS_URL, target: "_blank" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/playlab-ai",
          target: "_blank",
        },
        { label: "Contact Us", href: "mailto:support@playlab.ai" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy & Terms", href: "https://www.playlab.ai/policies" },
        { label: "Help & Support", href: "mailto:support@playlab.ai" },
        { label: "Privacy Center", href: "https://privacy.playlab.ai", target: "_blank" },
      ],
    },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#122134] text-white">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-5">
          <a
            href="https://www.playlab.ai"
            className="flex-none rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#122134]"
            aria-label="Playlab home"
          >
            <img src={playlabLogo} alt="Playlab" className="h-8 w-auto" />
          </a>
          <p className="text-sm leading-relaxed text-[#E4EEEF]">
            Brought to you by Playlab Education Inc.,
            <br />a 501(c)3 nonprofit.
          </p>
          <p className="text-xs text-[#E4EEEF]">
            © {year} Playlab Education Inc.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-6 text-lg font-bold text-[#E4EEEF]">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.target}
                      rel={link.target === "_blank" ? "noreferrer" : undefined}
                      className="rounded text-sm text-white transition-colors hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#122134]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
