import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useUserStore } from "./app_components/store/users";
import { Feather, FontAwesome } from '@expo/vector-icons';
import { commonStyles } from "@/styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { profileStyles } from "@/styles/profilestyles";

export default function ProfileScreen() {
    const { userId } = useLocalSearchParams();
    const users = useUserStore((state) => state.users);

    const user = users.find((u) => u.id === userId);

    if (!user) {
        return (
            <View>
                <Text>User not found.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={profileStyles.safe}>
            {/* <FontAwesome name="user" size={120} color="#666" style={styles.avatarIcon} />

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text> */}

            <View style={profileStyles.profileArea}>
                <View style={profileStyles.avatarWrapper}>
                    <Image
                        source={
                            require("../assets/images/profile-placeholder.png") // fallback asset – place an image in assets
                        }
                        style={profileStyles.avatar}
                    />
                    {/* small green status */}
                    <View style={profileStyles.onlineDot} />
                </View>

                <View style={profileStyles.nameRow}>
                    <Text style={profileStyles.name}>Jamie S.</Text>
                    <View style={profileStyles.verifiedBadge}>
                        <Feather name="check" size={14} color="#4F46E5" />
                    </View>
                </View>

                <Text style={profileStyles.handle}>@jamie_neighbor</Text>

                <View style={profileStyles.locationRow}>
                    <Feather name="map-pin" size={14} color="#777" />
                    <Text style={profileStyles.locationText}>Kamp-Lintfort Area</Text>
                </View>


            </View>

            {/* Trust badge card */}
            <View style={commonStyles.trustCard}>
                <View style={commonStyles.trustHeader}>
                    <Feather name="shield" size={18} color="#4F46E5" />
                    <Text style={commonStyles.trustTitle}>Trust Badge</Text>
                </View>

                <View style={commonStyles.trustStats}>
                    <View style={commonStyles.statBlock}>
                        <Text style={commonStyles.statNumber}>8</Text>
                        <Text style={commonStyles.statLabel}>Exchanges</Text>
                    </View>
                    <View style={commonStyles.statBlock}>
                        <Text style={commonStyles.statNumber}>100%</Text>
                        <Text style={commonStyles.statLabel}>On-time</Text>
                    </View>
                </View>

                <View style={commonStyles.starsRow}>
                    <Text style={commonStyles.stars}>⭐⭐⭐⭐⭐</Text>
                </View>
            </View>

            <Button title="Message User" onPress={() => router.push("/chat_screen")} />
        </SafeAreaView>
    );
}
