import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import CreateWalletScreen from '../views/CreateWalletScreen';
import WalletScreen from '../views/WalletScreen';
import MovementsScreen from '../views/MovementsScreen';
import CreateMovementScreen from '../views/CreateMovementScreen';
import { colors } from '../styles/base';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen
        name="InnerHome"
        component={HomeScreen}
        options={{ title: "Monederos", tabBarLabel: 'Home', unmountOnBlur: true }}
      />
      <Stack.Screen
        name="CreateWallet"
        component={CreateWalletScreen}
        options={{ title: "Crear monedero" }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ title: "Detalles de: cargando..." }}
      />
      <Stack.Screen
        name="WalletMovements"
        component={MovementsScreen}
        options={{ title: "Movimientos de: cargando..." }}
      />
      <Stack.Screen
        name="CreateMovement"
        component={CreateMovementScreen}
        options={{ title: "Crear movimiento en: cargando..." }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
