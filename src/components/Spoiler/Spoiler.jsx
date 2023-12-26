import React from 'react';
import styles from './Spoiler.module.scss';

function Spoiler({ data }) {
  return (
    <main className={styles.profile}>
      <section className={styles.spoiler}>
        <details className={styles.spoiler__topic}>
          <summary className={styles.spoiler__title}>{data[0]}</summary>
          <div className={styles.spoiler__content}>
            {data.map((item, index) => {
              if (!index) {
                return null;
              }
              if (typeof item === 'string') {
                return <p className={styles.spoiler__text}>{item}</p>;
              }
              return (
                <ul className={styles.spoiler__list}>
                  {item.map((item2) => (
                    <li className={styles.faq__item}>{item2}</li>
                  ))}
                </ul>
              );
            })}
          </div>
        </details>
      </section>
    </main>
  );
}

export default Spoiler;
