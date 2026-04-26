import type { MetaFunction } from "react-router";
import { ChapterNav } from "~/components/journey/ChapterNav";
import { CreativeLoop } from "~/components/journey/CreativeLoop";
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
  ChapterWhyPlaylab,
  QuestionHook,
} from "~/components/journey/chapters";

export const meta: MetaFunction = () => [
  { title: "AI Lab Schools — The Journey" },
  {
    name: "description",
    content:
      "A scrolling story of why AI Lab Schools exists, who's in the inaugural cohort, and what they're building over 24 months with Playlab.",
  },
];

const NAV_CHAPTERS = [
  { number: "01", label: "Origin" },
  { number: "02", label: "The bet" },
  { number: "03", label: "First material" },
  { number: "04", label: "Ecosystem" },
  { number: "05", label: "The mandate" },
  { number: "06", label: "Why a cohort" },
  { number: "07", label: "Meet the cohort" },
  { number: "08", label: "Two pathways" },
  { number: "09", label: "Rhythm" },
  { number: "10", label: "Pillars" },
  { number: "11", label: "Playbook" },
  { number: "12", label: "Why Playlab" },
  { number: "13", label: "Stay connected" },
];

export default function JourneyPage() {
  return (
    <div className="relative bg-brand-bg text-brand-ink antialiased">
      <ChapterNav chapters={NAV_CHAPTERS} />
      <CreativeLoop />
      <div className="relative z-10 pt-12 sm:pt-14">
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
          text="Where does AI sit in a classroom that's working?"
          emphasis="working"
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

        <ChapterWhyPlaylab />
        <ChapterStayConnected />
      </div>
    </div>
  );
}
