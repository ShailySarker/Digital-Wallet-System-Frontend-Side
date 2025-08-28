/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import { useAgentStatsQuery, useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";
import { Button } from "@/components/ui/button";

export default function Overview() {
  const { data } = useMyProfileQuery(undefined);
  const { data: myWallet, isLoading: walletLoading } = useMyWalletQuery({});
  // console.log(myWallet)
  
  const { data: agentStats } = useAgentStatsQuery({});
// console.log(agentStats)
  const {
    data: myTransaction,
    isLoading: transactionsLoading,
    isError: transactionError,
  } = useMyTransactionQuery({ limit: 5 });
  // console.log(myTransaction);
  return (
    <div>
      <div className="md:p-6 p-5 space-y-6">
        <Card className="bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-xl rounded-md">
          <CardContent className="flex flex-col items-center lg:p-6 p-5">
            <h2 className="text-center font-bold italic lg:text-base text-[15px]">
              Hello, {data?.data?.name}. Welcome to your dashboard!
            </h2>
            <p className="lg:text-lg text-base lg:pt-5 pt-4">
              Your Wallet Balance
            </p>
            <h2 className="text-2xl md:text-4xl font-bold mt-2">
              {walletLoading ? "Waiting..." : myWallet?.data?.balance} BDT
            </h2>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-accent/50 border-primary">
            <CardContent className="flex flex-col items-center">
              <p className="font-semibold">Total Cash In</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                {agentStats?.data?.totalCashIn} BDT
              </h2>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-accent/50 border-primary">
            <CardContent className="flex flex-col items-center">
              <p className="font-semibold">Total Cash Out</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                {agentStats?.data?.totalCashOut} BDT
              </h2>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-accent/50 border-primary">
            <CardContent className="flex flex-col items-center">
              <p className="font-semibold">Commission Earned</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                {agentStats?.data?.totalCommission} BDT
              </h2>
            </CardContent>
          </Card>
        </div>
        {transactionError ? (
          <ErrorPage />
        ) : transactionsLoading ? (
          <LazyLoader />
        ) : (
          <>
            {myTransaction?.data?.length === 0 ? (
              <></>
            ) : (
              <Card className="rounded-md">
                <CardHeader>
                  <CardTitle className="flex md:flex-row md:justify-between md:items-center justify-center gap-3">
                    <span>Recent Transactions History</span>
                    <Link to="/user/transactions" className="md:block hidden">
                      <Button className="bg-primary">View All</Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-scroll w-full">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-3">Type</th>
                        <th className="py-2 px-3">Sender</th>
                        <th className="py-2 px-3">Receiver</th>
                        <th className="py-2 px-3">Amount</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myTransaction?.data?.map((transaction?: any) => (
                        <tr
                          key={transaction?._id}
                          className="border-b hover:bg-primary/60 cursor-pointer"
                        >
                          <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                            {transaction?.type}
                          </td>
                          <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                            {transaction?.fromWallet}
                          </td>
                          <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                            {transaction?.toWallet}
                          </td>
                          <td className="p-3 font-semibold lg:text-sm text-xs">
                            {transaction?.amount} BDT
                          </td>
                          <td
                            className={`p-3 capitalize lg:text-sm text-xs ${
                              transaction?.status === "SUCCESS"
                                ? "text-green-500"
                                : "text-yellow-300"
                            }`}
                          >
                            {transaction?.status}
                          </td>
                          <td className="py-2 px-3 lg:text-sm text-xs">
                            {new Date(
                              transaction?.createdAt
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
                <Link
                  to="/user/transactions"
                  className="md:hidden flex justify-center"
                >
                  <Button className="bg-primary">View All</Button>
                </Link>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
