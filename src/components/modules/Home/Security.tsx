import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const data = [
  "256-bit SSL encryption",
  "Two-factor authentication",
  "Biometric login",
  "Real-time fraud monitoring",
  "PCI DSS compliant",
];
export default function Security() {
  return (
    <div>
      {/* ===== SECTION 7: SECURITY ===== */}
      <section className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px] lg:text-start text-center">
              Military-Grade Security
            </h2>
            <p className="xl:text-xl lg:text-lg md:text-base text-[15px] text-blue-100 xl:mb-8 lg:mb-7 md:mb-8 mb-7 lg:text-start text-center">
              Your security is our top priority. We use bank-level encryption
              and advanced security measures to protect your money and data.
            </p>
            <div className="lg:space-y-4 space-y-3 mt-">
              {data?.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-400 mr-3" />
                  <span className="lg:text-base text-[15px]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <ShieldCheck className="xl:h-16 xl:w-16 lg:h-14 lg:w-14 md:h-12 md:w-12 h-10 w-10 text-white mx-auto xl:mb-6 lg:mb-5 mb-4" />
              <h3 className="xl:text-2xl lg:text-[22px] md:text-xl text-lg font-bold mb-4">Your Money is Safe</h3>
              <p className="text-blue-100 lg:text-base text-[15px]">
                We maintain industry-leading security standards and regular
                audits to ensure your funds are always protected.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
