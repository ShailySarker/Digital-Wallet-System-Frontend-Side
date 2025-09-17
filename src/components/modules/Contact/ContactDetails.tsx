import { useConstactUsMutation } from "@/redux/features/contact/contact.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "support@digitalwallet.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+(880) 123-4567890",
    description: "Mon-Fri from 8am to 6pm",
  },
  {
    icon: MapPin,
    title: "Office",
    content: "123 Financial District",
    description: "Dhanmondi, Dhaka-1229",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "24/7 Support",
    description: "Customer service always available",
  },
];

const contactSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string({ message: "Email must be string" })
    .email({ message: "Invalid email address format" })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  phone: z
    .string({ message: "Phone number must be string" })
    .regex(/^(?:01\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX",
    }),
  subject: z
    .string({ message: "Subject must be string" })
    .min(5, { message: "Subject must be at least 5 characters long." })
    .max(50, { message: "Subject cannot exceed 50 characters." }),
  message: z
    .string({ message: "Message must be string" })
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});

export default function ContactDetails() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactUs, { isLoading }] = useConstactUsMutation();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    const messageInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    };

    const toastId = toast.loading("Your message is submitting ...");
    try {
      const result = await contactUs(messageInfo).unwrap();
      if (result?.success) {
        toast.success("Your message submitted successfully", { id: toastId });
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Message submission failed: ${error?.data?.message || error?.data}`, { id: toastId }
      );
    }
  };
  return (
    <div>
      {/* Header */}
      <div className="text-center">
        <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold xl:mb-4 lg:mb-3 mb-2">
          Get in Touch
        </h1>
        <p className="xl:text-xl lg:text-lg md:text-[17px] text-[15px]opacity-80 max-w-3xl mx-auto">
          Have questions or need assistance? Our team is here to help you 24/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 items-center gap-8 xl:mt-12 lg:mt-10 md:mt-8 mt-6">
        {/* Contact Information */}
        <div>
          <h2 className="xl:text-2xl lg:text-[22px] md:text-xl text-lg font-bold lg:mb-3 mb-2">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {contactInfo?.map((info, index) => (
              <Card key={index} className="p-0">
                <CardContent className="lg:text-lg text-[17px] lg:p-5 p-4">
                  <div className="flex items-start lg:gap-3 gap-2">
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <info.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="lg:text-base text-sm font-semibold mb-1">
                        {info?.title}
                      </h3>
                      <p className="lg:text-base text-sm opacity-90 mb-1">
                        {info?.content}
                      </p>
                      <p className="lg:text-sm text-xs opacity-60">
                        {info?.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Prompt */}
          <Card className="lg:p-5 p-4">
            <CardHeader className="p-0">
              <CardTitle className="lg:text-base text-sm">Quick Help</CardTitle>
              <CardDescription>
                Check our FAQ section for instant answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Link to="/faq">
                <Button className="w-full cursor-pointer">
                  Visit FAQ Center
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="lg:p-5 p-4">
          <CardHeader>
            <CardTitle className="xl:text-2xl lg:text-[22px] md:text-xl text-lg font-bold text-center">
              Send us a Message
            </CardTitle>
            <CardDescription className="text-center">
              Fill out the form below and we'll get back to you as soon as
              possible
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for contacting us. We'll get back to you within 24
                  hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
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
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 gap-4 items-start">
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
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your subject"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none min-h-40 max-h-52"
                            placeholder="Enter your message..."
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
                    {isLoading ? "Sending...." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
