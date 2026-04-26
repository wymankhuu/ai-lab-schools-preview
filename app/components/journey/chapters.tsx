import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChapterFrame, chapterId } from "./ChapterFrame";
import { JourneyMap, cohortPartners } from "./JourneyMap";

/* ============== Shared abstract shapes ============== */

function ScribbleArc({
  className,
  color = "#0c0f14",
  d = "M 0 60 Q 60 0 140 30 T 280 20",
  width = 280,
  height = 80,
}: {
  className?: string;
  color?: string;
  d?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
    >
      <path
        d={d}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

function DotGrid({
  className,
  color = "#0c0f14",
  cols = 8,
  rows = 6,
  gap = 18,
  dot = 1.6,
}: {
  className?: string;
  color?: string;
  cols?: number;
  rows?: number;
  gap?: number;
  dot?: number;
}) {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: c * gap + dot, y: r * gap + dot });
    }
  }
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${cols * gap} ${rows * gap}`}
      className={className}
      fill={color}
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={dot} opacity={0.35} />
      ))}
    </svg>
  );
}

function CutOut({
  className,
  color = "#feffa0",
  rotate = -3,
}: {
  className?: string;
  color?: string;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}

// Square grid wash, like the pink/lavender background in the workshop card
function CollageGrid({
  className,
  color = "#efd8ef",
  cellSize = 14,
  opacity = 0.5,
}: {
  className?: string;
  color?: string;
  cellSize?: number;
  opacity?: number;
}) {
  const id = `journey-grid-${cellSize}-${color.replace(/[^a-z0-9]/gi, "")}`;
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
            strokeOpacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  );
}

// Organic green pebble blob, three variants
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

// Horizontal row of scalloped arches
function CollageArchRow({
  className,
  color = "#feffa0",
  count = 14,
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

// Tight sawtooth/zigzag perimeter — drawn around the brand hero card
function buildZigzagPerimeter(
  w: number,
  h: number,
  pad: number,
  seg: number,
  amp: number,
) {
  const pts: [number, number][] = [];
  let toggle = 0;
  // top edge (left → right)
  for (let x = pad; x <= w - pad; x += seg) {
    pts.push([x, pad + (toggle++ % 2 === 0 ? -amp : amp)]);
  }
  // right edge (top → bottom)
  for (let y = pad + seg; y <= h - pad; y += seg) {
    pts.push([w - pad - (toggle++ % 2 === 0 ? -amp : amp), y]);
  }
  // bottom edge (right → left)
  for (let x = w - pad - seg; x >= pad; x -= seg) {
    pts.push([x, h - pad - (toggle++ % 2 === 0 ? -amp : amp)]);
  }
  // left edge (bottom → top)
  for (let y = h - pad - seg; y >= pad + seg; y -= seg) {
    pts.push([pad + (toggle++ % 2 === 0 ? -amp : amp), y]);
  }
  return `M ${pts.map((p) => p.join(" ")).join(" L ")} Z`;
}

const ZIGZAG_PATH_D = buildZigzagPerimeter(400, 240, 14, 6, 4);

function WavyFrame({
  className,
  color = "#ce463f",
  children,
}: {
  className?: string;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 400 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
      >
        <motion.path
          d={ZIGZAG_PATH_D}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            pathLength: { duration: 2.4, ease: "easeOut" },
            opacity: { duration: 0.3 },
          }}
        />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}

// Stack of scalloped half-domes — like the blue petal cascade in the brand image
function ScallopStack({
  className,
  color = "#a4beeb",
  count = 4,
}: {
  className?: string;
  color?: string;
  count?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 80 ${count * 28}`}
      className={className}
      fill="none"
    >
      {Array.from({ length: count }, (_, i) => (
        <ellipse
          key={i}
          cx="40"
          cy={i * 28 + 14}
          rx="34"
          ry="11"
          fill={color}
          opacity={1 - i * 0.05}
        />
      ))}
    </svg>
  );
}

// Diagonal stripe pattern — the striped-paper texture from the brand image
function StripedTile({
  className,
  color = "#a4beeb",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="none"
      fill="none"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={i}
          x1="-5"
          y1={i * 12 - 5}
          x2="105"
          y2={i * 12 - 5}
          stroke={color}
          strokeWidth="3"
          strokeOpacity="0.4"
        />
      ))}
    </svg>
  );
}

// Isometric grid trapezoid — the perspective grid in the brand image
function GridTrapezoid({
  className,
  color = "#0c0f14",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 60"
      className={className}
      fill="none"
    >
      {/* outer trapezoid */}
      <path
        d="M 6 6 L 114 6 L 100 54 L 20 54 Z"
        stroke={color}
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      {/* horizontal grid lines */}
      {[18, 30, 42].map((y, i) => {
        const t = (y - 6) / 48;
        const x1 = 6 + 14 * t;
        const x2 = 114 - 14 * t;
        return (
          <line
            key={`h-${i}`}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            stroke={color}
            strokeOpacity="0.35"
            strokeWidth="0.75"
          />
        );
      })}
      {/* vertical perspective lines */}
      {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
        const xTop = 6 + 108 * t;
        const xBot = 20 + 80 * t;
        return (
          <line
            key={`v-${i}`}
            x1={xTop}
            y1={6}
            x2={xBot}
            y2={54}
            stroke={color}
            strokeOpacity="0.35"
            strokeWidth="0.75"
          />
        );
      })}
    </svg>
  );
}

// Wavy horizon band — the grass / terrain edge in the brand image
function WavyHorizon({
  className,
  color = "#398239",
  amp = 8,
  segments = 6,
}: {
  className?: string;
  color?: string;
  amp?: number;
  segments?: number;
}) {
  const w = 600;
  const h = 60;
  const segLen = w / segments;
  let d = `M 0 ${amp + 4}`;
  for (let i = 0; i < segments; i++) {
    const cx = i * segLen + segLen / 2;
    const cy = i % 2 === 0 ? 0 : amp * 2 + 4;
    d += ` Q ${cx} ${cy} ${(i + 1) * segLen} ${amp + 4}`;
  }
  d += ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      preserveAspectRatio="none"
      fill={color}
    >
      <path d={d} />
    </svg>
  );
}

// Geometric burst — the black starburst with white outline in the brand image
function Burst({
  className,
  color = "#0c0f14",
  outline = "#fbf9f6",
  points = 9,
}: {
  className?: string;
  color?: string;
  outline?: string;
  points?: number;
}) {
  const cx = 50;
  const cy = 50;
  const outerR = 44;
  const innerR = 26;
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const theta = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${cx + Math.cos(theta) * r} ${cy + Math.sin(theta) * r}`);
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
    >
      <polygon
        points={pts.join(" ")}
        fill={color}
        stroke={outline}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Halo — olive oval with an orange core (the eye / planet shape)
function Halo({
  className,
  outerColor = "#96be53",
  innerColor = "#ed6e2d",
}: {
  className?: string;
  outerColor?: string;
  innerColor?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 60"
      className={className}
      fill="none"
    >
      <ellipse cx="50" cy="30" rx="46" ry="24" fill={outerColor} />
      <circle cx="74" cy="34" r="10" fill={innerColor} />
    </svg>
  );
}

// Pixelated mound — the blocky red mountain in the brand image
function PixelMound({
  className,
  color = "#ce463f",
}: {
  className?: string;
  color?: string;
}) {
  // 8x4 grid of squares forming a low-poly mountain
  const cells: [number, number][] = [
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 2],
    [2, 3],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 1],
    [4, 2],
    [4, 3],
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [6, 1],
    [6, 2],
    [6, 3],
    [7, 2],
    [7, 3],
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 40"
      className={className}
      fill={color}
    >
      {cells.map(([cx, cy], i) => (
        <rect key={i} x={cx * 10} y={cy * 10} width={10} height={10} />
      ))}
    </svg>
  );
}

/* ============== Storytelling primitives ============== */

export function QuestionHook({
  text,
  emphasis,
  accent = "#ed6e2d",
}: {
  text: string;
  emphasis?: string;
  accent?: string;
}) {
  // Split text around the emphasized word so we can underline only that part.
  const parts = emphasis
    ? text.split(emphasis)
    : [text];
  return (
    <section
      aria-label="Question"
      className="relative flex min-h-[32vh] items-center px-6 py-10 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="font-display italic text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.15] text-brand-ink/85"
        >
          {emphasis ? (
            <>
              {parts[0]}
              <span className="relative inline-block not-italic">
                <span className="relative z-10 italic">{emphasis}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 18"
                  preserveAspectRatio="none"
                  className="absolute inset-x-[-4%] -bottom-2 z-0 h-3 w-[108%]"
                  fill="none"
                >
                  <motion.path
                    d="M 4 12 C 60 4, 140 16, 196 8"
                    stroke={accent}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.9, delay: 0.5 }}
                  />
                </svg>
              </span>
              {parts[1]}
            </>
          ) : (
            text
          )}
        </motion.p>
      </div>
    </section>
  );
}

export function PullQuote({
  quote,
  attribution,
  role,
  accent = "#356fe5",
  align = "left",
}: {
  quote: string;
  attribution: string;
  role?: string;
  accent?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.55 }}
      className={`relative my-10 max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute -left-1 -top-6 font-display text-[5rem] leading-none"
        style={{ color: accent }}
      >
        &ldquo;
      </span>
      <blockquote className="relative pl-8 font-display text-xl leading-snug text-brand-ink/90 sm:text-2xl">
        {quote}
      </blockquote>
      <figcaption className="mt-4 pl-8 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-ink/60">
        — {attribution}
        {role ? <span className="text-brand-ink/40"> · {role}</span> : null}
      </figcaption>
    </motion.figure>
  );
}

