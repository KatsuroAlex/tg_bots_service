import { useState } from 'react';
import AddNewBotsSection from '../AddNewBotSection/AddNewBotSection';
import BackButton from '../BackButton/BackButton';
import RegisterConfirmation from '../RegisterConfirmation/RegisterConfirmation';
import SellerRegisterForm from '../SellerRegisterForm/SellerRegisterForm';
import UserAgreement from '../UserAgreement/UserAgreement';
import styles from './RegisterSeller.module.scss';

function RegisterSeller({ comeBack }) {
  const [countProgress, setCountProgress] = useState(1); // состояние для прогресс бара

  // Увеличение шага прогресса
  const changeProgressBar = () => {
    if (countProgress < 5) {
      setCountProgress(countProgress + 1);
    }
  };

  return (
    <section className={styles.register}>
      <div className={styles.register__head}>
        <BackButton comeBack={comeBack} />
        <div className={styles.register__headContainer}>
          <h2 className={styles.register__title}>Регистрация продавца</h2>
          <p className={styles.register__text}>
            {countProgress === 1 &&
              `Шаг ${countProgress}. Пользовательское соглашение`}
            {countProgress === 2 &&
              `Шаг ${countProgress}. Информация о продавце`}
            {countProgress === 3 && `Шаг ${countProgress}. Добавление товара`}
            {countProgress === 4 &&
              `Шаг ${countProgress}. Завершение регистрации`}
          </p>
          <div className={styles.progress}>
            <div
              className={`${styles.progress__item} ${
                countProgress === 1 && styles.progress__item_active
              }`}
            />
            <div
              className={`${styles.progress__item} ${
                countProgress === 2 && styles.progress__item_active
              }`}
            />
            <div
              className={`${styles.progress__item} ${
                countProgress === 3 && styles.progress__item_active
              }`}
            />
            <div
              className={`${styles.progress__item} ${
                countProgress === 4 && styles.progress__item_active
              }`}
            />
          </div>
        </div>
      </div>
      <div className={styles.register__content}>
        {countProgress === 1 && (
          <UserAgreement changeProgressBar={changeProgressBar} />
        )}
        {countProgress === 2 && (
          <SellerRegisterForm changeProgressBar={changeProgressBar} />
        )}
        {countProgress === 3 && (
          <AddNewBotsSection changeProgressBar={changeProgressBar} />
        )}
        {countProgress === 4 && <RegisterConfirmation />}
      </div>
    </section>
  );
}

export default RegisterSeller;
