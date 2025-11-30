import { create } from "zustand";

export type userInteraction = {
    userId: string,
    interactionComplete: boolean,
    userRated: boolean
}