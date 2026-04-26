export function WhoShouldApply() {
  return (
    <div className="bg-[#e1e7d9] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-12">
        <div className="flex flex-col items-center gap-4 pb-5 text-center">
          <p className="font-semibold uppercase tracking-[4px] text-[#122134] sm:text-base">
            THE TWO PATHWAYS
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="pb-10 text-center font-heading text-4xl font-bold text-[#122134] sm:text-5xl">
            Two Pathways, One Cohort
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[40%_60%] lg:gap-12">
            <div className="flex items-start">
              <p className="text-2xl font-semibold leading-[46px] text-[#122134] sm:text-3xl">
                Cohort 1 brings together teams with the authority to make
                structural changes to time, space, and staffing. Every school
                arrives through one of two pathways.
              </p>
            </div>

            <div className="flex flex-col gap-[52px]">
              <div className="flex flex-col overflow-hidden rounded-3xl">
                <div className="rounded-3xl bg-[#ffd956] p-8 sm:p-6">
                  <h3 className="text-3xl font-bold text-[#122134]">
                    THE NEW START
                  </h3>
                  <p className="mt-2 text-2xl italic text-[#122134]">
                    Founding New Models
                  </p>
                </div>
                <div className="rounded-3xl bg-[#fff8e1] p-8 sm:p-12">
                  <div className="flex flex-col gap-6 text-2xl leading-normal text-[#122134]">
                    <div>
                      <p className="mb-2 text-base font-black uppercase tracking-wider">
                        WHO THEY ARE
                      </p>
                      <p>
                        Founders and teams launching new schools from the ground
                        up, evolving past the idea of &ldquo;school.&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-base font-black uppercase tracking-wider">
                        THE OPPORTUNITY
                      </p>
                      <p>
                        Build new models where every system is designed for the
                        AI age from Day 1.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-base font-black uppercase tracking-wider">
                        THE GOAL
                      </p>
                      <p>
                        Launch fully operational, AI-integrated learning
                        environments by Fall 2027.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-3xl">
                <div className="rounded-3xl bg-[#61dcff] p-8 sm:p-12">
                  <h3 className="text-3xl font-bold text-[#122134]">
                    THE PIVOT
                  </h3>
                  <p className="mt-2 text-2xl italic text-[#122134]">
                    Transforming with AI
                  </p>
                </div>
                <div className="rounded-3xl bg-[#e9faff] p-8 sm:p-12">
                  <div className="flex flex-col gap-6 text-2xl leading-relaxed text-[#122134]">
                    <div>
                      <p className="mb-2 text-base font-black uppercase tracking-wider">
                        WHO THEY ARE
                      </p>
                      <p>
                        Leaders of existing schools (district, charter, private,
                        and micro) ready to radically re-architect their models.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-base font-black uppercase tracking-wider">
                        THE OPPORTUNITY
                      </p>
                      <p>
                        Moving beyond efficiency to fundamentally reimagining
                        the student experience within existing school
                        communities.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-base font-black uppercase tracking-wider">
                        THE GOAL
                      </p>
                      <p>
                        Executing structural transformations that shift power
                        to learners and place human flourishing at the center.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
