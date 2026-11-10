import { useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useUserContext } from "../context/context";

import WorkoutScreen from "../screens/WorkoutScreen";
import CreateWorkoutScreen from "../screens/CreateWorkoutScreen";
import DietScreen from "../screens/DietScreen";
import ProfileScreen from "../screens/ProfileScreen";

import GuestAccessModal from "../components/GuestAccessModal";

const Tab = createBottomTabNavigator();

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
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={isGuest ? "#441704" : color}
              />
            ),
            tabBarLabelStyle: {
              color: isGuest ? "#441704" : undefined,
            },
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
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="person-outline"
                size={24}
                color={isGuest ? "#441704" : color}
              />
            ),
            tabBarLabelStyle: {
              color: isGuest ? "#441704" : undefined,
            },
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
      </Tab.Navigator>

      <GuestAccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onRegister={() => {
          setModalVisible(false);
          navigation.navigate("Register");
        }}
      />
    </View>
  );
}