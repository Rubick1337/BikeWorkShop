const { PartOrder } = require("../Models/models");

class OrderPartController {
    // Создание нового заказа части
    async createOrderPart(req, res) {
        const { id_part, id_basket } = req.body;
        console.log(id_part, id_basket)
        try {
            const order = await PartOrder.create({ id_part, id_basket });
            return res.json(order);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при создании заказа части' });
        }
    }

    // Получение заказа части по ID
    async getOrderPartOne(req, res) {
        const { id } = req.params;
        try {
            const part = await PartOrder.findById(id);
            if (!part) {
                return res.status(404).json({ message: 'Заказ части не найден' });
            }
            return res.json(part);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при получении заказа' });
        }
    }

    // Получение всех заказов частей с фильтрацией по пользователю и корзине
    async getOrderPartAll(req, res) {
        const { id_user, id_basket } = req.query;
        try {
            if (!id_user || !id_basket) {
                return res.status(400).json({ message: 'id_user и id_basket обязательны для фильтрации' });
            }

            const orderParts = await PartOrder.find({ id_user, id_basket });
            return res.status(200).json(orderParts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // Удаление заказа части
    async deleteOrderPart(req, res) {
        const { id } = req.params;
        try {
            const orderPart = await PartOrder.findByIdAndDelete(id);
            if (!orderPart) {
                return res.status(404).json({ message: 'Заказ части не найден' });
            }
            return res.status(200).json({ message: 'Заказ части успешно удален' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при удалении заказа части' });
        }
    }
}

module.exports = new OrderPartController();