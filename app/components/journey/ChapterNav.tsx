import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export type NavChapter = {
  number: string; // "01" – "13"
  label: string;
};

export function ChapterNav({ chapters }: { chapters: NavChapter[] }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });
  const barScale = useTransform(smooth, [0, 1], [0, 1]);

  const [activeNumber, setActiveNumber] = useState<string>(chapters[0].number);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = chapters
      .map((c) => document.getElementById(`chapter-${c.number}`))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        const id = top.target.id;
        if (id?.startsWith("chapter-")) {
          setActiveNumber(id.replace("chapter-", ""));
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label="Chapter navigation"
      className="pointer-events-none fixed inset-y-0 right-0 z-50 hidden items-center md:flex"
    >
      <div className="pointer-events-auto mr-3 flex items-center gap-3 sm:mr-5">
        {/* vertical progress rail */}
        <div className="relative hidden h-64 w-px bg-brand-ink/15 lg:block">
          <motion.div
            className="absolute left-0 top-0 w-full origin-top bg-brand-ink/55"
            style={{ scaleY: barScale, height: "100%" }}
          />
        </div>

        {/* chapter list */}
        <ol className="flex flex-col items-center gap-1 rounded-2xl border border-brand-ink/10 bg-brand-bg/85 px-1.5 py-2 shadow-[0_4px_18px_rgba(12,15,20,0.06)] backdrop-blur-md">
          {chapters.map((c) => {
            const isActive = c.number === activeNumber;
            return (
              <li key={c.number} className="group relative flex">
                <a
                  href={`#chapter-${c.number}`}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Jump to chapter ${c.number}: ${c.label}`}
                  className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 font-mono text-[10px] tracking-[0.1em] transition-colors ${
                    isActive
                      ? "bg-brand-ink text-brand-bg"
                      : "text-brand-ink/55 hover:bg-brand-ink/10 hover:text-brand-ink"
                  }`}
                >
                  {c.number}
                </a>
                {/* hover/focus tooltip with chapter label */}
                <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded bg-brand-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-bg opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  {c.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
