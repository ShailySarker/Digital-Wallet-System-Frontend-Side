import { Link, Outlet, useLocation } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { ModeToggle } from "../shared/ModeToggler";
import { toast } from "sonner";
import {
  authApi,
  useLogoutMutation,
  useMyProfileQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function DashboardLayout() {
  const { data } = useMyProfileQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const firstLetter = data?.data?.name.charAt(0).toUpperCase();
  const isActive = (path: string) => location.pathname === path;
  const dashboardRoute = data?.data?.role.toLowerCase();

  const privateRoutes = [
    { path: `/${dashboardRoute}`, name: "Dashboard" },
    { path: "/edit-profile", name: "Edit Profile" },
    { path: "/change-password", name: "Change Password" },
  ];

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out .....");
    try {
      await logout({});
      dispatch(authApi.util.resetApiState());
      toast.success("You logged out successfully", { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Logout Error:${error?.data?.message || error?.data}`);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      {/* <SidebarInset className="overflow-auto"> */}
        <div className="sticky top-0 z-50 flex justify-between items-center bg-accent xl:py-[19px] lg:py-4 md:py-[14px] py-3 px-5">
          <div className="">
            <SidebarTrigger className="lg:h-9 lg:w-9 h-8 w-8 bg-primary text-white rounded-sm hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center hover:outline-2 hover:border" />
          </div>
          <div className="flex items-center lg:gap-3 gap-2">
            <ModeToggle />
            {data?.data?.email && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="lg:h-10 lg:w-10 h-9 w-9 cursor-pointer">
                    <AvatarFallback className="bg-primary text-white font-medium">
                      {firstLetter}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="xl:w-56 xl:p-3 p-2 lg:w-48 xl:mr-8 lg:mr-6 md:mr-7 mr-5 flex flex-col gap-2">
                  {privateRoutes?.map((route) => (
                    <DropdownMenuItem asChild key={route.path}>
                      <Link
                        to={route.path}
                        className={`hover:text-primary xl:text-base lg:text-[14.5px] font-medium cursor-pointer ${
                          isActive(route.path) ? "text-primary" : ""
                        }`}
                      >
                        {route.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem>
                    <Button
                      onClick={handleLogout}
                      // variant="outline"
                      className="cursor-pointer w-full justify-center xl:text-base lg:text-[14.5px]"
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>{" "}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <div className="w-full ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
