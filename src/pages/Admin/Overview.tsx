import RoleBasedPieChart from "@/components/modules/Admin/RoleBasedPieChart";
import TransactionTypeBasedBarChart from "@/components/modules/Admin/TransactionTypeBasedBarChart";
import { Card, CardContent } from "@/components/ui/card";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import { useAdminStatsQuery } from "@/redux/features/transaction/transaction.api";

export default function Overview() {
  const { data } = useMyProfileQuery({});
  const { data: adminStats, isLoading: adminStatsLoading } = useAdminStatsQuery(
    {}
  );
  console.log(adminStats);
  return (
    <div className="md:p-6 p-5 space-y-6">
      {/* banner */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl rounded-xl xl:h-64 lg:h-56 md:h-48 h-44 flex justify-center">
        <CardContent className="flex flex-col items-center xl:p-8 lg:p-6 p-5">
          <h2 className="text-center font-bold italic xl:text-xl lg:text-lg text-base">
            Hello, {data?.data?.name}. Welcome to your dashboard!
          </h2>
        </CardContent>
      </Card>
      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-primary/5 border-primary">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="font-semibold">Total User</p>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold md:mt-2 mt-1">
              {adminStatsLoading ? "...." : adminStats?.data?.totalUsers}
            </h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-primary/5 border-primary">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="font-semibold">Total Agent</p>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold md:mt-2 mt-1">
              {adminStatsLoading ? "...." : adminStats?.data?.totalAgents}
            </h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-primary/5 border-primary">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="font-semibold text-center">Total Transaction</p>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold md:mt-2 mt-1">
              {adminStatsLoading ? "...." : adminStats?.data?.totalTransactions}
            </h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-primary/5 border-primary">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="font-semibold text-center">Transactions Amount</p>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold md:mt-2 mt-1">
              {adminStatsLoading
                ? "...."
                : adminStats?.data?.totalTransactionsAmount}
            </h2>
          </CardContent>
        </Card>
      </div>
      {/* visual representstion */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {/* user type based pic chart */}
        <RoleBasedPieChart
          roleBasedData={adminStats?.data?.roleBasedPieChartData}
        />
        {/* transaction type base bar chart */}
        <TransactionTypeBasedBarChart
          transactionTypeBasedData={
            adminStats?.data?.transactionTypeBasedBarChartData
          }
        />
      </div>
    </div>
  );
}
