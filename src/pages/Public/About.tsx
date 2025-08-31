import HeroSection from "@/components/modules/About/HeroSection";
import Story from "@/components/modules/About/Story";
import Mission from "@/components/modules/About/Mission";
import Features from "@/components/modules/About/Features";
import Team from "@/components/modules/About/Team";

export default function About() {
  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <HeroSection />
      <Story />
      <Mission />
      <Features />
      <Team/>
    </div>
  );
}
