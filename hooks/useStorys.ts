import { Story } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useStorys = () =>
  useQuery<Story[]>({
    queryKey: ["storys"],
    queryFn: () => axios.get<Story[]>("/api/storys").then((res) => res.data),
    staleTime: 10_000_000,
  });

export default useStorys;
