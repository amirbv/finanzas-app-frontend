import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import SplashScreen from "./views/SplashScreen";
import { useAuthContext } from './context/authContext';

const Stack = createStackNavigator();

const Navigator = () => {
  const { loadingUser, user } = useAuthContext();

  if (loadingUser) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      {
        user === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Signup"
              component={SignUp}
              options={{title: 'Sign Up'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: 'Home'}}
            />
          </>
        )
      }
    </Stack.Navigator>
  )
}

export default Navigator;
