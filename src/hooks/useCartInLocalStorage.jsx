import { CART_KEY, EXPIRATION_KEY } from '../utils/constants';
// Функция для обновления состояния корзины и сохранения в localStorage
export function updateCartWithLocalStorage(cart, setCart) {
  const timestamp = new Date().getTime();
  setCart(cart);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  localStorage.setItem(EXPIRATION_KEY, timestamp.toString());
}

// Функция для проверки и удаления данных после 24 часов
export function checkAndRemoveExpiredData(isLoggedIn) {
  if (!isLoggedIn) {
    const timestamp = new Date().getTime();
    const lastUpdated = parseInt(localStorage.getItem(EXPIRATION_KEY) || 0, 10);
    if (timestamp - lastUpdated >= 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(EXPIRATION_KEY);
    }
  }
}
