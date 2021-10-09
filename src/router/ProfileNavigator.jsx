import React from 'react';
import ProfileScreen from '../views/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from '../context/authContext';
import { colors } from '../styles/base';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  const { user } = useAuthContext();
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
        name="InnerProfile"
        component={ProfileScreen}
        options={{ title:`Perfil de: ${user.email}`, tabBarLabel: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
