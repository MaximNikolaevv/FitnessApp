import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function CreateScreen({ navigation }) {
  const BG = "#170f0c";
  const ACCENT = "#d98f6b";

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

      <View style={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.kicker}>LET&apos;S GET STARTED</Text>

          <Text style={styles.title}>What would you like to create?</Text>

          <Text style={styles.subtitle}>
            Choose what you want to build and let&apos;s get to work.
          </Text>
        </View>

        <View style={styles.options}>
          <Pressable
            onPress={() => {
              navigation.navigate("CreateWorkout");
              console.log("Navigating to Workout Creation Screen");
            }}
            style={({ pressed }) => [
              styles.optionCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="barbell-outline" size={28} color={ACCENT} />
            </View>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Workout</Text>
              <Text style={styles.optionDescription}>
                Create your own workout routine.
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("CreateDiet");
              console.log("Navigating to Diet Creation Screen");
            }}
            style={({ pressed }) => [
              styles.optionCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="nutrition-outline" size={28} color={ACCENT} />
            </View>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Diet</Text>
              <Text style={styles.optionDescription}>
                Build a personalized nutrition plan.
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  heading: {
    marginBottom: 34,
  },

  kicker: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
    letterSpacing: 3,
    color: "#d98f6b",
    marginBottom: 14,
  },

  title: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 38,
    lineHeight: 48,
    letterSpacing: 0.5,
    color: "#fff",
  },

  subtitle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#c4b4ac",
    marginTop: 12,
  },

  options: {
    gap: 16,
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 18,
    minHeight: 105,
    borderRadius: 20,
    backgroundColor: "rgba(23,15,12,0.88)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.25)",
  },

  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217,143,107,0.13)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.2)",
  },

  optionInfo: {
    flex: 1,
    gap: 5,
  },

  optionTitle: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 21,
    letterSpacing: 0.8,
    color: "#fff",
  },

  optionDescription: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "#b9a89f",
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
