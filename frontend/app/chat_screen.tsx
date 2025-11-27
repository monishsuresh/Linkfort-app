import { useLocalSearchParams } from 'expo-router'
import React, { useState, useCallback, useEffect } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Bubble, Composer, GiftedChat, IMessage, InputToolbar, Time } from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useChatStore } from './app_components/store/chatStore'
import { Post } from './app_components/models/Post'

interface ChatParams {
    postData: string; // This key holds the serialized Post object
}

export default function Example() {
    const addPost = useChatStore(state => state.addPost);

    const params = useLocalSearchParams() as unknown as ChatParams;
    const [post_item, setPost] = useState<Post | null>(null);

    const [messages, setMessages] = useState<IMessage[]>([])
    const insets = useSafeAreaInsets()

    // If you have a tab bar, include its height
    const tabbarHeight = 60
    const bannerHeight = 60;
    const keyboardTopToolbarHeight = Platform.select({ ios: 44, default: 44 })
    const keyboardVerticalOffset = insets.bottom + tabbarHeight + bannerHeight + keyboardTopToolbarHeight

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'John Doe',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []) // 

    useEffect(() => {
        if (params.postData) {
            try {
                // 1. Deserialize the JSON string back into a Post object
                const parsedPost = JSON.parse(params.postData) as Post;
                setPost(parsedPost);
            } catch (error) {
                console.error("Error parsing Post data:", error);
                // Handle the error (e.g., show a message or navigate back)
            }
        }
    }, [params.postData]);

    useEffect(() => {
        console.log('post_item changed:', post_item);
    }, [post_item]);


    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        console.log('chat_screen.tsx 1:', post_item?.name)
        if (post_item?.name) {
            console.log('chat_screen.tsx 2:', post_item?.name)
            addPost(post_item);
        }
    }, [post_item])

    return (
        <View style={styles.container}>
            {/* Banner / Header */}
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>{post_item?.name}</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={props => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: { backgroundColor: '#4CAF50', }
                        }}
                        textStyle={{
                            left: {
                                color: 'white',   // ← Change this to whatever color you want
                            },
                        }}
                    />
                )}
                renderTime={props => (
                    <Time
                        {...props}
                        timeTextStyle={{
                            left: { color: 'white' },
                            right: { color: 'white' },
                        }}
                    />
                )}
                renderInputToolbar={props => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            backgroundColor: '#000000ff',
                            borderTopWidth: 0,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                        }}
                        primaryStyle={{ alignItems: 'center' }}
                    />
                )}
                renderAvatar={props => null}
                keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    banner: {
        height: 60,
        backgroundColor: '#b4b4b4ff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0, // for iOS status bar
    },
    bannerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    inputToolbarContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    inputToolbarPrimary: {
        alignItems: 'center',
    },
    composerTextInput: {
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 10 : 6,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});