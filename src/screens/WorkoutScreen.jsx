import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const BG = "#170f0c";

export default function WorkoutScreen() {
  return (
    <View style={styles.root}>
      <Image
        source={require("../../img/Workout.jpg")}
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
});
