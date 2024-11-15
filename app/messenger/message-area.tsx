"use client";
import useMessages from "@/hooks/useMessages";
import { useChatStore } from "@/store";
import { Avatar, Flex, Grid, Text } from "@radix-ui/themes";
import Image from "next/image";
import { BsCameraVideo } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { PiPhoneCall } from "react-icons/pi";
import MessageDetails from "./message";
import MessageInput from "./message-input";

const MessageArea = () => {
  const { data: messages } = useMessages();
  const selectedChat = useChatStore((s) => s.selectedChat);

  return (
    <Grid
      display={{ initial: "none", md: "grid" }}
      className="border-r h-dvh"
      columns="1"
      rows="55px 1fr 55px"
    >
      <Flex
        px="4"
        align="center"
        justify="between"
        className="shadow !h-[55px]"
      >
        <Flex gap="2" align="center">
          <Avatar radius="full" src="/gap.jpg" fallback="U" />
          <Text className="text-sm font-semibold">Md Herdoy</Text>
        </Flex>
        <Flex align="center" gap="5">
          <PiPhoneCall className="text-2xl cursor-pointer" />
          <BsCameraVideo className="text-2xl cursor-pointer" />
          <CiMenuKebab className="text-2xl cursor-pointer" />
        </Flex>
      </Flex>
      {!selectedChat && (
        <Flex align="center" justify="center">
          <Flex align="center" justify="center" direction="column" gap="4">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="logo"
              className="opacity-20"
            />
            <Text className="opacity-20 text-4xl">Select a Chat To Start</Text>
          </Flex>
        </Flex>
      )}
      {selectedChat && (
        <Flex
          gap="3"
          direction="column"
          p="4"
          className="bg-gray-100 overflow-auto"
        >
          {messages?.map((message) => (
            <MessageDetails key={message.id} message={message} />
          ))}
        </Flex>
      )}
      <MessageInput />
    </Grid>
  );
};

export default MessageArea;
