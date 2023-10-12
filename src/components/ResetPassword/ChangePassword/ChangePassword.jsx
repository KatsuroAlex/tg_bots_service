import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import accepted from '../../../images/accepted-min.svg';

import styles from './ChangePassword.module.scss';

import { useFormAndValidation } from '../../../hooks/useFormAndValidation';

function ChangePassword() {
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
      <div
        className={`${styles.change__container} ${
          isPasswordChanged ? styles.change__success : ''
        }`}
      >
        {isPasswordChanged ? (
          <>
            <div className={styles.change__success}>
              <img
                className={styles.change__successPicture}
                src={accepted}
                alt='Глалочка'
              />
              <h3 className={styles.change__successTitle}>
                Пароль успешно изменен!
              </h3>
            </div>
            <button
              className={styles.change__formButton}
              type='button'
              aria-label='Кнопка вернуться к авторизации'
              onClick={() => navigate('/login')}
            >
              Назад к авторизации
            </button>
          </>
        ) : (
          <>
            <div className={styles.change__title}>
              <button
                className={styles.change__buttonTitle}
                type='button'
                aria-label='Кнопка назад'
                onClick={() => navigate(-1)}
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
                    placeholder='Новый пароль (от 8 до 16 символов)'
                    value={values.password || ''}
                    minLength={8}
                    maxLength={16}
                    onChange={(e) => {
                      handleChange(e);
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
                <label
                  className={styles.change__formInput_text}
                  htmlFor='repeat'
                >
                  Повторите пароль
                  <input
                    className={styles.change__formInput}
                    id='repeat'
                    name='repeat'
                    type={isPasswordVisible.repeat ? 'text' : 'password'}
                    placeholder='Повторите пароль'
                    minLength={8}
                    maxLength={16}
                    value={values.repeat || ''}
                    onChange={(e) => {
                      handleChange(e);
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
          </>
        )}
      </div>
    </section>
  );
}

export default ChangePassword;
