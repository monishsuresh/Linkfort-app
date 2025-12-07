import { create } from 'zustand'
import { Review } from '../models/Review'

type ReviewState = {
    reviewList: Review[];
    addReview: (review: Review) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
    reviewList: [],

    addReview: (review: Review) =>
        set((state) => {
            const exists = state.reviewList.some((r) => r.id === review.id);
            if (exists) return {};
            const newReviewList = [...state.reviewList, review];
            return { reviewList: newReviewList };
        })
}))