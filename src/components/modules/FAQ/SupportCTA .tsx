import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router";
import { HelpCircle } from "lucide-react";

export default function SupportCTA() {
  return (
    <div>
      {/* Support CTA */}
      <Card className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <HelpCircle className="lg:h-12 lg:w-12 w-10 h-10 text-white mx-auto lg:mb-4 md:mb-3 mb-2" />
            <h2 className="xl:text-2xl lg:text-[22px] md:text-xl text-lg font-bold mb-2">
              Still need help?
            </h2>
            <p className="text-blue-100 mb-4 lg:text-base text-sm">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="">
                <Button
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 w-full"
                >
                  Contact Support
                </Button>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className=" bg-white/10" variant="outline">
                    Live Chat
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
