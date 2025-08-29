/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TransactionFilter from "@/components/modules/Transaction/TransactionFilter";
import { useSearchParams } from "react-router";

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchParams] = useSearchParams();

  // Get all filter parameters
  const type = searchParams.get("type") || undefined;
  const status = searchParams.get("status") || undefined;
  // const role = searchParams.get("role") || undefined;

  const {
    data: myTransaction,
    isLoading: transactionsLoading,
    isError: transactionError,
  } = useMyTransactionQuery({
    page: currentPage,
    limit,
    type,
    status,
  });
  console.log(myTransaction);

  const totalPage = myTransaction?.meta?.totalPage || 1;

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        My Transaction History
      </h1>
      <div>
        {transactionError ? (
          <ErrorPage />
        ) : transactionsLoading ? (
          <LazyLoader />
        ) : (
          <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary rounded-2xl md:p-6 p-3 w-full mx-auto">
            <TransactionFilter />
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle className="flex md:flex-row md:justify-between md:items-center justify-center gap-3">
                  <span>Transactions History:</span>
                </CardTitle>
              </CardHeader>
              {myTransaction?.data?.length === 0 ? (
                <>
                  <div className="xl:py-44 lg:py-36 md:py-32 py-28 w-full mx-auto">
                    <h1 className="italic text-center font-semibold xl:text-lg lg:text-[16.5px] md:text-[15px] text-sm">
                      No transaction history is available now!
                    </h1>
                  </div>
                </>
              ) : (
                <div>
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
                  {/* pagination */}
                  {totalPage > 1 && (
                    <div className="flex justify-center my-8">
                      <div>
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() =>
                                  setCurrentPage((prev) => prev - 1)
                                }
                                className={
                                  currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                                }
                              />
                            </PaginationItem>
                            {Array.from(
                              { length: totalPage },
                              (_, index) => index + 1
                            ).map((page) => (
                              <PaginationItem
                                key={page}
                                onClick={() => setCurrentPage(page)}
                              >
                                <PaginationLink isActive={currentPage === page}>
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationNext
                                onClick={() =>
                                  setCurrentPage((prev) => prev + 1)
                                }
                                className={
                                  currentPage === totalPage
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                                }
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
