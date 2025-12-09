import { Picker } from "@react-native-picker/picker"; // install if not installed
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addPost } from "./app_components/data/posts";
import { Post, PostType } from "./app_components/models/Post";

export default function CreatePost() {
    const router = useRouter();

    const [postType, setPostType] = useState<PostType>("offer");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [shareLocation, setShareLocation] = useState(false);
    const isFormValid = title.trim().length > 0 && description.trim().length > 0;
    const [message, setMessage] = useState('');
    const [infoVisible, setInfoVisible] = useState(false);

    const handleSubmit = () => {
        const newPost: Post = {
            id: String(Date.now()), // simple unique id
            name: "UserX",
            userId: "0",
            type: postType,
            details: description,
            location: shareLocation ? { latitude: 51.5, longitude: 6.5 } : { latitude: 0, longitude: 0 },
        };

        // addPost(newPost);
        // alert("Post created!");
        // show temporary message instead of alert
        setMessage("Post created!");
        setTimeout(() => setMessage(''), 2000);

        setPostType("offer");
        setTitle("");
        setDescription("");
        setShareLocation(false);
    };

    return (
        <View style={styles.container}>
            {message ? (
                <Text
                    style={{
                        color: 'green',
                        textAlign: 'center',
                        marginVertical: 8,
                        fontSize: 20, // increase this to make it bigger
                        fontWeight: 'bold', // optional: make it stand out
                    }}
                >
                    {message}
                </Text>
            ) : null}

            {/* Post Type */}
            <Text style={styles.label}>Post Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={postType}
                    onValueChange={(value) => setPostType(value as PostType)}
                    style={{ color: 'black' }}
                >
                    <Picker.Item label="Offer" value="offer" />
                    <Picker.Item label="Request" value="request" />
                </Picker>
            </View>

            {/* Title */}
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter post title"
            />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.textArea}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your offer or request"
                multiline
            />

            {/* Share Location */}
            <View style={styles.toggleRow}>
                <TouchableOpacity onPress={() => setInfoVisible(true)}>
                    <Text style={[styles.label, { textDecorationLine: "underline" }]}>
                        Share Location
                    </Text>
                </TouchableOpacity>

                <Switch
                    value={shareLocation}
                    onValueChange={setShareLocation}
                />
            </View>

            {/* Info Dialog */}
            <Modal
                transparent
                visible={infoVisible}
                animationType="fade"
                onRequestClose={() => setInfoVisible(false)}
            >
                <Pressable style={styles.infoBackdrop} onPress={() => setInfoVisible(false)}>
                    <Pressable style={styles.infoBox} onPress={e => e.stopPropagation()}>
                        <Text style={styles.infoTitle}>About Location Sharing</Text>

                        <Text style={styles.infoText}>
                            Enabling this lets other users see your approximate location
                            so they can find nearby offers and requests.
                        </Text>

                        <TouchableOpacity
                            style={styles.infoCloseButton}
                            onPress={() => setInfoVisible(false)}
                        >
                            <Text style={styles.infoCloseButtonText}>OK</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: isFormValid ? "#007AFF" : "#999" },
                ]}
                disabled={!isFormValid}
                onPress={() => {
                    if (isFormValid) handleSubmit();
                }}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 20,
        overflow: "hidden",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        height: 120,
        fontSize: 16,
        marginBottom: 20,
        textAlignVertical: "top",
    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    infoBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    infoBox: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    infoText: {
        fontSize: 15,
        color: "#444",
    },
    infoCloseButton: {
        marginTop: 20,
        alignSelf: "flex-end",
        backgroundColor: "#007AFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    infoCloseButtonText: {
        color: "white",
        fontWeight: "600",
    },
});
