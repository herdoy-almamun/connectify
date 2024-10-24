import { Avatar, Box, Flex, Heading, Text } from "@radix-ui/themes";

const ActiveFriends = () => {
  return (
    <Box py="3">
      <Heading size="5" mb="3">
        Active Friends
      </Heading>

      {Array.from({ length: 7 }).map((_, i) => (
        <Flex
          key={i}
          align="center"
          justify="start"
          gap="2"
          className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
        >
          <Box className="w-10 flex items-center justify-center relative">
            <Avatar src="/gap.jpg" radius="full" fallback="U" />
            <Box className="w-3 h-3 bg-[#2dfe54] absolute bottom-0 right-0 rounded-full"></Box>
          </Box>
          <Text>Herdoy Almamun</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default ActiveFriends;
