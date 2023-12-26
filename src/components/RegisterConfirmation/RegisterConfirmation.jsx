import styles from './RegisterConfirmation.module.scss';
import sellerImage from '../../images/seller-image.png';

function RegisterConfirmation({ changeProgressBar }) {
  return (
    <section className={styles.confirm}>
      <h2 className={styles.confirm__title}>
        Регистрация продавца успешно завершена!
      </h2>
      <div className={styles.confirm__info}>
        <div className={styles.confirm__imageContainer}>
          <img
            src={sellerImage}
            alt='seller'
            className={styles.confirm__image}
          />
          <div className={styles.confirm__icon} />
        </div>
        <p className={styles.confirm__desc}>
          <span className={styles.confirm__text}>
            Теперь вам доступна возможность выкладывать свой товар у нас на
            платформе! Мы добавили к аватару вашего профиля значок, отличающий
            аккаунт продавца от обычного.
          </span>
          <span className={styles.confirm__text}>
            Управлять вашим профилем продавца вы можете из блока «Данные
            продавца» в личном кабинете.
          </span>
        </p>
      </div>
      <button
        type='button'
        className={styles.confirm__button}
        onClick={changeProgressBar}
      >
        Продолжить
      </button>
    </section>
  );
}

export default RegisterConfirmation;
