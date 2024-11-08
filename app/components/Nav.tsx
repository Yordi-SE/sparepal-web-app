"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { cn } from "@/lib/utils";

import Link from "next/link";

import React, { useEffect } from "react";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export const navItems = [
  { name: "Home", link: "#home" },

  { name: "Products", link: "#products" },
  { name: "About Us", link: "#about" },

  { name: "Contact Us", link: "#contact" },
  { name: "Supply", link: "/suppliers_form" },

  { name: "Buy", link: "#buy" },
];

function Nav() {
  return (
    <>
      {/* <div className="fixed sm:hidden flex  top-0 items-center pr-10 left-0 right-0 h-[50px] bg-slate-500  gap-1 justify-between overflow-hidden">

      </div> */}
      <FloatingNav navItems={navItems} />
    </>
  );
}

export const FloatingNav = ({
  navItems,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { data: session, status } = useSession();
  console.log(session, status);
  const isSupplier = session?.user?.user?.is_supplier;
  const filteredNavItems = navItems.filter((item) => {
    if (status === "authenticated") {
      if (item.name === "Buy") {
        // Show "Buy" only if the user is authenticated and NOT a supplier
        return !isSupplier;
      }

      // Show "Supply" only if the user is a supplier, else hide it
      if (item.name === "Supply") {
        return isSupplier;
      }

      // Show all other items if the user is authenticated
      return true;
    }

    // If user is not authenticated, show all except "Buy" and "Supply"
    return item.name !== "Buy" && item.name !== "Supply";
  });
  const [toggle, setToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Vertical scroll position
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
      if (
        scrollYProgress.get() < 0.05 ||
        !(document.body.scrollHeight > windowHeight)
      ) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });
  const style =
    (scrollYProgress.get() < 0.05 ? " dark:text-white " : "") +
    " sm:max-w-fit md:min-w-[90vw]  flex items-center justify-around mx-auto fixed z-[5000] sm:top-10  inset-x-0 h-[50px] sm:h-fit sm:rounded-xl  border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]   sm:overflow-hidden ";
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={style}
        style={{
          backdropFilter:
            scrollPosition < 0.05 ? "" : "blur(16px) saturate(180%)",
          backgroundColor:
            scrollPosition < 0.05 && windowWidth >= 640
              ? " rgba(0, 0, 0, 0) "
              : " rgba(17, 25, 40, 0.75) ",
          border: "1px solid rgba(255, 255, 255, 0.125)",
          transition: "background-color 0.5s ease-in-out",
        }}
      >
        {windowWidth < 640 && (
          <>
            <img src="/company-logo.png" alt="" className="w-[100px]" />
            <button className="flex flex-col gap-1" onClick={handleToggle}>
              <div className="border-2 border-white w-[30px]"></div>
              <div className="border-2 border-white w-[30px]"></div>
              <div className="border-2 border-white w-[30px]"></div>
            </button>
          </>
        )}
        {(toggle || windowWidth >= 640) && (
          <div className="flex flex-col sm:flex-row items-center justify-evenly  w-full h-fit space-x-4 absolute sm:static z-[6000]  bg-[#111927bf]   top-[49px] sm:bg-transparent   sm:px-10 sm:py-5">
            {windowWidth >= 640 && (
              <Link href={"/"}>
                <img
                  src="/company-logo.png"
                  alt=""
                  className="w-[100px] h-[20px] bg-white"
                />
              </Link>
            )}

            {filteredNavItems.map(
              (
                navItem: {
                  name: string;
                  link: string;
                  icon?: JSX.Element;
                },
                idx: number
              ) => (
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className={cn(
                    "relative dark:text-neutral-50 items-center  flex space-x-1 text-white dark:hover:text-neutral-300 hover:text-neutral-500"
                  )}
                >
                  {/* add !cursor-pointer */}
                  {/* remove hidden sm:block for the mobile responsive */}
                  <span className=" text-sm !cursor-pointer">
                    {navItem.name}
                  </span>
                </Link>
              )
            )}
            {status == "authenticated" && (
              <Link
                href="/auth/logout"
                className={cn(
                  "relative dark:text-neutral-50 items-center  flex space-x-1 text-white dark:hover:text-neutral-300 hover:text-neutral-500"
                )}
              >
                Logout
              </Link>
            )}
            {status == "unauthenticated" && (
              <>
                <button
                  className={cn(
                    "relative  items-center  flex space-x-1 text-white bg-black p-1 text-md hover:bg-white hover:text-neutral-500 rounded-lg"
                  )}
                  onClick={() => signIn()}
                >
                  Signin
                </button>
                <Link
                  href="/auth/signup"
                  className={cn(
                    "relative  items-center  flex space-x-1 text-white bg-black p-1 text-md hover:bg-white hover:text-neutral-500 rounded-lg"
                  )}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
        {/* remove this login btn */}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Nav;
