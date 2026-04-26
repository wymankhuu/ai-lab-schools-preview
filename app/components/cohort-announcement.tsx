import { geoAlbersUsa, geoPath } from "d3-geo";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
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

/* ------------ Brand-collage decoration primitives ------------ */

function CollageGrid({
  className,
  color = "#a4beeb",
  cellSize = 14,
}: {
  className?: string;
  color?: string;
  cellSize?: number;
}) {
  const id = `cohort-grid-${cellSize}-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 200 200"
    >
      <defs>
        <pattern
          id={id}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            strokeOpacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  );
}

function CollageStarburst({
  className,
  color = "#d4fd63",
  spikes = 12,
}: {
  className?: string;
  color?: string;
  spikes?: number;
}) {
  const cx = 50;
  const cy = 50;
  const outerR = 48;
  const innerR = 18;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const theta = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${cx + Math.cos(theta) * r} ${cy + Math.sin(theta) * r}`);
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      fill={color}
    >
      <polygon points={pts.join(" ")} />
    </svg>
  );
}

function CollagePebble({
  className,
  color = "#0f6d37",
  variant = 0,
}: {
  className?: string;
  color?: string;
  variant?: 0 | 1 | 2;
}) {
  const paths = [
    "M 32 14 C 64 6, 96 22, 92 50 C 88 78, 56 88, 26 78 C 4 70, 6 36, 32 14 Z",
    "M 18 28 C 36 8, 78 12, 92 36 C 102 56, 80 80, 50 86 C 22 92, 8 56, 18 28 Z",
    "M 10 44 C 14 18, 50 8, 80 18 C 100 26, 100 60, 86 76 C 70 94, 30 92, 14 76 C 4 64, 6 56, 10 44 Z",
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      fill={color}
    >
      <path d={paths[variant]} />
    </svg>
  );
}

function CollageCloudBlob({
  className,
  color = "#356fe5",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 120"
      className={className}
      fill={color}
    >
      <path d="M 40 8 C 60 6, 70 22, 60 32 C 76 38, 76 56, 60 60 C 76 70, 70 86, 56 86 C 70 96, 58 112, 40 110 C 22 112, 12 96, 24 88 C 8 84, 12 68, 28 64 C 8 60, 8 40, 24 36 C 14 26, 22 8, 40 8 Z" />
    </svg>
  );
}

