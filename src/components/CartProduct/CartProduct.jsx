import { Link } from 'react-router-dom';
import styles from './CartProduct.module.scss';
import Counter from '../Counter/Counter';
import { useWindowSize } from '../../context/WindowSizeContext';

function CartProduct({
  product,
  deleteCartProduct,
  increaseProductCount,
  decreaseProductCount,
}) {
  const isMobile = useWindowSize();

  function handleDeleteCartProduct() {
    deleteCartProduct(product.id);
  }

  return (
    <li className={styles.product}>
      <div className={styles.product__itemContainerMobile}>
        <Link className={styles.product__item} to={`/botdetails/${product.id}`}>
          <img
            className={styles.product__img}
            src={product.main_photo}
            alt='изображение бота'
          />
          {product.discount_category || product.discount_author > 0 ? (
            <p className={styles.product__title}>
              {product.name}
              <div className={styles.product__iconDiscountTitle} />
            </p>
          ) : (
            <p className={styles.product__title}>{product.name}</p>
          )}
        </Link>
        {isMobile && (
          <button
            className={styles.product__btnDeleteMobile}
            aria-label='delete button'
            onClick={handleDeleteCartProduct}
          />
        )}
      </div>
      <div className={styles.product__item}>
        {product.discount_category || product.discount_author > 0 ? (
          <>
            <h3 className={styles.product__priceOld}>{product.price}₽</h3>
            <h3 className={styles.product__priceDiscount}>
              {product.final_price * product.count}₽
            </h3>
            <div className={styles.product__iconDiscount} />
          </>
        ) : (
          <p className={styles.product__price}>
            {product.price * product.count}₽
          </p>
        )}

        <Counter
          product={product}
          increaseProductCount={increaseProductCount}
          decreaseProductCount={decreaseProductCount}
        />
        <button
          className={styles.product__btnDelete}
          aria-label='delete button'
          onClick={handleDeleteCartProduct}
        />
      </div>
    </li>
  );
}

export default CartProduct;
