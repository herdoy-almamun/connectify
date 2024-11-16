import { queryClient } from "@/app/query-client-provider";
import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface PostInterface {
  userId: string;
  text: string;
  image: string;
}

const usePost = () =>
  useMutation({
    mutationFn: ({ userId, text, image }: PostInterface) =>
      axios
        .post("/api/posts", {
          userId,
          text,
          image,
        })
        .then((res) => res.data),

    onMutate: async ({ userId, text, image }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts =
        queryClient.getQueryData<PostInterface[]>(["posts"]) || [];

      queryClient.setQueryData(["posts"], (oldPosts: Post[] = []) => [
        ...oldPosts,
        { _id: uuidv4(), userId, text, image, createdAt: new Date() },
      ]);

      return { previousPosts };
    },

    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

export default usePost;
