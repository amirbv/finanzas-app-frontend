import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthContext } from '../context/authContext';
import TodoListScreen from '../views/TodoListScreen';
// import LoginScreen from '../views/LoginScreen/previousLogin';
import LoginScreen from '../views/LoginScreen';
import HomeScreen from '../views/HomeScreen';
import SplashScreen from '../views/SplashScreen';
import SignUpScreen from '../views/SignUpScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Routes = () => {
  const { loadingUser, user } = useAuthContext();

  if (loadingUser) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoList" component={TodoListScreen} />
      </Stack.Navigator> */}
      <Tab.Navigator initialRouteName="Home">
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
                  headerShown: false
                }}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Home" component={HomeScreen}
              />
              <Tab.Screen
                name="TodoList"
                component={TodoListScreen}
              />
            </>
          )
        }
      </Tab.Navigator>
    </NavigationContainer>
  ) 
};
export default Routes;