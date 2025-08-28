import AllFeatures from "@/components/modules/Features/AllFeatures";
import CTASection from "@/components/modules/Features/CTASection";
import FeatureComparison from "@/components/modules/Features/FeatureComparison";
import HeroSection from "@/components/modules/Features/HeroSection";
import MainFeatures from "@/components/modules/Features/MainFeatures";

export default function Features() {
  return (
    <div className="xl:px-20 lg:px-14 md:px-10 px-5 xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12">
      <HeroSection />
      <MainFeatures />
      <AllFeatures />
      <FeatureComparison />
      <CTASection />
    </div>
  );
}
