"use client";
import useSocket from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren, useEffect } from "react";

const SocketProvider = ({ children }: PropsWithChildren) => {
  const { sendUser } = useSocket();
  const { data } = useSession();
  useEffect(() => {
    if (data && data.user) {
      const { id, name, email, image } = data.user;
      sendUser({ id, name, image, email });
    }
  }, [data?.user]);
  return <> {children} </>;
};

export default SocketProvider;
