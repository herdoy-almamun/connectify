"use client";
import useComments from "@/hooks/useComments";
import useLike from "@/hooks/useLike";
import useLikes from "@/hooks/useLikes";
import { Post, User } from "@prisma/client";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { PiShareFatLight } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import { AuthContext } from "../auth-provdier";
import Comments from "./comments";

interface Props {
  post: Post;
}

const SinglePost = ({ post }: Props) => {
  const [user, setUser] = useState<User>();
  const [isLike, setIsLike] = useState<boolean>(false);

  const authUser = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/api/user/${post.userId}`).then((res) => setUser(res.data));
  }, [post]);

  function formatDate(input: string | Date): string {
    const date = typeof input === "string" ? new Date(input) : input;
    return date.toDateString();
  }

  const { data: likes } = useLikes(post.id);
  const { data: comments } = useComments(post.id);
  const { mutate } = useLike();

  const handleLike = () => {
    mutate({ userId: authUser?.id!, postId: post.id });
    setIsLike(!isLike);
  };

  useEffect(() => {
    const userLiked = likes?.some(
      (like) => like.postId === post.id && like.userId === authUser?.id
    );
    setIsLike(userLiked || false);
  }, [likes, authUser?.id, post.id]);

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
          <span className="text-sm"> {likes?.length} </span>
        </Flex>
        <Flex align="center" gap="6">
          <Flex align="center" gap="1">
            <FaComment className="text-gray-600" />
            <span className="text-sm"> {comments?.length} </span>
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
          onClick={handleLike}
          align="center"
          justify="center"
          gap="2"
          p="3"
          className="flex-1 rounded-md cursor-pointer hover:bg-gray-200"
        >
          {isLike ? (
            <FaHeart className="text-xl text-primary" />
          ) : (
            <LuHeart className="text-xl" />
          )}{" "}
          <span className="text-sm">Like</span>
        </Flex>
        <Comments
          postAuthorImage={user?.image as string}
          postAuthorName={user?.name as string}
          post={post}
        />
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
