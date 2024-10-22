import { Avatar, Box, Flex } from "@radix-ui/themes";
import { FaVideo } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { TfiVideoClapper } from "react-icons/tfi";

const CreatePost = () => {
  return (
    <Box p="3" className="space-y-4 border-400 rounded-lg shadow-lg border">
      <Flex gap="2">
        <Avatar src="/me.webp" radius="full" fallback="U" />
        <input
          className="border border-gray-300 flex-1 rounded-full px-3 focus:outline-none"
          placeholder="What's on your mind, Herdoy"
        />
      </Flex>
      <hr />
      <Flex align="center" justify="between" gap="3">
        <Flex
          align="center"
          justify="center"
          gap="2"
          px="3"
          py="2"
          className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <FaVideo className="text-2xl text-red-500" />
          <span>Live Video</span>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap="2"
          px="3"
          py="2"
          className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <IoMdPhotos className="text-2xl text-green-500" />
          <span>Photo/Video</span>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap="2"
          px="3"
          py="2"
          className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <TfiVideoClapper className="text-2xl text-red-500" />{" "}
          <span>Reel</span>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CreatePost;
