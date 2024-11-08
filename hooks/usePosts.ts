import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePosts = () =>
  useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () => axios.get<Post[]>("/api/posts").then((res) => res.data),
    staleTime: 10_000_000,
  });

export default usePosts;
