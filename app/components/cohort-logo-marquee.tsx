import { FormattedMessage } from "react-intl";
import { partners } from "../data/partners";

export function CohortLogoMarquee() {
  const items = [...partners, ...partners];
  return (
    <>
      <style>{`
        @keyframes cohort-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .cohort-marquee-track {
          animation: cohort-marquee 50s linear infinite;
        }
        .cohort-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .cohort-marquee-track { animation: none; }
        }
      `}</style>
      <div className="bg-[#e1e7d9] pb-8 pt-2 sm:pb-12">
        <div className="container mx-auto px-4">
          <div
            className="overflow-hidden rounded-3xl bg-[#fdfffc] py-10"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
            }}
          >
            <p className="mb-6 text-center text-xs font-black uppercase tracking-[0.2em] text-[#1a311d]/60 sm:text-sm">
              <FormattedMessage
                defaultMessage="The schools of Cohort 1"
                description="Label above the horizontal scrolling logo marquee"
              />
            </p>
            <div className="relative flex overflow-hidden">
              <ul
                className="cohort-marquee-track flex shrink-0 items-center gap-14 px-7"
                aria-label="Cohort school logos"
              >
                {items.map((p, idx) => (
                  <li
                    key={`${p.id}-${idx}`}
                    className="flex shrink-0 items-center justify-center"
                    aria-hidden={idx >= partners.length ? true : undefined}
                  >
                    <img
                      src={p.logo}
                      alt={idx < partners.length ? p.school : ""}
                      title={p.school}
                      className="h-12 w-auto max-w-[140px] object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
                      loading="lazy"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
