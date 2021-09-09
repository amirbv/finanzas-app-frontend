import axios from 'axios';
// import { API_URL } from "@env"

const API_URL = 'https://blooming-escarpment-45483.herokuapp.com';
// const API_URL = 'http://localhost:3307';

export const loginRequest = async ({
  email,
  password
}) => {
  try {
    console.log(API_URL);
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
    console.log(API_URL);
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