import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import StoreProvider from "./StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SparePal",
  description:
    "SparePal is your trusted partner for sourcing high-quality spare parts in Ethiopia. We provide a comprehensive selection of parts for various industries, including automotive, machinery, and electronics, ensuring reliability and performance. Our mission is to deliver top-notch solutions tailored to meet your operational needs, with a focus on speed, efficiency, and customer satisfaction. At SparePal, we bridge the gap between manufacturers and consumers, offering a seamless experience that simplifies the procurement process and keeps your operations running smoothly.",
  keywords: [
    "Spare parts Ethiopia",
    "Automotive spare parts",
    "Machinery spare parts",
    "Electronics spare parts",
    "Reliable spare parts supplier",
    "High-quality spare parts",
    "Fast spare parts delivery",
    "Spare parts procurement",
    "Spare parts supplier Ethiopia",
    "Industrial spare parts",
    "Spare parts distribution",
    "Genuine spare parts",
    "Affordable spare parts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080303] overflow-x-hidden`}
      >
        <StoreProvider> {children}</StoreProvider>
      </body>
    </html>
  );
}
