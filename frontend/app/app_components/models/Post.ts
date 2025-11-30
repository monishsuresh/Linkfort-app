export type PostType = "offer" | "request";

export type Post = {
    id: string;
    name: string;
    userId: string;
    type: PostType;
    details: string;
    location: {
        latitude: number;
        longitude: number;
    };
};
