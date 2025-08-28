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
  // console.log(loggedInUserInfo);
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
                  className="text-[1rem]"
                >
                  <Link
                    to={item.url}
                    className={`${
                      item.url.endsWith("/profile") ? "hidden" : ""
                    }`}
                  >
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
