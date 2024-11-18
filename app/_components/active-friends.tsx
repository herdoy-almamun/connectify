"use client";
import useSocket from "@/hooks/useSocket";
import { Avatar, Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const ActiveFriends = () => {
  const { users: socketUsers } = useSocket();
  const { data } = useSession();
  const activeUsers = socketUsers.filter((s) => s.id !== data?.user.id);
  return (
    <Box py="3">
      <Heading size="5" mb="3">
        Active Friends
      </Heading>

      {activeUsers.map((user) => (
        <Flex
          key={user.id}
          align="center"
          justify="start"
          gap="2"
          className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
        >
          <Box className="w-10 flex items-center justify-center relative">
            <Avatar src={user.image} radius="full" fallback="U" />
            <Box className="w-3 h-3 bg-[#2dfe54] absolute bottom-0 right-0 rounded-full"></Box>
          </Box>
          <Text> {user.name} </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default ActiveFriends;
