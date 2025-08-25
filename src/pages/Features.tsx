import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Zap,
  Globe,
  Lock,
  Smartphone,
  CreditCard,
  BarChart3,
  Users,
  Award,
  Clock,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

export default function Features() {
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

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold xl:mb-4 lg:mb-3 mb-2">
          Powerful Features
        </h1>
        <p className="xl:text-xl lg:text-lg md:text-[17px] text-[15px] opacity-80 max-w-3xl mx-auto">
          Discover everything you can do with our digital wallet. From instant
          transfers to advanced security, we've got you covered.
        </p>
      </div>

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

      {/* CTA Section */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 text-center">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-3 mb-2">
          Ready to Experience the Difference?
        </h2>
        <p className="oxl:text-lg lg:text-[17px] md:text-base text-[15px] text-sm xl:mb-8 lg:mb-6 mb-5">
          Join thousands of satisfied users today
        </p>
        <div className="flex flex-col sm:flex-row lg:gap-4 md:gap-3 gap-2 justify-center">
          <Link to="/register">
            <Button
              size="lg"
              className="bg-primary cursor-pointer w-full font-semibold"
            >
              Get Started Free
            </Button>
          </Link>
          <Link to="/faq">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary cursor-pointer w-full font-semibold"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
