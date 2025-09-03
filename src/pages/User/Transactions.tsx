/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function TransactionHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [sortOption, setSortOption] = useState("newest");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Convert filters and sort to API parameters
  const getQueryParams = (): Record<string, string | number> => {
    const params: Record<string, string | number> = {
      page: currentPage,
      limit,
    };

    // Apply sorting
    switch (sortOption) {
      case "newest":
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
        break;
      case "oldest":
        params.sortBy = "createdAt";
        params.sortOrder = "asc";
        break;
      case "highestAmount":
        params.sortBy = "amount";
        params.sortOrder = "desc";
        break;
      case "lowestAmount":
        params.sortBy = "amount";
        params.sortOrder = "asc";
        break;
      case "highestCommission":
        params.sortBy = "commission";
        params.sortOrder = "desc";
        break;
      case "lowestCommission":
        params.sortBy = "commission";
        params.sortOrder = "asc";
        break;
      default:
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
    }

    // Apply filters
    if (typeFilter !== "all") {
      params.type = typeFilter;
    }

    if (statusFilter !== "all") {
      params.status = statusFilter;
    }

    return params;
  };

  const queryParams = getQueryParams();

  const {
    data: transactions,
    isError,
    isLoading,
  } = useMyTransactionQuery(queryParams);

  const totalPage = transactions?.meta?.totalPage || 1;
  const totalItems = transactions?.meta?.total || 0;

  // Reset to first page when filters or sorting changes
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        My Transactions History
      </h1>

      <div>
        {isError ? (
          <ErrorPage />
        ) : isLoading ? (
          <LazyLoader />
        ) : (
          <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary rounded-2xl md:p-6 p-3 w-full mx-auto">
            <h1 className="lg:text-xl text-lg font-semibold mb-4">Filters</h1>
            <div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
                {/* Type Filter */}
                <div className="w-full">
                  <Label className="lg:mb-3 mb-2">Transaction Type</Label>
                  <Select
                    value={typeFilter}
                    onValueChange={(value) => {
                      setTypeFilter(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transaction Types</SelectItem>
                      <SelectItem value="CASH_IN">Cash In</SelectItem>
                      <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                      <SelectItem value="SEND">Send Money</SelectItem>
                      <SelectItem value="DEPOSIT">Deposit</SelectItem>
                      <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="w-full">
                  <Label className="lg:mb-3 mb-2">Transaction Status</Label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                      setStatusFilter(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All Transaction Status
                      </SelectItem>
                      <SelectItem value="SUCCESS">Success</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="FAILED">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Sort Option */}
              <div className="w-full mt-4">
                <Label className="lg:mb-3 mb-2">Sort by</Label>
                <Select
                  value={sortOption}
                  onValueChange={(value) => {
                    setSortOption(value);
                    handleFilterChange();
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Date: Newest First</SelectItem>
                    <SelectItem value="oldest">Date: Oldest First</SelectItem>
                    <SelectItem value="highestAmount">
                      Amount: Highest First
                    </SelectItem>
                    <SelectItem value="lowestAmount">
                      Amount: Lowest First
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Card className="rounded-md xl:mt-12 lg:mt-10 md:mt-8 mt-6">
              <CardHeader>
                <CardTitle className="">
                  <div className="flex md:flex-row flex-col md:justify-between justify-center items-center md:gap-0 gap-2">
                    <span>Transactions History:</span>
                    <span className="text-sm font-medium italic opacity-80">
                      {totalItems} transactions found
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>

              {transactions?.data?.length === 0 ? (
                <div className="xl:py-44 lg:py-36 md:py-32 py-28 w-full mx-auto">
                  <h1 className="italic text-center font-semibold xl:text-lg lg:text-[16.5px] md:text-[15px] text-sm">
                    No transactions history found!
                  </h1>
                </div>
              ) : (
                <div>
                  <CardContent className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b bg-primary/20">
                          <th className="py-3 px-4 font-semibold">Type</th>
                          <th className="py-3 px-4 font-semibold">Direction</th>
                          <th className="py-3 px-4 font-semibold">
                            Counterparty
                          </th>
                          <th className="py-3 xl:px-4 px-6 font-semibold">
                            Amount
                          </th>
                          <th className="py-3 px-4 font-semibold">Status</th>
                          <th className="py-3 xl:px-4 px-8 font-semibold">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions?.data?.map((transaction: any) => (
                          <tr
                            key={transaction?._id}
                            className="border-b hover:bg-primary/10 cursor-pointer transition-colors"
                          >
                            <td className="p-4 capitalize font-medium lg:text-sm text-xs">
                              {transaction?.type}
                            </td>
                            <td className="p-4 capitalize font-medium lg:text-sm text-xs">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  transaction.direction === "incoming"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {transaction.direction}
                              </span>
                            </td>
                            <td className="p-4 font-medium lg:text-sm text-xs">
                              {transaction.direction === "incoming"
                                ? transaction.senderName
                                : transaction.receiverName}
                              <br />
                              <span className="text-xs opacity-70">
                                {transaction.direction === "incoming"
                                  ? transaction.senderPhone
                                  : transaction.receiverPhone}
                              </span>
                            </td>
                            <td className="p-4 font-semibold lg:text-sm text-xs">
                              <span
                                className={
                                  transaction.direction === "incoming"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {/* {transaction.direction === "incoming"
                                  ? "+"
                                  : "-"} */}
                                {transaction?.amount} BDT
                              </span>
                            </td>
                            <td className="p-4 capitalize font-medium lg:text-sm text-xs">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  transaction?.status === "SUCCESS"
                                    ? "bg-green-100 text-green-800"
                                    : transaction?.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {transaction?.status}
                              </span>
                            </td>
                            <td className="p-4 lg:text-sm text-xs">
                              {new Date(
                                transaction?.createdAt
                              ).toLocaleDateString()}
                              <br />
                              <span className="text-xs opacity-70">
                                {new Date(
                                  transaction?.createdAt
                                ).toLocaleTimeString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>

                  {/* Pagination */}
                  {totalPage > 1 && (
                    <div className="flex justify-center my-8">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="md:block hidden">Previous</span>
                        </Button>

                        <div className="flex items-center gap-1">
                          {/* Always show first page */}
                          {currentPage > 2 && (
                            <Button
                              variant="outline"
                              onClick={() => setCurrentPage(1)}
                              className="h-8 w-8 p-0"
                            >
                              1
                            </Button>
                          )}

                          {/* Show ellipsis if needed */}
                          {currentPage > 3 && <span className="px-1">...</span>}

                          {/* Show current page and surrounding pages */}
                          {[currentPage - 1, currentPage, currentPage + 1]
                            .filter((page) => page >= 1 && page <= totalPage)
                            .map((page) => (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                onClick={() => setCurrentPage(page)}
                                className="h-8 w-8 p-0"
                              >
                                {page}
                              </Button>
                            ))}

                          {/* Show ellipsis if needed */}
                          {currentPage < totalPage - 2 && (
                            <span className="px-1">...</span>
                          )}

                          {/* Always show last page if not already shown */}
                          {currentPage < totalPage - 1 && (
                            <Button
                              variant="outline"
                              onClick={() => setCurrentPage(totalPage)}
                              className="h-8 w-8 p-0"
                            >
                              {totalPage}
                            </Button>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPage)
                            )
                          }
                          disabled={currentPage === totalPage}
                          className="flex items-center gap-1"
                        >
                          <span className="md:block hidden">Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
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

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import ErrorPage from "@/components/shared/ErrorPage";
// import LazyLoader from "@/components/shared/LazyLoader";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
// import { useState } from "react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import TransactionFilter from "@/components/modules/Transaction/TransactionFilter";
// import { useSearchParams } from "react-router";

// export default function Transactions() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit] = useState(5);
//   const [searchParams] = useSearchParams();

//   // Get all filter parameters
//   const type = searchParams.get("type") || undefined;
//   const status = searchParams.get("status") || undefined;
//   // const role = searchParams.get("role") || undefined;

//   const {
//     data: myTransaction,
//     isLoading: transactionsLoading,
//     isError: transactionError,
//   } = useMyTransactionQuery({
//     page: currentPage,
//     limit,
//     type,
//     status,
//   });
//   console.log(myTransaction);

//   const totalPage = myTransaction?.meta?.totalPage || 1;
//   const totalItems = myTransaction?.meta?.total || 0;

//   return (
//     <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
//       <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
//         My Transaction History
//       </h1>
//       <div>
//         {transactionError ? (
//           <ErrorPage />
//         ) : transactionsLoading ? (
//           <LazyLoader />
//         ) : (
//           <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary rounded-2xl md:p-6 p-3 w-full mx-auto">
//             <TransactionFilter />
//             <Card className="rounded-md xl:mt-12 lg:mt-10 md:mt-8 mt-6">
//               <CardHeader>
//                 <CardTitle className="flex md:flex-row flex-col md:justify-between md:items-center justify-center items-center md:gap-3 gap-2">
//                   <span>Transactions History:</span>
//                   <span className="text-sm font-medium italic opacity-80">
//                     {totalItems} transactions found
//                   </span>
//                 </CardTitle>
//               </CardHeader>
//               {myTransaction?.data?.length === 0 ? (
//                 <>
//                   <div className="xl:py-44 lg:py-36 md:py-32 py-28 w-full mx-auto">
//                     <h1 className="italic text-center font-semibold xl:text-lg lg:text-[16.5px] md:text-[15px] text-sm">
//                       No transaction history is available now!
//                     </h1>
//                   </div>
//                 </>
//               ) : (
//                 <div>
//                   <CardContent className="overflow-x-scroll w-full">
//                     <table className="w-full text-left border-collapse">
//                       <thead>
//                         <tr className="border-b">
//                           <th className="py-2 px-3">Type</th>
//                           <th className="py-2 px-3">Sender</th>
//                           <th className="py-2 px-3">Receiver</th>
//                           <th className="py-2 px-3">Amount</th>
//                           <th className="py-2 px-3">Status</th>
//                           <th className="py-2 px-3">Date</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {myTransaction?.data?.map((transaction?: any) => (
//                           <tr
//                             key={transaction?._id}
//                             className="border-b hover:bg-primary/60 cursor-pointer"
//                           >
//                             <td className="p-3 capitalize font-medium lg:text-sm text-xs">
//                               {transaction?.type}
//                             </td>
//                             <td className="p-3 capitalize font-medium lg:text-sm text-xs">
//                               {transaction?.fromWalletSender}
//                             </td>
//                             <td className="p-3 capitalize font-medium lg:text-sm text-xs">
//                               {transaction?.toWalletReceiver}
//                             </td>
//                             <td className="p-3 font-semibold lg:text-sm text-xs">
//                               {transaction?.amount} BDT
//                             </td>
//                             <td
//                               className={`p-3 capitalize font-medium lg:text-sm text-xs ${
//                                 transaction?.status === "SUCCESS"
//                                   ? "text-green-600"
//                                   : transaction?.status === "FAILED"
//                                   ? "text-red-600"
//                                   : "text-yellow-600"
//                               }`}
//                             >
//                               {transaction?.status}
//                             </td>
//                             <td className="py-2 px-3 lg:text-sm text-xs">
//                               {new Date(
//                                 transaction?.createdAt
//                               ).toLocaleDateString()}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </CardContent>
//                   {/* pagination */}
//                   {totalPage > 1 && (
//                     <div className="flex justify-center my-8">
//                       <div>
//                         <Pagination>
//                           <PaginationContent>
//                             <PaginationItem>
//                               <PaginationPrevious
//                                 onClick={() =>
//                                   setCurrentPage((prev) => prev - 1)
//                                 }
//                                 className={
//                                   currentPage === 1
//                                     ? "pointer-events-none opacity-50"
//                                     : "cursor-pointer"
//                                 }
//                               />
//                             </PaginationItem>
//                             {Array.from(
//                               { length: totalPage },
//                               (_, index) => index + 1
//                             ).map((page) => (
//                               <PaginationItem
//                                 key={page}
//                                 onClick={() => setCurrentPage(page)}
//                               >
//                                 <PaginationLink isActive={currentPage === page}>
//                                   {page}
//                                 </PaginationLink>
//                               </PaginationItem>
//                             ))}
//                             <PaginationItem>
//                               <PaginationNext
//                                 onClick={() =>
//                                   setCurrentPage((prev) => prev + 1)
//                                 }
//                                 className={
//                                   currentPage === totalPage
//                                     ? "pointer-events-none opacity-50"
//                                     : "cursor-pointer"
//                                 }
//                               />
//                             </PaginationItem>
//                           </PaginationContent>
//                         </Pagination>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
