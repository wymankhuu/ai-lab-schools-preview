import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChapterFrame } from "./ChapterFrame";
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
          className="sticky top-0 flex h-screen items-center justify-center px-6 sm:px-12 md:pl-20 md:pr-12 lg:pl-24"
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
            <div className="relative">
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
            </div>
          </div>
        </motion.div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 02 — The bet ---------------- */
export function ChapterTheBet() {
  const lines = ["Not big tech.", "Not edtech.", "Not even us."];
  const colors = ["#356fe5", "#ed6e2d", "#398239"];

  return (
    <ChapterFrame
      number="02"
      eyebrow="The bet"
      accent="#356fe5"
      minHeight="100vh"
    >
      <div className="flex min-h-screen items-center px-6 py-16 sm:px-12">
        <div className="relative mx-auto w-full max-w-5xl">
          <CutOut
            className="absolute right-0 top-0 -z-0 h-24 w-24 rounded-full sm:h-32 sm:w-32"
            color="#a4beeb"
            rotate={0}
          />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="relative font-display text-[clamp(2rem,5vw,4rem)] leading-tight text-brand-ink"
          >
            Educators would figure out what AI is for in education.
          </motion.h2>

          <ul className="mt-10 space-y-3 font-display text-3xl text-brand-ink/70 sm:text-4xl">
            {lines.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ delay: 0.15 + i * 0.18, duration: 0.5 }}
                className="relative"
              >
                <span className="relative inline-block">
                  {line}
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ delay: 0.4 + i * 0.18, duration: 0.5 }}
                    className="absolute left-0 top-1/2 h-[2.5px] w-full origin-left rounded-full"
                    style={{ backgroundColor: colors[i] }}
                  />
                </span>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="font-display text-4xl text-brand-ink sm:text-5xl"
            >
              Educators.
            </motion.li>
          </ul>
        </div>
      </div>
    </ChapterFrame>
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
      <div className="flex min-h-screen items-center px-6 py-16 sm:px-12 md:pl-20 md:pr-12 lg:pl-24">
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

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              <StatTile
                number={
                  <>
                    <CountUp to={7.3} />
                    <span className="text-accent-orange">M</span>
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
                    <CountUp to={14100} />
                    <span className="text-accent-forest">+</span>
                  </>
                }
                label="Students built AI apps"
                accent="#398239"
                delay={0.25}
              />
              <StatTile
                number={
                  <>
                    <CountUp to={88} />{" "}
                    <span className="text-brand-ink/40">/</span>{" "}
                    <CountUp to={94} />
                  </>
                }
                label="NPS · educators / partners"
                accent="#f4baef"
                delay={0.35}
              />
            </div>

            <p className="mt-6 max-w-xl font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink/55">
              In 2025 · TN · ID · IN · Central TX · DC · MD · VA
            </p>
          </div>

          <div className="flex flex-wrap content-center gap-2 lg:col-span-5">
            {materials.map((m, i) => (
              <motion.span
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ delay: 0.04 * i, duration: 0.4 }}
                className="rounded-full border border-brand-ink/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-ink"
                style={{ backgroundColor: m.color }}
              >
                {m.label}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </ChapterFrame>
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
        <div className="sticky top-0 flex h-screen items-center px-6 sm:px-12 md:pl-20 md:pr-12 lg:pl-24">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div style={{ y: titleY }} className="relative">
              <ScribbleArc
                className="absolute -left-2 -top-6 h-10 w-48 sm:w-64"
                color="#356fe5"
                d="M 0 60 Q 70 0 150 30 T 280 25"
              />
              <p className="relative font-mono text-xs tracking-[0.25em] text-brand-ink/55">
                The ecosystem
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight text-brand-ink">
                More material. More makers. More bridges between them.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-ink/75">
                Chatbots were the start. The next chapter is a network of
                people, tools, and schools that pass work between them. The
                point isn&rsquo;t any one node, it&rsquo;s the connections.
              </p>
            </motion.div>
            <div className="relative flex justify-center">
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
    { verb: "Design", body: "the raw material that lets people make.", color: "#feffa0" },
    { verb: "Surface", body: "what works from what they build.", color: "#a4beeb" },
    {
      verb: "Translate",
      body: "those discoveries into reusable artifacts.",
      color: "#efd8ef",
    },
  ];

  return (
    <ChapterFrame
      number="05"
      eyebrow="The mandate"
      accent="#398239"
      minHeight="110vh"
    >
      <div className="relative flex min-h-screen items-center px-6 py-16 sm:px-12 md:pl-20 md:pr-12 lg:pl-24">
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
            AI is for.
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
                  className="absolute left-0 top-0 h-[3px] w-12 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
                <span className="font-mono text-[11px] tracking-[0.25em] text-brand-ink/55">
                  {`[${i + 1}]`}
                </span>
                <h3 className="mt-2 font-display text-3xl text-brand-ink">
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
      minHeight="100vh"
    >
      <div className="relative flex min-h-screen items-center justify-center px-6 py-24 sm:px-12 md:pl-20 md:pr-12 lg:pl-24">
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
  return (
    <section
      className="relative w-full"
      aria-label="Meet the cohort"
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-8 sm:px-10 md:pl-20 md:pr-10 lg:pl-24">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/55">
          [07]
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink/55">
          The cohort
        </span>
      </div>

      {/* Hero: full map with every pin lit */}
      <div className="px-6 pt-24 pb-10 sm:px-12 sm:pt-28 md:pl-20 md:pr-12 lg:pl-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
                Cohort 1 / 13 schools
              </p>
              <h2 className="mt-2 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-tight text-brand-ink">
                Meet the cohort.
              </h2>
            </div>
            <div className="flex gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink/65">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full border border-brand-ink"
                  style={{ backgroundColor: "#feffa0" }}
                />
                Launch
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full border border-brand-ink"
                  style={{ backgroundColor: "#a4beeb" }}
                />
                Pivot
              </span>
            </div>
          </div>

          <div className="mt-8">
            <JourneyMap litCount={cohortPartners.length} />
          </div>
        </div>
      </div>

      {/* Windy-road school cards: alternate sides */}
      <div className="px-6 py-12 sm:px-12 md:pl-20 md:pr-12 lg:pl-24">
        <div className="mx-auto w-full max-w-5xl">
          <ul className="space-y-6">
            {cohortPartners.map((p, i) => {
              const accent = p.pathway === "Launch" ? "#feffa0" : "#a4beeb";
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45 }}
                  className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <article
                    className={`flex w-full max-w-2xl items-start gap-5 rounded-2xl border border-brand-ink/10 bg-brand-bg p-6 sm:p-7 ${
                      isLeft ? "" : "text-right"
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-2 ${isLeft ? "" : "order-2 items-end"}`}
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
                        className="rounded-full border border-brand-ink px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-ink"
                        style={{ backgroundColor: accent }}
                      >
                        {p.pathway}
                      </span>
                    </div>
                    <div className={`flex-1 ${isLeft ? "" : "order-1"}`}>
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
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
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
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 280 220"
      className="h-44 w-full sm:h-56"
      fill="none"
    >
      {/* faded original course */}
      <motion.line
        x1="10"
        y1="180"
        x2="270"
        y2="180"
        stroke="#0c0f14"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      {/* the new heading */}
      <motion.path
        d="M 10 180 Q 130 180 150 130 T 230 30"
        stroke="#0c0f14"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 1.1, delay: 0.4 }}
      />
      {/* pivot point */}
      <motion.circle
        cx="150"
        cy="130"
        r="6"
        fill="#0c0f14"
        initial={{ scale: 0 }}
        animate={{ scale: inView ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.85 }}
      />
      {/* arrowhead */}
      <motion.path
        d="M 220 38 L 232 28 L 234 44"
        stroke="#0c0f14"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 1.4 }}
      />
    </svg>
  );
}

