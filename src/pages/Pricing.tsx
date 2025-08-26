import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Check,
  X,
  Crown,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe,
  Users,
} from "lucide-react";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const features = [
    { name: "Transaction Fees", basic: "2%", pro: "1%", business: "0.5%" },
    {
      name: "Monthly Transactions",
      basic: "Up to 50",
      pro: "Up to 500",
      business: "Unlimited",
    },
    {
      name: "Wallet Balance Limit",
      basic: "৳50,000",
      pro: "৳500,000",
      business: "Unlimited",
    },
    { name: "Instant Transfers", basic: true, pro: true, business: true },
    { name: "Multi-Currency Support", basic: false, pro: true, business: true },
    { name: "Priority Support", basic: false, pro: true, business: true },
    { name: "Advanced Analytics", basic: false, pro: true, business: true },
    { name: "API Access", basic: false, pro: false, business: true },
    {
      name: "Dedicated Account Manager",
      basic: false,
      pro: false,
      business: true,
    },
    { name: "Custom Branding", basic: false, pro: false, business: true },
  ];

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for individuals and casual users",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "Basic transaction features",
        "Standard security",
        "Email support",
        "Mobile app access",
        "Transaction history",
      ],
      icon: Sparkles,
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      description: "Ideal for frequent users and small businesses",
      monthlyPrice: 499,
      annualPrice: 4990, // 499 * 12 * 0.85 (15% discount)
      features: [
        "All Basic features",
        "Lower transaction fees",
        "Priority support",
        "Multi-currency wallets",
        "Advanced analytics",
        "Export capabilities",
      ],
      icon: Zap,
      popular: true,
    },
    {
      id: "business",
      name: "Business",
      description: "For businesses and high-volume transactions",
      monthlyPrice: 1499,
      annualPrice: 14990, // 1499 * 12 * 0.85 (15% discount)
      features: [
        "All Pro features",
        "Lowest transaction fees",
        "API access",
        "Dedicated account manager",
        "Custom branding",
        "Team management",
        "Advanced security features",
      ],
      icon: Crown,
      popular: false,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    toast.success(`${plans.find((p) => p.id === planId)?.name} plan selected`);
  };

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyTotal = monthly * 12;
    return monthlyTotal - annual;
  };

  return (
    <div className="xl:px-20 lg:px-14 md:px-10 px-5 xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold xl:mb-4 lg:mb-3 mb-2">
          Simple, Transparent Pricing
        </h1>
        <p className="xl:text-xl lg:text-lg md:text-[17px] text-[15px] opacity-80 max-w-3xl mx-auto">
          Choose the plan that works best for you. All plans include our core
          features with no hidden fees.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <div className="flex items-center space-x-4 bg-accent p-2 rounded-lg shadow-sm">
          <span
            className={`text-sm font-medium ${
              !isAnnual ? "text-primary" : "opacity-60"
            }`}
          >
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-primary"
          />
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm font-medium ${
                isAnnual ? "text-primary" : "opacity-60"
              }`}
            >
              Annual
            </span>
            <Badge variant="default" className="bg-primary text-white">
              Save 15%
            </Badge>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        {plans.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const monthlyEquivalent = isAnnual
            ? Math.round(plan.annualPrice / 12)
            : plan.monthlyPrice;
          const savings = calculateSavings(plan.monthlyPrice, plan.annualPrice);

          return (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-2 border-primary shadow-xl"
                  : "border-gray-200 border-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="flex justify-center xl:mb-4 lg:mb-3 mb-2">
                  <div className="p-3 bg-accent rounded-full">
                    <plan.icon className="xl:h-6 lg:h-5 xl:w-6 lg:w-5 h-4 w-4 text-primary" />
                  </div>
                </div>
                <CardTitle className="xl:text-2xl lg:text-[22px] md:text-xl text-lg">
                  {plan.name}
                </CardTitle>
                <CardDescription className="italic opacity-95">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-center xl:mb-6 lg:mb-5 md:mb-4 mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold">
                      ৳{price}
                    </span>
                    {!isAnnual && (
                      <span className="opacity-60 ml-2">/month</span>
                    )}
                    {isAnnual && <span className="opacity-60 ml-2">/year</span>}
                  </div>
                  {isAnnual && price > 0 && (
                    <p className="lg:text-sm text-xs opacity-80 mt-1">
                      ৳{monthlyEquivalent}/month equivalent
                      <span className="text-primary/90 ml-2">
                        Save ৳{savings}
                      </span>
                    </p>
                  )}
                  {price === 0 && (
                    <p className="text-primary font-medium mt-1">
                      Free forever
                    </p>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="lg:h-5 lg:w-5 h-4 w-4 text-primary lg:mr-3 mr-2 flex-shrink-0" />
                      <span className="lg:text-sm text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full ${
                        plan.popular ? "bg-primary" : "border border-primary"
                      }`}
                      variant={plan.popular ? "default" : "secondary"}
                    >
                      {selectedPlan === plan.id ? "Selected" : "Get Started"}
                      {plan.popular && <Sparkles className="h-4 w-4 ml-2" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming Soon</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2 text-center">
          Feature Comparison
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-scroll">
          <table className="w-full border">
            <thead>
              <tr className="border-b bg-primary">
                <th className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] text-left font-semibold lg:text-base text-[15px]">
                  Feature
                </th>
                <th className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] text-center font-semibold lg:text-base text-[15px]">
                  Basic
                </th>
                <th className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] text-center font-semibold lg:text-base text-[15px]">
                  Pro
                </th>
                <th className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] text-center font-semibold lg:text-base text-[15px]">
                  Business
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/50" : ""
                  }
                >
                  <td className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] lg:text-sm text-xs font-medium">
                    {feature.name}
                  </td>
                  <td className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] lg:text-sm text-xs text-center">
                    {typeof feature.basic === "boolean" ? (
                      feature.basic ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium">{feature.basic}</span>
                    )}
                  </td>
                  <td className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] lg:text-sm text-xs text-center">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium">{feature.pro}</span>
                    )}
                  </td>
                  <td className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] lg:text-sm text-xs text-center">
                    {typeof feature.business === "boolean" ? (
                      feature.business ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium">{feature.business}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final CTA */}
      <Card className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 bg-gradient-to-r from-primary to-purple-600 text-white text-center pt-3">
        <CardContent className="xl:pt-12 lg:pt-10 md:pt-8 mt-6 xl:pb-8 lg:pb-6 md:pb-4 pb-2">
          <ShieldCheck className="xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 text-white mx-auto mb-4" />
          <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 xl:text-lg lg:text-[17px] md:text-base text-[15px] mb-6 max-w-2xl mx-auto">
            Join thousands of users who trust our secure digital wallet
            platform. Start with our free plan and upgrade anytime.
          </p>
          <div className="flex flex-col sm:flex-row lg:gap-4 md:gap-3 gap-2 justify-center">
            <Link to="/register">
              <Button className="cursor-pointer w-full bg-white text-primary hover:bg-gray-100 px-8">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="cursor-pointer w-full bg-white/10 border-2 border-white"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
          <p className="text-blue-200 lg:text-sm text-xs mt-4">
            No credit card required • 30-day money-back guarantee
          </p>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 text-center">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {[
            {
              icon: Globe,
              title: "Global Support",
              description:
                "Available in 50+ countries with local currency support",
            },
            {
              icon: Users,
              title: "Team Ready",
              description: "Add team members and manage permissions easily",
            },
            {
              icon: ShieldCheck,
              title: "Security First",
              description: "Enterprise-grade security with regular audits",
            },
          ].map((item, index) => (
            <div key={index} className="text-center bg-accent p-5 rounded-2xl">
              <div className="lg:p-3 p-2 bg-primary/20 rounded-full xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 flex items-center justify-center mx-auto xl:mb-4 mb-3">
                <item.icon className="xl:h-6 lg:h-5 xl:w-6 lg:w-5 h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 lg:text-lg text-base">
                {item.title}
              </h3>
              <p className="opacity-80 lg:text-[15px] text-[13px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="opacity-80 lg:text-sm text-xs">
          * All prices are in Bangladeshi Taka (৳). Transaction fees may apply
          based on payment method and region.
          <br />
          ** Business plan requires annual commitment. Custom enterprise plans
          available.
        </p>
      </div>
    </div>
  );
}
