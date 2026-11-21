import { useState } from "react";
import {
  Alert,
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
import { Link } from "@react-navigation/native";
import { authApi } from "../backend";

const ACCENT = "#d98f6b";
const TRUE = "rgba(255,255,255,0.14)";
const BG = "#170f0c";
const ERROR = "#ff8a7a";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};

    if (name.trim().length < 2) {
      next.name = "Enter your name";
    }

    if (!EMAIL_RE.test(email.trim())) {
      next.email = "Enter a valid email";
    }

    if (password.length < 8) {
      next.password = "At least 8 characters";
    }

    if (confirmPassword !== password) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const session = await authApi.registerUser(
        email.trim(),
        password,
        name.trim(),
      );
      if (session) {
        navigation.navigate("MainTabs", { screen: "Workout" });
      } else {
        Alert.alert(
          "Confirm your email",
          "Check your email to confirm your account, then log in.",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }],
        );
      }
    } catch (error) {
      Alert.alert("Registration failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    navigation.navigate("MainTabs", { screen: "Workout" });
  };

  return (
    <View style={styles.root}>
      <Image
        source={require("../../img/Register.jpg")}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />

      <LinearGradient
        colors={["rgba(23,15,12,0.55)", "rgba(23,15,12,0.88)", BG]}
        locations={[0, 0.45, 0.8]}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button */}
          <Pressable
            onPress={() => navigation.popToTop()}
            hitSlop={2}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          {/* Headline */}
          <View style={styles.headline}>
            <View style={styles.brandRow}>
              <View style={styles.logoMark} />
              <Text style={styles.brand}>FITNESSAPP</Text>
            </View>

            <Text style={styles.title}>Create account</Text>

            <Text style={styles.subtitle}>
              Save your progress and train on any device.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name */}
            <View style={styles.field}>
              <Text style={styles.label}>NAME</Text>

              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor="#7d6d65"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                />
              </View>

              {errors.name ? (
                <Text style={styles.error}>{errors.name}</Text>
              ) : null}
            </View>

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>EMAIL</Text>

              <View style={styles.inputWrap}>
                <Text style={styles.icon}>✉</Text>

                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#7d6d65"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
              </View>

              {errors.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>PASSWORD</Text>

              <View style={styles.inputWrap}>
                <Text style={styles.icon}>▣</Text>

                <TextInput
                  style={styles.input}
                  placeholder="At least 8 characters"
                  placeholderTextColor="#7d6d65"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  returnKeyType="next"
                />

                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={10}
                >
                  <Text style={styles.icon}>{showPassword ? "⊘" : "◉"}</Text>
                </Pressable>
              </View>

              {errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Confirm password */}
            <View style={styles.field}>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>

              <View style={styles.inputWrap}>
                <Text style={styles.icon}>▣</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Repeat your password"
                  placeholderTextColor="#7d6d65"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                  onSubmitEditing={handleRegister}
                  returnKeyType="done"
                />
              </View>

              {errors.confirmPassword ? (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            <Pressable
              onPress={handleRegister}
              disabled={loading}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>
                {loading ? "REGISTERING..." : "REGISTER"}
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Guest */}
            <Pressable
              onPress={handleGuest}
              style={({ pressed }) => [
                styles.guestButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.guestText}>TRAIN AS A GUEST USER</Text>
            </Pressable>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>

              <Link screen="Login" style={styles.footerLink}>
                Log in
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: 64, android: 48 }),
    paddingBottom: Platform.select({ ios: 36, android: 28 }),
    gap: 24,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(23,15,12,0.55)",
    borderWidth: 1,
    borderColor: TRUE,
  },

  backIcon: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 34,
  },

  headline: {
    gap: 10,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logoMark: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: ACCENT,
    transform: [{ rotate: "45deg" }],
  },

  brand: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 14,
    letterSpacing: 4,
    color: ACCENT,
  },

  title: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 38,
    lineHeight: 44,
    textTransform: "uppercase",
    color: "#fff",
  },

  subtitle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: "#d8cbc4",
  },

  form: {
    gap: 16,
  },

  field: {
    gap: 8,
  },

  label: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: "#b9a89f",
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: TRUE,
    backgroundColor: "rgba(23,15,12,0.78)",
  },

  input: {
    flex: 1,
    height: "100%",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "#fff",
  },

  icon: {
    width: 20,
    textAlign: "center",
    color: ACCENT,
    fontSize: 18,
  },

  error: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
    color: ERROR,
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

  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: TRUE,
  },
  dividerText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: "#b9a89f",
  },

  guestButton: {
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(217,143,107,0.55)",
    backgroundColor: "rgba(23,15,12,0.6)",
  },
  guestText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 16,
    letterSpacing: 2,
    color: "#fff",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 4,
  },

  footerText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: "#d8cbc4",
  },

  footerLink: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
    color: ACCENT,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
