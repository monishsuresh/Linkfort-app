import { Button, StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native"
import { useUserStore } from "./store/users";
import { samplePosts } from "./data/posts";
import { useState } from "react";
import { Post } from "./models/Post";
import { getDistance } from "geolib";
import { navigateToChat, navigateToProfile } from "./utility/navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { commonStyles } from "@/styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

type Props = {
    filter: 'all' | 'offer' | 'request';
};

const ListScreen = ({ filter }: Props) => {

    const userLat = 51.5;
    const userLong = 6.55;

    const users = useUserStore((state) => state.users);
    const filteredPosts = samplePosts.filter((post) => {
        if (filter === 'all') return true;
        return post.type === filter;
    });

    const renderItem = ({ item }: { item: Post }) => {
        const distance =
            item.location
                ? getDistance(
                    { latitude: userLat, longitude: userLong },
                    { latitude: item.location.latitude, longitude: item.location.longitude }
                ) / 1000 // meters -> km
                : null;
        return (
            <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>

                {distance !== null && (
                    <View style={commonStyles.distanceRow}>
                        <MaterialIcons name="place" size={16} color="#666" style={{ marginRight: 4 }} />
                        <Text style={commonStyles.postDistance}>{distance.toFixed(1)} km away</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => navigateToProfile(item.userId)}>
                    <Text style={[styles.user, { textDecorationLine: "underline", color: "#007AFF" }]}>
                        by {users.find((u) => u.id === item.userId)?.name}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.type}>
                    {item.type === "offer" ? "🟢 Offer" : "🔵 Request"}
                </Text>
                <Text style={styles.details}>{item.details}</Text>
                <View style={styles.contactButton}>
                    <Button
                        title="Contact"
                        onPress={() => navigateToChat(item)} // alert(`Contacting ${item.user}`)
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            {/* List */}
            <FlatList
                data={filteredPosts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{
                    padding: 10,
                    // paddingBottom: 80
                }}
            />

            {/* post button */}
            <View style={styles.buttonContainer2}>
                <TouchableOpacity onPress={() => router.push('/create_post')}
                    style={{
                        backgroundColor: "#007AFF",
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 24 }}>+</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 20,
    },
    card: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
    },
    type: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 4,
    },
    details: {
        fontSize: 14,
        color: "#444",
        marginTop: 6,
        lineHeight: 18,
    },
    coords: {
        fontSize: 12,
        color: "#777",
        marginTop: 6,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    buttonContainer2: {
        position: "absolute",
        bottom: 20,
        right: 20,
        borderRadius: 20,
    },
    contactButton: {
        marginTop: 10,
        alignSelf: "flex-start", // button aligns to left, change to 'center' if you want
    },
    user: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    bannerButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#42a301ff",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    bannerText: {
        marginLeft: 6,
        fontSize: 16,
        color: "white"
    },
    dropdown: {
        position: "absolute",
        top: 60,              // adjust depending on your header height
        right: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        width: 160,
        zIndex: 999,          // ensures it stays on top
        elevation: 10,
        paddingVertical: 5,
    },
    dropdownOption: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    dropdownText: {
        fontSize: 16,
    },

});

export default ListScreen;