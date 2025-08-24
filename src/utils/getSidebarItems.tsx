import { Role } from "@/constants/user.constant";
import adminSidebar from "@/routes/adminSidebar";
import agentSidebar from "@/routes/agentSidebar";
import userSidebar from "@/routes/userSidebar";
import type { ISidebarItem, TRole } from "@/types";

export const getSidebarItems = (role:TRole): ISidebarItem[] => {
  switch (role) {
    case Role.ADMIN:
      return [...adminSidebar];
    case Role.USER:
      return [...userSidebar];
    case Role.AGENT:
      return [...agentSidebar];
    default:
      return [];
  }
};