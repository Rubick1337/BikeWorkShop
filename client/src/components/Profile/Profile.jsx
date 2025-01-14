import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { fetchBaskets } from "../../store/slice/basketSlice";
import { Pagination } from "@mui/material";
import "./ProfileStyle.scss";

export default function Profile() {
    const dispatch = useDispatch();
    const { id, name, surname, email, adress } = useSelector((state) => state.auth.user);
    const { baskets, totalCount, noBasketsMessage, status } = useSelector((state) => state.baskets);

    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('expensive');

    const limit = 5;

    useEffect(() => {
        dispatch(fetchBaskets({ userId: id, name, page, limit, order }));
    }, [dispatch, page, order, name]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
console.log(baskets)
    // Фильтруем корзины
    const filteredBaskets = Array.isArray(baskets) ? baskets.filter(basket => basket.status !== 'пусто') : [];
    console.log(filteredBaskets);
    const pageCount = Math.ceil(totalCount / limit);
    console.log(limit)
    return (
        <div className="Profile__container">
            <div className="Profile">
                <div className="Profile__img"></div>
                <div className="Profile__info">
                    <h3 className="Profile__info__name">{name} {surname}</h3>
                    <h3 className="Profile__info__email">{email}</h3>
                    <h3 className="Profile__info__adress">{adress}</h3>
                </div>
            </div>

            <div className="contianer__sell">
                <div className="container__header__sell">
                    <div className="Title__header">
                        <h3>Заказы</h3>
                    </div>
                    <div className="tools">
                        <div className="container__sort">
                            <h4>Сортировка</h4>
                            <select value={order} onChange={(e) => setOrder(e.target.value)} className="select__tool">
                                <option value="expensive">Сначала завершенные</option>
                                <option value="cheap">Сначала в обработке</option>
                            </select>
                        </div>
                    </div>
                </div>

                {noBasketsMessage && <div className="no-bikes-message">{noBasketsMessage}</div>}
                {filteredBaskets.length === 0 ? (
                    <div className="no-items-message">Нет активных корзин</div>
                ) : (
                    filteredBaskets.map(basket => (
                        <div key={basket._id} className="container__bike">
                            <div className="container__bike__information">
                                <div className="background__order"></div>
                                <div className="text__bike">
                                    <h2>Дата заказа: {formatDate(basket.date)}</h2>
                                    <h3>Order #{basket._id}</h3>
                                    <h3>$ {basket.cost}</h3>
                                </div>
                            </div>
                            <div className="information__bike">
                                <h3>{basket.status}</h3>
                            </div>
                        </div>
                    ))
                )}

                <div className="pagination">
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        siblingCount={1}
                        boundaryCount={1}
                    />
                </div>
            </div>
        </div>
    );
}
