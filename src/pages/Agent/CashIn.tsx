import {
  useCashInMutation,
  useMyWalletQuery,
} from "@/redux/features/wallet/wallet.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

export default function CashIn() {
  const { data: myWallet } = useMyWalletQuery({});
  const [cashIn, { isLoading: cashInLoading }] = useCashInMutation();
  const cashInSchema = z.object({
    phone: z
      .string({ message: "Phone number must be string" })
      .regex(/^(?:01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX",
      }),
    amount: z
      .number({ message: "Cash in must be a number" })
      .positive({ message: "Cash in amount must be a positive number" })
      .min(100, { message: "Miniumum cash in amount 100 TK" })
      .max(50000, { message: "Maximum cash in amount 50,000 TK" })
      .refine((val) => val <= myWallet?.data?.balance, {
        message: "Your wallet has insufficient balance",
      }),
  });

  const form = useForm<z.infer<typeof cashInSchema>>({
    resolver: zodResolver(cashInSchema),
    defaultValues: {
      phone: "",
      amount: 0,
    },
  });
  const onSubmit = async (data: z.infer<typeof cashInSchema>) => {
    try {
      const cashInInfo = {
        phone: data?.phone,
        amount: Number(data?.amount),
      };
      const toastId = toast.loading("Procesing cash in ....");
      const result = await cashIn(cashInInfo).unwrap();
      if (result?.success) {
        toast.success("Your cashIn processed successfully", { id: toastId });
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Your cashIn process failed: ${error?.data?.message || error?.data}`
      );
    }
  };

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        Cash In
      </h1>
      <div className="bg-accent/50 xl:mt-12 lg:mt-10 md:mt-8 mt-6 border-2 border-primary  rounded-2xl xl:p-20 lg:p-10 md:p-8 p-5 lg:w-1/2 md:w-2/3 w-full mx-auto">
        {/* {userData && <UserBalance balance={userData.balance} />} */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="xl:space-y-5 space-y-[18px]"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Mobile</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-primary"
                      type="tel"
                      placeholder="Enter receiver mobile number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    //only screen reader can read This is receiver mobile numbe.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-primary"
                      type="number"
                      placeholder="Enter your amount"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)} // force number
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    //only screen reader can read This is your amount.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="cursor-pointer w-full xl:mt-5 lg:mt-4 md:mt-3 mt-2 font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
              disabled={cashInLoading}
            >
              {cashInLoading ? "Processing Cash In ...." : "Cash In Now!"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