export type MotifKind =
  | "loop"
  | "scribble"
  | "dot"
  | "node"
  | "arc-arrow"
  | "rise"
  | "bend";

export function MotifGlyph({
  kind,
  size = 22,
  color = "#0c0f14",
}: {
  kind: MotifKind;
  size?: number;
  color?: string;
}) {
  const stroke = color;
  const fill = color;
  if (kind === "loop") {
    // small continuous loop, mirrors the gutter CreativeLoop
    return (
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <motion.path
          d="M 12 4 C 4 6, 4 14, 12 16 C 20 18, 20 10, 12 8 C 6 7, 4 11, 8 14"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9 }}
        />
      </svg>
    );
  }
  if (kind === "scribble") {
    // gentle scribble arc, mirrors ScribbleArc
    return (
      <svg
        aria-hidden="true"
        width={size + 8}
        height={size}
        viewBox="0 0 32 20"
        fill="none"
      >
        <motion.path
          d="M 2 14 Q 9 2 16 10 T 30 6"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        />
      </svg>
    );
  }
  if (kind === "dot") {
    // dot with halo, mirrors the ecosystem nodes
    return (
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
      >
        <circle cx="10" cy="10" r="7" fill={fill} fillOpacity="0.15" />
        <circle cx="10" cy="10" r="3" fill={fill} />
      </svg>
    );
  }
  if (kind === "node") {
    // connected node, mirrors Ecosystem spokes
    return (
      <svg
        aria-hidden="true"
        width={size + 6}
        height={size}
        viewBox="0 0 26 20"
        fill="none"
      >
        <motion.line
          x1="2"
          y1="10"
          x2="14"
          y2="10"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        />
        <circle cx="2" cy="10" r="2" fill={fill} />
        <circle cx="20" cy="10" r="4" fill="none" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (kind === "arc-arrow") {
    // gentle hand-drawn arrow that arcs upward (mirrors BendingRoad arrowhead)
    return (
      <svg
        aria-hidden="true"
        width={size + 6}
        height={size}
        viewBox="0 0 26 20"
        fill="none"
      >
        <motion.path
          d="M 2 16 C 8 16, 12 8, 18 5"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        />
        <motion.polyline
          points="14,3 19,4 17,9"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.25, delay: 0.6 }}
        />
      </svg>
    );
  }
  if (kind === "rise") {
    // small stack of bars rising (mirrors RisingBars)
    return (
      <svg
        aria-hidden="true"
        width={size + 4}
        height={size}
        viewBox="0 0 24 20"
        fill="none"
      >
        <motion.rect
          x="3"
          y="14"
          width="4"
          height="4"
          fill={fill}
          initial={{ height: 0, y: 18 }}
          whileInView={{ height: 4, y: 14 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        />
        <motion.rect
          x="10"
          y="9"
          width="4"
          height="9"
          fill={fill}
          initial={{ height: 0, y: 18 }}
          whileInView={{ height: 9, y: 9 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.rect
          x="17"
          y="3"
          width="4"
          height="15"
          fill={fill}
          initial={{ height: 0, y: 18 }}
          whileInView={{ height: 15, y: 3 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </svg>
    );
  }
  // bend — pivot dot + clean arc redirect (mirrors the larger BendingRoad)
  return (
    <svg
      aria-hidden="true"
      width={size + 6}
      height={size}
      viewBox="0 0 26 20"
      fill="none"
    >
      <motion.path
        d="M 11 16 C 16 16, 18 10, 22 4"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.2 }}
      />
      <circle cx="11" cy="16" r="2" fill={fill} />
      <motion.polygon
        points="20,2 25,4 22,8"
        fill={fill}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.2, delay: 0.8 }}
        style={{ transformOrigin: "22px 4px" }}
      />
    </svg>
  );
}

export function FieldNote({
  date,
  children,
}: {
  date: string;
  children: React.ReactNode;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.55 }}
      className="relative max-w-md rounded-md border border-brand-ink/20 bg-[#fdfcf6] p-5 pt-7 shadow-[3px_4px_0_rgba(12,15,20,0.08)]"
    >
      {/* binder-clip motif */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 -top-2 inline-block h-3 w-12 -translate-x-1/2 rounded-sm border border-brand-ink/40 bg-brand-cream"
      />
      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-brand-ink/55">
        Field note · {date}
      </span>
      <div className="mt-2 font-display text-base italic leading-snug text-brand-ink/85 sm:text-[17px]">
        {children}
      </div>
    </motion.aside>
  );
}

/* ---------------- 01 — Conviction ---------------- */
export function ChapterConviction() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scribbleLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <ChapterFrame number="01" eyebrow="Origin" minHeight="100vh">
      <div ref={ref} className="absolute inset-0">
        <motion.div
          style={{ opacity, y }}
          className="sticky top-0 flex h-screen items-center justify-center px-6 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24"
        >
          <div className="relative mx-auto w-full max-w-3xl text-center">
            <CutOut
              className="absolute -left-12 -top-12 h-28 w-36 rounded-[40%] sm:h-36 sm:w-48"
              color="#feffa0"
              rotate={-8}
            />
            <DotGrid
              className="absolute -right-8 -bottom-6 h-24 w-24 opacity-70 sm:h-32 sm:w-32"
              color="#0c0f14"
              cols={8}
              rows={8}
            />
            <WavyFrame className="px-10 py-12 sm:px-14 sm:py-16">
              <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
                We started this journey with
              </p>
              <h1 className="mt-4 font-display text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.95] text-brand-ink">
                <em className="not-italic">a conviction.</em>
              </h1>
              <svg
                aria-hidden="true"
                viewBox="0 0 480 80"
                className="mx-auto mt-2 block h-6 w-72 sm:h-8 sm:w-96"
                fill="none"
              >
                <motion.path
                  d="M 5 60 Q 120 5 240 40 T 475 25"
                  stroke="#ed6e2d"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength: scribbleLength }}
                />
              </svg>
            </WavyFrame>
          </div>
        </motion.div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 02 — The bet ---------------- */
export function ChapterTheBet() {
  const lines = [
    { text: "Not big tech.", color: "#356fe5" },
    { text: "Not edtech.", color: "#ed6e2d" },
    { text: "Not even us.", color: "#398239" },
  ];

  return (
    <ChapterFrame
      number="02"
      eyebrow="The bet"
      accent="#356fe5"
      minHeight="115vh"
    >
      <div className="flex min-h-screen items-center px-6 py-20 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="relative mx-auto w-full max-w-5xl">
          <CutOut
            className="absolute -right-2 top-0 -z-0 h-24 w-24 rounded-full sm:h-32 sm:w-32"
            color="#a4beeb"
            rotate={0}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="relative max-w-3xl font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-snug text-brand-ink/85"
          >
            Educators would figure out what AI is for in education.
          </motion.p>

          <ul className="mt-16 space-y-10 sm:mt-20 sm:space-y-14 font-display leading-[0.95] text-brand-ink/80">
            {lines.map((line, i) => {
              // Each rejected line grows larger than the last so the page
              // climbs toward the "Educators." finale.
              const sizes = [
                "text-[clamp(2.25rem,5.5vw,4.25rem)]",
                "text-[clamp(2.75rem,6.75vw,5.25rem)]",
                "text-[clamp(3.25rem,8vw,6.25rem)]",
              ];
              const strikeHeights = ["h-[3px]", "h-[4px]", "h-[5px] sm:h-[6px]"];
              return (
                <motion.li
                  key={line.text}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ delay: 0.15 + i * 0.35, duration: 0.55 }}
                  className="relative"
                >
                  <span className={`relative inline-block ${sizes[i]}`}>
                    {line.text}
                    <motion.span
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{
                        delay: 0.55 + i * 0.35,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      className={`absolute left-[-2%] top-[55%] ${strikeHeights[i]} w-[104%] origin-left rounded-full`}
                      style={{ backgroundColor: line.color }}
                    />
                  </span>
                </motion.li>
              );
            })}
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 1.55, duration: 0.6 }}
              className="!mt-16 sm:!mt-20"
            >
              <CircledWord text="Educators." delay={2.0} />
            </motion.li>
          </ul>
        </div>
      </div>
    </ChapterFrame>
  );
}

