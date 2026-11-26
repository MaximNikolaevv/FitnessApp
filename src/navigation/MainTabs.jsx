import { useState } from "react";
import { View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useUserContext } from "../context/context";

import WorkoutScreen from "../screens/WorkoutScreen";
import CreateScreen from "../screens/CreateScreen";
import DietScreen from "../screens/DietScreen";
import ProfileScreen from "../screens/ProfileScreen";

import GuestAccessModal from "../components/GuestAccessModal";

const Tab = createBottomTabNavigator();
const TAB_ICON_SIZE = 23;
const TAB_LABEL_SIZE = 12;

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
          tabBarLabelStyle: { fontSize: TAB_LABEL_SIZE },

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
              <Ionicons name="barbell-outline" size={TAB_ICON_SIZE} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text
                style={{
                  color: isGuest === true ? "#441704" : color,
                  fontSize: TAB_LABEL_SIZE,
                }}
              >
                Create
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="add-circle-outline"
                size={TAB_ICON_SIZE}
                color={isGuest === true ? "#441704" : color}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              if (isGuest === true) {
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
              <Ionicons name="nutrition-outline" size={TAB_ICON_SIZE} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text
                style={{
                  color: isGuest === true ? "#441704" : color,
                  fontSize: TAB_LABEL_SIZE,
                }}
              >
                Profile
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="person-outline"
                size={TAB_ICON_SIZE}
                color={isGuest === true ? "#441704" : color}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              if (isGuest === true) {
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