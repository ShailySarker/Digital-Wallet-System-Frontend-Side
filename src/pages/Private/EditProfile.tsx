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
import { isActive, isApproved, Role } from "@/constants/user.constant";
import { useEditUserMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import ErrorPage from "@/components/shared/ErrorPage";
import LazyLoader from "@/components/shared/LazyLoader";

const updateMyProfileSchema = z.object({
  name: z
    .string({ error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .optional(),
  email: z
    .string({ error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." })
    .optional(),
  phone: z
    .string({ message: "Phone number must be string" })
    .regex(/^(?:01\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX",
    })
    .optional(),
  role: z.enum([Role.USER, Role.AGENT]).default(Role.USER).optional(),
  isActive: z.enum(Object.values(isActive) as [string]).optional(),
  isApproved: z.enum(Object.values(isApproved) as [string]).optional(),
  commissionRate: z
    .number({ message: "commissionRate must be number" })
    .int({ message: "commissionRate must be a positive number" })
    .min(0, { message: "commissionRate must be a positive number" })
    .max(100, { message: "commissionRate cannot more than 100" })
    .optional(),
  isDeleted: z.boolean({ message: "isDeleted must be boolean" }).optional(),
});

export default function EditProfile() {
  const {
    data: myProfileData,
    isLoading: myProfileDataLoading,
    isError: myProfileDataError,
    refetch,
  } = useMyProfileQuery(
    {},
    {
      pollingInterval: 30000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  // console.log(myProfileData?.data?.isApproved);
  const [editUser, { isLoading: updatingProfileDataLoading }] =
    useEditUserMutation();
  const form = useForm<z.infer<typeof updateMyProfileSchema>>({
    resolver: zodResolver(updateMyProfileSchema),
    defaultValues: {
      name: myProfileData?.data?.name,
      role: myProfileData?.data?.role,
      isActive: myProfileData?.data?.isActive,
      isApproved: myProfileData?.data?.isApproved,
      commissionRate: myProfileData?.data?.commissionRate,
      isDeleted: myProfileData?.data?.isDeleted,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateMyProfileSchema>) => {
    // console.log(data);
    const updatedData = {
      name: data?.name ? data?.name : myProfileData?.data?.name,
      phone: data?.phone ? data?.phone : myProfileData?.data?.phone,
      //   role: data?.role ? data?.role : myProfileData?.data?.role,
      //   isActive: data?.isActive ? data?.isActive : myProfileData?.data?.isActive,
      //   isApproved: data?.isApproved
      //     ? data?.isApproved
      //     : myProfileData?.data?.isApproved,
      //   commissionRate: data?.commissionRate
      //     ? data?.commissionRate
      //     : myProfileData?.data?.commissionRate,
      //   isDeleted: data?.isDeleted
      //     ? data?.isDeleted
      //     : myProfileData?.data?.isDeleted,
    };
    const toastId = toast.loading("Updating to your profile ...");
    const userId = myProfileData?.data?._id;
    // console.log({ userId, updatedData });
    try {
      const result = await editUser({ userId, updatedData }).unwrap();
      // console.log(result);
      if (result.success) {
        form.reset();
        toast.success("Your profile updated successfully", { id: toastId });
        await refetch();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(`Your updating profile is failed: ${error?.data?.message}`, {
        id: toastId,
      });
    }
  };

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12 xl:px-20 lg:px-14 md:px-10 px-5">
      <h1 className="text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold">
        Edit Profile
      </h1>
      <div>
        <div className="xl:mt-12 lg:mt-10 md:mt-8 mt-6">
          {myProfileDataError ? (
            <ErrorPage />
          ) : myProfileDataLoading ? (
            <LazyLoader />
          ) : (
            <div className="xl:w-2/3 lg:w-3/4 md:w-2/3 mx-auto bg-primary/5 border-primary xl:p-8 lg:p-7 md:p-6 p-5 border-2 shadow rounded-2xl">
              {myProfileData?.data && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="xl:space-y-5 space-y-[18px]"
                  >
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your name"
                                defaultValue={myProfileData?.data?.name}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="sr-only">
                              //only screen reader can read This is your name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            type="email"
                            value={myProfileData?.data?.email}
                            readOnly
                            disabled
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          //only screen reader can read This is your email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                type="tel"
                                defaultValue={myProfileData?.data?.phone}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="sr-only">
                              //only screen reader can read This is your phone.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormItem>
                        <FormLabel>NID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your nid number"
                            value={myProfileData?.data?.nidNumber}
                            readOnly
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormField
                        control={form.control}
                        name="role"
                        render={() => (
                          <FormItem>
                            <FormLabel>Account Type</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter your phone number"
                              value={myProfileData?.data?.role}
                              readOnly
                              disabled
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isApproved"
                        render={() => (
                          <FormItem>
                            <FormLabel>Approve Status</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter your phone number"
                              value={myProfileData?.data?.isApproved}
                              readOnly
                              disabled
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {myProfileData?.data?.role === "AGENT" && (
                        <FormField
                          control={form.control}
                          name="commissionRate"
                          render={() => (
                            <FormItem>
                              <FormLabel>Commission Rate</FormLabel>
                              <Input
                                type="text"
                                placeholder="Enter your phone number"
                                value={myProfileData?.data?.commissionRate}
                                readOnly
                                disabled
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <Button
                      disabled={updatingProfileDataLoading}
                      type="submit"
                      className="cursor-pointer w-full xl:mt-5 lg:mt-4 md:mt-3 mt-2 font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]"
                    >
                      {updatingProfileDataLoading ? "Updating...." : "Submit"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
