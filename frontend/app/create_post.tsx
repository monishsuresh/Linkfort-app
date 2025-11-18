import { Picker } from "@react-native-picker/picker"; // install if not installed
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function CreatePost() {
    const router = useRouter();

    const [postType, setPostType] = useState("offer");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [shareLocation, setShareLocation] = useState(false);

    return (
        <View style={styles.container}>
            {/* Post Type */}
            <Text style={styles.label}>Post Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={postType}
                    onValueChange={(value) => setPostType(value)}
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
                <Text style={styles.label}>Share Location</Text>
                <Switch
                    value={shareLocation}
                    onValueChange={setShareLocation}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    }
});
