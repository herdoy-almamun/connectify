import { Box } from "@radix-ui/themes";
import CreatePost from "./_components/create-post";

const Feed = () => {
  return (
    <Box className="px-2 py-4 space-y-3">
      <CreatePost />
    </Box>
  );
};

export default Feed;
