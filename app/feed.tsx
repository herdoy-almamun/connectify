import { Box } from "@radix-ui/themes";
import CreatePost from "./_components/create-post";
import Post from "./_components/post";
import Storys from "./_components/storys";

const Feed = () => {
  return (
    <Box className="px-3 lg:px-2 py-4 space-y-6 h-[calc(100dvh-60px)] overflow-auto">
      <CreatePost />
      <Storys />
      {Array.from({ length: 6 }).map((_, index) => (
        <Post key={index} />
      ))}
    </Box>
  );
};

export default Feed;
