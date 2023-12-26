import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

import phone from '../../images/phone-min.svg';
import email from '../../images/email-min.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link className={styles.footer__logoLink} to='/'>
          <h3 className={styles.footer__logoLink_title}>BotDepot</h3>
        </Link>
        <address className={styles.footer__contacts}>
          <h4 className={styles.footer__contacts_title}>Контакты</h4>
          <div className={styles.footer__contacts_container}>
            <img
              className={styles.footer__contacts_image}
              src={phone}
              alt='Телефон'
            />
            <a className={styles.footer__contacts_link} href='tel:+79999999999'>
              +7-999-999-99-99
            </a>
          </div>
          <div className={styles.footer__contacts_container}>
            <img
              className={styles.footer__contacts_image}
              src={email}
              alt='Почта'
            />
            <a
              className={styles.footer__contacts_link}
              href='mailto:mail@example.com'
            >
              example@yandex.ru
            </a>
          </div>
        </address>

        <nav className={styles.footer__link}>
          <Link className={styles.footer__link_navigate} to='/'>
            Главная
          </Link>
          <Link className={styles.footer__link_navigate} to='/about-us'>
            О нас
          </Link>
          <Link className={styles.footer__link_navigate} to='/FAQ'>
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
