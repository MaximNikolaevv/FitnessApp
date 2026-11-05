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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACCENT = "#d98f6b";
const BG = "#170f0c";
const ERROR = "#ff8a7a";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  // const { goBack, goToLogin } = useAppNavigation();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email";

    if (password.length < 8){ 
      next.password = "At least 8 characters";
    } 
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      // TODO: заявка към сървъра, после goToHome() или следваща стъпка
      console.log("Register", { email: email.trim() });
    } finally {
      setLoading(false);
    }
  };

  const inputBorder = (name) =>
    errors[name] ? ERROR : focused === name ? ACCENT : "rgba(255,255,255,0.14)"; 

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingTop: insets.top, paddingBottom: insets.bottom},
          ]}
          
          // showsVerticalScrollIndicator={false} - vertikalna lenta za scroll-vane
        >
          {/* Top: back button */}
          <Pressable
            onPress={goBack}
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
            <View style={styles.field}>
              <Text style={styles.label}>EMAIL</Text>
              <View
                style={[
                  styles.inputWrap,
                  { borderColor: inputBorder("email") },
                ]}
              >
                <Text style={styles.icon}>✉</Text>
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#7d6d65"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (errors.email) setErrors((e) => ({ ...e, email: null }));
                  }}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
              </View>
              {errors.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>PASSWORD</Text>
              <View
                style={[
                  styles.inputWrap,
                  { borderColor: inputBorder("password") },
                ]}
              >
                <Text style={styles.icon}>▣</Text>
                <TextInput
                  style={styles.input}
                  placeholder="At least 8 characters"
                  placeholderTextColor="#7d6d65"
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    if (errors.password)
                      setErrors((e) => ({ ...e, password: null }));
                  }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  onSubmitEditing={handleRegister}
                  returnKeyType="done"
                />
                <Pressable
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={10}
                >
                  <Text style={styles.icon}>{showPassword ? "⊘" : "◉"}</Text>
                </Pressable>
              </View>
              {errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
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
              {loading ? (
                <ActivityIndicator color="#241915" />
              ) : (
                <Text style={styles.buttonText}>REGISTER</Text>
              )}
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Pressable onPress={goToLogin} hitSlop={8}>
                <Text style={styles.footerLink}>Log in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    gap: 16,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(23,15,12,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  backIcon: { color: "#fff", fontSize: 32, lineHeight: 34 },

  headline: { gap: 10 },
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

  form: { gap: 16 },
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
    gap: 12,
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
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
    color: "#b9a89f",
    fontSize: 18,
  },
  error: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
    color: ERROR,
  },

  button: {
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT,
    marginTop: 8,
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

  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});
