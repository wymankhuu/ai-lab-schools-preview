type Feature = {
  title: string;
  description: string;
  // Bright accent for the numbered marker + stripe (matches page pathway palette)
  accent: string;
  // Subtle tint applied to the card background so each pillar reads distinctly
  bg: string;
};

const features: Feature[] = [
  {
    title: "AI-Integrated Pedagogy",
    description:
      "Design where to harness AI to advance teaching & learning; and where not to use AI.",
    accent: "#ffd956",
    bg: "#fff8e1",
  },
  {
    title: "Agency-Driven Learning",
    description:
      "Systems where students become discerning creators, critics, and shapers of technology, not just consumers.",
    accent: "#61dcff",
    bg: "#e9faff",
  },
  {
    title: "Boundary-less Classrooms",
    description:
      "Learning that redefines when and where education takes place, extending to solve real-world problems.",
    accent: "#00cc72",
    bg: "#e6f7ee",
  },
];

export function WhatYouBuild() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <h3 className="text-2xl font-extrabold text-[#122134] sm:text-3xl">
            What you will build:
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative flex h-full flex-col items-start justify-start gap-4 overflow-hidden rounded-3xl p-8 sm:p-10"
                style={{ backgroundColor: feature.bg }}
              >
                {/* Top accent stripe */}
                <div
                  className="absolute inset-x-0 top-0 h-2"
                  style={{ backgroundColor: feature.accent }}
                  aria-hidden="true"
                />

                {/* Big numbered display */}
                <div
                  className="font-heading text-6xl font-bold leading-none sm:text-7xl"
                  style={{ color: feature.accent }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Short underline accent under the number */}
                <div
                  className="h-[3px] w-12 rounded-full"
                  style={{ backgroundColor: feature.accent }}
                  aria-hidden="true"
                />

                <h4 className="mt-2 text-2xl font-bold text-[#122134]">
                  {feature.title}
                </h4>
                <p className="text-xl leading-normal text-[#122134]">
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
