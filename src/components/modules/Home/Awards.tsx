import { motion } from "framer-motion";
import { Award, Rocket, ShieldCheck, Star } from "lucide-react";

const data = [
  {
    title: "Best Fintech 2023",
    issuer: "Finance Awards",
    icon: Award,
  },
  { title: "Top Innovation", issuer: "Tech Review", icon: Rocket },
  {
    title: "Security Excellence",
    issuer: "Cyber Security",
    icon: ShieldCheck,
  },
  { title: "User Choice", issuer: "App Store", icon: Star },
];

export default function Awards() {
  return (
    <div>
      {/* ===== SECTION 11: AWARDS ===== */}
      <section className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="text-center xl:mb-16 lg:mb-12 md:mb-10 mb-8">
          <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px]">
            Awards & Recognition
          </h2>
          <p className="xl:text-xl lg:text-lg md:text-base text-[15px] opacity-60 max-w-3xl mx-auto">
            Our commitment to excellence has been recognized by industry leaders
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:gap-8 lg:gap-6 md:gap-5 gap-4">
          {data?.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl xl:p-6 lg:py-5 lg:px-0 md:p-4 p-3 border border-white/20">
                <award.icon className="xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 text-yellow-300 mx-auto xl:mb-4 md:mb-3 mb-2" />
                <h3 className="xl:text-xl lg:text-[19px] md:text-lg text-[17px] font-bold mb-2">{award?.title}</h3>
                <p className="opacity-70 lg:text-base text-[15px]">{award?.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
