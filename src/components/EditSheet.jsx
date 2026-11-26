import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormField from "./FormField";

const BG = "#170f0c";
const ACCENT = "#d98f6b";
const SOFT = "#d8cbc4";
const LINE = "rgba(255,255,255,0.12)";

export default function EditSheet({
  visible,
  title,
  fields,
  initialValues,
  loading,
  onClose,
  onSave,
}) {
  const insets = useSafeAreaInsets();
  const [values, setValues] = useState(() => initialValues ?? {});
 
  const setValue = (key) => (value) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const result = {};

    for (const field of fields) {
      const raw = String(values[field.key] ?? "").trim();

      if (field.numeric) {
        const num = Number(raw);
        if (raw === "") {
          Alert.alert("Invalid value", `${field.label} must be a number.`);
          return;
        }
        result[field.key] = num;
      } else {
        result[field.key] = raw;
      }
    }

    onSave(result);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            <Pressable onPress={onClose} hitSlop={10} style={styles.close}>
              <Ionicons name="close" size={20} color="#fff" />
            </Pressable>
          </View>

          <ScrollView
            style={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.form,
              { paddingBottom: insets.bottom + 24 },
            ]}
          >
            {fields.map((field) =>
              field.options ? (
                <View key={field.key} style={styles.optionsBlock}>
                  <Text style={styles.label}>{field.label}</Text>

                  <View style={styles.chips}>
                    {field.options.map((option) => {
                      const active = values[field.key] === option;

                      return (
                        <Pressable
                          key={option}
                          onPress={() => setValue(field.key)(option)}
                          style={({ pressed }) => [
                            styles.chip,
                            active && styles.chipActive,
                            pressed && styles.pressed,
                          ]}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              active && styles.chipTextActive,
                            ]}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ) : (
                <FormField
                  key={field.key}
                  label={field.label}
                  icon={field.icon}
                  suffix={field.suffix}
                  value={String(values[field.key] ?? "")}
                  onChangeText={setValue(field.key)}
                  multiline={field.multiline}
                  keyboardType={
                    field.numeric ? "numeric" : field.url ? "url" : "default"
                  }
                  autoCapitalize={field.url ? "none" : "sentences"}
                  autoCorrect={!field.url}
                />
              ),
            )}

            <Pressable
              onPress={handleSave}
              disabled={loading}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                loading && styles.buttonLoading,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#241915" />
              ) : (
                <>
                  <Ionicons name="checkmark" size={22} color="#241915" />
                  <Text style={styles.buttonText}>SAVE CHANGES</Text>
                </>
              )}
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  backdrop: { flex: 1 },
  sheet: {
    maxHeight: "88%",
    paddingTop: 10,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: BG,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "rgba(217,143,107,0.25)",
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  title: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 24,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#fff",
  },
  close: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  scrollView: { flexShrink: 1 },
  form: { paddingHorizontal: 24, gap: 16 },
  optionsBlock: { gap: 8 },
  label: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: "#b9a89f",
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    height: 36,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: LINE,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  chipActive: { borderColor: ACCENT, backgroundColor: ACCENT },
  chipText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 13,
    color: SOFT,
  },
  chipTextActive: { color: "#241915" },
  button: {
    height: 56,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 16,
    backgroundColor: ACCENT,
    shadowColor: ACCENT,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonLoading: { opacity: 0.7 },
  buttonText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 18,
    letterSpacing: 2,
    color: "#241915",
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
