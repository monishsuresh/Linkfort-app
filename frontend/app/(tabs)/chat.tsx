// app/(tabs)/chat/index.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { commonStyles } from "@/styles/styles";
import { router } from "expo-router";
import { navigateToChat } from "../app_components/utility/navigation";
import { getChatList } from "../app_components/data/chats";
import { Post } from "../app_components/models/Post";
import { useChatStore } from "../app_components/store/chatStore";

export default function ChatListScreen() {
    const chatList = useChatStore(state => state.chatList);
    const renderItem = ({ item }: { item: Post }) => (
        <TouchableOpacity onPress={() => router.push('/chat_screen')} // ?user=${encodeURIComponent(item.user)}&title=${encodeURIComponent(item.title)}`
            style={styles.chatItem}>
            <Text style={styles.chatTitle}>{item.name}</Text>
            <Text style={styles.chatUser}>{item.user}</Text>
        </TouchableOpacity>
    );
    console.log(chatList)

    return (

        <View style={styles.container}>
            <View style={commonStyles.top_banner}>
                <Text style={commonStyles.top_banner_text}>Chats</Text>
            </View>
            <FlatList
                data={chatList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    chatItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 8,
    },
    chatTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    chatUser: {
        fontSize: 14,
        color: "#555",
        marginTop: 3,
    },
});
