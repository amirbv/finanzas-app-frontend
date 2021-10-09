import React from 'react';
import BudgetScreen from '../views/BudgetScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
    </Stack.Navigator>
  );
}

export default BudgetNavigator;
