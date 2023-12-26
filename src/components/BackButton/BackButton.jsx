import { useLocation, useParams } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { useWindowSize } from '../../context/WindowSizeContext';

function BackButton({ botName, title, comeBack }) {
  const location = useLocation();
  const { id, botId } = useParams();
  const isMobile = useWindowSize();

  return (
    <div className={styles.returnElement}>
      {isMobile ? (
        <button className={styles.returnElement__btn} onClick={comeBack}>
          <p className={styles.returnElement__title}>
            {location.pathname === '/cart' ? 'Корзина' : ''}
            {location.pathname === '/pay-form' ? 'Оплата картой' : ''}
            {location.pathname === '/signup-seller'
              ? 'Регистрация продавца'
              : ''}
            {location.pathname === `/special-offers/${id}` ? title : ''}
            {location.pathname === `/botdetails/${botId}` ? botName : ''}
          </p>
        </button>
      ) : (
        <button className={styles.returnElement__btn} onClick={comeBack}>
          <p className={styles.returnElement__title}>Назад</p>
        </button>
      )}
      <p className={styles.returnElement__ref}>
        {location.pathname === '/signup-seller'
          ? `Профиль / Регистрация продавца / ${title}`
          : `Главная страница / ${
              location.pathname === '/cart' ? 'Корзина' : ''
            }
        ${location.pathname === '/signup-seller' ? 'Регистрация продавца' : ''}
        ${location.pathname === `/special-offers/${id}` ? title : ''}
        ${location.pathname === `/botdetails/${botId}` ? botName : ''}`}
      </p>
    </div>
  );
}

export default BackButton;
