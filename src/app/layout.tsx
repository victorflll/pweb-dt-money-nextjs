'use client'

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]}
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-100`}>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
      </body>
    </html>
  );
}
