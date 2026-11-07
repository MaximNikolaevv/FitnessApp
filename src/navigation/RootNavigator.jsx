import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext, useUserContext } from "../context/context";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/Loginscreen";
import RegisterScreen from "../screens/Registerscreen";
import WorkoutScreen from "../screens/WorkoutScreen";

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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "barbell" : "barbell-outline"}
              size={size}
              color={"#ff8a7a"}
            />
          ),
        }}
      />
      {/* <Tab.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
      <Tab.Screen name="Diet" component={WorkoutScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}
