import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import LoadingSpinner from "@/components/Loading";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
