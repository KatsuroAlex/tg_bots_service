import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Импортируем useParams для доступа к параметрам маршрута
import styles from './SpecialOffers.module.scss';
import BackButton from '../BackButton/BackButton';
import BotCard from '../BotCard/BotCard';
import { useWindowSize } from '../../context/WindowSizeContext';

import infoBanners from '../../utils/infoBanners.json';

function SpecialOffers({
  comeBack,
  apiBots,
  cartProducts,
  isProductInCart,
  addProductToCart,
  increaseProductCount,
  decreaseProductCount,
}) {
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  // Используем useParams для извлечения параметра маршрута
  const { banners } = infoBanners;
  const { id } = useParams(); // достаем элементы
  const IdNumber = parseInt(id, 10); // переделываем в число
  const banner = banners.find((item) => item.id === IdNumber); // ищем баннер с соответствующим id в JSON-массиве

  const bots = apiBots.results;
  const [specialBot, setSpecialBot] = useState([]);

  const backgroundStyle = {
    background: banner.background,
  };
  const imgStyle = {
    backgroundImage: `url(${banner.imageUrl})`,
  };
  const imgStyleMobile = {
    backgroundImage: `url(${banner.imageUrlMobile})`,
  };

  useEffect(() => {
    const specialBotsList = bots.filter((bot) => {
      return bot.discount_category !== undefined && bot.discount_category > 0;
    });
    setSpecialBot(specialBotsList);
  }, [bots]);

  const handleBuyClick = (item) => {
    addProductToCart(item);
  };

  return (
    <section className={styles.special} style={backgroundStyle}>
      <BackButton comeBack={comeBack} title={banner.title} />
      <h1 className={styles.special__title}>{banner.title}</h1>
      {isMobile ? (
        <div className={styles.special__banner} style={imgStyleMobile} />
      ) : (
        <div className={styles.special__banner} style={imgStyle} />
      )}
      {banner.description ? (
        <div className={styles.emptyList}>
          <h3 className={styles.emptyList_title}>
            Данная акция еще не началась. Возвращайтесь сюда позже, чтобы купить
            ботов по выгодной цене!
          </h3>
          <button
            className={styles.emptyList_button}
            type='button'
            aria-label='Переход на страницу каталога'
            onClick={() => navigate('/')}
          >
            Вернуться в каталог
          </button>
        </div>
      ) : (
        <div className={styles.special__listContainer}>
          <ul className={styles.special__list}>
            {specialBot.map((bot) => (
              <li key={bot.id}>
                <BotCard
                  mainPhoto={bot.main_photo}
                  name={bot.name}
                  author={bot.author}
                  category={bot.category}
                  discountAuthor={bot.discount_author}
                  discountCategory={bot.discount_category}
                  finalPrice={bot.final_price}
                  price={bot.price}
                  id={bot.id}
                  onBuyClick={() => handleBuyClick(bot)}
                  isProductInCart={isProductInCart}
                  cartProducts={cartProducts}
                  increaseProductCount={increaseProductCount}
                  decreaseProductCount={decreaseProductCount}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default SpecialOffers;
