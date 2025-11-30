import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { samplePosts } from '../app_components/data/posts';
import { Post } from '../app_components/models/Post';
import { navigateToChat, navigateToProfile } from "./utility/navigation";
import { commonStyles } from "@/styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { getDistance } from "geolib";
import { useUserStore } from "./store/users";
import { SafeAreaView } from "react-native-safe-area-context";

interface ListScreenProps {
    setActiveScreen: React.Dispatch<React.SetStateAction<'map' | 'list'>>;
}

const ListScreen: React.FC<ListScreenProps> = ({ setActiveScreen }) => {
    const [filter, setFilter] = useState<'all' | 'offer' | 'request'>('all');
    const [filterVisible, setFilterVisible] = useState(false);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const users = useUserStore((state) => state.users);
    const filteredPosts = samplePosts.filter((post) => {
        if (filter === 'all') return true;
        return post.type === filter;
    });

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Location permission is required.');
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        })();
    }, []);

    const renderItem = ({ item }: { item: Post }) => {
        const distance =
            location
                ? getDistance(
                    { latitude: location.coords.latitude, longitude: location.coords.longitude },
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
    };

    return (
        <SafeAreaView style={styles.container}>


            {/* Search & Filter header */}
            {/* Header */}
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerTitle}>Linkfort</Text>
            </View>
            <View style={styles.banner}>
                <TouchableOpacity style={styles.bannerButton} onPress={() => setActiveScreen("map")} >
                    <Text style={{ color: "white" }}>Map View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bannerButton}
                    onPress={() => setFilterVisible(!filterVisible)}
                >
                    <Text style={{ color: "white" }}>Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Dropdown overlay */}
            {filterVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() => {
                            setFilter('offer');
                            setFilterVisible(false);
                        }}>
                        <Text>Offers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() => {
                            setFilter('request');
                            setFilterVisible(false);
                        }}>
                        <Text>Requests</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() => {
                            setFilter('all');
                            setFilterVisible(false);
                        }}>
                        <Text>Show All</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* List */}
            <FlatList
                data={filteredPosts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{
                    padding: 10,
                    paddingBottom: 80
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


        </SafeAreaView>
    );
};

export default ListScreen;

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
    banner: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderBottomWidth: 1,
        borderColor: "#ddd",
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