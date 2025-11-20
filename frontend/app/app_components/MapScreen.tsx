import { commonStyles } from '@/styles/styles';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { samplePosts } from '../app_components/data/posts';
import { Post } from '../app_components/models/Post';

interface MapScreenProps {
    setActiveScreen: React.Dispatch<React.SetStateAction<'map' | 'list'>>;
}

const MapScreen: React.FC<MapScreenProps> = ({ setActiveScreen }) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [region, setRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);

    const [posts, setPosts] = useState<Post[]>(samplePosts);

    const [filter, setFilter] = useState<'all' | 'offer' | 'request'>('all');
    const [filterVisible, setFilterVisible] = useState(false);

    const filteredPosts = samplePosts.filter((post) => {
        if (filter === 'all') return true;
        return post.type === filter;
    });

    useEffect(() => {
        (async () => {
            // Ask for permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Location permission is required to show the map.');
                setLoading(false);
                return;
            }

            // Get current location
            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);

            // Set map region around current location
            setRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!region) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            {/* banner */}
            <View style={commonStyles.banner}>
                <TouchableOpacity style={commonStyles.bannerButton}>
                    <Text style={{ color: "white" }}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.bannerButton}
                    onPress={() => setFilterVisible(!filterVisible)}
                >
                    <Text style={{ color: "white" }}>Filter</Text>
                </TouchableOpacity>
            </View>

            {filterVisible && (
                <View style={commonStyles.dropdown}>
                    <TouchableOpacity
                        style={commonStyles.dropdownOption}
                        onPress={() => {
                            setFilter('offer');
                            setFilterVisible(false);
                        }}>
                        <Text>Offers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={commonStyles.dropdownOption}
                        onPress={() => {
                            setFilter('request');
                            setFilterVisible(false);
                        }}>
                        <Text>Requests</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={commonStyles.dropdownOption}
                        onPress={() => {
                            setFilter('all');
                            setFilterVisible(false);
                        }}>
                        <Text>Show All</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* map */}
            <MapView
                style={styles.map}
                region={region}
            //  showsUserLocation 
            //followsUserLocation
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="You are here"
                    />
                )}

                {filteredPosts.map((post) => (
                    <Marker
                        key={post.id}
                        coordinate={{
                            latitude: post.location.latitude,
                            longitude: post.location.longitude,
                        }}
                        title={post.type}
                        description={post.name}
                        anchor={{ x: 0.5, y: 0.5 }} // center the marker
                        image={
                            post.type === "offer"
                                ? require("../../assets/images/marker blue.png")
                                : require("../../assets/images/marker green.png")
                        }
                    />
                ))}
            </MapView>

            <View style={styles.buttonContainer}>
                <Button title="List View" onPress={() => setActiveScreen("list")} />
            </View>
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
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
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
});
