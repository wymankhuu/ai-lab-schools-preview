import type { MetaFunction } from "react-router";
import { CreativeLoop } from "~/components/journey/CreativeLoop";
import { ScrollProgress } from "~/components/journey/ScrollProgress";
import { ALL_CHAPTERS } from "~/components/journey/chapters";

export const meta: MetaFunction = () => [
  { title: "AI Lab Schools — The Journey" },
  {
    name: "description",
    content:
      "A scrolling story of why AI Lab Schools exists, who's in the inaugural cohort, and what they're building over 24 months.",
  },
];

export default function JourneyPage() {
  return (
    <div className="relative bg-brand-bg text-brand-ink antialiased">
      <ScrollProgress totalChapters={ALL_CHAPTERS.length} />
      <CreativeLoop />
      <div className="relative z-10">
        {ALL_CHAPTERS.map((Chapter, i) => (
          <Chapter key={i} />
        ))}
      </div>
    </div>
  );
}
