import React from 'react';
import HomeScreen from '../views/HomeScreen';
import TodoListScreen from '../views/TodoListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const TodoStack = createNativeStackNavigator();

const TodoNavigator = () => {
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{ title: "Todo List", tabBarLabel: 'Todo List' }}
      />
      <TodoStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", tabBarLabel: 'Home' }}
      />
      
    </TodoStack.Navigator>
  );
}

export default TodoNavigator;
