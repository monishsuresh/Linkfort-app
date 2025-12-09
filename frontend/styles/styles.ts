import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 20,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent', // or 'rgba(0,0,0,0.1)' if you want dimming
        zIndex: 1,
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
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 6,
        zIndex: 20,
    },
    closeText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 4,
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
    // header: {
    //     height: 60,
    //     backgroundColor: "#fff",
    //     borderBottomWidth: 1,
    //     borderColor: "#eee",
    //     paddingHorizontal: 16,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // headerTitle: { fontSize: 18, fontWeight: "700" },
    header: {
        height: 60,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "800",
    },
    iconButton: { padding: 6 },
    postDistance: {
        fontSize: 14,
        color: '#666',
    },
    top_banner: {
        height: 120,                 // make the banner taller
        backgroundColor: "#007bff",
        justifyContent: "flex-end",   // push text toward the bottom
        alignItems: "center",
        paddingBottom: 15,            // space between text and bottom edge
    },
    top_banner_text: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 5,           // space between title and user
    },
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
    type: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 4,
    },
    statBlock: { alignItems: "center", flex: 1 },
    statNumber: { fontSize: 28, fontWeight: "900", color: "#4F46E5" },
    statLabel: { color: "#6B7280" },
    starsRow: { alignItems: "center", marginTop: 8 },
    stars: { fontSize: 18 },
});