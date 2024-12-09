import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes, fetchCategories, fetchTypes } from '../../store/slice/bikeSlice';
import { Pagination } from '@mui/material';
import "./SellBikeStyle.scss";

export default function SellBike() {
    const dispatch = useDispatch();
    const { bikes, categories, types, totalCount, noBikesMessage, status } = useSelector((state) => state.bikes);

    const [sortOrder, setSortOrder] = useState('expensive');
    const [searchQuery, setSearchQuery] = useState(""); // Состояние для поиска
    const [selectedCategory, setSelectedCategory] = useState(""); // Состояние для выбранной категории
    const [selectedType, setSelectedType] = useState(""); // Состояние для выбранного типа
    const [minPrice, setMinPrice] = useState(""); // Минимальная цена
    const [maxPrice, setMaxPrice] = useState(""); // Максимальная цена
    const [page, setPage] = useState(1); // Текущая страница
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Состояние для отображения бокового меню фильтра

    const filterRef = useRef(null); // Ссылка на окно фильтра
    const limit = 5;

    // Обработчик изменения сортировки
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        dispatch(fetchBikes({ sortOrder: event.target.value, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    // Обработчик изменения текста в поле поиска
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        dispatch(fetchBikes({ sortOrder, searchQuery: event.target.value, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    // Обработчик изменения категории
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        dispatch(fetchBikes({ sortOrder, searchQuery, category: event.target.value, type: selectedType, minPrice, maxPrice, page, limit }));
    };

    // Обработчик изменения типа
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: event.target.value, minPrice, maxPrice, page, limit }));
    };

    // Обработчик изменения минимальной цены
    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    // Обработчик изменения максимальной цены
    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    // Обработчик изменения страницы
    const handlePageChange = (event, value) => {
        setPage(value);
        dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page: value, limit }));
    };

    // Закрытие фильтра при клике вне его области
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false); // Закрываем фильтр, если клик был вне
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page, limit }));
        dispatch(fetchCategories());
        dispatch(fetchTypes());
    }, [dispatch, sortOrder, searchQuery, selectedCategory, selectedType, minPrice, maxPrice, page, limit]);

    const getCategoryName = (id) => {
        const category = categories.find(category => category.id === id);
        return category ? category.name : 'Неизвестно';
    };

    const getTypeName = (id) => {
        const type = types.find(type => type.id === id);
        return type ? type.name : 'Неизвестно';
    };

    const handleFilterClick = (event) => {
        event.stopPropagation(); // Остановить всплытие события
    };
    // Количество страниц для пагинации
    const pageCount = Math.ceil(totalCount / limit);

    return (
        <div className="contianer__sell_bike">
            <div className="container__header__sell">
                <div className="Title__header">
                    <h3>Велосипеды</h3>
                </div>
                <div className="tools">
                    <div className="input__img">
                        <div className="img__search"></div>
                        <input
                            type="text"
                            placeholder="Поиск..."
                            className="input__search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="filer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <div className="img__filter" ></div>
                        <h4>Фильтр</h4>
                        {isFilterOpen && (
                            <div className="custom-filter-menu" ref={filterRef} onClick={handleFilterClick}>
                                <h4>Фильтры</h4>
                                <div className="filter-item">
                                    <label>Категория:</label>
                                    <select value={selectedCategory} onChange={handleCategoryChange} className="custom-select">
                                    <option value="">Все категории</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                </div>
                                <div className="filter-item">
                                    <label>Тип:</label>
                                    <select value={selectedType} onChange={handleTypeChange} className="custom-select">
                                        <option value="">Все типы</option>
                                        {types.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="filter-item">
                                    <label>Минимальная цена:</label>
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        className="custom-input"
                                        placeholder="Введите минимальную цену"
                                    />
                                </div>
                                <div className="filter-item">
                                    <label>Максимальная цена:</label>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        className="custom-input"
                                        placeholder="Введите максимальную цену"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        setIsFilterOpen(false);
                                        dispatch(fetchBikes({ sortOrder, searchQuery, category: selectedCategory, type: selectedType, minPrice, maxPrice, page }));
                                    }}
                                    className="custom-button"
                                >
                                    Применить фильтры
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="container__sort">
                        <h4>Сортировка</h4>
                        <select value={sortOrder} onChange={handleSortChange} className="select__tool">
                            <option value="expensive">Сначала дорогие</option>
                            <option value="cheap">Сначала дешевые</option>
                        </select>
                    </div>
                </div>
            </div>

            {noBikesMessage && <div className="no-bikes-message">{noBikesMessage}</div>}

            {bikes.map(bike => (
                <div className="container__bike" key={bike.id}>
                    <div className="container__bike__information">
                        <div className="background__bike"
                             style={{backgroundImage: `url(http://localhost:9005/${bike.img})`}}></div>
                        <div className="text__bike">
                            <h2>{bike.name}</h2>
                            <h3>Тип велосипеда: {getTypeName(bike.id_type_bike)}</h3>
                            <h3>Категория товара: {getCategoryName(bike.id_category_bike)}</h3>
                            <h3>Брэнд: {bike.brand}</h3>
                            <h3>Модель: {bike.model}</h3>
                        </div>
                    </div>
                    <div className="information__bike">
                        <h3>Цена: ${bike.price}</h3>
                        <div className="button__basket">
                            <div className="img__basket"></div>
                            <h3>Add to cart</h3>
                        </div>
                    </div>
                </div>
            ))}

            <div className="pagination">
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                />
            </div>
        </div>
    );
}