import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
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