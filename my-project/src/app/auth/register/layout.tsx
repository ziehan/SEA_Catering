import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Sea Catering",
  description: "SEA Catering Website",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
