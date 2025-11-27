import { create } from 'zustand'
import { Post } from '../models/Post'

type ChatState = {
    chatList: Post[];
    addPost: (post: Post) => void;
    clearChatList: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    chatList: [],

    addPost: (post: Post) =>
        set((state) => ({
            chatList: [...state.chatList, post],
        })),

    clearChatList: () => set({ chatList: [] }),
}));
