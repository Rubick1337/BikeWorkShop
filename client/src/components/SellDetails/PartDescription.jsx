import React from 'react';

const PartDescription = ({ part, getCategoryName, getTypeName }) => {
    return (
        <div className="modal__information">
            <img
                src={`http://localhost:9005/${part.img}`}
                alt={part.name}
                style={{ width: '250px', marginBottom: '20px',alignSelf: 'center'}}
            />
            <p><strong>Тип детали:</strong> {getTypeName(part.id_type_part)}</p>
            <p><strong>Категория товара:</strong> {getCategoryName(part.id_category_part)}</p>
            <p><strong>Брэнд:</strong> {part.brand}</p>
            <p><strong>Модель:</strong> {part.model}</p>
            <p><strong>Цена:</strong> ${part.price}</p>
            <p><strong>Описание:</strong> {part.description}</p>
        </div>
    );
};

export default PartDescription;
