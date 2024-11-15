"use client";
import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import { useContext } from "react";
import { AuthContext } from "../auth-provdier";

interface Props {
  message: Message;
}

const MessageDetails = ({ message }: Props) => {
  const user = useContext(AuthContext);
  if (!user) return null;
  return (
    <Box
      key={message.id}
      className={cn(
        "max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/5",
        user.id === message.sender ? "bg-primary/50 self-end" : ""
      )}
      p="2"
    >
      <p>{message.text}</p>
    </Box>
  );
};

export default MessageDetails;
