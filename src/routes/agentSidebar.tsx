import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import Commission from "@/pages/Agent/Commission";
import Overview from "@/pages/Agent/Overview";
import Transacations from "@/pages/Agent/Transacations";
import { ArrowDownToLine, ArrowDownUp, ArrowUpFromLine, Home, SquarePlus } from "lucide-react";

const agentSidebar = [
  {
    icon: Home,
    title: "Overview",
    url: "/agent/overview",
    component: Overview,
  },
  {
    icon: ArrowDownToLine,
    title: "Cash In",
    url: "/agent/cash-in",
    component: CashIn,
  },
  {
    icon: ArrowUpFromLine,
    title: "Cash Out",
    url: "/agent/cash-out",
    component: CashOut,
  },
  {
    icon: SquarePlus,
    title: "Commission",
    url: "/agent/my-commission-history",
    component: Commission,
  },
  {
    icon: ArrowDownUp,
    title: "Transactions",
    url: "/agent/my-transactions",
    component: Transacations,
  },
];

export default agentSidebar;
