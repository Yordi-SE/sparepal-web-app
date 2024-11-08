// app/signin/page.js
"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verifyBtnVisibilty, setVerifyBtnVisibilitY] = useState(false);
  const [message, setMessage] = useState("");
  const handleResendEmail = async () => {
    setIsResending(true);
    setMessage("");

    // Simulate an API call to resend the verification email

    try {
      const email = localStorage.getItem("email");
      console.log(email);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/registration/resend-email/`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Verification email has been resent successfully.");
      router.push("/auth/email_verification_service");
    } catch (error) {
      setMessage("Failed to resend email. Please try again later.");
    } finally {
      setIsResending(false);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    console.log(email, password);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (result?.ok) {
      // Redirect or handle successful login
      window.location.href = "/"; // Example redirection
    } else {
      console.log("Error", result?.status);
      if (result?.error == "Email address is not verified.") {
        setVerifyBtnVisibilitY(true);
      }
      setError(result?.error as string);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {verifyBtnVisibilty && (
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className={`mt-6 w-full px-4 py-2 text-white font-semibold rounded ${
              isResending ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {isResending ? "Sending Email..." : "Verify Email"}
          </button>
        )}
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="flex w-full gap-2">
          <p className="text-gray-600 text-lg">Don’t have an account?</p>
          <Link
            href={"/auth/signup"}
            className="text-accent-3 font-bold text-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
