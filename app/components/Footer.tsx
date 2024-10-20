import { div } from "framer-motion/client";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-fit flex flex-col gap-5 sm:gap-0 sm:flex-row text-white w-full justify-evenly pt-14 items-center sm:items-start">
        <div className="h-full flex flex-col items-center  sm:items-start justify-start sm:gap-3 gap-1">
          <h1 className="text-3xl">Contact Us</h1>
          <div>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-2">
                <img src="/location.svg" alt="" className="w-[17px]" />

                <div className="flex flex-col  justify-start gap-1">
                  <h1 className="font-bold">ADDRESS</h1>
                  <p className="text-sm max-w-48">
                    You can also add content inside the parallelogram, but note
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img src="/phone-icon.svg" alt="" className="w-[17px]" />

                <div className="flex flex-col  justify-start gap-1">
                  <h1 className="font-bold">PHONE</h1>
                  <p className="text-sm max-w-48 font-extralight">
                    You can also add content
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img src="/email-icon.svg" alt="" className="w-[17px]" />

                <div className="flex flex-col  justify-start gap-1">
                  <h1 className="font-bold">EMAIL</h1>
                  <p className="text-sm max-w-48">You can also add content</p>
                </div>
              </div>
            </div>
          </div>{" "}
          <img
            src="/company-logo.png"
            alt=""
            className="lg:w-[300px]  sm:w-[200px] max-w-[300px]"
          />
        </div>
        <div className="h-full flex flex-col items-start sm:items-start justify-start sm:gap-3 gap-1">
          <h1 className="text-3xl">Company</h1>
          <div className="flex flex-col gap-1 text-sm text-gray-300">
            <Link href="" className="hover:text-gray-800 ">
              HOME
            </Link>
            <Link href="" className="hover:text-gray-800">
              BRANDS
            </Link>
            <Link href="" className="hover:text-gray-800">
              PRODUCTS
            </Link>
            <Link href="" className="hover:text-gray-800">
              ABOUT US
            </Link>
            <Link href="" className="hover:text-gray-800">
              CONTACT US
            </Link>
            <Link href="" className="hover:text-gray-800">
              SUPPLY
            </Link>
            <Link href="" className="hover:text-gray-800">
              BUY
            </Link>
            <Link href="" className="hover:text-gray-800">
              TERMS AND CONDITIONS
            </Link>
            <Link href="" className="hover:text-gray-800">
              PRIVACY POLICY
            </Link>
          </div>
        </div>
        <div className="h-full flex flex-col items-start  justify-start sm:gap-3 gap-1">
          <h1 className="text-3xl">Get in Touch</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-extralight">
              Get the latest update and offers
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-[200px] md:w-[250px]  border-none focus:border-blue-800 focus:border-2 bg-[#ffffff11] rounded-lg p-2"
            />
            <button className=" w-[200px] md:w-[250px] bg-[#9b6f28] hover:bg-black hover:border hover:border-white text-white p-2 rounded-lg">
              Subscribe
            </button>
          </div>
          <div className=" flex w-full justify-evenly">
            <img
              src="/facebook-icon.svg"
              alt=""
              className="w-[28px] bg-[#c92828] rounded-full hover:bg-white"
            />
            <img
              src="/insta-icon.svg"
              alt=""
              className="w-[28px]  bg-[#c92828] rounded-full hover:bg-white"
            />
            <img
              src="/in-icon.svg"
              alt=""
              className="w-[28px] bg-[#c92828] rounded-full p-1 hover:bg-white"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-t-white w-[75%] text-white mb-5 text-center mt-5">
        <p className="p-1">
          Copy Right &copy; 2024 SPAREPAL All Right Reserved{" "}
        </p>
      </div>
    </div>
  );
}

export default Footer;
