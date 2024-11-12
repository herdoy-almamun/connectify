import { queryClient } from "@/app/query-client-provider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface Like {
  userId: string;
  postId: string;
}

const useLike = () =>
  useMutation({
    mutationFn: (like: Like) =>
      axios
        .post("/api/likes", { postId: like.postId, userId: like.userId })
        .then((res) => res.data),

    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["likes", postId] });

      const previousLikes =
        queryClient.getQueryData<Like[]>(["likes", postId]) || [];

      // Check if the like already exists
      const isLiked = previousLikes.some((like) => like.userId === userId);

      // Update cache to toggle like
      queryClient.setQueryData(
        ["likes", postId],
        (oldLikes: Like[] = []) =>
          isLiked
            ? oldLikes.filter((like) => like.userId !== userId) // Remove if liked
            : [...oldLikes, { _id: uuidv4(), postId, userId }] // Add if not liked
      );

      return { previousLikes, postId };
    },

    onError: (err, newLike, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(
          ["likes", context.postId],
          context.previousLikes
        );
      }
    },

    onSettled: (_, __, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    },
  });

export default useLike;
