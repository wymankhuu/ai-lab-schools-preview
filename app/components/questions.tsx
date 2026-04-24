export function Questions() {
  return (
    <div className="bg-[#e1e7d9] pb-12 pt-2 sm:pb-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl bg-[#fdfffc] px-8 py-10 text-center sm:px-12 sm:py-12">
          <h2 className="text-center font-heading text-4xl font-bold text-[#122134] sm:text-5xl">
            Still have questions?
          </h2>

          <p className="text-lg leading-relaxed text-[#122134] sm:text-xl">
            Check out our FAQ or reach out at{" "}
            <a
              href="mailto:support@playlab.ai?subject=AI Lab Schools Inquiry"
              className="font-semibold text-[#122134] underline hover:opacity-80"
            >
              support@playlab.ai
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
