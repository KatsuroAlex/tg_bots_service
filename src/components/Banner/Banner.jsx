/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import styles from './Banner.module.scss';
import 'react-multi-carousel/lib/styles.css';
import CarouselBannerLeftBtn from '../UI/CarouselBannerLeftBtn/CarouselBannerLeftBtn';
import CarouselBannerRightBtn from '../UI/CarouselBannerRightBtn/CarouselBannerRightBtn';
import { useWindowSize } from '../../context/WindowSizeContext';

const CustomDot = ({ index, onClick, active }) => {
  const dotClass = `${styles.banner__dot} ${
    active ? styles.banner__dot_active : ''
  }`;

  return (
    <li>
      <button
        className={dotClass}
        aria-label={`dot-${index}`}
        onClick={(e) => {
          onClick();
          e.preventDefault();
        }}
      />
    </li>
  );
};

const Banner = () => {
  const isMobile = useWindowSize();
  const carouselRef = useRef(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [activeImage, setActiveImage] = useState('2');

  const handleImageClick = (id) => {
    setActiveImage(id);
  };

  return (
    <div className={styles.banner}>
      {isMobile ? (
        <div className={styles.container}>
          <div className={styles.sliderWrapper}>
            <div className={styles.slider}>
              <Link to='/special-offers/1'>
                <img
                  id='1'
                  src='/images/special-banner/banners-mobile/banner1.svg'
                  alt='{img}'
                  role='button'
                  className={styles.sliderImage}
                  onClick={() => handleImageClick('1')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleImageClick();
                    }
                  }}
                  tabIndex={0}
                />
              </Link>
              <Link to='/special-offers/2'>
                <img
                  id='2'
                  src='/images/special-banner/banners-mobile/banner2.svg'
                  alt='{img}'
                  className={styles.sliderImage}
                  onClick={() => handleImageClick('2')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleImageClick();
                    }
                  }}
                  tabIndex={0}
                  role='button'
                />
              </Link>
              <Link to='/special-offers/3'>
                <img
                  id='3'
                  src='/images/special-banner/banners-mobile/banner3.svg'
                  alt='{img}'
                  className={styles.sliderImage}
                  onClick={() => handleImageClick('3')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleImageClick();
                    }
                  }}
                  tabIndex={0}
                  role='button'
                />
              </Link>
            </div>
            <div
              className={`${styles.sliderNav} ${
                activeImage ? styles.sliderNav_active : ''
              }`}
            >
              <a href='#1' aria-label='1' />
              <a href='#2' aria-label='2' />
              <a href='#3' aria-label='3' />
            </div>
          </div>
        </div>
      ) : (
        <Carousel
          ref={carouselRef}
          renderArrowsWhenDisabled
          showDots
          infinite
          responsive={responsive}
          className={styles.banner__carousel}
          dotListClass={styles.banner__dotList}
          customLeftArrow={<CarouselBannerLeftBtn carouselRef={carouselRef} />}
          customRightArrow={
            <CarouselBannerRightBtn carouselRef={carouselRef} />
          }
          customDot={<CustomDot />}
        >
          <div className={styles.banner__titlebox} />
          <div className={styles.banner__titlebox} />
          <div className={styles.banner__titlebox} />
          <div className={styles.banner__titlebox} />
        </Carousel>
      )}
    </div>
  );
};

export default Banner;
