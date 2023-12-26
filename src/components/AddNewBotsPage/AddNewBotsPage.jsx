import { useState, useEffect } from 'react';
import AddNewBotsSection from '../AddNewBotSection/AddNewBotSection';

import BackButton from '../BackButton/BackButton';
import styles from './AddNewBotsPage.module.scss';
import { WIDTH_SCREEN_768 } from '../../utils/constants';

function AddBotsPage({ comeBack }) {
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  );

  // отображение кнопки при размере экрана меньше 768px
  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // прокрутка скролла наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={styles.additionPage}>
      {showButton ? (
        <div className={styles.additionPage__container}>
          <AddNewBotsSection />
        </div>
      ) : (
        <>
          <BackButton comeBack={comeBack} />
          <div className={styles.additionPage__container}>
            <AddNewBotsSection />
          </div>
        </>
      )}
    </section>
  );
}

export default AddBotsPage;
