import React, { useState, useEffect, useMemo, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest, signupRequest } from '../services/user-authentication';

const AuthContext = React.createContext(null);

export function AuthProvider(props) {
  const [user, setUser] = useState(null); //no se sabe si hay usuario autenticado
  const [loadingUser, setLoadingUser] = useState(true);

  const setToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('auth-token', jsonValue);
    } catch(error) {
      console.log(error);
    }
  }

  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth-token')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(error) {
      console.log(error);
    }
  }

  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem('auth-token');
    } catch(error) {
      console.log(error);
    }
  
  }
  

  useEffect(() => {
    async function loadUser() {
      const token = await getToken();
      
      if (!token) {
        setLoadingUser(false);
        return;
      }
      
      setUser(token);
      setLoadingUser(false);
    }

    loadUser();
  }, []);

  
  const loginUser = async (email, password) => {
    try {
      const { data } = await loginRequest({ email, password });
      
      await setToken({user: data});
      
      setUser({user: data});
      return true;
    } catch (error) {
      throw error;
    }
  }

  const signupUser = async (
    email,
    password,
    city = "maracaibo",
    state = "1"
  ) => {
    try {
      const { data } = await signupRequest({ name,
        email,
        password,
        city,
        state
      });
      
      await setToken({user: data});
      
      setUser({user: data});
      return true;
    } catch (error) {
      throw error;
    }
  }


  async function logoutUser() {
    setUser(null);
    await deleteToken();
    
  }


  const value = useMemo(() => {
    return ({
      user,
      loadingUser,
      loginUser,
      signupUser,
      logoutUser,
    })
  }, [user, loadingUser]);

  return <AuthContext.Provider value={value} {...props} />
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be inside the provider AuthContext');
  }

  return context;
}