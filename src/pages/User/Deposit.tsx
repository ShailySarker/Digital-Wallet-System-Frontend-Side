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
import { useDepositMutation } from "@/redux/features/wallet/wallet.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const depositSchema = z.object({
  amount: z
    .number({ message: "Deposit must be a number" })
    .positive({ message: "Deposit amount must be a positive number" })
    .min(200, { message: "Miniumum deposit amount 200 TK" })
    .max(50000, { message: "Maximum deposit amount 50,000 TK" }),
});

export default function Deposit() {
  const [deposit, { isLoading: depositMoneyLoading }] = useDepositMutation();
  const form = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 0,
    },
  });
  const onSubmit = async (data: z.infer<typeof depositSchema>) => {
    const amount = Number(data?.amount);
    const depositInfo = { amount };
    const toastId = toast.loading("Depositing money ....");
    try {
      const result = await deposit(depositInfo).unwrap();
      if (result?.success) {
        toast.success("Your money deposit successfully", { id: toastId });
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Your deposit money process failed: ${
          error?.data?.message || error?.data
        }`, { id: toastId }
      );
    }
  };

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        Deposit Money
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Amount</FormLabel>
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
              disabled={depositMoneyLoading}
            >
              {depositMoneyLoading ? "Depositing Money ...." : "Deposit Money"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
