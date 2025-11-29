import { useLocalSearchParams } from 'expo-router'
import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Bubble, Composer, GiftedChat, IMessage, InputToolbar, Time } from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useChatStore } from './app_components/store/chatStore'
import { Post } from './app_components/models/Post'
import { commonStyles } from '@/styles/styles'
import { useUserStore } from './app_components/store/users'
import { SafeAreaView } from "react-native-safe-area-context";

interface ChatParams {
    postData: string; // This key holds the serialized Post object
}

export default function Example() {
    const addPost = useChatStore(state => state.addPost);
    const users = useUserStore((state) => state.users);

    const params = useLocalSearchParams() as unknown as ChatParams;

    const [hasAutoReplied, sethasAutoReplied] = useState(false);
    const [post_item, setPost] = useState<Post | null>(null);
    const [showRateBox, setShowRateBox] = useState(false);
    const [hasShownRateBox, setHasShownRateBox] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [messages, setMessages] = useState<IMessage[]>([]);

    const insets = useSafeAreaInsets();

    // If you have a tab bar, include its height
    const tabbarHeight = 60
    const bannerHeight = 60;
    const keyboardTopToolbarHeight = Platform.select({ ios: 44, default: 44 })
    const keyboardVerticalOffset = insets.bottom + tabbarHeight + bannerHeight + keyboardTopToolbarHeight

    useEffect(() => {
        setMessages([
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


    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        if (post_item?.name) {
            addPost(post_item);
        }

        // Automatic reply after a short delay
        if (!hasAutoReplied) {
            setTimeout(() => {
                const autoReply: IMessage = {
                    _id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`, // unique id
                    text: 'This is an automatic reply!',
                    createdAt: new Date(),
                    user: {
                        _id: 2, // bot user id
                        name: 'John Doe',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                };

                sethasAutoReplied(true);

                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, [autoReply]),
                );

                if (!hasShownRateBox) {
                    setTimeout(() => {
                        setShowRateBox(true);
                        setHasShownRateBox(true);
                    }, 1000);
                }
            }, 1000); // 1 second delay
        }

    }, [post_item, hasAutoReplied, hasShownRateBox])

    return (
        <View style={styles.container}>
            {/* Banner / Header */}
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>{post_item?.name}</Text>
            </View>
            <SafeAreaView style={styles.container}>


                {/* user rating*/}
                <Modal
                    visible={showRateBox}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setShowRateBox(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setShowRateBox(false)}>
                        <View style={styles.modalBackdrop}>
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <View style={styles.modalContainer}>

                                    {/* Close Button */}
                                    <TouchableOpacity
                                        style={commonStyles.closeButton}
                                        onPress={() => setShowRateBox(false)}
                                    >
                                        <Text style={commonStyles.closeText}>✕</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.modalTitle}>Rate user</Text>
                                    <Text style={styles.modalSubtitle}>Tap the stars to rate</Text>

                                    {/* ⭐ STAR SELECTOR */}
                                    <View style={styles.starsRow}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <TouchableOpacity
                                                key={star}
                                                onPress={() => setSelectedStars(star)}
                                                style={styles.starButton}
                                            >
                                                <Text
                                                    style={[
                                                        styles.star,
                                                        { color: star <= selectedStars ? '#FFD700' : '#CCCCCC' }
                                                    ]}
                                                >
                                                    ★
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    {/* Submit Button */}
                                    <TouchableOpacity
                                        style={[
                                            styles.submitButton,
                                            { opacity: selectedStars === 0 ? 0.4 : 1 }
                                        ]}
                                        disabled={selectedStars === 0}
                                        onPress={() => {
                                            console.log("User rated:", selectedStars);
                                            setShowRateBox(false);
                                            setSelectedStars(0);
                                        }}
                                    >
                                        <Text style={styles.submitText}>Submit</Text>
                                    </TouchableOpacity>

                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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
                    listProps={{
                        keyboardShouldPersistTaps: "handled", // <--- this fixes the keyboard closing issue
                    }}
                />
            </SafeAreaView>
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
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 6,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 18,
    },

    starsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    starButton: {
        padding: 6,
    },
    star: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    primaryButton: { backgroundColor: '#4CAF50' },
    secondaryButton: { backgroundColor: '#999' },
    actionText: { color: 'white', fontWeight: '600' },
});