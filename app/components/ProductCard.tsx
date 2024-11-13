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
      className="w-[250px] xs:w-[350px] lg:w-[400px] md:w-[350px] sm:w-[400px] gap-1 h-fit lg:p-2 p-1 sm:gap-2 border shadow-slate-950 shadow-lg  bg-transparent dark:text-gray-800 text-white rounded-2xl m-auto "
      data-aos={product.aos}
    >
      <div className="sm:min-w-[50%] min-w-[50%] h-[150px]  sm:h-[200px]  rounded-xl float-left">
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-fill rounded-xl "
        />
      </div>
      <h1 className="md:text-2xl sm:text-xl text-lg font-bold text-center">
        {product.title}
      </h1>
      <p className="text-center font-extralight text-sm md:text-lg lg:text-lg p-1">
        This combination would result in a card or box element with a soft
        shadow and subtle borders, often used for creating modern, minimalistic
        UI components. This combination would result in a card or box element
        with a soft shadow and subtle borders, often used for creating modern,
        minimalistic UI components.
      </p>
    </div>
  );
}

export default ProductCard;
