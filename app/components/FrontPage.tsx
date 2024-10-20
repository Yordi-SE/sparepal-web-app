"use client";

import { current } from "@reduxjs/toolkit";
import { div } from "framer-motion/client";
import React, { useEffect, useRef, useState } from "react";

function FrontPage({
  data,
}: {
  data: {
    id: number;
    img: string;
    title: string;
    desc: string;
    sub_desc: string;
  }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < data.length - 1 ? prevIndex + 1 : 0
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative  w-screen h-fit overflow-hidden">
      <div
        className="relative flex transition ease-in-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {data.map((slide, index) => (
          <div className="relative flex-shrink-0">
            <div
              className=" h-screen w-screen  bg-[#221414] relative md:mb-20"
              key={index}
            >
              <img
                src={slide.img}
                alt=""
                className="min-w-full h-full md:object-cover sm:object-cover object-cover"
              />
            </div>
            <div className="absolute top-0 -bottom-2 left-0 right-0 bg-gradient-to-tr  from-[rgba(0,0,0,1)] via-[rgba(0,0,0,0.7)] [rgba(100, 116, 139,0.5)] "></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 inset-0 text-white  text-center w-fit h-fit mx-auto  lg:-my-20  bg-transparent">
              <img src="/company-logo.png" alt="" className="min-w-[300px]" />
              <h1 className="text-4xl lg:text-8xl sm:text-6xl  font-extrabold ">
                {slide.title}
              </h1>
              <h2 className="text-lg sm:text-2xl text-bold sm:w-[500px] lg:w-[700px]">
                 {slide.desc}
              </h2>
            </div>
            <div className="absolute w-full sm:w-fit left-6 bottom-16 lg:left-40 lg:bottom-28 md:bottom-24 md:left-12  sm:left-16 sm:bottom-16">
              <p className="w-[95%] font-bold md:w-[300px] sm:w-[300px] text-sm md:text-sm text-wrap text-white">
                {slide.sub_desc}
              </p>
              <button className="bg-[#FF0000] p-1 rounded-lg text-sm md:text-lg font-bold sm:pl-2 sm:pr-2 w-fit h-fit shadow-md  sm:ml-9 mt-2 m-auto">
                Discover Our Services
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-40 sm:bottom-28  lg:bottom-40 md:bottom-32 sm:left-[60%] md:left-[50%] left-[50%] transform -translate-y-1/2 flex gap-3">
        <button
          onClick={goToPrevSlide}
          className={
            " p-1   bg-amber-600 rounded-lg  text-white" +
            (currentIndex === 1 ? " w-[25px]" : " w-[50px]")
          }
        ></button>
        <button
          onClick={goToNextSlide}
          className={
            " p-1   bg-amber-600 rounded-lg  text-white" +
            (currentIndex === 0 ? " w-[25px]" : " w-[50px]")
          }
        ></button>
      </div>
    </div>
  );
}

export default FrontPage;
