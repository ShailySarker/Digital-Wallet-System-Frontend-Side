import { Check, X } from "lucide-react";

const features = [
  { name: "Transaction Fees", basic: "2%", pro: "1%", business: "0.5%" },
  {
    name: "Monthly Transactions",
    basic: "Up to 50",
    pro: "Up to 500",
    business: "Unlimited",
  },
  {
    name: "Wallet Balance Limit",
    basic: "৳50,000",
    pro: "৳500,000",
    business: "Unlimited",
  },
  { name: "Instant Transfers", basic: true, pro: true, business: true },
  { name: "Multi-Currency Support", basic: false, pro: true, business: true },
  { name: "Priority Support", basic: false, pro: true, business: true },
  { name: "Advanced Analytics", basic: false, pro: true, business: true },
  { name: "API Access", basic: false, pro: false, business: true },
  {
    name: "Dedicated Account Manager",
    basic: false,
    pro: false,
    business: true,
  },
  { name: "Custom Branding", basic: false, pro: false, business: true },
];

export default function FeatureComparison() {
  return (
    <div>
      {/* Feature Comparison Table */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2 text-center">
          Feature Comparison
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-scroll">
          <table className="w-full border">
            <thead>
              <tr className="border-b bg-primary">
                <th className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] text-left font-semibold lg:text-base text-[15px]">
                  Feature
                </th>
                <th className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] text-center font-semibold lg:text-base text-[15px]">
                  Basic
                </th>
                <th className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] text-center font-semibold lg:text-base text-[15px]">
                  Pro
                </th>
                <th className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] text-center font-semibold lg:text-base text-[15px]">
                  Business
                </th>
              </tr>
            </thead>
            <tbody>
              {features?.map((feature, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/50" : ""
                  }
                >
                  <td className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] lg:text-sm text-xs font-medium">
                    {feature?.name}
                  </td>
                  <td className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] lg:text-sm text-xs text-center">
                    {typeof feature.basic === "boolean" ? (
                      feature?.basic ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium">{feature?.basic}</span>
                    )}
                  </td>
                  <td className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] lg:text-sm text-xs text-center">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium">{feature?.pro}</span>
                    )}
                  </td>
                  <td className="xl:px-6 md:px-5 px-4 xl:py-4 md:py-3 py-[10px] lg:text-sm text-xs text-center">
                    {typeof feature.business === "boolean" ? (
                      feature?.business ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium">{feature?.business}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
