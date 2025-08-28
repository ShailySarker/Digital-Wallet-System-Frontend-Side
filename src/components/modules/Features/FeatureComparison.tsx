import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, CreditCard, Globe } from "lucide-react";

const whyWeDifferent = [
  {
    title: "Speed",
    traditional: "1-3 business days",
    digitalWallet: "Instant",
    icon: Clock,
  },
  {
    title: "Fees",
    traditional: "High transaction fees",
    digitalWallet: "Low or no fees",
    icon: CreditCard,
  },
  {
    title: "Access",
    traditional: "Bank hours only",
    digitalWallet: "24/7 availability",
    icon: Globe,
  },
];

export default function FeatureComparison() {
  return (
    <div>
      {/* Feature Comparison */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 bg-primary/10 rounded-2xl xl:p-10 p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-3 mb-2">
            Why We're Different
          </h2>
          <p className="opacity-80 xl:text-lg lg:text-[17px] md:text-base text-[15px] text-sm xl:mb-8 lg:mb-6 mb-5">
            See how we stack up against traditional banking
          </p>
        </div>

        <div className="grid md:grid-cols-3 xl:gap-8 lg:gap-5 md:gap-3 gap-4">
          {whyWeDifferent?.map((item, index) => (
            <Card key={index} className="lg:gap-4 gap-3">
              <CardHeader>
                <div className="mx-auto lg:p-3 p-2 bg-primary rounded-full xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 flex items-center justify-center xl:mb-4 mb-3">
                  <item.icon className="xl:h-6 lg:h-5 xl:w-6 lg:w-5 h-4 w-4 text-white" />
                </div>
                <CardTitle className="xl:text-xl lg:text-[19px] text-lg font-semibold ">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="lg:space-y-4 md:space-y-3.5 space-y-3">
                  <div>
                    <p className="lg:text-sm text-[13px] opacity-80 italic mb-1">
                      Traditional Banking
                    </p>
                    <p className="text-red-600 font-semibold lg:text-base text-[15px]">
                      {item.traditional}
                    </p>
                  </div>
                  <div>
                    <p className="lg:text-sm text-[13px] opacity-80 italic mb-1">
                      Digital Wallet
                    </p>
                    <p className="text-green-600 font-semibold lg:text-base text-[15px]">
                      {item.digitalWallet}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
