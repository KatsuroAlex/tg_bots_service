import React from 'react';
import styles from './Faq.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import Spoiler from '../Spoiler/Spoiler';
import { SPOILERS_DATA } from '../../utils/mock';

function Faq({ onLogout }) {
  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      <section className={styles.faq}>
        <h2 className={styles.faq__title}>Часто задаваемые вопросы (FAQ)</h2>
        {SPOILERS_DATA.map((item) => (
          <Spoiler data={item} />
        ))}
      </section>
    </main>
  );
}

export default Faq;