function CircledWord({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10 font-display text-[clamp(3.25rem,8.5vw,6.75rem)] leading-none text-brand-ink">
        {text}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 320 30"
        preserveAspectRatio="none"
        className="absolute inset-x-[-2%] -bottom-3 z-0 h-3 w-[104%] overflow-visible sm:h-4"
        fill="none"
      >
        <motion.path
          d="M 4 18 C 60 10, 140 22, 220 14 C 270 9, 300 16, 316 12"
          stroke="#ed6e2d"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            pathLength: { duration: 1.0, delay, ease: "easeOut" },
            opacity: { duration: 0.2, delay },
          }}
        />
      </svg>
    </span>
  );
}

/* ---------------- 03 — Chatbot era ---------------- */
function CountUp({
  to,
  duration = 1.4,
  format,
}: {
  to: number;
  duration?: number;
  format?: (v: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [value, setValue] = useState(0);
  const isInt = Number.isInteger(to);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      const next = to * eased;
      setValue(isInt ? Math.round(next) : Math.round(next * 10) / 10);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, isInt]);

  const display = format
    ? format(value)
    : isInt
      ? value.toLocaleString()
      : value.toFixed(1);

  return <span ref={ref}>{display}</span>;
}

function StatTile({
  number,
  label,
  accent,
  delay = 0,
}: {
  number: React.ReactNode;
  label: string;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ delay, duration: 0.5 }}
      className="relative pt-4"
    >
      <span
        className="absolute left-0 top-0 h-[3px] w-10 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <div className="font-display text-[clamp(2rem,3.6vw,3rem)] leading-none text-brand-ink">
        {number}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-ink/60">
        {label}
      </div>
    </motion.div>
  );
}

