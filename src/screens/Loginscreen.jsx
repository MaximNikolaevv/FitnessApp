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
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Oswald_600SemiBold } from "@expo-google-fonts/oswald";
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import { Link } from "@react-navigation/native";
const ACCENT = "#d98f6b";
const MUTED = "#9c8a80";
const DANGER = "#ff6b6b";

export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Oswald_600SemiBold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null); // "email" | "password" | null
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      e.email = "Enter a valid email address";
    }

    if (!password) {
      e.password = "Enter your password";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      // TODO: заявка към сървъра
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <Image
        source={require("../../img/Register.jpg")}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(23,15,12,0.55)", "rgba(23,15,12,0.88)", "#170f0c"]}
        locations={[0, 0.45, 0.85]}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.topBar}>
            <Pressable
              onPress={() => navigation.popToTop()}
              hitSlop={10}
              style={({ pressed }) => [
                styles.backBtn,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </Pressable>

            <View style={styles.brandRow}>
              <View style={styles.logoMark} />
              <Text style={styles.brand}>FITNESSAPP</Text>
            </View>

            <View style={styles.backBtnSpacer} />
          </View>

          {/* Heading */}
          <View style={styles.heading}>
            <Text style={styles.kicker}>WELCOME BACK</Text>
            <Text style={styles.title}>Log in</Text>
            <Text style={styles.subtitle}>
              Pick up your training right where you left off.
            </Text>
          </View>

          {/* Form card */}
          <View style={styles.card}>
            {/* Email */}
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="mail-outline" size={20} color={ACCENT} />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor={MUTED}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (errors.email)
                      setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  // onSubmitEditing={() =>}
                />
              </View>
              {!!errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="lock-closed-outline" size={20} color={ACCENT} />
                <TextInput
                  style={styles.input}
                  placeholder="Your password"
                  placeholderTextColor={MUTED}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  onSubmitEditing={handleLogin}
                />
                <Pressable
                  onPress={() => setShowPassword((s) => !s)}
                  hitSlop={10}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={MUTED}
                  />
                </Pressable>
              </View>
              {!!errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <Pressable
              onPress={() => console.log("Forgot password")} // TODO
              hitSlop={8}
              style={styles.forgot}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>

            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#241915" />
              ) : (
                <Text style={styles.buttonText}>LOG IN</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <Link screen="Register" style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text style={styles.footerLink}>Sign up</Text>
            </Text>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { flex: 1, backgroundColor: "#170f0c" },

  scroll: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: 64, android: 48 }),
    paddingBottom: Platform.select({ ios: 36, android: 28 }),
    gap: 24,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(23,15,12,0.6)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.35)",
  },
  backBtnSpacer: { width: 40 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoMark: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: ACCENT,
    transform: [{ rotate: "45deg" }],
  },
  brand: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 15,
    letterSpacing: 4,
    color: "#fff",
  },

  heading: { gap: 8 },
  kicker: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
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
    color: "rgba(255,255,255,0.75)",
  },

  card: {
    gap: 16,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "rgba(23,15,12,0.78)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.25)",
  },

  fieldBlock: { gap: 6 },
  label: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    letterSpacing: 1,
    color: "rgba(255,255,255,0.7)",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 54,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.12)",
  },

  input: {
    flex: 1,
    height: "100%",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "#fff",
  },
  error: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
    color: DANGER,
  },

  forgot: { alignSelf: "flex-end", marginTop: -4 },

  forgotText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 13,
    color: ACCENT,
  },

  button: {
    height: 58,
    marginTop: 4,
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
  buttonText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 18,
    letterSpacing: 2,
    color: "#241915",
  },

  footer: { alignItems: "center", paddingVertical: 4 },
  footerText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
  },
  footerLink: { fontFamily: "OpenSans_600SemiBold", color: ACCENT },

  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});
