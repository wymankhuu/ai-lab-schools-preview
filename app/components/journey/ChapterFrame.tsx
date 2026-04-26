type ChapterFrameProps = {
  number: string;
  eyebrow: string;
  accent?: string;
  children: React.ReactNode;
  minHeight?: string;
};

export function chapterId(number: string) {
  return `chapter-${number}`;
}

export function ChapterFrame({
  number,
  eyebrow,
  accent = "#0c0f14",
  children,
  minHeight = "100vh",
}: ChapterFrameProps) {
  return (
    <section
      id={chapterId(number)}
      className="relative w-full scroll-mt-20 overflow-hidden"
      style={{ minHeight }}
      aria-label={eyebrow}
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-8 sm:px-10">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-ink/55">
          {`[${number}]`}
        </span>
        <span
          className="font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {eyebrow}
        </span>
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}
