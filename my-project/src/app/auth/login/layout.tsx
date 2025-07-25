import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Sea Catering",
  description: "SEA Catering Website",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
