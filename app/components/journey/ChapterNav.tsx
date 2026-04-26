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
        // Pick the topmost intersecting section closest to the viewport top.
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
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center"
    >
      <div className="pointer-events-auto mt-3 flex w-full max-w-[min(92vw,860px)] items-center gap-3 rounded-full border border-brand-ink/10 bg-brand-bg/85 px-3 py-1.5 shadow-[0_4px_18px_rgba(12,15,20,0.06)] backdrop-blur-md sm:mt-4 sm:px-4 sm:py-2">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-brand-ink/45 sm:inline">
          Journey
        </span>
        <ol className="flex flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1">
          {chapters.map((c) => {
            const isActive = c.number === activeNumber;
            return (
              <li key={c.number} className="flex shrink-0">
                <a
                  href={`#chapter-${c.number}`}
                  title={c.label}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 font-mono text-[10px] tracking-[0.1em] transition-colors ${
                    isActive
                      ? "bg-brand-ink text-brand-bg"
                      : "text-brand-ink/55 hover:bg-brand-ink/10 hover:text-brand-ink"
                  }`}
                >
                  {c.number}
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="pointer-events-none mx-auto mt-1 h-px w-full max-w-[min(92vw,860px)] origin-left bg-brand-ink/10">
        <motion.div
          className="h-full origin-left bg-brand-ink/45"
          style={{ scaleX: barScale }}
        />
      </div>
    </nav>
  );
}
