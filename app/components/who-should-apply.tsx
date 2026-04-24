export function WhoShouldApply() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <p className="text-base font-black uppercase tracking-wider text-[#0f6d37]">
              The Two Pathways
            </p>
            <h2 className="font-heading text-4xl font-bold leading-tight text-[#122134] sm:text-5xl">
              Two Pathways, One Cohort
            </h2>
            <p className="mt-1 max-w-2xl text-lg leading-relaxed text-[#122134]/90 sm:text-xl">
              Cohort 1 brings together teams with the authority to make
              structural changes to time, space, and staffing. Every school
              arrives through one of two pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PathwayCard
              title="THE NEW START"
              subtitle="Founding New Models"
              headerBg="#ffd956"
              bodyBg="#fff8e1"
              items={[
                {
                  label: "WHO THEY ARE",
                  body:
                    "Founders and teams launching new schools from the ground up, evolving past the idea of “school.”",
                },
                {
                  label: "THE OPPORTUNITY",
                  body: "Build new models where every system is designed for the AI age from Day 1.",
                },
                {
                  label: "THE GOAL",
                  body: "Launch fully operational, AI-integrated learning environments by Fall 2027.",
                },
              ]}
            />
            <PathwayCard
              title="THE PIVOT"
              subtitle="Transforming with AI"
              headerBg="#61dcff"
              bodyBg="#e9faff"
              items={[
                {
                  label: "WHO THEY ARE",
                  body: "Leaders of existing schools (district, charter, private, and micro) ready to radically re-architect their models.",
                },
                {
                  label: "THE OPPORTUNITY",
                  body: "Moving beyond efficiency to fundamentally reimagining the student experience within existing school communities.",
                },
                {
                  label: "THE GOAL",
                  body: "Executing structural transformations that shift power to learners and place human flourishing at the center.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type PathwayCardProps = {
  title: string;
  subtitle: string;
  headerBg: string;
  bodyBg: string;
  items: { label: string; body: string }[];
};

function PathwayCard({
  title,
  subtitle,
  headerBg,
  bodyBg,
  items,
}: PathwayCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl">
      <div
        className="px-6 py-5 sm:px-8"
        style={{ backgroundColor: headerBg }}
      >
        <h3 className="font-heading text-2xl font-bold text-[#122134]">
          {title}
        </h3>
        <p className="mt-0.5 text-lg italic text-[#122134]">{subtitle}</p>
      </div>
      <div
        className="flex flex-1 flex-col gap-4 px-6 py-6 sm:px-8"
        style={{ backgroundColor: bodyBg }}
      >
        {items.map((item) => (
          <div key={item.label}>
            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-[#122134]/85">
              {item.label}
            </p>
            <p className="text-base leading-relaxed text-[#122134] sm:text-lg">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
