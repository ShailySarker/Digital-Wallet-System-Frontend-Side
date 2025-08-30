import Agents from "@/pages/Admin/Agents";
import Overview from "@/pages/Admin/Overview";
import Transactions from "@/pages/Admin/Transactions";
import Users from "@/pages/Admin/Users";

const adminSidebar = [
  {
    title: "Overview",
    url: "/admin/overview",
    component: Overview,
  },
  {
    title: "Users",
    url: "/admin/all-users",
    component: Users,
  },
  {
    title: "Agents",
    url: "/admin/all-agents",
    component: Agents,
  },
  {
    title: "Transactions",
    url: "/admin/all-transactions",
    component: Transactions,
  },
];

export default adminSidebar;