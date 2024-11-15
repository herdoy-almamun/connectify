"use client";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";

import { useChatStore } from "@/store";
import { Chat, User } from "@prisma/client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { AuthContext } from "../auth-provdier";
import ChatDetails from "./chat";

const ChatArea = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const user = useContext(AuthContext);
  const setSelectedChat = useChatStore((s) => s.setSelectedChat);
  const selectedChat = useChatStore((s) => s.selectedChat);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (name) {
      axios
        .post("/api/friends", { name, current: user?.id })
        .then((res) => setUsers(res.data));
    } else {
      setUsers([]);
    }
  }, [name]);

  useEffect(() => {
    axios
      .get(`/api/chats/${user?.id}`)
      .then((res) => setChats(res.data))
      .catch((err) => console.log(err));
  }, [user, selectedChat]);

  return (
    <Box className="bg-secondary border-r">
      <Flex
        direction="column"
        justify="between"
        className="h-[135px] pb-[15px]"
      >
        <Flex
          px="2"
          align="center"
          justify="between"
          className="shadow !h-[55px]"
        >
          <Link href="/">
            <Image width={35} height={35} src="/logo.png" alt="logo" />
          </Link>
          <IoMdMenu className="text-2xl cursor-pointer" />
        </Flex>
        <Flex
          mx="2"
          gap="2"
          align="center"
          p="2"
          className="border rounded shadow"
        >
          <IoSearch />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent focus:outline-none"
          />
        </Flex>
      </Flex>
      <Box px="2" className="space-y-4 h-[calc(100dvh-135px)] overflow-auto">
        {users.map((friend) => (
          <Flex
            onClick={() =>
              axios
                .post("/api/chats", {
                  createrId: user?.id,
                  friendId: friend.id,
                })
                .then(({ data }) => {
                  setSelectedChat(data.id);
                  setName("");
                })
                .catch((err) => console.log(err))
            }
            key={friend.id}
            align="center"
            justify="between"
            p="2"
            className="rounded cursor-pointer hover:bg-gray-200"
          >
            <Flex gap="2" align="center">
              <Avatar radius="full" src={friend.image!} fallback="U" />
              <Flex direction="column">
                <Text className="text-sm font-semibold"> {friend.name} </Text>
                <span className="text-sm"> Say Hello ✋ </span>
              </Flex>
            </Flex>
          </Flex>
        ))}

        {!name && (
          <Box>
            {chats.map((chat) => (
              <ChatDetails key={chat.id} chat={chat} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatArea;
