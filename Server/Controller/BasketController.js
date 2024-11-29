const {Basket} = require('../Models/models');
const ApiError = require("../Exception/ApiError");
class BasketController {
    async createBasket(req, res){
        const {id_user,cost,status,date} = req.body;
        const basket = await Basket.create({id_user,cost,status,date})
        return res.json(basket)
    }
    async getBasketAll(req, res) {
        try {
            // Получаем параметры из query
            let { status, limit, page } = req.query;
            // Устанавливаем значения по умолчанию
            page = page || 1;
            limit = limit || 5;
            let offset = page * limit - limit;
            let baskets;
            // Фильтрация по статусу
            if (!status) {
                // Если статус не указан, возвращаем все корзины
                baskets = await Basket.findAndCountAll({ limit, offset });
            } else {
                // Если статус указан, фильтруем по нему
                baskets = await Basket.findAndCountAll({
                    where: { status }, limit, offset});
            }
            return res.json(baskets);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async getBasketNull(req, res) {
        try {
            const userId = req.params.id; // временно пока нету jwt tokens
            const basket = await Basket.findOne({ id_user: userId, status: 'пусто' });

            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена' });
            }

            return res.status(200).json(basket);
        } catch (error) {
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