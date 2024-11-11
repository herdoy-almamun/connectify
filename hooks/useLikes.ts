import { Like } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useLikes = (postId: string) =>
  useQuery<Like[]>({
    queryKey: ["likes", postId],
    queryFn: () =>
      axios.get<Like[]>(`/api/likes/${postId}`).then((res) => res.data),
  });

export default useLikes;
