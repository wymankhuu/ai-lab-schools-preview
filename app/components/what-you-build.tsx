const features = [
  {
    title: "AI-Integrated Pedagogy",
    description:
      "Design where to harness AI to advance teaching & learning; and where not to use AI.",
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
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[40%_60%] lg:gap-12">
          {/* Empty left column */}
          <div></div>

          {/* Right column with all content */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-extrabold text-[#122134] sm:text-3xl">
              What you will build:
            </h3>

            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex max-w-[780px] flex-col items-start justify-start gap-4 rounded-3xl bg-[#fdfffc] p-8 sm:p-12"
              >
                <h4 className="text-2xl font-bold text-[#122134]">
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
