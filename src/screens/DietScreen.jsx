import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { dietApi } from "../backend";
import { useUserContext } from "../context/context";
import ItemActions, { confirmDelete } from "../components/ItemActions";
import EditSheet from "../components/EditSheet";

const BG = "#170f0c";
const ACCENT = "#d98f6b";
const TAB_BAR_SPACE = 100;

const DIET_FIELDS = [
  { key: "food", label: "FOOD", icon: "restaurant-outline" },
  { key: "calories", label: "CALORIES", icon: "flame-outline", suffix: "kcal", numeric: true },
  { key: "protein", label: "PROTEIN", icon: "barbell-outline", suffix: "g", numeric: true },
  { key: "carbs", label: "CARBS", icon: "flash-outline", suffix: "g", numeric: true },
  { key: "fat", label: "FAT", icon: "water-outline", suffix: "g", numeric: true },
  { key: "img", label: "IMAGE URL", icon: "image-outline", url: true },
];

function MealRow({ item, canManage, onEdit, onDelete }) {
  return (
    <View style={styles.mealCard}>
      {item.img?.trim() ? (
        <Image source={{ uri: item.img }} style={styles.mealImage} />
      ) : (
        <View style={styles.mealPlaceholder}>
          <Ionicons
            name="restaurant-outline"
            size={36}
            color="rgba(217,143,107,0.55)"
          />
        </View>
      )}

      <View style={styles.mealContent}>
        <Text
          style={[styles.mealName, canManage && styles.mealNameManage]}
          numberOfLines={1}
        >
          {item.food}
        </Text>
        <Text style={styles.calories}>{item.calories} kcal</Text>
        <Text style={styles.macroText}>Protein: {item.protein}g</Text>
        <Text style={styles.macroText}>Carbs: {item.carbs}g</Text>
        <Text style={styles.macroText}>Fat: {item.fat}g</Text>
      </View>

      {canManage && (
        <View style={styles.mealActions}>
          <ItemActions size={30} onEdit={onEdit} onDelete={onDelete} />
        </View>
      )}
    </View>
  );
}

export default function DietScreen() {
  const [diet, setDiet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const insets = useSafeAreaInsets();
  const { isGuest, userId } = useUserContext();
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async (values) => {
    try {
      setSaving(true);
      await dietApi.UpdateDiet(editing.id, values);
      setEditing(null);
      await load();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message ?? error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (item) =>
    confirmDelete(`Delete "${item.food}"?`, async () => {
      try {
        await dietApi.DeleteDiet(item.id);
        await load();
      } catch (error) {
        Alert.alert("Error", error.response?.data?.message ?? error.message);
      }
    });

  // Зареждане на храните
  const load = async () => {
    try {
      const data = await dietApi.getAllDiet();
      setDiet(data);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  // Pull to Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#2e1c14", "#1d1310", BG]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Ionicons
        name="nutrition"
        size={260}
        color="rgba(217,143,107,0.06)"
        style={styles.bgIcon}
      />

      {loading ? (
        <ActivityIndicator size="large" color={ACCENT} style={styles.loader} />
      ) : (
        <FlatList
          data={diet}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <MealRow
              item={item}
              canManage={!!userId && item.user_id === userId}
              onEdit={() => setEditing(item)}
              onDelete={() => handleDelete(item)}
            />
          )}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingTop: insets.top + (isGuest === true ? 64 : 16),
              paddingBottom: TAB_BAR_SPACE + insets.bottom,
            },
          ]}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.kicker}>{"TODAY'S NUTRITION"}</Text>
              <Text style={styles.title}>Diet</Text>
              <Text style={styles.subtitle}>
                Keep track of what you eat today.
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={ACCENT}
              colors={[ACCENT]}
              progressBackgroundColor="#2e1c14"
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No meals available.</Text>
          }
        />
      )}
      <EditSheet
        key={editing?.id ?? "closed"}
        visible={!!editing}
        title="Edit meal"
        fields={DIET_FIELDS}
        initialValues={editing}
        loading={saving}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  bgIcon: {
    position: "absolute",
    right: -50,
    top: 40,
  },

  listContent: {
    paddingHorizontal: 20,
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
    color: "#d8cbc4",
  },

  mealCard: {
    flexDirection: "row",
    backgroundColor: "rgba(46,28,20,0.85)",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.15)",
  },

  mealPlaceholder: {
    width: 115,
    height: 145,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217,143,107,0.10)",
    borderRightWidth: 1,
    borderRightColor: "rgba(217,143,107,0.15)",
  },

  mealImage: {
    width: 115,
    height: 145,
    resizeMode: "cover",
  },

  mealContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    gap: 8,
  },

  mealName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  mealNameManage: { paddingRight: 76 },
  mealActions: { position: "absolute", top: 8, right: 8 },

  calories: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: "700",
  },

  macroText: {
    color: "#c5b5ac",
    fontSize: 11,
  },

  loader: {
    flex: 1,
  },

  emptyText: {
    color: "#c5b5ac",
    textAlign: "center",
    marginTop: 40,
  },
});
