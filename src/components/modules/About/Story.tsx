export default function Story() {
  return (
    <div>
      {/* Story Section */}
      <section className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <div className="grid md:grid-cols-2 xl:gap-12 lg:gap-10 md:gap-7 gap-5 items-center">
          <div>
            <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2">
              Our Story
            </h2>
            <p className="lg:text-base text-sm opacity-80 xl:mb-4 lg:mb-3 md:mb-2 mb-[7px]">
              Founded in 2023, Digital Wallet was created to address the growing
              need for accessible financial services in the digital age. We
              recognized that traditional banking systems were not meeting the
              needs of everyone, especially those in underserved communities.
            </p>
            <p className="lg:text-base text-sm opacity-80 xl:mb-4 lg:mb-3 md:mb-2 mb-[7px]">
              Our platform was built from the ground up with security,
              accessibility, and user experience in mind. We've since grown to
              serve millions of users across the country, processing billions of
              dollars in transactions every year.
            </p>
            <p className="lg:text-base text-sm opacity-80">
              Today, we continue to innovate and expand our services to meet the
              evolving needs of our users while maintaining our commitment to
              security and accessibility.
            </p>
          </div>
          <div className="grid grid-cols-2 xl:gap-5 lg:gap-4 md:gap-3 gap-2 items-center">
            <div className="text-center bg-accent rounded-lg p-8">
              <div className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold text-primary">
                2M+
              </div>
              <div className="lg:text-base text-sm opacity-80">
                Active Users
              </div>
            </div>
            <div className="text-center bg-accent rounded-lg p-8">
              <div className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold text-primary">
                ৳5B+
              </div>
              <div className="lg:text-base text-sm opacity-80">
                Annual Volume
              </div>
            </div>
            <div className="text-center bg-accent rounded-lg p-8">
              <div className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold text-primary">
                10K+
              </div>
              <div className="lg:text-base text-sm opacity-80">Agents</div>
            </div>
            <div className="text-center bg-accent rounded-lg p-8">
              <div className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold text-primary">
                24/7
              </div>
              <div className="lg:text-base text-sm opacity-80">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
