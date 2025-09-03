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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import registerCover from "../../../assets/images/register.avif";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/constants/user.constant";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z
    .string({ error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string({ error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({ error: "Password must be string" })
    .regex(/^\d{6}$/, "Password must be string of exactly 6 digits"),
  phone: z
    .string({ message: "Phone number must be string" })
    .regex(/^(?:01\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX",
    }),
  role: z.enum([Role.USER, Role.AGENT]).default(Role.USER).optional(),
  nidNumber: z
    .string({ error: "nidNumber must be a string of digits" })
    .regex(
      /^([0-9]{10}|[0-9]{17})$/,
      "nidNumber must be a string of exactly 10 or 17 digits long"
    ),
});

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nidNumber: "",
      role: Role.USER,
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      nidNumber: data.nidNumber,
      role: data.role,
      password: data.password,
    };
    const toastId = toast.loading("Registering to your account ...");
    try {
      const result = await register(userInfo).unwrap();
      if (result?.success) {
        toast.success("Your acccount registered successfully", { id: toastId });
        form.reset();
        navigate("/verify", { state: userInfo.email });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(`Your registration failed: ${error?.data?.message}`, { id: toastId });
    }
  };

  return (
    <div
      className={cn("flex flex-col xl:gap-4 gap-3 w-full", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0 w-full ">
        <CardContent className="grid p-0 md:grid-cols-2 w-full ">
          <div className="xl:p-6 lg:p-5 md:p-4 p-5">
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-center italic font-semibold xl:text-xl lg:text-[16.5px] md:text-[16.5px] text-[15.5px]">
                Register to your account
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          //only screen reader can read This is your name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          //only screen reader can read This is your email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    name="nidNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your nid number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USER">Personal User</SelectItem>
                            <SelectItem value="AGENT">Service Agent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
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
                  {/* <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
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
                  /> */}

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="cursor-pointer w-full xl:mt-5 lg:mt-4 md:mt-3 mt-2 font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
                  >
                    {isLoading ? "Registering...." : "Submit"}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="text-center text-sm xl:mt-3 mt-2 italic">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline font-bold underline-offset-4"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src={registerCover}
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
