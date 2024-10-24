import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Box, Grid, Skeleton } from "@radix-ui/themes";
import { HiOutlinePlus } from "react-icons/hi";

const SStorys = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="basis-1/3 lg:basis-1/4 h-[180px] lg:h-[200px]">
          <Grid
            rows={{ initial: "1fr 60px", md: "1fr 60px" }}
            className="overflow-hidden rounded-xl border cursor-pointer h-full"
          >
            <Box className="overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="w-full h-full object-cover" />
              </div>
            </Box>
            <Box>
              <div className="w-full h-full flex items-end pb-2 justify-center relative">
                <div className="absolute -top-5 bg-white w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center">
                  <HiOutlinePlus className="text-2xl" />
                </div>
                <span className="text-sm">Create Story</span>
              </div>
            </Box>
          </Grid>
        </CarouselItem>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/3 lg:basis-1/4 h-[180px] lg:h-[200px]"
          >
            <Box className="h-full w-full rounded-xl overflow-hidden relative">
              <Skeleton className="w-10 h-10 !rounded-full absolute top-2 right-2 border-primary border-2" />
              <Skeleton className="w-full h-full object-cover" />
            </Box>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SStorys;
