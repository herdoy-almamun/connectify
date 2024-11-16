"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useComment from "@/hooks/useComment";
import useComments from "@/hooks/useComments";
import { Post } from "@prisma/client";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import CommentDetails from "./comment";

interface Props {
  postAuthorImage: string;
  postAuthorName: string;
  post: Post;
}

const Comments = ({ postAuthorImage, postAuthorName, post }: Props) => {
  const [comment, setComment] = useState("");
  function formatDate(input: string | Date): string {
    const date = typeof input === "string" ? new Date(input) : input;
    return date.toDateString();
  }

  const { mutate } = useComment();
  const { data: comments } = useComments(post.id);

  const { data: session } = useSession();
  if (!session || !session.user) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
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
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Box className="max-h-[300px] overflow-auto space-y-3">
          <Flex align="center" justify="between" p="4">
            <Flex align="center" className="!gap-1">
              {postAuthorImage && (
                <Image
                  src={postAuthorImage}
                  width={40}
                  height={40}
                  className="!w-8 !h-8 !rounded-full object-cover"
                  alt="U"
                />
              )}

              <Box>
                <Text className="font-semibold text-sm">{postAuthorName}</Text>
                <Flex align="center" gap="1">
                  <BsGlobe />
                  <span className="text-sm">
                    {" "}
                    {formatDate(post.createdAt)}{" "}
                  </span>
                </Flex>
              </Box>
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
                width={600}
                height={400}
                alt="Text"
                className="w-full h-full object-cover"
              />
            </Box>
          )}
          {comments && comments.length > 0 && (
            <Box className="space-y-5">
              <Heading
                weight="bold"
                as="h3"
                className="!text-xl !font-semibold"
                size="5"
              >
                Comments
              </Heading>
              {comments.map((comment) => (
                <CommentDetails key={comment.id} comment={comment} />
              ))}
            </Box>
          )}
        </Box>
        <Box className="h-[80px] w-full">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 h-full w-full focus:outline-none rounded-xl"
          />
        </Box>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <Button
            disabled={!comment}
            onClick={() => {
              mutate({ userId: session.user.id, postId: post.id, comment });
              setComment("");
            }}
          >
            Comment
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Comments;
