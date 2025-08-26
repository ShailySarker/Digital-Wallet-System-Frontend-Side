import { motion } from "framer-motion";

export default function Partners() {
  return (
    <div>
      {/* ===== SECTION 10: PARTNERS ===== */}
      <section className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7">
        <div className="text-center xl:mb-16 lg:mb-12 md:mb-10 mb-8">
          <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px]">
            Trusted by Leading Companies
          </h2>
          <p className="xl:text-xl lg:text-lg md:text-base text-[15px] opacity-60 max-w-3xl mx-auto">
            We partner with industry leaders to bring you the best services
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:gap-4 lg:gap-6 md:gap-5 gap-4 items-center">
          {["Visa", "Mastercard","PayPal", "Stripe", "Amazon", "Google"].map(
            (partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex xl:flex-row lg:flex-col flex-row items-center justify-center xl:px-1 xl:py-6  md:p-6 py-4 bg-accent rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="xl:w-12 xl:h-12 lg:w-11 lg:h-11 md:h-10 md:w-10 h-9 w-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold lg:text-lg text-[17px]">
                    {partner[0]}
                  </span>
                </div>
                <span className="xl:ml-2 lg:ml-0 ml-2 xl:mt-0 lg:mt-3 font-semibold opacity-90 lg:text-base text-[15px]">
                  {partner}
                </span>
              </motion.div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
