import { Comment } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useComments = (postId: string) =>
  useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () =>
      axios.get<Comment[]>(`/api/comments/${postId}`).then((res) => res.data),
  });

export default useComments;
