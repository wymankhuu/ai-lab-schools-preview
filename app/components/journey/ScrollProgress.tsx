import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress({ totalChapters = 12 }: { totalChapters?: number }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });
  const current = useTransform(smooth, (v) =>
    String(Math.min(totalChapters, Math.max(1, Math.ceil(v * totalChapters)))).padStart(2, "0"),
  );
  const total = String(totalChapters).padStart(2, "0");
  const barScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-50 flex items-center gap-3 sm:right-8 sm:top-8">
      <div className="hidden h-px w-24 origin-left bg-brand-ink/15 sm:block">
        <motion.div
          className="h-full origin-left bg-brand-ink"
          style={{ scaleX: barScale }}
        />
      </div>
      <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/70">
        <motion.span>{current}</motion.span>
        <span className="text-brand-ink/30"> / {total}</span>
      </span>
    </div>
  );
}
