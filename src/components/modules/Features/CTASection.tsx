import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CTASection() {
  return (
    <div>
      {/* CTA Section */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 text-center">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-3 mb-2">
          Ready to Experience the Difference?
        </h2>
        <p className="oxl:text-lg lg:text-[17px] md:text-base text-[15px] text-sm xl:mb-8 lg:mb-6 mb-5">
          Join thousands of satisfied users today
        </p>
        <div className="flex flex-col sm:flex-row lg:gap-4 md:gap-3 gap-2 justify-center">
          <Link to="/register">
            <Button
              size="lg"
              className="bg-primary cursor-pointer w-full font-semibold"
            >
              Get Started Free
            </Button>
          </Link>
          <Link to="/faq">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary cursor-pointer w-full font-semibold"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}