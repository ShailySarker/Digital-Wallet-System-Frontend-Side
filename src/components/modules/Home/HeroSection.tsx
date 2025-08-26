import { Link } from "react-router";
import { Wallet, Send, Download, BarChart3, Star } from "lucide-react";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const { data: isAuthenticated } = useMyProfileQuery({});
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white xl:py-28 lg:py-20 md:py-12 py-8 xl:px-20 lg:px-14 md:px-10 px-5">
        <div className="flex flex-col md:flex-row items-center justify-between xl:gap-20 lg:gap-16 md:gap-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="md:text-start text-center xl:text-6xl lg:text-[53px] text-4xl md:text-[40px] font-bold lg:mb-6 mb-4 leading-tight">
              Digital Wallet for{" "}
              <span className="text-yellow-300">Everyone</span>
            </h1>
            <p className="md:text-start text-center xl:text-2xl lg:text-xl md:text-base xl:mb-8 lg:mb-6 md:mb-4 mb-3 text-blue-100">
              Send, receive, and manage your money securely with our digital
              wallet solution. Join millions of users who trust us for their
              daily transactions.
            </p>
            <div className="flex flex-col sm:flex-row xl:gap-4 md:gap-3 gap-[10px]">
              {!isAuthenticated ? (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 xl:text-lg hover:bg-white"
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white border-2 bg-white/10 xl:text-lg"
                  >
                    <Link to="/faq">Know More</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 xl:text-lg hover:bg-white"
                  >
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white border-2 bg-white/10 xl:text-lg"
                  >
                    <Link to="/faq">Know More</Link>
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center md:justify-start justify-center xl:mt-8 lg:mt-6 md:mt-4 mt-3 lg:space-x-4 space-x-3 text-blue-100">
              <div className="flex items-center">
                <Star className="lg:h-5 lg:w-5 h-4 w-4 fill-yellow-300 text-yellow-300 mr-1" />
                <Star className="lg:h-5 lg:w-5 h-4 w-4 fill-yellow-300 text-yellow-300 mr-1" />
                <Star className="lg:h-5 lg:w-5 h-4 w-4 fill-yellow-300 text-yellow-300 mr-1" />
                <Star className="lg:h-5 lg:w-5 h-4 w-4 fill-yellow-300 text-yellow-300 mr-1" />
                <Star className="lg:h-5 lg:w-5 h-4 w-4 fill-yellow-300 text-yellow-300 mr-1" />
              </div>
              <span className="lg:text-base text-sm">
                4.9/5 from 10,000+ reviews
              </span>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl xl:p-8 lg:p-6 md:p-4 p-4 border border-white/20">
              <div className="bg-white rounded-xl xl:p-6 lg:p-5 md:p-4 p-3 shadow-2xl">
                <div className="flex items-center justify-between xl:mb-6 lg:mb-5 md:mb-3 mb-[10px]">
                  <div className="flex items-center md:space-x-3 space-x-2">
                    <Wallet className="xl:h-8 xl:w-8 lg:w-7 lg:h-7 w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 lg:text-base text-sm">
                        My Wallet
                      </h3>
                      <p className="lg:text-sm text-xs text-gray-600">
                        Balance
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="xl:text-2xl lg:text-xl md:text-lg font-bold text-gray-900">
                      ৳1,250.00
                    </p>
                    <p className="lg:text-sm text-xs text-green-600">Active</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 xl:gap-4 lg:gap-3 gap-2 xl:mb-6 lg:mb-4 mb-3">
                  <button className="flex flex-col items-center lg:p-3 p-[10px] bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors">
                    <Send className="xl:h-6 xl:w-6 h-5 w-5 text-blue-600 lg:mb-2 mb-1" />
                    <span className="lg:text-sm text-xs font-medium">Send</span>
                  </button>
                  <button className="flex flex-col items-center lg:p-3 p-[10px] bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="xl:h-6 xl:w-6 h-5 w-5 text-green-600 lg:mb-2 mb-1" />
                    <span className="lg:text-sm text-xs font-medium">
                      Receive
                    </span>
                  </button>
                  <button className="flex flex-col items-center lg:p-3 p-[10px] bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors">
                    <BarChart3 className="xl:h-6 xl:w-6 h-5 w-5 text-purple-600 lg:mb-2 mb-1" />
                    <span className="lg:text-sm text-xs font-medium">
                      History
                    </span>
                  </button>
                </div>
                <div className="bg-blue-50 rounded-lg lg:p-4 p-3">
                  <div className="flex items-center justify-between">
                    <span className="lg:text-sm text-xs text-blue-800">
                      Recent Transaction
                    </span>
                    <span className="lg:text-sm text-xs text-green-600">
                      +৳500.00
                    </span>
                  </div>
                  <p className="lg:text-xs text-[10px] text-blue-600">
                    Received from John Doe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
