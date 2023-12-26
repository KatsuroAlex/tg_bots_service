// import { useState, useEffect } from 'react';
import styles from './AddNewBotForm.module.scss';
import { useWindowSize } from '../../../context/WindowSizeContext';

// import CategoriesCheckbox from './CategoriesCheckbox/CategoriesCheckbox';
// import categories from '../../../utils/categories.json';

// const imageMimeType = /image\/(png|jpg|jpeg)/i;

function AddNewBotForm({ bot, deleteBotForm, changeProgressBar }) {
  const isMobile = useWindowSize();
  return (
    <div className={styles.form}>
      {isMobile ? (
        <>
          <span className={styles.form__required}>* - обязательные поля</span>
          <div className={styles.form__imgContainer}>
            <label htmlFor='botImage' className={styles.form__label_type_image}>
              <input
                name='botImage'
                id='botImage'
                type='file'
                accept='image/jpeg,image/png'
                className={styles.form__input_type_image}
              />
            </label>
            <p className={styles.form__text}>
              Добавить изображение
              <span className={styles.form__required}>*</span>
            </p>
          </div>
        </>
      ) : (
        <label htmlFor='botImage' className={styles.form__label_type_image}>
          <input
            name='botImage'
            id='botImage'
            type='file'
            accept='image/jpeg,image/png'
            className={styles.form__input_type_image}
          />
        </label>
      )}
      <fieldset className={styles.form__inputGroup}>
        <label
          htmlFor='productName'
          className={`${styles.form__label} ${styles.form__label_type_name}`}
        >
          <span className={styles.form__inputTitle}>
            Название товара
            {isMobile && <span className={styles.form__required}>*</span>}
          </span>
          <input
            name='productName'
            id='productyName'
            type='text'
            placeholder='Укажите название вашего товара'
            className={styles.form__input}
            required
          />
        </label>
        <label
          htmlFor='productCategory'
          className={`${styles.form__label} ${styles.form__label_type_category}`}
        >
          <span className={styles.form__inputTitle}>
            Категории товара
            {isMobile && <span className={styles.form__required}>*</span>}
          </span>
          <input
            name='productCategory'
            id='productCategory'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productPrice' className={styles.form__label}>
          <span className={styles.form__inputTitle}>
            Цена товара
            {isMobile && <span className={styles.form__required}>*</span>}
          </span>
          <input
            name='productPrice'
            id='productPrice'
            type='text'
            placeholder='₽'
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productCount' className={styles.form__label}>
          <span className={styles.form__inputTitle}>
            Количество товара
            {isMobile && <span className={styles.form__required}>*</span>}
          </span>
          <input
            name='productCount'
            id='productCount'
            type='text'
            placeholder='шт.'
            className={styles.form__input}
            required
          />
        </label>
      </fieldset>
      <label htmlFor='productDesc' className={styles.form__label}>
        <span className={styles.form__inputTitle}>
          Описание товара
          {isMobile && <span className={styles.form__required}>*</span>}
        </span>
        <textarea
          name='productDesc'
          id='productDesc'
          type='text'
          placeholder='Введите описание товара, опишите принцип действия бота и т.п.'
          className={`${styles.form__input} ${styles.form__input_type_desc}`}
          required
        />
      </label>
      <label
        htmlFor='productExamples'
        className={`${styles.form__label} ${styles.form__label_type_exaples}`}
      >
        <span className={styles.form__inputTitle}>
          Примеры экранов
          {isMobile && <span className={styles.form__required}>*</span>}
        </span>
        <div
          className={`${styles.form__input} ${styles.form__input_type_examplesContainer}`}
        >
          <span className={styles.form__examplesTitle}>
            Прикрепить примеры экранов
          </span>
          <input
            name='productExamples'
            id='productExamples'
            type='file'
            accept='image/jpeg,image/png'
            placeholder='+ Прикрепить примеры экранов'
            className={`${styles.form__input} ${styles.form__input_type_examples}`}
            required
          />
        </div>
      </label>
      {isMobile && (
        <button
          className={styles.form__continueButton}
          type='button'
          aria-label='Открыть следующую страницу'
          onClick={changeProgressBar}
        >
          Продолжить
        </button>
      )}
      <button
        type='button'
        className={styles.form__deleteBtn}
        onClick={() => {
          deleteBotForm(bot.id);
        }}
      >
        Удалить товар
      </button>
    </div>
  );
}

export default AddNewBotForm;
