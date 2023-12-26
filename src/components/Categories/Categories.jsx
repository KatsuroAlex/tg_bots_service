import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import Category from '../Category/Category';
import styles from './Categories.module.scss';
import 'react-multi-carousel/lib/styles.css';
import CarouselCategoriesLeftBtn from '../UI/CarouselCategoriesLeftBtn/CarouselCategoriesLeftBtn';
import CarouselCategoriesRightBtn from '../UI/CarouselCategoriesRightBtn/CarouselCategoriesRightBtn';
import CategoriesTitleMainPage from '../CategoriesTitleMainPage/CategoriesTitleMainPage';

const Categories = ({ categories, onFilter, mainPageActiveCategory }) => {
  const carouselRef = useRef(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles.categoriesWrapper}>
      <CategoriesTitleMainPage categories={categories} onFilter={onFilter} />
      <section className={styles.categories}>
        <div className={styles.categories__carouselWrapper}>
          <Carousel
            ref={carouselRef}
            className={styles.categories__carousel}
            renderArrowsWhenDisabled
            infinite
            arrows={false}
            responsive={responsive}
          >
            {categories.map((category) => (
              <div key={category.id}>
                <Category
                  name={category.name}
                  onFilter={onFilter}
                  mainPageActiveCategory={mainPageActiveCategory}
                  imageUrl={category.imageUrl}
                  imageUrlHover={category.imageUrlHover}
                  imageUrlActive={category.imageUrlActive}
                />
              </div>
            ))}
          </Carousel>
          <CarouselCategoriesLeftBtn carouselRef={carouselRef} />
          <CarouselCategoriesRightBtn carouselRef={carouselRef} />
        </div>
      </section>
    </div>
  );
};

export default Categories;
