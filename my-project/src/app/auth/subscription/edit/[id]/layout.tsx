import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit | Sea Catering",
  description: "SEA Catering Website",
};

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
