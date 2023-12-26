import styles from './Counter.module.scss';

function Counter({
  product,
  increaseProductCount,
  decreaseProductCount,
  customStyles,
}) {
  if (!product) {
    return <div>0</div>;
  }

  function handleIncreaseProduct() {
    increaseProductCount(product.id);
  }

  function handleDecreaseProduct() {
    decreaseProductCount(product.id);
  }

  return (
    <div className={styles.product__count} style={customStyles}>
      <button
        className={`${styles.product__btnCount} ${styles.product__btnCount_type_minus}`}
        onClick={handleDecreaseProduct}
        aria-label='Уменьшить количество продукта'
      />
      <span className={styles.product__countProperity}>{product.count}</span>
      <button
        className={`${styles.product__btnCount} ${styles.product__btnCount_type_plus}`}
        onClick={handleIncreaseProduct}
        aria-label='Увеличить количество продукта'
      />
    </div>
  );
}

export default Counter;
