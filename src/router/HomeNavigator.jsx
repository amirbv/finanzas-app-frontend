import React from 'react';
import HomeScreen from '../views/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InnerHome"
        component={HomeScreen}
        options={{ title: "Home", tabBarLabel: 'Home' }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
