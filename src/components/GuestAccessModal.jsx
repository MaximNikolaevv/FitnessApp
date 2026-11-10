import { View, Modal, Text, Pressable, StyleSheet } from "react-native";

export default function GuestAccessModal({ visible, onClose, onRegister }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create an Account</Text>

          <Text style={styles.description}>
            To access this menu, you need to create an account. Join us and
            unlock all the features!
          </Text>

          <Pressable style={styles.registerButton} onPress={onRegister}>
            <Text style={styles.registerText}>Create Account</Text>
          </Pressable>

          <Pressable style={styles.backButton} onPress={onClose}>
            <Text style={styles.backText}>Go Back</Text>
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
    padding: 24,
    borderRadius: 20,
    backgroundColor: "#170f0c",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.35)",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    color: "#b9a89f",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },

  registerButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#d98f6b",
    marginBottom: 12,
  },

  registerText: {
    color: "#241915",
    fontSize: 16,
    fontWeight: "700",
  },

  backButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.55)",
  },

  backText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
