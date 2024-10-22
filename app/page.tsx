import { Avatar, Box, Container, Flex, Grid, Text } from "@radix-ui/themes";
import Image from "next/image";
import Navbar from "./navbar";

const Home = () => {
  return (
    <Grid className="h-dvh" rows="60px 1fr" columns="1">
      <Navbar />
      <Container size="4">
        <Grid columns="300px 1fr 300px">
          <Box py="4" className="space-y-2">
            <Flex
              align="center"
              gap="2"
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
            >
              <Box className="w-10 flex items-center justify-center">
                <Avatar src="/me.webp" radius="full" fallback="U" />
              </Box>
              <Text>Herdoy Almamun</Text>
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
                <Image
                  width={30}
                  height={30}
                  src="/icons/messenger.png"
                  alt="U"
                />
              </Box>
              <Text>Messenger</Text>
            </Flex>
          </Box>
          <Box>main</Box>
          <Box>Promotion</Box>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Home;
