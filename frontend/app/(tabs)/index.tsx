import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MapScreen from "../app_components/MapScreen";
import ListScreen from "../app_components/ListScreen";
import { commonStyles } from "@/styles/styles";

export default function HomeScreen() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const [filter, setFilter] = useState<'all' | 'offer' | 'request'>('all');
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Linkfort</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#6B7280" />
        <TextInput
          placeholder="Search items..."
          style={styles.searchInput}
        />
      </View>

      {/* Controls */}
      <View style={styles.controlsRow}>
        <View style={styles.segment}>
          <TouchableOpacity
            onPress={() => setViewMode("list")}
            style={[
              styles.segmentBtn,
              viewMode === "list" && styles.segmentActive,
            ]}
          >
            <Ionicons name="list-outline" size={18} />
            <Text
              style={[
                styles.segmentText,
                viewMode === "list" && styles.segmentTextActive,
              ]}
            >
              List
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setViewMode("map")}
            style={[
              styles.segmentBtn,
              viewMode === "map" && styles.segmentActive,
            ]}
          >
            <Ionicons name="map-outline" size={18} />
            <Text
              style={[
                styles.segmentText,
                viewMode === "map" && styles.segmentTextActive,
              ]}
            >
              Map
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilterVisible(!filterVisible)}>
          <Ionicons name="filter-outline" size={18} />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown overlay */}
      {filterVisible && (
        <>
          {/* BACKDROP - tap here to close */}
          <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
            <View style={commonStyles.backdrop} />
          </TouchableWithoutFeedback>

          {/* DROPDOWN */}
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setFilter('offer');
                setFilterVisible(false);
              }}>
              <Text>Offers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setFilter('request');
                setFilterVisible(false);
              }}>
              <Text>Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setFilter('all');
                setFilterVisible(false);
              }}>
              <Text>Show All</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Content */}
      {viewMode === "map" ? (
        <MapScreen filter={filter} />
        // <View>
        //   <Text style={styles.filterText}>map screen</Text>
        // </View>
      ) : (
        <ListScreen filter={filter} />
        // <View>
        //   list screen
        // </View>
      )}
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 8,
  },

  segment: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
  },
  segmentBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  segmentActive: {
    backgroundColor: "#6366F1",
  },
  segmentText: {
    marginLeft: 6,
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#fff",
  },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  filterText: {
    fontWeight: "600",
  },

  map: {
    flex: 1,
  },

  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});