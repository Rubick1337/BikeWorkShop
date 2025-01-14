import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBasketItems, deleteBasketItem, clearBasket } from "../../store/slice/basketSlice";
import "./BasketStyle.scss";
import CustomAlert from "../CustomAlert/CustomAlert";
import { placeOrder } from '../../store/slice/basketSlice';

export default function Basket() {
    const dispatch = useDispatch();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const { basketItems, status, error } = useSelector((state) => state.baskets);
    const { id: userId } = useSelector((state) => state.auth.user);

    const isBasketEmpty = basketItems.length === 0;

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handlePlaceOrder = async () => {
        if (isBasketEmpty) {
            setAlertMessage('Корзина пуста. Добавьте товары для оформления заказа.');
            setAlertSeverity('error');
            setAlertOpen(true);
            return;
        }

        if (userId) {
            try {
                const totalPrice = basketItems.reduce(
                    (sum, item) =>
                        sum +
                        (Number(item.id_bike?.price) || Number(item.id_service?.price) || Number(item.id_part?.price) || 0),
                    0
                ).toFixed(2);

                await dispatch(placeOrder({ userId, cost: totalPrice }));
                dispatch(clearBasket());
                setAlertMessage('Заказ успешно оформлен!');
                setAlertSeverity('success');
                setAlertOpen(true);
            } catch (error) {
                console.error('Ошибка при оформлении заказа:', error);
                setAlertMessage('Ошибка при оформлении заказа!');
                setAlertSeverity('error');
                setAlertOpen(true);
            }
        }
    };

    useEffect(() => {
        if (userId) {
            dispatch(fetchBasketItems(userId));
        }
    }, [userId, dispatch]);

    const handleDelete = (item) => {
        dispatch(deleteBasketItem(item));
        setAlertMessage('Товар удален из корзины');
        setAlertSeverity('success');
        setAlertOpen(true);
    };

    if (status === 'loading') {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    const totalPrice = basketItems.reduce(
        (sum, item) =>
            sum +
            (Number(item.id_bike?.price) || Number(item.id_service?.price) || Number(item.id_part?.price) || 0),
        0
    ).toFixed(2);

    return (
        <div className="container__basket">
            <div className="container__item__basket">
                <div className="title__basket">
                    <h3>Ваша корзина</h3>
                </div>

                {basketItems.map((item, index) => (
                    <div key={index} className="container__bike">
                        <div className="container__bike__information">
                            <div
                                className="background__bike"
                                style={{
                                    backgroundImage: `url(${item.id_bike?.img ? `${apiBaseUrl}${item.id_bike.img}` :
                                        item.id_service?.img ? `${apiBaseUrl}${item.id_service.img}` :
                                            item.id_part?.img ? `${apiBaseUrl}${item.id_part.img}` : ''})`,
                                }}
                            ></div>
                            <div className="text__bike">
                                <h2>{item.id_bike?.name || item.id_service?.name || item.id_part?.name}</h2>
                                <h3>Цена: ${item.id_bike?.price || item.id_service?.price || item.id_part?.price}</h3>

                                {/* Дополнительные данные для велосипеда */}
                                {item.id_bike && (
                                    <>
                                        <h3>Брэнд: {item.id_bike.brand || 'Не указан'}</h3>
                                        <h3>Модель: {item.id_bike.model || 'Не указана'}</h3>
                                    </>
                                )}

                                {/* Дополнительные данные для деталей */}
                                {item.id_part && (
                                    <>
                                        <h3>Модель: {item.id_part.model || 'Не указана'}</h3>
                                        <h3>Брэнд: {item.id_part.brand || 'Не указан'}</h3>
                                    </>
                                )}

                                {/* Дополнительные данные для услуг */}
                                {item.id_service && (
                                    <>
                                        <h3>Описание: {item.id_service.description || 'Описание отсутствует'}</h3>
                                    </>
                                )}
                            </div>
                        </div>
                        <button
                            className="custom-button-basket-delete"
                            onClick={() => handleDelete(item)}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
            <div className="container__info__basket">
                <div className="title__money">
                    <h2>Сумма к оплате</h2>
                </div>
                <div className="container__info__user">
                    <div className="container__item__info">
                        <h3>Общая цена:</h3>
                        <h4>${totalPrice}</h4>
                    </div>
                </div>
                <button className="custom-button-basket" onClick={handlePlaceOrder}>Оформить заказ</button>
            </div>
            <CustomAlert
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                handleClose={handleCloseAlert}
            />
        </div>
    );
}