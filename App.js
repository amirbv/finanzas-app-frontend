import React from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import FlashMessage from "react-native-flash-message";
import { AuthProvider } from "./src/context/authContext";
import Routes from './src/router';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </SafeAreaProvider>
      <FlashMessage position="bottom" />
    </AuthProvider>
  );
};

export default App;
