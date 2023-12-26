import React, { useState } from 'react';
import styles from './ReviewCard.module.scss';
import ThumbUp from '../../images/botDetails_images/thumbsUp.svg';
import chatIcon from '../../images/botDetails_images/chat_icon.svg';
import userImg from '../../images/botDetails_images/Icon_user_medium.png';
import userImgSmall from '../../images/botDetails_images/icon_user_small.svg';
import clipIcon from '../../images/botDetails_images/clip_icon.svg';

function ReviewCard({ userName, reviewDate, feedbackText }) {
  const [reviewText, setReviewText] = useState('');
  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewCard__headerSection}>
        <img
          className={styles.reviewCard__userImg}
          src={userImg}
          alt='Фото пользователя'
        />
        <div className={styles.reviewCard__nameSectionS}>
          <div className={styles.reviewCard__nameSection}>
            <p className={styles.reviewCard__userName}>{userName}Анна</p>
            <p className={styles.reviewCard__userDate}>
              {reviewDate}09.10.2023
            </p>
          </div>
          <div className={styles.reviewCard__stars}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <span key={rating} className={`${styles.star} star-${rating}`}>
                &#9733;
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className={styles.reviewCard__reviewText}>
        {feedbackText}
        Бот «В пути» стал моим незаменимым помощником в городских поездках!
        Теперь я всегда знаю актуальное расписание и могу планировать своё время
        точно, без лишних ожиданий на остановках. Очень удобно и надёжно!
      </p>
      <div className={styles.reviewCard__likeFeedbackSection}>
        <button
          className={styles.reviewCard__likeButton}
          type='button'
          aria-label='like button'
        >
          <span className={styles.reviewCard__iconContainer}>
            <img
              className={styles.reviewCard__likeIcon}
              src={ThumbUp}
              alt='кнопка лайк'
            />
          </span>
          <span className={styles.likeCount}>2</span>
        </button>
        <button
          className={styles.reviewCard__feedbackButton}
          type='button'
          aria-label='feedback button'
        >
          <span className={styles.reviewCard__iconContainer}>
            <img
              className={styles.reviewCard__likeIcon}
              src={chatIcon}
              alt='кнопка чат'
            />
          </span>
          <span className={styles.likeCount}>2</span>
        </button>
      </div>
      <div className={styles.reviewCard__inputSection}>
        <img
          className={styles.reviewCard__userImgSmall}
          src={userImgSmall}
          alt='Фото пользователя'
        />
        <textarea
          className={styles.reviewCard__textarea}
          value={reviewText}
          onChange={handleReviewChange}
          placeholder='Написать комментарий'
        />
        <button
          className={styles.reviewCard__addButton}
          type='button'
          aria-label='add button'
        >
          <img src={clipIcon} alt='кнопка закрепить' />
        </button>
        <button
          className={styles.reviewCard__sendReviewButton}
          type='button'
          aria-label='send button'
        >
          Отправить
        </button>
      </div>
    </div>
  );
}

export default ReviewCard;
