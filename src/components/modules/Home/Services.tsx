import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Download, Send, Upload } from "lucide-react";

const data = [
  {
    icon: Send,
    title: "Money Transfer",
    description: "Send money to anyone, anywhere instantly",
    features: ["Instant processing", "Low fees", "24/7 availability"],
  },
  {
    icon: Download,
    title: "Cash In",
    description: "Add money to your wallet easily",
    features: ["Multiple methods", "Instant credit", "Secure processing"],
  },
  {
    icon: Upload,
    title: "Cash Out",
    description: "Withdraw money when you need it",
    features: ["Agent network", "Bank transfer", "Quick processing"],
  },
  //   {
  //     icon: BarChart3,
  //     title: "Bill Payment",
  //     description: "Pay utilities and bills seamlessly",
  //     features: ["All billers", "Auto-pay", "Instant confirmation"],
  //   },
];

export default function Services() {
  return (
    <div>
      {/* ===== SECTION 4: SERVICES ===== */}
      <section className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7">
        <div className="text-center xl:mb-16 lg:mb-12 md:mb-10 mb-8">
          <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px]">
            Our Services
          </h2>
          <p className="xl:text-xl lg:text-lg md:text-base text-[15px] opacity-60 max-w-3xl mx-auto">
            Comprehensive financial services for all your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:gap-8 lg:gap-6 md:gap-5 gap-4">
          {data?.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow hover:shadow-lg transition-shadow border-2 bg-accent">
                <CardHeader>
                  <div className="xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center xl:mb-4 md:mb-3 mb-2">
                    <service.icon className="xl:h-6 xl:w-6 lg:h-5 lg:w-5 h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="lg:text-lg text-[17px]">{service.title}</CardTitle>
                  <CardDescription className="lg:text-[15px] text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center lg:text-[15px] text-sm opacity-85"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
