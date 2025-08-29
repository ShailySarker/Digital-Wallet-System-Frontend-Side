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
import { Input } from "@/components/ui/input";
import PasswordToggle from "@/components/ui/passwordToggle";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import loginCover from "../../../assets/images/login.avif";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  password: z
    .string({ error: "Password must be string" })
    .regex(/^\d{6}$/, "Password must be string of exactly 6 digits"),
  phone: z
    .string({ error: "Phone number must be string" })
    .regex(/^(?:\+8801\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX",
    }),
});

export default function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      phone: data.phone,
      password: data.password,
    };

    const toastId = toast.loading("Login into your account ...");
    try {
      const result = await login(userInfo).unwrap();
      if (result?.success) {
        toast.success("You logged in successfully", { id: toastId });
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(`Logged in failed: ${error?.data?.message || error?.data}`);
    }
  };

  return (
    <div
      className={cn("flex flex-col xl:gap-4 gap-3 w-full", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0 w-full ">
        <CardContent className="grid p-0 md:grid-cols-2 w-full ">
          <div className="xl:px-6 xl:py-32 lg:px-5 lg:py-20 md:px-4 md:py-16 p-5">
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-center italic font-semibold xl:text-xl lg:text-[16.5px] md:text-[16.5px] text-[15.5px]">
                Login to your account
              </h1>
            </div>
            <div className="xl:mt-4 mt-3">
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
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between">
                          <span>Password</span>
                          <span className="opacity-70 font-medium">
                            <Link to="/forget-password">
                              Forgot your password?
                            </Link>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <PasswordToggle {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          //only screen reader can read This is your password.
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
                    {isLoading ? "Login...." : "Submit"}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="text-center text-sm xl:mt-3 mt-2 italic">
              Are you new here?{" "}
              <Link
                to="/Register"
                className="underline font-bold underline-offset-4"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginCover}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
