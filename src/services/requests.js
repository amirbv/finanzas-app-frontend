import axios from 'axios';
// import { API_URL } from "@env"

// const API_URL = 'https://blooming-escarpment-45483.herokuapp.com';
const API_URL = 'http://192.168.100.13:4000'; //recuerda que si es local tiene que ser la IP de la pc

/* Login y Signup */
export const loginRequest = async ({
  email,
  password
}) => {
  try {
    return await axios.post(`${API_URL}/api/auth/signin`, {
      email: email,
      password: password
    }, {
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
    }, {
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

/* USER PROFILE */
export const getUserData = async (userId, userToken) => {
  try {
    return await axios.get(`${API_URL}/api/users/${userId}`, {
      headers: {
        "x-access-token": userToken
      }
    }).catch(error => {
      throw error;
    });

  } catch (error) {
    throw error;
  }
}

export const updateUser = async ({
  name,
  state,
  city
}, userId, userToken) => {
  try {
    return await axios.put(`${API_URL}/api/users/update/${userId}`, {
      fullName: name,
      stateIDStates: state,
      city: city
    }, {
      headers: {
        "x-access-token": userToken
      }
    }).catch(error => {
      throw error;
    });
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async ({
  oldPassword,
  newPassword,
  confirmPassword
}, userId, userToken) => {
  try {
    return await axios.put(`${API_URL}/api/users/updatePass/${userId}`, {
      password: oldPassword,
      newPassword,
      confirmPassword
    }, {
      headers: {
        "x-access-token": userToken
      }
    }).catch(error => {
      throw error
    });
  } catch (error) {
    throw error;
  }
};

/* WALLETS */

export const getUserWallets = async (userId, userToken) => {
  try {
    return await axios.get(`${API_URL}/api/walletsByUser/${userId}`, {
      headers: {
        "x-access-token": userToken
      }
    }).catch(error => {
      throw error;
    });
  } catch (error) {
    throw error;
  }
}

export const createUserWallet = async (userToken, userId, {
  walletName,
  description,
  amount,
  bank
}) => {
  try {
    return await axios.post(`${API_URL}/api/walletsByUser/`, {
      name: walletName,
      description,
      amount,
      bankIDBank: bank,
      userIDUsers: userId
    }, {
      headers: {
        "x-access-token": userToken
      }
    }).catch(error => {
      throw error;
    });
  } catch (error) {
    throw error;
  }
}