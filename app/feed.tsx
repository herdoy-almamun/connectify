import { Box } from "@radix-ui/themes";
import CreatePost from "./_components/create-post";
import Storys from "./_components/storys";

const Feed = () => {
  return (
    <Box className="px-2 py-4 space-y-4">
      <CreatePost />
      <Storys />
    </Box>
  );
};

export default Feed;
