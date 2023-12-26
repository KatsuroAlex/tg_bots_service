import axios from 'axios';
import { BASE_URL } from '../constants';

export const fetchBotById = async (botId) => {
  try {
    const apiUrl = `${BASE_URL}${botId}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
