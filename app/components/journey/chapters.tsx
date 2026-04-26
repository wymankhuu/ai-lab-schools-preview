import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { partners } from "../../data/partners";
import { ChapterFrame } from "./ChapterFrame";
import { JourneyMap, cohortPartners } from "./JourneyMap";

/* ---------------- 01 — Conviction ---------------- */
export function ChapterConviction() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <ChapterFrame number="01" eyebrow="Origin" minHeight="120vh">
      <div ref={ref} className="absolute inset-0">
        <motion.div
          style={{ opacity, y }}
          className="sticky top-0 flex h-screen items-center justify-center px-6 sm:px-12"
        >
          <div className="max-w-5xl">
            <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
              We started this journey with
            </p>
            <h1 className="mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.95] text-brand-ink">
              <em className="not-italic">a conviction.</em>
            </h1>
          </div>
        </motion.div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 02 — The bet ---------------- */
export function ChapterTheBet() {
  const lines = ["Not big tech.", "Not edtech.", "Not even us."];

  return (
    <ChapterFrame number="02" eyebrow="The bet" minHeight="160vh">
      <div className="sticky top-0 flex h-screen flex-col justify-center px-6 sm:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(2rem,5vw,4rem)] leading-tight text-brand-ink"
          >
            Educators would figure out what AI is for in education.
          </motion.h2>

          <ul className="mt-12 space-y-3 font-display text-3xl text-brand-ink/70 sm:text-4xl">
            {lines.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ delay: 0.2 + i * 0.25, duration: 0.6 }}
                className="relative"
              >
                <span className="relative inline-block">
                  {line}
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ delay: 0.5 + i * 0.25, duration: 0.6 }}
                    className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-brand-ink/70"
                  />
                </span>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ delay: 1.4, duration: 0.6 }}
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
function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

