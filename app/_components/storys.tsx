"use client";
import SStorys from "@/components/skeletons/s-storys";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useStorys from "@/hooks/useStorys";
import { Avatar, Box } from "@radix-ui/themes";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "../auth-provdier";
import CreateStory from "./create-story";

const Storys = () => {
  const user = useContext(AuthContext);
  const { data: storys } = useStorys();
  if (!user) return <SStorys />;
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="basis-1/3 lg:basis-1/4 h-[180px] lg:h-[200px]">
          <CreateStory
            userImage={user.image!}
            userName={user.name!}
            userId={user.id}
          />
        </CarouselItem>
        {storys?.map((story) => (
          <CarouselItem
            key={story.id}
            className="basis-1/3 lg:basis-1/4 h-[180px] lg:h-[200px]"
          >
            <Box className="h-full w-full rounded-xl overflow-hidden relative">
              <Avatar
                src="/me.webp"
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
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Storys;
