import { CreditCard, Globe, ShieldCheck, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const data = [
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Send money in seconds with lightning-fast processing",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Level Security",
    description: "Military-grade encryption and fraud protection",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Available in 50+ countries worldwide",
  },
  {
    icon: CreditCard,
    title: "Virtual Cards",
    description: "Generate disposable cards for online payments",
  },
];

export default function Features() {
  return (
    <div>
      {/* ===== SECTION 3: FEATURES ===== */}
      <section
        id="features"
        className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7 bg-accent"
      >
        <div className="text-center xl:mb-16 lg:mb-12 md:mb-10 mb-8">
          <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px]">
            Why Choose <span className="text-primary">Digi Wallet</span> ?
          </h2>
          <p className="xl:text-xl lg:text-lg md:text-base text-[15px] opacity-60 max-w-3xl mx-auto">
            Experience the future of digital payments with cutting-edge features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:gap-8 lg:gap-6 md:gap-5 gap-4">
          {data?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow xl:gap-3 gap-2">
                <CardHeader>
                  <div className="xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto xl:mb-4 md:mb-3 mb-2">
                    <feature.icon className="xl:h-6 xl:w-6 lg:h-5 lg:w-5 h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="lg:text-lg text-[17px]">{feature?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="lg:text-[15px] text-sm">{feature?.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
