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

export default function TransactionFilter() {
  const { data } = useMyProfileQuery({});
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedType = searchParams.get("type") || "";
  const selectedStatus = searchParams.get("status") || "";
  const selectedRole = searchParams.get("role") || "";

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
  ];

  const roleOptions = [
    { value: "USER", label: "User" },
    { value: "AGENT", label: "Agent" },
    { value: "ADMIN", label: "Admin" },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="col-span-3 w-full border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear All
        </Button>
      </div>

      {/* Transaction Type Filter */}
      <div>
        <Label className="mb-2">Transaction Type</Label>
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
              {transactionTypes.map((item) => (
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
        <Label className="mb-2">Status</Label>
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
              {statusOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {data?.data?.role === "ADMIN" && (
        <>
          {/* Role Filter */}
          <div>
            <Label className="mb-2">User Role</Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => handleFilterChange("role", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {roleOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}
