import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessBlock from '../../SuccessBlock/SuccessBlock';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';

import styles from './ChangePassword.module.scss';

function ChangePassword({ comeBack }) {
  const navigate = useNavigate();
  const {
    values,
    errors,
    setErrors,
    handleChange,
    isValid,
    setIsValid,
    inputValidities,
  } = useFormAndValidation();

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    repeat: false,
  }); // состояние просмотра пароля
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  /* ФУНКЦИЯ ИЗМЕНЕНИЯ ВИДИМОСТИ ПОЛЯ С ПАРОЛЕМ */
  function handlePasswordVisibility(field) {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  /* ФУНКЦИЯ ПРОВЕРКИ ПАРОЛЕЙ НА СОВПАДЕНИЕ */
  const handleCheckMatchPassword = useCallback(() => {
    const match = values.password === values.repeat;
    setPasswordsMatch(match);
    const inputValid = inputValidities.password && inputValidities.repeat;

    if (!match) {
      setErrors({ ...errors, common: 'Пароли не совпадают' });
    } else {
      setErrors('');
    }

    setIsValid(match && inputValid);
  }, [
    values.password,
    values.repeat,
    inputValidities.password,
    inputValidities.repeat,
    setIsValid,
    setErrors,
    errors,
  ]);

  /* ПРОВЕРКА СОВПАДЕНИЙ ПАРОЛЕЙ ПРИ КАЖДОМ ВВОДИМОМ ЗНАЧЕНИИ */
  useEffect(() => {
    handleCheckMatchPassword();
  }, [
    handleCheckMatchPassword,
    values.password,
    values.repeat,
    inputValidities.password,
    inputValidities.repeat,
  ]);

  // Функция для валидации текущего поля при смене фокуса
  const handleBlur = useCallback(() => {
    if (focusedField === 'password') {
      //
    } else if (focusedField === 'repeat') {
      //
    }
  }, [focusedField]);

  // Эффект для запуска валидации при изменении состояния focusedField
  useEffect(() => {
    handleBlur();
  }, [focusedField, handleBlur]);

  /* ФУНКЦИЯ ОТПРАВКИ НОВОГО ПАРОЛЯ НА СЕРВЕР И ОТОБРАЖЕНИЯ ОКНА С УСПЕХОМ СМЕНЫ ПАРОЛЯ */
  function sendNewPassword() {
    handleCheckMatchPassword();

    if (isValid && passwordsMatch) {
      /* логика отправки данных на сервер */
      setIsPasswordChanged(true);
    }
  }

  return (
    <section className={styles.change}>
      {isPasswordChanged ? (
        <SuccessBlock
          title='Пароль успешно изменен!'
          textButton='Войти'
          path='/login'
        />
      ) : (
        <div className={styles.change__container}>
          <div className={styles.change__title}>
            <button
              className={styles.change__buttonTitle}
              type='button'
              aria-label='Кнопка назад'
              onClick={comeBack}
            />
            <h3 className={styles.change__textTitle}>Введите новый пароль</h3>
          </div>
          <form
            className={styles.change__form}
            noValidate
            onSubmit={sendNewPassword}
          >
            <fieldset className={styles.change__formInput_container}>
              <label
                htmlFor='password'
                className={styles.change__formInput_text}
              >
                Новый пароль
                <input
                  className={styles.change__formInput}
                  id='password'
                  name='password'
                  type={isPasswordVisible.password ? 'text' : 'password'}
                  placeholder='Введите новый пароль'
                  defaultValue={values.password || ''}
                  minLength={8}
                  maxLength={16}
                  onFocus={() => setFocusedField('password')}
                  onBlur={(e) => {
                    handleChange(e);
                    handleBlur();
                  }}
                  required
                />
              </label>
              <button
                className={`${styles.change__formButton_look} ${
                  isPasswordVisible.password
                    ? styles.change__formButton_look_open
                    : styles.change__formButton_look_close
                }`}
                type='button'
                aria-label='Кнопка скрыть/показать пароль'
                onClick={() => handlePasswordVisibility('password')}
              />
              <span className={styles.change__formInput_error}>
                {errors.password}
              </span>
            </fieldset>
            <fieldset className={styles.change__formInput_container}>
              <label className={styles.change__formInput_text} htmlFor='repeat'>
                Повторите пароль
                <input
                  className={styles.change__formInput}
                  id='repeat'
                  name='repeat'
                  type={isPasswordVisible.repeat ? 'text' : 'password'}
                  placeholder='Повторите новый пароль'
                  minLength={8}
                  maxLength={16}
                  defaultValue={values.repeat || ''}
                  onFocus={() => setFocusedField('repeat')}
                  onBlur={(e) => {
                    handleChange(e);
                    handleBlur();
                  }}
                  required
                />
              </label>
              <button
                className={`${styles.change__formButton_look} ${
                  isPasswordVisible.repeat
                    ? styles.change__formButton_look_open
                    : styles.change__formButton_look_close
                }`}
                type='button'
                aria-label='Кнопка скрыть/показать пароль'
                onClick={() => handlePasswordVisibility('repeat')}
              />
              <span className={styles.change__formInput_error}>
                {errors.repeat || errors.common}
              </span>
            </fieldset>
            <button
              className={`${styles.change__formButton}
                  ${
                    isValid && passwordsMatch
                      ? styles.change__formButton
                      : styles.change__formButton_disable
                  }`}
              type='button'
              aria-label='Кнопка сменить пароль'
              disabled={!isValid || !passwordsMatch}
              onClick={sendNewPassword}
            >
              Сменить пароль
            </button>
            <button
              className={styles.change__cancelButton}
              type='button'
              aria-label='Кнопка отменить'
              onClick={() => {
                navigate('/');
              }}
            >
              Отменить
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default ChangePassword;
