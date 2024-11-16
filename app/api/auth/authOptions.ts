import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const checkPassword = await bcrypt.compare(
          credentials.password,
          user.password!
        );
        if (!checkPassword) return null;

        // Return the user object that contains user info, which will be stored in the JWT
        return user ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt", // Use JWT for session
  },

  callbacks: {
    // The JWT callback is fired when a JWT is created or updated.
    async jwt({ token, user }) {
      // If the user object is available (from login), add their info to the token
      if (user) {
        token.id = user.id;
        token.image = user.image; // Assuming the user object has the `image` field
      }
      return token;
    },

    // This callback is fired when the session is checked, and it's where you customize session data
    async session({ session, token }) {
      // Attach the user id and image to the session object
      if (token) {
        session.user.id = token.id as string; // Cast to string if needed
        session.user.image = token.image as string; // Cast to string if needed
      }
      return session;
    },
  },
};

export default authOptions;
