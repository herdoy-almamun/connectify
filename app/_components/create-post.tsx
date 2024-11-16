"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import usePost from "@/hooks/usePost";
import { handleUpload } from "@/lib/utils";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ChangeEvent, useContext, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { TfiVideoClapper } from "react-icons/tfi";
import { AuthContext } from "../auth-provdier";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === "string") {
          setImg(e.target.result); // Save the base64 URL in img state
        }
      };
      fileReader.readAsDataURL(file); // Start reading the file
    }
  };

  const { mutate } = usePost();

  async function handleSubmit() {
    setLoading(true);
    const downloadURL = await handleUpload(img);
    mutate({
      userId: user?.id!,
      text,
      image: downloadURL,
    });
    setLoading(false);
    setOpen(false);
  }

  const user = useContext(AuthContext);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="w-full">
        <Box p="3" className="space-y-4 border-400 rounded-lg shadow-lg border">
          <Flex gap="2">
            <Avatar
              src={user?.image!}
              radius="full"
              fallback={user?.name?.slice(0, 1).toLocaleUpperCase()!}
            />
            <input
              className="border border-gray-300 flex-1 rounded-full px-3 focus:outline-none"
              placeholder="What's on your mind, Herdoy"
            />
          </Flex>
          <hr />
          <Flex
            align="center"
            justify="between"
            gap={{ initial: "2", md: "3" }}
          >
            <Flex
              align="center"
              justify="center"
              gap="2"
              py="2"
              className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
            >
              <FaVideo className="text-xl md:text-2xl text-red-500" />
              <span className="sm:text-sm">Live Video</span>
            </Flex>
            <Flex
              align="center"
              justify="center"
              gap="2"
              py="2"
              className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
            >
              <IoMdPhotos className="text-xl md:text-2xl text-green-500" />
              <span className="sm:text-sm">Photo/Video</span>
            </Flex>
            <Flex
              align="center"
              justify="center"
              gap="2"
              py="2"
              className="flex-1 hover:bg-gray-200 rounded-lg cursor-pointer"
            >
              <TfiVideoClapper className="text-xl md:text-2xl text-red-500" />{" "}
              <span className="sm:text-sm">Reel</span>
            </Flex>
          </Flex>
        </Box>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <Flex align="center" className="!gap-2">
          <Avatar
            src={user?.image!}
            radius="full"
            fallback={user?.name?.slice(0, 1).toLocaleUpperCase()!}
            className="max-w-11 h-11 !rounded-full overflow-hidden object-cover border-2"
          />
          <Flex
            align="start"
            className="text-sm"
            justify="start"
            direction="column"
          >
            <Text> {user?.name} </Text>
            <Text className="flex items-center gap-1 text-primary">
              <BsGlobe />
              Public
            </Text>
          </Flex>
        </Flex>
        <Box>
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="w-full focus:outline-none"
            placeholder={`What's on your mind ${user?.name}`}
          />
          <Flex
            align="center"
            justify="center"
            className="border w-full h-[200px] rounded-lg relative"
          >
            {!img && (
              <Flex align="center" justify="center" direction="column">
                <BiImageAdd className="text-5xl" />
                <Text size="6">Add Photo</Text>
              </Flex>
            )}
            {img && (
              <Box className="w-full max-h-[200px] overflow-hidden rounded-lg">
                <Image
                  src={img}
                  alt="img"
                  width={300}
                  height={200}
                  className="h-[200px] w-full object-cover"
                />
              </Box>
            )}
            {!img && (
              <input
                type="file"
                className="w-full absolute h-full opacity-0"
                onChange={handleFileChange}
              />
            )}
            {img && (
              <Flex
                onClick={() => setImg("")}
                align="center"
                justify="center"
                className="absolute top-2 cursor-pointer right-2 rounded-full bg-gray-600 text-white w-10 h-10"
              >
                X
              </Flex>
            )}
            {isLoading && (
              <div className="w-full h-full bg-black/60 absolute flex items-center justify-center">
                <div className="loader"></div>
              </div>
            )}
          </Flex>
        </Box>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={text.length < 1 && !img} onClick={handleSubmit}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePost;
