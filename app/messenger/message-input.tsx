"use client";
import { Button } from "@/components/ui/button";
import useMessage from "@/hooks/useMessage";
import { useChatStore } from "@/store";
import { Flex } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { PiPaperclip } from "react-icons/pi";
import { AuthContext } from "../auth-provdier";

const MessageInput = () => {
  const chatId = useChatStore((s) => s.selectedChat);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const user = useContext(AuthContext);
  const { mutate } = useMessage();
  return (
    <Flex
      align="center"
      justify="between"
      gap="4"
      px="4"
      py="2"
      className="border-t"
    >
      <Flex align="center" gap="5">
        <BsEmojiSmile className="text-xl cursor-pointer" />
        <PiPaperclip className="text-xl cursor-pointer" />
      </Flex>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 h-full focus:outline-none bg-transparent border rounded px-4"
        type="text"
        placeholder="Type your message..."
      />
      <Button
        onClick={() => {
          mutate({ chatId, sender: user?.id!, text, image });
          setText("");
          setImage("");
        }}
      >
        {" "}
        <AiOutlineSend className="text-2xl" />{" "}
      </Button>
    </Flex>
  );
};

export default MessageInput;
