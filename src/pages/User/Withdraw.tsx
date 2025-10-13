/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useCashOutMutation,
  useMyWalletQuery,
} from "@/redux/features/wallet/wallet.api";
import { useGetAgentsQuery } from "@/redux/features/user/user.api";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, Shield, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserResult {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  nidNumber: string;
}

export default function Withdraw() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserResult | null>(null);
  const { data: myWallet } = useMyWalletQuery({});
  const [withdrawMoney, { isLoading: withdrawMoneyLoading }] =
    useCashOutMutation();

  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useGetAgentsQuery(
    { searchTerm },
    { skip: searchTerm.length < 3 } // Only search when at least 3 characters
  );

  const withdrawMoneySchema = z.object({
    phone: z
      .string({ message: "Phone number must be string" })
      .regex(/^(?:01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX",
      }),
    amount: z
      .number({ message: "Withdraw money must be a number" })
      .positive({ message: "Withdraw money amount must be a positive number" })
      .min(100, { message: "Minimum withdraw money amount 100 TK" })
      .max(50000, { message: "Maximum withdraw money amount 50,000 TK" })
      .refine((val) => val <= (myWallet?.data?.balance || 0), {
        message: "Your wallet has insufficient balance",
      }),
  });

  const form = useForm<z.infer<typeof withdrawMoneySchema>>({
    resolver: zodResolver(withdrawMoneySchema),
    defaultValues: {
      phone: "",
      amount: 0,
    },
  });

  // Update form when user is selected
  useEffect(() => {
    if (selectedUser) {
      form.setValue("phone", selectedUser.phone);
    }
  }, [selectedUser, form]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedUser(null); // Reset selection when search changes
  };

  const handleUserSelect = (userId: string) => {
    const user = searchResults?.data?.find((u: UserResult) => u._id === userId);
    if (user) {
      setSelectedUser(user);
      setSearchTerm(""); // Clear search term after selection
    }
  };

  const onSubmit = async (data: z.infer<typeof withdrawMoneySchema>) => {
    if (!selectedUser) {
      toast.error("Please select an agent to withdraw money to");
      return;
    }

    const withdrawMoneyInfo = {
      phone: data.phone,
      amount: Number(data.amount),
    };

    const toastId = toast.loading("Withdrawing money...");
    try {
      const result = await withdrawMoney(withdrawMoneyInfo).unwrap();
      if (result?.success) {
        toast.success("Withdraw money successfully!", { id: toastId });
        form.reset();
        setSelectedUser(null);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Failed to withdraw money: ${
          error?.data?.message || error?.data || "Unknown error"
        }`,
        { id: toastId }
      );
    }
  };

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        Withdraw Money
      </h1>

      <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary rounded-2xl xl:p-16 lg:p-10 md:p-8 p-5 lg:w-1/2 md:w-2/3 w-full mx-auto">
        {/* Wallet Balance Display */}
        {/* {myWallet && (
          <Card className="mb-6 bg-primary/10 border-primary">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Your Balance:</span>
                <span className="text-2xl font-bold text-primary">
                  {myWallet?.data?.balance.toLocaleString()} TK
                </span>
              </div>
            </CardContent>
          </Card>
        )} */}

        {/* User Search */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Find Agent</label>
          <div className="relative border border-primary rounded-lg">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by agent phone or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          {/* Search Results */}
          {searchTerm?.length >= 3 && (
            <Card className="mt-2 max-h-60 overflow-y-auto">
              <CardContent className="p-2">
                {searchLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : searchError ? (
                  <p className="text-sm text-red-500 py-2 text-center">
                    Error loading results
                  </p>
                ) : searchResults?.data?.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-2 text-center">
                    No agent found
                  </p>
                ) : (
                  searchResults?.data?.map((user: UserResult) => (
                    <div
                      key={user?._id}
                      className="flex items-center gap-3 p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
                      onClick={() => handleUserSelect(user?._id)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.phone} • {user?.email}
                        </p>
                      </div>
                      <Badge
                        variant={
                          user?.role === "AGENT" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {user?.role === "AGENT" ? (
                          <Shield className="h-3 w-3 mr-1" />
                        ) : (
                          <User className="h-3 w-3 mr-1" />
                        )}
                        {user?.role}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Selected User Display */}
        {selectedUser && (
          <Card className="mb-6 bg-primary/3 border-dashed border-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/15 text-primary font-bold">
                    {selectedUser?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedUser?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser?.phone} • {selectedUser?.role}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedUser(null)}
                  className="ml-auto italic"
                >
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!selectedUser && (
          <>
            {" "}
            <div className="text-center mb-4">
              --------------- or ----------------
            </div>
          </>
        )}
        {/* Withdraw Money Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="xl:space-y-5 space-y-[18px]"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className={selectedUser ? "hidden" : ""}>
                  <FormLabel>Agent Mobile</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-primary"
                      type="tel"
                      placeholder="Enter agent mobile number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (TK)</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-primary"
                      type="number"
                      placeholder="Enter amount to withdraw"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Minimum: 100 TK, Maximum: 50,000 TK
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="xl:mt-5 lg:mt-4 md:mt-3 mt-2 w-full font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
              disabled={withdrawMoneyLoading || !selectedUser}
            >
              {withdrawMoneyLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Withdraw Money...
                </>
              ) : (
                `Withdraw Money from ${selectedUser?.name || "Agent"}`
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   useMyWalletQuery,
//   useWithdrawMutation,
// } from "@/redux/features/wallet/wallet.api";

// export default function Withdraw() {
//   const { data: myWallet } = useMyWalletQuery({});
//   const [withdraw, { isLoading: withdrawMoneyLoading }] = useWithdrawMutation();
//   const withdrawSchema = z.object({
//     amount: z
//       .number({ message: "Withdraw must be a number" })
//       .positive({ message: "Withdraw amount must be a positive number" })
//       .min(100, { message: "Miniumum withdraw amount 100 TK" })
//       .max(50000, { message: "Maximum withdraw amount 50,000 TK" })
//       .refine((val) => val <= myWallet?.data?.balance, {
//         message: "Your wallet has insufficient balance",
//       }),
//   });
//   const form = useForm<z.infer<typeof withdrawSchema>>({
//     resolver: zodResolver(withdrawSchema),
//     defaultValues: {
//       amount: 0,
//     },
//   });
//   const onSubmit = async (data: z.infer<typeof withdrawSchema>) => {
//     const amount = Number(data?.amount);
//     const withdrawInfo = { amount };
//     const toastId = toast.loading("Withdrawing money ....");
//     try {
//       const result = await withdraw(withdrawInfo).unwrap();
//       if (result?.success) {
//         toast.success("Your money withdraw successfully", { id: toastId });
//         form.reset();
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       console.error(error);
//       toast.error(
//         `Your withdraw money process failed: ${
//           error?.data?.message || error?.data
//         }`,
//         { id: toastId }
//       );
//     }
//   };

//   return (
//     <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
//       <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
//         Withdraw Money
//       </h1>
//       <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary  rounded-2xl xl:p-20 lg:p-10 md:p-8 p-5 lg:w-1/2 md:w-2/3 w-full mx-auto">
//         {/* {userData && <UserBalance balance={userData.balance} />} */}

//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="xl:space-y-5 space-y-[18px]"
//           >
//             <FormField
//               control={form.control}
//               name="amount"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Withdraw Amount</FormLabel>
//                   <FormControl>
//                     <Input
//                       className="border border-primary"
//                       type="number"
//                       placeholder="Enter your amount"
//                       {...field}
//                       onChange={(e) => field.onChange(e.target.valueAsNumber)} // force number
//                     />
//                   </FormControl>
//                   <FormDescription className="sr-only">
//                     //only screen reader can read This is your amount.
//                   </FormDescription>
//                   <FormDescription className="text-xs">
//                     Minimum: 100 TK, Maximum: 50,000 TK
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               className="cursor-pointer w-full xl:mt-5 lg:mt-4 md:mt-3 mt-2 font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
//               disabled={withdrawMoneyLoading}
//             >
//               {withdrawMoneyLoading
//                 ? "Withdrawing Money ...."
//                 : "Withdraw Money"}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }
