import { useChatStore } from "@/store";
import { Message } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMessages = () => {
  const selectedChat = useChatStore((s) => s.selectedChat);
  return useQuery<Message[]>({
    queryKey: ["messages", selectedChat],
    queryFn: () =>
      axios.post("/api/messages", { selectedChat }).then((res) => res.data),
    staleTime: 10_000_000,
  });
};

export default useMessages;
