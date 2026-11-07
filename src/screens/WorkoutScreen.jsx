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

      {/* лек тъмен слой, най-тъмен долу, за да се чете лентата */}
      <LinearGradient
        colors={["rgba(23,15,12,0.25)", "rgba(23,15,12,0.10)", "rgba(23,15,12,0.80)"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
});