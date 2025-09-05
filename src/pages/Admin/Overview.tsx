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
      <Card className="bg-gradient-to-r from-blue-500 to-purple-700 text-white shadow-xl rounded-xl xl:h-64 lg:h-56 md:h-48 h-44 flex justify-center">
        <CardContent className="flex flex-col items-center xl:p-8 lg:p-6 p-5">
          <h2 className="text-center font-bold italic xl:text-xl lg:text-lg text-base">
            Hello, {data?.data?.name}. Welcome to your dashboard!
          </h2>
        </CardContent>
      </Card>
      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition rounded-xl bg-gradient-to-r from-cyan-300 to-purple-50 border-2 border-cyan-800">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="font-semibold text-cyan-800">Total User</p>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold md:mt-2 mt-1 text-cyan-800">
              {adminStatsLoading ? "...." : adminStats?.data?.totalUsers}
            </h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl bg-gradient-to-r from-green-300 to-purple-50 border-2 border-green-800">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="font-semibold text-green-800">Total Agent</p>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold md:mt-2 mt-1 text-green-800">
              {adminStatsLoading ? "...." : adminStats?.data?.totalAgents}
            </h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl bg-gradient-to-r from-amber-300 to-purple-50 border-2 border-amber-800">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="font-semibold text-center text-amber-800">Total Transaction</p>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold md:mt-2 mt-1 text-amber-800">
              {adminStatsLoading ? "...." : adminStats?.data?.totalTransactions}
            </h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl bg-gradient-to-r from-pink-300 to-purple-50 border-2 border-pink-800">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="font-semibold text-center text-pink-800">Volume</p>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold md:mt-2 mt-1 text-pink-800">
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
