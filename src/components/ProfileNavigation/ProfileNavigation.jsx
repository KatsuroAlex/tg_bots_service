import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProfileNavigation.module.scss';
import CurrentUserContext from '../../context/CurrentUserContext';
import foto from '../../images/defaultImage.svg';

function ProfileNavigation({ onLogout }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const { pathname } = useLocation();

  return (
    <main className={styles.profileNavigation}>
      <div className={styles.profileNavigation__profileContainer}>
        <img
          className={styles.profileNavigation__image}
          src={currentUser.image ? currentUser.image : foto}
          alt='фото профиля'
        />
        <h1 className={styles.profileNavigation__name}>
          {currentUser.username}
        </h1>
        {/* <h1 className={styles.profileNavigation__name}>Имя</h1> */}
      </div>
      <nav className={styles.profileNavigation__navigation}>
        <Link to='/profile' className={styles.profileNavigation__link}>
          <div
            className={
              pathname === '/profile'
                ? `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_user} ${styles.profileNavigation__icon_user_activ}`
                : `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_user}`
            }
          />
          <p
            className={
              pathname === '/profile'
                ? `${styles.profileNavigation__textLink} ${styles.profileNavigation__textLink_activ}`
                : `${styles.profileNavigation__textLink}`
            }
          >
            Личные данные
          </p>
        </Link>
        <Link to='/purchases' className={styles.profileNavigation__link}>
          <div
            className={
              pathname === '/purchases'
                ? `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_purchases} ${styles.profileNavigation__icon_purchases_activ}`
                : `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_purchases}`
            }
          />
          <p
            className={
              pathname === '/purchases'
                ? `${styles.profileNavigation__textLink} ${styles.profileNavigation__textLink_activ}`
                : `${styles.profileNavigation__textLink}`
            }
          >
            Мои покупки
          </p>
        </Link>
        <Link to='/favourites' className={styles.profileNavigation__link}>
          <div
            className={
              pathname === '/favourites'
                ? `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_favourites} ${styles.profileNavigation__icon_favourites_activ}`
                : `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_favourites}`
            }
          />
          <p
            className={
              pathname === '/favourites'
                ? `${styles.profileNavigation__textLink} ${styles.profileNavigation__textLink_activ}`
                : `${styles.profileNavigation__textLink}`
            }
          >
            Избранное
          </p>
        </Link>
        <Link to='/faq' className={styles.profileNavigation__link}>
          <div
            className={
              pathname === '/faq'
                ? `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_faq} ${styles.profileNavigation__icon_faq_activ}`
                : `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_faq}`
            }
          />
          <p
            className={
              pathname === '/faq'
                ? `${styles.profileNavigation__textLink} ${styles.profileNavigation__textLink_activ}`
                : `${styles.profileNavigation__textLink}`
            }
          >
            FAQ
          </p>
        </Link>
        <Link to='/seller' className={styles.profileNavigation__link}>
          <div
            className={
              pathname === '/seller'
                ? `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_seller} ${styles.profileNavigation__icon_seller_activ}`
                : `${styles.profileNavigation__icon} ${styles.profileNavigation__icon_seller}`
            }
          />
          <p
            className={
              pathname === '/seller'
                ? `${styles.profileNavigation__textLink} ${styles.profileNavigation__textLink_activ}`
                : `${styles.profileNavigation__textLink}`
            }
          >
            Стать продавцом
          </p>
        </Link>
        <Link
          to='/'
          className={styles.profileNavigation__link}
          onClick={onLogout}
        >
          <div
            className={`${styles.profileNavigation__icon} ${styles.profileNavigation__icon_exit}`}
          />
          <p className={styles.profileNavigation__textLink}>Выйти</p>
        </Link>
      </nav>
    </main>
  );
}

export default ProfileNavigation;
