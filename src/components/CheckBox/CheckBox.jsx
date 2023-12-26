import React from 'react';
import styles from './CheckBox.module.scss';

function CheckBox({ onChange, title }) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.checkbox}>
      <input
        className={styles.checkbox__input}
        type='checkbox'
        required
        onChange={onChange}
      />
      <span className={styles.checkbox__text}>{title}</span>
    </label>
  );
}

export default CheckBox;
