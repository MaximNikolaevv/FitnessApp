
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DeleteModal from "../components/SignOutModal";
import { authApi } from "../backend";

const BG = "#170f0c";
const DANGER = "#d98f6b";

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

      {/* Sign Out */}
      <View style={styles.content}>
        <View style={styles.dangerCard}>
          <View style={styles.dangerHeader}>
            <View style={styles.dangerIcon}>
              <Ionicons name="log-out-outline" size={18} color={DANGER} />
            </View>

            <Text style={styles.dangerKicker}>SIGN OUT</Text>
          </View>

          <Text style={styles.dangerText}>
            You are about to sign out of your account. You can log back in
            anytime to access your workouts and personal data.
          </Text>

          <Pressable
            onPress={() => setConfirmVisible(true)}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="log-out-outline" size={18} color={DANGER} />
            <Text style={styles.deleteText}>SIGN OUT</Text>
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
  screen: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 28,
  },

  dangerCard: {
    gap: 18,
    padding: 22,
    borderRadius: 22,
    backgroundColor: "rgba(23,15,12,0.88)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.35)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  dangerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  dangerIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217,143,107,0.13)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.18)",
  },

  dangerKicker: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    letterSpacing: 2.5,
    color: DANGER,
  },

  dangerText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#d8cbc4",
  },

  deleteButton: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "rgba(217,143,107,0.55)",
    backgroundColor: "rgba(217,143,107,0.09)",
  },

  deleteText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 16,
    letterSpacing: 2,
    color: DANGER,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
