import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/* ---------- Types ---------- */

type AlertType = "post" | "event" | "urgent";

type AlertItem = {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  time: string;
};

type AlertPreferences = {
  posts: boolean;
  events: boolean;
  urgent: boolean;
};

/* ---------- Mock Alerts ---------- */

const ALERTS: AlertItem[] = [
  {
    id: "1",
    type: "post",
    title: "New Post in Central Park",
    description:
      "Local gardener Jane Doe posted about a lost cat near the community garden.",
    time: "5 minutes ago",
  },
  {
    id: "2",
    type: "urgent",
    title: "Urgent Update: Road Closure",
    description:
      "Main Street between Oak and Elm is temporarily closed due to repairs.",
    time: "2 hours ago",
  },
  {
    id: "3",
    type: "event",
    title: "Community Event: Farmers Market",
    description:
      "This Saturday's Farmers Market will feature fresh produce and live music.",
    time: "Yesterday",
  },
];

/* ---------- Screen ---------- */

export default function Alerts() {
  const [prefsVisible, setPrefsVisible] = useState(false);

  const [preferences, setPreferences] = useState<AlertPreferences>({
    posts: true,
    events: true,
    urgent: true,
  });

  // Filter alerts by preferences
  const filteredAlerts = ALERTS.filter((a) => {
    if (a.type === "post") return preferences.posts;
    if (a.type === "event") return preferences.events;
    if (a.type === "urgent") return preferences.urgent;
    return false;
  });

  const renderIcon = (type: AlertType) => {
    switch (type) {
      case "urgent":
        return (
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={20}
            color="#EF4444"
          />
        );
      case "event":
        return <Ionicons name="star-outline" size={20} color="#EC4899" />;
      default:
        return (
          <Ionicons
            name="document-text-outline"
            size={20}
            color="#4F46E5"
          />
        );
    }
  };

  const renderItem = ({ item }: { item: AlertItem }) => (
    <View style={styles.card}>
      <View style={styles.leftBar} />
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            {renderIcon(item.type)}
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Text style={styles.description} numberOfLines={4}>
          {item.description}
        </Text>

        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
        <Ionicons name="checkmark-done-outline" size={22} color="#111" />
      </View>

      {/* Preferences button */}
      <View style={styles.prefRow}>
        <TouchableOpacity
          style={styles.prefBtn}
          onPress={() => setPrefsVisible(true)}
        >
          <Ionicons name="options-outline" size={16} color="#111" />
          <Text style={styles.prefText}>Preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Alerts list */}
      <FlatList
        data={filteredAlerts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      {/* Preferences modal */}
      <Modal
        visible={prefsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPrefsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Alert Preferences</Text>
              <TouchableOpacity onPress={() => setPrefsVisible(false)}>
                <Ionicons name="close" size={22} color="#111" />
              </TouchableOpacity>
            </View>

            <PreferenceRow
              label="New Posts"
              value={preferences.posts}
              onToggle={(v) =>
                setPreferences((prev) => ({ ...prev, posts: v }))
              }
            />
            <PreferenceRow
              label="Community Events"
              value={preferences.events}
              onToggle={(v) =>
                setPreferences((prev) => ({ ...prev, events: v }))
              }
            />
            <PreferenceRow
              label="Urgent Updates"
              value={preferences.urgent}
              onToggle={(v) =>
                setPreferences((prev) => ({ ...prev, urgent: v }))
              }
            />

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => setPrefsVisible(false)}
            >
              <Text style={styles.saveText}>Save Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------- Preference Row ---------- */

function PreferenceRow({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <View style={styles.prefItem}>
      <Text style={styles.prefLabel}>{label}</Text>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

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

  prefRow: {
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  prefBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  prefText: {
    marginLeft: 6,
    fontWeight: "600",
    color: "#111827",
  },

  list: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
    overflow: "hidden",
  },
  leftBar: {
    width: 4,
    backgroundColor: "#4F46E5",
  },
  cardContent: {
    flex: 1,
    padding: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "800",
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 8,
  },
  description: {
    marginTop: 8,
    color: "#4B5563",
    lineHeight: 20,
  },
  detailsBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  detailsText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#111827",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  prefItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  prefLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  saveBtn: {
    marginTop: 18,
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
