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
export const getUserData = async (userToken) => {
  try {
    return await axios.get(`${API_URL}/api/users`, {
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
}, userToken) => {
  try {
    return await axios.put(`${API_URL}/api/users/update`, {
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
}, userToken) => {
  try {
    return await axios.put(`${API_URL}/api/users/updatePass`, {
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

export const getUserWallets = async (userToken) => {
  try {
    return await axios.get(`${API_URL}/api/walletsByUser`, {
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

export const getWalletInfo = async (userToken, walletId) => {
  try {
    return await axios.get(`${API_URL}/api/wallets/${walletId}`, {
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

export const getWalletDependencies = async (userToken) => {
  try {
    return await axios.get(`${API_URL}/api/walletsDependencies`, {
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

export const createUserWallet = async ({
  name,
  description,
  amount,
  bank,
  currency
}, userToken) => {
  try {
    return await axios.post(`${API_URL}/api/wallets`, {
      name,
      description,
      amount: parseFloat(amount),
      bankIDBank: bank,
      currencyTypeIDCurrencyType: currency
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

export const deleteWallet = async (walletId, userToken) => {
  try {
    return await axios.delete(`${API_URL}/api/wallets/${walletId}`, {
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

/* MOVEMENTS */

export const getMovements = async (userToken, walletId) => {
  try {
    return await axios.get(`${API_URL}/api/movementsByWallet/${walletId}`, {
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
