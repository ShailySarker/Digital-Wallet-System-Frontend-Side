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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Commission() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [sortOption, setSortOption] = useState("newest");

  // Convert select value to API parameters
  const getSortParams = () => {
    switch (sortOption) {
      case "newest":
        return { sortBy: "createdAt", sortOrder: "desc" };
      case "oldest":
        return { sortBy: "createdAt", sortOrder: "asc" };
      case "highestCommission":
        return { sortBy: "commission", sortOrder: "desc" };
      case "lowestCommission":
        return { sortBy: "commission", sortOrder: "asc" };
      case "highestAmount":
        return { sortBy: "amount", sortOrder: "desc" };
      case "lowestAmount":
        return { sortBy: "amount", sortOrder: "asc" };
      default:
        return { sortBy: "createdAt", sortOrder: "desc" };
    }
  };

  const sortParams = getSortParams();

  const {
    data: myCommission,
    isError: myCommissionError,
    isLoading: myCommissionLoading,
  } = useMyCommissionQuery({
    page: currentPage,
    limit,
    ...sortParams,
  });

  const totalPage = myCommission?.meta?.totalPage || 1;
  const totalItems = myCommission?.meta?.total || 0;

  // Reset to first page when sorting changes
  const handleSortChange = (value: any) => {
    setSortOption(value);
    setCurrentPage(1);
  };

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
            <h1 className="lg:text-xl text-lg font-semibold mb-4">Filters</h1>

            <div className="w-full">
              <Label className="lg:mb-3 mb-2">Sorting By</Label>

              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Date: Newest First</SelectItem>
                  <SelectItem value="oldest">Date: Oldest First</SelectItem>
                  <SelectItem value="highestCommission">
                    Commission: Highest First
                  </SelectItem>
                  <SelectItem value="lowestCommission">
                    Commission: Lowest First
                  </SelectItem>
                  <SelectItem value="highestAmount">
                    Amount: Highest First
                  </SelectItem>
                  <SelectItem value="lowestAmount">
                    Amount: Lowest First
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card className="rounded-md xl:mt-12 lg:mt-10 md:mt-8 mt-6">
              <CardHeader>
                <CardTitle className="flex md:flex-row flex-col md:justify-between md:items-center justify-center items-center md:gap-3 gap-2">
                  <span>Commissions History:</span>
                  <span className="text-sm font-medium italic opacity-80">
                    {totalItems} transactions found
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
                      <thead className="bg-primary text-white">
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
                        {myCommission?.data?.map((commission: any) => (
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
                            <td className="p-3 font-semibold lg:text-sm text-xs text-center">
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
                            {/* Previous */}
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() =>
                                  setCurrentPage(Math.max(1, currentPage - 1))
                                }
                                className={`border px-3 py-1 rounded-md ${
                                  currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : "hover:bg-muted"
                                }`}
                              />
                            </PaginationItem>

                            {/* Page Numbers (max 5 visible) */}
                            {Array.from(
                              { length: Math.min(5, totalPage) },
                              (_, i) => {
                                const pageNum =
                                  Math.max(
                                    1,
                                    Math.min(totalPage - 4, currentPage - 2)
                                  ) + i;

                                if (pageNum > totalPage) return null;

                                const isActive = currentPage === pageNum;

                                return (
                                  <PaginationItem key={pageNum}>
                                    <PaginationLink
                                      isActive={isActive}
                                      onClick={() => setCurrentPage(pageNum)}
                                      className={`border px-3 py-1 rounded-md ${
                                        isActive
                                          ? "bg-primary text-primary-foreground border-primary dark:bg-primary dark:text-primary-foreground"
                                          : "hover:bg-muted"
                                      }`}
                                    >
                                      {pageNum}
                                    </PaginationLink>
                                  </PaginationItem>
                                );
                              }
                            )}

                            {/* Next */}
                            <PaginationItem>
                              <PaginationNext
                                onClick={() =>
                                  setCurrentPage(
                                    Math.min(totalPage, currentPage + 1)
                                  )
                                }
                                className={`border px-3 py-1 rounded-md ${
                                  currentPage === totalPage
                                    ? "pointer-events-none opacity-50"
                                    : "hover:bg-muted"
                                }`}
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
