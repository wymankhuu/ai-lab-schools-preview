import playlabLogo from "~/images/logo.png";

export function Hero() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* White Card - AI LAB SCHOOLS (3/5 width on desktop) */}
          <div className="relative flex max-h-[362px] min-h-[280px] flex-col justify-between rounded-3xl bg-[#fdfffc] px-10 py-8 @container md:min-h-[360px] lg:col-span-3 lg:min-h-[362px]">
            <div className="flex-1">
              <h1 className="font-heading text-[clamp(3.5rem,20cqw,8rem)] font-bold leading-[1] text-[#1a311d]">
                AI LAB <br />
                SCHOOLS
              </h1>
            </div>
            <div className="flex items-center gap-3 pb-2 pt-7">
              <p className="font-heading text-base font-bold leading-[25px] text-[#122134]">
                Powered by
              </p>
              <img
                src={playlabLogo}
                alt="Playlab"
                className="h-[31px] w-auto"
              />
            </div>
          </div>

          {/* Yellow Card - Build the Future (2/5 width on desktop) */}
          <div className="relative max-h-[362px] overflow-hidden rounded-3xl bg-[#ffd956] p-8 @container sm:p-12 lg:col-span-2">
            <YellowShapes />
            <p className="relative font-heading text-[clamp(2rem,20cqw,56px)] font-bold leading-[1] text-[#1a311d] md:text-[clamp(2rem,20cqw,72px)]">
              Build the Future of Learning
            </p>
          </div>

          {/* Green Card - Meet the Cohort (2/5 width on desktop) */}
          <div className="relative min-h-[287px] overflow-hidden rounded-3xl bg-[#00cc72] p-8 sm:p-12 lg:col-span-2">
            <GreenShapes />
            <p className="relative font-heading text-3xl font-medium leading-snug text-[#122134] sm:text-4xl">
              Meet the Inaugural Cohort
            </p>
          </div>

          {/* Light Blue Card - Cohort Announcement (3/5 width on desktop) */}
          <div className="min-h-[287px] rounded-3xl bg-[#61dcff] p-8 sm:p-12 lg:col-span-3">
            <div className="flex flex-col gap-6">
              <p className="text-xl leading-relaxed text-[#122134] sm:text-2xl">
                A community of founders, educators, and district leaders
                building new models of learning together.
                <br />
                <br />
                Meet the teams leading the inaugural cohort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function YellowShapes() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 200 140"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
    >
      {/* Big half-circle emerging from the bottom-right */}
      <path d="M 230 140 A 90 90 0 0 0 50 140" fill="#1a311d" opacity="0.14" />
      {/* Solid filled circle sitting above the half-circle horizon */}
      <circle cx="168" cy="64" r="22" fill="#1a311d" opacity="0.22" />
      {/* Rotated solid square at the bottom-left */}
      <rect
        x="-6"
        y="96"
        width="44"
        height="44"
        fill="#1a311d"
        opacity="0.2"
        transform="rotate(22 16 118)"
      />
    </svg>
  );
}

function GreenShapes() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 200 140"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
    >
      {/* Overlapping circles evoking a community coming together */}
      <circle cx="170" cy="40" r="34" fill="#1a311d" opacity="0.14" />
      <circle cx="190" cy="95" r="42" fill="#1a311d" opacity="0.12" />
      <circle cx="140" cy="105" r="24" fill="#1a311d" opacity="0.16" />
      {/* small outlined ring anchoring bottom-left */}
      <circle
        cx="22"
        cy="120"
        r="16"
        fill="none"
        stroke="#1a311d"
        strokeWidth="2"
        opacity="0.35"
      />
      <circle cx="22" cy="120" r="4" fill="#1a311d" opacity="0.35" />
    </svg>
  );
}
