import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";
import Cookies from "js-cookie";

const forgetPasswordSchema = z
  .object({
    newPassword: z
      .string({ error: "Password must be string" })
      .regex(/^\d{6}$/, "Password must be string of exactly 6 digits"),
    confirmNewPassword: z
      .string({ error: "Password must be string" })
      .regex(/^\d{6}$/, "Password must be string of exactly 6 digits"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password do not match with confirm password",
    path: ["confirmNewPassword"],
  });

export default function ResetPassword() {
  const [forgetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgetPasswordSchema>) => {
    const userInfo = {
      id: userId!,
      newPassword: data.newPassword,
    };
    console.log(userInfo);
    if (token) {
      Cookies.set("accessToken", token);
    }
    const toastId = toast.loading("Reseting your password ...");
    try {
      const result = await forgetPassword(userInfo).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Password reset successfully", { id: toastId });
        Cookies.remove("accessToken");
        navigate("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Password reseting failed: ${error?.data?.message || error?.data}`
      );
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full flex-col justify-center items-center xl:gap-4 gap-3">
        <Link to="/">
          <Logo />
        </Link>
        <div className="lg:w-1/2 md:w-2/3 w-full">
          <Card className="overflow-hidden p-0 w-full ">
            <CardContent className="px-0">
              <div className="xl:px-6 xl:py-10 lg:px-5 lg:py-8 md:px-4 md:py-6 p-5">
                <div className="flex flex-col gap-3 items-center">
                  <h1 className="text-center italic font-semibold xl:text-xl lg:text-[16.5px] md:text-[16.5px] text-[15.5px]">
                    Reset your new password
                  </h1>
                </div>
                <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="xl:space-y-5 space-y-[18px]"
                    >
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
                              //only screen reader can read This is your
                              password.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <PasswordToggle {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                              //only screen reader can read This is your confirm
                              password.
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
                        {isLoading ? "Reseting...." : "Submit"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
