/* eslint-disable @typescript-eslint/no-explicit-any */

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
  UserRoundX,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CustomBadge } from "@/components/ui/CustomBadge";
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";
import { toast } from "sonner";
import {
  useEditUserMutation,
  useGetAllAgentsQuery,
  useGetSingleUsersQuery,
} from "@/redux/features/user/user.api";

interface AgentFilters {
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

const editAgentSchema = z.object({
  role: z.enum(["ADMIN", "USER", "AGENT"]).optional(),
  isApproved: z.enum(["PENDING", "APPROVE", "SUSPEND"]).optional(),
  isDeleted: z.boolean().optional(),
  commissionRate: z.number().optional(),
});

type EditAgentFormValues = z.infer<typeof editAgentSchema>;

export default function Agents() {
  const [filters, setFilters] = useState<AgentFilters>({
    page: 1,
    limit: 5,
  });
  const [formKey, setFormKey] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");

  const {
    data: allAgentData,
    isLoading: allAgentLoading,
    isError: allAgentError,
    refetch,
  } = useGetAllAgentsQuery(filters);
  console.log(allAgentData);
  const { data: singleAgent, isLoading: singleAgentLoading } =
    useGetSingleUsersQuery(selectedAgentId, {
      skip: !selectedAgentId,
    });
  const [editAgent, { isLoading: isEditing }] = useEditUserMutation();
  const form = useForm<EditAgentFormValues>({
    resolver: zodResolver(editAgentSchema),
    defaultValues: {
      role: undefined,
      isApproved: undefined,
      isDeleted: undefined,
      commissionRate: undefined,
    },
  });

  const handleFilterChange = (key: keyof AgentFilters, value: string) => {
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
      limit: 5,
    });
  };

  const handleViewAgent = (userId: string) => {
    setSelectedAgentId(userId);
    setViewModalOpen(true);
  };

  const handleEditAgent = (userId: string) => {
    setSelectedAgentId(userId);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (values: EditAgentFormValues) => {
    const toastId = toast.loading("Updating to user profile ...");
    if (
      values.isApproved === singleAgent?.data?.isApproved &&
      values.commissionRate === singleAgent?.data?.commissionRate &&
      values.isDeleted === singleAgent?.data?.isDeleted &&
      values.role === singleAgent?.data?.role
    ) {
      toast.error("You are not changing any thing..", { id: toastId });
      setEditModalOpen(false);
      return;
    }
    try {
      const result = await editAgent({
        userId: selectedAgentId,
        updatedData: values,
      }).unwrap();
      if (result.success) {
        await refetch();
        setEditModalOpen(false);
        toast.success("Agent profile updated successfully", { id: toastId });
      }
    } catch (error: any) {
      console.error("Failed to update user:", error);
      toast.error(`Agent profile updating is failed: ${error?.data?.message}`, {
        id: toastId,
      });
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "UNBLOCK":
      case "APPROVE":
        return "success";
      case "PENDING":
        return "warning";
      case "BLOCK":
      case "SUSPEND":
        // case "true":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      key !== "page" && key !== "limit" && filters[key as keyof AgentFilters]
  );

  const totalPages = allAgentData?.meta?.totalPages || 1;
  const totalItems = allAgentData?.meta?.total || 0;
  const currentPage = filters.page;
  const itemsPerPage = filters.limit;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    if (editModalOpen && singleAgent?.data) {
      form.reset({
        role: singleAgent.data.role,
        isApproved: singleAgent.data.isApproved,
        isDeleted: singleAgent.data.isDeleted,
        commissionRate: singleAgent.data.commissionRate,
      });
      setFormKey((prev) => prev + 1); // Force re-render
    }
  }, [editModalOpen, singleAgent, form]);

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-12 lg:px-10 md:px-8 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        Agent Management
      </h1>
      <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6 flex flex-col gap-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 md:gap-4 gap-3">
          <Card className="rounded-2xl bg-gradient-to-l from-purple-300 to-purple-50 border-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Total Agents
              </CardTitle>
              <User2 className="h-4 w-4 text-purple-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {allAgentData?.meta?.counts?.total
                  ? allAgentData?.meta?.counts?.total
                  : "..."}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-l from-green-300 to-purple-50 border-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Approved Agents
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {allAgentData?.meta?.counts?.approved
                  ? allAgentData?.meta?.counts?.approved
                  : "..."}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-l from-blue-300 to-purple-50 border-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Verified Agents
              </CardTitle>
              <UserCheck className="h-4 w-4 text-blue-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">
                {allAgentData?.meta?.counts?.verified
                  ? allAgentData?.meta?.counts?.verified
                  : "..."}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl bg-gradient-to-l from-yellow-300 to-purple-50 border-yellow-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">
                Suspended Agents
              </CardTitle>
              <UserRoundX className="h-4 w-4 text-yellow-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">
                {allAgentData?.meta?.counts?.suspended
                  ? allAgentData?.meta?.counts?.suspended
                  : "..."}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-l from-red-300 to-purple-50 border-red-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 md:pb-2">
              <CardTitle className="text-sm font-medium text-red-700">
                Deleted Agents
              </CardTitle>
              <Trash2 className="h-4 w-4 text-red-700 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                {allAgentData?.meta?.counts?.deleted
                  ? allAgentData?.meta?.counts?.deleted
                  : "..."}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          {allAgentError ? (
            <ErrorPage />
          ) : allAgentLoading ? (
            <LazyLoader />
          ) : (
            <div className="border-2 shadow rounded-2xl border-primary">
              {/* Filters */}
              <Card className="border-none shadow-none rounded-t-2xl rounded-b-none">
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
                          <DropdownMenuLabel>Filter Agents</DropdownMenuLabel>
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
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="PENDING">PENDING</SelectItem>
                              <SelectItem value="APPROVE">APPROVE</SelectItem>
                              <SelectItem value="SUSPEND">SUSPEND</SelectItem>
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
              {allAgentData?.data?.length === 0 ? (
                <div className="xl:py-44 lg:py-36 md:py-32 py-28 w-full mx-auto">
                  <h1 className="italic text-center font-semibold xl:text-lg lg:text-[16.5px] md:text-[15px] text-sm">
                    No agent info is found!
                  </h1>
                </div>
              ) : (
                // {/* Agents Table */}
                <Card className="border-none shadow-none rounded-b-2xl rounded-t-none">
                  <div className="px-6 flex md:flex-row flex-col md:justify-between justify-center items-center md:gap-0 gap-2">
                    <span className="font-semibold">All Agents Info:</span>
                    <div className="text-sm text-muted-foreground italic font-medium">
                      Showing {startItem} to {endItem} of {totalItems} users
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
                          <TableHead>Approval</TableHead>
                          <TableHead>Verified</TableHead>
                          <TableHead>Deleted</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allAgentData?.data?.map((user: any) => (
                          <TableRow key={user?._id} className="w-full">
                            <TableCell className="font-medium">
                              {user?.name}
                            </TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.phone}</TableCell>
                            <TableCell>{user?.nidNumber}</TableCell>
                            <TableCell>
                              <CustomBadge
                                variant={getStatusVariant(user?.isApproved)}
                              >
                                {user?.isApproved}
                              </CustomBadge>
                            </TableCell>
                            <TableCell>
                              <CustomBadge
                                className="w-full"
                                variant={
                                  user?.isVerified ? "default" : "warning"
                                }
                              >
                                {user?.isVerified ? "VERIFIED" : "NOT YET"}
                              </CustomBadge>
                            </TableCell>
                            <TableCell>
                              <CustomBadge
                                className="w-full"
                                variant={
                                  user?.isDeleted ? "destructive" : "secondary"
                                }
                              >
                                {user?.isDeleted ? "Yes" : "No"}
                              </CustomBadge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewAgent(user._id!)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditAgent(user._id!)}
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
        {/* View Agent Modal */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="lg:min-w-1/2 md:min-w-2/3 border-2 border-primary rounded-2xl xl:p-8 lg:p-7 md:p-6 p-5">
            <DialogHeader>
              <DialogTitle className="xl:text-2xl lg:text-[22px] text-xl font-bold">
                Agent Details
              </DialogTitle>
              <DialogDescription className="xl:text-base lg:text-[15px] text-base italic">
                View detailed information about this agent.
              </DialogDescription>
            </DialogHeader>
            {singleAgentLoading ? (
              <div className="flex justify-center xl:py-20 lg:py-16 md:py-14 py-12">
                <RefreshCw className="xl:size-16 lg:size-14 md:size-12 size-10 animate-spin" />
              </div>
            ) : singleAgent?.data ? (
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-6 xl:mt-6 lg:mt-5 mt-4">
                <div>
                  <h4 className="font-semibold underline pb-1 italic xl:text-lg lg:text-[17px] text-base mb-3">
                    Personal Information
                  </h4>
                  <div className="flex flex-col lg:gap-2 gap-[6px]">
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Name:</strong> {singleAgent?.data?.name}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Email:</strong> {singleAgent?.data?.email}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Phone:</strong> {singleAgent?.data?.phone}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>NID:</strong> {singleAgent?.data?.nidNumber}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold underline pb-1 italic xl:text-lg lg:text-[17px] text-base mb-3">
                    Account Status
                  </h4>
                  <div className="flex flex-col lg:gap-2 gap-[6px]">
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Role:</strong> {singleAgent?.data?.role}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Approval:</strong> {singleAgent?.data?.isApproved}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Verified:</strong>{" "}
                      {singleAgent?.data?.isVerified ? "Yes" : "No"}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Deleted:</strong>{" "}
                      {singleAgent?.data?.isDeleted ? "Yes" : "No"}
                    </p>
                    <p className="lg:text-base md:text-[14.5px] text-sm">
                      <strong>Commission Rate:</strong>{" "}
                      {singleAgent?.data?.commissionRate}%
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>Agent not found</div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Agent Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="lg:min-w-2/3 md:min-w-2/3 border-2 border-primary rounded-2xl xl:p-8 lg:p-7 md:p-6 p-5">
            <DialogHeader>
              <DialogTitle className="xl:text-2xl lg:text-[22px] text-xl font-bold">
                Edit Agent
              </DialogTitle>
              <DialogDescription className="xl:text-base lg:text-[15px] text-base italic">
                Update agent information below.
              </DialogDescription>
            </DialogHeader>
            {singleAgentLoading ? (
              <div className="flex justify-center xl:py-20 lg:py-16 md:py-14 py-12">
                <RefreshCw className="xl:size-16 lg:size-14 md:size-12 size-10 animate-spin" />
              </div>
            ) : (
              <Form {...form} key={formKey}>
                <form
                  onSubmit={form.handleSubmit(handleEditSubmit)}
                  className="space-y-4 xl:mt-6 lg:mt-5 mt-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          value={singleAgent?.data?.name}
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
                          value={singleAgent?.data?.email}
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
                          value={singleAgent?.data?.phone}
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
                          value={singleAgent?.data?.nidNumber}
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
                        value={singleAgent?.data?.isVerified ? "Yes" : "No"}
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
                          <FormLabel>IsDeleted</FormLabel>
                          <Select
                            onValueChange={(val) =>
                              field.onChange(val === "true")
                            } // convert string -> boolean
                            value={
                              field.value !== undefined
                                ? field.value.toString()
                                : ""
                            }
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
                  </div>
                  <div className="flex justify-end space-x-4 xl:mt-6 lg:mt-5 mt-8">
                    <Button
                      className="xl:w-44 w-36"
                      type="button"
                      variant="outline"
                      onClick={() => setEditModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="xl:w-44 w-36"
                      type="submit"
                      disabled={isEditing}
                    >
                      {isEditing ? "Updating..." : "Update Agent"}
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
