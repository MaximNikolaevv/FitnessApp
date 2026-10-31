import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

export default function HomePage() {
  return (
    <>
      <StatusBar hidden={Platform.OS === "android"} />

      <ImageBackground
        source={require("../img/HomePage.jpg")}
        contentFit="cover"
        style={styles.background}
      />
    </>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
});
