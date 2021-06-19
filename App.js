import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { AuthProvider } from "./context/authContext";
import Navigator from "./Navigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <ThemeProvider>
            <Navigator />
          </ThemeProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
