import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { BsGlobe } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { FaHeart, FaRegComment } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { PiShareFatLight } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";

const Post = () => {
  return (
    <Box className="border rounded-lg shadow-md">
      <Flex align="center" justify="between" p="4">
        <Flex align="center" gap="2">
          <Avatar src="/me.webp" radius="full" fallback="U" />
          <Box>
            <Text size="2" className="font-semibold">
              Herdoy Almamun
            </Text>
            <Flex align="center" gap="1">
              <BsGlobe />
              <span className="text-sm"> Oct-22</span>
            </Flex>
          </Box>
        </Flex>
        <Flex align="center" gap="4">
          <SlOptions className="text-2xl" />
          <IoClose className="text-2xl" />
        </Flex>
      </Flex>
      <Box px="4" pb="4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
          similique suscipit ullam fuga architecto consectetur nihil distinctio
          fugit eos neque dolor quam pariatur voluptate tenetur, minus dicta
          numquam ipsum doloribus?
        </p>
      </Box>
      <Box>
        <Image
          src="/test.jpg"
          width={500}
          height={600}
          alt="Text"
          className="w-full h-full object-cover"
        />
      </Box>
      <Flex align="center" justify="between" py="3" px="4">
        <Flex align="center" gap="1">
          <FaHeart className="text-primary" />
          <span className="text-sm">104</span>
        </Flex>
        <Flex align="center" gap="6">
          <Flex align="center" gap="1">
            <FaComment className="text-gray-600" />
            <span className="text-sm">8</span>
          </Flex>
          <Flex align="center" gap="1">
            <IoIosShareAlt className="text-gray-600 text-2xl" />
            <span className="text-sm">2</span>
          </Flex>
        </Flex>
      </Flex>
      <hr />
      <Flex align="center" justify="between" px="2" py="1">
        <Flex
          align="center"
          justify="center"
          gap="2"
          p="3"
          className="flex-1 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <LuHeart className="text-xl" /> <span className="text-sm">Like</span>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap="2"
          p="3"
          className="flex-1 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <FaRegComment className="text-xl" />
          <span className="text-sm">Comment</span>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap="2"
          p="3"
          className="flex-1 rounded-md cursor-pointer hover:bg-gray-200"
        >
          <PiShareFatLight className="text-xl" />
          <span className="text-sm">Share</span>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Post;
