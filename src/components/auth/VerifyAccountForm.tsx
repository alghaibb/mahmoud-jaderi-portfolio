"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/ui/loading";
import CustomMessage from "../ui/custom-messages";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { VerifyEmailToken } from "@/actions/auth/verify-email";
import { VerifyEmailFormSchema } from "@/schemas";
import { resendVerificationEmail } from "@/actions/auth/resend-verification-email";
import Link from "next/link";

const VerifyAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendInfo, setResendInfo] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  const form = useForm({
    resolver: zodResolver(VerifyEmailFormSchema),
    defaultValues: {
      email: "",
      OTP: "",
    },
  });

  const { handleSubmit } = form;

  const clearMessages = () => {
    setSuccess(null);
    setError(null);
    setResendSuccess(null);
    setResendError(null);
    setResendInfo(null);
  };

  const onSubmit = async (data: z.infer<typeof VerifyEmailFormSchema>) => {
    setLoading(true);
    clearMessages();
    try {
      const res = await VerifyEmailToken(data);
      if (res.success) {
        setSuccess(res.success);
        form.reset();
      } else if (res.error) {
        setError(res.error);
      }
    } catch (error) {
      console.error("Error verifying account:", error);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email: string) => {
    setResending(true);
    clearMessages();
    try {
      const res = await resendVerificationEmail({ email });
      if (res.success) {
        setResendSuccess(res.success);
        form.reset();
      } else if (res.error) {
        setResendError(res.error);
      } else if (res.message) {
        setResendInfo(res.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setResending(false);
    }
  };

  return (
    <Card className="w-80 sm:w-full md:w-[800px] md:px-8 md:py-4 lg:px-16 lg:py-8 xl:px-20 xl:py-10">
      <CardHeader className="space-y-4">
        <CardTitle className="md:text-4xl">Verify Account</CardTitle>
        <CardDescription>
          Enter your email and the OTP sent to you to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success && <CustomMessage type="success" message={success} />}
        {error && <CustomMessage type="error" message={error} />}
        <Form {...form}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="OTP"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      disabled={loading}
                      className="px-0"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Verify"}
            </Button>
          </form>
        </Form>
        <Dialog>
          <DialogTrigger asChild className="w-full sm:w-auto">
            <Button variant="link" className="px-0 mt-4 text-xs sm:text-sm">
              <span className="flex flex-row items-start gap-x-1.5">
                OTP expired? Click here to resend the email
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Resend OTP</DialogTitle>
              {resendSuccess && (
                <CustomMessage type="success" message={resendSuccess} />
              )}
              {resendError && (
                <CustomMessage type="error" message={resendError} />
              )}
              {resendInfo && <CustomMessage type="info" message={resendInfo} />}
              <DialogDescription>
                Enter your email to resend the OTP
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="resend-email">Email</Label>
              <Input id="resend-email" type="email" required />
              <Button
                onClick={() =>
                  resendOTP(
                    (
                      document.getElementById(
                        "resend-email",
                      ) as HTMLInputElement
                    ).value,
                  )
                }
                disabled={resending}
              >
                {resending ? <LoadingSpinner /> : "Resend OTP"}
              </Button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default VerifyAccountForm;
