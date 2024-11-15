import { Avatar, Box, Flex, Grid, Text } from "@radix-ui/themes";
import { BsCameraVideo, BsEmojiSmile } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { PiPaperclip, PiPhoneCall } from "react-icons/pi";

const MessageArea = () => {
  return (
    <Grid
      display={{ initial: "none", md: "grid" }}
      className="border-r h-dvh"
      columns="1"
      rows="55px 1fr 55px"
    >
      <Flex
        px="4"
        align="center"
        justify="between"
        className="shadow !h-[55px]"
      >
        <Flex gap="2" align="center">
          <Avatar radius="full" src="/gap.jpg" fallback="U" />
          <Text className="text-sm font-semibold">Md Herdoy</Text>
        </Flex>
        <Flex align="center" gap="5">
          <PiPhoneCall className="text-2xl cursor-pointer" />
          <BsCameraVideo className="text-2xl cursor-pointer" />
          <CiMenuKebab className="text-2xl cursor-pointer" />
        </Flex>
      </Flex>
      <Flex
        gap="3"
        direction="column"
        p="4"
        className="bg-gray-100 overflow-auto"
      >
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/5"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/40 self-end"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/5"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/40 self-end"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/5"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/40 self-end"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/5"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/40 self-end"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/5"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/40 self-end"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/5"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
        <Box
          className="max-w-[200px] md:max-w-[500px] border shadow rounded-lg bg-primary/40 self-end"
          p="2"
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
            nisi. Sapiente ut commodi sit iste, facere voluptate pariatur,
            temporibus dolor praesentium laboriosam quae similique nemo maiores
            beatae? Beatae, eius fugit!
          </p>
        </Box>
      </Flex>
      <Flex
        align="center"
        justify="between"
        gap="4"
        px="4"
        className="border-t"
      >
        <Flex align="center" gap="5">
          <BsEmojiSmile className="text-xl cursor-pointer" />
          <PiPaperclip className="text-xl cursor-pointer" />
        </Flex>
        <input
          className="flex-1 h-full focus:outline-none bg-transparent"
          type="text"
          placeholder="Type your message..."
        />
      </Flex>
    </Grid>
  );
};

export default MessageArea;
