import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { categoryApi } from "../backend";
import { useUserContext } from "../context/context";

const ACCENT = "#d98f6b";
const BG = "#170f0c";
const LINE = "rgba(255,255,255,0.12)";
const MUTED = "#b9a89f";
const SOFT = "#d8cbc4";
const TAB_BAR_SPACE = 100;

// Иконка за карта без снимка (image_URL е NULL), според type
const TYPE_ICONS = {
  Push: "barbell",
  Pull: "fitness",
  Legs: "walk",
  Upper: "body",
  Lower: "footsteps",
  "Full Body": "flame",
};

function WorkoutCard({ item, onPress }) {
  const icon = TYPE_ICONS[item.type] ?? "barbell";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {/* Фон: снимка или градиент с голяма иконка */}(
      <LinearGradient
        colors={["#3a241b", "#1d1310"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      >
        <Ionicons
          name={icon}
          size={140}
          color="rgba(217,143,107,0.10)"
          style={styles.watermark}
        />
      </LinearGradient>
      )
      <LinearGradient
        colors={[
          "rgba(23,15,12,0.10)",
          "rgba(23,15,12,0.55)",
          "rgba(23,15,12,0.94)",
        ]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.cardContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>

        <View style={styles.cardBottom}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.name}
          </Text>

          {!!item.description && (
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}

          <View style={styles.cardFooter}>
            <View style={styles.chip}>
              <Ionicons name="time-outline" size={14} color={ACCENT} />
              <Text style={styles.chipText}>{item.duration} min</Text>
            </View>

            <View style={styles.arrow}>
              <Ionicons name="arrow-forward" size={18} color="#241915" />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function WorkoutScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { isGuest } = useUserContext();

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      const data = await categoryApi.getAll();
      setWorkouts(data);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

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

      <FlatList
        data={workouts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <WorkoutCard
            item={item}
            onPress={() =>
              navigation.navigate("WorkoutDetails", { workoutId: item.id })
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={ACCENT}
            colors={[ACCENT]}
          />
        }
        contentContainerStyle={[
          styles.list, 
          {
            // при guest има прозрачен хедър, който покрива горната част
            paddingTop: insets.top + (isGuest === true ? 64 : 16),
            paddingBottom: TAB_BAR_SPACE + insets.bottom,
          },
        ]}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.kicker}>CHOOSE YOUR SESSION</Text>
            <Text style={styles.title}>Workouts</Text>
            <Text style={styles.subtitle}>
              Pick a plan and start training right away.
            </Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={ACCENT} style={styles.loader} />
          ) : (
            <Text style={styles.empty}>No workouts yet.</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  list: {
    paddingHorizontal: 24,
    gap: 16,
  },

  // Header
  header: { gap: 6, marginBottom: 4 },
  kicker: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 11,
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
    color: SOFT,
  },

  // Card
  card: {
    height: 210,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#1d1310",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.25)",
  },
  watermark: { position: "absolute", right: -16, top: -8 },
  cardContent: {
    flex: 1,
    padding: 18,
    justifyContent: "space-between",
  },

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

  cardBottom: { gap: 6 },
  cardTitle: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 26,
    lineHeight: 32,
    textTransform: "uppercase",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  cardDescription: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: SOFT,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
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
  arrow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT,
    shadowColor: ACCENT,
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
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
