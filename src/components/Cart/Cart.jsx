import { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CartProduct from '../CartProduct/CartProduct';
import Payment from '../Payment/Payment';
/* import ModalWithAuth from '../ModalWithAuth/ModalWithAuth';
 */ import BackButton from '../BackButton/BackButton';
import styles from './Cart.module.scss';
import {
  NUMBER_UNIT_OF_GOODS,
  NUMBER_UP_TO_FIVE_GOODS,
  TEXT_UNIT_OF_GOODS,
  TEXT_UP_TO_FIVE_GOODS,
  TEXT_MORE_THAN_UP_TO_FIVE_GOODS,
} from '../../utils/constants';
import { useWindowSize } from '../../context/WindowSizeContext';

function Cart({
  isLoggedIn,
  cartProducts,
  deleteCartProduct,
  increaseProductCount,
  decreaseProductCount,
  comeBack,
}) {
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const [totalSum, setTotalSum] = useState(0); // состояние для общей суммы заказа
  const [showFixedButton, setShowFixedButton] = useState(false);

  // функция нахождения общего е=количнства товаров в корзине
  const count = () => {
    const val = cartProducts.reduce((previousValue, product) => {
      return previousValue + product.count;
    }, 0);
    return val;
  };

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

  // функция расчета общей суммы заказа
  const findTotalSum = useCallback(() => {
    return cartProducts.reduce((previousValue, product) => {
      return previousValue + product.price * product.count;
    }, 0);
  }, [cartProducts]);

  useEffect(() => {
    const sum = findTotalSum();
    setTotalSum(sum);
  }, [cartProducts, findTotalSum]);

  // прокрутка скролла наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuyButtonClick = () => {
    navigate('/pay-form');
  };

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

  return (
    <section className={styles.cart}>
      <div className={styles.products}>
        <BackButton comeBack={comeBack} />
        <ul className={styles.products__list}>
          {cartProducts.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              deleteCartProduct={deleteCartProduct}
              increaseProductCount={increaseProductCount}
              decreaseProductCount={decreaseProductCount}
            />
          ))}
          {isMobile ? (
            <div
              className={`${styles.products__containerFixedButtonMobile} ${
                showFixedButton
                  ? ''
                  : styles.products__containerFixedButtonMobile_hidden
              }`}
            >
              <div className={styles.products__containerFix}>
                <p className={styles.products__containerFix_count}>
                  {countText}
                </p>
                <p className={styles.products__containerFix_price}>
                  {totalSum}₽
                </p>
              </div>
              <button
                className={styles.products__fixedButtonMobile}
                onClick={handleBuyButtonClick}
                aria-label='Открыть форму оплаты'
              >
                Купить
              </button>
            </div>
          ) : null}
        </ul>
        <div className={styles.products__total}>
          <h3 className={styles.products__totalTitle}>Итог</h3>
          <div className={styles.products__totalContainer}>
            <p className={styles.products__count}>Всего: {countText}</p>
            <p className={styles.products__sum}>{totalSum}₽</p>
          </div>
          {isMobile && (
            <button
              className={styles.products__buttonMobile}
              onClick={handleBuyButtonClick}
              aria-label='Открыть форму оплаты'
              ref={bottomRef}
            >
              Купить
            </button>
          )}
        </div>
      </div>
      {!isMobile && (
        <Payment
          totalSum={totalSum}
          isLoggedIn={isLoggedIn}
          countText={countText}
        />
      )}
      {/* {!isLoggedIn && !showButton && <ModalWithAuth />} */}
    </section>
  );
}

export default Cart;
