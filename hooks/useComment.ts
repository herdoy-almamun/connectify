import { queryClient } from "@/app/query-client-provider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface Comment {
  userId: string;
  postId: string;
  comment: string;
}

const useComment = () =>
  useMutation({
    mutationFn: (comment: Comment) =>
      axios
        .post("/api/comments", {
          postId: comment.postId,
          userId: comment.userId,
          comment: comment.comment,
        })
        .then((res) => res.data),

    onMutate: async ({ postId, userId, comment }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      const previousComments =
        queryClient.getQueryData<Comment[]>(["comments", postId]) || [];

      queryClient.setQueryData(
        ["comments", postId],
        (oldComments: Comment[] = []) => [
          ...oldComments,
          { _id: uuidv4(), postId, userId, comment },
        ]
      );

      return { previousComments, postId };
    },

    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", context.postId],
          context.previousComments
        );
      }
    },

    onSettled: (_, __, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

export default useComment;
