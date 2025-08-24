import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router";
import Logo from "@/assets/icons/Logo";
import { ModeToggle } from "./ModeToggler";
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
import { toast } from "sonner";

const Navbar = () => {
  const { data } = useMyProfileQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const firstLetter = data?.data?.name.charAt(0).toUpperCase();
  const isActive = (path: string) => location.pathname === path;
  const dashboardRoute = data?.data?.role.toLowerCase();

  const publicRoutes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/features", name: "Features" },
    { path: "/pricing", name: "Pricing" },
    { path: "/contact", name: "Contact" },
    { path: "/faq", name: "Faq" },
  ];

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
    <div className="sticky top-0 z-50 bg-accent xl:px-8 lg:px-6 md:px-7 px-5 xl:py-6 md:py-5 py-4">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {publicRoutes?.map((route) => (
              <NavigationMenuItem>
                <NavigationMenuLink
                  key={route.path}
                  href={route.path}
                  className={`${navigationMenuTriggerStyle()} ${
                    isActive(route.path) ? "text-primary" : ""
                  }`}
                >
                  <span className="xl:text-base lg:text-[14.5px] hover:text-primary">
                    {route.name}
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex lg:gap-2 gap-2">
          <ModeToggle />

          <div className="hidden items-center xl:gap-3 lg:gap-2 lg:flex">
            {data?.data?.email ? (
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {firstLetter}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="xl:w-56 xl:p-3 p-2 lg:w-48 xl:mr-8 lg:mr-6 md:mr-7 mr-5 flex flex-col gap-2">
                    {privateRoutes?.map((route) => (
                      <DropdownMenuItem asChild key={route.path}>
                        <Link
                          to={route.path}
                          className={`hover:text-primary xl:text-base lg:text-[14.5px] font-medium ${
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
              </div>
            ) : (
              <div className="items-center xl:gap-3 lg:gap-2 lg:flex">
                <Link to="/login" className="cursor-pointer">
                  <Button className="xl:text-base lg:text-[14.5px] ">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="cursor-pointer">
                  <Button
                    className="xl:text-base lg:text-[14.5px]"
                    variant="outline"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              {data?.data?.email ? (
                <Avatar className="h-10 w-10 cursor-pointer">
                  <AvatarFallback className="bg-primary text-white font-semibold">
                    {firstLetter}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Button variant="outline" size="icon">
                  <MenuIcon className="md:h-4 md:w-4 w-3 h-3" />
                </Button>
              )}
            </SheetTrigger>
            <SheetContent
              side="top"
              className="max-h-screen overflow-auto md:px-2 px-1 pt-2"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link to="/">
                    <Logo />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col md:px-4 px-4 md:pb-6 pb-5 md:pt-2">
                <div className="flex flex-col md:gap-[22px] gap-5">
                  {publicRoutes.map((route) => (
                    <SheetClose asChild>
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`md:text-[15px] text-[14.5px] font-medium hover:text-primary ${
                          isActive(route.path)
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        {route.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                {data?.data?.email ? (
                  <div>
                    <div className="flex flex-col md:gap-[22px] gap-5 md:pt-[22px] pt-5">
                      {privateRoutes?.map((route) => (
                        <SheetClose asChild key={route.path}>
                          <Link
                            to={route.path}
                            className={`md:text-[15px] text-[14.5px] font-medium hover:text-primary ${
                              isActive(route.path)
                                ? "text-primary font-semibold"
                                : ""
                            }`}
                          >
                            {route.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                    <div className="md:mt-10 mt-8 flex flex-col gap-3 w-full">
                      <Button
                        className="md:text-[15px] text-[14.5px] w-full cursor-pointer"
                        // variant="outline"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="md:mt-10 mt-8 flex flex-col gap-3 w-full">
                    <Link to="/login" className="cursor-pointer">
                      <Button className="md:text-[15px] text-[14.5px] w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" className="cursor-pointer">
                      <Button
                        className="md:text-[15px] text-[14.5px] w-full"
                        variant="outline"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };
