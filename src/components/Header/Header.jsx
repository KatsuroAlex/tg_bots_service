import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

import Submenu from './Submenu/Submenu';
import SearchPopup from './SearchPopup/SearchPopup';

function Header({
  isLoggedIn,
  isLogOut,
  cartProducts,
  deleteCartProduct,
  onSearch,
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/');
    onSearch(searchQuery);
  }

  function handleСhange(e) {
    const query = e.target.value;
    if (query) setSearchQuery(query);

    if (query === '') {
      setSearchQuery('');
      onSearch('');
    }
  }

  const handleLogoClick = () => {
    setSearchQuery('');
    navigate('/');
    onSearch('');
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link
            className={styles.header__logo_link}
            to='/'
            onClick={handleLogoClick}
          >
            <h2 className={styles.header__logo_title}>BotDepot</h2>
          </Link>
        </div>
        <div className={styles.header__search}>
          <form
            className={styles.header__search_form}
            noValidate
            onSubmit={handleSubmit}
          >
            <input
              className={styles.header__search_input}
              type='text'
              placeholder='Поиск'
              value={searchQuery || ''}
              onChange={handleСhange}
            />
            <button
              className={styles.header__search_button}
              type='submit'
              aria-label='Отправить запрос поиска'
            />
          </form>
        </div>
        <div className={styles.header__forMobileSize}>
          <button
            className={styles.header__openPopup}
            type='button'
            aria-label='Открыть попап поиска'
            onClick={togglePopup}
          />
          <Submenu
            isLoggedIn={isLoggedIn}
            isLogOut={isLogOut}
            cartProducts={cartProducts}
            deleteCartProduct={deleteCartProduct}
          />
          {isPopupOpen && <SearchPopup onToggle={togglePopup} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
