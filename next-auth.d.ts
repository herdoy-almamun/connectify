// next-auth.d.ts (or declare in any other appropriate location)

import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` field to the session user
      email: string;
      name: string;
      image?: string;
    };
  }
}
