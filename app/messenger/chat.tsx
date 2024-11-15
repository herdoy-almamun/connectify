"use client";

import { useChatStore } from "@/store";
import formatDate from "@/utils/formateDate";
import { Chat, User } from "@prisma/client";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-provdier";

interface Props {
  chat: Chat;
}

const ChatDetails = ({ chat }: Props) => {
  const [friendId, setFriendId] = useState("");
  const [friend, setFriend] = useState<User>();
  const setSelectedChat = useChatStore((s) => s.setSelectedChat);

  const user = useContext(AuthContext);

  useEffect(() => {
    const getFriendId = () => {
      const friendId = chat.users.find((userId) => userId !== user?.id);
      setFriendId(friendId!);
    };
    getFriendId();
  }, [chat]);

  useEffect(() => {
    axios
      .get(`/api/user/${friendId}`)
      .then((res) => setFriend(res.data))
      .catch((err) => console.log(err));
  }, [friendId]);

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
