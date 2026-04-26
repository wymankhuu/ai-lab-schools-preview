import { geoAlbersUsa, geoPath } from "d3-geo";
import { motion } from "framer-motion";
import { feature } from "topojson-client";
import { partners } from "../../data/partners";
import statesTopology from "../../data/us-states-10m.json";
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

const projectedPartners = partners
  .map((p) => {
    const coords = projection([p.lng, p.lat]);
    if (!coords) return null;
    const [ox, oy] = coords;
    return {
      ...p,
      x: ox + (p.offsetX ?? 0),
      y: oy + (p.offsetY ?? 0),
      originX: ox,
      originY: oy,
    };
  })
  .filter((p): p is NonNullable<typeof p> => p !== null);

type ProjectedPartner = (typeof projectedPartners)[number];

type JourneyMapProps = {
  litCount: number;
  highlightId?: string | null;
  hoveredId?: string | null;
  onHover?: (id: string | null) => void;
  onSelect?: (id: string) => void;
};

export function JourneyMap({
  litCount,
  highlightId = null,
  hoveredId = null,
  onHover,
  onSelect,
}: JourneyMapProps) {
  const tooltipPartner = hoveredId
    ? projectedPartners.find((p) => p.id === hoveredId)
    : null;

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full"
      role="img"
      aria-label="US map of cohort schools"
    >
      <g>
        {statesCollection.features.map((feat, idx) => {
          const d = pathGenerator(feat);
          if (!d) return null;
          return (
            <path
              key={feat.id ?? idx}
              d={d}
              fill="#eff0e5"
              stroke="#0c0f14"
              strokeOpacity="0.18"
              strokeWidth={0.5}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </g>

      <g>
        {projectedPartners.map((p, i) => {
          const isLit = i < litCount;
          if (p.originX === p.x && p.originY === p.y) return null;
          return (
            <line
              key={`leader-${p.id}`}
              x1={p.originX}
              y1={p.originY}
              x2={p.x}
              y2={p.y}
              stroke="#0c0f14"
              strokeWidth={1}
              strokeLinecap="round"
              opacity={isLit ? 0.4 : 0.05}
            />
          );
        })}
      </g>

      <defs>
        {projectedPartners.map((p) => (
          <clipPath
            id={`journey-logo-clip-${p.id}`}
            key={`clip-${p.id}`}
          >
            <circle cx={p.x} cy={p.y} r={11} />
          </clipPath>
        ))}
      </defs>

      {projectedPartners.map((p, i) => {
        const isLit = i < litCount;
        const isHighlight = p.id === highlightId;
        const ringColor = p.pathway === "Launch" ? "#feffa0" : "#a4beeb";
        const radius = isHighlight ? 16 : 13;
        const logoSize = 24 * (p.logoScale ?? 1);
        const interactive = Boolean(onHover || onSelect);
        const handleEnter = () => onHover?.(p.id);
        const handleLeave = () => onHover?.(null);
        const handleSelect = () => onSelect?.(p.id);
        return (
          <motion.g
            key={p.id}
            initial={false}
            animate={{
              opacity: isLit ? 1 : 0.18,
              scale: isHighlight ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            style={{
              transformOrigin: `${p.x}px ${p.y}px`,
              transformBox: "fill-box",
              cursor: interactive ? "pointer" : undefined,
              outline: "none",
            }}
            {...(interactive
              ? {
                  onMouseEnter: handleEnter,
                  onMouseLeave: handleLeave,
                  onFocus: handleEnter,
                  onBlur: handleLeave,
                  onClick: handleSelect,
                  onKeyDown: (e: React.KeyboardEvent<SVGGElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect();
                    }
                  },
                  tabIndex: 0,
                  role: "button",
                  "aria-label": `${p.school}, ${p.city}, ${p.state}, ${p.pathway} pathway. Jump to card.`,
                }
              : {})}
          >
            {/* invisible larger hit target for comfortable hover/touch */}
            {interactive && (
              <circle
                cx={p.x}
                cy={p.y}
                r={radius + 8}
                fill="transparent"
                pointerEvents="all"
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={radius + 2}
              fill="none"
              stroke={ringColor}
              strokeOpacity={isLit ? 1 : 0.4}
              strokeWidth={isHighlight ? 3 : 2.25}
              pointerEvents="none"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={radius}
              fill="#fbf9f6"
              stroke="#0c0f14"
              strokeOpacity={isLit ? 0.85 : 0.3}
              strokeWidth={0.6}
              pointerEvents="none"
            />
            <image
              href={p.logo}
              x={p.x - logoSize / 2}
              y={p.y - logoSize / 2}
              width={logoSize}
              height={logoSize}
              preserveAspectRatio="xMidYMid meet"
              clipPath={`url(#journey-logo-clip-${p.id})`}
              opacity={isLit ? 1 : 0.5}
              pointerEvents="none"
            />
          </motion.g>
        );
      })}

      {tooltipPartner && <MarkerTooltip partner={tooltipPartner} />}
    </svg>
  );
}

function MarkerTooltip({ partner }: { partner: ProjectedPartner }) {
  const name =
    partner.school.length > 36
      ? `${partner.school.slice(0, 36)}…`
      : partner.school;
  const subtitle = `${partner.city}, ${partner.state} · ${partner.pathway}`;

  const line1Width = name.length * 6.9 + 28;
  const line2Width = subtitle.length * 6.0 + 28;
  const width = Math.ceil(Math.max(180, line1Width, line2Width));
  const height = 50;
  const gapAbovePin = 16;

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
        fill="#0c0f14"
        opacity="0.94"
      />
      <text
        x={width / 2}
        y="20"
        textAnchor="middle"
        fill="#fbf9f6"
        fontSize="12"
        fontWeight="600"
      >
        {name}
      </text>
      <text
        x={width / 2}
        y="38"
        textAnchor="middle"
        fill="#fbf9f6"
        fillOpacity="0.7"
        fontSize="10.5"
      >
        {subtitle}
      </text>
      <path
        d={`M${arrowCenter - 7},${height} L${arrowCenter},${height + 7} L${arrowCenter + 7},${height} Z`}
        fill="#0c0f14"
        opacity="0.94"
      />
    </g>
  );
}

export const cohortPartners = projectedPartners;
