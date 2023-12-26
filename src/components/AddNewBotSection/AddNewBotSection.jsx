import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AddNewBotSection.module.scss';
import AddNewBotForm from './AddNewBotForm/AddNewBotForm';
import { useWindowSize } from '../../context/WindowSizeContext';

function AddNewBotsSection({ changeProgressBar }) {
  const location = useLocation();
  const isMobile = useWindowSize();
  const [nextPageAddNewBot, setNextPageAddNewBot] = useState(false);

  const [botsFormInfo, setBotsFormInfo] = useState([
    {
      id: 0,
      logo: '',
      name: '',
      categories: [],
      price: '',
      count: '',
      description: '',
      examples: [],
    },
  ]); // Состояние для данных ботов

  // прокрутка скролла наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePageAddNewBot = () => {
    setNextPageAddNewBot(!nextPageAddNewBot);
  };

  // функция загрузки логотипа
  const fillBotForm = (id, name, value) => {
    setBotsFormInfo(() => {
      return botsFormInfo.map((bot) => {
        if (bot.id === id) {
          return {
            ...bot,
            [name]: value,
          };
        }
        return bot;
      });
    });
  };

  // Функция добавления новой формы для бота
  const addBotForm = () => {
    setBotsFormInfo((prevValue) => [
      ...prevValue,
      {
        id: botsFormInfo.length,
        logo: '',
        name: '',
        categories: [],
        price: '',
        count: '',
        description: '',
        examples: [],
      },
    ]);
  };

  // Функция удаления формы для бота
  const deleteBotForm = (id) => {
    setBotsFormInfo(() => {
      return botsFormInfo.filter((bot) => bot.id !== id);
    });
  };

  return (
    <section className={styles.addition}>
      {isMobile ? (
        <div className={styles.addition__head}>
          <h2 className={styles.addition__title}>Добавление товара</h2>
          <p className={styles.addition__info}>
            Данный этап можно пропустить. Для этого нажмите кнопку “Продолжить”,
            оставив поля незаполненными.
            <span className={styles.addition__required}>
              * - обязательные поля
            </span>
          </p>
          <div className={styles.addition__continue}>
            <button
              className={styles.addition__continueButton}
              type='button'
              aria-label='Открыть следующую страницу'
              onClick={changeProgressBar}
            >
              Продолжить
            </button>
          </div>
          {nextPageAddNewBot ? (
            ''
          ) : (
            <div className={styles.addition__add}>
              <button
                className={styles.addition__addButton}
                type='button'
                aria-label='Открыть следующую страницу'
                onClick={togglePageAddNewBot}
              >
                Добавить товар
              </button>
            </div>
          )}

          {nextPageAddNewBot && (
            <AddNewBotForm changeProgressBar={changeProgressBar} />
          )}
        </div>
      ) : (
        <>
          <div className={styles.addition__head}>
            <h2 className={styles.addition__title}>Добавление товара</h2>
            {location.pathname === '/signup-seller' && (
              <p className={styles.addition__info}>
                Данный этап можно пропустить. Для этого нажмите кнопку
                “Продолжить”, оставив поля незаполненными.
                <span className={styles.addition__required}>
                  * - обязательные поля
                </span>
              </p>
            )}
            <button
              type='button'
              className={styles.addition__addButton}
              onClick={addBotForm}
            >
              Новый товар
            </button>
          </div>
          <form className={styles.form}>
            {botsFormInfo.map((bot) => (
              <AddNewBotForm
                key={bot.id}
                bot={bot}
                deleteBotForm={deleteBotForm}
                fillBotForm={fillBotForm}
              />
            ))}
            <button
              type='button'
              className={styles.form__submit}
              onClick={changeProgressBar}
            >
              Продолжить
            </button>
          </form>
        </>
      )}
    </section>
  );
}

export default AddNewBotsSection;
