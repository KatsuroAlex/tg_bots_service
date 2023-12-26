import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { fetchSearchBots } from '../../../utils/api/getBots';
import styles from './SearchPopup.module.scss';

function SearchPopup({ onToggle }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // данные в поисковой строке
  const [resultSearchQuery, setResultSearchQuery] = useState([]);

  const debouncedSearch = debounce(async (query) => {
    const botsData = await fetchSearchBots(query);
    setResultSearchQuery(botsData.results);
  }, 1500);

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearchQuery(newSearch);
    debouncedSearch(newSearch);

    if (newSearch === '') {
      setSearchQuery('');
      debouncedSearch(null);
    }
  };

  const handelRedirect = (path) => {
    navigate(path);
    onToggle(path);
  };

  return (
    <div className={styles.searchPopup}>
      <div className={styles.searchPopup__container}>
        <div className={styles.searchPopup__title}>
          <button
            className={styles.searchPopup__buttonTitle}
            type='button'
            aria-label='Кнопка назад'
            onClick={onToggle}
          />
          <h2 className={styles.searchPopup__textTitle}>Поиск</h2>
        </div>
        <form className={styles.searchPopup__form}>
          <input
            className={styles.searchPopup__input}
            type='text'
            placeholder='Поиск'
            value={searchQuery || ''}
            onChange={handleChange}
          />
          {/* <button
            className={styles.searchPopup__button}
            type='submit'
            aria-label='Просмотреть историю поиска'
          >
            История поиска
          </button> */}
        </form>

        {resultSearchQuery.length > 0 ? (
          <div className={styles.searchPopup__result}>
            <h3 className={styles.searchPopup__result_title}>
              Результаты поиска
            </h3>
            <ul className={styles.searchPopup__result_list}>
              {resultSearchQuery.map((bot) => (
                <li key={bot.id} className={styles.searchPopup__listItem}>
                  <div className={styles.searchPopup__listItem_imgSearch} />
                  <div className={styles.searchPopup__listItem_description}>
                    <button
                      className={styles.searchPopup__listItem_link}
                      aria-label='Переход к боту'
                      onClick={() => handelRedirect(`/botdetails/${bot.id}`)}
                    >
                      <h3 className={styles.searchPopup__listItem_title}>
                        {bot.name}
                      </h3>
                    </button>
                    <p className={styles.searchPopup__listItem_path}>
                      Главная страница {'>'}{' '}
                      {bot.categories && bot.categories.length > 0
                        ? bot.categories[0].name
                        : 'Нет категории'}
                    </p>
                  </div>
                  <div className={styles.searchPopup__listItem_imgArrow} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* если есть история поиска */}
        {/* <div>
          <div>
            <h3>История поиска</h3>
            <ul>
              <li />
            </ul>
            <button>
              <div />
              <p>Очистить историю поиска</p>
            </button>
          </div>
        </div> */}
        {/* конец история поиска */}
      </div>
    </div>
  );
}

export default SearchPopup;
