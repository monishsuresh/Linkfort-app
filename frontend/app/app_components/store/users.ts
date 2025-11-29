import { create } from "zustand";

export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    rating: number;
    exchanges: number;
};

export const useUserStore = create<{ users: User[]; }>
    (
        () => (
            {
                users: [
                    { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?img=1", rating: 4.9, exchanges: 18 },
                    { id: "2", name: "Bob Smith", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?img=2", rating: 4.6, exchanges: 10 },
                    { id: "3", name: "Charlie Brown", email: "charlie@example.com", avatar: "https://i.pravatar.cc/150?img=3", rating: 4.8, exchanges: 14 },
                    { id: "4", name: "Diana Carter", email: "diana@example.com", avatar: "https://i.pravatar.cc/150?img=4", rating: 5.0, exchanges: 22 },
                    { id: "5", name: "Ethan Lee", email: "ethan@example.com", avatar: "https://i.pravatar.cc/150?img=5", rating: 4.7, exchanges: 12 },
                ]
            }
        )
    );
