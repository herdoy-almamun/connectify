import { create } from "zustand";

interface ChatStore {
  selectedChat: string;
  setSelectedChat: (chatId: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChat: "",
  setSelectedChat: (chatId) => set(() => ({ selectedChat: chatId })),
}));
