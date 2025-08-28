import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Mission() {
  return (
    <div>
      {/* Mission Section */}
      <section className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        <h2 className="xl:text-3xl lg:text-[26px] md:text-[22px] text-lg font-bold xl:mb-5 lg:mb-4 md:mb-3 mb-2 text-center">
          Our Mission & Values
        </h2>
        <div className="grid md:grid-cols-2 xl:gap-8 lg:gap-6 md:gap-5 gap-3">
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="font-semibold lg:text-lg text-[17px] lg:mb-3 mb-2">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-80 lg:text-base text-sm">
                To democratize access to financial services by providing a
                secure, affordable, and user-friendly digital wallet platform
                that empowers individuals and businesses to participate in the
                digital economy.
              </p>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="font-semibold lg:text-lg text-[17px] lg:mb-3 mb-2">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-80 lg:text-base text-sm">
                To create a world where everyone has equal access to financial
                tools and opportunities, regardless of their location, income
                level, or background, fostering economic growth and financial
                inclusion for all.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
