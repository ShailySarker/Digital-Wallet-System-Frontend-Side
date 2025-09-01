import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import Commission from "@/pages/Agent/Commission";
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
    title: "Commission",
    url: "/agent/my-commission-history",
    component: Commission,
  },
  {
    title: "Transactions",
    url: "/agent/my-transactions",
    component: Transacations,
  },
];

export default agentSidebar;