function CollageArchRow({
  className,
  color = "#feffa0",
  count = 8,
}: {
  className?: string;
  color?: string;
  count?: number;
}) {
  const archW = 40;
  const totalW = count * archW;
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${totalW} 30`}
      preserveAspectRatio="none"
      className={className}
      fill={color}
    >
      {Array.from({ length: count }, (_, i) => (
        <ellipse
          key={i}
          cx={i * archW + archW / 2}
          cy={26}
          rx={archW / 2 - 2}
          ry={20}
        />
      ))}
    </svg>
  );
}

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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const launchCount = partners.filter((p) => p.pathway === "Launch").length;
  const pivotCount = partners.filter((p) => p.pathway === "Pivot").length;

  const hovered = projectedPartners.find((p) => p.id === hoveredId) ?? null;
  const selected = partners.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-[#fdfffc] px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          {/* Brand-collage decoration layers */}
          <CollageGrid
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            color="#efd8ef"
            cellSize={18}
          />
          <CollageStarburst
            className="pointer-events-none absolute -left-16 top-8 hidden h-52 w-52 sm:block"
            color="#d4fd63"
            spikes={14}
          />
          <CollageCloudBlob
            className="pointer-events-none absolute -right-6 -top-4 hidden h-44 w-32 sm:block"
            color="#356fe5"
          />
          <CollagePebble
            className="pointer-events-none absolute left-12 top-40 hidden h-24 w-24 opacity-90 lg:block"
            color="#0f6d37"
            variant={1}
          />
          <CollagePebble
            className="pointer-events-none absolute right-20 top-52 hidden h-20 w-20 opacity-90 lg:block"
            color="#0f6d37"
            variant={2}
          />

          <div className="relative flex flex-col gap-4 text-center">
            <HeaderGraphic />
            <p className="text-base font-black uppercase tracking-wider text-[#00cc72]">
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

          <div className="relative mt-10 overflow-hidden rounded-2xl bg-[#f5f8f0] p-4 sm:p-6">
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

          <div className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {partners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                onSelect={() => setSelectedId(partner.id)}
              />
            ))}
          </div>

          <div className="relative mt-12">
            <CollageArchRow
              className="block h-8 w-full"
              color="#feffa0"
              count={14}
            />
          </div>
        </div>
      </div>
      {selected && (
        <PartnerModal
          partner={selected}
          onClose={() => setSelectedId(null)}
        />
      )}
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

// Picks a stable accent palette for each partner card based on its id,
// so each card carries a slightly different brand-collage flavor.
function paletteFor(id: string) {
  const palettes = [
    {
      tint: "#efd8ef", // soft pink wash
      accent: "#0f6d37", // green pebble
      starburst: "#d4fd63", // lime starburst
    },
    {
      tint: "#fff46c", // soft yellow wash
      accent: "#356fe5", // blue pebble
      starburst: "#feffa0", // pale yellow starburst
    },
    {
      tint: "#a4beeb", // soft blue wash
      accent: "#ed6e2d", // orange pebble
      starburst: "#feffa0", // yellow starburst
    },
    {
      tint: "#d4fd63", // lime wash
      accent: "#ce463f", // red pebble
      starburst: "#a4beeb", // blue starburst
    },
  ];
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return palettes[h % palettes.length];
}

function PartnerCard({
  partner,
  onSelect,
}: {
  partner: Partner;
  onSelect: () => void;
}) {
  const isLaunch = partner.pathway === "Launch";
  const ringColor = isLaunch ? "#ffd956" : "#61dcff";
  const hasLongDescription = Boolean(partner.description);
  const palette = paletteFor(partner.id);
  const interactiveClasses = hasLongDescription
    ? "cursor-pointer hover:-translate-y-0.5 hover:border-[#1a311d]/20 hover:shadow-[0_8px_24px_rgba(26,49,29,0.08)] focus-visible:ring-2 focus-visible:ring-[#00cc72] focus-visible:ring-offset-2"
    : "cursor-default";
  return (
    <button
      type="button"
      id={partnerCardId(partner.id)}
      onClick={hasLongDescription ? onSelect : undefined}
      disabled={!hasLongDescription}
      aria-label={
        hasLongDescription ? `Read more about ${partner.school}` : undefined
      }
      className={`group relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-[#1a311d]/10 bg-white p-6 text-left shadow-[0_1px_3px_rgba(26,49,29,0.04)] transition-all duration-200 focus:outline-none ${interactiveClasses}`}
    >
      {/* tinted grid wash sliver in the upper-right of every card */}
      <CollageGrid
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/5 opacity-50"
        color={palette.tint}
        cellSize={14}
      />
      {/* small starburst peeking from the top-right */}
      <CollageStarburst
        className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 opacity-90"
        color={palette.starburst}
        spikes={11}
      />
      {/* accent pebble in the bottom-right corner */}
      <CollagePebble
        className="pointer-events-none absolute -bottom-3 -right-3 h-14 w-14 opacity-80"
        color={palette.accent}
        variant={(partner.id.length % 3) as 0 | 1 | 2}
      />

      <div className="relative flex items-start justify-between gap-4">
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

      <h3 className="relative mt-5 font-heading text-lg font-bold leading-tight text-[#1a311d]">
        {partner.school}
      </h3>

      <div className="relative mt-2 text-sm text-[#122134]/85">
        {partner.city}, {partner.state}
      </div>

      <p className="relative mt-4 flex-1 text-base leading-relaxed text-[#122134]/90">
        {partner.descriptor}
      </p>

      {hasLongDescription && (
        <span className="relative mt-4 text-sm font-medium text-[#122134]/60">
          Read more
        </span>
      )}
    </button>
  );
}

function PartnerModal({
  partner,
  onClose,
}: {
  partner: Partner;
  onClose: () => void;
}) {
  const isLaunch = partner.pathway === "Launch";
  const ringColor = isLaunch ? "#ffd956" : "#61dcff";
  const body = partner.description ?? partner.descriptor;
  const paragraphs = body.split("\n\n");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`partner-modal-title-${partner.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-6"
    >
      <button
        type="button"
        aria-label="Close partner details"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-[#1a311d]/60 backdrop-blur-sm"
      />
      <div className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#fdfffc] p-6 shadow-2xl sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1a311d] transition-colors hover:bg-[#1a311d]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00cc72]"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div className="flex items-start gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-[#fdfffc]"
            style={{ borderColor: ringColor }}
          >
            <img
              src={partner.logo}
              alt=""
              className="h-12 w-12 object-contain"
            />
          </div>
          <div className="min-w-0 flex-1 pr-8">
            <h3
              id={`partner-modal-title-${partner.id}`}
              className="font-heading text-2xl font-bold leading-tight text-[#1a311d] sm:text-3xl"
            >
              {partner.school}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#122134]/85">
              <span>
                {partner.city}, {partner.state}
              </span>
              <span aria-hidden="true">·</span>
              <span
                className="rounded-full border border-[#1a311d] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#1a311d]"
                style={{ backgroundColor: ringColor }}
              >
                {partner.pathway}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-[#122134]/90">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
