import { Post } from "./Post";

export type User = {
    id: string;
    name: string;
    rating: number;
    posts: Post[]
}