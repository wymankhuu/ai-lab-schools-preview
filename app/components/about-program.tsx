export function AboutProgram() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl bg-[#fdfffc] px-8 py-10 sm:px-12 sm:py-12 lg:px-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-base font-black uppercase tracking-wider text-[#0f6d37]">
              About the Program
            </p>
            <h2 className="font-heading text-4xl font-bold leading-tight text-[#122134] sm:text-5xl">
              An active R&amp;D incubator for school design
            </h2>
            <p className="mt-2 max-w-2xl text-xl leading-relaxed text-[#122134]/90 sm:text-2xl">
              A unique program, made for this moment, designed to take teams
              from idea to open doors.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 text-base leading-relaxed text-[#122134]/90 sm:text-lg">
            <p>
              People have been trying to reimagine education for decades. Our
              aim is to harness AI and the challenges of a changing world as a
              new starting point for rethinking school, learning from past
              efforts and exploring where AI might open up new opportunities
              for design, depth, and scale.
            </p>
            <p>
              For this{" "}
              <span className="rounded bg-[#ffd956]/70 px-1.5 py-0.5 font-semibold text-[#1a311d]">
                Inaugural Cohort
              </span>
              , we selected 13 teams to design new school models that use AI
              as a foundational building block. We intentionally recruited a
              mix of{" "}
              <span className="rounded bg-[#61dcff]/55 px-1.5 py-0.5 font-semibold text-[#1a311d]">
                district, charter, independent, private, and microschools,
              </span>{" "}
              and also included ideas that move beyond our current ideas of
              &ldquo;school.&rdquo;
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
  );
}
