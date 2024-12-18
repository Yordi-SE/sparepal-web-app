import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { JWT } from "next-auth/jwt";
import { AuthOptions, Session } from "next-auth";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        let response;
        try {
          response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`,
            credentials
          );

          if (response.status === 200) {
            return response.data;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              if (
                error.response.data.non_field_errors ==
                "Email address is not verified."
              ) {
                throw new Error("Email address is not verified.");
              } else if (error.response.status === 400) {
                throw new Error("Bad Request: Missing or invalid data.");
              } else if (error.response.status === 401) {
                throw new Error("Unauthorized: Incorrect email or password.");
              } else if (error.response.status === 403) {
                throw new Error("Forbidden: Your account is inactive.");
              } else if (error.response.status === 500) {
                throw new Error("Server Error: Please try again later.");
              } else {
                throw new Error("An unexpected error occurred.");
              }
            } else if (error.request) {
              throw new Error("Network error: Unable to reach the server.");
            }
          } else {
            throw new Error("Unexpected error: " + String(error));
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.userData = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const getExpiration = (token: string) => {
        try {
          const decoded = jwtDecode(token);
          if (!decoded.exp) {
            return null;
          }
          return decoded.exp * 1000;
        } catch {
          return null;
        }
      };

      const refreshExpiration = getExpiration(token.userData.refresh);

      if (refreshExpiration) {
        session.expires = new Date(refreshExpiration).toISOString();
      }
      session.user = token.userData;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/signup",
  },
};
