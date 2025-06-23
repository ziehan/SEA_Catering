import { Suspense } from "react";
import { Header } from "@/app/sections/header";
import { Footer } from "@/app/sections/footer";
import { ResetPasswordForm } from "@/app/sections/resetpasswordform";

function Loading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <p className="text-lg text-gray-500">Loading...</p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<Loading />}>
        <ResetPasswordForm />
      </Suspense>
      <Footer />
    </main>
  );
}
