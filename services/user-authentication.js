import axios from 'axios';
import { API_URL } from "@env"


export const loginRequest = async ({
  email,
  password
}) => {
  try {
    console.log(API_URL);
    return await axios.post(`${API_URL}/api/auth/signin`, {
      correo: email,
      clave: password
    }, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).catch(err => {
      throw err
    });
  } catch (err) {
    throw err
  }
};

export const signupRequest = async ({
  name,
  email,
  password,
  city,
  state
}) => {
  try {
    console.log(API_URL);
    return await axios.post(`${API_URL}/api/auth/signup`, {
      nombreCompleto: name,
      correo: email,
      clave: password,
      ciudad: city,
      estadoIDestados: state
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(err => {
      throw err
    });
  } catch (err) {
    throw err
  }
};