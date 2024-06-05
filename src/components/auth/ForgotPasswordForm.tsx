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
import LoadingSpinner from "@/app/loading";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ForgotPasswordFormSchema } from "@/schemas";

const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof ForgotPasswordFormSchema>) => {
    console.log("Email entered:", data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="md:w-[800px] md:px-0 md:py-0">
      <CardHeader className="space-y-4">
        <CardTitle className="md:text-4xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email and you will recieve an email with instructions on
          how to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
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
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Forgot Password"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-sm ">
          Remember your password?{" "}
          <Link href="/login">
            <Button variant="link" className="px-0">
              Login
            </Button>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
