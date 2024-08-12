import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import {cn} from "@/lib/utils"
import "./globals.css";
import Header from "@/components/header";
import StoreProvider from "./StoreProvider";

const fontHeading = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Story Frontend Dev Assessment",
  description: "Frontend Engineer Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
    <html lang="en">
    <body
        className={cn(
            "antialiased",
            fontHeading.variable,
            fontBody.variable
        )}
    >
    <div className="container mx-auto px-4 py-8 grid gap-8">
      <Header/>
      {children}
    </div>
    </body>
    </html>
    </StoreProvider>
);
}
