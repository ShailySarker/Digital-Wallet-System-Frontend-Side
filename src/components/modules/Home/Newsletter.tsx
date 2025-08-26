import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <div>
      {/* ===== SECTION 14: NEWSLETTER ===== */}
      <section className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px]">
              Stay Updated
            </h2>
            <p className="xl:text-xl lg:text-lg md:text-base text-[15px] opacity-60 max-w-3xl mx-auto">
              Subscribe to our newsletter for the latest updates, features, and
              financial tips
            </p>

            <div className="xl:mt-16 lg:mt-12 md:mt-10 mt-8 flex flex-col sm:flex-row gap-4 justify-center xl:mb-6 lg:mb-5 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                size="lg"
                className="cursor-pointer bg-white text-blue-600 hover:bg-gray-100"
              >
                Subscribe
              </Button>
            </div>

            <p className="lg:text-sm text-[13px] opacity-70">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
