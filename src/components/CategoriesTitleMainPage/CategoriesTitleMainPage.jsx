/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from 'react';
import { useWindowSize } from '../../context/WindowSizeContext';
import styles from './CategoriesTitleMainPage.module.scss';
import Category from '../Category/Category';

const CategoriesTitleMainPage = ({ categories, onFilter }) => {
  const isMobile = useWindowSize();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]); // сохраняем выбранные категории
  const inputRef = useRef(null);

  const getCategoryName = (category) => {
    if (category.name) {
      return category.name;
    }
    return category;
  };

  const filteredCategories = categories.filter((c) =>
    getCategoryName(c).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (filter) => {
    setSearchQuery(filter);

    if (!filter || filter === '') {
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    setSearchQuery('');
    onFilter(updatedCategories);
  };

  // фильтр для отображения выбранных категорий
  const filteredOptions = categories.filter(
    (category) =>
      selectedCategories.includes(getCategoryName(category)) &&
      getCategoryName(category)
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase())
  );

  // функция удаления всех выбранных категорий
  const removeCategory = (categoryName) => {
    const updatedOptions = selectedCategories.filter(
      (option) => option !== categoryName
    );
    setSelectedCategories(updatedOptions);
    onFilter(updatedOptions);
  };

  // функция удаления всех выбранных категорий
  const removeCategories = () => {
    setSelectedCategories([]);
    onFilter([]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Категории</h2>

      {isMobile && (
        <div className={styles.category}>
          <button
            className={styles.category__button}
            aria-label='Открыть весь список категорий'
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            Выбрать категории
            {showAllCategories ? (
              <div
                className={`${styles.category__button_img} ${styles.category__button_img_up}`}
              />
            ) : (
              <div
                className={`${styles.category__button_img} ${styles.category__button_img_down}`}
              />
            )}
          </button>

          <div className={styles.category__inputContainer}>
            <ul className={styles.category__list}>
              {showAllCategories && (
                <>
                  <div className={styles.inputContainerfor2}>
                    <div className={styles.inputContainer2}>
                      {filteredOptions.map((category) => (
                        <div className={styles.itemContainer} key={category.id}>
                          <div className={styles.itemLabel}>
                            {category.name}
                          </div>
                          <button
                            className={styles.itemCloseSvg}
                            aria-label='Удалить категорию'
                            onClick={() => removeCategory(category.name)}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className={styles.itemDeleteCategories}
                      aria-label='Удалить выбранные категории'
                      onClick={() => removeCategories()}
                    />
                  </div>

                  <div className={styles.category__search} ref={inputRef}>
                    <input
                      className={styles.category__search_input}
                      type='text'
                      placeholder='Поиск по категориям'
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>

                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className={styles.category__listItem}
                    >
                      <li
                        className={`
                        ${styles.category__checkbox} ${
                          selectedCategories.includes(category.name)
                            ? styles.category__checkbox_checked
                            : ''
                        }
                        `}
                        style={{
                          backgroundColor: selectedCategories.includes(
                            category.name
                          ),
                        }}
                        value={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        <Category
                          key={category.id}
                          name={category.name}
                          imageUrl={category.imageUrl}
                          imageUrlHover={category.imageUrlHover}
                          imageUrlActive={category.imageUrlActive}
                        />
                        <input
                          className={styles.category__input}
                          type='checkbox'
                          defaultChecked={selectedCategories.includes(
                            category.name
                          )}
                        />
                        <span className={styles.category__icon} />
                      </li>
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTitleMainPage;
