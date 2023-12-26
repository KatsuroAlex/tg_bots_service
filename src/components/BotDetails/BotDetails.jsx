/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Импортируем useParams для доступа к параметрам маршрута
import styles from './BotDetails.module.scss';
// import DetailsBasket from '../DetailsBasket/DetailsBasket';
import BotBody from '../BotBody/BotBody';
import Rating from '../Rating/Rating';
import ScreenExamples from '../ScreenExamples/ScreenExamples';
import Counter from '../Counter/Counter';
import BackButton from '../BackButton/BackButton';
import { fetchBotById } from '../../utils/api/getBotByID';
import Reviews from '../Reviews/Reviews';
import { useWindowSize } from '../../context/WindowSizeContext';

function BotDetails({
  apiBots,
  cartProducts,
  addProductToCart,
  isProductInCart,
  increaseProductCount,
  decreaseProductCount,
  comeBack,
}) {
  const isMobile = useWindowSize();
  // Используем useParams для извлечения параметра маршрута (botId)
  const botsArray = apiBots.results; // достаем массив с ботами с АПИ
  console.log(botsArray);
  const { botId } = useParams(); // достаем элементы карточки с ботом с главной страницы
  const navigate = useNavigate();
  const [showFixedButton, setShowFixedButton] = useState(false);
  const bottomRef = useRef(null);
  const [botStatus, setBotStatus] = useState(false); // состояние наличия бота в корзине
  const botIdNumber = parseInt(botId, 10); // конвертируем в число
  // const bot = botsArray.find((item) => item.id === botIdNumber); // Ищем бота с соответствующим id в JSON-массиве
  console.log(botIdNumber);

  // делаем запрос на получение конкретного бота
  const [currentBotById, setCurrentBotById] = useState(null);

  useEffect(() => {
    async function fetchBotId() {
      const botCardId = await fetchBotById(botIdNumber);
      setCurrentBotById(botCardId);
    }
    fetchBotId(botIdNumber);
  }, [botIdNumber]);

  console.log(currentBotById);

  // Определить состояние кнопки купить в зависимости от наличия бота в корзине
  useEffect(() => {
    if (botIdNumber && isProductInCart) {
      setBotStatus(isProductInCart(botIdNumber));
    }
  }, [botIdNumber, isProductInCart, cartProducts]);

  // добавить в корзину
  const handleBuyClick = (item) => {
    addProductToCart(item);
  };

  const handelRedirect = (path) => {
    navigate(path);
  };

  // прокрутка скролла наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // автоматическое скрытие зафиксированного блока купить на мобилке
  useEffect(() => {
    const handleScroll = () => {
      const bottomElem = bottomRef.current;

      if (!bottomElem) {
        return;
      }
      if (bottomElem.getBoundingClientRect().top < window.innerHeight) {
        setShowFixedButton(false);
      } else {
        setShowFixedButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const counterStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '20px',
    backgroundColor: '$background-white',
    borderRadius: '10px',
    border: '$border-main',
    maxWidth: '205px',
    width: '100%',
    height: '40px',
    padding: '8px 45px',
    boxSizing: 'border-box',
    transition: '0.3s',
    margin: '0 auto 0 65px',
  };

  const counterStylesMobile = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '10px',
    backgroundColor: '$background-white',
    borderRadius: '10px',
    border: '$border-main',
    maxWidth: '205px',
    width: '125px',
    height: '40px',
    padding: '10px',
    boxSizing: 'border-box',
    transition: '0.3s',
    margin: '0',
  };

  if (!currentBotById) {
    // Если бот с заданным id не найден, можно отобразить сообщение об ошибке
    return console.log('бот не найден');
  }

  return (
    <section className={styles.details}>
      {isMobile ? (
        <div className={styles.details__mainSection}>
          <BotBody
            botImage={currentBotById.main_photo}
            botName={currentBotById.name}
            botAuthor={currentBotById.author}
            botCategory={currentBotById.category}
            botDescription={currentBotById.description}
            comeBack={comeBack}
          />
          {!botStatus ? (
            <div
              className={`${styles.basketSection__containerFixedButtonMobile} ${
                showFixedButton
                  ? ''
                  : styles.basketSection__containerFixedButtonMobile_hidden
              }`}
            >
              <button
                className={styles.basketSection__buttonAddTo}
                type='button'
                aria-label='Buy'
                onClick={() => handleBuyClick(currentBotById)}
                disabled={botStatus}
              >
                Добавить в корзину
              </button>
            </div>
          ) : (
            <div
              className={`${styles.basketSection__containerFixedButtonMobile} ${
                showFixedButton
                  ? ''
                  : styles.basketSection__containerFixedButtonMobile_hidden
              }`}
            >
              <button
                className={styles.basketSection__buttonAddTo}
                type='button'
                aria-label='Cart redirect'
                onClick={() => handelRedirect('/cart')}
              >
                Перейти в корзину
              </button>
            </div>
          )}
          <ScreenExamples array={currentBotById.photo_examples} />
          <Rating currentBotById={currentBotById} />

          <div className={styles.basketSection}>
            <div className={styles.basketSection__basket}>
              <h2 className={styles.basketSection__title}>Цена:</h2>

              {currentBotById.discount > 0 ? (
                <div className={styles.basketSection__discountContainer}>
                  <p className={styles.basketSection__finalPrice}>
                    {currentBotById.final_price}₽
                  </p>
                  <p className={styles.basketSection__oldPrice}>
                    {currentBotById.price}₽
                  </p>
                  <span className={styles.basketSection__discountSize}>
                    -{currentBotById.discount}%
                  </span>
                </div>
              ) : (
                <p className={styles.basketSection__totalPrice}>
                  <span>{currentBotById.price}</span>&#8381;
                </p>
              )}
              <div className={styles.basketSection__basketButton}>
                {!botStatus ? (
                  <button
                    ref={bottomRef}
                    className={styles.basketSection__buttonAddTo}
                    type='button'
                    aria-label='Buy'
                    onClick={() => handleBuyClick(currentBotById)}
                    disabled={botStatus}
                  >
                    Добавить в корзину
                  </button>
                ) : (
                  <>
                    <Counter
                      product={cartProducts.find(
                        (obj) => obj.id === currentBotById.id
                      )}
                      increaseProductCount={increaseProductCount}
                      decreaseProductCount={decreaseProductCount}
                      customStyles={
                        isMobile ? counterStylesMobile : counterStyles
                      }
                    />
                    <button
                      ref={bottomRef}
                      className={styles.basketSection__button}
                      type='button'
                      aria-label='Cart redirect'
                      onClick={() => handelRedirect('/cart')}
                    >
                      Перейти в корзину
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.details__mainSection}>
            <BackButton botName={currentBotById.name} comeBack={comeBack} />
            <BotBody
              botImage={currentBotById.main_photo}
              botName={currentBotById.name}
              botAuthor={currentBotById.author}
              botCategory={currentBotById.category}
              botDescription={currentBotById.description}
            />
            <ScreenExamples array={currentBotById.photo_examples} />

            <Rating currentBotById={currentBotById} />
          </div>

          {/* <DetailsBasket botPrice={bot.price} onClick={} disabled={} /> */}
          <div className={styles.basketSection}>
            <div className={styles.basketSection__basket}>
              <h2 className={styles.basketSection__title}>Цена:</h2>
              {currentBotById.discount > 0 ? (
                <>
                  <p className={styles.basketSection__finalPrice}>
                    {currentBotById.final_price}₽
                  </p>
                  <div className={styles.basketSection__discountContainer}>
                    <p className={styles.basketSection__oldPrice}>
                      {currentBotById.price}₽
                    </p>
                    <span className={styles.basketSection__discountSize}>
                      -{currentBotById.discount}%
                    </span>
                  </div>
                </>
              ) : (
                <p className={styles.basketSection__totalPrice}>
                  <span>{currentBotById.price}</span>&#8381;
                </p>
              )}
              {!botStatus ? (
                <button
                  className={styles.basketSection__button}
                  type='button'
                  aria-label='Buy'
                  onClick={() => handleBuyClick(currentBotById)}
                  disabled={botStatus}
                >
                  Добавить в корзину
                </button>
              ) : (
                <>
                  <Counter
                    product={cartProducts.find(
                      (obj) => obj.id === currentBotById.id
                    )}
                    increaseProductCount={increaseProductCount}
                    decreaseProductCount={decreaseProductCount}
                    customStyles={counterStyles}
                  />
                  <button
                    className={styles.basketSection__button}
                    type='button'
                    aria-label='Cart redirect'
                    onClick={() => handelRedirect('/cart')}
                  >
                    Перейти в корзину
                  </button>
                </>
              )}
            </div>
          </div>

          <Reviews />
        </>
      )}
    </section>
  );
}
export default BotDetails;
