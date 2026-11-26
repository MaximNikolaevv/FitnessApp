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
import { exerciseApi } from "../backend";
import { useUserContext } from "../context/context";

const BG = "#170f0c";
const ACCENT = "#d98f6b";
const SOFT = "#d8cbc4";
const EMPTY_FORM = {
  name: "",
  sets: "",
  reps: "",
  description: "",
};

export default function CreateExercises({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const workout = route?.params?.workout;
  const { userId } = useUserContext();

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const setField = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAddExercise = async () => {
    if (!userId) {
      Alert.alert(
        "Exercise could not be added",
        "You must be signed in to add an exercise.",
      );
      return;
    }

    setLoading(true);
    try {
      await exerciseApi.AddExercises(workout.id, {
        ...form,
        user_id: userId,
      });
      setForm({ ...EMPTY_FORM });
    } catch (error) {
      Alert.alert(
        "Exercise could not be added",
        error.response?.data?.message ?? error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWorkout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs", screen: "Workout" }],
    });
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#2e1c14", "#1d1310", BG]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Ionicons
        name="fitness"
        size={260}
        color="rgba(217,143,107,0.06)"
        style={styles.bgIcon}
      />

      {/* Back button */}
      <Pressable
        onPress={() => navigation?.goBack()}
        hitSlop={10}
        style={({ pressed }) => [
          styles.backButton,
          { top: insets.top + 8 },
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="chevron-back" size={22} color="#fff" />
      </Pressable>

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
              paddingTop: insets.top + 64,
              paddingBottom: insets.bottom + 40,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.kicker}>STEP 2 OF 2</Text>
            <Text style={styles.title}>Add exercise</Text>

            <View style={styles.workoutChip}>
              <Ionicons name="barbell-outline" size={14} color={ACCENT} />
              <Text style={styles.workoutChipText} numberOfLines={1}>
                {workout?.name || "New workout"}
              </Text>
            </View>
          </View>

          {/* Form card */}
          <View style={styles.card}>
            <FormField
              label="EXERCISE NAME"
              icon="fitness-outline"
              placeholder="e.g. Bench press"
              value={form.name}
              onChangeText={setField("name")}
              autoCapitalize="sentences"
            />

            <View style={styles.row}>
              <FormField
                style={styles.flex}
                label="SETS"
                icon="layers-outline"
                placeholder="0"
                keyboardType="numeric"
                value={form.sets}
                onChangeText={setField("sets")}
              />
              <FormField
                style={styles.flex}
                label="REPS"
                icon="repeat-outline"
                placeholder="e.g. 8-12"
                value={form.reps}
                onChangeText={setField("reps")}
              />
            </View>

            <FormField
              label="DESCRIPTION"
              icon="document-text-outline"
              placeholder="How to perform it..."
              value={form.description}
              onChangeText={setField("description")}
              multiline
            />

            <Pressable
              onPress={handleAddExercise}
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
                  <Text style={styles.buttonText}>ADD EXERCISE</Text>
                </>
              )}
            </Pressable>

            <Pressable
              onPress={handleSaveWorkout}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
              <Text style={styles.secondaryText}>SAVE WORKOUT</Text>
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

  backButton: {
    position: "absolute",
    left: 24,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(23,15,12,0.6)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.35)",
  },

  scroll: { paddingHorizontal: 24, gap: 20 },

  // Header
  header: { gap: 8 },
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
  workoutChip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "100%",
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(23,15,12,0.65)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.4)",
  },
  workoutChipText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
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
  row: { flexDirection: "row", gap: 10 },

  // Buttons
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
  secondaryButton: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(217,143,107,0.55)",
    backgroundColor: "rgba(23,15,12,0.6)",
  },
  secondaryText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 16,
    letterSpacing: 2,
    color: "#fff",
  },

  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
