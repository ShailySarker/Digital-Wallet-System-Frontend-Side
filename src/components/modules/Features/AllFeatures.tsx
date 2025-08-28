import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, BarChart3, CreditCard, Lock, Smartphone, Users } from "lucide-react";
const allFeatures = [
  {
    icon: Smartphone,
    title: "Mobile App",
    description:
      "Full-featured mobile app for iOS and Android with intuitive interface.",
  },
  {
    icon: CreditCard,
    title: "Virtual Cards",
    description:
      "Generate virtual cards for online payments with spending limits.",
  },
  {
    icon: BarChart3,
    title: "Spending Analytics",
    description: "Track your expenses with beautiful charts and insights.",
  },
  {
    icon: Users,
    title: "Family Accounts",
    description:
      "Create sub-accounts for family members with parental controls.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "We never sell your data. Your financial information stays private.",
  },
  {
    icon: Award,
    title: "Rewards Program",
    description: "Earn cashback and rewards on your everyday transactions.",
  },
];

export default function AllFeatures() {
  return (
    <div>
      {/* All Features Grid */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 text-center">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-3 mb-2">
          Everything You Need
        </h2>
        <p className="xl:text-lg lg:text-[17px] md:text-base text-[15px] text-sm xl:mb-8 lg:mb-6 mb-5">
          Comprehensive features for modern financial management
        </p>
      </div>

      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 grid grid-cols-2 lg:grid-cols-3 xl:gap-6 lg:gap-5 md:gap-4 gap-3">
        {allFeatures?.map((feature, index) => (
          <Card
            key={index}
            className="text-center hover:shadow-md transition-shadow lg:gap-4 gap-3 border-primary"
          >
            <CardHeader>
              <div className="mx-auto lg:p-3 p-2 bg-primary/20 rounded-full xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 flex items-center justify-center lg:mb-4 mb-3 border-primary border-[1.5px]">
                <feature.icon className="xl:h-6 lg:h-5 xl:w-6 lg:w-5 h-4 w-4 text-primary" />
              </div>
              <CardTitle className="xl:text-xl lg:text-[19px] text-lg font-semibold text-center mb-0">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="md:px-6 px-3">
              <CardDescription className="lg:text-[15px] text-[13.5px] text-center font-medium">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
