import React from 'react';
import ProfileScreen from '../views/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InnerProfile"
        component={ProfileScreen}
        options={{ title: "Profile", tabBarLabel: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
