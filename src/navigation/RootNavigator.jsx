import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/Loginscreen";
import RegisterScreen from "../screens/Registerscreen";
import { MainTabs } from "./MainTabs";
import { useUserContext } from "../context/context";
import WorkoutDetailsScreen from "../screens/workoutDetails";
import CreateWorkout from "../screens/CreateWorkoutScreen";
import CreateDiet from "../screens/CreateDietScreen";
import CreateExercises from "../screens/CreateExercises";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn, isLoading } = useUserContext();

  if (isLoading) return null;
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? "MainTabs" : "Home"}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
      <Stack.Screen name="CreateExercises" component={CreateExercises} />
      <Stack.Screen name="CreateDiet" component={CreateDiet} />
    </Stack.Navigator>
  );
}
