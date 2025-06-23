import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Sea Catering",
  description: "SEA Catering Website",
};

export default function ForgotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
