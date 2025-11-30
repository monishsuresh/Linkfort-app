import { Platform, StyleSheet } from "react-native";

export const ratingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    banner: {
        height: 60,
        backgroundColor: '#b4b4b4ff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0, // for iOS status bar
    },
    bannerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    inputToolbarContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    inputToolbarPrimary: {
        alignItems: 'center',
    },
    composerTextInput: {
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 10 : 6,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 6,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 18,
    },

    starsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    starButton: {
        padding: 6,
    },
    star: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    primaryButton: { backgroundColor: '#4CAF50' },
    secondaryButton: { backgroundColor: '#999' },
    actionText: { color: 'white', fontWeight: '600' },
    reviewInput: {
        width: "100%",
        minHeight: 60,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginVertical: 12,
        textAlignVertical: "top", // ensures multiline text starts at the top
    },

});