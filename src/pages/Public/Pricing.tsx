import AdditionalInfo from "@/components/modules/Pricing/AdditionalInfo";
import FinalCTA from "@/components/modules/Pricing/FinalCTA";
import FeatureComparison from "@/components/modules/Pricing/FeatureComparison";
import Header from "@/components/modules/Pricing/Header";

export default function Pricing() {
  return (
    <div className="xl:px-20 lg:px-14 md:px-10 px-5 xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12">
      <Header />
      <Pricing />
      <FeatureComparison />
      <FinalCTA />
      <AdditionalInfo />
    </div>
  );
}
