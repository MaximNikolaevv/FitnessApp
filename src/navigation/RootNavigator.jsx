import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/Loginscreen";
import RegisterScreen from "../screens/Registerscreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
