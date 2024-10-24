"use client";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "./auth-provdier";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SidebarLeft = () => {
  const router = useRouter();
  const user = useContext(AuthContext);
  return (
    <Box
      display={{ initial: "none", md: "block" }}
      py="2"
      className="space-y-2 h-[calc(100dvh-60px)] overflow-auto"
    >
      <Flex
        onClick={() => router.push("/profile")}
        align="center"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Box className="w-10 flex items-center justify-center">
          <Avatar
            src={user?.image!}
            radius="full"
            fallback={user?.name?.slice(0, 1).toLocaleUpperCase()!}
          />
        </Box>
        <Text> {user?.name} </Text>
      </Flex>
      <Flex
        align="center"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/users.png" alt="U" />
        </Box>
        <Text>Friends</Text>
      </Flex>
      <Flex
        align="center"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/group.png" alt="U" />
        </Box>
        <Text>Groups</Text>
      </Flex>
      <Flex
        align="center"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/video.png" alt="U" />
        </Box>
        <Text>Videos</Text>
      </Flex>
      <Flex
        align="center"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/messenger.png" alt="U" />
        </Box>
        <Text>Messenger</Text>
      </Flex>
      <Flex
        onClick={() => signOut()}
        align="center"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/logout.png" alt="U" />
        </Box>
        <Text>Log Out</Text>
      </Flex>
    </Box>
  );
};

export default SidebarLeft;
