/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TransactionFilter from "@/components/modules/Transaction/TransactionFilter";
import TransactionsTopper from "@/components/modules/Admin/TransactionsTopper";

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit] = useState(10);

  // Get current page
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Get all filter parameters
  const type = searchParams.get("type") || undefined;
  const status = searchParams.get("status")?.toUpperCase() || undefined;
  const fromWalletSender = searchParams.get("fromWalletSender") || undefined;
  const fromWalletEmail = searchParams.get("fromWalletEmail") || undefined;
  const fromWalletPhone = searchParams.get("fromWalletPhone") || undefined;
  const fromWalletRole = searchParams.get("fromWalletRole") || undefined;
  const toWalletReceiver = searchParams.get("toWalletReceiver") || undefined;
  const toWalletEmail = searchParams.get("toWalletEmail") || undefined;
  const toWalletPhone = searchParams.get("toWalletPhone") || undefined;
  const toWalletRole = searchParams.get("toWalletRole") || undefined;
  const searchTerm = searchParams.get("searchTerm") || undefined;
  const sort = searchParams.get("sort") || "-createdAt";

  const {
    data: allTransactions,
    isLoading: transactionsLoading,
    isError: transactionError,
  } = useAllTransactionsQuery({
    page: currentPage,
    limit,
    type,
    status,
    fromWalletSender,
    fromWalletEmail,
    fromWalletPhone,
    fromWalletRole,
    toWalletReceiver,
    toWalletEmail,
    toWalletPhone,
    toWalletRole,
    searchTerm,
    sort,
  });

  const totalPage = allTransactions?.meta?.totalPage || 1;
  const totalItems = allTransactions?.meta?.total || 0;

  // Reset to page 1 when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    type,
    status,
    fromWalletSender,
    fromWalletPhone,
    toWalletReceiver,
    toWalletPhone,
    fromWalletRole,
    toWalletRole,
    fromWalletEmail,
    toWalletEmail,
    searchTerm,
    sort,
    limit,
  ]);

  const setCurrentPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-12 lg:px-10 md:px-8 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        All Transactions History
      </h1>
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 flex flex-col gap-6">
        {/* Statistics Cards */}
        <TransactionsTopper />
        <div>
          {transactionError ? (
            <ErrorPage />
          ) : transactionsLoading ? (
            <LazyLoader />
          ) : (
            <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary rounded-2xl md:p-6 p-3 w-full mx-auto">
              <TransactionFilter />
              <Card className="rounded-md xl:mt-12 lg:mt-10 md:mt-8 mt-6">
                <CardHeader>
                  <CardTitle className="flex md:flex-row flex-col md:justify-between md:items-center justify-center items-center md:gap-3 gap-2">
                    <span>Transactions History:</span>
                    <span className="text-sm font-medium italic opacity-80">
                      {totalItems} transactions found
                    </span>
                  </CardTitle>
                </CardHeader>
                {allTransactions?.data?.length === 0 ? (
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
                          <tr className="border-b bg-primary text-white">
                            <th className="py-2 px-3">Sender</th>
                            <th className="py-2 px-3">Receiver</th>
                            <th className="py-2 px-3">Type</th>
                            <th className="py-2 px-3">Amount</th>
                            <th className="py-2 px-3">Commission</th>
                            <th className="py-2 px-3">Status</th>
                            <th className="py-2 px-3">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allTransactions?.data?.map((transaction: any) => (
                            <tr
                              key={transaction?._id}
                              className="border-b hover:bg-primary/20 cursor-pointer"
                            >
                              <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                                {transaction?.fromWalletSender}
                              </td>
                              <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                                {transaction?.toWalletReceiver}
                              </td>
                              <td className="p-3 capitalize font-medium lg:text-sm text-xs">
                                {transaction?.type}
                              </td>
                              <td className="p-3 font-semibold lg:text-sm text-xs">
                                {transaction?.amount} BDT
                              </td>
                              <td className="p-3 font-semibold lg:text-sm text-xs">
                                {transaction?.commission} BDT
                              </td>
                              <td
                                className={`p-3 capitalize font-medium lg:text-sm text-xs ${
                                  transaction?.status === "SUCCESS"
                                    ? "text-green-600"
                                    : transaction?.status === "FAILED"
                                    ? "text-red-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {transaction?.status}
                              </td>
                              <td className="py-2 px-3 lg:text-sm text-xs">
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
                    {/* pagination */}
                    {/* {totalPage > 1 && (
                      <div className="flex justify-center my-8">
                        <div>
                          <Pagination>
                            <PaginationContent>
                              <PaginationItem>
                                <PaginationPrevious
                                  onClick={() =>
                                    setCurrentPage(Math.max(1, currentPage - 1))
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
                                  <PaginationLink
                                    isActive={currentPage === page}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}
                              <PaginationItem>
                                <PaginationNext
                                  onClick={() =>
                                    setCurrentPage(
                                      Math.min(totalPage, currentPage + 1)
                                    )
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
                    )} */}
                    {totalPage > 1 && (
                      <div className="mt-6 flex items-center justify-between">
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

                            {/* Page Numbers (max 5 at a time) */}
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
                    )}
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router";
// import ErrorPage from "@/components/shared/ErrorPage";
// import LazyLoader from "@/components/shared/LazyLoader";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import TransactionFilter from "@/components/modules/Transaction/TransactionFilter";

// export default function Transactions() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [limit] = useState(10);

//   // Get current page
//   const currentPage = parseInt(searchParams.get("page") || "1");

//   // Get all filter parameters
//   const type = searchParams.get("type") || undefined;
//   const status = searchParams.get("status") || undefined;
//   const fromWalletSender = searchParams.get("fromWalletSender") || undefined;
//   const fromWalletPhone = searchParams.get("fromWalletPhone") || undefined;
//   const toWalletReceiver = searchParams.get("toWalletReceiver") || undefined;
//   const toWalletPhone = searchParams.get("toWalletPhone") || undefined;
//   const fromWalletRole = searchParams.get("fromWalletRole") || undefined;
//   const toWalletRole = searchParams.get("toWalletRole") || undefined;
//   const searchTerm = searchParams.get("searchTerm") || undefined;
//   const sort = searchParams.get("sort") || "-createdAt";

//   const {
//     data: allTransactions,
//     isLoading: transactionsLoading,
//     isError: transactionError,
//   } = useAllTransactionsQuery({
//     page: currentPage,
//     limit,
//     type,
//     status,
//     fromWalletSender,
//     fromWalletPhone,
//     toWalletReceiver,
//     toWalletPhone,
//     fromWalletRole,
//     toWalletRole,
//     searchTerm,
//     sort,
//   });

//   const totalPage = allTransactions?.meta?.totalPage || 1;
//   const totalItems = allTransactions?.meta?.total || 0;

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", "1");
//     setSearchParams(params);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     type,
//     status,
//     fromWalletSender,
//     fromWalletPhone,
//     toWalletReceiver,
//     toWalletPhone,
//     fromWalletRole,
//     toWalletRole,
//     searchTerm,
//     sort,
//   ]);

//   const setCurrentPage = (page: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", page.toString());
//     setSearchParams(params);
//   };

//   return (
//     <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-12 lg:px-10 md:px-8 px-5">
//       <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
//         All Transactions History
//       </h1>
//       <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 flex flex-col gap-6">
//         {/* Statistics Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 md:gap-4 gap-3">
//           <Card className="rounded-2xl bg-gradient-to-l from-purple-300 to-purple-50 border-purple-600">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
//               <CardTitle className="text-sm font-medium text-purple-700">
//                 Total Agents
//               </CardTitle>
//               <User2 className="h-4 w-4 text-purple-700 opacity-80" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-purple-700">
//                 {allAgentData?.meta?.counts?.total
//                   ? allAgentData?.meta?.counts?.total
//                   : "..."}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="rounded-2xl bg-gradient-to-l from-green-300 to-purple-50 border-green-600">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
//               <CardTitle className="text-sm font-medium text-green-700">
//                 Approved Agents
//               </CardTitle>
//               <UserCheck className="h-4 w-4 text-green-700 opacity-80" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-700">
//                 {allAgentData?.meta?.counts?.approved
//                   ? allAgentData?.meta?.counts?.approved
//                   : "..."}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="rounded-2xl bg-gradient-to-l from-blue-300 to-purple-50 border-blue-600">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
//               <CardTitle className="text-sm font-medium text-blue-700">
//                 Verified Agents
//               </CardTitle>
//               <UserCheck className="h-4 w-4 text-blue-700 opacity-80" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-700">
//                 {allAgentData?.meta?.counts?.verified
//                   ? allAgentData?.meta?.counts?.verified
//                   : "..."}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-2xl bg-gradient-to-l from-yellow-300 to-purple-50 border-yellow-600">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
//               <CardTitle className="text-sm font-medium text-yellow-700">
//                 Suspended Agents
//               </CardTitle>
//               <UserRoundX className="h-4 w-4 text-yellow-700 opacity-80" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-yellow-700">
//                 {allAgentData?.meta?.counts?.suspended
//                   ? allAgentData?.meta?.counts?.suspended
//                   : "..."}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="rounded-2xl bg-gradient-to-l from-red-300 to-purple-50 border-red-600">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
//               <CardTitle className="text-sm font-medium text-red-700">
//                 Deleted Agents
//               </CardTitle>
//               <Trash2 className="h-4 w-4 text-red-700 opacity-80" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-red-700">
//                 {allAgentData?.meta?.counts?.deleted
//                   ? allAgentData?.meta?.counts?.deleted
//                   : "..."}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <div>
//           {transactionError ? (
//             <ErrorPage />
//           ) : transactionsLoading ? (
//             <LazyLoader />
//           ) : (
//             <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary rounded-2xl md:p-6 p-3 w-full mx-auto">
//               <TransactionFilter />
//               <Card className="rounded-md xl:mt-12 lg:mt-10 md:mt-8 mt-6">
//                 <CardHeader>
//                   <CardTitle className="flex md:flex-row flex-col md:justify-between md:items-center justify-center items-center md:gap-3 gap-2">
//                     <span>Transactions History:</span>
//                     <span className="text-sm font-medium italic opacity-80">
//                       {totalItems} transactions found
//                     </span>
//                   </CardTitle>
//                 </CardHeader>
//                 {allTransactions?.data?.length === 0 ? (
//                   <>
//                     <div className="xl:py-44 lg:py-36 md:py-32 py-28 w-full mx-auto">
//                       <h1 className="italic text-center font-semibold xl:text-lg lg:text-[16.5px] md:text-[15px] text-sm">
//                         No transaction history is available now!
//                       </h1>
//                     </div>
//                   </>
//                 ) : (
//                   <div>
//                     <CardContent className="overflow-x-scroll w-full">
//                       <table className="w-full text-left border-collapse">
//                         <thead>
//                           <tr className="border-b">
//                             <th className="py-2 px-3">Sender</th>
//                             <th className="py-2 px-3">Receiver</th>
//                             <th className="py-2 px-3">Type</th>
//                             <th className="py-2 px-3">Amount</th>
//                             <th className="py-2 px-3">Commission</th>
//                             <th className="py-2 px-3">Status</th>
//                             <th className="py-2 px-3">Date</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {allTransactions?.data?.map((transaction: any) => (
//                             <tr
//                               key={transaction?._id}
//                               className="border-b hover:bg-primary/20 cursor-pointer"
//                             >
//                               <td className="p-3 capitalize font-medium lg:text-sm text-xs">
//                                 {transaction?.fromWalletSender}
//                               </td>
//                               <td className="p-3 capitalize font-medium lg:text-sm text-xs">
//                                 {transaction?.toWalletReceiver}
//                               </td>
//                               <td className="p-3 capitalize font-medium lg:text-sm text-xs">
//                                 {transaction?.type}
//                               </td>
//                               <td className="p-3 font-semibold lg:text-sm text-xs">
//                                 {transaction?.amount} BDT
//                               </td>
//                               <td className="p-3 font-semibold lg:text-sm text-xs">
//                                 {transaction?.commission} BDT
//                               </td>
//                               <td
//                                 className={`p-3 capitalize font-medium lg:text-sm text-xs ${
//                                   transaction?.status === "SUCCESS"
//                                     ? "text-green-600"
//                                     : transaction?.status === "FAILED"
//                                     ? "text-red-600"
//                                     : "text-yellow-600"
//                                 }`}
//                               >
//                                 {transaction?.status}
//                               </td>
//                               <td className="py-2 px-3 lg:text-sm text-xs">
//                                 {new Date(
//                                   transaction?.createdAt
//                                 ).toLocaleDateString()}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </CardContent>
//                     {/* pagination */}
//                     {totalPage > 1 && (
//                       <div className="flex justify-center my-8">
//                         <div>
//                           <Pagination>
//                             <PaginationContent>
//                               <PaginationItem>
//                                 <PaginationPrevious
//                                   onClick={() =>
//                                     setCurrentPage(Math.max(1, currentPage - 1))
//                                   }
//                                   className={
//                                     currentPage === 1
//                                       ? "pointer-events-none opacity-50"
//                                       : "cursor-pointer"
//                                   }
//                                 />
//                               </PaginationItem>
//                               {Array.from(
//                                 { length: totalPage },
//                                 (_, index) => index + 1
//                               ).map((page) => (
//                                 <PaginationItem
//                                   key={page}
//                                   onClick={() => setCurrentPage(page)}
//                                 >
//                                   <PaginationLink
//                                     isActive={currentPage === page}
//                                   >
//                                     {page}
//                                   </PaginationLink>
//                                 </PaginationItem>
//                               ))}
//                               <PaginationItem>
//                                 <PaginationNext
//                                   onClick={() =>
//                                     setCurrentPage(
//                                       Math.min(totalPage, currentPage + 1)
//                                     )
//                                   }
//                                   className={
//                                     currentPage === totalPage
//                                       ? "pointer-events-none opacity-50"
//                                       : "cursor-pointer"
//                                   }
//                                 />
//                               </PaginationItem>
//                             </PaginationContent>
//                           </Pagination>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
