import { FormattedMessage, useIntl } from "react-intl";

export function StayConnected() {
  const intl = useIntl();

  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#1a311d] px-8 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#ffd956] opacity-20" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#61dcff] opacity-15" />

          <div className="relative flex flex-col gap-6 text-center">
            <p className="text-base font-black uppercase tracking-wider text-[#ffd956]">
              <FormattedMessage
                defaultMessage="Stay Connected"
                description="Eyebrow above the stay-connected section"
              />
            </p>
            <h2 className="mx-auto max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl">
              <FormattedMessage
                defaultMessage="Follow the cohort's work as it unfolds"
                description="Heading for section inviting visitors to follow future cohorts"
              />
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">
              <FormattedMessage
                defaultMessage="Applications for the inaugural cohort are closed. We'll be sharing the cohort's work, open-source playbooks, and information about future cohorts as this 24-month partnership unfolds."
                description="Explanation that Cohort 1 applications are closed and more will be shared"
              />
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.playlab.ai/project/cmko8p7al0oxkii0u0aqgecpp"
                className="rounded-full border-2 border-white bg-transparent px-9 py-2.5 font-medium text-white transition hover:bg-white hover:text-[#1a311d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd956] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a311d]"
                aria-label={intl.formatMessage({
                  defaultMessage:
                    "Ask our FAQ chatbot questions about the AI Lab Schools program",
                  description: "Accessible label for FAQ chatbot link",
                })}
              >
                <FormattedMessage
                  defaultMessage="Ask our FAQ bot"
                  description="Button linking to the FAQ chatbot"
                />
              </a>
              <a
                href="mailto:support@playlab.ai?subject=AI Lab Schools Inquiry"
                className="rounded-full border-2 border-[#ffd956] bg-[#ffd956] px-9 py-2.5 font-medium text-[#1a311d] transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a311d]"
              >
                <FormattedMessage
                  defaultMessage="Get in touch"
                  description="Button linking to the support email for program inquiries"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
