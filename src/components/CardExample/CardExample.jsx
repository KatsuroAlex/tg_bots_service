import React from 'react';
import styles from './CardExample.module.scss';

function CardExample({ src }) {
  return (
    <div className={styles.cardExample}>
      <img className={styles.cardExample__pic} src={src} alt='Фото' />
    </div>
  );
}

export default CardExample;
