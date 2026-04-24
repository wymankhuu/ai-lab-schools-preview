import { FormattedMessage } from "react-intl";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "AI Lab Schools: The Experience" },
];


export default function AILabSchoolsExperiencePage() {
  return (
    <>
      <HeroWithOverview />
      <Rhythm />
      <WhatYouBuild />
      <WhatYouLeaveWith />
      <Footer />
    </>
  );
}

function HeroWithOverview() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="relative flex min-h-[240px] flex-col justify-start rounded-3xl bg-[#fdfffc] px-8 py-8 @container lg:col-span-3 lg:px-10">
            <p className="font-heading text-base font-black uppercase tracking-wider text-[#00cc72]">
              <FormattedMessage
                defaultMessage="The Experience"
                description="Eyebrow on the AI Lab Schools experience page hero"
              />
            </p>
            <h1 className="mt-4 font-heading text-[clamp(2.25rem,8cqw,4.5rem)] font-bold leading-[1.05] text-[#1a311d]">
              <FormattedMessage
                defaultMessage="A 24-month partnership to reimagine school"
                description="Main headline on the experience page"
              />
            </h1>
          </div>

          <div className="min-h-[240px] rounded-3xl bg-[#61dcff] p-8 sm:p-10 lg:col-span-2">
            <p className="text-xl leading-relaxed text-[#122134] sm:text-2xl">
              <FormattedMessage
                defaultMessage="The AI Lab Schools Network is designed to take teams from idea to open doors, and to leave the field with playbooks anyone can use."
                description="Hero subcopy on experience page describing the program's purpose"
              />
            </p>
          </div>

          <div className="rounded-3xl bg-[#ffd956] px-8 py-8 sm:px-10 sm:py-10 lg:col-span-5 lg:px-12 lg:py-12">
            <p className="text-xl leading-relaxed text-[#122134] sm:text-2xl lg:text-3xl">
              <FormattedMessage
                defaultMessage="Cohort schools are not our students. They are our co-builders. Across two years we design, test, and refine new models together, investing in the conditions that let courage and craft show up every day in classrooms."
                description="Overview paragraph on experience page"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Rhythm() {
  const beats = [
    {
      id: "coaching",
      label: (
        <FormattedMessage
          defaultMessage="Monthly coaching"
          description="Experience rhythm label: coaching"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="Strategy calls with your dedicated Playlab coach plus working sessions with engineers and designers when you need to build."
          description="Experience rhythm body: coaching"
        />
      ),
    },
    {
      id: "convenings",
      label: (
        <FormattedMessage
          defaultMessage="Quarterly convenings"
          description="Experience rhythm label: convenings"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="In-person intensives with the full cohort to prototype, critique, and leave with the next quarter's plan of record."
          description="Experience rhythm body: convenings"
        />
      ),
    },
    {
      id: "site-visits",
      label: (
        <FormattedMessage
          defaultMessage="Site visits"
          description="Experience rhythm label: site visits"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="Travel to peer schools already running bold AI-integrated practices to see the work up close and bring learnings home."
          description="Experience rhythm body: site visits"
        />
      ),
    },
    {
      id: "co-build",
      label: (
        <FormattedMessage
          defaultMessage="Co-built tools"
          description="Experience rhythm label: co-built tools"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="Work shoulder-to-shoulder with Playlab to ship AI apps tailored to your model, then share them with the wider network."
          description="Experience rhythm body: co-built tools"
        />
      ),
    },
    {
      id: "expert-network",
      label: (
        <FormattedMessage
          defaultMessage="Expert network"
          description="Experience rhythm label: expert network"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="On-tap access to leaders in future-ready education, pro-social AI, community co-design, and learning measurement."
          description="Experience rhythm body: expert network"
        />
      ),
    },
    {
      id: "public-playbook",
      label: (
        <FormattedMessage
          defaultMessage="Public playbook"
          description="Experience rhythm label: public playbook"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="A commitment, from day one, to document and open-source what works so the next wave of schools does not start from zero."
          description="Experience rhythm body: public playbook"
        />
      ),
    },
  ];

  return (
    <div className="bg-[#fdfffc] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <p className="text-base font-black uppercase tracking-wider text-[#00cc72]">
              <FormattedMessage
                defaultMessage="The Rhythm"
                description="Eyebrow above rhythm section on experience page"
              />
            </p>
            <h2 className="font-heading text-4xl font-bold text-[#122134] sm:text-5xl">
              <FormattedMessage
                defaultMessage="What shows up on your calendar"
                description="Heading above rhythm section on experience page"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beats.map((beat) => (
              <div
                key={beat.id}
                className="rounded-3xl border border-[#1a311d]/10 bg-[#e1e7d9]/50 p-8"
              >
                <p className="mb-3 text-base font-black uppercase tracking-wider text-[#1a311d]">
                  {beat.label}
                </p>
                <p className="text-lg leading-relaxed text-[#122134]">
                  {beat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatYouBuild() {
  const pillars = [
    {
      id: "ai-pedagogy",
      title: (
        <FormattedMessage
          defaultMessage="AI-integrated pedagogy"
          description="Experience pillar title: AI-integrated pedagogy"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="Rhythms of teaching and learning where AI amplifies human connection, creativity, and student agency, and never replaces them."
          description="Experience pillar body: pedagogy"
        />
      ),
      bg: "#ffd956",
    },
    {
      id: "agency",
      title: (
        <FormattedMessage
          defaultMessage="Agency-driven learning"
          description="Experience pillar title: agency-driven"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="Assessments, schedules, and staffing that put learners in charge of their path and give adults room to coach instead of control."
          description="Experience pillar body: agency"
        />
      ),
      bg: "#61dcff",
    },
    {
      id: "boundary-less",
      title: (
        <FormattedMessage
          defaultMessage="Boundary-less classrooms"
          description="Experience pillar title: boundary-less classrooms"
        />
      ),
      body: (
        <FormattedMessage
          defaultMessage="Learning that moves fluidly between your school, your community, and the tools students need to build their own futures."
          description="Experience pillar body: boundary-less"
        />
      ),
      bg: "#d4ddc5",
    },
  ];

  return (
    <div className="bg-[#e1e7d9] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <p className="text-base font-black uppercase tracking-wider text-[#00cc72]">
              <FormattedMessage
                defaultMessage="What Cohort Schools Build"
                description="Eyebrow above what-you-build section on experience page"
              />
            </p>
            <h2 className="font-heading text-4xl font-bold text-[#122134] sm:text-5xl">
              <FormattedMessage
                defaultMessage="Three pillars, designed to outlast the cohort"
                description="Heading on experience page for the three pillars"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col gap-4 rounded-3xl p-8"
                style={{ backgroundColor: pillar.bg }}
              >
                <h3 className="font-heading text-2xl font-bold text-[#1a311d]">
                  {pillar.title}
                </h3>
                <p className="text-base leading-relaxed text-[#122134]">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatYouLeaveWith() {
  return (
    <div className="bg-[#1a311d] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-base font-black uppercase tracking-wider text-[#ffd956]">
            <FormattedMessage
              defaultMessage="What Teams Leave With"
              description="Eyebrow on experience page outcomes section"
            />
          </p>
          <h2 className="mb-8 font-heading text-4xl font-bold text-white sm:text-5xl">
            <FormattedMessage
              defaultMessage="A running school, a network of peers, and a playbook the field can use"
              description="Outcomes heading on experience page"
            />
          </h2>
          <p className="text-xl leading-relaxed text-white/90 sm:text-2xl">
            <FormattedMessage
              defaultMessage="By the end of 24 months, every cohort school is running its new model with students. Every team has a bench of peers they trust. And every piece of what was learned (tools, rhythms, mistakes, and breakthroughs) is shared openly so the next school can start further down the road."
              description="Outcomes paragraph on experience page"
            />
          </p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#e1e7d9] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl bg-[#fdfffc] p-8 text-center sm:p-12">
          <h2 className="font-heading text-3xl font-bold text-[#122134] sm:text-4xl">
            <FormattedMessage
              defaultMessage="Meet the inaugural cohort"
              description="Footer heading linking back to cohort page"
            />
          </h2>
          <p className="text-lg leading-relaxed text-[#122134]">
            <FormattedMessage
              defaultMessage="See the 13 schools already running this experience."
              description="Footer subcopy linking back to cohort page"
            />
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/ai-lab-schools#meet-the-cohort"
              className="rounded-full border border-[#122134] bg-[#ffd956] px-9 py-2.5 font-medium text-[#122134] transition-opacity hover:opacity-90"
            >
              <FormattedMessage
                defaultMessage="Meet the Cohort"
                description="Button linking back to the cohort announcement section"
              />
            </a>
            <a
              href="https://playlab.ai"
              className="rounded-full border border-[#122134] bg-[#1a311d] px-9 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
            >
              <FormattedMessage
                defaultMessage="Return to Playlab"
                description="Button linking to main Playlab site"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
