import { Link } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ButtonUp.module.scss';

function ButtonUp() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollLinkClick = () => {
    if (location.pathname === '/') {
      document.getElementById('bots').scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.backUp}>
      <button
        className={styles.backUp__button}
        type='button'
        aria-label='Вернуться наверх каталога'
      >
        <Link
          className={styles.backUp__link}
          to='bots'
          smooth
          duration={1000}
          onClick={handleScrollLinkClick}
        />
      </button>
    </div>
  );
}

export default ButtonUp;
