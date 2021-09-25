import React from 'react';
import ProfileScreen from '../views/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from '../context/authContext';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  const { user } = useAuthContext();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InnerProfile"
        component={ProfileScreen}
        options={{ title:`Perfil de: ${user.email}`, tabBarLabel: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