export function ChapterChatbotEra() {
  const materials = [
    "Evaluations",
    "Starter Inputs",
    "Knowledge Graphs",
    "Moderation",
    "Memory",
    "Model Selection",
    "Guided Prompting",
    "Live Training",
    "Maths Tooling",
    "Doc Editor",
  ];

  return (
    <ChapterFrame
      number="03"
      eyebrow="The first material"
      accent="#ed6e2d"
      minHeight="120vh"
    >
      <div className="sticky top-0 flex h-screen items-center px-6 sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
              Our chatbot era
            </p>
            <p className="mt-3 font-display text-2xl leading-snug text-brand-ink/80 sm:text-3xl">
              Chatbots were our first material. A great one. Educators taught us
              what AI can be in education.
            </p>
            <div className="mt-12 flex items-baseline gap-4">
              <span className="font-display text-[clamp(4rem,12vw,9rem)] font-medium leading-none text-brand-ink">
                <CountUp to={35000} />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-ink/60">
                builders / 15 months
              </span>
            </div>
          </div>

          <div className="flex flex-wrap content-center gap-2 lg:col-span-5">
            {materials.map((m, i) => (
              <motion.span
                key={m}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="rounded-full border border-brand-ink/15 bg-brand-cream px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-ink/80"
              >
                {m}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 04 — Expand the vocabulary ---------------- */
export function ChapterVocabulary() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const fan1 = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const fan2 = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const fan3 = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <ChapterFrame
      number="04"
      eyebrow="Expansion"
      accent="#356fe5"
      minHeight="140vh"
    >
      <div ref={ref} className="absolute inset-0">
        <div className="sticky top-0 flex h-screen items-center px-6 sm:px-12">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div style={{ y: titleY }}>
              <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
                Our work, expanded
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight text-brand-ink">
                More kinds of material. More ways to shape them.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-brand-ink/70">
                Chatbots were the start. The next material is bigger,
                stranger, and harder to name. So we keep building it with the
                people closest to learners.
              </p>
            </motion.div>
            <div className="flex justify-center">
              <svg
                viewBox="0 0 400 400"
                className="h-72 w-72 sm:h-96 sm:w-96"
                fill="none"
              >
                <motion.path
                  d="M 200 360 C 60 280, 60 120, 200 40"
                  stroke="#0c0f14"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: fan1 }}
                />
                <motion.path
                  d="M 200 360 C 200 280, 200 120, 200 40"
                  stroke="#356fe5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: fan2 }}
                />
                <motion.path
                  d="M 200 360 C 340 280, 340 120, 200 40"
                  stroke="#ed6e2d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: fan3 }}
                />
                <motion.path
                  d="M 200 360 C 130 280, 130 200, 200 200 C 270 200, 270 280, 200 360 Z"
                  stroke="#0c0f14"
                  strokeOpacity="0.25"
                  strokeWidth="1.25"
                  fill="none"
                  style={{ pathLength: fan1 }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 05 — The mandate ---------------- */
export function ChapterMandate() {
  const steps = [
    {
      verb: "Design",
      body: "the raw material that lets people make.",
    },
    {
      verb: "Surface",
      body: "what works from what they build.",
    },
    {
      verb: "Translate",
      body: "those discoveries into reusable artifacts for everyone else.",
    },
  ];

  return (
    <ChapterFrame
      number="05"
      eyebrow="The mandate"
      accent="#398239"
      minHeight="180vh"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center px-6 sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
            Our mandate
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-brand-ink">
            <CountUp to={50} />
            <span className="text-accent-forest"> million</span> educators.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-ink/70">
            Breakthroughs in education won&rsquo;t come from us. They&rsquo;ll
            come from the educators who, given the right tools and conditions,
            figure out what AI is for.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.verb}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
                className="border-t border-brand-ink/15 pt-5"
              >
                <span className="font-mono text-[11px] tracking-[0.25em] text-brand-ink/50">
                  {`[${i + 1}]`}
                </span>
                <h3 className="mt-3 font-display text-3xl text-brand-ink">
                  {step.verb}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-brand-ink/70">
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leftX = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-22%"]);
  const rightX = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "22%"]);

  return (
    <ChapterFrame
      number="06"
      eyebrow="The next material"
      accent="#ce463f"
      minHeight="160vh"
    >
      <div ref={ref} className="absolute inset-0">
        <div className="sticky top-0 flex h-screen items-center px-6 sm:px-12">
          <div className="mx-auto w-full max-w-6xl">
            <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
              Why a cohort
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6.5vw,5.25rem)] leading-tight text-brand-ink">
              <motion.span style={{ x: leftX }} className="inline-block pr-2">
                Our next
              </motion.span>
              <motion.span style={{ x: rightX }} className="inline-block">
                material
              </motion.span>
              <br />
              is school itself.
            </h2>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-3xl">
              {[
                ["13", "teams"],
                ["24", "months"],
                ["1", "playbook"],
              ].map(([n, label]) => (
                <div key={label} className="border-t border-brand-ink/15 pt-4">
                  <div className="font-display text-5xl text-brand-ink">
                    {n}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink/60">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 07 — Meet the cohort ---------------- */
export function ChapterMeetCohort() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = cohortPartners.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
      setActiveIndex(idx);
    });
    return () => unsub();
  }, [scrollYProgress, total]);

  const litCount = activeIndex + 1;
  const active = cohortPartners[activeIndex];

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ minHeight: `${Math.max(180, total * 24)}vh` }}
      aria-label="Meet the cohort"
    >
      <div className="pointer-events-none sticky top-8 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-10 sm:px-10">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/60">
          [07]
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-ink/60">
          The cohort
        </span>
      </div>

      <div className="sticky top-0 flex h-screen items-center px-6 sm:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <JourneyMap litCount={litCount} highlightId={active?.id ?? null} />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
              Cohort 1 / {String(total).padStart(2, "0")} schools
            </p>
            <div className="mt-4 min-h-[280px]">
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 bg-brand-bg"
                        style={{
                          borderColor:
                            active.pathway === "Launch"
                              ? "#feffa0"
                              : "#a4beeb",
                        }}
                      >
                        <img
                          src={active.logo}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span
                        className="rounded-full border border-brand-ink px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-ink"
                        style={{
                          backgroundColor:
                            active.pathway === "Launch"
                              ? "#feffa0"
                              : "#a4beeb",
                        }}
                      >
                        {active.pathway}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-brand-ink sm:text-4xl">
                      {active.school}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-brand-ink/55">
                      {active.city}, {active.state}
                    </p>
                    <p className="mt-5 text-base leading-relaxed text-brand-ink/80">
                      {active.descriptor}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex gap-1.5">
              {cohortPartners.map((p, i) => (
                <span
                  key={p.id}
                  className="h-1 flex-1 rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      i <= activeIndex ? "#0c0f14" : "rgba(12,15,20,0.12)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 08 — Two pathways ---------------- */
export function ChapterTwoPathways() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yellowX = useTransform(scrollYProgress, [0, 0.55], ["-60%", "0%"]);
  const blueX = useTransform(scrollYProgress, [0, 0.55], ["60%", "0%"]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.85, 1],
    [0, 1, 1, 0],
  );

  return (
    <ChapterFrame
      number="08"
      eyebrow="Two pathways"
      accent="#283f88"
      minHeight="180vh"
    >
      <div ref={ref} className="absolute inset-0">
        <div className="sticky top-0 flex h-screen flex-col justify-center px-6 sm:px-12">
          <motion.div
            style={{ opacity: titleOpacity }}
            className="mx-auto w-full max-w-6xl"
          >
            <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
              Two pathways, one cohort
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight text-brand-ink">
              Launch from scratch. Or pivot what already exists.
            </h2>

            <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                style={{ x: yellowX }}
                className="rounded-3xl bg-accent-yellow p-8 sm:p-10"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink">
                  The new start
                </span>
                <h3 className="mt-3 font-display text-3xl text-brand-ink">
                  Launch
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-ink/80">
                  Founders building schools from the ground up. Every system
                  designed for the AI age from day one.
                </p>
              </motion.div>
              <motion.div
                style={{ x: blueX }}
                className="rounded-3xl bg-accent-blue p-8 sm:p-10"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink">
                  The pivot
                </span>
                <h3 className="mt-3 font-display text-3xl text-brand-ink">
                  Pivot
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-ink/80">
                  Leaders of existing schools radically rearchitecting time,
                  space, and staffing for the students they already serve.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </ChapterFrame>
  );
}

/* ---------------- 09 — The 24-month rhythm ---------------- */
const milestones = [
  { date: "Feb 2026", body: "Applications opened" },
  { date: "Mar 2026", body: "51 schools applied" },
  { date: "Apr 2026", body: "13 schools selected" },
  { date: "Jul 2026", body: "Cohort kickoff" },
  { date: "Aug 2026", body: "First Launch schools open" },
  { date: "Fall 2026", body: "Pivot transformations begin" },
  { date: "Aug 2027", body: "Power Public Schools opens in Georgia" },
  { date: "Jun 2028", body: "Open-source playbook released" },
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
      style={{ minHeight: `${milestones.length * 70}vh` }}
      aria-label="The 24-month rhythm"
    >
      <div className="pointer-events-none sticky top-8 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-10 sm:px-10">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/60">
          [09]
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-orange">
          The rhythm
        </span>
      </div>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
            24 months of work
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-brand-ink">
            The cadence of the cohort.
          </h2>
        </div>
        <motion.div style={{ x }} className="mt-12 flex w-full">
          {milestones.map((m, i) => (
            <div
              key={m.date}
              className="flex w-screen shrink-0 items-center px-6 sm:px-12"
            >
              <div className="mx-auto flex w-full max-w-6xl items-end gap-8">
                <span className="font-display text-[clamp(4rem,11vw,9rem)] font-medium leading-none text-brand-ink/15">
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
];

export function ChapterPillars() {
  return (
    <ChapterFrame
      number="10"
      eyebrow="What gets built"
      accent="#0c0f14"
      minHeight="220vh"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center px-6 sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
            Three pillars
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ delay: 0.15 * i, duration: 0.7 }}
                className="rounded-3xl border border-brand-ink/10 bg-brand-cream p-7"
              >
                <span
                  className="inline-block h-2 w-12 rounded-full"
                  style={{ backgroundColor: p.accent }}
                />
                <h3 className="mt-4 font-display text-2xl leading-snug text-brand-ink sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-ink/75">
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineY = useTransform(scrollYProgress, [0, 1], ["20%", "-90%"]);

  const draftLines = [
    { strike: true, text: "What we know about reimagining school." },
    { strike: false, text: "What 13 teams learned in two years." },
    { strike: true, text: "Five rules for AI in the classroom." },
    { strike: false, text: "13 working models. 13 sets of seams to look at." },
    { strike: false, text: "An invitation to copy, fork, and remix." },
    { strike: true, text: "Best practices, finalized." },
    { strike: false, text: "A playbook with edits visible." },
    { strike: false, text: "Rough edges stay rough." },
  ];

  return (
    <ChapterFrame
      number="11"
      eyebrow="The artifact"
      accent="#398239"
      minHeight="180vh"
    >
      <div ref={ref} className="absolute inset-0">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 sm:px-12">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
                The artifact
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight text-brand-ink">
                Open-source playbook, 2028.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-ink/70">
                We&rsquo;re not in the answers business. We&rsquo;re in the
                show-your-work business. The playbook ships with edits visible
                so the next school can start further down the road.
              </p>
            </div>
            <div className="relative lg:col-span-7">
              <div className="relative h-[60vh] overflow-hidden rounded-3xl border border-brand-ink/15 bg-brand-cream/60">
                <motion.div
                  style={{ y: lineY }}
                  className="absolute inset-x-0 top-0 flex flex-col gap-6 px-8 py-10 font-display text-2xl leading-snug text-brand-ink/85"
                >
                  {[...draftLines, ...draftLines].map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.strike
                          ? "text-brand-ink/40 line-through decoration-accent-red decoration-2"
                          : ""
                      }
                    >
                      {line.text}
                    </p>
                  ))}
                </motion.div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-bg to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-bg to-transparent"
                />
              </div>
            </div>
          </div>
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
      minHeight="100vh"
    >
      <div className="flex min-h-screen items-center justify-center px-6 py-24 sm:px-12">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-brand-ink/50">
            Stay connected
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-brand-ink">
            We&rsquo;re building this in the open.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/70">
            Applications for the inaugural cohort are closed. We&rsquo;ll share
            the cohort&rsquo;s work, open-source playbooks, and information
            about future cohorts as the partnership unfolds.
          </p>

          <div className="mt-10 flex flex-col items-center gap-6">
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

          <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ink/45">
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

// Suppress unused warnings for shared imports kept for future tweaks
void useMemo;
void partners;
