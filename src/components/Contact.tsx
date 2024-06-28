"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ContactFormSchema } from "@/schemas";
import { contactFormSubmission } from "@/actions/contact-form-submission";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading";
import CustomMessage from "@/components/ui/custom-messages";
import { Textarea } from "./ui/textarea";

const ContactForm = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { handleSubmit } = form;

  const clearMessages = () => {
    setSuccess(null);
    setError(null);
  };

  const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
    setLoading(true);
    clearMessages();
    try {
      const res = await contactFormSubmission(data);
      if (res && res.error) {
        setError(res.error);
      } else if (res && res.success) {
        setSuccess(res.success);
        form.reset();
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setError("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-screen items-center justify-center px-5 sm:px-4 md:px-8 lg:px-16 xl:px-20">
      <Card className="w-full sm:w-full md:w-[800px] lg:w-[800px] xl:w-[800px] md:px-0 md:py-0 lg:py-8 xl:py-10">
        <CardHeader className="space-y-4">
          <CardTitle className="md:text-4xl">Contact Me</CardTitle>
          <CardDescription>
            Have a question or want to work together? Send me a message!
          </CardDescription>
          <p className="mt-4 text-sm">
            You can also reach me at{" "}
            <a
              href="mailto: mahmoud_jaderi@codewithmj.com"
              className="text-blue-500"
            >
              mahmoud_jaderi@codewithmj.com
            </a>
          </p>
        </CardHeader>
        <CardContent>
          {success && <CustomMessage type="success" message={success} />}
          {error && <CustomMessage type="error" message={error} />}
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="name" disabled={loading} />
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
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="subject">Subject</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={loading} type="text" />
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
                      <FormLabel htmlFor="message">Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="mt-4 w-full" disabled={loading}>
                {loading ? <LoadingSpinner /> : "Send Message"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ContactForm;
