import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ChapterFrameProps = {
  number: string;
  eyebrow: string;
  accent?: string;
  children: React.ReactNode;
  minHeight?: string;
};

export function ChapterFrame({
  number,
  eyebrow,
  accent = "#0c0f14",
  children,
  minHeight = "100vh",
}: ChapterFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const eyebrowOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ minHeight }}
      aria-label={eyebrow}
    >
      <motion.div
        style={{ opacity: eyebrowOpacity }}
        className="pointer-events-none sticky top-8 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-10 sm:px-10"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/60">
          {`[${number}]`}
        </span>
        <span
          className="font-mono text-[11px] tracking-[0.2em] uppercase"
          style={{ color: accent }}
        >
          {eyebrow}
        </span>
      </motion.div>
      <div className="relative">{children}</div>
    </section>
  );
}
