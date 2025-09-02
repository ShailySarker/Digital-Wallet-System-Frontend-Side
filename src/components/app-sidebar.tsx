import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link, useLocation } from "react-router";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import Logo from "@/assets/icons/Logo";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: loggedInUserInfo } = useMyProfileQuery({});
  const firstLetter = loggedInUserInfo?.data?.name.charAt(0).toUpperCase();

  const location = useLocation();
  const data = {
    navMain: getSidebarItems(loggedInUserInfo?.data?.role),
  };

  return (
    <Sidebar {...props} className="overflow-hidden">
      <SidebarHeader className="mx-1">
        <Link
          to="/"
          className="flex items-center py-3 border-b transition-all duration-300 ease-in-out"
        >
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className="mx-3">
        {data?.navMain?.map((item, index) => {
          const isActive = location.pathname === item.url;
          return (
            <SidebarGroupContent key={index} className="w-full">
              <SidebarMenu>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="xl:text-lg text-base xl:mt-1 border-2 xl:px-3 lg:px-2 md:px-[10px] xl:py-5 lg:py-4 py-[16.5px]"
                >
                  <Link
                    to={item.url}
                    className={`${
                      item.url.endsWith("/profile") ? "hidden" : ""
                    }`}
                  >
                    <span className="xl:pr-2 pr-1"><item.icon className="xl:size-5 size-4.5" /></span>
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroupContent>
          );
        })}
      </SidebarContent>
      <SidebarFooter className="mx-1">
        <div
          // to={`/${loggedInUserInfo?.data?.role}/profile`}
          className="flex items-center gap-2 p-2 border rounded-md"
        >
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarFallback className="bg-[#7f22fe] text-white font-semibold">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold capitalize">
              {loggedInUserInfo?.data?.name}
            </p>
            <p className="opacity-70 text-sm">
              {loggedInUserInfo?.data?.email}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
