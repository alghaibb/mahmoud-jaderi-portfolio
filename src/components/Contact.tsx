"use client";

import { useState } from "react";
import Link from "next/link";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactFormSchema } from "@/schemas";
import { contactFormSubmission } from "@/actions/contact-form-submission";
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="md:w-[800px] md:px-0 md:py-0">
        <CardHeader className="space-y-4">
          <CardTitle className="md:text-4xl">Contact Me</CardTitle>
          <CardDescription>
            Have a question or want to work together? Send me a message!
          </CardDescription>
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
              <Button type="submit" className="w-full mt-4" disabled={loading}>
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
