"use client";
import SStorys from "@/components/skeletons/s-storys";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useStorys from "@/hooks/useStorys";
import { useSession } from "next-auth/react";
import CreateStory from "./create-story";
import StoryItem from "./story-item";

const Storys = () => {
  const { data: storys } = useStorys();
  const { data: session } = useSession();

  if (!session || !session.user) return <SStorys />;
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="basis-1/3 lg:basis-1/4 h-[180px] lg:h-[200px]">
          <CreateStory
            userImage={session.user.image!}
            userName={session.user.name}
            userId={session.user.id}
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
