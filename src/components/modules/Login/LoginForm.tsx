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
import { Separator } from "@/components/ui/separator";
import config from "@/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { User, UserPlus } from "lucide-react";

const loginSchema = z.object({
  password: z
    .string({ error: "Password must be string" })
    .regex(/^\d{6}$/, "Password must be string of exactly 6 digits"),
  phone: z
    .string({ message: "Phone number must be string" })
    .regex(/^(?:01\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX",
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

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

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
      toast.error(`Logged in failed: ${error?.data?.message || error?.data}`, {
        id: toastId,
      });
    }
  };

  const handleDemoLogin = (role: "user" | "agent" | "admin") => {
    const credentials = {
      user: {
        phone: import.meta.env.VITE_USER_PHONE,
        password: import.meta.env.VITE_USER_PASSWORD,
      },
      agent: {
        phone: import.meta.env.VITE_AGENT_PHONE,
        password: import.meta.env.VITE_AGENT_PASSWORD,
      },
      admin: {
        phone: import.meta.env.VITE_ADMIN_PHONE,
        password: import.meta.env.VITE_ADMIN_PASSWORD,
      },
    };

    const selected = credentials[role];
    form.setValue("phone", selected.phone);
    form.setValue("password", selected.password);
    toast.success(
      `${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled!`,
    );
  };

  const handleGoogleLogin = (role: "USER" | "AGENT") => {
    setIsRoleModalOpen(false);
    console.log("Google login", `${config.baseUrl}/auth/google?role=${role}`);
    // Redirect to backend google auth endpoint
    window.location.href = `${config.baseUrl}/auth/google?role=${role}`;
  };

  return (
    <div
      className={cn("flex flex-col xl:gap-4 gap-3 w-full", className)}
      {...props}
    >
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl italic font-bold">
              Select Your Role
            </DialogTitle>
            <DialogDescription className="text-center">
              Please choose how you want to join our platform via Google login.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all group"
              onClick={() => handleGoogleLogin("USER")}
            >
              <User className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-bold">Login as User</span>
                <span className="text-[10px] text-muted-foreground italic">
                  For general payments and services
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all group"
              onClick={() => handleGoogleLogin("AGENT")}
            >
              <UserPlus className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-bold">Login as Agent</span>
                <span className="text-[10px] text-muted-foreground italic">
                  For providing cash-out and other services
                </span>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Card className="overflow-hidden p-0 w-full ">
        <CardContent className="grid p-0 md:grid-cols-2 w-full ">
          <div className="xl:px-6 xl:py-16 lg:px-5 lg:py-12 md:px-4 md:py-10 p-5">
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-center italic font-semibold xl:text-xl lg:text-[16.5px] md:text-[16.5px] text-[15.5px]">
                Login to your account
              </h1>
            </div>
            <div className="xl:mt-4 mt-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="xl:space-y-4 space-y-[15px]"
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
                          <span className="opacity-50 font-normal hover:text-primary text-sm/normal">
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
                    className="cursor-pointer w-full font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
                  >
                    {isLoading ? "Login...." : "Submit"}
                  </Button>
                </form>
              </Form>
              {/* demo login */}
              <div className="mt-6 space-y-3">
                <p className="text-center text-xs font-medium text-muted-foreground uppercase">
                  Demo Login
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-[10px] h-8"
                    onClick={() => handleDemoLogin("user")}
                  >
                    User
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-[10px] h-8"
                    onClick={() => handleDemoLogin("agent")}
                  >
                    Agent
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-[10px] h-8"
                    onClick={() => handleDemoLogin("admin")}
                  >
                    Admin
                  </Button>
                </div>
              </div>
              {/* google login */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                type="button"
                className="cursor-pointer w-full font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
                onClick={() => setIsRoleModalOpen(true)}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Continue with Google
              </Button>
            </div>
            <div className="text-center text-muted-foreground text-sm xl:mt-3 mt-2 italic">
              Are you new here?{" "}
              <Link
                to="/Register"
                className="underline text-primary font-bold underline-offset-4"
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
        By clicking continue, you agree to our{" "}
        <Link to="/terms-of-service" className="font-medium">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy-policy" className="font-medium">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
