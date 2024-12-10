// src/components/Bike.js
import React from 'react';

const Bike = ({ bike, isAuth, user, handleDeleteClick, handleEditClick, getCategoryName, getTypeName }) => {
    return (
        <div className="container__bike" key={bike.id}>
            <div className="container__bike__information">
                <div className="background__bike"
                     style={{ backgroundImage: `url(http://localhost:9005/${bike.img})` }}
                ></div>
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
                {isAuth && (user.role === 'механик' || user.role === 'владелец') ? (
                    <div className="button__crud">
                        <button
                            className="crud__buton"
                            onClick={() => handleDeleteClick(bike.id)}
                        >
                            Удалить
                        </button>
                        <button
                            className="crud__buton"
                            onClick={() => handleEditClick(bike)}  // передаем bike для редактирования
                        >
                            Редактировать
                        </button>
                    </div>
                ) : (
                    <div className="button__basket">
                        <div className="img__basket"></div>
                        <h3>Add to cart</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bike;
