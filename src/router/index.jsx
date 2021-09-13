import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthContext } from '../context/authContext';
import LoginScreen from '../views/LoginScreen';
import SplashScreen from '../views/SplashScreen';
import SignUpScreen from '../views/SignUpScreen';
import HomeNavigator from './HomeNavigator';
import BudgetNavigator from './BudgetNavigator';
import ProfileNavigator from './ProfileNavigator'


const Tab = createBottomTabNavigator();
const Routes = () => {
  const { loadingUser, user } = useAuthContext();

  if (loadingUser) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="OuterHome">
        {
          user === null ? (
            <>
              <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false
                }}
              />
              <Tab.Screen
                name="Signup"
                component={SignUpScreen}
                options={{
                  title: 'Sign Up',
                  headerShown: false,
                  
                }}
              />
            </>
          ) : (
            <>
              
              <Tab.Screen
                name="OuterBudget"
                component={BudgetNavigator}
                  options={{
                  title: "Budgets",
                  headerShown: false
                }}
              />
              <Tab.Screen
                name="OuterHome"
                component={HomeNavigator}
                  options={{
                  title: "Home",
                  headerShown: false
                }}
              />
              <Tab.Screen
                name="OuterProfile"
                component={ProfileNavigator}
                  options={{
                  title: "Profile",
                  headerShown: false
                }}
              />
            </>
          )
        }
      </Tab.Navigator>
    </NavigationContainer>
  ) 
};
export default Routes;