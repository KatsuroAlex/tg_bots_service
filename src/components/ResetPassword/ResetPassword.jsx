import { useContext } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';

import styles from './ResetPassword.module.scss';
import { PATTERN_EMAIL } from '../../utils/constants';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function PasswordReset({ comeBack }) {
  const { setEmail } = useContext(CurrentUserContext);
  const { values, errors, setIsValid, inputValidities, handleChange } =
    useFormAndValidation();

  const handleBlur = () => {
    setIsValid(inputValidities.email);
  };

  return (
    <section className={styles.reset}>
      <div className={styles.reset__container}>
        <div className={styles.reset__title}>
          <button
            className={styles.reset__buttonTitle}
            type='button'
            aria-label='Кнопка назад'
            onClick={comeBack}
          />
          <h3 className={styles.reset__textTitle}>Восстановления пароля</h3>
        </div>
        <form className={styles.reset__form} noValidate>
          <h3 className={styles.reset__formText}>Email</h3>

          <input
            className={styles.reset__formInput}
            id='email'
            name='email'
            type='email'
            placeholder='Введите email'
            pattern={PATTERN_EMAIL}
            defaultValue={values.email || ''}
            onBlur={(e) => {
              handleChange(e);
              setEmail(e.target.value);
              handleBlur();
            }}
            required
          />
          {!inputValidities.email && (
            <span className={styles.reset__formInput_error}>
              {errors.email}
            </span>
          )}
          <button
            className={`${styles.reset__formButton}
                ${
                  inputValidities.email
                    ? styles.reset__formButton
                    : styles.reset__formButton_disabled
                }
              `}
            type='submit'
            aria-label='Кнопка отправить'
            disabled={!inputValidities.email}
          >
            Восстановить пароль
          </button>
        </form>
      </div>
    </section>
  );
}

export default PasswordReset;
