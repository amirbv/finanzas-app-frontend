import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BudgetScreen from '../views/BudgetScreen';
import CreateBudgetScreen from '../views/CreateBudgetScreen';
import BudgetInfoScreen from '../views/BudgetInfoScreen';
import BudgetDetailsScreen from '../views/BudgetDetailsScreen';
import { colors } from '../styles/base';
import CreateDetailScreen from '../views/CreateDetailScreen';
import BudgetToWalletScreen from '../views/BudgetToWalletScreen';

const Stack = createNativeStackNavigator();

const BudgetNavigator = () => {
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
        name="InnerBudget"
        component={BudgetScreen}
        options={{ title: "Presupuestos" }}
      />
      <Stack.Screen
        name="CreateBudget"
        component={CreateBudgetScreen}
        options={{ title: "Crear presupuesto" }}
      />

      <Stack.Screen
        name="BudgetInfo"
        component={BudgetInfoScreen}
        options={{ title: "Datos de: cargando..." }}
      />
      <Stack.Screen
        name="BudgetDetails"
        component={BudgetDetailsScreen}
        options={{ title: "Detalles de: cargando..." }}
      />
      <Stack.Screen
        name="BudgetToWallet"
        component={BudgetToWalletScreen}
        options={{ title: "Añadir al monedero" }}
      />
      <Stack.Screen
        name="CreateDetail"
        component={CreateDetailScreen}
        options={{ title: "Crear detalle en: cargando..." }}
      />
    </Stack.Navigator>
  );
}

export default BudgetNavigator;
