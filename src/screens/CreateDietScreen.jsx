import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { dietApi } from "../backend";

const BG = "#170f0c";
const ACCENT = "#d98f6b";
const MUTED = "#7d6d65";
const SOFT = "#d8cbc4";
const LINE = "rgba(255,255,255,0.12)";

function Field({
  label,
  icon,
  iconInLabel = false,
  style,
  suffix,
  ...inputProps
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.field, style]}>
      {iconInLabel ? (
        <View style={styles.labelRow}>
          <Ionicons name={icon} size={18} color={focused ? ACCENT : MUTED} />
          <Text style={styles.label}>{label}</Text>
        </View>
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}

      <View style={[styles.inputWrap, focused && styles.inputWrapFocused]}>
        {!iconInLabel && (
          <Ionicons name={icon} size={18} color={focused ? ACCENT : MUTED} />
        )}

        <TextInput
          {...inputProps}
          style={styles.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {!!suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </View>
    </View>
  );
}

export default function CreateDiet() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    food: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const setField = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await dietApi.AddDiet(form);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }

    console.log("Create diet", form);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#2e1c14", "#1d1310", BG]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Ionicons
        name="nutrition"
        size={260}
        color="rgba(217,143,107,0.06)"
        style={styles.bgIcon}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scroll,
            {
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + 40,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.kicker}>NEW MEAL</Text>
            <Text style={styles.title}>Add food</Text>
            <Text style={styles.subtitle}>
              Fill in the details and add it to your diet list.
            </Text>
          </View>

          {/* Form card */}
          <View style={styles.card}>
            <Field
              label="FOOD"
              icon="restaurant-outline"
              placeholder="e.g. Grilled chicken & rice"
              value={form.food}
              onChangeText={setField("food")}
              autoCapitalize="sentences"
            />

            <Field
              label="CALORIES"
              icon="flame-outline"
              suffix="kcal"
              placeholder="0"
              keyboardType="numeric"
              value={form.calories}
              onChangeText={setField("calories")}
            />

            {/* Macros */}
            <View style={styles.macrosRow}>
              <Field
                style={styles.flex}
                label="PROTEIN"
                icon="barbell-outline"
                iconInLabel
                placeholder="0"
                keyboardType="numeric"
                value={form.protein}
                onChangeText={setField("protein")}
              />
              <Field
                style={styles.flex}
                label="CARBS"
                icon="flash-outline"
                iconInLabel
                placeholder="0"
                keyboardType="numeric"
                value={form.carbs}
                onChangeText={setField("carbs")}
              />
              <Field
                style={styles.flex}
                label="FAT"
                icon="water-outline"
                iconInLabel
                placeholder="0"
                keyboardType="numeric"
                value={form.fat}
                onChangeText={setField("fat")}
              />
            </View>

            <Pressable
              onPress={handleSubmit}
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
                  <Ionicons name="add" size={22} color="#241915" />
                  <Text style={styles.buttonText}>ADD FOOD</Text>
                </>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { flex: 1, backgroundColor: BG },

  bgIcon: { position: "absolute", right: -50, top: 40 },

  scroll: { paddingHorizontal: 24, gap: 20 },

  // Header
  header: { gap: 6 },
  kicker: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
    letterSpacing: 2.5,
    color: ACCENT,
  },
  title: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 38,
    lineHeight: 44,
    textTransform: "uppercase",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: SOFT,
  },

  // Card
  card: {
    gap: 16,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "rgba(23,15,12,0.78)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.25)",
  },

  // Field
  field: { gap: 8 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 8,
    letterSpacing: 1,
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
  inputWrapFocused: {
    borderColor: ACCENT,
    backgroundColor: "rgba(217,143,107,0.08)",
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "#fff",
  },
  suffix: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 13,
    color: "#b9a89f",
  },

  macrosRow: { flexDirection: "row", gap: 10 },

  // Button
  button: {
    height: 58,
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
