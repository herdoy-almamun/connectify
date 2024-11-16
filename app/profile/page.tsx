"use client";

import { Avatar, Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Navbar from "../navbar";
import UpdateProfileImage from "./update-profile-image";

const Profile = () => {
  const { data: session } = useSession();
  if (!session || !session.user) return null;

  return (
    <>
      <Navbar />
      <Container className="px-3">
        <Flex justify="center" direction="column" align="center" gap="4" py="6">
          <Flex align="center" justify="center" className="relative">
            <Avatar
              radius="full"
              size="9"
              src={session.user.image}
              fallback={session.user.name}
            />
            <Box className="absolute bottom-0  right-4">
              <UpdateProfileImage />
            </Box>
          </Flex>
          <Flex align="center" justify="center" direction="column">
            <Heading size="7">{session.user.name}</Heading>
            <Text> {session.user.email} </Text>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Profile;
