import ContactDetails from "@/components/modules/Contact/ContactDetails";
import MapSection from "@/components/modules/Contact/MapSection";

export default function Contact() {
  return (
    <div className="xl:px-20 lg:px-14 md:px-10 px-5 xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12">
      <ContactDetails />
      <MapSection />
    </div>
  );
}
