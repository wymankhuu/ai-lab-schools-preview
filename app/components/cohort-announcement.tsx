import { geoAlbersUsa, geoPath } from "d3-geo";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { feature } from "topojson-client";
import { partners } from "../data/partners";
import statesTopology from "../data/us-states-10m.json";
import type { Partner } from "../data/partners";
import type { Topology } from "topojson-specification";

const MAP_WIDTH = 960;
const MAP_HEIGHT = 550;

const projection = geoAlbersUsa()
  .scale(1150)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
const pathGenerator = geoPath(projection);

const topology = statesTopology as unknown as Topology;
const statesCollection = feature(
  topology,
  topology.objects.states,
) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, { name: string }>;

const pathwayColors = {
  Launch: "#ffd956",
  Pivot: "#61dcff",
} as const;

const PARTNER_STATE_NAMES = new Set(
  partners.map(
    (p) =>
      ({
        AZ: "Arizona",
        CA: "California",
        DC: "District of Columbia",
        FL: "Florida",
        GA: "Georgia",
        MD: "Maryland",
        ME: "Maine",
        NJ: "New Jersey",
        NY: "New York",
        TN: "Tennessee",
        TX: "Texas",
        VA: "Virginia",
      })[p.state] ?? p.state,
  ),
);

type ProjectedPartner = Partner & {
  originX: number;
  originY: number;
  x: number;
  y: number;
};

const projectedPartners: ProjectedPartner[] = partners
  .map((p) => {
    const coords = projection([p.lng, p.lat]);
    if (!coords) return null;
    const [ox, oy] = coords;
    return {
      ...p,
      originX: ox,
      originY: oy,
      x: ox + (p.offsetX ?? 0),
      y: oy + (p.offsetY ?? 0),
    };
  })
  .filter((p): p is ProjectedPartner => p !== null);

function partnerCardId(id: string) {
  return `partner-card-${id}`;
}

function scrollToPartner(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(partnerCardId(id));
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("ring-2", "ring-[#00cc72]", "ring-offset-2");
  setTimeout(() => {
    el.classList.remove("ring-2", "ring-[#00cc72]", "ring-offset-2");
  }, 1600);
}

