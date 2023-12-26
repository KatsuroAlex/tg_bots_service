import { useState } from 'react';
import styles from './Category.module.scss';

const Category = ({
  name,
  onFilter,
  mainPageActiveCategory,
  imageUrl,
  imageUrlHover,
  imageUrlActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isCategoryActive = name === mainPageActiveCategory;

  let backgroundImage;
  if (isCategoryActive) {
    backgroundImage = imageUrlActive;
  } else if (isHovered) {
    backgroundImage = imageUrlHover;
  } else {
    backgroundImage = imageUrl;
  }

  const imgStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div
      className={styles.category}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onFilter(name)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onFilter(name);
        }
      }}
      role='button'
      tabIndex={0}
    >
      <div className={styles.category__img} style={imgStyle} />
      <p className={styles.category__name}>{name}</p>
    </div>
  );
};

export default Category;
