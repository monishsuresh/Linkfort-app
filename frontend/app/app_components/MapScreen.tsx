import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useUserStore } from './store/users';
import { samplePosts } from './data/posts';
import { Post } from './models/Post';
import { getDistance } from 'geolib';
import { navigateToChat, navigateToProfile } from './utility/navigation';
import { commonStyles } from '@/styles/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

type Props = {
    filter: 'all' | 'offer' | 'request';
};

const MapScreen = ({ filter }: Props) => {

    const userLat = 51.5;
    const userLong = 6.55;

    const users = useUserStore((state) => state.users);
    // const [filter, setFilter] = useState<'all' | 'offer' | 'request'>('all');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const filteredPosts = samplePosts.filter((post) => {
        if (filter === 'all') return true;
        return post.type === filter;
    });

    const distance =
        selectedPost
            ? getDistance(
                { latitude: userLat, longitude: userLong },
                { latitude: selectedPost.location.latitude, longitude: selectedPost.location.longitude }
            ) / 1000
            : null;

    return (
        <View style={styles.map}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: userLat,
                    longitude: userLong,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                }}
            >
                <Marker
                    coordinate={{ latitude: 51.498, longitude: 6.54 }}
                    title="You are here"
                />

                {filteredPosts.map((post) => (
                    <Marker
                        key={post.id}
                        coordinate={{
                            latitude: post.location.latitude,
                            longitude: post.location.longitude,
                        }}
                        onPress={() => setSelectedPost(post)} // <-- select marker
                        image={
                            post.type === "offer"
                                ? require("../../assets/images/marker blue.png")
                                : require("../../assets/images/marker green.png")
                        }
                    />
                ))}

            </MapView>
            {/* Modal to show marker info */}
            {selectedPost && (
                <Modal
                    transparent={true}
                    visible={true}
                    onRequestClose={() => setSelectedPost(null)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.postTitle}>{selectedPost.name}</Text>

                            {distance !== null && (
                                <View style={commonStyles.distanceRow}>
                                    <MaterialIcons name="place" size={16} color="#666" style={{ marginRight: 4 }} />
                                    <Text style={commonStyles.postDistance}>{distance.toFixed(1)} km away</Text>
                                </View>
                            )}

                            <TouchableOpacity onPress={() => navigateToProfile(selectedPost.userId)}>
                                <Text style={[styles.user, { textDecorationLine: "underline", color: "#007AFF" }]}>
                                    by {users.find((u) => u.id === selectedPost.userId)?.name}
                                </Text>
                            </TouchableOpacity>
                            <Text style={commonStyles.type}>
                                {selectedPost.type === "offer" ? "🔵 Offer" : "🟢 Request"}
                            </Text>
                            <Text style={styles.postDescription}>{selectedPost.details}</Text>
                            <TouchableOpacity
                                style={styles.contactButton}
                                onPress={() => {
                                    navigateToChat(selectedPost);
                                    setSelectedPost(null);
                                }}
                            >
                                <Text style={styles.contactButtonText}>Contact</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.contactButton, { marginTop: 10 }]}
                                onPress={() => setSelectedPost(null)}
                            >
                                <Text style={styles.contactButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Legend */}
            <View style={styles.legend}>
                <View style={styles.row}>
                    <View style={[styles.dot, { backgroundColor: 'blue' }]} />
                    <Text>Offers</Text>
                </View>
                <View style={styles.row}>
                    <View style={[styles.dot, { backgroundColor: '#11f724ff' }]} />
                    <Text>Requests</Text>
                </View>
            </View>

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
    map: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    filterButtonContainer: {
        position: "absolute",
        bottom: 80,   // above the + button (which is bottom: 20)
        right: 20,
    },
    calloutContainer: {
        width: 200,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 5,
    },
    postTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    postUser: {
        fontStyle: 'italic',
        marginBottom: 4,
    },
    postDescription: {
        marginBottom: 8,
    },
    contactButton: {
        backgroundColor: '#007bff',
        paddingVertical: 6,
        borderRadius: 4,
        alignItems: 'center',
    },
    contactButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    user: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    legend: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: 8,
    },
})

export default MapScreen;