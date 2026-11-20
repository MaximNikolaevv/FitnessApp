import {
  ActivityIndicator,
  View,
  Modal,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BG = "#170f0c";
const DANGER = "#d98f6b";

export default function DeleteModal({
  setConfirmVisible,
  confirmVisible,
  onConfirm,
  loading,
}) {
  return (
    <Modal
      visible={confirmVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setConfirmVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalIcon}>
            <Ionicons name="log-out-outline" size={28} color={DANGER} />
          </View>

          <Text style={styles.modalTitle}>Sign out?</Text>

          <Text style={styles.modalText}>
            Are you sure you want to sign out of your account? You can log back
            in anytime.
          </Text>

          <Pressable
            onPress={onConfirm}
            disabled={loading}
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.pressed,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#241915" />
            ) : (
              <Text style={styles.confirmText}>YES, SIGN OUT</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => setConfirmVisible(false)}
            disabled={loading}
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.78)",
  },

  modalContent: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    gap: 14,
    padding: 26,
    borderRadius: 24,
    backgroundColor: BG,
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.35)",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },

  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217,143,107,0.14)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.22)",
    marginBottom: 4,
  },

  modalTitle: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 25,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#fff",
    textAlign: "center",
  },

  modalText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#b9a89f",
    textAlign: "center",
    marginBottom: 8,
  },

  confirmButton: {
    width: "100%",
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
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
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.55)",
    backgroundColor: "rgba(217,143,107,0.06)",
  },

  cancelText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
