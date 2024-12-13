import React from 'react';

const ServiceDescription = ({ service, getCategoryName, getTypeName }) => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    return (
        <div className="modal__information">
            <img
                src={`${apiBaseUrl}${service.img}`}
                alt={service.name}
                style={{ width: '250px', marginBottom: '20px',alignSelf: 'center'}}
            />
            <p><strong>Тип услуги:</strong> {getTypeName(service.id_type_service)}</p>
            <p><strong>Категория услуги:</strong> {getCategoryName(service.id_category_service)}</p>
            <p><strong>Цена:</strong> ${service.price}</p>
            <p><strong>Описание:</strong> {service.description}</p>
        </div>
    );
};

export default ServiceDescription;
