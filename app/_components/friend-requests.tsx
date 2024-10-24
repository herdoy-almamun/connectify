import { Button } from "@/components/ui/button";
import { Avatar, Box, Flex, Heading, Text } from "@radix-ui/themes";

const FriendRequests = () => {
  return (
    <Box py="3">
      <Heading size="5" mb="3">
        Friend Requests
      </Heading>
      <Box className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Flex
            key={i}
            align="center"
            justify="start"
            gap="4"
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
          >
            <Box className="w-10 flex items-center justify-center relative">
              <Avatar src="/gap.jpg" size="4" radius="full" fallback="U" />
            </Box>
            <Flex direction="column">
              <Text>Herdoy Almamun</Text>
              <Flex align="center" gap="3">
                <Button
                  size="sm"
                  className="bg-green-500 h-6 hover:bg-green-600 transition"
                >
                  Accept
                </Button>
                <Button size="sm" variant="destructive" className="h-6">
                  Decline
                </Button>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default FriendRequests;
