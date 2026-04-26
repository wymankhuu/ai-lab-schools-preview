export function CTABar() {
  return (
    <div className="bg-[#e1e7d9] pb-8 sm:pb-12 lg:pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-3xl bg-[#fdfffc] px-8 py-5 sm:px-10 lg:justify-between">
          {/* Left group - informational links */}
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            {/* Meet the Cohort - Primary Yellow Button (jumps to cohort section) */}
            <a
              href="#meet-the-cohort"
              className="rounded-full border border-[#122134] bg-[#ffd956] px-9 py-2.5 font-medium text-[#122134] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a311d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e1e7d9]"
            >
              Meet the Cohort
            </a>

            {/* The Experience - Secondary Button */}
            <a
              href="/ai-lab-schools/experience"
              className="rounded-full border border-[#122134] bg-white px-9 py-2.5 font-medium text-[#122134] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a311d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e1e7d9]"
            >
              The Experience
            </a>
          </div>

          {/* Right - Return to Playlab - Dark Button */}
          <a
            href="https://playlab.ai"
            className="rounded-full border border-[#122134] bg-[#1a311d] px-9 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a311d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e1e7d9]"
          >
            Return to Playlab
          </a>
        </div>
      </div>
    </div>
  );
}
