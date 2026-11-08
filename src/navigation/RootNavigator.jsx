import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext, useUserContext } from "../context/context";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/Loginscreen";
import RegisterScreen from "../screens/Registerscreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreateWorkoutScreen from "../screens/CreateWorkoutScreen";
import DietScreen from "../screens/DietScreen";
import { View, Modal, Text, Pressable, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  const [isGuest, setIsGuest] = useState(false);

  return (
    <AuthContext.Provider value={{ isGuest, setIsGuest }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export function MainTabs() {
  const [modalVisible, setModalVisible] = useState(false);
  const { isGuest } = useUserContext();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#d98f6b",
          tabBarInactiveTintColor: "#887b75",
          tabBarStyle: {
            backgroundColor: "#170f0c",
            borderTopColor: "#170f0c",
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 7,
            height: 68,
          },
        }}
      >
        <Tab.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="barbell-outline" size={23} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="CreateWorkout"
          component={CreateWorkoutScreen}
          options={{
            tabBarLabel: "Create",
            tabBarLabel: () => (
              <Text
                style={{ color: isGuest ? "#441704" : "#887b75", fontSize: 12, fontWeight: "600" }}
              >
                Create
              </Text>
            ),
            tabBarIcon: ({}) => (
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={isGuest ? "#441704" : "#887b75"}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              if (isGuest) {
                e.preventDefault();
                setModalVisible(true);
              }
            },
          }}
        />

        <Tab.Screen
          name="Diet"
          component={DietScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="nutrition-outline" size={23} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarInactiveTintColor: isGuest ? "#441704" : "#887b75",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="person-outline"
                size={23}
                color={isGuest ? "#441704" : "#887b75"}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Create an Account</Text>

            <Text style={styles.description}>
              To access this menu, you need to create an account. Join us and
              unlock all the features!
            </Text>

            <Pressable
              style={styles.registerButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.registerText}>Create Account</Text>
            </Pressable>

            <Pressable
              style={styles.backButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.backText}>Go Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 20,
    backgroundColor: "#170f0c",
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.35)",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    color: "#b9a89f",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  registerButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#d98f6b",
    marginBottom: 12,
  },
  registerText: {
    color: "#241915",
    fontSize: 16,
    fontWeight: "700",
  },
  backButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(217,143,107,0.55)",
  },
  backText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
