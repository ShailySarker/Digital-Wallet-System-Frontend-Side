/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";
import { useMyCommissionQuery } from "@/redux/features/transaction/transaction.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export default function Commission() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const {
    data: myCommission,
    isError: myCommissionError,
    isLoading: myCommissionLoading,
  } = useMyCommissionQuery({ page: currentPage, limit });
  console.log(myCommission);

  const totalPage = myCommission?.meta?.totalPage || 1;
  const totalItems = myCommission?.meta?.total || 0;

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        My Commission History
      </h1>
      <div>
        {myCommissionError ? (
          <ErrorPage />
        ) : myCommissionLoading ? (
          <LazyLoader />
        ) : (
          <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary rounded-2xl md:p-6 p-3 w-full mx-auto">
            <Card className="rounded-md xl:mt-12 lg:mt-10 md:mt-8 mt-6">
              <CardHeader>
                <CardTitle className="flex md:flex-row flex-col md:justify-between md:items-center justify-center items-center md:gap-3 gap-2">
                  <span>Transactions History:</span>
                  <span className="text-sm font-medium italic opacity-80">
                    {/* {totalItems} transactions found */}
                  </span>
                </CardTitle>
              </CardHeader>
              {myCommission?.data?.length === 0 ? (
                <>
                  <div className="xl:py-44 lg:py-36 md:py-32 py-28 w-full mx-auto">
                    <h1 className="italic text-center font-semibold xl:text-lg lg:text-[16.5px] md:text-[15px] text-sm">
                      No commission history is available now!
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
                          <th className="py-2 px-3">Commission</th>
                          <th className="py-2 px-3">Status</th>
                          <th className="py-2 px-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myCommission?.data?.map((commission?: any) => (
                          <tr
                            key={commission?._id}
                            className="border-b hover:bg-primary/60 cursor-pointer"
                          >
                            <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                              {commission?.type}
                            </td>
                            <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                              {commission?.fromWalletSender}
                            </td>
                            <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                              {commission?.toWalletReceiver}
                            </td>
                            <td className="p-3 font-semibold lg:text-sm text-xs">
                              {commission?.amount} BDT
                            </td>
                            <td className="p-3 font-semibold lg:text-sm text-xs">
                              {commission?.commission} BDT
                            </td>
                            <td
                              className={`p-3 capitalize font-medium lg:text-sm text-xs ${
                                commission?.status === "SUCCESS"
                                  ? "text-green-600"
                                  : commission?.status === "FAILED"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {commission?.status}
                            </td>
                            <td className="py-2 px-3 lg:text-sm text-xs">
                              {new Date(
                                commission?.createdAt
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
