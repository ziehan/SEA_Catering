import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Sea Catering",
  description: "SEA Catering Website",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
