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

type JourneyMapProps = {
  litCount: number;
  highlightId?: string | null;
};

export function JourneyMap({ litCount, highlightId = null }: JourneyMapProps) {
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
          const isHighlight = p.id === highlightId;
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

      {projectedPartners.map((p, i) => {
        const isLit = i < litCount;
        const isHighlight = p.id === highlightId;
        const ringColor = p.pathway === "Launch" ? "#feffa0" : "#a4beeb";
        const radius = isHighlight ? 16 : 11;
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
            }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={radius + 2}
              fill="none"
              stroke={ringColor}
              strokeOpacity={isLit ? 1 : 0.4}
              strokeWidth={isHighlight ? 3 : 2}
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={radius}
              fill="#fbf9f6"
              stroke="#0c0f14"
              strokeOpacity={isLit ? 0.85 : 0.3}
              strokeWidth={0.6}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

export const cohortPartners = projectedPartners;
