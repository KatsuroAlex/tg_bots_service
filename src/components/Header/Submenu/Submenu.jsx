import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import InfiniteScroll from 'react-infinite-scroll-component';
import CurrentUserContext from '../../../context/CurrentUserContext';
import { useWindowSize } from '../../../context/WindowSizeContext';
import {
  NUMBER_UNIT_OF_GOODS,
  NUMBER_UP_TO_FIVE_GOODS,
  TEXT_UNIT_OF_GOODS,
  TEXT_UP_TO_FIVE_GOODS,
  TEXT_MORE_THAN_UP_TO_FIVE_GOODS,
  DEFAULT_PROFILE_IMAGE,
} from '../../../utils/constants';

import styles from './Submenu.module.scss';

function Submenu({ isLoggedIn, isLogOut, cartProducts, deleteCartProduct }) {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const menuRef = useRef(null);
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();

  /* функции закрытия сабменю поочередно */
  const handleBasketClick = () => {
    setIsBasketOpen(!isBasketOpen);
    setIsProfileOpen(false); // Закрываем профиль при открытии корзины
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsBasketOpen(false); // Закрываем корзину при открытии профиля
  };

  /* функция закрытия сабменю при клике на оверлей */
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsProfileOpen(false);
        setIsBasketOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  /* функция закрытия сабменю при нажатии на esc */
  useEffect(() => {
    function handleEscKeyPress(e) {
      if (e.key === 'Escape') {
        setIsBasketOpen(false);
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  /* функция закрытия сабменю при переходе на новую страницу */
  const handelRedirect = (path) => {
    setIsProfileOpen(false);
    setIsBasketOpen(false);
    navigate(path);
  };

  // функция нахождения общего е=количнства товаров в корзине
  const count = () => {
    const val = cartProducts.reduce((previousValue, product) => {
      return previousValue + product.count;
    }, 0);
    return val;
  };

  /* СЧЕТЧИК ТОВАРОВ В КОРЗИНЕ */
  let countText = '';
  if (count() === NUMBER_UNIT_OF_GOODS) {
    countText = `${count()} ${TEXT_UNIT_OF_GOODS}`;
  } else if (
    count() > NUMBER_UNIT_OF_GOODS &&
    count() < NUMBER_UP_TO_FIVE_GOODS
  ) {
    countText = `${count()} ${TEXT_UP_TO_FIVE_GOODS}`;
  } else {
    countText = `${count()} ${TEXT_MORE_THAN_UP_TO_FIVE_GOODS}`;
  }

  const handleScrollLinkClick = () => {
    if (location.pathname === '/') {
      document.getElementById('bots').scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  let profileImage = null;

  if (isLoggedIn) {
    if (currentUser && currentUser.image) {
      profileImage = (
        <img
          className={styles.submenu__buttonProfile_img}
          src={currentUser.image}
          alt='Аватар пользователя'
        />
      );
    } else {
      profileImage = (
        <div
          className={`
          ${styles.submenu__buttonProfile_default}
          ${isProfileOpen ? styles.submenu__buttonProfile_default_open : ''}
        `}
        />
      );
    }
  } else {
    profileImage = (
      <div
        className={`
        ${styles.submenu__buttonProfile_default}
        ${isProfileOpen ? styles.submenu__buttonProfile_default_open : ''}
      `}
      />
    );
  }

  return (
    <section className={styles.submenu} ref={menuRef}>
      <div className={styles.submenu__basket}>
        <button
          className={`
            ${styles.submenu__button}
            ${styles.submenu__button_basket}
            ${isBasketOpen ? styles.submenu__button_basket_open : ''}
            `}
          type='button'
          aria-label='Открыть мини-корзину'
          onClick={handleBasketClick}
        />
        {cartProducts.length > 0 ? (
          <p className={styles.submenu__basketCounter}>{count()}</p>
        ) : (
          ''
        )}
      </div>

      {isBasketOpen && (
        <div className={styles.submenu__hidden} id='parentScroll'>
          <h3 className={styles.submenu__hidden_title}>Корзина</h3>

          {cartProducts.length > 0 ? (
            <>
              <p className={styles.submenu__hidden_subtitle}>
                В вашей корзине:
                <p className={styles.submenu__hidden_countText}>{countText}</p>
              </p>

              <InfiniteScroll
                className={styles.submenu__hidden_scroll}
                dataLength={cartProducts.length}
                scrollableTarget='parentScroll'
                style={{
                  maxHeight: '250px',
                  overflow: 'auto',
                }}
              >
                {cartProducts.map((bot, index) => (
                  <div
                    className={styles.submenu__mini}
                    key={bot.id}
                    tabIndex={index + 1}
                  >
                    <div className={styles.submenu__mini_left}>
                      <img
                        className={styles.submenu__mini_img}
                        src={bot.main_photo}
                        alt='Изображение бота'
                      />
                      <div className={styles.submenu__mini_description}>
                        {bot.discount_category || bot.discount_author > 0 ? (
                          <h3 className={styles.submenu__mini_title}>
                            {bot.name}
                            <div
                              className={styles.submenu__mini_iconDiscount}
                            />
                          </h3>
                        ) : (
                          <h3 className={styles.submenu__mini_title}>
                            {bot.name}
                          </h3>
                        )}
                        <p className={styles.submenu__mini_counter}>
                          {bot.count} шт.
                        </p>
                      </div>
                    </div>
                    <div className={styles.submenu__mini_right}>
                      {bot.discount_category || bot.discount_author > 0 ? (
                        <h3 className={styles.submenu__mini_priceDiscount}>
                          {bot.count * bot.final_price}₽
                        </h3>
                      ) : (
                        <h3 className={styles.submenu__mini_price}>
                          {bot.count * bot.price}₽
                        </h3>
                      )}

                      <button
                        className={styles.submenu__mini_button}
                        type='button'
                        aria-label='Удалить товар'
                        onClick={() => {
                          deleteCartProduct(bot.id);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <p className={styles.submenu__hidden_subtitle}>
              В вашей корзине нет товаров
            </p>
          )}
          {cartProducts.length > 0 && (
            <button
              className={styles.submenu__hidden_button}
              type='button'
              aria-label='Переход на страницу корзины'
              onClick={() => handelRedirect('/cart')}
            >
              Перейти к корзине
            </button>
          )}
          {!cartProducts.length > 0 && (
            <button
              className={styles.submenu__hidden_button}
              type='button'
              aria-label='Переход на страницу каталога'
            >
              <ScrollLink
                className={styles.submenu__hidden_button_link}
                to='bots'
                smooth
                duration={1000}
                onClick={handleScrollLinkClick}
              >
                Перейти к каталогу
              </ScrollLink>
            </button>
          )}
        </div>
      )}

      <div className={styles.submenu__profile}>
        <button
          className={styles.submenu__buttonProfile}
          type='button'
          aria-label='Открыть меню профиля'
          onClick={handleProfileClick}
        >
          {profileImage}
        </button>
      </div>

      {isProfileOpen && (
        <div
          className={`
          ${styles.submenu__hidden}
          ${styles.submenu__profile_hidden}
          `}
        >
          {isLoggedIn && (
            <>
              <div className={styles.submenu__profile_description}>
                <img
                  className={styles.submenu__profile_img}
                  src={currentUser.image || DEFAULT_PROFILE_IMAGE}
                  alt='Стандартное изображение аватара'
                />
                <h3 className={styles.submenu__profile_title}>
                  {currentUser.username}
                </h3>
              </div>
              <nav className={styles.submenu__profile_navigate}>
                <Link className={styles.submenu__profile_link} to='/profile'>
                  Мой профиль
                </Link>
                <Link className={styles.submenu__profile_link} to='/favourites'>
                  Избранное
                </Link>
                <Link className={styles.submenu__profile_link} to='/faq'>
                  FAQ
                </Link>
              </nav>
              <button
                className={`
                ${styles.submenu__hidden_button}
                ${styles.submenu__hidden_button_link}
                `}
                type='button'
                aria-label='Выйти из профиля'
                onClick={isLogOut}
              >
                Выйти
              </button>
            </>
          )}
          {!isLoggedIn && !isMobile && (
            <>
              <p
                className={`
                ${styles.submenu__hidden_subtitle}
                ${styles.submenu__hidden_subtitle_profile}
                `}
              >
                Вы не вошли в систему
              </p>
              <button
                className={styles.submenu__hidden_button}
                type='button'
                aria-label='Войти в профиль'
                onClick={() => handelRedirect('/login')}
              >
                Войти
              </button>
              <button
                className={`${styles.submenu__hidden_button} ${styles.submenu__hidden_button_reg}`}
                type='button'
                aria-label='Войти в профиль'
                onClick={() => handelRedirect('/signup')}
              >
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      )}
      {isProfileOpen && isMobile && !isLoggedIn && (
        <div className={styles.submenu__mobileContainer}>
          <div className={styles.submenu__mobileProfile}>
            <p className={styles.submenu__mobileProfile_subtitle}>
              Вы не вошли в систему!
            </p>
            <button
              className={styles.submenu__mobileButton_login}
              type='button'
              aria-label='Войти в профиль'
              onClick={() => handelRedirect('/login')}
            >
              Войти
            </button>
            <button
              className={styles.submenu__mobileButton_auth}
              type='button'
              aria-label='Зарегистрироваться'
              onClick={() => handelRedirect('/signup')}
            >
              Зарегистрироваться
            </button>
            <button
              className={styles.submenu__mobileButton_close}
              type='button'
              aria-label='Закрыть'
              onClick={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Submenu;
