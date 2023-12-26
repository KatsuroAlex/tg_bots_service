import React from 'react';
import styles from './Seller.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';

function Seller({ onLogout }) {
  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      <section className={styles.seller} />
    </main>
  );
}

export default Seller;
