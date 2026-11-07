import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <AuthContext.Provider>
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
  return (
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

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
        },

        tabBarHideOnKeyboard: true,
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
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
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
            <Ionicons name="person-outline" size={23} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
