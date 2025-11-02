import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ListScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>List Screen</Text>
        </View>
    );
};

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