export function CohortAnnouncement() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const launchCount = partners.filter((p) => p.pathway === "Launch").length;
  const pivotCount = partners.filter((p) => p.pathway === "Pivot").length;

  const hovered = projectedPartners.find((p) => p.id === hoveredId) ?? null;

  return (
    <div className="bg-[#e1e7d9] py-6 sm:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-[#fdfffc] px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <div className="flex flex-col gap-4 text-center">
            <HeaderGraphic />
            <p className="text-base font-black uppercase tracking-wider text-[#0f6d37]">
              <FormattedMessage
                defaultMessage="The Inaugural Cohort"
                description="Eyebrow label above the cohort announcement heading"
              />
            </p>
            <h2 className="font-heading text-4xl font-bold text-[#122134] sm:text-5xl lg:text-6xl">
              <FormattedMessage
                defaultMessage="Meet the schools reimagining school in the age of AI"
                description="Heading announcing the first class of AI Lab Schools partners"
              />
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#122134] sm:text-2xl">
              <FormattedMessage
                defaultMessage="A community of founders, educators, and district leaders partnering with Playlab to design, launch, and share new models of learning."
                description="Subheading framing the AI Lab Schools cohort as a community of school leaders"
              />
            </p>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-2xl bg-[#f5f8f0] p-4 sm:p-6">
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              preserveAspectRatio="xMidYMid meet"
              className="block h-auto w-full"
              role="img"
              aria-label="Map of the United States showing the 13 AI Lab Schools partner locations"
            >
              <g>
                {statesCollection.features.map((feat, idx) => {
                  const name = feat.properties?.name ?? "";
                  const isPartnerState = PARTNER_STATE_NAMES.has(name);
                  const d = pathGenerator(feat);
                  if (!d) return null;
                  return (
                    <path
                      key={feat.id ?? idx}
                      d={d}
                      fill={isPartnerState ? "#d4ddc5" : "#eef1e8"}
                      stroke="#1a311d"
                      strokeWidth={0.5}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </g>

              <g>
                {projectedPartners.map((p) => {
                  if (p.originX === p.x && p.originY === p.y) return null;
                  return (
                    <g key={`leader-${p.id}`} pointerEvents="none">
                      <line
                        x1={p.originX}
                        y1={p.originY}
                        x2={p.x}
                        y2={p.y}
                        stroke="#1a311d"
                        strokeWidth="1"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      <circle
                        cx={p.originX}
                        cy={p.originY}
                        r="2.5"
                        fill="#1a311d"
                      />
                    </g>
                  );
                })}
              </g>

              {projectedPartners.map((p) => (
                <PartnerPin
                  key={p.id}
                  partner={p}
                  isHovered={hoveredId === p.id}
                  onEnter={() => setHoveredId(p.id)}
                  onLeave={() =>
                    setHoveredId((curr) => (curr === p.id ? null : curr))
                  }
                  onSelect={() => scrollToPartner(p.id)}
                />
              ))}

              {hovered && <MarkerTooltip partner={hovered} />}
            </svg>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 rounded-full border-2 border-[#1a311d] bg-[#ffd956]" />
                <span className="text-base font-medium text-[#122134]">
                  <FormattedMessage
                    defaultMessage="Launch · {count} schools"
                    values={{ count: launchCount }}
                    description="Map legend entry for Launch pathway schools"
                  />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 rounded-full border-2 border-[#1a311d] bg-[#61dcff]" />
                <span className="text-base font-medium text-[#122134]">
                  <FormattedMessage
                    defaultMessage="Pivot · {count} schools"
                    values={{ count: pivotCount }}
                    description="Map legend entry for Pivot pathway schools"
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderGraphic() {
  return (
    <svg
      viewBox="0 0 600 90"
      className="mx-auto h-auto w-full max-w-[320px] opacity-90 sm:max-w-[380px]"
      aria-hidden="true"
    >
      <path
        d="M0 78 Q120 58 250 70 T420 60 T600 55"
        fill="none"
        stroke="#1a311d"
        strokeWidth="1.25"
        opacity="0.25"
      />
      <path
        d="M0 66 Q130 44 260 58 T430 48 T600 42"
        fill="none"
        stroke="#1a311d"
        strokeWidth="1.25"
        opacity="0.35"
      />
      <path
        d="M0 52 Q140 32 270 46 T440 34 T600 30"
        fill="none"
        stroke="#1a311d"
        strokeWidth="1.25"
        opacity="0.45"
      />
      <path
        d="M0 38 Q150 20 280 32 T450 22 T600 18"
        fill="none"
        stroke="#1a311d"
        strokeWidth="1.25"
        opacity="0.55"
      />
      <circle
        cx="105"
        cy="70"
        r="6"
        fill="#ffd956"
        stroke="#1a311d"
        strokeWidth="1.5"
      />
      <circle
        cx="225"
        cy="58"
        r="6"
        fill="#61dcff"
        stroke="#1a311d"
        strokeWidth="1.5"
      />
      <circle
        cx="340"
        cy="50"
        r="6"
        fill="#ffd956"
        stroke="#1a311d"
        strokeWidth="1.5"
      />
      <circle
        cx="465"
        cy="36"
        r="6"
        fill="#61dcff"
        stroke="#1a311d"
        strokeWidth="1.5"
      />
      <circle
        cx="555"
        cy="26"
        r="6"
        fill="#ffd956"
        stroke="#1a311d"
        strokeWidth="1.5"
      />
    </svg>
  );
}

type PartnerPinProps = {
  partner: ProjectedPartner;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onSelect: () => void;
};

function PartnerPin({
  partner,
  isHovered,
  onEnter,
  onLeave,
  onSelect,
}: PartnerPinProps) {
  const ringColor = pathwayColors[partner.pathway];
  const BASE_LOGO_SIZE = 28;
  const LOGO_CLIP_RADIUS = 13;
  const logoSize = BASE_LOGO_SIZE * (partner.logoScale ?? 1);
  const ringRadius = isHovered ? 23 : 18;
  const clipId = `logo-clip-${partner.id}`;

  return (
    <g
      transform={`translate(${partner.x}, ${partner.y})`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${partner.school}, ${partner.city}, ${partner.state}. Jump to card.`}
      style={{ cursor: "pointer" }}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="0" cy="0" r={LOGO_CLIP_RADIUS} />
        </clipPath>
      </defs>
      <circle
        cx="0"
        cy="0"
        r={ringRadius}
        fill="#fdfffc"
        stroke={ringColor}
        strokeWidth="3"
        style={{ transition: "r 150ms ease-out" }}
      />
      <image
        href={partner.logo}
        x={-logoSize / 2}
        y={-logoSize / 2}
        width={logoSize}
        height={logoSize}
        preserveAspectRatio="xMidYMid meet"
        clipPath={`url(#${clipId})`}
      />
      <circle
        cx="0"
        cy="0"
        r={ringRadius}
        fill="none"
        stroke="#1a311d"
        strokeWidth="0.75"
        pointerEvents="none"
        style={{ transition: "r 150ms ease-out" }}
      />
    </g>
  );
}

function MarkerTooltip({ partner }: { partner: ProjectedPartner }) {
  const name =
    partner.school.length > 32
      ? `${partner.school.slice(0, 32)}…`
      : partner.school;
  const subtitle = `${partner.city}, ${partner.state} · ${partner.pathway}`;

  // Estimated text widths for the two lines (empirical, per character).
  const line1Width = name.length * 6.9 + 28;
  const line2Width = subtitle.length * 6.0 + 28;
  const width = Math.ceil(Math.max(180, line1Width, line2Width));
  const height = 52;
  const gapAbovePin = 14;

  let x = partner.x - width / 2;
  x = Math.max(8, Math.min(MAP_WIDTH - width - 8, x));
  const y = partner.y - 22 - gapAbovePin - height;
  const arrowCenter = partner.x - x;

  return (
    <g pointerEvents="none" transform={`translate(${x}, ${y})`}>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="10"
        fill="#1a311d"
        opacity="0.96"
      />
      <text
        x={width / 2}
        y="22"
        textAnchor="middle"
        fill="#fdfffc"
        fontSize="12"
        fontWeight="700"
      >
        {name}
      </text>
      <text
        x={width / 2}
        y="40"
        textAnchor="middle"
        fill="#d4ddc5"
        fontSize="10.5"
      >
        {subtitle}
      </text>
      <path
        d={`M${arrowCenter - 7},${height} L${arrowCenter},${height + 7} L${arrowCenter + 7},${height} Z`}
        fill="#1a311d"
        opacity="0.96"
      />
    </g>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const isLaunch = partner.pathway === "Launch";
  const ringColor = isLaunch ? "#ffd956" : "#61dcff";
  return (
    <div
      id={partnerCardId(partner.id)}
      className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-[#1a311d]/10 bg-white p-6 shadow-[0_1px_3px_rgba(26,49,29,0.04)] transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-[#fdfffc]"
          style={{ borderColor: ringColor }}
        >
          <img src={partner.logo} alt="" className="h-12 w-12 object-contain" />
        </div>
        <span
          className="mt-1 shrink-0 rounded-full border border-[#1a311d] px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#1a311d]"
          style={{ backgroundColor: ringColor }}
        >
          {partner.pathway}
        </span>
      </div>

      <h3 className="mt-5 font-heading text-lg font-bold leading-tight text-[#1a311d]">
        {partner.school}
      </h3>

      <div className="mt-2 flex flex-col gap-0.5 text-sm text-[#122134]">
        <span className="font-semibold">{partner.leader}</span>
        <span className="text-[#122134]/85">
          {partner.city}, {partner.state}
        </span>
      </div>

      <p className="mt-4 flex-1 text-base leading-relaxed text-[#122134]/90">
        {partner.descriptor}
      </p>
    </div>
  );
}
