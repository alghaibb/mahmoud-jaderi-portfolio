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
import LoadingSpinner from "@/app/loading";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { VerifyEmailToken } from "@/actions/auth/verify-email";
import { VerifyEmailFormSchema } from "@/schemas";
import { resendVerificationEmail } from "@/actions/auth/resend-verification-email";
import Link from "next/link";

const VerifyAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resending, setResending] = useState(false);

  const form = useForm({
    resolver: zodResolver(VerifyEmailFormSchema),
    defaultValues: {
      email: "",
      OTP: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof VerifyEmailFormSchema>) => {
    setLoading(true);
    try {
      const res = await VerifyEmailToken(data);
      if (res.success) {
        setSuccessMessage(res.success);
        console.log("Account verified:", data);
      } else {
        alert(res.error);
      }
    } catch (error) {
      console.error("Error verifying account:", error);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email: string) => {
    setResending(true);
    try {
      const res = await resendVerificationEmail({ email });
      if (res.success) {
        alert(res.success);
      } else {
        alert(res.error);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setResending(false);
    }
  };

  return (
    <Card className="md:w-[800px] md:px-0 md:py-0">
      <CardHeader className="space-y-4">
        <CardTitle className="md:text-4xl">Verify Account</CardTitle>
        <CardDescription>
          Enter your email and the OTP sent to you to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="OTP"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} disabled={loading}>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Verify"}
            </Button>
            {successMessage && (
              <div className="mt-4 text-sm">
                <p className="bg-emerald-200 px-2 py-2 text-lg">
                  {successMessage}
                </p>
                <Link href="/login">
                  <Button variant="link" className="px-0">
                    Login here
                  </Button>
                </Link>
              </div>
            )}
          </form>
        </Form>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="mt-4 px-0 text-sm">
              <span className="flex flex-row items-center gap-x-1.5">
                OTP expired? Click here to resend the email
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Resend OTP</DialogTitle>
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
