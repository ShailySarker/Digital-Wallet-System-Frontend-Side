import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function Setting() {
  const STORAGE_KEY = "isTourCompleted";

  const restartTour = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };
  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        Setting
      </h1>
      <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary rounded-2xl xl:p-16 lg:p-10 md:p-8 p-5 lg:w-1/2 md:w-2/3 w-full mx-auto">
        <h1 className="text-center xl:text-2xl lg:text-[20.5px] md:text-[19px] text-lg xl:mb-8 lg:mb-6 md:mb-5 mb-4">
          Want to restart the tour-guide?
        </h1>
        <Card className="bg-card/45">
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Guided Tour</h4>
              <p className="text-sm text-muted-foreground mb-4 italic">
                You have successfully completed the guided tour. If you would
                like to review the features and navigation steps again, you may
                restart the tour at any time.
              </p>
              <Button
                // variant="outline"
                onClick={restartTour}
                className="flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                Restart Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
