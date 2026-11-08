
import { useUserContext } from "../context/context";
import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";


export default function CreateWorkoutScreen() {


  const BG = "#170f0c";
  const ACCENT = "#d98f6b";

  return  (
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

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },


});
