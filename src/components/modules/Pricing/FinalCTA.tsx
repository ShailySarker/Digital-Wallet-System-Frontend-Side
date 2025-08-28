import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,

} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export default function FinalCTA() {
  return (
    <div>
      {/* Final CTA */}
      <Card className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 bg-gradient-to-r from-primary to-purple-600 text-white text-center pt-3">
        <CardContent className="xl:pt-12 lg:pt-10 md:pt-8 mt-6 xl:pb-8 lg:pb-6 md:pb-4 pb-2">
          <ShieldCheck className="xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 text-white mx-auto mb-4" />
          <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 xl:text-lg lg:text-[17px] md:text-base text-[15px] mb-6 max-w-2xl mx-auto">
            Join thousands of users who trust our secure digital wallet
            platform. Start with our free plan and upgrade anytime.
          </p>
          <div className="flex flex-col sm:flex-row lg:gap-4 md:gap-3 gap-2 justify-center">
            <Link to="/register">
              <Button className="cursor-pointer w-full bg-white text-primary hover:bg-gray-100 px-8">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="cursor-pointer w-full bg-white/10 border-2 border-white"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
          <p className="text-blue-200 lg:text-sm text-xs mt-4">
            No credit card required • 30-day money-back guarantee
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
