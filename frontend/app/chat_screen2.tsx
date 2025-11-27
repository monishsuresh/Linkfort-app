import { useLocalSearchParams } from "expo-router";
import ChatScreenComponent from "./chat_screen_ui";

export default function ChatScreenWrapper() {
    const params = useLocalSearchParams<{ user?: string; title?: string }>();
    const userName = params.user || "User";
    const chatTitle = params.title || "Chat";

    return <ChatScreenComponent chatTitle={chatTitle} userName={userName} />;
}

// Dynamic header title
export const unstable_settings = {
    title: (params: { user?: string }) => params.user || "Chat",
};