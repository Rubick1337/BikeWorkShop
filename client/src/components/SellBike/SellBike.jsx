import React, { useState } from 'react';
import "./SellBikeStyle.scss"
export default function SellBike() {
    const [sortOrder, setSortOrder] = useState('expensive'); // Состояние для сортировки

    // Обработчик изменения сортировки
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        console.log(`Сортировка: ${event.target.value}`);
    };

    return (
        <div className="contianer__sell_bike">
            <div className="container__header__sell">
                <div className="Title__header">
                    <h3>Велосипеды</h3>
                </div>
                <div className="tools">
                    <div className="input__img">
                        <div className="img__search"></div>
                        <input type="text" placeholder="Поиск..." className="input__search" />
                    </div>

                    <div className="filer">
                        <div className="img__filter"></div>
                        <h4>Фильтр</h4>
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
        </div>
    );
}
