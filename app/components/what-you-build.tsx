const features = [
  {
    title: "AI-Integrated Pedagogy",
    description:
      "Design where to harness AI to advance teaching & learning, and where not to use AI.",
  },
  {
    title: "Agency-Driven Learning",
    description:
      "Systems where students become discerning creators, critics, and shapers of technology, not just consumers.",
  },
  {
    title: "Boundary-less Classrooms",
    description:
      "Learning that redefines when and where education takes place, extending to solve real-world problems.",
  },
];

export function WhatYouBuild() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <p className="text-base font-black uppercase tracking-wider text-[#0f6d37]">
              What You Will Build
            </p>
            <h2 className="font-heading text-4xl font-bold leading-tight text-[#122134] sm:text-5xl">
              Three ways cohort schools move the field
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex h-full flex-col gap-4 rounded-3xl bg-[#fdfffc] p-8"
              >
                <div className="font-heading text-6xl font-bold leading-none text-[#00cc72] sm:text-7xl">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 h-[2px] w-10 bg-[#00cc72]/60" />
                <h3 className="mt-2 font-heading text-2xl font-bold leading-tight text-[#1a311d]">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-[#122134]/90">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
