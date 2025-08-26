import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const data = [
  {
    name: "Sarah Chen",
    role: "Small Business Owner",
    content:
      "This wallet has transformed how I manage my business. Transactions that used to take days now happen instantly!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Freelancer",
    content:
      "I use this daily for client payments. The low fees and instant transfers are a game-changer for my business.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Student",
    content:
      "Perfect for splitting bills with friends and managing my allowance. Love the beautiful interface!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div>
      {/* ===== SECTION 6: TESTIMONIALS ===== */}
      <section
        className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7"
      >
        <div className="text-center xl:mb-16 lg:mb-12 md:mb-10 mb-8">
          <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px]">
            What Our Users Say
          </h2>
          <p className="xl:text-xl lg:text-lg md:text-base text-[15px] opacity-60 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:gap-8 lg:gap-6 md:gap-5 gap-4">
          {data?.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow bg-accent shadow">
                <CardContent className="xl:mt-6 lg:pt-5 md:pt-4 pt-3">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial?.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="lg:text-base text-[15px] xl:mb-6 lg:mb-5 mb-4 italic opacity-80">
                    "{testimonial?.content}"
                  </p>
                  <div>
                    <p className="lg:text-[17px] text-base font-semibold te">{testimonial?.name}</p>
                    <p className="lg:text-sm  text-[13px] opacity-60">{testimonial?.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
