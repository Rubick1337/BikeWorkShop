import React from 'react';
import '../SellBike/SellBikeStyle.scss'
const FilterMenu = ({
                        filterRef,
                        handleFilterClick,
                        selectedCategory,
                        handleCategoryChange,
                        categories,
                           selectedType,
                        handleTypeChange,
                        types,
                        minPrice,
                        handleMinPriceChange,
                        maxPrice,
                        handleMaxPriceChange,
                        applyFilters
                    }) => {
    return (
        <div className="custom-filter-menu animated" ref={filterRef} onClick={handleFilterClick}>
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
            <button onClick={applyFilters} className="custom-button">
                Применить фильтры
            </button>
        </div>
    );
};

export default FilterMenu;