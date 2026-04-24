import { ArrowRight, Check } from "lucide-react";
import { FormattedMessage } from "react-intl";

type TimelineItem = {
  id: string;
  date: string;
  description: React.ReactNode;
};

const journeyItems: TimelineItem[] = [
  {
    id: "applications-open",
    date: "February 3, 2026",
    description: (
      <FormattedMessage
        defaultMessage="Applications opened"
        description="Past milestone: applications period began"
      />
    ),
  },
  {
    id: "webinars",
    date: "February 4 & 10, 2026",
    description: (
      <FormattedMessage
        defaultMessage="Informational webinars with prospective schools"
        description="Past milestone: informational webinars held"
      />
    ),
  },
  {
    id: "applications-closed",
    date: "March 12, 2026",
    description: (
      <FormattedMessage
        defaultMessage="Applications closed with 51 schools applying"
        description="Past milestone: application window closed"
      />
    ),
  },
  {
    id: "interviews",
    date: "March 23 – April 10, 2026",
    description: (
      <FormattedMessage
        defaultMessage="Finalist interviews"
        description="Past milestone: interview window"
      />
    ),
  },
  {
    id: "cohort-announced",
    date: "April 30, 2026",
    description: (
      <FormattedMessage
        defaultMessage="Inaugural cohort announced"
        description="Past milestone: announcement of selected schools"
      />
    ),
  },
];

const aheadItems: TimelineItem[] = [
  {
    id: "kickoff",
    date: "July 2026",
    description: (
      <FormattedMessage
        defaultMessage="Program kickoff with all 13 teams"
        description="Future milestone: program begins"
      />
    ),
  },
  {
    id: "first-launches",
    date: "August 2026",
    description: (
      <FormattedMessage
        defaultMessage="First schools open their doors"
        description="Future milestone: first schools launch in August 2026"
      />
    ),
  },
  {
    id: "fall-pivots",
    date: "Fall 2026",
    description: (
      <FormattedMessage
        defaultMessage="Pivot schools begin structural transformation"
        description="Future milestone: pivot schools start their transformation work"
      />
    ),
  },
  {
    id: "power-opens",
    date: "August 2027",
    description: (
      <FormattedMessage
        defaultMessage="Power Public Schools opens in Georgia"
        description="Future milestone: Power Public Schools launch date"
      />
    ),
  },
  {
    id: "playbook",
    date: "2028",
    description: (
      <FormattedMessage
        defaultMessage="24-month partnership concludes; open-source playbook released"
        description="Future milestone: program conclusion and public playbook"
      />
    ),
  },
];

export function ImportantDates() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto w-full max-w-[980px] rounded-3xl bg-[#fdfffc] px-8 py-10 sm:px-10 lg:px-14 lg:py-12">
          <h2 className="font-heading text-4xl font-bold text-[#122134] sm:text-5xl lg:text-[56px]">
            <FormattedMessage
              defaultMessage="The Journey"
              description="Heading for the program timeline section"
            />
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 text-base font-black uppercase tracking-wider text-[#122134]">
                <FormattedMessage
                  defaultMessage="Journey So Far"
                  description="Subsection heading for completed timeline milestones"
                />
              </h3>
              <div className="flex flex-col gap-5 border-l-4 border-[#00cc72] pl-8">
                {journeyItems.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 font-heading text-base font-bold leading-[25px] text-[#122134]/70">
                      <Check
                        className="h-4 w-4 text-[#00cc72]"
                        strokeWidth={3}
                      />
                      {item.date}
                    </div>
                    <div className="font-body text-base leading-[26px] text-[#122134]/70">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-base font-black uppercase tracking-wider text-[#122134]">
                <FormattedMessage
                  defaultMessage="What's Ahead"
                  description="Subsection heading for upcoming timeline milestones"
                />
              </h3>
              <div className="flex flex-col gap-5 border-l-4 border-[#122134] pl-8">
                {aheadItems.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 font-heading text-base font-bold leading-[25px] text-[#122134]">
                      <ArrowRight
                        className="h-4 w-4 text-[#122134]"
                        strokeWidth={3}
                      />
                      {item.date}
                    </div>
                    <div className="font-body text-base leading-[26px] text-[#122134]">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
