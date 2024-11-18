import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => axios.get<User>(`/api/users/${id}`).then((res) => res.data),
    staleTime: 10_000_000,
  });
