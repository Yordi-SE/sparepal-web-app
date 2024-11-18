"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Profile from "./Profile";
import { Product } from "@/lib/data";

import NavTwo from "../components/NavTwo";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const { data: session, status } = useSession();
  const [isArticleVisible, setIsArticleVisible] = useState(false);

  const isSupplier = session?.user?.user.is_supplier;
  const userName = session?.user?.user.first_name || "User";

  return (
    <>
      <NavTwo />

      <div className="flex w-full">
        <article
          className={`prose lg:prose-xl bottom-0 w-full max-w-md bg-white fixed top-[75px] left-0 transform ${
            isArticleVisible ? " translate-x-0 " : " -translate-x-full "
          } transition-transform duration-300 ease-in-out z-50 lg:relative lg:top-0 lg:translate-x-0`}
        >
          <Profile />
          <button
            onClick={() => setIsArticleVisible((prev) => !prev)}
            className={`absolute top-[75px] ${
              isArticleVisible
                ? " right-4 text-white hover:text-gray-300 "
                : " -right-10 text-gray-500 hover:text-gray-800 "
            }  p-2   lg:hidden text-5xl`}
          >
            {isArticleVisible ? "<" : ">"}
          </button>
        </article>

        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center w-full grow  pt-[75px]">
          {status == "authenticated" && (
            <header className="text-center my-10">
              <h1 className="text-5xl font-extrabold text-gray-800">
                Welcome, {userName}!
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {isSupplier
                  ? "Manage your supplies and track your orders."
                  : "Explore our exclusive products tailored for you."}
              </p>
            </header>
          )}
          {status == "loading" && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 w-full mb-3">
              {/* Skeleton for heading */}
              <div className="w-3/4 h-10 bg-gray-300 rounded-md animate-pulse" />

              {/* Skeleton for description */}
              <div className="w-2/3 h-6 bg-gray-300 rounded-md animate-pulse" />

              <div className="mt-4 w-1/2 h-6 bg-gray-300 rounded-md animate-pulse" />
            </div>
          )}

          <main className="flex-1 flex flex-col items-center w-full max-w-4xl">
            {status == "authenticated" &&
              (isSupplier ? <SupplierSection /> : <RegularUserSection />)}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

function SupplierSection() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Supplier Dashboard
      </h2>
      <p className="text-gray-600 mb-6">
        Register Your Business, Reach To The Wide World.
      </p>
      <Link
        href="/suppliers_form"
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Supply Today
      </Link>
    </div>
  );
}

function RegularUserSection() {
  return (
    <div className="space-y-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full text-center ">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Discover Our Products
        </h2>
        <p className="text-gray-600 mb-6">
          Browse the latest products and shop with exclusive member discounts.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/#products"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            View Products
          </Link>
        </div>
      </div>
      <div className="dark overflow-hidden flex flex-wrap gap-3 ">
        {Product.map((prod, index) => {
          return <ProductCard key={index} product={prod} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
