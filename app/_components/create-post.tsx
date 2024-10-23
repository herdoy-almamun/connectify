"use client";
import { Avatar, Box, Flex } from "@radix-ui/themes";
import { useContext } from "react";
import { FaVideo } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { TfiVideoClapper } from "react-icons/tfi";
import { AuthContext } from "../auth-provdier";

const CreatePost = () => {
  const user = useContext(AuthContext);
  return (
    <Box p="3" className="space-y-4 border-400 rounded-lg shadow-lg border">
      <Flex gap="2">
        <Avatar
          src={user?.image!}
          radius="full"
          fallback={user?.name?.slice(0, 1).toLocaleUpperCase()!}
        />
        <input
          className="border border-gray-300 flex-1 rounded-full px-3 focus:outline-none"
          placeholder="What's on your mind, Herdoy"
        />
      </Flex>
      <hr />
      <Flex align="center" justify="between" gap={{ initial: "2", md: "3" }}>
        <Flex
          align="center"
          justify="center"
          gap="2"
          py="2"
          className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <FaVideo className="text-xl md:text-2xl text-red-500" />
          <span className="sm:text-sm">Live Video</span>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap="2"
          py="2"
          className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <IoMdPhotos className="text-xl md:text-2xl text-green-500" />
          <span className="sm:text-sm">Photo/Video</span>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap="2"
          py="2"
          className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <TfiVideoClapper className="text-xl md:text-2xl text-red-500" />{" "}
          <span className="sm:text-sm">Reel</span>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CreatePost;
