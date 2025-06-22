import { Suspense } from "react";
import { Header } from "@/app/sections/header";
import { SubscriptionForm } from "@/app/sections/subscriptionform";
import { Footer } from "@/app/sections/footer";

function FormLoading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <p className="text-lg text-gray-500">Loading your form...</p>
    </div>
  );
}

export default function SubscriptionFormPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<FormLoading />}>
        <SubscriptionForm />
      </Suspense>
      <Footer />
    </main>
  );
}
