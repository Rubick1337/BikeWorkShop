const ApiError = require("../Exception/ApiError");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');
const cron = require('node-cron');

const { BikeOrder } = require('../models/models'); // Предполагается, что ваши модели находятся в папке `models`
const { ServiceOrder, PartOrder, Basket } = require('../models/models'); // Импорт других моделей, если нужно
const { Bike, Service, Part } = require('../models/models'); // Импорт моделей связанных сущностей


class BasketController {
    async createBasket(req, res){
        const {id_user,cost,status,date} = req.body;
        console.log("Создание корзины" + id_user,cost,status,date);
        const basket = await Basket.create({id_user,cost,status,date})
        return res.json(basket)
    }
    async getBasketAll(req, res) {
        try {
            const { userId } = req.query; // Получаем userId из строки запроса
            console.log(userId + "dsadsadasd");
            if (!userId) {
                return res.status(400).json({ message: 'ID пользователя не предоставлен' });
            }

            let { limit, page, order } = req.query;
            console.log(limit, page, order + "dsadsaddas");
            page = page || 1;
            limit = limit || 5;
            let offset = page * limit - limit;

            const sortOrder = order === 'desc' ? 'DESC' : 'ASC';

            // Сортировка по статусу
            const orderBy = [['status', sortOrder]];

            // Добавляем фильтрацию по статусу, чтобы исключить корзины с "пусто"
            const baskets = await Basket.findAndCountAll({
                where: {
                    id_user: userId,
                    status: { [Op.ne]: 'пусто' } // Exclude baskets with 'пусто' status
                },
                limit,
                offset,
                order: orderBy
            });
            console.log(baskets.count + "asdadsasd");

            return res.json(baskets);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getBasketNull(req, res) {
        try {
            const { id } = req.params;  // Получаем userId из параметра URL
            console.log(`Запрос корзины для пользователя с ID: ${id}`);

            if (!id) {
                return res.status(400).json({ message: 'ID пользователя не предоставлен' });
            }

            let basket = await Basket.findOne({
                where: { id_user: id, status: 'пусто' }
            });

            if (!basket) {
                return res.status(404).json({ message: 'Корзина с указанным ID не найдена' });
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
    async getBasketItems(req, res) {
        try {
            const { id_user } = req.params;

            const basket = await Basket.findOne({
                where: { id_user, status: 'пусто' },
            });

            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена' });
            }

            const basketId = basket.id;

            // Получаем заказы из всех таблиц
            const bikeOrders = await BikeOrder.findAll({
                where: { id_basket: basketId },
                include: [{ model: Bike, as: 'Bike' }],
            });
            console.log('Bike Orders:', bikeOrders);
            bikeOrders.forEach(order => {
                console.log(order.Bike);
            });

            const serviceOrders = await ServiceOrder.findAll({
                where: { id_basket: basketId },
                include: [{ model: Service, as: 'Service' }],
            });

            const partOrders = await PartOrder.findAll({
                where: { id_basket: basketId },
                include: [{ model: Part, as: 'Part' }],
            });

            // Объединяем все товары в один массив
            const items = [
                ...bikeOrders.map(order => ({
                    type: 'bike',
                    ...order.toJSON(),
                })),
                ...serviceOrders.map(order => ({
                    type: 'service',
                    ...order.toJSON(),
                })),
                ...partOrders.map(order => ({
                    type: 'part',
                    ...order.toJSON(),
                })),
            ];
            console.log("dasdadasd" + items);
            return res.status(200).json(items);
        } catch (error) {
            console.error('Ошибка при получении товаров корзины:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async placeOrder(req, res) {
        try {
            const { userId, cost } = req.body;  // Получаем cost из запроса
            console.log(userId,cost+"проверка корзины");
            // Проверяем, что стоимость была передана в запросе
            if (cost === undefined || cost <= 0) {
                return res.status(400).json({ message: 'Некорректная стоимость заказа' });
            }

            // Находим текущую корзину с пользователем, которая в статусе 'пусто'
            const basket = await Basket.findOne({
                where: { id_user: userId, status: 'пусто' }
            });

            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена или уже оформлена' });
            }

            // Обновляем текущую корзину (меняем статус на 'в обработке', обновляем дату и стоимость)
            const updatedBasket = await basket.update({
                status: 'в обработке',
                date: new Date(),
                cost: cost // Присваиваем стоимость из запроса
            });

            // Создаем новую корзину с статусом 'пусто'
            const newBasket = await Basket.create({
                id_user: userId,
                cost: 0,  // Стоимость новой корзины по умолчанию 0
                status: 'пусто',
                date: new Date()
            });

            return res.status(200).json({
                message: 'Заказ оформлен и новая корзина создана',
                updatedBasket,
                newBasket
            });
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

}
// Создание cron-задачи для обновления статуса корзин
cron.schedule('42 21 * * *', async () => { //21:42 каждый день
    try {
        const baskets = await Basket.findAll({
            where: {
                status: 'в обработке',
                date: {
                    [Op.lte]: new Date(new Date() - 3 * 24 * 60 * 60 * 1000)
                }
            }
        });

        // Обновляем статус корзин
        await Promise.all(
            baskets.map(basket =>
                basket.update({ status: 'выполнено' })
            )
        );

        console.log('Статусы корзин обновлены на "выполнено".');
    } catch (error) {
        console.error('Ошибка при обновлении статусов корзин:', error);
    }
});
module.exports = new BasketController()