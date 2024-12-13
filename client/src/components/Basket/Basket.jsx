import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBasketItems, deleteBasketItem } from "../../store/slice/basketSlice";
import "./BasketStyle.scss";
import CustomAlert from "../CustomAlert/CustomAlert";

export default function Basket() {
    const dispatch = useDispatch();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const { basketItems, status, error } = useSelector((state) => state.baskets);
    const { id: userId } = useSelector((state) => state.auth.user);

    const [alertOpen, setAlertOpen] = useState(false);  // Состояние для открытия alert
    const [alertMessage, setAlertMessage] = useState('');  // Сообщение alert
    const [alertSeverity, setAlertSeverity] = useState('');  // Тип alert: success или error

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    useEffect(() => {
        if (userId) {
            dispatch(fetchBasketItems(userId));
        }
    }, [userId, dispatch]);

    const handleDelete = (item) => {
        dispatch(deleteBasketItem(item)); // Отправляем экшен для удаления
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
            (Number(item.Bike?.price) || Number(item.Service?.price) || Number(item.Part?.price) || 0),
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
                                    backgroundImage: `url(${item.Bike?.img ? `${apiBaseUrl}${item.Bike.img}` :
                                        item.Service?.img ? `${apiBaseUrl}${item.Service.img}` :
                                            item.Part?.img ? `${apiBaseUrl}${item.Part.img}` : ''})`,
                                }}
                            ></div>
                            <div className="text__bike">
                                <h2>{item.Bike?.name || item.Service?.name || item.Part?.name}</h2>
                                <h3>Цена: ${item.Bike?.price || item.Service?.price || item.Part?.price}</h3>

                                {/* Дополнительные данные для разных типов */}
                                {item.Bike && (
                                    <>
                                        <h3>Брэнд: {item.Bike.brand || 'Не указан'}</h3>
                                        <h3>Модель: {item.Bike.model || 'Не указана'}</h3>
                                    </>
                                )}

                                {item.Part && (
                                    <>
                                        <h3>Модель: {item.Part.model || 'Не указана'}</h3>
                                        <h3>Брэнд: {item.Part.brand || 'Не указан'}</h3>
                                    </>
                                )}

                                {item.Service && (
                                    <>
                                        <h3>Описание: {item.Service.description || 'Описание отсутствует'}</h3>
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
                <button className="custom-button-basket">Оформить заказ</button>
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
