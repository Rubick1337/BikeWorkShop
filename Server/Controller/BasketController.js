const ApiError = require("../Exception/ApiError");
const { Basket, BikeOrder, ServiceOrder, PartOrder, Bike, Service, Part } = require('../models/models'); // Убедитесь, что правильные модели импортированы
const cron = require('node-cron');

class BasketController {
    async createBasket(req, res) {
        const { id_user, cost, status, date } = req.body;
        console.log("Создание корзины", id_user, cost, status, date);
        const basket = await Basket.create({ id_user, cost, status, date });
        return res.json(basket);
    }

    async getBasketAll(req, res) {
        try {
            const { userId } = req.query;
            console.log(userId, "Запрос всех корзин");

            // Проверка наличия userId
            if (!userId) {
                return res.status(400).json({ message: 'ID пользователя не предоставлен' });
            }

            // Обработка параметров запроса с умолчательными значениями
            let { limit = 5, page = 1, order = 'asc' } = req.query;
            limit = parseInt(limit);
            page = parseInt(page);
            const offset = (page - 1) * limit;

            const sortOrder = order === 'desc' ? -1 : 1; // Установка порядка сортировки

            // Получение корзин пользователя с учетом пагинации и сортировки
            const rows = await Basket.find({
                id_user: userId,
                status: { $ne: 'пусто' } // Исключаем корзины с "пусто"
            })
                .limit(limit)
                .skip(offset)
                .sort({ status: sortOrder });

            // Подсчет общего количества корзин
            const count = await Basket.countDocuments({
                id_user: userId,
                status: { $ne: 'пусто' }
            });

            // Возвращаем данные в формате, соответствующем Redux
            return res.json({ count, rows });
        } catch (error) {
            console.error('Ошибка при получении корзин:', error); // Логирование ошибки
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getBasketNull(req, res) {
        try {
            const { id } = req.params;
            console.log(`Запрос корзины для пользователя с ID: ${id}`);

            if (!id) {
                return res.status(400).json({ message: 'ID пользователя не предоставлен' });
            }

            let basket = await Basket.findOne({ id_user: id, status: 'пусто' });

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
            const basket = await Basket.findById(basketId);
            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена' });
            }

            const updatedBasket = await basket.updateOne({
                cost,
                status: 'в обработке',
                date: new Date()
            });

            return res.status(200).json(updatedBasket);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async editBasketStatus(req, res) {
        try {
            const basketId = req.params.id;
            const { status } = req.body;
            const basket = await Basket.findById(basketId);
            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена' });
            }

            const updatedBasket = await basket.updateOne({ status });
            return res.status(200).json(updatedBasket);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getBasketItems(req, res) {
        try {
            const { id_user } = req.params;

            const basket = await Basket.findOne({ id_user, status: 'пусто' });

            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена' });
            }

            const basketId = basket._id;

            // Получаем заказы из всех таблиц
            const bikeOrders = await BikeOrder.find({ id_basket: basketId }).populate('id_bike');
            const serviceOrders = await ServiceOrder.find({ id_basket: basketId }).populate('id_service');
            const partOrders = await PartOrder.find({ id_basket: basketId }).populate('id_part');

            // Объединяем все товары в один массив
            const items = [
                ...bikeOrders.map(order => ({
                    type: 'Bike',
                    ...order.toObject(),
                })),
                ...serviceOrders.map(order => ({
                    type: 'Service',
                    ...order.toObject(),
                })),
                ...partOrders.map(order => ({
                    type: 'Part',
                    ...order.toObject(),
                })),
            ];

            return res.status(200).json(items);
        } catch (error) {
            console.error('Ошибка при получении товаров корзины:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async placeOrder(req, res) {
        try {
            const { userId, cost } = req.body;

            // Проверяем, что стоимость была передана в запросе
            if (cost === undefined || cost <= 0) {
                return res.status(400).json({ message: 'Некорректная стоимость заказа' });
            }

            // Находим текущую корзину с пользователем, которая в статусе 'пусто'
            const basket = await Basket.findOne({ id_user: userId, status: 'пусто' });

            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена или уже оформлена' });
            }

            // Обновляем текущую корзину
            const updatedBasket = await Basket.findByIdAndUpdate(
                basket._id,
                {
                    status: 'в обработке',
                    date: new Date(),
                    cost
                },
                { new: true, runValidators: true } // Добавляем runValidators для проверки обязательных полей
            );

            // Создаем новую корзину
            const newBasket = new Basket({ id_user: userId, status: 'пусто', date: new Date() }); // Убедитесь, что все обязательные поля заполнены
            await newBasket.save();
            console.log("dassaddassdadsadas"+newBasket);
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
cron.schedule('42 21 * * *', async () => {
    try {
        const baskets = await Basket.find({
            status: 'в обработке',
            date: { $lte: new Date(new Date() - 3 * 24 * 60 * 60 * 1000) }
        });

        await Promise.all(
            baskets.map(basket => basket.updateOne({ status: 'выполнено' }))
        );

        console.log('Статусы корзин обновлены на "выполнено".');
    } catch (error) {
        console.error('Ошибка при обновлении статусов корзин:', error);
    }
});

module.exports = new BasketController();