import Deposit from "@/pages/User/Deposit";
import Overview from "@/pages/User/Overview";
import SendMoney from "@/pages/User/SendMoney";
import Transactions from "@/pages/User/Transactions";
import Withdraw from "@/pages/User/Withdraw";
import {
  ArrowDownCircle,
  ArrowDownUp,
  ArrowUpCircle,
  Home,
  Send,
} from "lucide-react";

const userSidebar = [
  {
    icon: Home,
    title: "Overview",
    url: "/user/overview",
    component: Overview,
  },
  {
    icon: ArrowDownCircle,
    title: "Deposit",
    url: "/user/deposit",
    component: Deposit,
  },
  {
    icon: ArrowUpCircle,
    title: "Withdraw",
    url: "/user/withdraw",
    component: Withdraw,
  },
  {
    icon: Send,
    title: "Send Money",
    url: "/user/send-money",
    component: SendMoney,
  },
  {
    icon: ArrowDownUp,
    title: "Transactions",
    url: "/user/transactions",
    component: Transactions,
  },
];

export default userSidebar;