function useStableRandoms(count: number, seed = 1) {
  return useRef(
    Array.from({ length: count }, (_, i) => {
      // simple deterministic pseudo-random so it doesn't flicker on hot reload
      const x = Math.sin((i + seed) * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    }),
  ).current;
}

export function ChapterChatbotEra() {
  const materials = [
    { label: "Evaluations", color: "#feffa0" },
    { label: "Starter Inputs", color: "#a4beeb" },
    { label: "Knowledge Graphs", color: "#efd8ef" },
    { label: "Moderation", color: "#d4fd63" },
    { label: "Memory", color: "#fff46c" },
    { label: "Model Selection", color: "#f4baef" },
    { label: "Guided Prompting", color: "#a4beeb" },
    { label: "Live Training", color: "#feffa0" },
    { label: "Maths Tooling", color: "#d4fd63" },
    { label: "Doc Editor", color: "#efd8ef" },
  ];

  return (
    <ChapterFrame
      number="03"
      eyebrow="The first material"
      accent="#ed6e2d"
      minHeight="115vh"
    >
      <div className="flex min-h-screen items-center px-6 py-16 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
              Our chatbot era
            </p>
            <p className="mt-3 font-display text-2xl leading-snug text-brand-ink/85 sm:text-3xl">
              Chatbots were our first material. A great one. Educators taught
              us what AI can be in education.
            </p>
            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-[clamp(3.5rem,10vw,7rem)] font-medium leading-none text-brand-ink">
                <CountUp to={35000} />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-ink/60">
                builders / 15 months
              </span>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3 sm:gap-x-12 lg:gap-x-14">
              <StatTile
                number={
                  <>
                    <CountUp to={7.3} />M
                  </>
                }
                label="Students reached"
                accent="#ed6e2d"
                delay={0.05}
              />
              <StatTile
                number={<CountUp to={104} />}
                label="School systems"
                accent="#356fe5"
                delay={0.15}
              />
              <StatTile
                number={
                  <>
                    <CountUp to={14100} />+
                  </>
                }
                label="Students built AI apps"
                accent="#398239"
                delay={0.25}
              />
            </div>

            <div className="mt-12">
              <PullQuote
                quote="AI is moving faster than school is built for. We needed a new way to make."
                attribution="Playlab team"
                accent="#ed6e2d"
              />
            </div>
          </div>

          <ChipStack materials={materials} />
        </div>
      </div>
    </ChapterFrame>
  );
}

function ChipStack({
  materials,
}: {
  materials: { label: string; color: string }[];
}) {
  const randoms = useStableRandoms(materials.length, 7);
  // build a scattered (not in-order) draw sequence
  const order = [...materials.keys()].sort(
    (a, b) => randoms[a] - randoms[b],
  );
  const drawIndex = new Map<number, number>();
  order.forEach((origIdx, drawn) => drawIndex.set(origIdx, drawn));

  return (
    <div className="lg:col-span-5">
      <div className="flex flex-wrap items-start gap-y-2">
        {materials.map((m, i) => {
          const r = randoms[i];
          const rotate = (r - 0.5) * 8; // -4° to +4°
          const yOffset = (randoms[(i + 3) % randoms.length] - 0.5) * 6;
          const overlap = -8 - r * 6; // -8 to -14 px overlap
          const drawn = drawIndex.get(i) ?? i;
          return (
            <motion.span
              key={m.label}
              initial={{
                opacity: 0,
                y: -18 - r * 8,
                rotate: rotate - 4,
                scale: 0.94,
              }}
              whileInView={{
                opacity: 1,
                y: yOffset,
                rotate,
                scale: 1,
              }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                delay: 0.06 * drawn,
                duration: 0.55,
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
              className="rounded-full border border-brand-ink/25 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-ink"
              style={{
                backgroundColor: m.color,
                marginLeft: i === 0 ? 0 : `${overlap}px`,
                zIndex: drawn + 1,
                boxShadow:
                  "1.5px 2px 0 rgba(12,15,20,0.18), 0 0 0 1px rgba(12,15,20,0.04)",
              }}
            >
              {m.label}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- 04 — Expand the vocabulary (ECOSYSTEM) ---------------- */

const ecosystemNodes = [
  { x: 200, y: 60, r: 14, color: "#feffa0", label: "Materials" },
  { x: 330, y: 130, r: 18, color: "#356fe5", label: "Schools" },
  { x: 350, y: 250, r: 12, color: "#ed6e2d", label: "Teachers" },
  { x: 270, y: 340, r: 16, color: "#efd8ef", label: "Students" },
  { x: 130, y: 340, r: 14, color: "#96be53", label: "Tools" },
  { x: 50, y: 250, r: 11, color: "#f4baef", label: "Networks" },
  { x: 70, y: 130, r: 13, color: "#d4fd63", label: "Open work" },
];

export function ChapterVocabulary() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const reveal = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <ChapterFrame
      number="04"
      eyebrow="Ecosystem"
      accent="#356fe5"
      minHeight="120vh"
    >
      <div ref={ref} className="absolute inset-0">
        <div className="sticky top-0 flex h-screen items-center px-6 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div style={{ y: titleY }} className="relative pt-10">
              <ScribbleArc
                className="absolute -left-2 -top-2 h-6 w-32 sm:w-44"
                color="#356fe5"
                d="M 0 60 Q 70 0 150 30 T 280 25"
              />
              <p className="relative font-mono text-xs tracking-[0.25em] text-brand-ink/55">
                The ecosystem
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight text-brand-ink">
                More schools. More makers. More material to share between them.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-ink/75">
                Chatbots were the start. The next chapter is a network of
                people, tools, and schools that pass work between them. The
                point isn&rsquo;t any one node, it&rsquo;s the connections.
              </p>
            </motion.div>
            <div className="relative flex justify-center">
              <ScallopStack
                className="absolute -left-2 top-2 hidden h-32 w-12 opacity-70 sm:block"
                color="#a4beeb"
                count={3}
              />
              <Ecosystem reveal={reveal} />
            </div>
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

type EcosystemReveal = import("framer-motion").MotionValue<number>;

const linkPairs: ReadonlyArray<readonly [number, number]> = [
  [0, 2],
  [1, 4],
  [2, 5],
  [3, 6],
  [4, 1],
  [5, 0],
];

function Spoke({
  reveal,
  start,
  end,
  x,
  y,
}: {
  reveal: EcosystemReveal;
  start: number;
  end: number;
  x: number;
  y: number;
}) {
  const pathLength = useTransform(reveal, [start, end], [0, 1]);
  return (
    <motion.line
      x1={200}
      y1={200}
      x2={x}
      y2={y}
      stroke="#0c0f14"
      strokeOpacity="0.65"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{ pathLength }}
    />
  );
}

function Link({
  reveal,
  start,
  end,
  ax,
  ay,
  bx,
  by,
  color,
}: {
  reveal: EcosystemReveal;
  start: number;
  end: number;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  color: string;
}) {
  const pathLength = useTransform(reveal, [start, end], [0, 1]);
  return (
    <motion.path
      d={`M ${ax} ${ay} Q 200 200 ${bx} ${by}`}
      stroke={color}
      strokeOpacity="0.55"
      strokeWidth="1.25"
      strokeLinecap="round"
      fill="none"
      style={{ pathLength }}
    />
  );
}

function Node({
  reveal,
  start,
  node,
}: {
  reveal: EcosystemReveal;
  start: number;
  node: (typeof ecosystemNodes)[number];
}) {
  const opacity = useTransform(reveal, [start, start + 0.04], [0, 1]);
  return (
    <motion.g style={{ opacity }}>
      <circle cx={node.x} cy={node.y} r={node.r + 2} fill={node.color} />
      <circle
        cx={node.x}
        cy={node.y}
        r={node.r}
        fill="none"
        stroke="#0c0f14"
        strokeOpacity="0.6"
        strokeWidth="0.75"
      />
      <text
        x={node.x}
        y={node.y + node.r + 14}
        textAnchor="middle"
        fontSize="9"
        fontFamily="'Spline Sans Mono', monospace"
        fill="#0c0f14"
        fillOpacity="0.7"
        letterSpacing="0.08em"
      >
        {node.label}
      </text>
    </motion.g>
  );
}

function Ecosystem({ reveal }: { reveal: EcosystemReveal }) {
  const total = ecosystemNodes.length;
  const segments = total + linkPairs.length;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="h-72 w-72 sm:h-[26rem] sm:w-[26rem]"
      fill="none"
    >
      {/* Hand-drawn outer halo */}
      <motion.path
        d="M 200 30 C 320 30, 380 110, 380 200 C 380 300, 300 380, 200 380 C 90 380, 20 290, 30 200 C 35 110, 110 35, 200 30 Z"
        stroke="#0c0f14"
        strokeOpacity="0.2"
        strokeWidth="1"
        strokeDasharray="3 6"
        fill="none"
        style={{ pathLength: reveal }}
      />

      {/* Spokes from center to each satellite */}
      {ecosystemNodes.map((node, i) => (
        <Spoke
          key={`spoke-${i}`}
          reveal={reveal}
          start={i / segments}
          end={(i + 1) / segments}
          x={node.x}
          y={node.y}
        />
      ))}

      {/* Cross links between satellites */}
      {linkPairs.map(([a, b], i) => (
        <Link
          key={`link-${i}`}
          reveal={reveal}
          start={(total + i) / segments}
          end={(total + i + 1) / segments}
          ax={ecosystemNodes[a].x}
          ay={ecosystemNodes[a].y}
          bx={ecosystemNodes[b].x}
          by={ecosystemNodes[b].y}
          color={ecosystemNodes[a].color}
        />
      ))}

      {/* Center node */}
      <circle cx={200} cy={200} r="22" fill="#0c0f14" />
      <text
        x={200}
        y={204}
        textAnchor="middle"
        fontSize="9"
        fontFamily="'Spline Sans Mono', monospace"
        fill="#fbf9f6"
        letterSpacing="0.1em"
      >
        PLAY
      </text>

      {/* Satellite nodes */}
      {ecosystemNodes.map((node, i) => (
        <Node
          key={`node-${i}`}
          reveal={reveal}
          start={i / segments}
          node={node}
        />
      ))}
    </svg>
  );
}

/* ---------------- 05 — The mandate ---------------- */
export function ChapterMandate() {
  const steps = [
    { verb: "Design", body: "the raw material that lets people make.", color: "#ed6e2d" },
    { verb: "Surface", body: "what works from what they build.", color: "#356fe5" },
    {
      verb: "Translate",
      body: "those discoveries into reusable artifacts.",
      color: "#398239",
    },
  ];

  return (
    <ChapterFrame
      number="05"
      eyebrow="The mandate"
      accent="#398239"
      minHeight="110vh"
    >
      <div className="relative flex min-h-screen items-center px-6 py-16 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <DotGrid
          className="pointer-events-none absolute left-6 top-20 hidden h-24 w-32 opacity-70 sm:block md:left-20"
          color="#398239"
          cols={10}
          rows={6}
        />
        <div className="ml-auto w-full max-w-3xl text-right">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            Our mandate
          </p>
          <h2 className="relative mt-3 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-brand-ink">
            <span className="relative inline-block">
              <CountUp to={50} />
              <span
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-full"
                style={{ backgroundColor: "#d4fd63", opacity: 0.5 }}
              />
            </span>
            <span className="text-accent-forest"> million</span> educators.
          </h2>
          <p className="ml-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-ink/75">
            Breakthroughs in education won&rsquo;t come from us. They&rsquo;ll
            come from the educators who, given the right tools, figure out what
            AI is for. AI Lab Schools is how we test that thesis with 13
            schools, in public.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.verb}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.5 }}
                className="relative pt-5"
              >
                <span
                  className="absolute left-0 top-0 h-[5px] w-14 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
                <span className="font-mono text-[11px] tracking-[0.25em] text-brand-ink/55">
                  {`[${i + 1}]`}
                </span>
                <h3
                  className="mt-2 font-display text-3xl"
                  style={{ color: step.color }}
                >
                  {step.verb}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-brand-ink/75">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- Interlude: Risk & Potential (the scale) ---------------- */

function ScaleGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* beam */}
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* end caps */}
      <circle cx="3" cy="6" r="1.4" fill="currentColor" />
      <circle cx="21" cy="6" r="1.4" fill="currentColor" />
      {/* fulcrum */}
      <polygon points="12,6 8,15 16,15" fill="currentColor" />
      {/* base */}
      <line
        x1="6"
        y1="20"
        x2="18"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* post */}
      <line
        x1="12"
        y1="15"
        x2="12"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function StakesInterlude() {
  const scaleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scaleRef, { once: true, amount: 0.3 });

  // Continuous oscillation: cycle through CCW dip, level, CW dip, level.
  const oscDuration = 6.4;
  const oscTimes = [0, 0.25, 0.5, 0.75, 1];
  const beamKeyframes = [0, -3.2, 0, 3.2, 0];
  const riskKeyframes = [0, 22, 0, -22, 0];
  const potentialKeyframes = [0, -22, 0, 22, 0];

  return (
    <section
      aria-label="Risk and potential"
      className="relative w-full px-6 py-16 sm:px-12 sm:py-20 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24"
    >
      <DotGrid
        className="pointer-events-none absolute -left-2 top-10 hidden h-24 w-32 opacity-60 md:block"
        color="#ce463f"
        cols={10}
        rows={6}
      />
      <DotGrid
        className="pointer-events-none absolute -right-2 bottom-10 hidden h-24 w-32 opacity-60 md:block"
        color="#398239"
        cols={10}
        rows={6}
      />

      <div className="mx-auto w-full max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-brand-ink/55">
          <ScaleGlyph size={14} />
          <span>On the scale</span>
        </div>
        <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-brand-ink">
          Great risk.{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Great potential.</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-[-4%] -bottom-1 -z-0 h-3 w-[108%]"
              style={{ backgroundColor: "#d4fd63", opacity: 0.6 }}
            />
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-ink/70">
          Every classroom is putting student agency on the scale. Both ends are
          real. The question is whether students drive the tool, or the tool
          drives them.
        </p>
      </div>

      {/* Balancing scale: beam oscillates, cards hang as pans and rise/fall */}
      <div
        ref={scaleRef}
        className="relative mx-auto mt-14 w-full max-w-5xl"
      >
        {/* Beam + chains: rotating SVG group, oscillating endlessly */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 800 140"
          className="relative z-10 block h-24 w-full sm:h-28"
          preserveAspectRatio="none"
          initial={{ rotate: 0 }}
          animate={inView ? { rotate: beamKeyframes } : { rotate: 0 }}
          transition={{
            duration: oscDuration,
            repeat: Infinity,
            ease: "easeInOut",
            times: oscTimes,
          }}
          style={{ transformOrigin: "50% 26%" }}
        >
          {/* beam */}
          <line
            x1="80"
            y1="36"
            x2="720"
            y2="36"
            stroke="#0c0f14"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* end caps */}
          <circle cx="80" cy="36" r="10" fill="#0c0f14" />
          <circle cx="720" cy="36" r="10" fill="#0c0f14" />
          {/* center pivot knob (where beam rests on fulcrum) */}
          <circle cx="400" cy="36" r="8" fill="#0c0f14" />
          <circle cx="400" cy="36" r="3" fill="#fbf9f6" />
          {/* chains: dashed lines down to pan tops */}
          <line
            x1="80"
            y1="46"
            x2="80"
            y2="128"
            stroke="#0c0f14"
            strokeWidth="2"
            strokeDasharray="3 4"
            strokeOpacity="0.7"
          />
          <line
            x1="720"
            y1="46"
            x2="720"
            y2="128"
            stroke="#0c0f14"
            strokeWidth="2"
            strokeDasharray="3 4"
            strokeOpacity="0.7"
          />
        </motion.svg>

        {/* Fulcrum + post + base, drawn behind the cards (desktop only) */}
        <div className="pointer-events-none absolute inset-x-0 top-7 z-0 hidden h-[calc(100%-1.75rem)] justify-center lg:flex">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 620"
            className="h-full w-24"
            preserveAspectRatio="xMidYMin meet"
          >
            {/* post — full vertical line from beam down to base */}
            <line
              x1="50"
              y1="4"
              x2="50"
              y2="572"
              stroke="#0c0f14"
              strokeWidth="5"
            />
            {/* base shadow */}
            <ellipse
              cx="50"
              cy="595"
              rx="48"
              ry="6"
              fill="#0c0f14"
              fillOpacity="0.18"
            />
            {/* base bar */}
            <rect
              x="6"
              y="582"
              width="88"
              height="8"
              rx="4"
              fill="#0c0f14"
            />
          </svg>
        </div>

        {/* Cards as pans, hung from the beam */}
        <div className="relative z-10 grid grid-cols-1 gap-6 lg:-mt-2 lg:grid-cols-2 lg:gap-x-24">
          <motion.article
            initial={{ opacity: 0, y: 0 }}
            animate={
              inView
                ? { opacity: 1, y: riskKeyframes }
                : { opacity: 0, y: 0 }
            }
            transition={{
              opacity: { duration: 0.6 },
              y: {
                duration: oscDuration,
                repeat: Infinity,
                ease: "easeInOut",
                times: oscTimes,
              },
            }}
            className="relative overflow-hidden border border-brand-ink/15 bg-brand-bg p-8 shadow-[3px_4px_0_rgba(12,15,20,0.12)] sm:p-10"
            style={{ borderRadius: "3rem 0.75rem 3rem 0.75rem" }}
          >
            {/* Risk: sharp / jagged shape language */}
            <Burst
              className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 opacity-90"
              color="#ce463f"
              outline="#fbf9f6"
              points={11}
            />
            <PixelMound
              className="pointer-events-none absolute -bottom-2 -left-2 h-10 w-20 opacity-80"
              color="#ce463f"
            />
            <div className="relative text-center">
              <span
                className="inline-flex items-center rounded-full border border-brand-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-bg shadow-[2px_2px_0_rgba(12,15,20,0.2)]"
                style={{ backgroundColor: "#ce463f" }}
              >
                Risk
              </span>
              <h3 className="mt-4 font-display text-2xl leading-snug text-brand-ink sm:text-[1.75rem]">
                If agency thins out.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-brand-ink/80">
                Thinking gets outsourced. Teaching loses its craft. Schools
                drift into surveillance and busywork. Families lose track of
                what school is for. The agency a school exists to build can
                quietly erode &mdash; on every side of the room.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 0 }}
            animate={
              inView
                ? { opacity: 1, y: potentialKeyframes }
                : { opacity: 0, y: 0 }
            }
            transition={{
              opacity: { duration: 0.6, delay: 0.1 },
              y: {
                duration: oscDuration,
                repeat: Infinity,
                ease: "easeInOut",
                times: oscTimes,
              },
            }}
            className="relative overflow-hidden border border-brand-ink/15 bg-brand-bg p-8 shadow-[3px_4px_0_rgba(12,15,20,0.12)] sm:p-10"
            style={{ borderRadius: "2.75rem" }}
          >
            {/* Potential: organic / blooming shape language */}
            <Halo
              className="pointer-events-none absolute -right-2 -top-3 h-12 w-20 opacity-80"
              outerColor="#d4fd63"
              innerColor="#398239"
            />
            <CollagePebble
              className="pointer-events-none absolute -left-4 -bottom-4 h-16 w-16 opacity-90"
              color="#398239"
              variant={1}
            />
            <div className="relative text-center">
              <span
                className="inline-flex items-center rounded-full border border-brand-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-ink shadow-[2px_2px_0_rgba(12,15,20,0.18)]"
                style={{ backgroundColor: "#d4fd63" }}
              >
                Potential
              </span>
              <h3 className="mt-4 font-display text-2xl leading-snug text-brand-ink sm:text-[1.75rem]">
                If agency takes root.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-brand-ink/80">
                Thinking gets exercised. Teaching reclaims its craft. Schools
                become labs their communities can read. Families help carry the
                work. Agency, on every side of the room, finds a place to
                grow.
              </p>
            </div>
          </motion.article>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ink/55">
        AI Lab Schools tips the scale toward potential.
      </p>
    </section>
  );
}

