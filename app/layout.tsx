import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Context from "../components/InputPicker"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Currency Converted",
  description: "Convert with static data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Context>{children}</Context>
        </body>
    </html>
  );
}
