import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ACCENT = "#d98f6b";
const DANGER = "#ff6b6b";

export function confirmDelete(title, onConfirm) {
  Alert.alert(title, "This cannot be undone.", [
    { text: "Cancel", style: "cancel" },
    { text: "Delete", style: "destructive", onPress: onConfirm },
  ]);
}

export default function ItemActions({ onEdit, onDelete, size = 34 }) {
  const shape = { width: size, height: size, borderRadius: size / 2 };
  const iconSize = Math.round(size * 0.5);

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onEdit}
        hitSlop={4}
        style={({ pressed }) => [
          styles.button,
          shape,
          styles.edit,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="create-outline" size={iconSize} color={ACCENT} />
      </Pressable>

      <Pressable
        onPress={onDelete}
        hitSlop={4}
        style={({ pressed }) => [
          styles.button,
          shape,
          styles.delete,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="trash-outline" size={iconSize} color={DANGER} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8 },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  edit: {
    borderColor: "rgba(217,143,107,0.55)",
    backgroundColor: "rgba(23,15,12,0.65)",
  },
  delete: {
    borderColor: "rgba(255,107,107,0.55)",
    backgroundColor: "rgba(255,107,107,0.10)",
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.94 }] },
});
