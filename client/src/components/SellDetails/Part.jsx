import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import PartDescription from './PartDescription'; // Импортируем компонент PartDescription

const Part = ({ part, isAuth, user, handleDeleteClick, handleEditClick, getCategoryName, getTypeName }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);  // Открыть модальное окно
    };

    const handleClose = () => {
        setOpen(false);  // Закрыть модальное окно
    };

    return (
        <div className={`container__bike ${part.inSell === false ? 'sold-out' : ''}`}>
            <div className="container__bike__information">
                <div className="background__bike"
                     style={{backgroundImage: `url(http://localhost:9005/${part.img})`}}
                     onClick={handleClickOpen}
                ></div>
                <div className="text__bike">
                    <h2>{part.name}</h2>
                    <h3>Тип детали: {getTypeName(part.id_type_part)}</h3>
                    <h3>Категория товара: {getCategoryName(part.id_category_part)}</h3>
                    <h3>Брэнд: {part.brand}</h3>
                    <h3>Модель: {part.model}</h3>
                </div>
            </div>
            <div className="information__bike">
                <h3>Цена: ${part.price}</h3>
                {isAuth && (user.role === 'механик' || user.role === 'владелец') ? (
                    <div className="button__crud">
                        <button
                            className="crud__buton"
                            onClick={() => handleDeleteClick(part.id)}
                        >
                            Удалить
                        </button>
                        <button
                            className="crud__buton"
                            onClick={() => handleEditClick(part)}
                        >
                            Редактировать
                        </button>
                    </div>
                ) : (
                    <div className="button__basket">
                        <div className="img__basket"></div>
                        <h3>add to cart</h3>
                    </div>
                )}
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
                <DialogTitle>Информация о детали: {part.name}</DialogTitle>
                <DialogContent>
                    <PartDescription part={part} getCategoryName={getCategoryName} getTypeName={getTypeName} />
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

export default Part;
