"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  const [windowheight, setWindowHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleSize = () => setWindowHeight(window.innerHeight);

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  let height;
  if (windowheight < 600) {
    height = "h-[600px]";
  } else if (windowheight > 800) {
    height = "h-[800px]";
  } else {
    height = "h-screen";
  }

  return (
    <div className="relative  w-screen h-fit overflow-hidden">
      <div
        className="relative flex transition ease-in-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {data.map((slide, index) => (
          <div className="relative flex-shrink-0" key={index}>
            <div
              className={`${height} w-screen  bg-[#221414] relative md:mb-20`}
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={slide.img}
                alt=""
                className="min-w-full h-full  object-cover"
              />
            </div>
            <div className="absolute top-0 -bottom-2 left-0 right-0 bg-gradient-to-tr  from-[rgba(0,0,0,1)] via-[rgba(0,0,0,0.7)] [rgba(100, 116, 139,0.5)] "></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 inset-0 text-white  text-center w-fit h-fit mx-auto  lg:-my-20 -my-20 sm:-my-0 bg-transparent">
              <div className="md:w-[800px] sm:w-[600px] xs:w-[400px] w-[275px]">
                <img src="/company-logo.png" alt="" />
              </div>
              <header className="text-center sm:w-[500px] lg:w-[700px] m-auto text-wrap">
                <h1 className="xs:text-3xl text-xl sm:text-4xl  md:text-6xl  font-extrabold ">
                  {slide.title}
                </h1>
                <h2 className="xs:text-lg text-sm sm:text-2xl text-bold ">
                   {slide.desc}
                </h2>
              </header>
            </div>
            <div className="absolute  flex flex-col items-center justify-center  m-auto bottom-16 lg:left-40 lg:bottom-28 md:bottom-24 md:left-8  sm:left-16 sm:bottom-16   md:w-[300px] xs:w-[300px] text-center p-1 sm:p-0">
              <p className="text-xs xs:text-sm text-wrap text-white">
                {slide.sub_desc}
              </p>
              <button className="bg-[#fffefe] p-1 rounded-lg text-sm text-black md:text-lg font-extrabold sm:pl-2 sm:pr-2 w-fit h-fit  sm:ml-9 mt-2 m-auto shadow-inner hover:border hover:border-white hover:bg-black hover:text-white">
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
