/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStatsQuery } from "@/redux/features/transaction/transaction.api";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Send,
  DollarSign,
  Wallet,
} from "lucide-react";
export default function TransactionsTopper() {
  const {
    data: adminStats,
    isLoading: adminStatsLoading,
    isError: adminStatsError,
  } = useAdminStatsQuery({});
  const transactionData =
    adminStats?.data?.transactionTypeBasedBarChartData || [];

  // color mapping
  const cardColors: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    DEPOSIT: {
      bg: "bg-gradient-to-l from-green-300 to-green-50",
      text: "text-green-700",
      border: "border-green-600",
    },
    CASH_IN: {
      bg: "bg-gradient-to-l from-blue-300 to-blue-50",
      text: "text-blue-700",
      border: "border-blue-600",
    },
    WITHDRAW: {
      bg: "bg-gradient-to-l from-red-300 to-red-50",
      text: "text-red-700",
      border: "border-red-600",
    },
    SEND: {
      bg: "bg-gradient-to-l from-purple-300 to-purple-50",
      text: "text-purple-700",
      border: "border-purple-600",
    },
    CASH_OUT: {
      bg: "bg-gradient-to-l from-yellow-300 to-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-600",
    },
  };

  // icon mapping
  const cardIcons: Record<string, React.ElementType> = {
    DEPOSIT: ArrowDownCircle,
    CASH_IN: DollarSign,
    WITHDRAW: ArrowUpCircle,
    SEND: Send,
    CASH_OUT: Wallet,
  };

  return (
    <>
      {adminStatsError ? (
        <></>
      ) : adminStatsLoading ? (
        <></>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-3">
          {transactionData?.map((item: any, idx: number) => {
            const colors = cardColors[item?.type] || {
              bg: "bg-gradient-to-l from-gray-300 to-gray-50",
              text: "text-gray-700",
              border: "border-gray-600",
            };

            const Icon = cardIcons[item?.type] || Wallet;

            return (
              <Card
                key={idx}
                className={`rounded-2xl ${colors.bg} ${colors.border} border`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
                  <CardTitle className={`text-sm font-medium ${colors.text}`}>
                    {item?.type}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${colors.text} opacity-80`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${colors.text}`}>
                    {item?.count}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
