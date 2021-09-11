import axios from 'axios';
// import { API_URL } from "@env"

// const API_URL = 'https://blooming-escarpment-45483.herokuapp.com';
const API_URL = 'http://192.168.100.13:4000'; //recuerda que si es local tiene que ser la IP de la pc

export const loginRequest = async ({
  email,
  password
}) => {
  try {
    return await axios.post(`${API_URL}/api/auth/signin`, {
      email: email,
      password: password
    }, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).catch(error => {
      throw error
    });
  } catch (error) {
    throw error
  }
};

export const signupRequest = async ({
  name,
  email,
  password,
  state,
  city
}) => {
  try {
    return await axios.post(`${API_URL}/api/auth/signup`, {
      fullName: name,
      email: email,
      password: password,
      stateIDStates: state,
      city: city
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(error => {
      throw error
    });
  } catch (error) {
    throw error
  }
};

export const getStates = async () => {
  try {
    return await axios.get(`${API_URL}/api/states`).catch(error => {
      throw error;
    });
    
  } catch (error) {
    throw error;
  }
};