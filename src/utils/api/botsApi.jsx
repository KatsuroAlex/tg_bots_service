const BASE_URL = 'http://80.87.96.7/api';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

const request = (endpoint, method, body) => {
  const fetchInit = {
    method,
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

export const getBots = () => {
  return request('bots/', 'GET');
};

/* const getBotsUsers = () => {
  return request('users/me', 'GET');
}; */

export const createBot = (botData) => {
  return request('bots', 'POST', botData);
};

export const getBotRatings = (botId) => {
  return request(`bots/${botId}/ratings`, 'GET');
};

export const createBotRatings = (botId, botData) => {
  return request(`bots/${botId}/ratings`, 'POST', botData);
};

export const updateBotFavorite = (botId, isFavorite) => {
  return request(`bots/${botId}/favorite`, isFavorite ? 'DELETE' : 'PUT');
};

export const addBotInShoppingCart = (botId, botData) => {
  return request(`bots/${botId}/shopping_cart`, 'POST', botData);
};

export const deleteBotFromShoppingCart = (botId, botData) => {
  return request(`bots/${botId}/shopping_cart`, 'DELETE', botData);
};
