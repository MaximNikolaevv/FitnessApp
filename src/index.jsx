import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import RootNavigator from "./navigation/RootNavigator";

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

registerRootComponent(App);
