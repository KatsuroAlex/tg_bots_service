import React from 'react';
import styles from './Purchases.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';

function Purchases({ onLogout }) {
  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      <section className={styles.purchases} />
    </main>
  );
}

export default Purchases;
