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

export const recoverPasswordRequest = async (data) => {
  try {
    return await axios.post(`${API_URL}/api/users/recover`, data, {
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

export const updateWallet = async ({
  name,
  description,
  amount,
  bank,
  currency
}, walletId, userToken) => {
  try {
    return await axios.put(`${API_URL}/api/wallets/${walletId}`, {
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

export const getSingleMovement = async (movementId, userToken) => {
  try {
    return await axios.get(`${API_URL}/api/movements/${movementId}`, {
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

export const getMovementsDependencies = async (userToken) => {
  try {
    return await axios.get(`${API_URL}/api/movementsDependencies`, {
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

export const createMovement = async ({
  title,
  description,
  option,
  movementType,
  amount,
  conversionRate,
  conversionByUser
}, userToken, walletId) => {
  try {
    return await axios.post(`${API_URL}/api/movement/${walletId}`, {
      optionIDOptions: option,
      title,
      description,
      movementTypeIDMovementType: movementType,
      amount: parseFloat(amount),
      conversionRateIDConversionRate: conversionRate,
      conversionByUser
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

export const updateMovement = async ({
  title,
  description,
  option,
  movementType,
  amount,
  conversionRate,
  conversionByUser
}, userToken, movementId) => {
  try {
    return await axios.put(`${API_URL}/api/movement/${movementId}`, {
      optionIDOptions: option,
      title,
      description,
      movementTypeIDMovementType: movementType,
      amount: parseFloat(amount),
      conversionRateIDConversionRate: conversionRate,
      conversionByUser
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

export const deleteMovement = async (movementId, userToken) => {
  try {
    return await axios.delete(`${API_URL}/api/movement/${movementId}`, {
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


/* BUDGETS */

export const getUserBudgets = async (userToken) => {
  try {
    return await axios.get(`${API_URL}/api/budgetsByUser`, {
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

export const getSingleBudget = async (budgetId, userToken) => {
  try {
    return await axios.get(`${API_URL}/api/budgets/${budgetId}`, {
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

export const createBudget = async (data, userToken) => {
  try {
    return await axios.post(`${API_URL}/api/budget`, data, {
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

export const updateBudget = async (data, budgetId, userToken ) => {
  try {
    return await axios.put(`${API_URL}/api/budgets/${budgetId}`, data, {
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

export const deleteBudget = async (budgetId, userToken) => {
  try {
    return await axios.delete(`${API_URL}/api/budgets/${budgetId}`, {
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