import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import CreateWalletScreen from '../views/CreateWalletScreen';
import WalletScreen from '../views/WalletScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InnerHome"
        component={HomeScreen}
        options={{ title: "Monederos", tabBarLabel: 'Home' }}
      />
      <Stack.Screen
        name="CreateWallet"
        component={CreateWalletScreen}
        options={{ title: "Crear Monedero" }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ title: "Detalles del monedero" }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
