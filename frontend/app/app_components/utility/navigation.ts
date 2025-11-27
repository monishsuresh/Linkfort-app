import { router } from 'expo-router';
import { Post } from '../models/Post';

export const navigateToChat = (postItem: Post) => {

    const postItemString = JSON.stringify(postItem);
    router.push({
        pathname: '../../chat_screen', // Adjust the path as needed
        params: {
            postData: postItemString
        },
    });
};