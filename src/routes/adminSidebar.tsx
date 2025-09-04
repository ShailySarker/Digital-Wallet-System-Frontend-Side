import Agents from "@/pages/Admin/Agents";
import Overview from "@/pages/Admin/Overview";
import Transactions from "@/pages/Admin/Transactions";
import Users from "@/pages/Admin/Users";
import { ArrowDownUp, Home, Users2, UserStar } from "lucide-react";

const adminSidebar = [
  {
    icon: Home,
    title: "Overview",
    url: "/admin/overview",
    component: Overview,
  },
  {
    icon: Users2,
    title: "Users",
    url: "/admin/all-users",
    component: Users,
  },
  {
    icon: UserStar,
    title: "Agents",
    url: "/admin/all-agents",
    component: Agents,
  },
  {
    icon: ArrowDownUp,
    title: "Transactions",
    url: "/admin/all-transactions",
    component: Transactions,
  },
];

export default adminSidebar;
