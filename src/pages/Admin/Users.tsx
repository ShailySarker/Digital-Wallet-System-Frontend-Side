/* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Search,
//   Filter,
//   Eye,
//   Edit,
//   ChevronDown,
//   UserCheck,
//   Trash2,
//   Users2,
// } from "lucide-react";
// import { useGetAllUsersQuery } from "@/redux/features/user/user.api";

// interface UserFilters {
//   search?: string;
//   page: number;
//   limit: number;
//   role?: string;
//   isActive?: string;
//   isApproved?: string;
//   isVerified?: string;
//   isDeleted?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// }

// export default function Users() {
//   const [filters, setFilters] = useState<UserFilters>({
//     page: 1,
//     limit: 10,
//   });

//   const { data, isLoading, error } = useGetAllUsersQuery(filters);

//   const handleFilterChange = (key: keyof UserFilters, value: string) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value === "all" ? undefined : value,
//       page: 1,
//     }));
//   };

//   const handleSearch = (value: string) => {
//     setFilters((prev) => ({
//       ...prev,
//       search: value,
//       page: 1,
//     }));
//   };

//   const handlePageChange = (page: number) => {
//     setFilters((prev) => ({ ...prev, page }));
//   };

//   const getStatusVariant = (status: string) => {
//     switch (status) {
//       case "ACTIVE":
//       case "APPROVE":
//         return "success";
//       case "INACTIVE":
//       case "PENDING":
//         return "warning";
//       case "BLOCKED":
//       case "SUSPEND":
//         return "destructive";
//       default:
//         return "secondary";
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-destructive">Error loading users</div>
//       </div>
//     );
//   }

//   const totalPages = data?.meta?.totalPages || 1;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users2 className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {data?.meta?.counts?.total || 0}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//             <UserCheck className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">
//               {data?.meta?.counts?.active || 0}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Verified Users
//             </CardTitle>
//             <UserCheck className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">
//               {data?.meta?.counts?.verified || 0}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Deleted Users</CardTitle>
//             <Trash2 className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-destructive">
//               {data?.meta?.counts?.deleted || 0}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Search */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search by name, email, phone, NID..."
//                 value={filters.search || ""}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="pl-9"
//               />
//             </div>

//             {/* Filter Dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="w-full sm:w-auto">
//                   <Filter className="mr-2 h-4 w-4" />
//                   Filters
//                   <ChevronDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end">
//                 <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
//                 <DropdownMenuSeparator />

//                 {/* Role Filter */}
//                 <div className="p-2">
//                   <label className="text-sm font-medium mb-2 block">Role</label>
//                   <Select
//                     value={filters.role || "all"}
//                     onValueChange={(value) => handleFilterChange("role", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Roles</SelectItem>
//                       <SelectItem value="USER">USER</SelectItem>
//                       <SelectItem value="ADMIN">ADMIN</SelectItem>
//                       <SelectItem value="AGENT">AGENT</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <DropdownMenuSeparator />

//                 {/* Status Filter */}
//                 <div className="p-2">
//                   <label className="text-sm font-medium mb-2 block">
//                     Status
//                   </label>
//                   <Select
//                     value={filters.isActive || "all"}
//                     onValueChange={(value) =>
//                       handleFilterChange("isActive", value)
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Status</SelectItem>
//                       <SelectItem value="ACTIVE">ACTIVE</SelectItem>
//                       <SelectItem value="INACTIVE">INACTIVE</SelectItem>
//                       <SelectItem value="BLOCKED">BLOCKED</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <DropdownMenuSeparator />

//                 {/* Approval Filter */}
//                 <div className="p-2">
//                   <label className="text-sm font-medium mb-2 block">
//                     Approval
//                   </label>
//                   <Select
//                     value={filters.isApproved || "all"}
//                     onValueChange={(value) =>
//                       handleFilterChange("isApproved", value)
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select approval" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Approval</SelectItem>
//                       <SelectItem value="PENDING">PENDING</SelectItem>
//                       <SelectItem value="APPROVE">APPROVED</SelectItem>
//                       <SelectItem value="SUSPEND">SUSPENDED</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <DropdownMenuSeparator />

