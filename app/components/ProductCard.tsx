"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductCard({
  product,
}: {
  product: {
    id: number;
    title: string;
    description: string;
    image: string;
    aos: string;
  };
}) {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration in milliseconds
    });
  }, []);
  return (
    <div
      className="w-[250px] h-[200px] lg:w-[400px] md:w-[300px] sm:w-[400px] gap-1  sm:h-[200px] lg:p-2 md:p-1 sm:gap-2 border shadow-slate-950 shadow-lg flex bg-transparent text-white rounded-2xl m-auto "
      data-aos={product.aos}
    >
      <div className="sm:min-w-[50%] min-w-[50%]  h-full  rounded-xl">
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-fill rounded-xl "
        />
      </div>
      <div className="w-full h-1/4">
        <h1 className="lg:text-2xl sm:text-xl text-lg font-bold text-center">
          {product.title}
        </h1>
        <p className="text-center font-extralight text-sm lg:text-lg">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
