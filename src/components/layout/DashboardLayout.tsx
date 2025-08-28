import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <div className="bg-accent xl:py-3 lg:py-2 md:py-[7px] py-2">
          <SidebarTrigger className="h-10 w-10 bg-primary text-white m-2 rounded-sm hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center hover:outline-2" />
        </div>
        <div className="w-full ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}