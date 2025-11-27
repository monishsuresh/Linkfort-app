import { Post } from "../models/Post";

export const chatList: Post[] = []

export const addPostToChatList = (post: Post) => {
    chatList.push(post);
    console.log('chats.ts:', chatList)
};

export const getChatList = () => {
    return { chatList }
}