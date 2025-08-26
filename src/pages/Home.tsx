import { useState, useEffect } from "react";
import HeroSection from "@/components/modules/Home/HeroSection";
import Stats from "@/components/modules/Home/Stats";
import Features from "@/components/modules/Home/Features";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import Testimonials from "@/components/modules/Home/Testimonials";
import Security from "@/components/modules/Home/Security";
import Partners from "@/components/modules/Home/Partners";
import Awards from "@/components/modules/Home/Awards";
import Blog from "@/components/modules/Home/Blog";
import Newsletter from "@/components/modules/Home/Newsletter";
import Services from "@/components/modules/Home/Services";
import Logo from "@/assets/icons/Logo";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="text-center">
          <div className="p-3 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Logo />
          </div>
          {/* <h1 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl font-bold text-white mb-4">Digital Wallet</h1> */}
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <Stats />
      <Features />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Security />
      <Partners />
      <Awards />
      <Blog />
      <Newsletter />
    </div>
  );
};

export default Home;
