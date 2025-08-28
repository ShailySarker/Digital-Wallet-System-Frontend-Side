import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Shield, Globe, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure",
    description:
      "Bank-level security to protect your transactions and personal information.",
  },
  {
    icon: Globe,
    title: "Accessible",
    description:
      "Available to everyone with a smartphone, anywhere in the country.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Join millions of users who trust us for their daily transactions.",
  },
  {
    icon: Heart,
    title: "Social Impact",
    description:
      "Helping to build a more inclusive financial ecosystem for all.",
  },
];

export default function Features() {
  return (
    <div>
      {/* Features Section */}
      <section className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2 text-center">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:gap-6 lg:gap-5 md:gap-4 gap-3">
          {features?.map((feature, index) => (
            <Card key={index} className="text-center gap-0">
              <CardHeader className="gap-0">
                <div className="mx-auto p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="lg:text-lg text-[17px] font-semibold lg:mb-3 mb-2">
                  {feature?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature?.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
