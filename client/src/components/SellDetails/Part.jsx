import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import PartDescription from './PartDescription'; // Импортируем компонент PartDescription
import { createOrderPart } from '../../store/slice/orderPartSlice';
import {fetchBasketNull} from "../../store/slice/basketSlice"
import {useDispatch, useSelector} from "react-redux";
import CustomAlert from "../CustomAlert/CustomAlert";
const Part = ({ part, isAuth, user, handleDeleteClick, handleEditClick, getCategoryName, getTypeName }) => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const [isClicked, setIsClicked] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);  // Состояние для открытия alert
    const [alertMessage, setAlertMessage] = useState('');  // Сообщение alert
    const [alertSeverity, setAlertSeverity] = useState('');  // Тип alert: success или error

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);  // Открыть модальное окно
    };

    const handleClose = () => {
        setOpen(false);  // Закрыть модальное окно
    };
    const { id: userId } = useSelector((state) => state.auth.user);

    const handleAddToCart = async () => {
        try {
            // Вызываем `fetchBasketNull` с userId
            const basket = await dispatch(fetchBasketNull(userId)).unwrap(); // Используем `unwrap`, чтобы получить результат
            console.log('Корзина:', basket);

            if (basket && basket.id) {
                const orderData = {
                    id_part: part.id,
                    id_basket: basket.id,
                };
                dispatch(createOrderPart(orderData));
            } else {
                console.log('Корзина не найдена');
            }
            setIsClicked(true);
            setAlertMessage('Товар добавлен в коризну');
            setAlertSeverity('success');
            setAlertOpen(true);
            setTimeout(() => setIsClicked(false), 300);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    return (
        <div className={`container__bike ${part.inSell === false ? 'sold-out' : ''}`}>
            <div className="container__bike__information">
                <div className="background__bike"
                     style={{ backgroundImage: `url(${apiBaseUrl}${part.img})` }}
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
                    <div className="button__basket" onClick={handleAddToCart}>
                        <div className={`img__basket ${isClicked ? 'clicked' : ''}`}></div>
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
            <CustomAlert
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                handleClose={handleCloseAlert}
            />
        </div>
    );
};

export default Part;
