"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
type FormData = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
  is_supplier: boolean;
};

function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  const form = useForm<FormData>();
  const { register, handleSubmit, formState, reset, setError, watch } = form;

  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/registration/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      let email_msg;
      if (axios.isAxiosError(e)) {
        email_msg = e.response?.data?.email;
      }
      setError("root", {
        type: "400",
        message: email_msg || "Something went wrong, Please try again!",
      });
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      router.push("/auth/email_verification_service");
    }
  }, [isSubmitSuccessful, reset]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleComfirmPasswordVisibility = () => {
    setShowComfirmPassword((prev) => !prev);
  };

  return (
    <div className="flex   min-h-screen bg-black ">
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
                  errors.first_name ? " border-red-500 " : " border-gray-300 "
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
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
                  errors.last_name ? " border-red-500 " : " border-gray-300 "
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
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
                  errors.email ? " border-red-500 " : " border-gray-300 "
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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
                    errors.password1 ? " border-red-500 " : " border-gray-300 "
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 5C7.5 5 3.8 8.4 2 12c1.8 3.6 5.5 7 10 7s8.2-3.4 10-7c-1.8-3.6-5.5-7-10-7zm0 11a4 4 0 110-8 4 4 0 010 8zm0-6.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 5c4.5 0 8.2 3.4 10 7a13.5 13.5 0 01-3.4 4.5l-1.5-1.5A10.6 10.6 0 0020 12c-1.8-3.6-5.5-7-10-7a9.4 9.4 0 00-2 .3L7.4 5.7A13.4 13.4 0 0112 5zm-4.8 1.5l-1.6-1.6-1.4 1.4 1.4 1.4c-1.1 1-2 2.3-2.7 3.6 1.8 3.6 5.5 7 10 7 1.6 0 3.1-.4 4.5-1l1.2 1.2 1.4-1.4-14-14zm7.5 10.3c-.6.2-1.2.2-1.7.2a7.3 7.3 0 01-6.4-4 10.5 10.5 0 012.5-3L14 14a5.7 5.7 0 01-2.3 1.3z" />
                    </svg>
                  )}
                </button>
              </div>
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
              <div className="relative">
                <input
                  type={showComfirmPassword ? "text" : "password"}
                  {...register("password2", {
                    required: "Please confirm your password",
                    validate: (value: string) => {
                      if (watch("password1") !== value) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.password2 ? " border-red-500 " : " border-gray-300 "
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                />
                <button
                  type="button"
                  onClick={toggleComfirmPasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showComfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 5C7.5 5 3.8 8.4 2 12c1.8 3.6 5.5 7 10 7s8.2-3.4 10-7c-1.8-3.6-5.5-7-10-7zm0 11a4 4 0 110-8 4 4 0 010 8zm0-6.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 5c4.5 0 8.2 3.4 10 7a13.5 13.5 0 01-3.4 4.5l-1.5-1.5A10.6 10.6 0 0020 12c-1.8-3.6-5.5-7-10-7a9.4 9.4 0 00-2 .3L7.4 5.7A13.4 13.4 0 0112 5zm-4.8 1.5l-1.6-1.6-1.4 1.4 1.4 1.4c-1.1 1-2 2.3-2.7 3.6 1.8 3.6 5.5 7 10 7 1.6 0 3.1-.4 4.5-1l1.2 1.2 1.4-1.4-14-14zm7.5 10.3c-.6.2-1.2.2-1.7.2a7.3 7.3 0 01-6.4-4 10.5 10.5 0 012.5-3L14 14a5.7 5.7 0 01-2.3 1.3z" />
                    </svg>
                  )}
                </button>
              </div>
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
        {errors.root?.message && (
          <p className="mt-2 text-sm text-red-600">{errors.root?.message}</p>
        )}
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
          By clicking {"'Continue'"}, you acknowledge that you have read and
          accepted our
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
