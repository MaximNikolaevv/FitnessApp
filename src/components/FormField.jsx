import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ACCENT = "#d98f6b";
const MUTED = "#7d6d65";
const LINE = "rgba(255,255,255,0.12)";

export default function FormField({
  label,
  icon,
  suffix,
  style,
  ...inputProps
}) {
  const [focused, setFocused] = useState(false);
  const multiline = !!inputProps.multiline;

  return (
    <View style={[styles.field, style]}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputWrap,
          multiline && styles.inputWrapMultiline,
          focused && styles.inputWrapFocused,
        ]}
      >
        <Ionicons
          name={icon}
          size={18}
          color={focused ? ACCENT : MUTED}
          style={multiline && styles.iconMultiline}
        />

        <TextInput
          style={[styles.input, multiline && styles.inputMultiline]}
          placeholderTextColor={MUTED}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />

        {!!suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 8 },
  label: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: "#b9a89f",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 54,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: LINE,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  inputWrapMultiline: {
    height: "auto",
    minHeight: 104,
    alignItems: "flex-start",
    paddingVertical: 14,
  },
  inputWrapFocused: {
    borderColor: ACCENT,
    backgroundColor: "rgba(217,143,107,0.08)",
  },
  iconMultiline: { marginTop: 2 },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "#fff",
  },
  inputMultiline: {
    height: "auto",
    minHeight: 76,
    textAlignVertical: "top",
  },
  suffix: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 13,
    color: "#b9a89f",
  },
});
