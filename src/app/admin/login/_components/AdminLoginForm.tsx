"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { adminLogin } from "../actions";

const adminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type AdminLoginData = z.infer<typeof adminLoginSchema>;

export function AdminLoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginData) => {
    setIsLoading(true);
    try {
      await adminLogin(data);
      // No success toast needed - redirect should happen immediately
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error(error instanceof Error ? error.message : "Invalid password");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full shadow-xl border-border">
        <CardHeader className="space-y-1 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="h-8 w-8 text-background" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription>
            Enter your admin password to access the dashboard
          </CardDescription>
          <Badge variant="secondary" className="w-fit mx-auto">
            <Lock className="h-3 w-3 mr-1" />
            Secure Access
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Enter admin password"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                type="submit"
                className="w-full"
                loading={isLoading}
                loadingText="Authenticating..."
              >
                <Eye className="h-4 w-4 mr-2" />
                Access Dashboard
              </LoadingButton>
            </form>
          </Form>

          <div className="text-center text-sm text-muted-foreground">
            <p>This area is restricted to authorized personnel only.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
