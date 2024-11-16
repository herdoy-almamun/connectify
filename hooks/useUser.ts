import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (email: string) =>
  useQuery({
    queryKey: ["user", email],
    queryFn: () =>
      axios.get<User>(`/api/users/${email}`).then((res) => res.data),
    staleTime: 10_000_000,
  });

export const useUserById = (id: string) =>
  useQuery({
    queryKey: ["userbyId", id],
    queryFn: () => axios.get<User>(`/api/user/${id}`).then((res) => res.data),
    staleTime: 10_000_000,
  });
