import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BudgetScreen from '../views/BudgetScreen';
import CreateBudgetScreen from '../views/CreateBudgetScreen';
import BudgetInfoScreen from '../views/BudgetInfoScreen';
import { colors } from '../styles/base';

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
        options={{ title: "Detalles de: cargando..." }}
      />
    </Stack.Navigator>
  );
}

export default BudgetNavigator;
