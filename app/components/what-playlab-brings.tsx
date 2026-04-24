import {
  BookOpen,
  Handshake,
  MessageSquare,
  Network,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Offering = {
  id: string;
  icon: LucideIcon;
  accent: string;
  title: string;
  body: string;
};

const offerings: Offering[] = [
  {
    id: "platform",
    icon: Network,
    accent: "#ffd956",
    title: "Enterprise-grade AI platform",
    body: "Full access to Playlab's purpose-built platform with robust security, privacy, and human-in-the-loop guardrails.",
  },
  {
    id: "talent",
    icon: BookOpen,
    accent: "#61dcff",
    title: "Technical talent",
    body: "Direct access to our engineers and product designers to co-build bespoke tools that solve your specific challenges.",
  },
  {
    id: "network",
    icon: Handshake,
    accent: "#00cc72",
    title: "Network of expert partners",
    body: "A curated network of leaders in future-ready education, pro-social AI development, community co-design, and measurement.",
  },
  {
    id: "coaching",
    icon: MessageSquare,
    accent: "#ffd956",
    title: "Expert coaching",
    body: "Monthly strategy calls and individualized implementation support from your dedicated Playlab coach.",
  },
  {
    id: "community",
    icon: Users,
    accent: "#61dcff",
    title: "Cohort community",
    body: "Quarterly in-person intensives and site visits to schools already piloting highly innovative practices.",
  },
];

export function WhatPlaylabBrings() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-base font-black uppercase tracking-wider text-[#0f6d37]">
              What Playlab Brings
            </p>
            <h2 className="font-heading text-4xl font-bold text-[#122134] sm:text-5xl">
              An ecosystem of support
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#122134] sm:text-xl">
              Most schools attempting to transform are forced to patch together
              disparate tools. The AI Lab Schools Network offers a different
              path, backed by every one of these.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6 xl:gap-8">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              const startClass = index === 3 ? "lg:col-start-2" : "";
              return (
                <div
                  key={offering.id}
                  className={`flex h-full flex-col gap-4 rounded-3xl border border-[#1a311d]/10 bg-[#fdfffc] p-8 shadow-[0_1px_3px_rgba(26,49,29,0.04)] lg:col-span-2 ${startClass}`}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#1a311d]"
                    style={{ backgroundColor: offering.accent }}
                  >
                    <Icon
                      className="h-6 w-6 text-[#1a311d]"
                      strokeWidth={2.25}
                    />
                  </div>
                  <h3 className="font-heading text-xl font-bold leading-tight text-[#1a311d]">
                    {offering.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[#122134]/80">
                    {offering.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
