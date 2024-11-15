import { queryClient } from "@/app/query-client-provider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface Message {
  chatId: string;
  text: string;
  image: string;
  sender: string;
}

const useMessage = () =>
  useMutation({
    mutationFn: ({ chatId, text, image, sender }: Message) =>
      axios
        .post("/api/message", {
          chatId,
          text,
          image,
          sender,
        })
        .then((res) => res.data),

    onMutate: async ({ chatId, text, image, sender }) => {
      await queryClient.cancelQueries({ queryKey: ["messages"] });

      const previousMessages =
        queryClient.getQueryData<Message[]>(["messages"]) || [];

      queryClient.setQueryData(["messages"], (oldComments: Message[] = []) => [
        ...oldComments,
        { _id: uuidv4(), chatId, text, image, sender },
      ]);

      return { previousMessages, chatId };
    },

    onError: (err, newMessage, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["comments", context.chatId],
          context.previousMessages
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

export default useMessage;