export function ChapterTwoPathways() {
  return (
    <section
      className="relative w-full"
      aria-label="Two pathways, one cohort"
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-8 sm:px-10 md:pl-20 md:pr-10 lg:pl-24">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/55">
          [08]
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-navy">
          Two pathways
        </span>
      </div>

      {/* Intro */}
      <div className="px-6 pt-24 pb-6 sm:px-12 sm:pt-28 md:pl-20 md:pr-12 lg:pl-24">
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
      <div className="bg-accent-yellow/55 px-6 py-16 sm:px-12 sm:py-20 md:pl-20 md:pr-12 lg:pl-24">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ink">
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
      <div className="bg-accent-blue/55 px-6 py-16 sm:px-12 sm:py-20 md:pl-20 md:pr-12 lg:pl-24">
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
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ink">
              Pathway 02 / The pivot
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(milestones.length - 1) * 100}%`],
  );

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ minHeight: `${milestones.length * 28}vh` }}
      aria-label="The 24-month rhythm"
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-8 sm:px-10 md:pl-20 md:pr-10 lg:pl-24">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/55">
          [09]
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-orange">
          The rhythm
        </span>
      </div>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-12 md:pl-20 md:pr-12 lg:pl-24">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            24 months of work
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-brand-ink">
            The cadence of the cohort.
          </h2>
        </div>
        <motion.div style={{ x }} className="mt-10 flex w-full">
          {milestones.map((m, i) => (
            <div
              key={m.date}
              className="flex w-screen shrink-0 items-center px-6 sm:px-12 md:pl-20 md:pr-12 lg:pl-24"
            >
              <div className="mx-auto flex w-full max-w-6xl items-end gap-8">
                <span
                  className="font-display text-[clamp(4rem,11vw,9rem)] font-medium leading-none"
                  style={{ color: m.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="border-l border-brand-ink/30 pl-6">
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-ink/60">
                    {m.date}
                  </div>
                  <div className="mt-2 font-display text-3xl leading-tight text-brand-ink sm:text-5xl">
                    {m.body}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
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
    shape: "scribble",
  },
  {
    title: "Agency-driven learning",
    body: "Students as creators and critics of the technology. Adults as coaches.",
    accent: "#a4beeb",
    shape: "grid",
  },
  {
    title: "Boundary-less classrooms",
    body: "Learning that moves between school, community, and the tools students bring.",
    accent: "#d4fd63",
    shape: "cutout",
  },
] as const;

export function ChapterPillars() {
  return (
    <ChapterFrame
      number="10"
      eyebrow="What gets built"
      accent="#0c0f14"
      minHeight="110vh"
    >
      <div className="flex min-h-screen items-center px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            Three pillars
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ delay: 0.1 * i, duration: 0.55 }}
                className="relative overflow-hidden rounded-3xl border border-brand-ink/10 bg-brand-cream p-7"
              >
                {p.shape === "scribble" && (
                  <ScribbleArc
                    className="absolute -right-3 -top-2 h-10 w-32"
                    color={p.accent}
                    d="M 0 60 Q 60 5 140 30 T 280 25"
                  />
                )}
                {p.shape === "grid" && (
                  <DotGrid
                    className="absolute -right-3 -top-3 h-16 w-16 opacity-90"
                    color={p.accent}
                    cols={6}
                    rows={6}
                    gap={10}
                    dot={2.4}
                  />
                )}
                {p.shape === "cutout" && (
                  <CutOut
                    className="absolute -right-3 -top-3 h-12 w-16 rounded-md"
                    color={p.accent}
                    rotate={8}
                  />
                )}
                <span
                  className="inline-block h-2 w-12 rounded-full"
                  style={{ backgroundColor: p.accent }}
                />
                <h3 className="mt-4 font-display text-2xl leading-snug text-brand-ink sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-ink/80">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 11 — The playbook ---------------- */
export function ChapterPlaybook() {
  const draftLines = [
    "What 13 teams learned in two years.",
    "13 working models. 13 sets of seams to look at.",
    { strike: true, text: "Best practices, finalized." },
    "An invitation to copy, fork, and remix.",
    "A playbook with edits visible.",
    "Rough edges stay rough.",
  ] as Array<string | { strike: boolean; text: string }>;

  return (
    <ChapterFrame
      number="11"
      eyebrow="The artifact"
      accent="#398239"
      minHeight="100vh"
    >
      <div className="flex min-h-screen items-center px-6 py-16 sm:px-12 md:pl-20 md:pr-12 lg:pl-24">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
              The artifact
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-brand-ink">
              Open-source playbook, 2028.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-ink/70">
              We&rsquo;re not in the answers business. We&rsquo;re in the
              show-your-work business. The playbook ships with edits visible
              so the next school can start further down the road.
            </p>
          </div>

          <ul className="space-y-3 lg:col-span-7 lg:pt-2">
            {draftLines.map((line, i) => {
              const text = typeof line === "string" ? line : line.text;
              const strike = typeof line === "string" ? false : line.strike;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ delay: 0.06 * i, duration: 0.5 }}
                  className="flex items-baseline gap-3 font-display text-lg leading-snug sm:text-xl"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-brand-ink/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={
                      strike
                        ? "text-brand-ink/35 line-through decoration-brand-ink/40 decoration-1"
                        : "text-brand-ink/85"
                    }
                  >
                    {text}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 12 — Stay connected ---------------- */
export function ChapterStayConnected() {
  return (
    <ChapterFrame
      number="12"
      eyebrow="Stay connected"
      accent="#0c0f14"
      minHeight="80vh"
    >
      <div className="relative flex min-h-[80vh] items-center justify-center px-6 py-20 sm:px-12">
        <CutOut
          className="absolute left-10 top-12 h-20 w-28 rounded-md"
          color="#feffa0"
          rotate={-5}
        />
        <CutOut
          className="absolute bottom-12 right-10 h-24 w-32 rounded-full"
          color="#a4beeb"
          rotate={3}
        />
        <DotGrid
          className="absolute right-1/4 top-10 h-16 w-24 opacity-70"
          color="#ed6e2d"
          cols={8}
          rows={5}
        />
        <div className="relative mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/55">
            Stay connected
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-brand-ink">
            We&rsquo;re building this in the open.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-ink/75">
            Applications for the inaugural cohort are closed. We&rsquo;ll share
            the cohort&rsquo;s work, open-source playbooks, and information
            about future cohorts as the partnership unfolds.
          </p>

          <div className="mt-8 flex flex-col items-center gap-5">
            <a
              href="https://playlab.ai"
              className="font-display text-2xl text-brand-ink underline-offset-4 transition-all hover:underline"
            >
              Ask the FAQ bot &rarr;
            </a>
            <a
              href="mailto:support@playlab.ai"
              className="font-display text-2xl text-brand-ink underline-offset-4 transition-all hover:underline"
            >
              Get in touch &rarr;
            </a>
          </div>

          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ink/45">
            End of journey 01 / 12 / 2026
          </p>
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
