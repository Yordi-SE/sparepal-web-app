import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserProfile {
  avatar: string;
  bio: string;
  created_at: string;
  updated_at: string;
}

export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_supplier: boolean;
  profile: UserProfile;
}

interface AuthenticatedUser {
  access: string;
  refresh: string;
  user: UserData;
}

export default interface AuthResponse {
  user: AuthenticatedUser;
  expires: string;
}

declare module "next-auth" {
  interface Session {
    user: AuthenticatedUser;
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userData: AuthenticatedUser;
    expiresAt: string; // or Date, if parsed
  }
}
