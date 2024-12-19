import React from 'react';

const BikeDescription = ({ bike, getCategoryName, getTypeName }) => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    return (
        <div className="modal__information">
            <img
                src={`${apiBaseUrl}${bike.img}`}
                alt={bike.name}
                style={{ width: '250px', marginBottom: '20px',alignSelf: 'center'}}
            />
            <p><strong>Тип велосипеда:</strong> {getTypeName(bike.id_type_bike)}</p>
            <p><strong>Категория товара:</strong> {getCategoryName(bike.id_category_bike)}</p>
            <p><strong>Брэнд:</strong> {bike.brand}</p>
            <p><strong>Модель:</strong> {bike.model}</p>
            <p><strong>Цена:</strong> ${bike.price}</p>
            <p><strong>Описание:</strong> {bike.description}</p>
        </div>
    );
};

export default BikeDescription;
