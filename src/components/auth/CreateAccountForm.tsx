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
import LoadingSpinner from "@/components/ui/loading";
import CustomMessage from "../ui/custom-messages";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateAccountFormSchema } from "@/schemas";
import { createAccount } from "@/actions/auth/create-account";

const CreateAccountForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(CreateAccountFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  const clearMessages = () => {
    setSuccess(null);
    setError(null);
  };

  const onSubmit = async (data: z.infer<typeof CreateAccountFormSchema>) => {
    setLoading(true);
    clearMessages();
    try {
      const res = await createAccount(data);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-80 sm:w-full md:w-[800px] md:px-8 md:py-4 lg:px-16 lg:py-8 xl:px-20 xl:py-10">
      <CardHeader className="space-y-4">
        <CardTitle className="md:text-4xl">Create Account</CardTitle>
        <CardDescription>
          Enter your details below to create an account
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
                    <FormLabel htmlFor="name" className="text-primary">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="name" disabled={loading} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="text-primary">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={loading} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password" className="text-primary">
                      Password
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
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password" className="text-primary">
                      Confirm Your Password
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
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Create Account"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
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

export default CreateAccountForm;
