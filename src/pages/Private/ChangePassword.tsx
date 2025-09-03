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
import PasswordToggle from "@/components/ui/passwordToggle";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ error: "Password must be string" })
      .regex(/^\d{6}$/, "Password must be string of exactly 6 digits"),
    newPassword: z
      .string({ error: "Password must be string" })
      .regex(/^\d{6}$/, "Password must be string of exactly 6 digits"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from old password",
  });

export default function ChangePassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    const passwordInfo = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    console.log(passwordInfo);
    const toastId = toast.loading("Changing your password ...");
    try {
      const result = await changePassword(passwordInfo).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Your password changed successfully", { id: toastId });
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Changing password failed: ${error?.data?.message || error?.data}`, { id: toastId }
      );
    }
  };
  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12">
      <h1 className="text-center italic font-bold xl:text-2xl lg:text-[19px] md:text-lg text-[17px]">
        Are your want to change your password?
      </h1>
      <div className="xl:mt-16 lg:mt-12 md:mt-11 mt-8 lg:w-1/2 md:w-3/4 w-full mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="xl:space-y-5 space-y-[18px]"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordToggle {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    //only screen reader can read This is your old password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordToggle {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    //only screen reader can read This is your old password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="cursor-pointer w-full xl:mt-5 lg:mt-4 md:mt-3 mt-2 font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
            >
              {isLoading ? "Changing password...." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
