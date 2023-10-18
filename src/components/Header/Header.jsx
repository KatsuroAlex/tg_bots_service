import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

import Submenu from './Submenu/Submenu';

function Header({ isLoggedIn, isLogOut, cartProducts, deleteCartProduct }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link className={styles.header__logo_link} to='/'>
            <h2 className={styles.header__logo_title}>BotDepot</h2>
          </Link>
        </div>
        <div className={styles.header__search}>
          <form className={styles.header__search_form} noValidate>
            <input
              className={styles.header__search_input}
              type='text'
              placeholder='Поиск'
            />
          </form>
        </div>
        <Submenu
          isLoggedIn={isLoggedIn}
          isLogOut={isLogOut}
          cartProducts={cartProducts}
          deleteCartProduct={deleteCartProduct}
        />
      </div>
    </header>
  );
}

export default Header;
