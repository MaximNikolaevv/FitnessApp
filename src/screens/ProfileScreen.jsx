import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DeleteModal from "../components/DeleteModal";
import { authApi } from "../backend";

const BG = "#170f0c";
const DANGER = "#ff6b6b";

export default function ProfileScreen({ navigation }) {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await authApi.logoutUser();
    } catch (error) {
      Alert.alert("Action failed", error?.message ?? "Please try again.");
    } finally {
      setConfirmVisible(false);
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require("../../img/ProfileScreen.jpg")}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />

      <LinearGradient
        colors={[
          "rgba(23,15,12,0.30)",
          "rgba(23,15,12,0.20)",
          "rgba(23,15,12,0.40)",
          "rgba(23,15,12,0.82)",
          BG,
        ]}
        locations={[0, 0.35, 0.58, 0.85, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Danger zone */}
      <View style={styles.content}>
        <View style={styles.dangerCard}>
          <View style={styles.dangerHeader}>
            <View style={styles.dangerIcon}>
              <Ionicons name="warning-outline" size={18} color={DANGER} />
            </View>
            <Text style={styles.dangerKicker}>DANGER ZONE</Text>
          </View>

          <Text style={styles.dangerText}>
            Deleting your profile removes your account and all your data. This
            cannot be undone.
          </Text>

          <Pressable
            onPress={() => setConfirmVisible(true)}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="trash-outline" size={18} color={DANGER} />
            <Text style={styles.deleteText}>DELETE PROFILE</Text>
          </Pressable>
        </View>
      </View>

      <DeleteModal
        confirmVisible={confirmVisible}
        setConfirmVisible={setConfirmVisible}
        onConfirm={handleDelete}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  // Danger card
  dangerCard: {
    gap: 14,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "rgba(23,15,12,0.78)",
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.30)",
  },
  dangerHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  dangerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,107,107,0.14)",
  },
  dangerKicker: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
    letterSpacing: 2.5,
    color: DANGER,
  },
  dangerText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "#d8cbc4",
  },
  deleteButton: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255,107,107,0.55)",
    backgroundColor: "rgba(255,107,107,0.08)",
  },
  deleteText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 16,
    letterSpacing: 2,
    color: DANGER,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    gap: 12,
    padding: 24,
    borderRadius: 20,
    backgroundColor: BG,
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.35)",
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,107,107,0.14)",
    marginBottom: 4,
  },
  modalTitle: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 24,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#fff",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: "#b9a89f",
    textAlign: "center",
    marginBottom: 8,
  },
  confirmButton: {
    width: "100%",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: DANGER,
  },
  confirmText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 16,
    letterSpacing: 2,
    color: "#241915",
  },
  cancelButton: {
    width: "100%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.55)",
  },
  cancelText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },

  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
