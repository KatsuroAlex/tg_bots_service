/* eslint-disable camelcase */
const BASE_URL = 'http://80.87.96.7/api';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

const request = (endpoint, method, body, jwt) => {
  const initHeaders = jwt
    ? {
        'Content-Type': 'application/json',
        Authorization: `Token ${jwt}`,
      }
    : {
        'Content-Type': 'application/json',
      };

  const fetchInit = {
    method,
    headers: initHeaders,
  };

  return fetch(
    `${BASE_URL}/${endpoint}`,
    body
      ? {
          ...fetchInit,
          body: JSON.stringify(body),
        }
      : fetchInit
  ).then(handleResponse);
};

export const getUsersList = (email) => {
  return request('users', 'GET', email);
};

export const getUserInfo = (token) => {
  return request('users/me', 'GET', null, token);
};

export const updateUserInfo = (userData) => {
  return request('users/me', 'PATCH', userData);
};

export const deleteUser = (userData) => {
  return request('users/me', 'DELETE', userData);
};

export const resetPassword = (email) => {
  return request('users/reset_password', 'POST', { email });
};

export const setPassword = (new_password, current_password) => {
  return request('users/set_password', 'POST', {
    new_password,
    current_password,
  });
};

export const getShoppingCartUser = (userId, userData) => {
  return request(`users/${userId}/shopping_cart`, 'POST', userData);
};
