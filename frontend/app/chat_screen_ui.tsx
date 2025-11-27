import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

type Message = {
    id: string;
    text: string;
    sender: "me" | "other";
};

type Props = {
    chatTitle?: string;
    userName?: string;
};

export default function ChatScreenComponent({ chatTitle, userName }: Props) {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hello! How are you?", sender: "other" },
        { id: "2", text: "I'm good, thanks! How about you?", sender: "me" },
    ]);
    const [inputText, setInputText] = useState("");

    const flatListRef = useRef<FlatList>(null);

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: "me",
        };

        setMessages([...messages, newMessage]);
        setInputText("");
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const renderMessage = ({ item }: { item: Message }) => {
        const isMe = item.sender === "me";
        return (
            <View
                style={[
                    styles.messageContainer,
                    isMe ? styles.myMessage : styles.otherMessage,
                ]}
            >
                <Text style={isMe ? styles.myMessageText : styles.otherMessageText}>
                    {item.text}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 60}
        >
            {/* Banner/Header */}

            <View style={styles.banner}>
                {/* Back button */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>

                {/* Titles */}
                <View style={styles.bannerText}>
                    <Text style={styles.bannerTitle}>{chatTitle}</Text>
                    <Text style={styles.bannerUser}>{userName}</Text>
                </View>
            </View>



            {/* Messages list */}
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.messagesList}
                />
            </View>

            {/* Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    backButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginRight: 10,             // space between back button and text
    },
    backButtonText: {
        color: "#fff",
        fontSize: 24,
    },
    banner: {
        height: 120,                 // make the banner taller
        backgroundColor: "#007bff",
        justifyContent: "flex-end",   // push text toward the bottom
        alignItems: "center",
        paddingBottom: 15,            // space between text and bottom edge
    },
    bannerText: {
        justifyContent: "center",    // vertically center the two text lines             // space between back button and text
    },
    bannerTitle: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 5,           // space between title and user
    },
    bannerUser: {
        color: "#fff",
        fontSize: 18,
    },

    messagesList: {
        padding: 10,
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        maxWidth: "70%",
        borderRadius: 10,
    },
    myMessage: {
        backgroundColor: "#007bff",
        alignSelf: "flex-end",
        borderTopRightRadius: 0,
    },
    otherMessage: {
        backgroundColor: "#e5e5ea",
        alignSelf: "flex-start",
        borderTopLeftRadius: 0,
    },
    myMessageText: { color: "#fff" },
    otherMessageText: { color: "#000" },

    inputContainer: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#f1f1f1",
        borderRadius: 25,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: "#007bff",
        borderRadius: 25,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    sendButtonText: { color: "#fff", fontWeight: "bold" },
});
