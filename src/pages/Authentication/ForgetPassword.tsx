import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgetPasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

const forgetPasswordSchema = z.object({
  email: z
    .string({ error: "Email must be string" })
    .email({ message: "Invalid email address format." }),
});

export default function ForgetPassword() {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  //   const navigate = useNavigate();
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgetPasswordSchema>) => {
    const userInfo = {
      email: data.email,
    };

    const toastId = toast.loading("Sending email to your account ...");
    try {
      const result = await forgetPassword(userInfo).unwrap();
      if (result?.success) {
        toast.success("Email sent successfully", { id: toastId });
        // navigate("/reset-password");
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Sending email in failed: ${error?.data?.message || error?.data}`, { id: toastId }
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
                    Enter the email address of your accout
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        disabled={isLoading}
                        type="submit"
                        className="cursor-pointer w-full xl:mt-5 lg:mt-4 md:mt-3 mt-2 font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
                      >
                        {isLoading ? "Sending...." : "Submit"}
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
