/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styles from './ScreenExamples.module.scss';
import CardExample from '../CardExample/CardExample';

function ScreenExamples({ array }) {
  console.log(array);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNextSlide = () => {
    if (currentIndex < array.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const listOfScreenExamples = array
    .slice(currentIndex, currentIndex + 4)
    .map((card, index) => (
      <CardExample src={card.photo_examples} key={index} />
    ));

  return (
    <div className={styles.screenExamples}>
      <h2 className={styles.screenExamples__title}>Примеры экранов</h2>
      <div className={styles.screenExamples__container}>
        <button
          className={styles.screenExamples__sliderButtonLeft}
          onClick={handlePrevSlide}
          aria-label='button'
        />
        <div className={styles.screenExamples__cards}>
          {listOfScreenExamples}
        </div>
        <button
          className={styles.screenExamples__sliderButtonRight}
          onClick={handleNextSlide}
          aria-label='button'
        />
      </div>
    </div>
  );
}
export default ScreenExamples;
