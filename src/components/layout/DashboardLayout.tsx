import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <div>
          <SidebarTrigger className="h-10 w-14 bg-[#7f22fe] text-white m-2 rounded-sm hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center hover:outline-2" />
        </div>
        <div className="w-full p-5 lg:p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}