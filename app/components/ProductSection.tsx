"use client";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { div } from "framer-motion/client";

function ProductSection({
  products,
}: {
  products: {
    id: number;
    title: string;
    description: string;
    image: string;
    aos: string;
  }[];
}) {
  return (
    <div className=" text-center  bg-[#110428] md:pt-32 relative pt-20">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-3/4 h-fit bg-[red]  m-auto inset-x-0 flex items-center justify-center p-5 rounded-3xl shadow-black shadow-2xl border-2 border-black -skew-x-12">
        <h1 className="lg:text-5xl md:text-2xl w-1/2 text-xs xs:text-lg  text-white font-extrabold text-center skew-x-0 ">
          Reliable Spare Part Suppliers In Ethiopia
        </h1>
      </div>
      <h1 className=" heading  text-white font-extrabold">
        Our <span className="text-purple-500">Services</span>
      </h1>
      <div className="grid gap-3 md:grid-cols-2 lg:gap-10 sm:gap-5 lg:p-10 p-5 m-auto lg:max-w-[85%]  md:w-full xl:grid-cols-3 xl:max-w-full overflow-x-hidden">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="lg:pl-5 md:pl-2 lg:pr-5 md:pr-2 lg:pt-10  md=:pb-10 sm:pb-5 relative h-[130px] xs:h-[170px] sm:h-fit">
        <img
          src="/Rectangle-90.png"
          alt=""
          className="w-full h-full object-fill"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-[#FF0000] text-sm  sm:text-xl md:text-2xl font-extrabold ">
            BEST SPARE PART SERVICE
          </h1>

          <p className="text-white font-bold text-xs xs:text-sm">
            Experience The Best Car Services In Automize
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductSection;
