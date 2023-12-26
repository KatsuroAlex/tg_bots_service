import { useState, useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useWindowSize } from '../../context/WindowSizeContext';
import styles from './Payment.module.scss';
import PopupWithInfo from '../UI/PopupWithInfo/PopupWithInfo';
import BackButton from '../BackButton/BackButton';
import SuccessBlock from '../SuccessBlock/SuccessBlock';
import Register from '../Register/Register';

function Payment({ comeBack, totalSum, countText, isLoggedIn }) {
  const isMobile = useWindowSize();
  const { handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const [formPayment, setFormPayment] = useState({
    email: '',
    number: '',
    month: '',
    year: '',
    code: '',
    promocode: '',
  });
  const [isPaid, setPaidStatus] = useState(false);
  const [isPaidMobile, setPaidStatusMobile] = useState(false);
  const buttonClassName = isValid
    ? `${styles.payment__button} ${styles.payment__button_active}`
    : styles.payment__button;
  console.log(isPaidMobile);
  // Функця маски для номера карты
  const formatCardNumber = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedValue = numericValue.match(/.{1,4}/g);
    // Соединить группы цифр дефисами
    if (formattedValue) {
      return formattedValue.join('-');
    }
    return '';
  };

  // Маска для полей карты
  const handleCardChange = (e, fieldName) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue =
      fieldName === 'number' ? formatCardNumber(value) : value;
    setFormPayment((prevData) => ({
      ...prevData,
      [fieldName]: formattedValue,
    }));
  };

  // Маска для промокода
  const handlePromocodeChange = (e) => {
    handleChange(e);
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setFormPayment((prevCardInfo) => ({
      ...prevCardInfo,
      promocode: value,
    }));
  };

  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка валидности формы для отправки на сервер
    if (isValid) {
      setPaidStatus(true);
      // Сбрасываем все поля
      resetForm();
      setFormPayment({
        number: '',
        month: '',
        year: '',
        code: '',
        promocode: '',
      });
      // спустя три секунды убираем попап об успешной покупке, если пользователь авторизован
      if (isLoggedIn) {
        setTimeout(() => {
          setPaidStatus(false);
        }, 3000);
      }
    }
    // для мобилки
    if (isValid && !isLoggedIn) {
      setPaidStatusMobile(true);
    }
  };

  // Функция, которая сокращает сообщение об ошибке до 1 предложения в целях экономии места для соответсвия макету
  const handleError = (error) => {
    if (error) {
      const firstSentenceMatch = error.match(/([^.]*)\.\s/);
      if (firstSentenceMatch) {
        const firstSentence = firstSentenceMatch[1];
        return firstSentence;
      }
    }
    return error;
  };

  // прокрутка скролла наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.payment}>
      {isPaid && !isLoggedIn && (
        <div className={styles.payment__popap}>
          <div className={styles.payment__popap_container}>
            <div className={styles.payment__popap_register}>
              <Register />
            </div>
            <SuccessBlock title='Оплата прошла успешно!' textButton='Назад' />
          </div>
        </div>
      )}
      {isPaid && isLoggedIn && <PopupWithInfo isPaid={isPaid} />}
      <div className={styles.payment__content}>
        {isMobile ? (
          <BackButton comeBack={comeBack} />
        ) : (
          <h3 className={styles.payment__title}>Оплата картой</h3>
        )}
        <form
          action='#'
          className={styles.payment__form}
          onSubmit={handleSubmit}
        >
          <label className={styles.payment__label} htmlFor='email-input'>
            {' '}
            <span className={styles.payment__inputHeading}>
              Email для отправки бота и чека
            </span>
            <input
              name='email'
              value={formPayment.email || ''}
              placeholder='Введите email'
              type='email'
              id='email-input'
              className={styles.payment__input}
              minLength='2'
              maxLength='64'
              required
              onChange={(e) => {
                setFormPayment((prevCardInfo) => ({
                  ...prevCardInfo,
                  email: e.target.value,
                }));
              }}
              onBlur={handleChange}
            />
            {errors.email && (
              <span className={styles.payment__error}>
                {handleError(errors.email)}
              </span>
            )}
          </label>
          <fieldset className={styles.payment__card}>
            <label className={styles.payment__label} htmlFor='number-input'>
              <span className={styles.payment__inputHeading}>
                {' '}
                Номер карты для оплаты
              </span>
              <input
                className={`${styles.payment__input} ${styles.payment__inputNumber}`}
                name='number'
                value={formPayment.number || ''}
                placeholder='_ _ _ _   _ _ _ _   _ _ _ _   _ _ _ _'
                autoComplete='cc-number'
                inputMode='numeric'
                type='text'
                id='number-input'
                minLength={19}
                maxLength={19}
                required
                onChange={(e) => handleCardChange(e, 'number')}
                onBlur={handleChange}
              />
              {errors.number && (
                <span className={styles.payment__error}>
                  {handleError(errors.number)}
                </span>
              )}
            </label>
            <div className={styles.payment__cardInfo}>
              <label className={styles.payment__label} htmlFor='number-input'>
                <span className={styles.payment__inputHeading}>
                  Срок действия
                </span>
                <div className={styles.payment__cardDate}>
                  <input
                    className={`${styles.payment__input} ${styles.payment__inputDate_mm}`}
                    name='month'
                    value={formPayment.month || ''}
                    placeholder='_ _'
                    autoComplete='cc-month'
                    inputMode='numeric'
                    type='text'
                    id='month-input'
                    minLength='2'
                    maxLength='2'
                    required
                    onChange={(e) => handleCardChange(e, 'month')}
                    onBlur={handleChange}
                  />
                  <span className={styles.payment__cardDateSlash}>/</span>
                  <input
                    className={`${styles.payment__input} ${styles.payment__inputDate_gg}`}
                    name='year'
                    value={formPayment.year || ''}
                    placeholder='_ _ _ _'
                    autoComplete='cc-year'
                    inputMode='numeric'
                    type='text'
                    id='year-input'
                    minLength='4'
                    maxLength='4'
                    required
                    onChange={(e) => handleCardChange(e, 'year')}
                    onBlur={handleChange}
                  />
                </div>
              </label>
              <label
                className={`${styles.payment__label} ${styles.payment__labelCode}`}
                htmlFor='code-input'
              >
                <span className={styles.payment__inputHeading}>CVV</span>
                <input
                  className={`${styles.payment__input} ${styles.payment__inputCode}`}
                  name='code'
                  value={formPayment.code || ''}
                  placeholder='_ _ _'
                  autoComplete='cc-number'
                  inputMode='numeric'
                  type='text'
                  id='code-input'
                  minLength='3'
                  maxLength='3'
                  required
                  onChange={(e) => handleCardChange(e, 'code')}
                  onBlur={handleChange}
                />
              </label>
              {(errors.month || errors.year || errors.code) && (
                <span className={styles.payment__error}>
                  {handleError(errors.month) ||
                    handleError(errors.year) ||
                    handleError(errors.code) ||
                    ''}
                </span>
              )}
            </div>
          </fieldset>
          <p className={styles.payment__totalCount}>Всего: {countText}</p>
          <input
            className={`${styles.payment__input} ${styles.payment__inputPromocode}`}
            name='promocode'
            value={formPayment.promocode || ''}
            placeholder='Промокод'
            type='text'
            id='promocode-input'
            minLength='2'
            maxLength='6'
            onChange={handlePromocodeChange}
          />
          <div className={styles.payment__total}>
            <p className={styles.payment__sum}>{totalSum}₽</p>
            <button className={buttonClassName} disabled={!isValid}>
              Купить
            </button>
          </div>
          {isMobile && (
            <>
              <input
                className={`${styles.payment__input} ${styles.payment__inputPromocodeMobile}`}
                name='promocode'
                value={formPayment.promocode || ''}
                placeholder='Промокод'
                type='text'
                id='promocode-input'
                minLength='2'
                maxLength='6'
                onChange={handlePromocodeChange}
              />
              <div className={styles.payment__totalMobile}>
                <p className={styles.payment__totalCountMobile}>
                  Всего: {countText}
                </p>
                <p className={styles.payment__sumMobile}>{totalSum}₽</p>
              </div>
              <button className={buttonClassName} disabled={!isValid}>
                Купить
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
export default Payment;
