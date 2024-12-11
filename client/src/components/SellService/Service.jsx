import React from 'react';

const Service = ({ service, isAuth, user, handleDeleteClick, handleEditClick, getCategoryName, getTypeName }) => {
    return (
        <div className={`container__bike ${service.inSell === false ? 'sold-out' : ''}`}>
            <div className="container__bike__information">
                <div className="background__bike"
                     style={{backgroundImage: `url(http://localhost:9005/${service.img})`}}
                ></div>
                <div className="text__bike">
                    <h2>{service.name}</h2>
                    <h3>Тип услуги: {getTypeName(service.id_type_service)}</h3>
                    <h3>Категория услуги: {getCategoryName(service.id_category_service)}</h3>
                    <h3>Описание: {service.description}</h3>
                </div>
            </div>
            <div className="information__bike">
                <h3>Цена: ${service.price}</h3>
                {isAuth && (user.role === 'механик' || user.role === 'владелец') ? (
                    <div className="button__crud">
                        <button
                            className="crud__buton"
                            onClick={() => handleDeleteClick(service.id)}
                        >
                            Удалить
                        </button>
                        <button
                            className="crud__buton"
                            onClick={() => handleEditClick(service)}
                        >
                            Редактировать
                        </button>
                    </div>
                ) : (
                    <div className="button__basket">
                        <div className="img__basket"></div>
                        <h3>Добавить в корзину</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Service;
