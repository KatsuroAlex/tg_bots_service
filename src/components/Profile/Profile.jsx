/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './Profile.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import CurrentUserContext from '../../context/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { PATTERN_EMAIL } from '../../utils/constants';
import CheckBox from '../CheckBox/CheckBox';

function Profile({ onLogout }) {
  const [editButton, setEditButton] = React.useState(false);
  const [editButtonNotifications, setEditButtonNotifications] =
    React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isDisabledNotifications, setIsDisabledNotifications] =
    React.useState(true);
  const [isUsernameError, setIsUsernameError] = React.useState(false);
  const [isPhoneError, setIsPhoneError] = React.useState(false);
  const [isDateError, setIsDateError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation({});
  const { currentUser } = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [currentUser, setValues]);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsDisabled(false);
    setEditButton(true);
  };

  const handleEditNotifications = (e) => {
    e.preventDefault();
    setIsDisabledNotifications(false);
    setEditButtonNotifications(true);
  };

  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      <section className={styles.user}>
        <div className={styles.user__titleContainer}>
          <h2 className={styles.user__title}>Личные данные</h2>
          {!editButton ? (
            <button
              className={styles.user__button}
              aria-label='редактировать'
              onClick={handleEdit}
            />
          ) : (
            <button
              className={`${styles.user__button} ${styles.user__button_activ}`}
              aria-label='редактировать'
            />
          )}
        </div>
        <form className={styles.user__form} noValidate>
          <div className={styles.user__inputContainer}>
            <label className={styles.user__text}>Имя и фамилия</label>
            <input
              className={styles.user__input}
              type='text'
              name='username'
              id='username'
              value={values.username || ''}
              disabled={isDisabled}
              onChange={handleChange}
              minLength='2'
              maxLength='30'
              required
              pattern='^[a-zA-Zа-яА-Я\s]+$'
              onBlur={() => {
                setIsUsernameError(true);
              }}
            />
            <span
              className={`${styles.user__error} ${
                isUsernameError && styles.user__errorVisible
              }`}
            >
              {errors.username}
            </span>
          </div>
          <div className={styles.user__inputContainer}>
            <label className={styles.user__text}>Телефон</label>
            <input
              className={styles.user__input}
              type='tel'
              name='phone'
              id='phone'
              placeholder='введите в формате 10 цифр'
              value={values.phone || ''}
              disabled={isDisabled}
              onChange={handleChange}
              minLength='10'
              pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
              onBlur={() => {
                setIsPhoneError(true);
              }}
            />
            <span
              className={`${styles.user__error} ${
                isPhoneError && styles.user__errorVisible
              }`}
            >
              {errors.phone}
            </span>
          </div>
          <div className={styles.user__inputContainer}>
            <label className={styles.user__text}>Дата рождения</label>
            <input
              className={styles.user__input}
              type='date'
              name='date'
              id='date'
              value={values.date || ''}
              disabled={isDisabled}
              onChange={handleChange}
              onBlur={() => {
                setIsDateError(true);
              }}
              minLength='10'
              maxLength='10'
              pattern='^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).\d{4}$'
            />
            <span
              className={`${styles.user__error} ${
                isDateError && styles.user__errorVisible
              }`}
            >
              {errors.date}
            </span>
          </div>
          <div className={styles.user__inputContainer}>
            <label className={styles.user__text}>Почта</label>
            <input
              className={styles.user__input}
              type='email'
              name='email'
              id='email'
              value={values.email || ''}
              disabled={isDisabled}
              onChange={handleChange}
              minLength='2'
              required
              pattern={PATTERN_EMAIL}
              onBlur={() => {
                setIsEmailError(true);
              }}
            />
            <span
              className={`${styles.user__error} ${
                isEmailError && styles.user__errorVisible
              }`}
            >
              {errors.email}
            </span>
          </div>
          <div className={styles.user__inputContainer}>
            <label className={styles.user__text}>Пол</label>
            {editButton ? (
              <select
                className={styles.user__select}
                name='sex'
                id='sex'
                value={values.sex || ''}
                disabled={isDisabled}
                onChange={handleChange}
              >
                <option>{}</option>
                <option>мужской</option>
                <option>женский</option>
              </select>
            ) : (
              <input
                className={styles.user__input}
                type='text'
                name='sex'
                id='sex'
                value={values.sex || ''}
                disabled={isDisabled}
                onChange={handleChange}
              />
            )}
            {/* // <select
            //   className={styles.user__select}
            //   name='sex'
            //   id='sex'
            //   value={values.sex || ''}
            //   disabled={isDisabled}
            //   onChange={handleChange}
            // >
            //   <option>мужской</option>
            //   <option>женский</option>
            // </select> */}
          </div>
          {editButton && (
            <button className={styles.user__buttonEdit} disabled={!isValid}>
              Сохранить изменения
            </button>
          )}
        </form>
        <div
          className={`${styles.user__titleContainer} ${styles.user__titleContainer_notification}`}
        >
          <h2 className={styles.user__title}>Уведомления</h2>
          {!editButtonNotifications ? (
            <button
              className={styles.user__button}
              aria-label='редактировать'
              onClick={handleEditNotifications}
            />
          ) : (
            <button
              className={`${styles.user__button} ${styles.user__button_activ}`}
              aria-label='редактировать'
            />
          )}
        </div>
        <form className={styles.user__formNotifications}>
          <div className={styles.user__inputContainer}>
            <label className={styles.user__text}>Получать на почту</label>
            <input
              className={styles.user__input}
              type='email'
              name='email'
              id='email'
              value={values.email || ''}
              disabled={isDisabledNotifications}
              onChange={handleChange}
              minLength='2'
              pattern={PATTERN_EMAIL}
            />
          </div>
          {editButtonNotifications && (
            <button
              className={`${styles.user__buttonEdit} ${styles.user__buttonEdit_notification}`}
              disabled={!isValid}
            >
              Сохранить изменения
            </button>
          )}
        </form>
        <div className={styles.user__checkBoxContainer}>
          <CheckBox title='Рассылки с акциями и скидками' />
          <CheckBox title='Уведомления о товарах в избранном' />
        </div>
      </section>
    </main>
  );
}

export default Profile;
