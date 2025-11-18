import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ListScreen from '../app_components/ListScreen';
import MapScreen from '../app_components/MapScreen';

export default function Index() {
  const [activeScreen, setActiveScreen] = useState<'map' | 'list'>('map');

  return (
    <View style={styles.container}>
      {/* Screen content */}
      {activeScreen === 'map' && <MapScreen setActiveScreen={setActiveScreen} />}
      {activeScreen === 'list' && <ListScreen setActiveScreen={setActiveScreen} />}

      {/* Always visible overlay buttons */}
      {/* <View style={styles.overlay}>
        <Button title="Map View" onPress={() => setActiveScreen('map')} />
        <Button title="List View" onPress={() => setActiveScreen('list')} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
});
