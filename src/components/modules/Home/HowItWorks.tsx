import { motion } from "framer-motion";
import { CheckCircle, Download, Send, Shield, Users } from "lucide-react";

export default function HowItWorks() {
  const data = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your account in minutes",
      icon: Users,
    },
    {
      step: "2",
      title: "Verify",
      description: "Complete quick verification",
      icon: Shield,
    },
    {
      step: "3",
      title: "Add Money",
      description: "Fund your wallet securely",
      icon: Download,
    },
    {
      step: "4",
      title: "Start Using",
      description: "Send and receive money",
      icon: Send,
    },
  ];

  return (
    <div>
      {/* ===== SECTION 5: HOW IT WORKS ===== */}
      <section className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7 bg-accent">
          <div className="text-center xl:mb-16 lg:mb-12 md:mb-10 mb-8">
            <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px]">
              How It Works
            </h2>
            <p className="xl:text-xl lg:text-lg md:text-base text-[15px] opacity-60 max-w-3xl mx-auto">
              Get started in minutes with our simple process
            </p>
          </div>

          <div className="grid md:grid-cols-4 lg:grid-cols-4 xl:gap-8 lg:gap-6 md:gap-5 gap-7">
            {data?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto xl:mb-4 md:mb-3 mb-2 relative ">
                  <span className="text-white font-bold lg:text-lg text-[17px]">
                    {item?.step}
                  </span>
                  <div className="absolute lg:-top-2 -top-1 lg:-right-2 -right-1 xl:h-6 xl:w-6 lg:h-5 lg:w-5 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="lg:text-xl text-lg font-semibold mb-2">{item?.title}</h3>
                <p className="lg:text-base text-[15px] opacity-80">{item?.description}</p>
              </motion.div>
            ))}
          </div>
      </section>
    </div>
  );
}
