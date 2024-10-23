"use client";
import useUser from "@/hooks/useUser";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { createContext, PropsWithChildren } from "react";

export const AuthContext = createContext<User | null>(null);

const AuthProvdier = ({ children }: PropsWithChildren) => {
  const { data: sessionDeata } = useSession();

  const { data } = useUser(sessionDeata?.user?.email!);

  if (!data) return <div> {children} </div>;

  return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>;
};

export default AuthProvdier;
