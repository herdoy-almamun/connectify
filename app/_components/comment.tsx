"use client";
import { Comment, User } from "@prisma/client";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  comment: Comment;
}

const CommentDetails = ({ comment }: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get<User>(`/api/user/${comment.userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [comment]);

  return (
    <Box className="border shadow-lg p-4 rounded-2xl">
      <Flex align="start" className="!gap-3">
        <Avatar
          src={user?.image || ""}
          radius="full"
          className="!w-8 !h-8 !rounded-full"
          fallback="U"
        />

        <Text className="text-sm">{comment.comment}</Text>
      </Flex>
    </Box>
  );
};

export default CommentDetails;
