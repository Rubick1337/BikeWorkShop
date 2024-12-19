import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import ServiceDescription from '../ServiceDescription/ServiceDescription';
import {useDispatch, useSelector} from "react-redux";
import { createOrderService } from '../../store/slice/orderServiceSlice';
import {fetchBasketNull} from "../../store/slice/basketSlice"
import CustomAlert from "../CustomAlert/CustomAlert";

const Service = ({ service, isAuth, user, handleDeleteClick, handleEditClick, getCategoryName, getTypeName }) => {
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
                    id_service: service.id,
                    id_basket: basket.id,
                };
                dispatch(createOrderService(orderData));
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
        <div className={`container__bike ${service.inSell === false ? 'sold-out' : ''}`}>
            <div className="container__bike__information">
                <div className="background__bike"
                     style={{ backgroundImage: `url(${apiBaseUrl}${service.img})` }}
                     onClick={handleClickOpen}
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
                    <div className="button__basket" onClick={handleAddToCart}>
                        <div className={`img__basket ${isClicked ? 'clicked' : ''}`}></div>
                        <h3>add to cart</h3>
                    </div>
                )}
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
                <DialogTitle>Информация об услуге: {service.name}</DialogTitle>
                <DialogContent>
                    <ServiceDescription service={service} getCategoryName={getCategoryName} getTypeName={getTypeName} />
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

export default Service;
