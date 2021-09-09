import React from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { AuthProvider } from "./src/context/authContext";
import Routes from './src/routes';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
