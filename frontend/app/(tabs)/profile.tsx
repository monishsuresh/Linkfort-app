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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

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

    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [items, setItems] = useState<Item[]>([
        {
            id: 1,
            name: "Camping Tent",
            status: "Available",
            imgUri: undefined,
        },
        {
            id: 2,
            name: "Bluetooth Speaker",
            status: "Borrowed",
            imgUri: undefined,
        },
        {
            id: 3,
            name: "Electric Grill",
            status: "Available",
            imgUri: undefined,
        },
    ]);

    // ---------------- Image picker ----------------
    const pickImage = async () => {
        // ask permission
        const permResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permResult.granted) {
            Alert.alert("Permission required", "Permission to access photos is required.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
            aspect: [1, 1],
        });

        // if (!result.cancelled) {
        //   setAvatarUri(result.uri);
        //   // TODO: upload to server here with FormData
        // }
    };

    // ---------------- Password change ----------------
    const onSavePassword = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New password and confirm password do not match.");
            return;
        }
        // TODO: call API to change password with currentPassword & newPassword
        Alert.alert("Success", "Password changed successfully.");
        setPasswordModalVisible(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    // ---------------- Item actions ----------------
    const onEditItem = (item: Item) => {
        // navigate to edit screen or open modal
        // router.push(`/items/edit?id=${item.id}`);
    };

    const onDeleteItem = (item: Item) => {
        Alert.alert("Delete item", `Are you sure you want to delete "${item.name}"?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => setItems((prev) => prev.filter((i) => i.id !== item.id)),
            },
        ]);
    };

    // ---------------- Render ----------------
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <Ionicons name="chevron-back" size={26} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="settings-outline" size={24} color="#111" />
                    </TouchableOpacity>
                </View>

                {/* Profile area */}
                <View style={styles.profileArea}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={
                                avatarUri
                                    ? { uri: avatarUri }
                                    : require("../../assets/images/profile-placeholder.png") // fallback asset – place an image in assets
                            }
                            style={styles.avatar}
                        />
                        {/* small green status */}
                        <View style={styles.onlineDot} />
                    </View>
                    {/* small action row (Upload photo + change password) */}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity style={styles.smallBtn} onPress={pickImage}>
                            <Feather name="image" size={16} color="#4F46E5" />
                            <Text style={styles.smallBtnText}>Upload Photo</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.nameRow}>
                        <Text style={styles.name}>Jamie S.</Text>
                        <View style={styles.verifiedBadge}>
                            <Feather name="check" size={14} color="#4F46E5" />
                        </View>
                    </View>

                    <Text style={styles.handle}>@jamie_neighbor</Text>

                    <View style={styles.locationRow}>
                        <Feather name="map-pin" size={14} color="#777" />
                        <Text style={styles.locationText}>Kamp-Lintfort Area</Text>
                    </View>

                    <TouchableOpacity style={styles.editProfileBtn}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>


                </View>

                {/* Trust badge card */}
                <View style={styles.trustCard}>
                    <View style={styles.trustHeader}>
                        <Feather name="shield" size={18} color="#4F46E5" />
                        <Text style={styles.trustTitle}>Trust Badge</Text>
                    </View>

                    <View style={styles.trustStats}>
                        <View style={styles.statBlock}>
                            <Text style={styles.statNumber}>8</Text>
                            <Text style={styles.statLabel}>Exchanges</Text>
                        </View>
                        <View style={styles.statBlock}>
                            <Text style={styles.statNumber}>100%</Text>
                            <Text style={styles.statLabel}>On-time</Text>
                        </View>
                    </View>

                    <View style={styles.starsRow}>
                        <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                    </View>
                </View>

                {/* Settings list */}
                <View style={styles.settingsList}>
                    <TouchableOpacity style={styles.settingItem}>
                        <Feather name="shield" size={20} color="#4F46E5" />
                        <View style={{ marginLeft: 12, flex: 1 }}>
                            <Text style={styles.settingTitle}>Moderation Reports</Text>
                            <Text style={styles.settingSub}>View and submit community moderation reports</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <Feather name="bell" size={20} color="#4F46E5" />
                        <View style={{ marginLeft: 12, flex: 1 }}>
                            <Text style={styles.settingTitle}>Multilingual Settings</Text>
                            <Text style={styles.settingSub}>Manage your preferred app language</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* My Items heading */}
                <Text style={styles.sectionTitle}>My Items</Text>

                {/* Items list */}
                <View style={{ marginBottom: 32 }}>
                    {items.map((it) => (
                        <View key={it.id} style={styles.itemCard}>
                            <Image
                                source={
                                    it.imgUri
                                        ? { uri: it.imgUri }
                                        : require("../../assets/images/item-placeholder.png") // fallback asset
                                }
                                style={styles.itemImage}
                            />

                            <View style={styles.itemMeta}>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemName}>{it.name}</Text>
                                    <View style={[styles.statusPill, it.status === "Available" ? styles.available : styles.borrowed]}>
                                        <Text style={styles.statusText}>{it.status}</Text>
                                    </View>
                                </View>

                                <View style={styles.itemActions}>
                                    <TouchableOpacity style={styles.actionButton} onPress={() => onEditItem(it)}>
                                        <Feather name="edit" size={16} color="#333" />
                                        <Text style={styles.actionText}>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.actionButton} onPress={() => onDeleteItem(it)}>
                                        <Feather name="trash-2" size={16} color="#e3342f" />
                                        <Text style={[styles.actionText, { color: "#e3342f" }]}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Spacer so floating Add button doesn't cover content */}
                <View style={{ height: 120 }} />
            </ScrollView>



            {/* Password modal */}
            <Modal visible={passwordModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Change Password</Text>

                        <TextInput
                            placeholder="Current password"
                            secureTextEntry
                            style={styles.input}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
                        <TextInput
                            placeholder="New password"
                            secureTextEntry
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TextInput
                            placeholder="Confirm new password"
                            secureTextEntry
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalCancel} onPress={() => setPasswordModalVisible(false)}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalSave} onPress={onSavePassword}>
                                <Text style={styles.modalSaveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#FBFBFD" },
    scrollContent: { paddingBottom: 40 },

    header: {
        height: 60,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#eee",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconButton: { padding: 6 },
    headerTitle: { fontSize: 18, fontWeight: "700" },

    profileArea: {
        alignItems: "center",
        paddingVertical: 18,
        backgroundColor: "#fff",
        marginTop: 8,
    },
    avatarWrapper: { position: "relative" },
    avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: "#ddd" },
    onlineDot: {
        position: "absolute",
        right: -2,
        bottom: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#4ADE80",
        borderWidth: 3,
        borderColor: "#fff",
    },
    nameRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
    name: { fontSize: 20, fontWeight: "800", marginRight: 8 },
    verifiedBadge: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: "#EEF2FF",
        alignItems: "center",
        justifyContent: "center",
    },
    handle: { color: "#6B7280", marginTop: 4 },
    locationRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
    locationText: { color: "#6B7280", marginLeft: 6 },

    editProfileBtn: {
        marginTop: 12,
        width: "86%",
        backgroundColor: "#F3F4F6",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    editProfileText: { fontWeight: "600", color: "#374151" },

    actionsRow: {
        marginTop: 12,
        width: "86%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    smallBtn: {
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8 as any,
        borderWidth: 1,
        borderColor: "#EFEFF2",
    },
    smallBtnText: { marginLeft: 8, color: "#4F46E5", fontWeight: "600" },

    trustCard: {
        marginHorizontal: 14,
        marginTop: 18,
        backgroundColor: "#F3F4FF",
        borderRadius: 16,
        padding: 16,
    },
    trustHeader: { flexDirection: "row", alignItems: "center" },
    trustTitle: { marginLeft: 8, fontWeight: "700" },
    trustStats: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
    statBlock: { alignItems: "center", flex: 1 },
    statNumber: { fontSize: 28, fontWeight: "900", color: "#4F46E5" },
    statLabel: { color: "#6B7280" },
    starsRow: { alignItems: "center", marginTop: 8 },
    stars: { fontSize: 18 },

    settingsList: { marginTop: 18 },
    settingItem: {
        backgroundColor: "#fff",
        marginHorizontal: 14,
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    settingTitle: { fontWeight: "700" },
    settingSub: { color: "#6B7280", marginTop: 3 },

    sectionTitle: { marginTop: 16, marginLeft: 18, fontSize: 18, fontWeight: "800" },

    itemCard: {
        backgroundColor: "#fff",
        marginHorizontal: 14,
        borderRadius: 14,
        padding: 12,
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    itemImage: { width: 72, height: 72, borderRadius: 10, backgroundColor: "#EFEFF3" },
    itemMeta: { flex: 1, marginLeft: 12 },
    itemRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    itemName: { fontWeight: "700", fontSize: 16 },
    statusPill: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    statusText: { fontWeight: "700", fontSize: 12 },
    available: { backgroundColor: "#ECFDF5" },
    borrowed: { backgroundColor: "#FFF7ED" },

    itemActions: { flexDirection: "row", marginTop: 10, gap: 10 as any },
    actionButton: { flexDirection: "row", alignItems: "center", gap: 8 as any },
    actionText: { marginLeft: 6, color: "#374151", fontWeight: "600" },






    /* Modal */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalCard: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
    },
    modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 10,
        borderRadius: 8,
        marginTop: 8,
    },
    modalActions: { marginTop: 12, flexDirection: "row", justifyContent: "flex-end", gap: 10 as any },
    modalCancel: { padding: 10 },
    modalCancelText: { color: "#6B7280", fontWeight: "700" },
    modalSave: { backgroundColor: "#4F46E5", padding: 10, borderRadius: 8 },
    modalSaveText: { color: "#fff", fontWeight: "700" },
});
