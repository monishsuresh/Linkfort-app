import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useUserStore } from "./app_components/store/users";
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
    const { userId } = useLocalSearchParams();
    const users = useUserStore((state) => state.users);

    const user = users.find((u) => u.id === userId);

    if (!user) {
        return (
            <View style={styles.center}>
                <Text>User not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FontAwesome name="user" size={120} color="#666" style={styles.avatarIcon} />

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{user.exchanges}</Text>
                    <Text style={styles.statLabel}>Exchanges</Text>
                </View>

                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{user.rating.toFixed(1)}</Text>
                    <Text style={styles.statLabel}>Rating ⭐</Text>
                </View>
            </View>

            <Button title="Message User" onPress={() => router.push("/chat_screen")} />
        </View>
    );
}

const styles = StyleSheet.create({
    avatarIcon: {
        marginBottom: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
    },
    email: {
        color: "#555",
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginVertical: 20,
    },
    statBox: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 22,
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: 14,
        color: "#666",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    banner: {
        flexDirection: "row",        // lay out arrow and name horizontally
        alignItems: "center",        // vertically center them
        paddingTop: 50,              // leave space for status bar (adjust as needed)
        paddingBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: "#fff",     // banner background
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",   // optional bottom border
    },
    backArrow: {
        fontSize: 24,                // size of the arrow
        marginRight: 15,             // space between arrow and name
        color: "#007AFF",            // iOS blue, change as needed
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
});