import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppNavigation } from "../navigation/useAppNavigation";
import { Image } from "expo-image";

const ACCENT = "#d98f6b";

export default function LoginScreen() {
  const { goBack, goToRegister } = useAppNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: заявка към сървъра
    console.log("Login", { email, password });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <Image
        source={require("../../img/Register.jpg")}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />

      <Pressable onPress={goBack} hitSlop={12}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <View style={styles.form}>
        <Text style={styles.title}>Welcome back</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#8a7a72"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8a7a72"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>LOG IN</Text>
        </Pressable>

        <Pressable onPress={goToRegister} hitSlop={8}>
          <Text style={styles.link}>Create a new account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#170f0c",
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  back: { color: "#fff", fontSize: 16 },
  form: { flex: 1, justifyContent: "center", gap: 14 },
  title: { color: "#fff", fontSize: 28, fontWeight: "600", marginBottom: 8 },
  input: {
    height: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  button: {
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT,
    marginTop: 8,
  },
  buttonText: {
    color: "#241915",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
  },
  link: { color: ACCENT, textAlign: "center", marginTop: 8 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});
