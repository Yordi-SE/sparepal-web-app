"use client";

import axiosInst from "../axios";
import axios from "axios";
import { signIn, useSession, signOut } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    try {
      const res = await axiosInst.post("/api/auth/token/refresh/", {
        refresh: session?.user?.refresh,
      });

      // If the refresh request is successful, update the access token
      if (session) session.user.access = res.data.access;
      else signIn();
    } catch (error) {
      // Handle specific cases of error if needed
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // If the refresh token is invalid/expired, log the user out
          signOut({
            callbackUrl: "/auth/login",
            redirect: false,
          });
          alert("Session expired. Please log in again.");
        } else {
          // Handle other errors like network issues
          alert(
            "An error occurred while refreshing the session. Please try again."
          );
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return refreshToken;
};
