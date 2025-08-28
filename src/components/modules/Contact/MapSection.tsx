import { MapPin } from "lucide-react";
import mapCover from "../../../assets/images/map.png";

export default function MapSection() {
  return (
    <div>
      {/* Map Section */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <h2 className="xl:text-2xl lg:text-[22px] md:text-xl text-lg font-bold lg:mb-3 mb-2">
          Visit Our Office
        </h2>
        <div className="relative">
          {/* Background image */}
          <img
            src={mapCover}
            alt="dhanmondi map"
            className="w-full rounded-lg"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60 rounded-lg"></div>

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <MapPin className="lg:h-10 lg:w-10 md:h-8 md:w-8 text-white lg:mb-3 mb-2" />
            <p className="lg:text-base md:text-sm text-xs font-medium">
              123 Financial District, Dhanmondi, Dhaka-1229
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}