/* ---------------- 06 — Why a cohort ---------------- */
export function ChapterWhyCohort() {
  const stats = [
    { n: "13", label: "teams", color: "#feffa0" },
    { n: "24", label: "months", color: "#a4beeb" },
    { n: "1", label: "playbook", color: "#efd8ef" },
  ];

  return (
    <ChapterFrame
      number="06"
      eyebrow="The next material"
      accent="#ce463f"
      minHeight="90vh"
    >
      <div className="relative flex min-h-[90vh] items-center justify-center px-6 py-20 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <CutOut
          className="absolute left-12 top-16 -z-0 h-20 w-28 rounded-md md:left-24"
          color="#f4baef"
          rotate={-4}
        />
        <CutOut
          className="absolute right-12 bottom-20 -z-0 h-16 w-24 rounded-md"
          color="#d4fd63"
          rotate={6}
        />
        <div className="relative mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            Why a cohort
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6.5vw,5.25rem)] leading-[1.05] text-brand-ink">
            Our next material
            <br />
            <span className="italic">is school itself.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-ink/75">
            One open playbook, written so the next school doesn&rsquo;t start
            from zero.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-5">
            {stats.map((s) => (
              <div key={s.label} className="relative pt-4 text-center">
                <span
                  className="absolute left-1/2 top-0 h-[3px] w-10 -translate-x-1/2 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <div className="font-display text-5xl text-brand-ink">
                  {s.n}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 07 — Meet the cohort ---------------- */
export function ChapterMeetCohort() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);
  const flashTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current !== null) {
        window.clearTimeout(flashTimeoutRef.current);
      }
    };
  }, []);

  const handleSelect = (id: string) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(`cohort-card-${id}`);
    if (el) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    }
    setFlashId(id);
    if (flashTimeoutRef.current !== null) {
      window.clearTimeout(flashTimeoutRef.current);
    }
    flashTimeoutRef.current = window.setTimeout(() => {
      setFlashId(null);
      flashTimeoutRef.current = null;
    }, 1600);
  };

  return (
    <section
      id={chapterId("07")}
      className="relative w-full scroll-mt-20"
      aria-label="Meet the cohort"
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-8 sm:px-10 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/55">
          [07]
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink/55">
          The cohort
        </span>
      </div>

      {/* Hero: full map with every pin lit, dressed as a workshop card */}
      <div className="relative px-6 pt-20 pb-8 sm:px-12 sm:pt-24 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-brand-ink/10 bg-brand-cream/30 px-6 py-8 sm:px-10 sm:py-12">
            {/* brand-collage backdrop */}
            <CollageGrid
              className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
              color="#efd8ef"
              cellSize={18}
            />
            <Burst
              className="pointer-events-none absolute -left-6 -top-6 hidden h-24 w-24 sm:block"
              color="#0c0f14"
              outline="#fbf9f6"
              points={9}
            />
            <CollagePebble
              className="pointer-events-none absolute -right-4 top-10 hidden h-24 w-24 opacity-90 sm:block"
              color="#0f6d37"
              variant={1}
            />
            <CollagePebble
              className="pointer-events-none absolute right-1/4 -bottom-4 hidden h-16 w-16 opacity-80 lg:block"
              color="#0f6d37"
              variant={2}
            />
            <Halo
              className="pointer-events-none absolute -bottom-2 -left-4 hidden h-12 w-20 opacity-80 sm:block"
              outerColor="#96be53"
              innerColor="#ed6e2d"
            />

            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
                  Cohort 1 / 13 schools
                </p>
                <h2 className="mt-2 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-tight text-brand-ink">
                  Meet the cohort.
                </h2>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink/75">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full border border-brand-ink"
                      style={{ backgroundColor: "#feffa0" }}
                    />
                    Launch
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-brand-ink/55">
                    Built from scratch.
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink/75">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full border border-brand-ink"
                      style={{ backgroundColor: "#a4beeb" }}
                    />
                    Pivot
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-brand-ink/55">
                    Rearchitected from existing.
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-8">
              <JourneyMap
                litCount={cohortPartners.length}
                hoveredId={hoveredId}
                highlightId={hoveredId ?? flashId}
                onHover={setHoveredId}
                onSelect={handleSelect}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Windy-road school cards: alternate sides + S-curve connectors */}
      <div className="px-6 pt-6 pb-12 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="mx-auto w-full max-w-5xl">
          {cohortPartners.map((p, i) => {
            const accent = p.pathway === "Launch" ? "#feffa0" : "#a4beeb";
            // Subtler brand-palette tints rotated per partner so the
            // cohort grid reads as a soft collage rather than two stripes.
            const subtleTints = [
              "#efd8ef", // soft pink
              "#feffa0", // pale yellow
              "#a4beeb", // soft blue
              "#eff0e5", // sage cream
            ];
            const tintHash = [...p.id].reduce(
              (acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0,
              0,
            );
            const tint = subtleTints[tintHash % subtleTints.length];
            const isLeft = i % 2 === 0;
            const nextLeft = (i + 1) % 2 === 0;
            const showConnector = i < cohortPartners.length - 1;
            // hash partner.id so each card picks a different corner accent
            const hash = [...p.id].reduce(
              (acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0,
              0,
            );
            const accentKind = hash % 3; // 0: pebble · 1: starburst · 2: scallops
            const pebbleVariant = (hash % 3) as 0 | 1 | 2;
            const isFlashing = flashId === p.id;
            return (
              <div key={p.id}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45 }}
                  className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <article
                    id={`cohort-card-${p.id}`}
                    className={`relative flex w-full max-w-2xl items-start gap-5 overflow-hidden rounded-2xl border border-brand-ink/10 bg-brand-bg p-6 sm:p-7 transition-shadow duration-300 ${
                      isLeft ? "" : "text-right"
                    }`}
                    style={{
                      boxShadow: isFlashing
                        ? `0 0 0 4px ${accent}, 0 12px 24px -16px rgba(12,15,20,0.35)`
                        : undefined,
                    }}
                  >
                    {/* tinted grid wash across the whole card */}
                    <CollageGrid
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      color={tint}
                      cellSize={14}
                      opacity={0.7}
                    />
                    {/* one rotating brand-collage accent in a corner */}
                    {accentKind === 0 && (
                      <CollagePebble
                        className={`pointer-events-none absolute ${isLeft ? "-bottom-4 -right-4" : "-bottom-4 -left-4"} h-14 w-14 opacity-80`}
                        color="#0f6d37"
                        variant={pebbleVariant}
                      />
                    )}
                    {accentKind === 1 && (
                      <Burst
                        className={`pointer-events-none absolute ${isLeft ? "-right-3 -top-3" : "-left-3 -top-3"} h-12 w-12 opacity-90`}
                        color="#0c0f14"
                        outline="#fbf9f6"
                        points={9}
                      />
                    )}
                    {accentKind === 2 && (
                      <ScallopStack
                        className={`pointer-events-none absolute ${isLeft ? "-right-2 top-2" : "-left-2 top-2"} h-16 w-6 opacity-70`}
                        color="#356fe5"
                        count={3}
                      />
                    )}

                    <div
                      className={`relative flex flex-col gap-2 ${isLeft ? "" : "order-2 items-end"}`}
                    >
                      <div
                        className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 bg-brand-bg"
                        style={{ borderColor: accent }}
                      >
                        <img
                          src={p.logo}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span
                        className="rounded-full border border-brand-ink px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-ink shadow-[2px_2px_0_rgba(12,15,20,0.15)]"
                        style={{ backgroundColor: accent }}
                      >
                        {p.pathway}
                      </span>
                    </div>
                    <div
                      className={`relative flex-1 ${isLeft ? "" : "order-1"}`}
                    >
                      <h3 className="font-display text-2xl leading-tight text-brand-ink sm:text-[1.75rem]">
                        {p.school}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink/55">
                        {p.city}, {p.state}
                      </p>
                      <p className="mt-3 text-base leading-relaxed text-brand-ink/80">
                        {p.descriptor}
                      </p>
                    </div>
                  </article>
                </motion.div>

                {showConnector && (
                  <CohortConnector
                    fromLeft={isLeft}
                    toLeft={nextLeft}
                    accentKind={(hash + i) % 3}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CohortConnector({
  fromLeft,
  toLeft,
  accentKind = 0,
}: {
  fromLeft: boolean;
  toLeft: boolean;
  accentKind?: number;
}) {
  // path goes from one side to the other across an 80px tall band
  const startX = fromLeft ? 80 : 320;
  const endX = toLeft ? 80 : 320;
  const d = `M ${startX} 4 C ${(startX + endX) / 2} 35, ${(startX + endX) / 2} 50, ${endX} 76`;
  // midpoint of the curve, where the floating brand shape sits
  const midX = (startX + endX) / 2;
  const midY = 40;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      className="my-1 block h-20 w-full"
      fill="none"
    >
      <motion.path
        d={d}
        stroke="#0c0f14"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <motion.circle
        cx={startX}
        cy={4}
        r={2.5}
        fill="#0c0f14"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.25 }}
      />
      <motion.circle
        cx={endX}
        cy={76}
        r={2.5}
        fill="#0c0f14"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.25, delay: 0.6 }}
      />
      {/* a small floating brand-collage shape drifts at the curve's midpoint */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.35, delay: 0.4 }}
      >
        {accentKind === 0 && (
          <circle cx={midX} cy={midY} r={6} fill="#0f6d37" opacity={0.85} />
        )}
        {accentKind === 1 && (
          <polygon
            points={`${midX - 7},${midY + 5} ${midX},${midY - 7} ${midX + 7},${midY + 5}`}
            fill="#feffa0"
            stroke="#0c0f14"
            strokeWidth={1}
          />
        )}
        {accentKind === 2 && (
          <ellipse cx={midX} cy={midY} rx={9} ry={4} fill="#a4beeb" />
        )}
      </motion.g>
    </svg>
  );
}

