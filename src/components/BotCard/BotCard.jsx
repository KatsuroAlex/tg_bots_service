import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Counter from '../Counter/Counter';
import { wrapAuthorName } from '../../utils/helpers';
import styles from './BotCard.module.scss';

const BotCard = ({
  mainPhoto,
  name,
  author,
  categories,
  discountAuthor,
  discountCategory,
  finalPrice,
  price,
  onBuyClick,
  isProductInCart,
  cartProducts,
  id,
  increaseProductCount,
  decreaseProductCount,
}) => {
  const [botStatus, setBotStatus] = useState(false); // состояние наличия бота в корзине
  // Определить состояние кнопки купить в зависимости от наличия бота в корзине
  useEffect(() => {
    if (id && isProductInCart) {
      setBotStatus(isProductInCart(id));
    }
  }, [id, isProductInCart, cartProducts]);

  return (
    <div className={styles.bot}>
      <div className={styles.bot__background}>
        <Link className={styles.bot__linkImg} to={`/botdetails/${id}`}>
          {/* Используем Link для перехода */}
          <img className={styles.bot__img} src={mainPhoto} alt='bot img' />
        </Link>
      </div>
      <div className={styles.bot__brief}>
        <p className={styles.bot__name}>{name}</p>
        <p className={styles.bot__author}>{wrapAuthorName(author)}</p>
      </div>
      <div className={styles.bot__categories}>
        <p className={styles.bot__category}>
          {categories && categories.length > 0
            ? categories[0]
            : 'Нет категории'}
        </p>
        {/* {categories.length > 1 && (
          <p className={styles.bot__category}>+{categories.length - 1}</p>
        )} */}
      </div>
      {discountAuthor || discountCategory > 0 ? (
        <div className={styles.bot__discountContainer}>
          <p className={styles.bot__finalPrice}>{finalPrice}₽</p>
          <p className={styles.bot__oldPrice}>{price}₽</p>
          <span className={styles.bot__discountSize}>
            -{discountAuthor || discountCategory}%
          </span>
        </div>
      ) : (
        <p className={styles.bot__price}>{price}₽</p>
      )}
      <div className={styles.bot__buttons}>
        <button
          className={styles.bot__favBtn}
          type='button'
          aria-label='Add-to-favourites'
          aria-hidden='true'
        />
        {!botStatus ? (
          <button
            className={styles.bot__buyBtn}
            type='button'
            aria-label='Buy'
            onClick={onBuyClick}
            disabled={botStatus}
          >
            В корзину
          </button>
        ) : (
          <Counter
            product={cartProducts.find((obj) => obj.id === id)}
            increaseProductCount={increaseProductCount}
            decreaseProductCount={decreaseProductCount}
          />
        )}
      </div>
    </div>
  );
};

export default BotCard;