//                 {/* Verified Filter */}
//                 <div className="p-2">
//                   <label className="text-sm font-medium mb-2 block">
//                     Verified
//                   </label>
//                   <Select
//                     value={filters.isVerified || "all"}
//                     onValueChange={(value) =>
//                       handleFilterChange("isVerified", value)
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select verified" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All</SelectItem>
//                       <SelectItem value="true">Verified</SelectItem>
//                       <SelectItem value="false">Not Verified</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Users Table */}
//       <Card>
//         <CardContent className="pt-6">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>NID Number</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Approval</TableHead>
//                 <TableHead>Verified</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data?.data?.map((user: any) => (
//                 <TableRow key={user._id}>
//                   <TableCell className="font-medium">{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.phone}</TableCell>
//                   <TableCell>{user.nidNumber}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline">{user.role}</Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={getStatusVariant(user.isActive)}>
//                       {user.isActive}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={getStatusVariant(user.isApproved)}>
//                       {user.isApproved}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={user.isVerified ? "success" : "warning"}>
//                       {user.isVerified ? "VERIFIED" : "NOT VERIFIED"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-2">
//                       <Button variant="outline" size="sm">
//                         <Eye className="h-4 w-4 mr-1" />
//                         View
//                       </Button>
//                       <Button variant="outline" size="sm">
//                         <Edit className="h-4 w-4 mr-1" />
//                         Edit
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-6 flex items-center justify-between">
//               <div className="text-sm text-muted-foreground">
//                 Showing {(filters.page - 1) * filters.limit + 1} to{" "}
//                 {Math.min(filters.page * filters.limit, data?.meta?.total || 0)}{" "}
//                 of {data?.meta?.total || 0} users
//               </div>

//               <Pagination>
//                 <PaginationContent>
//                   <PaginationItem>
//                     <PaginationPrevious
//                       onClick={() =>
//                         handlePageChange(Math.max(1, filters.page - 1))
//                       }
//                       className={
//                         filters.page === 1
//                           ? "pointer-events-none opacity-50"
//                           : ""
//                       }
//                     />
//                   </PaginationItem>

//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     const pageNum =
//                       Math.max(1, Math.min(totalPages - 4, filters.page - 2)) +
//                       i;
//                     if (pageNum > totalPages) return null;

//                     return (
//                       <PaginationItem key={pageNum}>
//                         <PaginationLink
//                           isActive={filters.page === pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                         >
//                           {pageNum}
//                         </PaginationLink>
//                       </PaginationItem>
//                     );
//                   })}

//                   <PaginationItem>
//                     <PaginationNext
//                       onClick={() =>
//                         handlePageChange(Math.min(totalPages, filters.page + 1))
//                       }
//                       className={
//                         filters.page === totalPages
//                           ? "pointer-events-none opacity-50"
//                           : ""
//                       }
//                     />
//                   </PaginationItem>
//                 </PaginationContent>
//               </Pagination>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// components/user-management.tsx
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Search,
  Filter,
  Eye,
  Edit,
  ChevronDown,
  UserCheck,
  Trash2,
  X,
  RefreshCw,
  User2,
  List,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useEditUserMutation,
  useGetAllUsersQuery,
  useGetSingleUsersQuery,
} from "@/redux/features/user/user.api";
import { CustomBadge } from "@/components/ui/CustomBadge";
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";

