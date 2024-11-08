"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import VerificationSentPage from "./otp";
type FormData = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
  is_supplier: boolean;
};

function Signup() {
  const [otpfill, setOtpFill] = useState(false);
  const form = useForm<FormData>();
  const { register, handleSubmit, formState, reset, setError, watch } = form;

  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const onSubmit = async (data: FormData) => {
    localStorage.setItem("email", watch("email"));

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/registration/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response data", response.data);
    } catch (e) {
      console.log(data);

      console.log(e);
      setError("root", {
        type: "400",
        message: "Something went wrong, Please try again!",
      });
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setOtpFill(true);
    }
  }, [isSubmitSuccessful, reset]);
  if (otpfill) {
    return <VerificationSentPage />;
  }
  return (
    <div className="flex   min-h-screen bg-black">
      <div className="w-full max-w-lg min-h-full bg-[url('/logo-background.jpg')] bg-cover bg-center bg-no-repeat relative hidden md:block">
        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.5)]"></div>
        <div className="absolute w-full flex flex-col items-center z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src="/company-logo.png" alt="" />
          <h1 className="text-white text-2xl font-bold text-center">
            Revolutionazing Ethiopian Automotive Market
          </h1>
        </div>
      </div>
      <div className="w-full p-8   bg-white  space-y-6 ">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up Today!
        </h2>
        <div className="flex w-full  items-center gap-2">
          <div className="flex-grow  bg-gray-800 border h-0"></div>
          <span className="text-gray-400">Or Sign Up with Email</span>
          <div className="flex-grow bg-gray-800 border h-0"></div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col w-full items-center"
        >
          {/* Name Field */}
          <div className="grid sm:grid-cols-2 grid-cols- grid-cols-1 gap-3 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                {...register("first_name", { required: "Name is required" })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.first_name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.first_name?.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register("last_name", { required: "Name is required" })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.last_name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.last_name?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password1", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },

                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter",
                    hasNumber: (value) =>
                      /[0-9]/.test(value) ||
                      "Password must contain at least one number",
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Password must contain at least one special character",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.password1 ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.password1 && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password1?.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("password2", {
                  required: "Please confirm your password",
                  validate: (value: string) => {
                    if (watch("password1") !== value) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.password2 ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.password2 && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password2?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row-reverse gap-2 w-full justify-end  items-center">
            <label className="block text-sm sm:text-lg font-bold  text-gray-700 ">
              Are you a supplier?
            </label>
            <input
              type="checkbox"
              {...register("is_supplier")}
              className={`mt-1 block h-[20px] w-[20px] px-4 py-2 border ${
                errors.password2 ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.is_supplier && (
              <p className="mt-2 text-sm text-red-600">
                {errors.is_supplier?.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-md m-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
        <div className="flex w-full gap-2">
          <p>Already have an account?</p>
          <Link
            href={"/auth/login"}
            className="text-accent-3 font-bold text-blue-700"
          >
            Login
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          By clicking 'Continue', you acknowledge that you have read and
          accepted our{" "}
          <Link href="#" className="text-accent-3 text-blue-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-accent-3 text-blue-700">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Signup;
