import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    TextInput,
    Modal,
    Platform,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUserStore } from "./app_components/store/users";
import { renderStars } from "./app_components/utility/stars";
import { profileStyles } from "@/styles/profilestyles";
import { commonStyles } from "@/styles/styles";
import { ratingStyles } from "@/styles/ratingStyles";

/**
 * Profile Screen (Expo Router)
 * Path: /profile
 *
 * Notes:
 * - Drop this file into frontend/app/profile.tsx
 * - Add your real images under /assets and update require() if needed.
 * - Replace fake data and callbacks with your API calls.
 */

type Item = {
    id: number;
    name: string;
    status: "Available" | "Borrowed";
    imgUri?: string; // optional remote URL or local asset uri
};

export default function Profile() {
    const router = useRouter();

    const { userId } = useLocalSearchParams();
    const users = useUserStore((state) => state.users);
    const setUserRatingPossible = useUserStore((state) => state.setUserRatingPossible);

    const user = users.find((u) => u.id === userId);
    const [showRateBox, setShowRateBox] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [reviewText, setReviewText] = useState("");

    // ---------------- Render ----------------
    return (
        <SafeAreaView style={profileStyles.safe}>
            <ScrollView contentContainerStyle={profileStyles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={profileStyles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={profileStyles.iconButton}>
                        <Ionicons name="chevron-back" size={26} color="#111" />
                    </TouchableOpacity>
                    <Text style={profileStyles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={profileStyles.iconButton}>
                        <Ionicons name="settings-outline" size={24} color="#111" />
                    </TouchableOpacity>
                </View>

                {/* Profile area */}
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
                        <Text style={profileStyles.name}>{user!.name}</Text>
                        <View style={profileStyles.verifiedBadge}>
                            <Feather name="check" size={14} color="#4F46E5" />
                        </View>
                    </View>

                    <Text style={profileStyles.handle}>{user!.email}</Text>

                    <View style={profileStyles.locationRow}>
                        <Feather name="map-pin" size={14} color="#777" />
                        <Text style={profileStyles.locationText}>Kamp-Lintfort Area</Text>
                    </View>


                </View>

                {/* Trust badge card */}
                <View style={profileStyles.trustCard}>
                    <View style={profileStyles.trustHeader}>
                        <Feather name="shield" size={18} color="#4F46E5" />
                        <Text style={profileStyles.trustTitle}>Trust Badge</Text>
                    </View>

                    <View style={profileStyles.trustStats}>
                        <View style={profileStyles.statBlock}>
                            <Text style={profileStyles.statNumber}>{user!.exchanges}</Text>
                            <Text style={profileStyles.statLabel}>Exchanges</Text>
                        </View>
                        <View style={profileStyles.statBlock}>
                            <Text style={profileStyles.statNumber}>100%</Text>
                            <Text style={profileStyles.statLabel}>On-time</Text>
                        </View>
                    </View>

                    <View style={profileStyles.starsRow}>
                        <Text style={profileStyles.stars}>
                            {user!.rating?.toFixed(1)} {renderStars(user!.rating ?? 0)}
                        </Text>
                    </View>
                </View>

                {/* user rating */}
                {user!.plyrExchanges > 0 && (
                    <>
                        <Text style={profileStyles.sectionTitle}>
                            You have had {user!.plyrExchanges} exchanges with {user!.name}
                        </Text>
                        <TouchableOpacity
                            style={[
                                profileStyles.rateButton,
                                !user!.ratingPossible && { backgroundColor: "#ccc" }, // optional: greyed out if disabled
                            ]}
                            onPress={() => {
                                if (user!.ratingPossible) setShowRateBox(true);
                            }}
                            disabled={!user!.ratingPossible} // disables button interaction
                        >
                            <Text style={profileStyles.rateButtonText}>
                                {user!.ratingPossible
                                    ? "Rate User"
                                    : `You have rated ${user!.name}`}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}


                {/* Spacer so floating Add button doesn't cover content */}
                <View style={{ height: 120 }} />
            </ScrollView>

            <Modal
                visible={showRateBox}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowRateBox(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowRateBox(false)}>
                    <View style={ratingStyles.modalBackdrop}>
                        <KeyboardAvoidingView
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            behavior={Platform.OS === "ios" ? "padding" : "height"} // Android handles it automatically
                            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // adjust if needed
                        >
                            <ScrollView
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    paddingHorizontal: 20,
                                }}
                                keyboardShouldPersistTaps="handled"
                            >
                                <TouchableWithoutFeedback onPress={() => { }}>
                                    <View style={ratingStyles.modalContainer}>
                                        {/* Close Button */}
                                        <TouchableOpacity
                                            style={commonStyles.closeButton}
                                            onPress={() => setShowRateBox(false)}
                                        >
                                            <Text style={commonStyles.closeText}>✕</Text>
                                        </TouchableOpacity>

                                        <Text style={ratingStyles.modalTitle}>Rate user</Text>
                                        <Text style={ratingStyles.modalSubtitle}>Tap the stars to rate</Text>

                                        {/* ⭐ STAR SELECTOR */}
                                        <View style={ratingStyles.starsRow}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <TouchableOpacity
                                                    key={star}
                                                    onPress={() => setSelectedStars(star)}
                                                    style={ratingStyles.starButton}
                                                >
                                                    <Text
                                                        style={[
                                                            ratingStyles.star,
                                                            { color: star <= selectedStars ? "#FFD700" : "#CCCCCC" },
                                                        ]}
                                                    >
                                                        ★
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>

                                        {/* Optional Review TextInput */}
                                        <TextInput
                                            style={ratingStyles.reviewInput}
                                            placeholder="Write an optional review..."
                                            value={reviewText}
                                            onChangeText={setReviewText}
                                            multiline
                                        />

                                        {/* Submit Button */}
                                        <TouchableOpacity
                                            style={[
                                                ratingStyles.submitButton,
                                                { opacity: selectedStars === 0 ? 0.4 : 1 },
                                            ]}
                                            disabled={selectedStars === 0}
                                            onPress={() => {
                                                console.log("User rated:", selectedStars);
                                                console.log("Review text:", reviewText);
                                                setUserRatingPossible(user!.id, false);
                                                setShowRateBox(false);
                                                setSelectedStars(0);
                                                setReviewText(""); // reset the input
                                            }}
                                        >
                                            <Text style={ratingStyles.submitText}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>


        </SafeAreaView>
    );
}