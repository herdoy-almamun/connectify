"use client";
import { Story, User } from "@prisma/client";
import { Avatar, Box } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  story: Story;
}

const StoryItem = ({ story }: Props) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    axios.get(`/api/user/${story.userId}`).then((res) => setUser(res.data));
  }, [story]);
  return (
    <Box className="h-full w-full rounded-xl overflow-hidden relative">
      <Avatar
        src={user?.image!}
        size="3"
        radius="full"
        className="absolute top-2 right-2 border-primary border-2"
        fallback="U"
      />
      <Image
        src={story.image}
        width={200}
        height={220}
        alt="M"
        className="w-full h-full object-cover"
      />
    </Box>
  );
};

export default StoryItem;
