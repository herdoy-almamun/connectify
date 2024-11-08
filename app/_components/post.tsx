"use client";
import { Post, User } from "@prisma/client";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { FaHeart, FaRegComment } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { PiShareFatLight } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";

interface Props {
  post: Post;
}

const SinglePost = ({ post }: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios.get(`/api/user/${post.userId}`).then((res) => setUser(res.data));
  }, [post]);

  function formatDate(input: string | Date): string {
    const date = typeof input === "string" ? new Date(input) : input;
    return date.toDateString();
  }

  if (!post) return null;

  return (
    <Box className="border rounded-lg shadow-md">
      <Flex align="center" justify="between" p="4">
        <Flex align="center" gap="2">
          <Avatar src={user?.image!} radius="full" fallback="U" />
          <Box>
            <Text size="2" className="font-semibold">
              {user?.name}
            </Text>
            <Flex align="center" gap="1">
              <BsGlobe />
              <span className="text-sm"> {formatDate(post.createdAt)} </span>
            </Flex>
          </Box>
        </Flex>
        <Flex align="center" gap="4">
          <SlOptions className="text-2xl" />
          <IoClose className="text-2xl" />
        </Flex>
      </Flex>
      {post.text && (
        <Box px="4" pb="4">
          <p>{post.text}</p>
        </Box>
      )}
      {post.image && (
        <Box>
          <Image
            src={post.image}
            width={500}
            height={600}
            alt="Text"
            className="w-full h-full object-cover"
          />
        </Box>
      )}
      <Flex align="center" justify="between" py="3" px="4">
        <Flex align="center" gap="1">
          <FaHeart className="text-primary" />
          <span className="text-sm">104</span>
        </Flex>
        <Flex align="center" gap="6">
          <Flex align="center" gap="1">
            <FaComment className="text-gray-600" />
            <span className="text-sm">8</span>
          </Flex>
          <Flex align="center" gap="1">
            <IoIosShareAlt className="text-gray-600 text-2xl" />
            <span className="text-sm">2</span>
          </Flex>
        </Flex>
      </Flex>
      <hr />
      <Flex align="center" justify="between" px="2" py="1">
        <Flex
          align="center"
          justify="center"
          gap="2"
          p="3"
          className="flex-1 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <LuHeart className="text-xl" /> <span className="text-sm">Like</span>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap="2"
          p="3"
          className="flex-1 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <FaRegComment className="text-xl" />
          <span className="text-sm">Comment</span>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap="2"
          p="3"
          className="flex-1 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <PiShareFatLight className="text-xl" />
          <span className="text-sm">Share</span>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SinglePost;
