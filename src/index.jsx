import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { AuthProvider } from "./context/context";
import RootNavigator from "./navigation/RootNavigator";

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

registerRootComponent(App);
