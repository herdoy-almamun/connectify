"use client";

import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/lib/utils";
import { useChatStore } from "@/store";
import { Chat } from "@prisma/client";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  chat: Chat;
}

const ChatDetails = ({ chat }: Props) => {
  const [friendId, setFriendId] = useState("");
  const setSelectedChat = useChatStore((s) => s.setSelectedChat);

  const { data: session } = useSession();

  useEffect(() => {
    const getFriendId = () => {
      const friendId = chat.users.find((userId) => userId !== session?.user.id);
      setFriendId(friendId!);
    };
    getFriendId();
  }, [chat]);

  const { data: friend } = useUser(friendId);

  return (
    <Flex
      onClick={() => setSelectedChat(chat.id)}
      key={chat.id}
      align="center"
      justify="between"
      p="2"
      className="rounded cursor-pointer hover:bg-gray-200"
    >
      <Flex gap="2" align="center">
        <Avatar radius="full" src={friend?.image!} fallback="U" />
        <Flex direction="column">
          <Text className="text-sm font-semibold"> {friend?.name} </Text>
          <span className="text-sm">
            {chat.lastMessage ? chat.lastMessage.slice(0, 20) : "Hey ✋"}
          </span>
        </Flex>
      </Flex>
      <Flex direction="column" justify="between">
        <span className="text-[10px]"> {formatDate(chat.createdAt)} </span>
        <span className="text-sm"></span>
      </Flex>
    </Flex>
  );
};

export default ChatDetails;
