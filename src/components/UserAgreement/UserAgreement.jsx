import { useState } from 'react';
import styles from './UserAgreement.module.scss';
import {
  userAgreementTitle,
  userAgreementText,
} from '../../utils/userAgreementText';

function UserAgreement({ changeProgressBar }) {
  const [checkbox, setCheckbox] = useState(false);

  // Проверка состояния чекбокса
  const handleChange = (e) => {
    setCheckbox(e.target.checked);
  };
  return (
    <div className={styles.agreement}>
      <h3 className={styles.agreement__title}>{userAgreementTitle.title}</h3>
      <div className={styles.agreement__content}>
        <p className={styles.agreement__info}>
          {userAgreementTitle.description}
        </p>
        <ul className={styles.agreement__list}>
          {userAgreementText.map((element) => (
            <li key={element.id} className={styles.agreement__item}>
              <h3 className={styles.agreement__itemTitle}>
                {element.id}. {element.title}
              </h3>
              {element.description.map((desc) => (
                <p
                  className={styles.agreement__itemDesc}
                  key={desc.id}
                >{`${element.id}.${desc.id}. ${desc.text}`}</p>
              ))}
            </li>
          ))}
        </ul>
        <label
          className={styles.agreement__checkbox}
          htmlFor='agreementCheckbox'
        >
          <input
            className={styles.agreement__input}
            id='agreementCheckbox'
            type='checkbox'
            onChange={handleChange}
          />
          <span className={styles.agreement__text}>
            Продолжая регистрацию аккаунта продавца и/или использование Сервиса,
            вы подтверждаете, что прочитали, понимаете, согласны со всеми
            положениями этого Соглашения.
          </span>
        </label>
      </div>
      <button
        type='button'
        className={styles.agreement__button}
        onClick={changeProgressBar}
        disabled={!checkbox}
      >
        Продолжить
      </button>
    </div>
  );
}

export default UserAgreement;
