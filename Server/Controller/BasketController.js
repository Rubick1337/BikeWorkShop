const {Basket} = require('../Models/models');
const ApiError = require("../Exception/ApiError");
const jwt = require("jsonwebtoken");

class BasketController {
    async createBasket(req, res){
        const {id_user,cost,status,date} = req.body;
        const basket = await Basket.create({id_user,cost,status,date})
        return res.json(basket)
    }
    async getBasketAll(req, res) {
        try {
            // Получаем токен из заголовков запроса
            const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

            if (!token) {
                return res.status(401).json({ message: 'Токен не предоставлен' });
            }

            // Декодируем токен и получаем id пользователя
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            const userId = decoded.id;

            let { limit, page, order } = req.query;
            page = page || 1;
            limit = limit || 5;
            let offset = page * limit - limit;

            const sortOrder = order === 'desc' ? 'DESC' : 'ASC';

            // Сортировка по статусу
            const orderBy = [['status', sortOrder]];

            const baskets = await Basket.findAndCountAll({
                where: { userId }, // Фильтруем корзины по userId
                limit,
                offset,
                order: orderBy
            });

            return res.json(baskets);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Неверный токен' });
            }
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async getBasketNull(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

            if (!token) {
                return res.status(401).json({ message: 'Токен не предоставлен' });
            }

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            const userId = decoded.id;

            let basket = await Basket.findOne({
                where: { userId, status: 'пусто' }
            });


            return res.status(200).json(basket);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Неверный токен' });
            }
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async editBasket(req, res) {
        try {
            const basketId = req.params.id;
            const { cost } = req.body;
            const basket = await Basket.findByPk(basketId)
            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена' });
            }
            // Обновляем корзину: меняем стоимость, статус и дату
            const updatedBasket = await basket.update(
                {
                    cost: cost,
                    status: 'в обработке',
                    date: new Date()
                });

            if (!updatedBasket) {
                return res.status(404).json({ message: 'Корзина не найдена' });
            }

            return res.status(200).json(updatedBasket);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async editBasketStatus (req, res) {
        const basketId = req.params.id;
        const { status } = req.body;
        const basket = await Basket.findByPk(basketId)
        if (!basket) {
            return res.status(404).json({ message: 'Корзина не найдена' });
        }
        const updatedBasket = await basket.update({status})
        return res.status(200).json(updatedBasket);
    }
}
module.exports = new BasketController()