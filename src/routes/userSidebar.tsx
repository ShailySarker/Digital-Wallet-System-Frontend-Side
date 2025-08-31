import Deposit from "@/pages/User/Deposit";
import Overview from "@/pages/User/Overview";
import SendMoney from "@/pages/User/SendMoney";
import Transactions from "@/pages/User/Transactions";
import Withdraw from "@/pages/User/Withdraw";

const userSidebar = [
  {
    title: "Overview",
    url: "/user/overview",
    component: Overview,
  },
  {
    title: "Deposit",
    url: "/user/deposit",
    component: Deposit,
  },
  {
    title: "Withdraw",
    url: "/user/withdraw",
    component: Withdraw,
  },
  {
    title: "Send Money",
    url: "/user/send-money",
    component: SendMoney,
  },
  {
    title: "Transactions",
    url: "/user/transactions",
    component: Transactions,
  },
];

export default userSidebar;