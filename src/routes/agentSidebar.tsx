import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import Overview from "@/pages/Agent/Overview";
import Transacations from "@/pages/Agent/Transacations";

const agentSidebar = [
  {
    title: "Overview",
    url: "/agent/overview",
    component: Overview,
  },
  {
    title: "Cash In",
    url: "/agent/cash-in",
    component: CashIn,
  },
  {
    title: "Cash Out",
    url: "/agent/cash-out",
    component: CashOut,
  },
  {
    title: "Transactions",
    url: "/agent/transactions",
    component: Transacations,
  },
];

export default agentSidebar;