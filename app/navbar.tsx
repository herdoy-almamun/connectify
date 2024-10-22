import { Avatar, Box, Container, Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { CgMenuGridO } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { ImUsers } from "react-icons/im";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { PiMessengerLogoFill } from "react-icons/pi";
import { RxVideo } from "react-icons/rx";
import { TbHomeFilled } from "react-icons/tb";

const Navbar = () => {
  return (
    <Box className="shadow-md px-3">
      <Container size="4" className="h-[60px] flex items-center justify-center">
        <Grid columns={{ initial: "2", md: "3" }}>
          <Flex align="center" gap="3">
            <Link href="/">
              <Image src="/logo.png" width={40} height={40} alt="logo" />
            </Link>
            <Flex
              className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
              align="center"
              justify="center"
              display={{ initial: "flex", md: "none" }}
            >
              <IoSearch className="text-xl text-gray-600" />
            </Flex>
            <Flex
              display={{ initial: "none", md: "flex" }}
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
          <Flex
            display={{ initial: "none", md: "flex" }}
            align="center"
            justify="between"
          >
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

          <Flex align="center" justify="end" gap={{ initial: "3", md: "6" }}>
            <Flex
              display={{ initial: "flex", md: "none" }}
              align="center"
              justify="center"
              className="w-10 h-10 bg-gray-200 hover:bg-gray-400 transition rounded-full"
            >
              <CgMenuGridO className="text-xl" />
            </Flex>
            <Flex
              align="center"
              justify="center"
              className="w-10 h-10 bg-gray-200 hover:bg-gray-400 transition rounded-full"
            >
              <PiMessengerLogoFill className="text-xl" />
            </Flex>
            <Flex
              align="center"
              justify="center"
              className="w-10 h-10 bg-gray-200 hover:bg-gray-400 transition rounded-full"
            >
              <IoNotifications className="text-xl" />
            </Flex>
            <Avatar src="/me.webp" fallback="H" radius="full" />
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
};

export default Navbar;
