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
        set((state) => {
            // Check if the post is already in the list by id

            const exists = state.chatList.some((p) => p.id === post.id);
            if (exists) return {}; // no change
            const newChatList = [...state.chatList, post];
            return { chatList: newChatList }; // add new post
        }),

    clearChatList: () => set({ chatList: [] }),
}));
