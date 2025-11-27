import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 20,
    },
});