import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { categoryApi } from "../backend";

const BG = "#170f0c";
const ACCENT = "#d98f6b";
const SOFT = "#d8cbc4";
const LINE = "rgba(255,255,255,0.12)";

const TYPES = ["Push", "Pull", "Legs", "Upper", "Lower", "Full Body"];

export default function CreateWorkout({ navigation }) {
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);

  const setField = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAddExercises = async () => {
    setLoading(true);
    try {
      const workout = await categoryApi.AddWorkout(form);
      navigation.navigate("CreateExercises", { workout });
    } catch (error) {
      Alert.alert(
        "Workout creation failed",
        error.response?.data?.message ?? error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#2e1c14", "#1d1310", BG]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Ionicons
        name="barbell"
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
            <Text style={styles.kicker}>STEP 1 OF 2</Text>
            <Text style={styles.title}>Create workout</Text>
            <Text style={styles.subtitle}>
              Describe your program, then add the exercises in it.
            </Text>
          </View>

          {/* Form card */}
          <View style={styles.card}>
            <FormField
              label="NAME"
              icon="create-outline"
              placeholder="e.g. Push Day"
              onChangeText={setField("name")}
              value={form.name}
            />

            <FormField
              label="DESCRIPTION"
              icon="document-text-outline"
              placeholder="What is this workout about?"
              onChangeText={setField("description")}
              value={form.description}
              multiline
            />

            {/* Type */}
            <View style={styles.typeBlock}>
              <Text style={styles.label}>TYPE</Text>

              <View style={styles.chips}>
                {TYPES.map((type) => {
                  const active = form.type === type;

                  return (
                    <Pressable
                      key={type}
                      onPress={() => setField("type")(type)}
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
                        {type}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <FormField
              label="DURATION"
              icon="time-outline"
              suffix="min"
              placeholder="0"
              keyboardType="numeric"
              onChangeText={setField("duration")}
              value={form.duration}
            />

            <Pressable
              onPress={handleAddExercises}
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
                <Text style={styles.buttonText}>Add exercises in it</Text>
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

  // Type chips
  typeBlock: { gap: 8 },
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
  chipActive: {
    borderColor: ACCENT,
    backgroundColor: ACCENT,
  },
  chipText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 13,
    color: SOFT,
  },
  chipTextActive: { color: "#241915" },

  // Button
  button: {
    height: 58,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
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
    fontSize: 16,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#241915",
  },

  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