/* ---------------- 08 — Two pathways ---------------- */
function RisingBars() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  // five bars of increasing height (from short to tall)
  const bars = [
    { x: 0, h: 60 },
    { x: 50, h: 110 },
    { x: 100, h: 80 },
    { x: 150, h: 160 },
    { x: 200, h: 200 },
  ];
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 240 220"
      className="h-44 w-full sm:h-56"
      fill="none"
    >
      {/* baseline */}
      <line
        x1="0"
        y1="210"
        x2="240"
        y2="210"
        stroke="#0c0f14"
        strokeWidth="1.5"
      />
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          width={36}
          fill="#0c0f14"
          initial={{ y: 210, height: 0 }}
          animate={{
            y: inView ? 210 - b.h : 210,
            height: inView ? b.h : 0,
          }}
          transition={{ duration: 0.65, delay: 0.1 * i, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function BendingRoad() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });

  // Pivot v6 — a single ray that travels left-to-right, inflects at a
  // point, and continues up-right as an arrow. Comfortable margins so
  // nothing clips inside the 280x180 viewBox.
  const START = { x: 22, y: 130 };
  const PIVOT = { x: 150, y: 130 };
  const END = { x: 250, y: 50 };
  const angle =
    (Math.atan2(END.y - PIVOT.y, END.x - PIVOT.x) * 180) / Math.PI;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 280 180"
      className="h-44 w-full sm:h-56"
      fill="none"
    >
      {/* small marker at the ray's origin */}
      <motion.circle
        cx={START.x}
        cy={START.y}
        r="3.5"
        fill="#0c0f14"
        fillOpacity="0.55"
        initial={{ scale: 0 }}
        animate={{ scale: inView ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* the ray — one continuous path that inflects at the pivot */}
      <motion.path
        d={`M ${START.x} ${START.y} L ${PIVOT.x} ${PIVOT.y} L ${END.x} ${END.y}`}
        stroke="#0c0f14"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.1 }}
      />

      {/* inflection point — solid dot with a quiet halo */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: inView ? 1 : 0,
          opacity: inView ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.65 }}
        style={{ transformOrigin: `${PIVOT.x}px ${PIVOT.y}px` }}
      >
        <circle
          cx={PIVOT.x}
          cy={PIVOT.y}
          r="11"
          fill="#fbf9f6"
          stroke="#0c0f14"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <circle cx={PIVOT.x} cy={PIVOT.y} r="5" fill="#0c0f14" />
      </motion.g>

      {/* arrowhead at the end of the ray — wrap the rotation in a static
          group so the SVG transform doesn't fight framer-motion's CSS */}
      <g transform={`translate(${END.x} ${END.y}) rotate(${angle})`}>
        <motion.polygon
          points="-16 -8 0 0 -16 8"
          fill="#0c0f14"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.25, delay: 1.4 }}
        />
      </g>
    </svg>
  );
}

