import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Users, Shield, Globe, Heart } from "lucide-react";

export default function About() {
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

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold xl:mb-4 lg:mb-3 mb-2">
          About Digital Wallet
        </h1>
        <p className="xl:text-xl lg:text-lg md:text-[17px] text-[15px] opacity-80 max-w-3xl mx-auto">
          We're on a mission to make financial services accessible, affordable,
          and secure for everyone.
        </p>
      </section>

      {/* Story Section */}
      <section className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <div className="grid md:grid-cols-2 xl:gap-12 lg:gap-10 md:gap-7 gap-5 items-center">
          <div>
            <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2">
              Our Story
            </h2>
            <p className="lg:text-base text-sm opacity-80 xl:mb-4 lg:mb-3 md:mb-2 mb-[7px]">
              Founded in 2023, Digital Wallet was created to address the growing
              need for accessible financial services in the digital age. We
              recognized that traditional banking systems were not meeting the
              needs of everyone, especially those in underserved communities.
            </p>
            <p className="lg:text-base text-sm opacity-80 xl:mb-4 lg:mb-3 md:mb-2 mb-[7px]">
              Our platform was built from the ground up with security,
              accessibility, and user experience in mind. We've since grown to
              serve millions of users across the country, processing billions of
              dollars in transactions every year.
            </p>
            <p className="lg:text-base text-sm opacity-80">
              Today, we continue to innovate and expand our services to meet the
              evolving needs of our users while maintaining our commitment to
              security and accessibility.
            </p>
          </div>
          <div className="grid grid-cols-2 xl:gap-5 lg:gap-4 md:gap-3 gap-2 items-center">
            <div className="text-center bg-accent rounded-lg p-8">
              <div className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold text-primary">
                2M+
              </div>
              <div className="lg:text-base text-sm opacity-80">
                Active Users
              </div>
            </div>
            <div className="text-center bg-accent rounded-lg p-8">
              <div className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold text-primary">
                ৳5B+
              </div>
              <div className="lg:text-base text-sm opacity-80">
                Annual Volume
              </div>
            </div>
            <div className="text-center bg-accent rounded-lg p-8">
              <div className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold text-primary">
                10K+
              </div>
              <div className="lg:text-base text-sm opacity-80">Agents</div>
            </div>
            <div className="text-center bg-accent rounded-lg p-8">
              <div className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold text-primary">
                24/7
              </div>
              <div className="lg:text-base text-sm opacity-80">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2 text-center">
          Our Mission & Values
        </h2>
        <div className="grid md:grid-cols-2 xl:gap-8 lg:gap-6 md:gap-5 gap-3">
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="font-semibold lg:text-lg text-[17px] lg:mb-3 mb-2">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-80 lg:text-base text-sm">
                To democratize access to financial services by providing a
                secure, affordable, and user-friendly digital wallet platform
                that empowers individuals and businesses to participate in the
                digital economy.
              </p>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="font-semibold lg:text-lg text-[17px] lg:mb-3 mb-2">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-80 lg:text-base text-sm">
                To create a world where everyone has equal access to financial
                tools and opportunities, regardless of their location, income
                level, or background, fostering economic growth and financial
                inclusion for all.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

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
