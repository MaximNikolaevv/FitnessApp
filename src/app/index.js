import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Oswald_600SemiBold } from "@expo-google-fonts/oswald";
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useAppNavigation } from "../navigation/useAppNavigation";

export default function HomePage() {
  const { goToRegister, goToLogin } = useAppNavigation();

  const [fontsLoaded] = useFonts({
    Oswald_600SemiBold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" hidden={Platform.OS === "android"} />

      <Image
        source={require("../../img/HomePage.jpg")}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <View style={styles.top}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark} />
            <Text style={styles.brand}>FITNESSAPP</Text>
          </View>

          <View style={styles.headline}>
            <Text style={styles.kicker}>YOUR TRAINING, YOUR PACE</Text>
            <Text style={styles.title}>Ready to become the best version?</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <Pressable
            onPress={goToRegister}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.primaryText}>START TRAINING</Text>
          </Pressable>

          <Pressable
            onPress={goToLogin}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.secondaryText}>I already have an account</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const ACCENT = "#d98f6b";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#170f0c" },

  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: 64, android: 40 }),
    paddingBottom: Platform.select({ ios: 44, android: 32 }),
  },
  top: { gap: 28 },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logoMark: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: ACCENT,
    transform: [{ rotate: "45deg" }],
  },
  brand: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 16,
    letterSpacing: 4,
    color: "#fff",
  },

  headline: { alignItems: "center", gap: 10 },
  kicker: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    letterSpacing: 2.5,
    color: ACCENT,
    textAlign: "center",
  },
  title: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: Platform.OS === "ios" ? 40 : 25,
    lineHeight: Platform.OS === "ios" ? 46 : 40,
    textTransform: "uppercase",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  buttons: { gap: 12 },
  primaryButton: {
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT,
    shadowColor: ACCENT,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  primaryText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 18,
    letterSpacing: 2,
    color: "#241915",
  },
  secondaryButton: {
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(217,143,107,0.55)",
    backgroundColor: "rgba(23,15,12,0.6)",
  },
  secondaryText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});
