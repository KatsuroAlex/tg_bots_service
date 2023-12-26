import React from 'react';
import styles from './Favourites.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';

function Favourites({ onLogout }) {
  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      <section className={styles.favourites} />
    </main>
  );
}

export default Favourites;