export function ChapterTwoPathways() {
  return (
    <section
      id={chapterId("08")}
      className="relative w-full scroll-mt-20"
      aria-label="Two pathways, one cohort"
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-8 sm:px-10 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/55">
          [08]
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-navy">
          Two pathways
        </span>
      </div>

      {/* Intro */}
      <div className="px-6 pt-20 pb-6 sm:px-12 sm:pt-24 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            Two pathways, one cohort
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight text-brand-ink">
            Launch from scratch. Or pivot what already exists.
          </h2>
        </div>
      </div>

      {/* Launch panel */}
      <div className="relative overflow-hidden bg-accent-yellow/55 px-6 py-16 sm:px-12 sm:py-20 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <StripedTile
          className="pointer-events-none absolute right-0 top-0 hidden h-32 w-40 sm:block"
          color="#0c0f14"
        />
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ink">
              <span aria-hidden="true">
                <MotifGlyph kind="rise" />
              </span>
              Pathway 01 / The new start
            </p>
            <h3 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] text-brand-ink">
              Launch.
            </h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-ink/85">
              Founders building schools from the ground up. Every system
              designed for the AI age from day one.
            </p>
          </motion.div>
          <div className="lg:col-span-5">
            <RisingBars />
          </div>
        </div>
      </div>

      {/* Pivot panel */}
      <div className="relative overflow-hidden bg-accent-blue/55 px-6 py-16 sm:px-12 sm:py-20 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <GridTrapezoid
          className="pointer-events-none absolute bottom-3 left-12 hidden h-12 w-32 opacity-50 sm:block"
          color="#0c0f14"
        />
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <BendingRoad />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 lg:col-span-7 lg:text-right"
          >
            <p className="flex items-center justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ink">
              Pathway 02 / The pivot
              <span aria-hidden="true">
                <MotifGlyph kind="bend" />
              </span>
            </p>
            <h3 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] text-brand-ink">
              Pivot.
            </h3>
            <p className="ml-auto mt-5 max-w-md text-lg leading-relaxed text-brand-ink/85">
              Leaders of existing schools rearchitecting time, space, and
              staffing for the students they already serve.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 09 — The 24-month rhythm ---------------- */
const milestones = [
  { date: "Feb 2026", body: "Applications opened", accent: "#a4beeb" },
  { date: "Mar 2026", body: "51 schools applied", accent: "#efd8ef" },
  { date: "Apr 2026", body: "13 schools selected", accent: "#feffa0" },
  { date: "Jul 2026", body: "Cohort kickoff", accent: "#d4fd63" },
  { date: "Aug 2026", body: "First Launch schools open", accent: "#ed6e2d" },
  { date: "Fall 2026", body: "Pivot transformations begin", accent: "#356fe5" },
  {
    date: "Aug 2027",
    body: "Power Public Schools opens in Georgia",
    accent: "#f4baef",
  },
  { date: "Jun 2028", body: "Open-source playbook released", accent: "#398239" },
];

export function ChapterRhythm() {
  return (
    <section
      id={chapterId("09")}
      className="relative w-full scroll-mt-20"
      aria-label="The 24-month rhythm"
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-8 sm:px-10 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/55">
          [09]
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-orange">
          The rhythm
        </span>
      </div>

      <div className="px-6 pt-20 pb-16 sm:px-12 sm:pt-24 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="mx-auto w-full max-w-3xl">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            24 months of work
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-brand-ink">
            The cadence of the cohort.
          </h2>

          <ol className="relative mt-12 ml-3 border-l-2 border-brand-ink/15">
            {milestones.map((m, i) => {
              const isOpening = m.body
                .toLowerCase()
                .includes("open");
              return (
                <motion.li
                  key={m.date}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ delay: 0.05 * i, duration: 0.45 }}
                  className="relative pb-10 pl-8 last:pb-0"
                >
                  {isOpening ? (
                    <span
                      aria-hidden="true"
                      className="absolute -left-[12px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-brand-bg"
                    >
                      <MotifGlyph kind="dot" size={18} color="#ed6e2d" />
                    </span>
                  ) : (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-[3px] border-brand-bg"
                        style={{ backgroundColor: m.accent }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute -left-[14px] top-[-2px] h-7 w-7 rounded-full border border-brand-ink/15"
                      />
                    </>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-ink">
                      {String(i + 1).padStart(2, "0")} · {m.date}
                    </span>
                  </div>
                  <div
                    className="mt-2 font-display text-2xl leading-snug text-brand-ink sm:text-3xl"
                  >
                    {m.body}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 10 — What gets built ---------------- */
const pillars = [
  {
    title: "AI-integrated pedagogy",
    body: "Where AI amplifies human connection and creativity. Where it doesn't, it stays out.",
    accent: "#feffa0",
  },
  {
    title: "Agency-driven learning",
    body: "Students as creators and critics of the technology. Adults as coaches.",
    accent: "#a4beeb",
  },
  {
    title: "Boundary-less classrooms",
    body: "Learning that moves between school, community, and the tools students bring.",
    accent: "#d4fd63",
  },
] as const;

function HandDrawnPillar({
  accent,
  delay = 0,
}: {
  accent: string;
  delay?: number;
}) {
  // Hand-drawn architectural pillar: capital, fluted shaft, base.
  // Each stroke uses slightly imperfect curves and offsets so it
  // reads as drawn rather than constructed.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 110 320"
      className="h-56 w-auto sm:h-72"
      fill="none"
    >
      {/* baseline shadow */}
      <motion.path
        d="M 6 314 Q 55 312 104 316"
        stroke="#0c0f14"
        strokeOpacity="0.25"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, delay }}
      />

      {/* base, two stacked plinths */}
      <motion.path
        d="M 6 308 Q 55 304 104 308 L 102 286 Q 55 282 8 286 Z"
        stroke="#0c0f14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={accent}
        fillOpacity="0.55"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        whileInView={{ pathLength: 1, fillOpacity: 0.55 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, delay: delay + 0.05 }}
      />
      <motion.path
        d="M 14 286 Q 55 282 96 286 L 94 268 Q 55 264 16 268 Z"
        stroke="#0c0f14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: delay + 0.18 }}
      />

      {/* shaft outline (slight taper, slight wobble) */}
      <motion.path
        d="M 22 268 C 21 220, 19 130, 24 70 C 24 65, 30 60, 34 60 L 76 60 C 80 60, 86 65, 86 70 C 91 130, 89 220, 88 268"
        stroke="#0c0f14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.1, delay: delay + 0.28 }}
      />

      {/* fluting (3 vertical lines inside the shaft) */}
      {[36, 55, 74].map((cx, i) => (
        <motion.path
          key={cx}
          d={`M ${cx} 70 C ${cx + 0.5} 130, ${cx - 0.5} 220, ${cx} 264`}
          stroke="#0c0f14"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: delay + 0.55 + i * 0.08 }}
        />
      ))}

      {/* capital — wide top piece with collar */}
      <motion.path
        d="M 26 60 Q 55 56 84 60 L 86 48 Q 55 44 24 48 Z"
        stroke="#0c0f14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={accent}
        fillOpacity="0.4"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        whileInView={{ pathLength: 1, fillOpacity: 0.4 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, delay: delay + 0.4 }}
      />
      <motion.path
        d="M 4 48 Q 55 42 106 48 L 104 28 Q 55 22 6 28 Z"
        stroke="#0c0f14"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={accent}
        fillOpacity="0.7"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        whileInView={{ pathLength: 1, fillOpacity: 0.7 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, delay: delay + 0.5 }}
      />

      {/* small scribble arc above to suggest hand-drawn character */}
      <motion.path
        d="M 18 18 Q 55 6 96 14"
        stroke="#0c0f14"
        strokeOpacity="0.4"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, delay: delay + 0.7 }}
      />
    </svg>
  );
}

