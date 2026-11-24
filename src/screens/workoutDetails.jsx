import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { categoryApi, exerciseApi } from "../backend";
import { useWindowDimensions } from "react-native"; // добави към импорта от react-native
import YoutubePlayer from "react-native-youtube-iframe";

const ACCENT = "#d98f6b";
const BG = "#170f0c";
const LINE = "rgba(255,255,255,0.12)";
const MUTED = "#b9a89f";
const SOFT = "#d8cbc4";

function ExerciseRow({ item, index }) {
  const { width } = useWindowDimensions();
  const [playing, setPlaying] = useState(false);

  const videoId = item.exerciseVideoLink?.split("v=")[1]?.split("&")[0]; // извличане на videoId от YouTube URL
  const videoWidth = width - 48 - 28; // екран - отстъпи на списъка - padding на картата
  const videoHeight = (videoWidth * 9) / 16;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.number}>
          <Text style={styles.numberText}>{index + 1}</Text>
        </View>

        <View style={styles.rowText}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {item.name}
          </Text>
          {!!item.description && (
            <Text style={styles.rowDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>

        <View style={styles.setsPill}>
          <Text style={styles.setsText}>
            {item.sets} × {item.reps}
          </Text>
        </View>
      </View>

      {/* Видео */}
      {!!videoId && (
        <View style={[styles.video, { height: videoHeight }]}>
          {playing ? (
            <YoutubePlayer
              height={videoHeight}
              width={videoWidth}
              videoId={videoId}
              play
            />
          ) : (
            <Pressable
              onPress={() => setPlaying(true)}
              style={StyleSheet.absoluteFill}
            >
              <Image
                source={{
                  uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                }}
                contentFit="cover"
                transition={250}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.playWrap}>
                <View style={styles.play}>
                  <Ionicons name="play" size={22} color="#241915" />
                </View>
              </View>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

export default function WorkoutDetailsScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const { workoutId } = route.params;

  const load = async () => {
    setLoading(true);
    try {
      const [workoutData, exerciseData] = await Promise.all([
        categoryApi.getById(workoutId),
        exerciseApi.getByWorkoutId(workoutId),
      ]);

      if (!workoutData) {
        throw new Error("Workout not found");
      }

      setWorkout(workoutData);
      setExercises(exerciseData);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.root}>
      <Image
        source={require("../../img/Workout.jpg")}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />

      <LinearGradient
        colors={[
          "rgba(23,15,12,0.45)",
          "rgba(23,15,12,0.60)",
          "rgba(23,15,12,0.85)",
          BG,
        ]}
        locations={[0, 0.3, 0.6, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Back button */}
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={10}
        style={({ pressed }) => [
          styles.backButton,
          { top: insets.top + 8 },
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="chevron-back" size={22} color="#fff" />
      </Pressable>

      <FlatList
        data={exercises}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <ExerciseRow item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          {
            paddingTop: insets.top + 64,
            paddingBottom: insets.bottom + 100,
          },
        ]}
        ListHeaderComponent={
          <View style={styles.hero}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{workout?.type ?? "Workout"}</Text>
            </View>

            <Text style={styles.title}>{workout?.name ?? "Workout"}</Text>

            {!!workout?.description && (
              <Text style={styles.description}>{workout.description}</Text>
            )}

            <View style={styles.chips}>
              <View style={styles.chip}>
                <Ionicons name="time-outline" size={14} color={ACCENT} />
                <Text style={styles.chipText}>
                  {workout?.duration ?? "--"} min
                </Text>
              </View>
              <View style={styles.chip}>
                <Ionicons name="list-outline" size={14} color={ACCENT} />
                <Text style={styles.chipText}>
                  {exercises.length} exercises
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Exercises</Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={ACCENT} style={styles.loader} />
          ) : (
            <Text style={styles.empty}>No exercises yet.</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  list: { paddingHorizontal: 24, gap: 10 },

  // Back
  backButton: {
    position: "absolute",
    left: 24,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(23,15,12,0.6)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.35)",
  },

  // Hero
  hero: { gap: 10, marginBottom: 12 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(23,15,12,0.65)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.4)",
  },
  badgeText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: ACCENT,
  },
  title: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 40,
    lineHeight: 46,
    textTransform: "uppercase",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  description: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: SOFT,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 2 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(23,15,12,0.65)",
    borderWidth: 1,
    borderColor: LINE,
  },
  chipText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    color: SOFT,
  },
  sectionTitle: {
    marginTop: 14,
    fontFamily: "Oswald_600SemiBold",
    fontSize: 18,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#fff",
  },

  // Exercise row
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgba(23,15,12,0.78)",
    borderWidth: 1,
    borderColor: LINE,
  },
  number: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217,143,107,0.14)",
  },
  numberText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 16,
    color: ACCENT,
  },
  rowText: { flex: 1, gap: 2 },
  rowTitle: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  rowDescription: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: MUTED,
  },
  setsPill: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217,143,107,0.14)",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.4)",
  },
  setsText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 14,
    letterSpacing: 0.5,
    color: "#fff",
  },

  // States
  loader: { marginTop: 40 },
  empty: {
    marginTop: 40,
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
    fontSize: 15,
    color: MUTED,
  },

  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
