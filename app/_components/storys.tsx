"use client";
import SStorys from "@/components/skeletons/s-storys";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useStorys from "@/hooks/useStorys";
import { useContext } from "react";
import { AuthContext } from "../auth-provdier";
import CreateStory from "./create-story";
import StoryItem from "./story-item";

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
            <StoryItem story={story} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Storys;
