import React from 'react';
import HomeScreen from '../views/HomeScreen';
import TodoListScreen from '../views/TodoListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="InnerHome"
        component={HomeScreen}
        options={{ title: "Home", tabBarLabel: 'Home' }}
      />
      <HomeStack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{ title: "Todo List", tabBarLabel: 'Todo List' }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
