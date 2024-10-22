import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

const SidebarRigh = () => {
  return (
    <Box py="2" className="space-y-2 h-[calc(100dvh-60px)] overflow-auto">
      <Flex
        align="center"
        justify="end"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Text>Herdoy Almamun</Text>
        <Box className="w-10 flex items-center justify-center">
          <Avatar src="/me.webp" radius="full" fallback="U" />
        </Box>
      </Flex>
      <Flex
        align="center"
        justify="end"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Text>Friends</Text>
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/users.png" alt="U" />
        </Box>
      </Flex>
      <Flex
        align="center"
        justify="end"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Text>Groups</Text>
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/group.png" alt="U" />
        </Box>
      </Flex>
      <Flex
        align="center"
        justify="end"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Text>Videos</Text>
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/video.png" alt="U" />
        </Box>
      </Flex>
      <Flex
        align="center"
        justify="end"
        gap="2"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
      >
        <Text>Messenger</Text>
        <Box className="w-10 flex items-center justify-center">
          <Image width={30} height={30} src="/icons/messenger.png" alt="U" />
        </Box>
      </Flex>
    </Box>
  );
};

export default SidebarRigh;
