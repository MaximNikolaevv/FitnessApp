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
const DANGER = "#ff6b6b";

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
            <Ionicons name="trash-outline" size={28} color={DANGER} />
          </View>

          <Text style={styles.modalTitle}>Delete profile?</Text>

          <Text style={styles.modalText}>
            Are you sure? Your account and all your data will be permanently
            deleted.
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
              <Text style={styles.confirmText}>YES, DELETE</Text>
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
});
