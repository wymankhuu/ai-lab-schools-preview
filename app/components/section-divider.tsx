export function SectionDivider() {
  return (
    <div className="bg-[#e1e7d9]" aria-hidden="true">
      <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ffd956]" />
        <span className="h-[2px] w-24 rounded-full bg-[#1a311d]/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#61dcff]" />
      </div>
    </div>
  );
}