interface UserFilters {
  search?: string;
  page: number;
  limit: number;
  role?: string;
  isActive?: string;
  isApproved?: string;
  isVerified?: string;
  isDeleted?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const editUserSchema = z.object({
  role: z.enum(["ADMIN", "USER", "AGENT"]).optional(),
  isActive: z.enum(["UNBLOCK", "BLOCK"]).optional(),
  isApproved: z.enum(["PENDING", "APPROVE", "SUSPEND"]).optional(),
  isDeleted: z.boolean().optional(),
  commissionRate: z.number().optional(),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

export default function Users() {
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 3,
  });
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  // Add a form key state
  const [formKey, setFormKey] = useState(0);

  const {
    data: allUserData,
    isLoading: allUserLoading,
    isError: allUserError,
    refetch,
  } = useGetAllUsersQuery(filters);
  console.log(allUserData);
  const { data: singleUser, isLoading: singleUserLoading } =
    useGetSingleUsersQuery(selectedUserId, {
      skip: !selectedUserId,
    });
  const [editUser, { isLoading: isEditing }] = useEditUserMutation();
  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      role: undefined,
      isActive: undefined,
      isApproved: undefined,
      isDeleted: undefined,
      commissionRate: undefined,
    },
  });

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
      page: 1,
    }));
  };

  const handleLimitChange = (value: string) => {
    const limit = parseInt(value);
    setFilters((prev) => ({
      ...prev,
      limit,
      page: 1, // Reset to first page when changing limit
    }));
  };

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const clearAllFilters = () => {
    setFilters({
      page: 1,
      limit: 3,
    });
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setViewModalOpen(true);
  };

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (values: EditUserFormValues) => {
    try {
      console.log(values);
      await editUser({
        userId: selectedUserId,
        updatedData: values,
      }).unwrap();
      setEditModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
      case "APPROVE":
        return "success";
      case "INACTIVE":
      case "PENDING":
        return "warning";
      case "BLOCKED":
      case "SUSPEND":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      key !== "page" && key !== "limit" && filters[key as keyof UserFilters]
  );

  const totalPages = allUserData?.meta?.totalPages || 1;
  const totalItems = allUserData?.meta?.total || 0;
  const currentPage = filters.page;
  const itemsPerPage = filters.limit;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    if (editModalOpen && singleUser?.data) {
      form.reset({
        role: singleUser.data.role,
        isActive: singleUser.data.isActive,
        isApproved: singleUser.data.isApproved,
        isDeleted: singleUser.data.isDeleted,
        commissionRate: singleUser.data.commissionRate,
      });
      setFormKey((prev) => prev + 1); // Force re-render
    }
  }, [editModalOpen, singleUser, form]);

  return (
    // <div className="md:p-6 p-5 space-y-6">
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        User Management
      </h1>
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 flex flex-col gap-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 md:gap-4 gap-3">
          <Card className="rounded-2xl bg-gradient-to-l from-purple-300 to-purple-50 border-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Total Users
              </CardTitle>
              <User2 className="h-4 w-4 text-purple-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {allUserData?.meta?.counts?.total
                  ? allUserData?.meta?.counts?.total
                  : "..."}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-l from-green-300 to-purple-50 border-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Active Users
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {allUserData?.meta?.counts?.active
                  ? allUserData?.meta?.counts?.active
                  : "..."}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-l from-blue-300 to-purple-50 border-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Verified Users
              </CardTitle>
              <UserCheck className="h-4 w-4 text-blue-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">
                {allUserData?.meta?.counts?.verified
                  ? allUserData?.meta?.counts?.verified
                  : "..."}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl bg-gradient-to-l from-yellow-300 to-purple-50 border-yellow-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">
                Blocked Users
              </CardTitle>
              <User2 className="h-4 w-4 text-yellow-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">
                {allUserData?.meta?.counts?.blocked
                  ? allUserData?.meta?.counts?.blocked
                  : "..."}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-l from-red-300 to-purple-50 border-red-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-red-700">
                Deleted Users
              </CardTitle>
              <Trash2 className="h-4 w-4 text-red-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                {allUserData?.meta?.counts?.deleted
                  ? allUserData?.meta?.counts?.deleted
                  : "..."}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          {allUserError ? (
            <ErrorPage />
          ) : allUserLoading ? (
            <LazyLoader />
          ) : (
            <div className="border-2 shadow rounded-2xl border-primary">
              {/* Filters */}
              <Card className="border-none shadow-none">
                <CardContent className="xl:pt-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* Search */}
                    <div className="relative flex-1 border-2 border-primary shadow rounded-xl">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, email, phone, NID..."
                        value={filters.search || ""}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-9 border-none"
                      />
                    </div>

                    {/* Filter Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="lg:w-[18%] md:w-[25%] rounded-xl border-2 border-primary shadow"
                        >
                          <Filter className="mr-2 h-4 w-4" />
                          Filters
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="xl:w-64 w-56 border-2 border-primary rounded-2xl"
                        align="end"
                      >
                        <div className="flex justify-between items-center">
                          <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                          {hasActiveFilters && (
                            <Button
                              variant="outline"
                              onClick={clearAllFilters}
                              className="flex items-center gap-2"
                            >
                              <X className="h-4 w-4" />
                              Clear Filters
                            </Button>
                          )}
                        </div>
                        <DropdownMenuSeparator />

                        {/* Status Filter */}
                        <div className="p-2">
                          <label className="text-sm font-semibold mb-2 italic block">
                            Status
                          </label>
                          <Select
                            value={filters.isActive || "all"}
                            onValueChange={(value) =>
                              handleFilterChange("isActive", value)
                            }
                          >
                            <SelectTrigger className="w-full border-2 border-primary">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                              <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <DropdownMenuSeparator />

                        {/* Approval Filter */}
                        <div className="p-2">
                          <label className="text-sm font-semibold mb-2 italic block">
                            Approval
                          </label>
                          <Select
                            value={filters.isApproved || "all"}
                            onValueChange={(value) =>
                              handleFilterChange("isApproved", value)
                            }
                          >
                            <SelectTrigger className="w-full border-2 border-primary">
                              <SelectValue placeholder="Select approval" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Approval</SelectItem>
                              <SelectItem value="PENDING">PENDING</SelectItem>
                              <SelectItem value="APPROVE">APPROVED</SelectItem>
                              <SelectItem value="SUSPEND">SUSPENDED</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <DropdownMenuSeparator />

                        {/* Verified Filter */}
                        <div className="p-2">
                          <label className="text-sm font-semibold mb-2 italic block">
                            Verified
                          </label>
                          <Select
                            value={filters.isVerified || "all"}
                            onValueChange={(value) =>
                              handleFilterChange("isVerified", value)
                            }
                          >
                            <SelectTrigger className="w-full border-2 border-primary">
                              <SelectValue placeholder="Select verified" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="true">Verified</SelectItem>
                              <SelectItem value="false">
                                Not Verified
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DropdownMenuSeparator />

                        {/* Deleted Filter */}
                        <div className="p-2">
                          <label className="text-sm font-semibold mb-2 italic block">
                            IsDeleted
                          </label>
                          <Select
                            value={filters.isDeleted || "all"}
                            onValueChange={(value) =>
                              handleFilterChange("isDeleted", value)
                            }
                          >
                            <SelectTrigger className="w-full border-2 border-primary">
                              <SelectValue placeholder="Select verified" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="true">Deleted</SelectItem>
                              <SelectItem value="false">Not Deleted</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Items Per Page Selector */}
                    <div className="lg:w-[18%] md:w-[25%]">
                      <div className="flex items-center justify-center gap-2 border-2 border-primary shadow rounded-xl px-3">
                        <List className="h-4 w-4" />
                        <Select
                          value={filters.limit.toString()}
                          onValueChange={handleLimitChange}
                        >
                          <SelectTrigger className="border-none shadow-none px-0">
                            <SelectValue placeholder="10" />
                            <SelectValue>{filters.limit} Per Page</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Per Page</SelectItem>
                            <SelectItem value="10">10 Per Page</SelectItem>
                            <SelectItem value="20">20 Per Page</SelectItem>
                            <SelectItem value="50">50 Per Page</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* <span className="text-sm text-muted-foreground">
                        Per Page
                      </span> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
              {allUserData?.data?.length === 0 ? (
                <div className="xl:py-44 lg:py-36 md:py-32 py-28 w-full mx-auto">
                  <h1 className="italic text-center font-semibold xl:text-lg lg:text-[16.5px] md:text-[15px] text-sm">
                    No user info is found!
                  </h1>
                </div>
              ) : (
                // {/* Users Table */}
                <Card className="border-none shadow-none">
                  <div className="px-6 flex md:flex-row flex-col md:justify-between justify-center items-center md:gap-0 gap-2">
                    <span className="font-semibold">All Users Info:</span>
                    <div className="text-sm text-muted-foreground italic font-medium">
                      Showing {startItem} to {endItem} of {totalItems} users
                      {/* Showing {(filters.page - 1) * filters.limit + 1} to{" "}
                      {Math.min(
                        filters.page * filters.limit,
                        allUserData?.meta?.total || 0
                      )}{" "}
                      of {allUserData?.meta?.total || 0} users */}
                    </div>
                  </div>
                  <CardContent className="">
                    <Table className="p-6 border-2 border-primary shadow rounded-xl">
                      <TableHeader className="bg-primary">
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>NID Number</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Approval</TableHead>
                          <TableHead>Verified</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allUserData?.data?.map((user: any) => (
                          <TableRow key={user?._id}>
                            <TableCell className="font-medium">
                              {user?.name}
                            </TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.phone}</TableCell>
                            <TableCell>{user?.nidNumber}</TableCell>
                            <TableCell>
                              <CustomBadge
                                variant={getStatusVariant(user?.isActive)}
                              >
                                {user?.isActive}
                              </CustomBadge>
                            </TableCell>
                            <TableCell>
                              <CustomBadge
                                variant={getStatusVariant(user?.isApproved)}
                              >
                                {user?.isApproved}
                              </CustomBadge>
                            </TableCell>
                            <TableCell>
                              <CustomBadge
                                variant={
                                  user?.isVerified ? "success" : "warning"
                                }
                              >
                                {user?.isVerified ? "VERIFIED" : "NOT VERIFIED"}
                              </CustomBadge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewUser(user._id!)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditUser(user._id!)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Pagination */}
                    {/* {totalPages > 1 && (
                      <div className="mt-6 flex items-center justify-between">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() =>
                                  handlePageChange(
                                    Math.max(1, filters.page - 1)
                                  )
                                }
                                className={
                                  filters.page === 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                                }
                              />
                            </PaginationItem>

                            {Array.from(
                              { length: Math.min(5, totalPages) },
                              (_, i) => {
                                const pageNum =
                                  Math.max(
                                    1,
                                    Math.min(totalPages - 4, filters.page - 2)
                                  ) + i;
                                if (pageNum > totalPages) return null;

                                return (
                                  <PaginationItem key={pageNum}>
                                    <PaginationLink
                                      isActive={filters.page === pageNum}
                                      onClick={() => handlePageChange(pageNum)}
                                    >
                                      {pageNum}
                                    </PaginationLink>
                                  </PaginationItem>
                                );
                              }
                            )}

                            <PaginationItem>
                              <PaginationNext
                                onClick={() =>
                                  handlePageChange(
                                    Math.min(totalPages, filters.page + 1)
                                  )
                                }
                                className={
                                  filters.page === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : ""
                                }
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )} */}
                    {totalPages > 1 && (
                      <div className="mt-6 flex items-center justify-between">
                        <Pagination>
                          <PaginationContent>
                            {/* Previous */}
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() =>
                                  handlePageChange(
                                    Math.max(1, filters.page - 1)
                                  )
                                }
                                className={`border px-3 py-1 rounded-md ${
                                  filters.page === 1
                                    ? "pointer-events-none opacity-50"
                                    : "hover:bg-muted"
                                }`}
                              />
                            </PaginationItem>

                            {/* Page Numbers */}
                            {Array.from(
                              { length: Math.min(5, totalPages) },
                              (_, i) => {
                                const pageNum =
                                  Math.max(
                                    1,
                                    Math.min(totalPages - 4, filters.page - 2)
                                  ) + i;
                                if (pageNum > totalPages) return null;

                                const isActive = filters.page === pageNum;

                                return (
                                  <PaginationItem key={pageNum}>
                                    <PaginationLink
                                      isActive={isActive}
                                      onClick={() => handlePageChange(pageNum)}
                                      className={`border px-3 py-1 rounded-md ${
                                        isActive
                                          ? "bg-primary text-white border-primary"
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
                                  handlePageChange(
                                    Math.min(totalPages, filters.page + 1)
                                  )
                                }
                                className={`border px-3 py-1 rounded-md ${
                                  filters.page === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : "hover:bg-muted"
                                }`}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
        {/* View User Modal */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="lg:min-w-1/2 md:min-w-2/3 border-2 border-primary rounded-2xl xl:p-8 lg:p-7 md:p-6 p-5">
            <DialogHeader>
              <DialogTitle className="xl:text-2xl lg:text-[22px] text-xl font-bold">
                User Details
              </DialogTitle>
              <DialogDescription className="xl:text-base lg:text-[15px] text-base italic">
                View detailed information about this user.
              </DialogDescription>
            </DialogHeader>
            {singleUserLoading ? (
              <div className="flex justify-center xl:py-20 lg:py-16 md:py-14 py-12">
                <RefreshCw className="xl:size-16 lg:size-14 md:size-12 size-10 animate-spin" />
              </div>
            ) : singleUser?.data ? (
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-6 xl:mt-6 lg:mt-5 mt-4">
                <div>
                  <h4 className="font-semibold underline pb-1 italic xl:text-lg lg:text-[17px] text-base mb-3">
                    Personal Information
                  </h4>
                  <div className="flex flex-col lg:gap-2 gap-[6px]">
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Name:</strong> {singleUser?.data?.name}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Email:</strong> {singleUser?.data?.email}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Phone:</strong> {singleUser?.data?.phone}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>NID:</strong> {singleUser?.data?.nidNumber}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold underline pb-1 italic xl:text-lg lg:text-[17px] text-base mb-3">
                    Account Status
                  </h4>
                  <div className="flex flex-col lg:gap-2 gap-[6px]">
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Role:</strong> {singleUser?.data?.role}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Status:</strong> {singleUser?.data?.isActive}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Approval:</strong> {singleUser?.data?.isApproved}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Verified:</strong>{" "}
                      {singleUser?.data?.isVerified ? "Yes" : "No"}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Deleted:</strong>{" "}
                      {singleUser?.data?.isDeleted ? "Yes" : "No"}
                    </p>
                    {singleUser?.data?.commissionRate && (
                      <p className="lg:text-base md:text-[14.5px] text-sm">
                        <strong>Commission Rate:</strong>{" "}
                        {singleUser?.data?.commissionRate}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>User not found</div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="lg:min-w-1/2 md:min-w-2/3 border-2 border-primary rounded-2xl xl:p-8 lg:p-7 md:p-6 p-5">
            <DialogHeader>
              <DialogTitle className="xl:text-2xl lg:text-[22px] text-xl font-bold">
                Edit User
              </DialogTitle>
              <DialogDescription className="xl:text-base lg:text-[15px] text-base italic">
                Update user information below.
              </DialogDescription>
            </DialogHeader>
            {singleUserLoading ? (
              <div className="flex justify-center xl:py-20 lg:py-16 md:py-14 py-12">
                <RefreshCw className="xl:size-16 lg:size-14 md:size-12 size-10 animate-spin" />
              </div>
            ) : (
              <Form {...form} key={formKey}>
                <form
                  onSubmit={form.handleSubmit(handleEditSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          value={singleUser?.data?.name}
                          readOnly
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          value={singleUser?.data?.email}
                          readOnly
                          disabled
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          value={singleUser?.data?.phone}
                          readOnly
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>NID Number</FormLabel>
                      <FormControl>
                        <Input
                          value={singleUser?.data?.nidNumber}
                          readOnly
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            // defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USER">USER</SelectItem>
                              <SelectItem value="ADMIN">ADMIN</SelectItem>
                              <SelectItem value="AGENT">AGENT</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* <SelectItem value="ACTIVE">ACTIVE</SelectItem> */}
                              <SelectItem value="UNBLOCK">UNBLOCK</SelectItem>
                              <SelectItem value="BLOCK">BLOCK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isApproved"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Approval</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select approval" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="PENDING">PENDING</SelectItem>
                              <SelectItem value="APPROVE">APPROVE</SelectItem>
                              <SelectItem value="SUSPEND">SUSPEND</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>Verified</FormLabel>
                      <Input
                        value={singleUser?.data?.isVerified ? "Yes" : "No"}
                        readOnly
                        disabled
                      />
                      <FormMessage />
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="isDeleted"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Is Deleted</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {singleUser?.data.role === "AGENT" && (
                      <FormField
                        control={form.control}
                        name="commissionRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commission Rate (%)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isEditing}>
                      {isEditing ? "Updating..." : "Update User"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
