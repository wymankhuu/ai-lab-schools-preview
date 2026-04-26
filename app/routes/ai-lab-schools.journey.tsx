import type { MetaFunction } from "react-router";
import { CreativeLoop } from "~/components/journey/CreativeLoop";
import { ScrollProgress } from "~/components/journey/ScrollProgress";
import {
  ChapterChatbotEra,
  ChapterConviction,
  ChapterMandate,
  ChapterMeetCohort,
  ChapterPillars,
  ChapterPlaybook,
  ChapterRhythm,
  ChapterStayConnected,
  ChapterTheBet,
  ChapterTwoPathways,
  ChapterVocabulary,
  ChapterWhyCohort,
  QuestionHook,
} from "~/components/journey/chapters";

export const meta: MetaFunction = () => [
  { title: "AI Lab Schools — The Journey" },
  {
    name: "description",
    content:
      "A scrolling story of why AI Lab Schools exists, who's in the inaugural cohort, and what they're building over 24 months.",
  },
];

const TOTAL_CHAPTERS = 12;

export default function JourneyPage() {
  return (
    <div className="relative bg-brand-bg text-brand-ink antialiased">
      <ScrollProgress totalChapters={TOTAL_CHAPTERS} />
      <CreativeLoop />
      <div className="relative z-10">
        <ChapterConviction />

        <QuestionHook
          text="What if school were designed for the AI age, not adapted to it?"
          emphasis="designed"
          accent="#ed6e2d"
        />

        <ChapterTheBet />
        <ChapterChatbotEra />
        <ChapterVocabulary />
        <ChapterMandate />

        <QuestionHook
          text="Where do new models of school actually get built?"
          emphasis="actually"
          accent="#356fe5"
        />

        <ChapterWhyCohort />
        <ChapterMeetCohort />

        <QuestionHook
          text="Start from scratch, or change the school you already love?"
          emphasis="already love"
          accent="#398239"
        />

        <ChapterTwoPathways />
        <ChapterRhythm />
        <ChapterPillars />
        <ChapterPlaybook />

        <QuestionHook
          text="What can your school start with what they leave behind?"
          emphasis="leave behind"
          accent="#ce463f"
        />

        <ChapterStayConnected />
      </div>
    </div>
  );
}
