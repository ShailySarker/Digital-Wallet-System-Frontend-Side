/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import { useAllCategoriesOfUserQuery } from "@/redux/features/user/user.api";
import { Input } from "@/components/ui/input";

export default function TransactionFilter() {
  const { data: allCategoriesOfUser, isLoading: allCategoriesOfUserLoading } =
    useAllCategoriesOfUserQuery({ limit: 1000, fields: "_id,name,phone,role" });
  const { data } = useMyProfileQuery({});
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedType = searchParams.get("type") || "";
  const selectedStatus = searchParams.get("status") || "";
  const selectedFromWalletSender = searchParams.get("fromWalletSender") || "";
  const selectedFromWalletPhone = searchParams.get("fromWalletPhone") || "";
  const selectedToWalletReceiver = searchParams.get("toWalletReceiver") || "";
  const selectedToWalletPhone = searchParams.get("toWalletPhone") || "";
  const selectedFromWalletRole = searchParams.get("fromWalletRole") || "";
  const selectedToWalletRole = searchParams.get("toWalletRole") || "";
  const searchTerm = searchParams.get("searchTerm") || "";
  const sort = searchParams.get("sort") || "-createdAt";

  const transactionTypes = [
    { id: "1", type: "SEND" },
    { id: "2", type: "DEPOSIT" },
    { id: "3", type: "WITHDRAW" },
    { id: "4", type: "CASH_IN" },
    { id: "5", type: "CASH_OUT" },
  ];

  const statusOptions = [
    { value: "SUCCESS", label: "Success" },
    { value: "FAILED", label: "Failed" },
    { value: "PENDING", label: "Pending" },
  ];

  const roleOptions = [
    { value: "USER", label: "User" },
    { value: "AGENT", label: "Agent" },
    { value: "ADMIN", label: "Admin" },
  ];

  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "-amount", label: "Amount (High to Low)" },
    { value: "amount", label: "Amount (Low to High)" },
    { value: "-commission", label: "Commission (High to Low)" },
    { value: "commission", label: "Commission (Low to High)" },
  ];

  // Get unique values for filters
  const senderOptions =
    allCategoriesOfUser?.data
      ?.filter(
        (item: any, index: any, array: any) =>
          array.findIndex((t: any) => t.name === item.name) === index &&
          item.name
      )
      .map((item: { name: string }) => ({
        label: item.name,
        value: item.name,
      })) || [];

  const senderPhoneOptions =
    allCategoriesOfUser?.data
      ?.filter(
        (item: any, index: any, array: any) =>
          array.findIndex((t: any) => t.phone === item.phone) === index &&
          item.phone
      )
      .map((item: { phone: string }) => ({
        label: item.phone,
        value: item.phone,
      })) || [];

  const receiverOptions =
    allCategoriesOfUser?.data
      ?.filter(
        (item: any, index: any, array: any) =>
          array.findIndex((t: any) => t.name === item.name) === index &&
          item.name
      )
      .map((item: { name: string }) => ({
        label: item.name,
        value: item.name,
      })) || [];

  const receiverPhoneOptions =
    allCategoriesOfUser?.data
      ?.filter(
        (item: any, index: any, array: any) =>
          array.findIndex((t: any) => t.phone === item.phone) === index &&
          item.phone
      )
      .map((item: { phone: string }) => ({
        label: item.phone,
        value: item.phone,
      })) || [];

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 when filters change
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="col-span-3 w-full space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="lg:text-xl text-lg font-semibold">Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear All
        </Button>
      </div>
      {/* Admin-only detailed filters */}
      {data?.data?.role === "ADMIN" && (
        // {/* Search Input - Uses searchTerm parameter */}
        <div>
          <Label className="lg:mb-3 mb-2">Search</Label>
          <Input
            placeholder="Search by type, status....."
            value={searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          />
        </div>
      )}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Transaction Type Filter */}
        <div>
          <Label className="lg:mb-3 mb-2">Transaction Type</Label>
          <Select
            value={selectedType}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                {transactionTypes?.map((item) => (
                  <SelectItem key={item.id} value={item.type}>
                    {item.type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <Label className="lg:mb-3 mb-2">Transaction Status</Label>
          <Select
            value={selectedStatus}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {statusOptions?.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Admin-only detailed filters */}
      {data?.data?.role === "ADMIN" && (
        <>
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Sender Name Filter */}
            <div>
              <Label className="lg:mb-3 mb-2">Sender Name</Label>
              <Select
                value={selectedFromWalletSender}
                onValueChange={(value) =>
                  handleFilterChange("fromWalletSender", value)
                }
                disabled={allCategoriesOfUserLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sender name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sender Name</SelectLabel>
                    {senderOptions?.map((item: any) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Receiver Name Filter */}
            <div>
              <Label className="lg:mb-3 mb-2">Receiver Name</Label>
              <Select
                value={selectedToWalletReceiver}
                onValueChange={(value) =>
                  handleFilterChange("toWalletReceiver", value)
                }
                disabled={allCategoriesOfUserLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select receiver name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Receiver Name</SelectLabel>
                    {receiverOptions.map((item: any) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Sender Phone Filter */}
            <div>
              <Label className="lg:mb-3 mb-2">Sender Phone</Label>
              <Select
                value={selectedFromWalletPhone}
                onValueChange={(value) =>
                  handleFilterChange("fromWalletPhone", value)
                }
                disabled={allCategoriesOfUserLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sender phone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sender Phone</SelectLabel>
                    {senderPhoneOptions?.map((item: any) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Receiver Phone Filter */}
            <div>
              <Label className="lg:mb-3 mb-2">Receiver Phone</Label>
              <Select
                value={selectedToWalletPhone}
                onValueChange={(value) =>
                  handleFilterChange("toWalletPhone", value)
                }
                disabled={allCategoriesOfUserLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select receiver phone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Receiver Phone</SelectLabel>
                    {receiverPhoneOptions?.map((item: any) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Sender Role Filter */}
            <div>
              <Label className="lg:mb-3 mb-2">Sender Role</Label>
              <Select
                value={selectedFromWalletRole}
                onValueChange={(value) =>
                  handleFilterChange("fromWalletRole", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sender role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sender Role</SelectLabel>
                    {roleOptions?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Receiver Role Filter */}
            <div>
              <Label className="lg:mb-3 mb-2">Receiver Role</Label>
              <Select
                value={selectedToWalletRole}
                onValueChange={(value) =>
                  handleFilterChange("toWalletRole", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select receiver role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Receiver Role</SelectLabel>
                    {roleOptions?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}
      {/* Admin-only detailed filters */}
      {data?.data?.role === "ADMIN" && (
        // {/* Sorting Options */}
        <div>
          <Label className="lg:mb-3 mb-2">Sort By</Label>
          <Select
            value={sort}
            onValueChange={(value) => handleFilterChange("sort", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Order</SelectLabel>
                {sortOptions?.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
