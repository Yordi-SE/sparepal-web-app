"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function LogoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Send a request to the backend to handle server-side logout
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout/`
      );

      // Client-side logout via NextAuth
      await signOut({ redirect: false });

      // Optionally, redirect to the homepage or a custom page after logout
      router.push("/auth/login");
    } catch (err) {
      console.error("Failed to log out:", err);
      setError("Failed to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 space-y-4 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold">Logging Out</h1>
        <p className="text-gray-600">
          We’re logging you out of your account...
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`px-4 py-2 font-medium text-white bg-red-500 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
        >
          {loading ? "Logging out..." : "Confirm Logout"}
        </button>
      </div>
    </div>
  );
}
