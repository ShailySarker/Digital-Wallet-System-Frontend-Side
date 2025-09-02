/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { ArrowDownCircle, ArrowUpCircle, Send } from "lucide-react";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";
import { Button } from "@/components/ui/button";

export default function Overview() {
  const { data } = useMyProfileQuery(undefined);
  const { data: myWallet, isLoading: walletLoading } = useMyWalletQuery({});
  const {
    data: myTransaction,
    isLoading: transactionsLoading,
    isError: transactionError,
  } = useMyTransactionQuery({ limit: 5 });
  console.log(myTransaction);
  return (
    <div>
      <div className="md:p-6 p-5 space-y-6">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl rounded-xl">
          <CardContent className="flex flex-col items-center xl:p-8 lg:p-6 p-5">
            <h2 className="text-center font-bold italic xl:text-lg lg:text-base text-[15px]">
              Hello, {data?.data?.name}. Welcome to your dashboard!
            </h2>
            <p className="lg:text-lg text-base xl:pt-6 lg:pt-5 pt-4">
              Your Wallet Balance
            </p>
            <h2 className="text-2xl md:text-4xl font-bold mt-2">
              {walletLoading ? "Waiting..." : myWallet?.data?.balance} BDT
            </h2>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/user/deposit" className="w-full">
            <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-primary/5 border-primary">
              <CardContent className="flex flex-col items-center md:p-4">
                <ArrowDownCircle className="w-9 h-9 text-indigo-500 mb-2" />
                <p className="font-semibold">Deposit Money</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/withdraw" className="w-full">
            <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-primary/5 border-primary">
              <CardContent className="flex flex-col items-center md:p-4">
                <ArrowUpCircle className="w-9 h-9 text-green-500 mb-2" />
                <p className="font-semibold">Withdraw Money</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/send-money" className="w-full">
            <Card className="hover:shadow-lg transition rounded-xl cursor-pointer bg-primary/5 border-primary">
              <CardContent className="flex flex-col items-center md:p-4">
                <Send className="w-9 h-9 text-blue-500 mb-2" />
                <p className="font-semibold">Send Money</p>
              </CardContent>
            </Card>
          </Link>
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
              <>
                <Card className="rounded-xl shadow border-primary bg-primary/5">
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
                              {transaction?.fromWalletSender}
                            </td>
                            <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                              {transaction?.toWalletReceiver}
                            </td>
                            <td className="p-3 font-semibold lg:text-sm text-xs">
                              {transaction?.amount} BDT
                            </td>
                            <td
                              className={`p-3 capitalize font-medium lg:text-sm text-xs ${
                                transaction?.status === "SUCCESS"
                                  ? "text-green-600"
                                  : "text-yellow-600"
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
