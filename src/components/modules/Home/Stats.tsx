import { Award, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const data = [
  { number: "2M+", label: "Happy Users", icon: Users },
  { number: "৳5B+", label: "Transactions", icon: TrendingUp },
  { number: "10K+", label: "Agents", icon: Award },
  { number: "99.9%", label: "Uptime", icon: Zap },
];
export default function Stats() {
  return (
    <div>
      {/* ===== SECTION 2: STATS ===== */}
      <section className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:gap-8 lg:gap-5 md:gap-4 gap-4 justify-center mx-auto lg:w-[80%] md:w-[90%] w-[88%]">
          {data?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-accent rounded-2xl xl:p-8 lg:p-5 p-4 shadow"
            >
              <div className="xl:w-16 xl:h-16 lg:w-14 lg:h-14 md:w-11 md:h-11 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto lg:mb-4 md:mb-[10px] mb-2">
                <stat.icon className="xl:h-8 xl:w-8 lg:h-7 lg:w-7 md:w-6 md:h-6 w-5 h-5 text-white" />
              </div>
              <p className="xl:text-4xl lg:text-3xl md:text-2xl text-[22px] font-bold opacity-95 lg:mb-2">
                {stat.number}
              </p>
              <p className="lg:text-lg text-base font-medium opacity-70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
