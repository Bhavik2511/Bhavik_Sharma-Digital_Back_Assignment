import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MainPage from "./assets/src/main/MainPage";
import Gallery from "./assets/src/gallery/Gallery";
import Details from "./assets/src/details/Details";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="mainPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="mainPage" component={MainPage} />
        <Stack.Screen name="gallery" component={Gallery} />
        <Stack.Screen name="details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
