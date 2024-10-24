import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = (email: string) =>
  useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios.get<User>(`/api/users/${email}`).then((res) => res.data),
    staleTime: 10_000_000,
  });

export default useUser;
