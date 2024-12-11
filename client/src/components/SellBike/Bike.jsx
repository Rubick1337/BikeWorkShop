// src/components/Bike.js
import BikeDescription from './BikeDescription';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

const Bike = ({ bike, isAuth, user, handleDeleteClick, handleEditClick, getCategoryName, getTypeName }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={`container__bike ${bike.inSell === false ? 'sold-out' : ''}`}>
            <div className="container__bike__information">
                <div className="background__bike"
                     style={{backgroundImage: `url(http://localhost:9005/${bike.img})`}}
                     onClick={handleClickOpen}
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
            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
                <DialogTitle>Информация о велосипеде: {bike.name}</DialogTitle>
                <DialogContent>
                    <BikeDescription bike={bike} getCategoryName={getCategoryName} getTypeName={getTypeName} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Bike;
