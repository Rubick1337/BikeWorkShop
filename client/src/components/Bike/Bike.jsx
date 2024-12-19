import BikeDescription from '../BikeDescription/BikeDescription';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderBike } from '../../store/slice/orderBikeSlice';  // Импортируем экшен для создания заказа
import {fetchBasketNull} from "../../store/slice/basketSlice"
import CustomAlert from "../CustomAlert/CustomAlert";

const Bike = ({ bike, isAuth, user, handleDeleteClick, handleEditClick, getCategoryName, getTypeName }) => {
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
        setOpen(true);
    };


    const handleClose = () => {

        setOpen(false);
    };
    const { id: userId } = useSelector((state) => state.auth.user);

    const handleAddToCart = async () => {
        try {
            if(isAuth) {
                // Вызываем `fetchBasketNull` с userId
                const basket = await dispatch(fetchBasketNull(userId)).unwrap(); // Используем `unwrap`, чтобы получить результат
                console.log('Корзина:', basket);

                if (basket && basket.id) {
                    const orderData = {
                        id_bike: bike.id,
                        id_basket: basket.id,
                    };
                    dispatch(createOrderBike(orderData));
                } else {
                    console.log('Корзина не найдена');
                }
                setIsClicked(true);
                setAlertMessage('Товар добавлен в коризну');
                setAlertSeverity('success');
                setAlertOpen(true);
                setTimeout(() => setIsClicked(false), 300);
            }
            else {
                setAlertMessage('Авторизируйтесь или создайте аккаунт');
                setAlertSeverity('error');
                setAlertOpen(true);
            }

        } catch (error) {
            console.error('Ошибка:', error);
        }
    }


    return (
        <div className={`container__bike ${bike.inSell === false ? 'sold-out' : ''}`}>
            <div className="container__bike__information">
                <div className="background__bike"
                     style={{ backgroundImage: `url(${apiBaseUrl}${bike.img})` }}
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
                    <div className="button__basket" onClick={handleAddToCart}>
                        <div className={`img__basket ${isClicked ? 'clicked' : ''}`}></div>
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
            <CustomAlert
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                handleClose={handleCloseAlert}
            />
        </div>
    );
};

export default Bike;
