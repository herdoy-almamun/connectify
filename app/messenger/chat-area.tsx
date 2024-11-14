import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const ChatArea = () => {
  return (
    <Box className="bg-secondary border-r">
      <Flex
        direction="column"
        justify="between"
        className="h-[135px] pb-[15px]"
      >
        <Flex
          px="2"
          align="center"
          justify="between"
          className="shadow !h-[55px]"
        >
          <Link href="/">
            <Image width={35} height={35} src="/logo.png" alt="logo" />
          </Link>
          <IoMdMenu className="text-2xl cursor-pointer" />
        </Flex>
        <Flex
          mx="2"
          gap="2"
          align="center"
          p="2"
          className="border rounded shadow"
        >
          <IoSearch />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent focus:outline-none"
          />
        </Flex>
      </Flex>
      <Box px="2" className="space-y-4 h-[calc(100dvh-135px)] overflow-auto">
        {Array.from({ length: 20 }).map((_, i) => (
          <Flex
            key={i}
            align="center"
            justify="between"
            p="2"
            className="rounded cursor-pointer hover:bg-gray-200"
          >
            <Flex gap="2" align="center">
              <Avatar radius="full" src="/gap.jpg" fallback="U" />
              <Flex direction="column">
                <Text className="text-sm font-semibold">Md Herdoy</Text>
                <span className="text-sm"> Hey ✋ </span>
              </Flex>
            </Flex>
            <Flex direction="column" justify="between">
              <span className="text-[10px]">11:35am</span>
              <span className="text-sm"></span>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default ChatArea;
