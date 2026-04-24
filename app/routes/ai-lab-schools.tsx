import type { MetaFunction } from "react-router";
import { AboutProgram } from "~/components/about-program";
import { CohortAnnouncement } from "~/components/cohort-announcement";
import { CohortLogoMarquee } from "~/components/cohort-logo-marquee";
import { CTABar } from "~/components/cta-bar";
import { Hero } from "~/components/hero";
import { ImportantDates } from "~/components/important-dates";
import { Questions } from "~/components/questions";
import { SectionDivider } from "~/components/section-divider";
import { StayConnected } from "~/components/stay-connected";
import { WhatPlaylabBrings } from "~/components/what-playlab-brings";
import { WhatYouBuild } from "~/components/what-you-build";
import { WhoShouldApply } from "~/components/who-should-apply";

export const meta: MetaFunction = () => [{ title: "AI Lab Schools - Playlab" }];

export default function AILabSchoolsIndexPage() {
  return (
    <>
      <Hero />
      <CTABar />
      <CohortLogoMarquee />
      <section id="meet-the-cohort">
        <CohortAnnouncement />
      </section>
      <SectionDivider />
      <ImportantDates />
      <SectionDivider />
      <AboutProgram />
      <SectionDivider />
      <WhatYouBuild />
      <SectionDivider />
      <WhoShouldApply />
      <SectionDivider />
      <WhatPlaylabBrings />
      <SectionDivider />
      <StayConnected />
      <Questions />
    </>
  );
}
