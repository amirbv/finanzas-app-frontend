import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthContext} from '../context/authContext';
import LoginScreen from '../views/LoginScreen';
import SplashScreen from '../views/SplashScreen';
import SignUpScreen from '../views/SignUpScreen';
import HomeNavigator from './HomeNavigator';
import BudgetNavigator from './BudgetNavigator';
import ProfileNavigator from './ProfileNavigator';
import { colors } from '../styles/base';
import RecoverPasswordScreen from '../views/RecoverPasswordScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const Routes = () => {
  const {loadingUser, user} = useAuthContext();

  if (loadingUser) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user === null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Iniciar Sesión',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUpScreen}
            options={{
              title: 'Crear cuenta',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RecoverPassword"
            component={RecoverPasswordScreen}
            options={{
              title: 'Recuperar contraseña',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveBackgroundColor: colors.primary,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: colors.primary,
            headerShown: false
          }}
        >
          <Tab.Screen
            name="Budget"
            component={BudgetNavigator}
            options={{
              title: 'Presupuestos',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="book-open" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={{
              title: 'Inicio',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileNavigator}
            options={{
              title: 'Perfil',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Routes;
