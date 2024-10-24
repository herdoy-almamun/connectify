"use client";

import ImageUploader from "@/components/image-uploader";
import { Avatar, Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useContext } from "react";
import { AuthContext } from "../auth-provdier";
import Navbar from "../navbar";

const Profile = () => {
  const user = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Container className="px-3">
        <Flex justify="center" direction="column" align="center" gap="4" py="6">
          <Flex align="center" justify="center" className="relative">
            <Avatar
              radius="full"
              size="9"
              src={user?.image!}
              fallback={user?.name!}
            />
            <Box className="absolute bottom-0  right-4">
              <ImageUploader />
            </Box>
          </Flex>
          <Flex align="center" justify="center" direction="column">
            <Heading size="7">{user?.name}</Heading>
            <Text> {user?.email} </Text>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Profile;
