import { Avatar, Box, Container, Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { HiUserGroup } from "react-icons/hi";
import { ImUsers } from "react-icons/im";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { PiMessengerLogoFill } from "react-icons/pi";
import { RxVideo } from "react-icons/rx";
import { TbHomeFilled } from "react-icons/tb";

const Navbar = () => {
  return (
    <Box className="py-3 shadow-md">
      <Container size="4">
        <Grid columns="3">
          <Flex align="center" gap="3">
            <Link href="/">
              <Image src="/logo.png" width={40} height={40} alt="logo" />
            </Link>
            <Flex
              align="center"
              className="border border-gray-500 p-2 rounded-full"
              gap="1"
            >
              <IoSearch className="text-xl" />
              <input
                className="focus:outline-none outline-none border-none h-full flex-1 bg-transparent"
                type="text"
                placeholder="Search"
              />
            </Flex>
          </Flex>
          <Flex align="center" justify="between">
            <Link href="/" className="hover:text-primary transition-colors">
              <TbHomeFilled className="text-2xl" />
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              <ImUsers className="text-2xl" />
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              <RxVideo className="text-2xl" />
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              <HiUserGroup className="text-2xl" />
            </Link>
          </Flex>

          <Flex align="center" justify="end" gap="6">
            <Link
              href="/"
              className="!w-11 !h-11 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
            >
              <PiMessengerLogoFill className="text-xl" />
            </Link>
            <Link
              href="/"
              className="!w-11 !h-11 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
            >
              <IoNotifications className="text-xl" />
            </Link>
            <Avatar src="/me.webp" fallback="H" radius="full" />
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
};

export default Navbar;
