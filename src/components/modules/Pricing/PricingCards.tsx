import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Check, Crown, Sparkles, Zap } from "lucide-react";

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("pro");

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
    <div>
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
    </div>
  );
}
