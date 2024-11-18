"use client";
import { useUser } from "@/hooks/useUser";
import { Comment } from "@prisma/client";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";

interface Props {
  comment: Comment;
}

const CommentDetails = ({ comment }: Props) => {
  const { data: user } = useUser(comment.userId);

  if (!user) return null;

  return (
    <Box className="border shadow-lg p-4 rounded-2xl">
      <Flex align="start" className="!gap-3">
        <Avatar
          src={user.image || ""}
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
