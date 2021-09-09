import React from 'react';
import { createStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./views/HomeScreen";
import LoginScreen from "./views/LoginScreen";
import SignUpScreen from "./views/SignUpScreen";
import SplashScreen from "./views/SplashScreen";
import { useAuthContext } from './context/authContext';
import HomeNavigator from './router/HomeNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { Button } from 'react-native';
import { Text } from 'react-native';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => {
  const { loadingUser, user } = useAuthContext();


  if (loadingUser) {
    return <SplashScreen />;
  }

  const Home = () => {
    return (
      <View style={{flex: 1}}>
        <Text>Home Screen</Text>
  
        <Button
          title="Logout!"
        />
  
      </View>
    );
  }
  const Login = () => {
    return (
      <View style={{flex: 1}}>
        <Text >login Screen</Text>
  
        <Button
          title="Logout!"
        />
  
      </View>
    );
  }
  

  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Home" component={Home} />
    //   <Tab.Screen name="Login" component={Login} />
    // </Tab.Navigator>
    <Stack.Navigator initialRouteName="HomeScreen">
      {
        user === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
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
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Home'}}
            />
          </>
        )
      }
    </Stack.Navigator>
  )
}

export default Navigator;

