import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BotCard from '../BotCard/BotCard';
import ButtonUp from '../ButtonUp/ButtonUp';

import styles from './BotsList.module.scss';
import { useWindowSize } from '../../context/WindowSizeContext';
import {
  NUMBER_OF_DISPLAYED_BOTS_1920,
  NUMBER_OF_ADDED_DISPLAYED_BOTS_1920,
} from '../../utils/constants';
import { fetchMoreBots } from '../../utils/api/getBots';

const BotsList = ({
  apiBots,
  cartProducts,
  isProductInCart,
  addProductToCart,
  increaseProductCount,
  decreaseProductCount,
}) => {
  // initial api bots
  const isMobile = useWindowSize();
  const bots = apiBots.results;
  const totalBotsAmount = apiBots.count;
  const [nextBotsUrl, setNextBotsUrl] = useState(apiBots.next);
  const [hasMore, setHasMore] = useState(true);
  // displayed bots
  const [displayedBots, setDisplayedBots] = useState([]);
  const [numberOfDisplayedBots, setNumerOfDisplayedBots] = useState(
    NUMBER_OF_DISPLAYED_BOTS_1920
  );
  // button display/hide
  const moreBtnClass = `${styles.bots__moreBtn} ${
    totalBotsAmount <= numberOfDisplayedBots && styles.bots__moreBtn_hidden
  }`;

  // change number of displayed bots when array is changed
  useEffect(() => {
    setDisplayedBots(bots.slice(0, numberOfDisplayedBots));
  }, [bots, numberOfDisplayedBots]);

  // "more" button click
  const handleDisplayMoreClick = () => {
    if (nextBotsUrl) {
      fetchMoreBots(nextBotsUrl)
        .then((nextBots) => {
          apiBots.results.push(...nextBots.results);
          setNextBotsUrl(nextBots.next);
          setNumerOfDisplayedBots(
            numberOfDisplayedBots + NUMBER_OF_ADDED_DISPLAYED_BOTS_1920
          );
          if (bots.length === totalBotsAmount) {
            setHasMore(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching more bots:', error);
        });
    }
  };

  // buy button click
  const handleBuyClick = (bot) => {
    addProductToCart(bot);
  };

  return (
    <div className={styles.botsContainer} id='bots'>
      {displayedBots.length === 0 && (
        <div className={styles.emptyList}>
          По вашему запросу ничего не найдено
        </div>
      )}
      {isMobile ? (
        <InfiniteScroll
          dataLength={displayedBots.length}
          next={handleDisplayMoreClick}
          hasMore={hasMore}
        >
          <ul className={styles.bots}>
            {displayedBots.map((bot) => {
              return (
                <li key={bot.id}>
                  <BotCard
                    mainPhoto={bot.main_photo}
                    name={bot.name}
                    author={bot.author}
                    discount={bot.discount}
                    finalPrice={bot.final_price}
                    category={
                      bot.categories && bot.categories.length > 0
                        ? bot.categories[0].name
                        : 'Нет категории'
                    }
                    price={bot.price}
                    id={bot.id}
                    onBuyClick={() => {
                      handleBuyClick(bot);
                    }}
                    isProductInCart={isProductInCart}
                    cartProducts={cartProducts}
                    increaseProductCount={increaseProductCount}
                    decreaseProductCount={decreaseProductCount}
                  />
                </li>
              );
            })}
          </ul>
          <ButtonUp />
        </InfiniteScroll>
      ) : (
        <>
          <ul className={styles.bots}>
            {displayedBots.map((bot) => (
              <li key={bot.id}>
                <BotCard
                  mainPhoto={bot.main_photo}
                  name={bot.name}
                  author={bot.author}
                  discount={bot.discount}
                  finalPrice={bot.final_price}
                  categories={bot.categories}
                  price={bot.price}
                  id={bot.id}
                  onBuyClick={() => {
                    handleBuyClick(bot);
                  }}
                  isProductInCart={isProductInCart}
                  cartProducts={cartProducts}
                  increaseProductCount={increaseProductCount}
                  decreaseProductCount={decreaseProductCount}
                />
              </li>
            ))}
          </ul>
          <button
            className={moreBtnClass}
            type='button'
            onClick={handleDisplayMoreClick}
          >
            Показать еще ({NUMBER_OF_DISPLAYED_BOTS_1920})
          </button>
        </>
      )}
    </div>
  );
};

export default BotsList;
