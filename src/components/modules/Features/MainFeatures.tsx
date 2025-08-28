  
  import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Globe, ShieldCheck, Zap } from "lucide-react";
  
  const mainFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast Transactions",
      description:
        "Send and receive money in seconds, not days. Our optimized network ensures instant transfers 24/7.",
      benefits: [
        "Instant processing",
        "24/7 availability",
        "Real-time notifications",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Military-Grade Security",
      description:
        "Your money is protected with bank-level encryption and multi-factor authentication.",
      benefits: [
        "256-bit encryption",
        "Biometric authentication",
        "Fraud monitoring",
      ],
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description:
        "Access your wallet from anywhere in the world, on any device with internet connection.",
      benefits: [
        "Multi-device sync",
        "Offline capabilities",
        "International support",
      ],
    },
  ];

  export default function MainFeatures() {
  return (
    <div>
     {/* Main Features */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 grid md:grid-cols-3 xl:gap-8 lg:gap-5 md:gap-3 gap-4">
        {mainFeatures?.map((feature, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow border-primary bg-primary/10"
          >
            <CardHeader>
              <div className="mx-auto lg:p-3 p-2 bg-primary rounded-full xl:w-16 xl:h-16 lg:w-14 lg:h-14 md:w-12 md:h-12 w-10 h-10 flex items-center justify-center xl:mb-4 mb-3">
                <feature.icon className="xl:h-8 xl:w-8 lg:h-7 lg:w-7 w-6 h-6 text-white" />
              </div>
              <CardTitle className="xl:text-xl lg:text-[19px] text-lg font-semibold lg:text-start text-center">
                {feature?.title}
              </CardTitle>
              <CardDescription className="lg:text-[15px] text-[13.5px] mt-1 lg:text-start text-center">
                {feature?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mt-1">
                {feature?.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-sm ">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="lg:text-base text-[14px] font-normal">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}