export function ChapterPillars() {
  return (
    <ChapterFrame
      number="10"
      eyebrow="What gets built"
      accent="#0c0f14"
      minHeight="100vh"
    >
      <div className="flex min-h-screen items-center px-6 py-16 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            Three pillars
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-tight text-brand-ink">
            Drawn from the same workshop floor.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <HandDrawnPillar accent={p.accent} delay={0.15 + i * 0.12} />
                <h3 className="mt-6 max-w-[12rem] font-display text-xl leading-snug text-brand-ink sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-brand-ink/75 sm:text-base">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <PullQuote
              quote="We're preparing students for an AI-driven world while keeping the model deeply human."
              attribution="Shiren Rattigan"
              role="Colossal Academy"
              accent="#ed6e2d"
              align="center"
            />
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 11 — The playbook ---------------- */


const playbookSamples: Array<{
  type: string;
  title: string;
  body: string;
  accent: string;
  rotate: number;
}> = [
  {
    type: "Rhythm",
    title: "Tuesday studio block",
    body: "A 90-minute pattern for student-led AI projects, with a 10-minute critique close.",
    accent: "#feffa0",
    rotate: -1.8,
  },
  {
    type: "Rubric",
    title: "Where AI helped",
    body: "A four-line scoring guide students use to credit AI in their own work.",
    accent: "#a4beeb",
    rotate: 1.4,
  },
  {
    type: "Tool",
    title: "Coach prompt library",
    body: "Eleven prompts teachers re-run when a chatbot stalls a student mid-task.",
    accent: "#d4fd63",
    rotate: -1.2,
  },
  {
    type: "Policy",
    title: "The Lab School pact",
    body: "A draft acceptable-use agreement co-written by students, adults, and families.",
    accent: "#96be53",
    rotate: 1.6,
  },
];

export function ChapterPlaybook() {
  return (
    <ChapterFrame
      number="11"
      eyebrow="The artifact"
      accent="#398239"
      minHeight="120vh"
    >
      <div className="min-h-screen px-6 py-16 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
                The artifact
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-brand-ink">
                Open-source playbook, 2028.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-ink/70">
                Not a how-to. A book of plays the cohort actually ran &mdash;
                what they kept, what they cut, and what they handed off.
              </p>

              <div className="relative mt-10">
                <PixelMound
                  className="absolute -left-3 -top-6 h-10 w-20 opacity-80"
                  color="#ce463f"
                />
                <FieldNote date="June 2027">
                  Foundations for the next 130 schools come from what these 13
                  learn together. Every rubric, rhythm, and rejected attempt
                  gets passed forward, drafts visible, so each team starts
                  further down the road than the last.
                </FieldNote>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ink/55">
                Inside the playbook · Sample artifacts
              </p>
              <h3 className="mt-2 font-display text-xl leading-snug text-brand-ink sm:text-2xl">
                A few pages from the draft.
              </h3>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {playbookSamples.map((s, i) => (
                  <motion.article
                    key={s.title}
                    initial={{ opacity: 0, y: 14, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
                    whileHover={{ rotate: 0, y: -4 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0.05 * i }}
                    className="relative overflow-hidden rounded-2xl border border-brand-ink/15 bg-brand-bg p-5 shadow-[3px_4px_0_rgba(12,15,20,0.08)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ backgroundColor: s.accent }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 -top-3 h-12 w-12 rounded-full opacity-60"
                      style={{ backgroundColor: s.accent }}
                    />
                    <div className="relative">
                      <span
                        className="inline-flex items-center rounded-full border border-brand-ink/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ink shadow-[2px_2px_0_rgba(12,15,20,0.15)]"
                        style={{ backgroundColor: s.accent }}
                      >
                        {s.type}
                      </span>
                      <h4 className="mt-3 font-display text-lg leading-snug text-brand-ink">
                        {s.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-brand-ink/75">
                        {s.body}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-ink/45">
                Working drafts &mdash; titles and edges will move before 2028.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 12 — Why Playlab ---------------- */

const partnershipTenets: {
  title: string;
  body: string;
  glyph: MotifKind;
  accent: string;
}[] = [
  {
    title: "Co-build, not deploy.",
    body: "Playlab engineers and designers sit alongside cohort teams for 24 months, shipping tools tailored to each school's model.",
    glyph: "rise",
    accent: "#feffa0",
  },
  {
    title: "Open by default.",
    body: "Every prototype, rubric, and rhythm ships back into the network. The work is the playbook.",
    glyph: "arc-arrow",
    accent: "#a4beeb",
  },
  {
    title: "A network already at work.",
    body: "Five regional ecosystems, 104 school systems, 7.3M students reached. The cohort writes inside that network, not around it.",
    glyph: "node",
    accent: "#efd8ef",
  },
  {
    title: "Schools as co-authors.",
    body: "We don't write about schools. The 13 cohort teams write with us, name what worked, and decide what gets handed off.",
    glyph: "loop",
    accent: "#d4fd63",
  },
];

export function ChapterWhyPlaylab() {
  return (
    <ChapterFrame
      number="12"
      eyebrow="Why Playlab"
      accent="#356fe5"
      minHeight="100vh"
    >
      <div className="flex min-h-screen items-center px-6 py-16 sm:px-12 md:pl-20 md:pr-20 lg:pr-28 lg:pl-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="relative lg:col-span-5">
              <Burst
                className="pointer-events-none absolute -right-2 -top-6 hidden h-16 w-16 opacity-90 sm:block"
                color="#0c0f14"
                outline="#fbf9f6"
                points={9}
              />
              <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
                The partnership
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-brand-ink">
                We build <span className="italic">with</span> you,
                <br />
                not for you.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-ink/75">
                AI Lab Schools is a 24-month partnership, not a license. Each
                cohort team gets the platform, the engineers, the network, and
                a co-author of their playbook.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {partnershipTenets.map((t, i) => (
                  <motion.li
                    key={t.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ delay: 0.06 * i, duration: 0.5 }}
                    className="relative rounded-2xl border border-brand-ink/10 bg-brand-cream/60 p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 -top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-bg"
                      style={{ boxShadow: "0 0 0 1px rgba(12,15,20,0.12)" }}
                    >
                      <MotifGlyph kind={t.glyph} size={18} />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 inline-block h-2 w-8 rounded-full"
                      style={{ backgroundColor: t.accent }}
                    />
                    <h3 className="mt-2 font-display text-xl leading-snug text-brand-ink">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-ink/75">
                      {t.body}
                    </p>
                  </motion.li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 13 — Stay connected ---------------- */
export function ChapterStayConnected() {
  return (
    <ChapterFrame
      number="13"
      eyebrow="Stay connected"
      accent="#0c0f14"
      minHeight="80vh"
    >
      <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-20 sm:px-12">
        <CutOut
          className="absolute left-10 top-12 h-20 w-28 rounded-md"
          color="#feffa0"
          rotate={-5}
        />
        <CutOut
          className="absolute bottom-20 right-10 h-24 w-32 rounded-full"
          color="#a4beeb"
          rotate={3}
        />
        <DotGrid
          className="absolute right-1/4 top-10 h-16 w-24 opacity-70"
          color="#ed6e2d"
          cols={8}
          rows={5}
        />
        <WavyHorizon
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 w-full"
          color="#398239"
          amp={6}
          segments={8}
        />
        <div className="relative mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            Stay connected
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-brand-ink">
            We&rsquo;re building this in the open.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-ink/75">
            Applications for the inaugural cohort are closed. If you lead a
            school, a district, or a fund, this is where to follow what gets
            built and tell us what you&rsquo;d run with.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://playlab.ai"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-ink bg-brand-bg px-7 py-3 font-display text-lg text-brand-ink transition-all hover:bg-brand-ink hover:text-brand-bg"
            >
              Ask the FAQ bot
            </a>
            <a
              href="mailto:support@playlab.ai"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-ink bg-brand-bg px-7 py-3 font-display text-lg text-brand-ink transition-all hover:bg-brand-ink hover:text-brand-bg"
            >
              Get in touch
            </a>
          </div>

        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- Compose all ---------------- */
export const ALL_CHAPTERS = [
  ChapterConviction,
  ChapterTheBet,
  ChapterChatbotEra,
  ChapterVocabulary,
  ChapterMandate,
  ChapterWhyCohort,
  ChapterMeetCohort,
  ChapterTwoPathways,
  ChapterRhythm,
  ChapterPillars,
  ChapterPlaybook,
  ChapterStayConnected,
];
