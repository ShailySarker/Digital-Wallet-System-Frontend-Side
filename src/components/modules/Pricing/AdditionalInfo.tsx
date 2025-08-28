import { Globe, ShieldCheck, Users } from "lucide-react";
const data = [
  {
    icon: Globe,
    title: "Global Support",
    description: "Available in 50+ countries with local currency support",
  },
  {
    icon: Users,
    title: "Team Ready",
    description: "Add team members and manage permissions easily",
  },
  {
    icon: ShieldCheck,
    title: "Security First",
    description: "Enterprise-grade security with regular audits",
  },
];
export default function AdditionalInfo() {
  return (
    <div>
      {/* Additional Info */}
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 text-center">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {data?.map((item, index) => (
            <div key={index} className="text-center bg-accent p-5 rounded-2xl">
              <div className="lg:p-3 p-2 bg-primary/20 rounded-full xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 flex items-center justify-center mx-auto xl:mb-4 mb-3">
                <item.icon className="xl:h-6 lg:h-5 xl:w-6 lg:w-5 h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 lg:text-lg text-base">
                {item.title}
              </h3>
              <p className="opacity-80 lg:text-[15px] text-[13px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="opacity-80 lg:text-sm text-xs">
          * All prices are in Bangladeshi Taka (৳). Transaction fees may apply
          based on payment method and region.
          <br />
          ** Business plan requires annual commitment. Custom enterprise plans
          available.
        </p>
      </div>
    </div>
  );
}
