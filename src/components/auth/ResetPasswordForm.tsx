"use client";

import { useState } from "react";
import Link from "next/link";

import { FaEyeSlash, FaEye } from "react-icons/fa";

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
import LoadingSpinner from "@/components/loading";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordResetFormSchema } from "@/schemas";

const PasswordResetForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(PasswordResetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof PasswordResetFormSchema>) => {
    console.log("New password:", data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="md:w-[800px] md:px-0 md:py-0">
      <CardHeader className="space-y-4">
        <CardTitle className="md:text-4xl">Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-3"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-3"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href="/">
                <p className="mt-4 flex items-center text-sm underline">
                  Back to home
                </p>
              </Link>
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PasswordResetForm;
