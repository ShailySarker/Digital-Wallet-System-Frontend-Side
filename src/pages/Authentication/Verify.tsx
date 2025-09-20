/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendOTPMutation, useVerifyOTPMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";


const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {

  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location?.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOTP, { isLoading: loadingForSendingOTP }] = useSendOTPMutation()
  const [verifyOTP, { isLoading: loadingForVerifyingOTP }] = useVerifyOTPMutation();;
  const [timer, setTimer] = useState(120);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOTP = async () => {
    const toastId = toast.loading("Sending OTP...")
    try {
      const result = await sendOTP({ email: email }).unwrap();
      if (result.success) {
        // toast.success("OTP send successfully");
        toast.success("OTP send successfully", { id: toastId });
        setConfirmed(true);
        setTimer(120);
      }
    } catch (error: any) {
      console.log(error);
      toast(`Sending OTP failed: ${error?.data?.message}`)
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP...");
    const userInfo = {
      email,
      otp: data.pin
    }

    try {
      const result = await verifyOTP(userInfo).unwrap();
      if (result.success) {
        toast.success("OTP verified successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error);
      toast(`Verifying OTP failed: ${error?.data?.message}`, { id: toastId });
      setConfirmed(false);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return (
    <div className="grid place-content-center h-screen">
      {
        confirmed ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Verify your email address</CardTitle>
              <CardDescription className="text-center">
                Please enter the 6-digit code we sent to <br /> {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <Dot />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={4} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription className="flex items-center justify-end gap-1">
                          <Button className={cn("p-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })} onClick={handleSendOTP} type="button" variant="link" disabled={timer !== 0}>Resend OTP: {" "}</Button>
                          {" "}{timer}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                form="otp-form"
                type="submit"
                disabled={loadingForVerifyingOTP}
              >
                {loadingForVerifyingOTP ? "Verifying OTP ..." : "Submit"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Verify your email address</CardTitle>
              <CardDescription className="text-center">
                We will send you an OTP at  <br /> {email}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex">
              <Button
                className="w-[300px] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendOTP}
                disabled={loadingForSendingOTP}
                type="submit"
              >
                {loadingForSendingOTP ? "Sending OTP ..." : "Confirm"}
              </Button>
            </CardFooter>
          </Card>
        )
      }

    </div >
  );
}