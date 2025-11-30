import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
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

    sectionTitle: { marginTop: 16, marginHorizontal: 16, textAlign: "center", fontSize: 18, fontWeight: "800" },

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



    rateButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: "center", // button aligns to start of text
        marginTop: 10,
    },
    rateButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },


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

})