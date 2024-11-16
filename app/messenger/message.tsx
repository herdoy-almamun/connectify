"use client";
import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

interface Props {
  message: Message;
}

const MessageDetails = ({ message }: Props) => {
  const { data: session } = useSession();
  if (!session || !session.user) return null;
  return (
    <Box
      key={message.id}
      className={cn(
        "max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/5",
        session.user.id === message.sender ? "bg-primary/50 self-end" : ""
      )}
      p="2"
    >
      <p>{message.text}</p>
    </Box>
  );
};

export default MessageDetails;
