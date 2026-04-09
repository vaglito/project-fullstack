// next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      groups: string[];
    } & DefaultSession["user"];
    accessToken: string;
  }

  interface User extends DefaultUser {
    groups: string[];
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    groups: string[];
    accessToken: string;
    refreshToken: string;
  }
}
