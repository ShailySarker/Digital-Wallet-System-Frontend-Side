import type { ISidebarItem } from "@/types";

export const generateRoutes = (sideBarItems: ISidebarItem[]) => {
  return sideBarItems.map((item) => ({
    path: item.url,
    Component: item.component,
  }));
};