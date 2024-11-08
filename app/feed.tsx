"use client";
import { Box } from "@radix-ui/themes";
import CreatePost from "./_components/create-post";
import SinglePost from "./_components/post";
import Storys from "./_components/storys";
import usePosts from "@/hooks/usePosts";

const Feed = () => {
  const { data: posts } = usePosts();
  return (
    <Box className="px-3 lg:px-2 py-4 space-y-6 h-[calc(100dvh-60px)] overflow-auto">
      <CreatePost />
      <Storys />
      {posts?.map((post) => (
        <SinglePost post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default Feed;
