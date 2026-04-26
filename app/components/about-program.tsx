export function AboutProgram() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <p className="text-base font-black uppercase tracking-wider text-[#00cc72]">
              About the Program
            </p>
            <h2 className="font-heading text-4xl font-bold text-[#122134] sm:text-5xl">
              An active R&amp;D incubator for school design
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[40%_60%] lg:gap-10">
            <div className="flex items-start rounded-3xl bg-[#fdfffc] p-8 sm:p-10">
              <p className="text-xl font-semibold leading-snug text-[#122134] sm:text-2xl">
                A unique program, made for this moment, designed to take teams
                from idea to open doors.
              </p>
            </div>

            <div className="flex flex-col gap-5 rounded-3xl bg-[#fdfffc] p-8 text-base leading-relaxed text-[#122134] sm:p-10 sm:text-lg">
              <p>
                People have been trying to reimagine education for decades. Our
                aim is to harness AI and the challenges of a changing world as a
                new starting point for rethinking school, learning from past
                efforts and exploring where AI might open up new opportunities
                for design, depth, and scale.
              </p>
              <p>
                For this <span className="font-bold">Inaugural Cohort</span>, we
                selected 13 teams to design new school models that use AI as a
                foundational building block. We intentionally recruited a mix of{" "}
                <span className="font-bold">
                  district, charter, independent, private, and microschools, and
                  also included ideas that move beyond our current ideas of
                  &ldquo;school.&rdquo;
                </span>
              </p>
              <p>
                Together we design schedules, assessments, staffing, and
                pedagogy to prioritize human connection, creativity, and student
                agency. We build AI applications tailored to each team&rsquo;s
                vision and model, open to others to learn from and repurpose as
                they see fit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
