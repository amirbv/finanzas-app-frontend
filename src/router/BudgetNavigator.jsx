import React from 'react';
import BudgetScreen from '../views/BudgetScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const BudgetNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InnerBudget"
        component={BudgetScreen}
        options={{ title: "Budgets", tabBarLabel: 'Budgets' }}
      />
    </Stack.Navigator>
  );
}

export default BudgetNavigator;
