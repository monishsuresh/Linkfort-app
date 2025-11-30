import { create } from "zustand";

export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    rating: number;
    exchanges: number;
    plyrExchanges: number;
    ratingPossible: boolean;
};

export const useUserStore = create<{
    users: User[];
    incrementUserExchanges: (userId: string) => void;
    setUserRatingPossible: (userId: string, value: boolean) => void;
}>
    (
        (set) => (
            {
                users: [
                    { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?img=1", rating: 4.9, exchanges: 18, plyrExchanges: 0, ratingPossible: false },
                    { id: "2", name: "Bob Smith", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?img=2", rating: 4.6, exchanges: 10, plyrExchanges: 0, ratingPossible: false },
                    { id: "3", name: "Charlie Brown", email: "charlie@example.com", avatar: "https://i.pravatar.cc/150?img=3", rating: 4.8, exchanges: 14, plyrExchanges: 0, ratingPossible: false },
                    { id: "4", name: "Diana Carter", email: "diana@example.com", avatar: "https://i.pravatar.cc/150?img=4", rating: 5.0, exchanges: 22, plyrExchanges: 0, ratingPossible: false },
                    { id: "5", name: "Ethan Lee", email: "ethan@example.com", avatar: "https://i.pravatar.cc/150?img=5", rating: 4.7, exchanges: 12, plyrExchanges: 0, ratingPossible: false },
                ],
                incrementUserExchanges: (userId: string) =>
                    set((state) => ({
                        users: state.users.map((u) =>
                            u.id === userId ? { ...u, plyrExchanges: u.plyrExchanges + 1, exchanges: u.exchanges + 1, ratingPossible: true } : u
                        ),
                    })),

                setUserRatingPossible: (userId: string, value: boolean) =>
                    set((state) => ({
                        users: state.users.map((u) =>
                            u.id === userId ? { ...u, ratingPossible: value } : u
                        ),
                    })),
            }
        )
    );
