import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const leadershipMember = [
  {
    name: "John Smith",
    degination: "CEO & Founder",
    description: "15+ years in fintech and financial services",
  },
  {
    name: "Sarah Johnson",
    degination: "CTO",
    description: "Operations specialist with background in banking",
  },
  {
    name: "Michael Chen",
    degination: "COO",
    description: "Expert in secure payment systems and blockchain",
  },
];
export default function Team() {
  return (
    <div>
      {/* Team Section */}
      <section className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2 text-center">
          Leadership Team
        </h2>
        <div className="grid md:grid-cols-3 xl:gap-8 lg:gap-6 md:gap-5 gap-3">
          {leadershipMember?.map((leader) => (
            <Card className="text-center">
              <CardContent className="xl:pt-5 lg:pt-3 md:pt-2 pt-0">
                <Avatar className="xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-14 md:h-14 w-12 h-12 bg-accent rounded-full mx-auto mb-4">
                  <AvatarFallback className="bg-primary text-white font-semibold xl:text-3xl lg:text-[26px] md:text-[22px] text-lg">
                    {leader!.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="lg:text-lg text-[17px] font-semibold">
                  {leader?.name}
                </CardTitle>
                <CardDescription>{leader?.degination}</CardDescription>
                <p className="text-sm opacity-80 mt-1">{leader?.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
