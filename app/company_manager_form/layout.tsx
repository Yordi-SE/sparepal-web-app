import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head";
import StoreProvider from "../StoreProvider";
import NavTwo from "../components/NavTwo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full bg-slate-400 pt-11">
      <NavTwo />
      {children}
    </div>
  );
}
