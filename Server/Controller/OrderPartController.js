const { PartOrder } = require("../Models/models");

class OrderPartController {
    // Создание нового заказа части
    async createOrderPart(req, res) {
        const { id_part, id_basket } = req.body;
        console.log(id_part, id_basket + "dsadasdsadsasadas");
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
            const part = await PartOrder.findOne({
                where: { id }
            });
            if (!part) {
                return res.status(404).json({ message: 'Order part not found' });
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

            const orderParts = await PartOrder.findAll({
                where: { id_user, id_basket }
            });

            return res.status(200).json(orderParts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async deleteOrderPart(req, res) {
        const { id } = req.params;
        try {
            const orderPart = await PartOrder.destroy({
                where: { id }
            });
            if (!orderPart) {
                return res.status(404).json({ message: 'Part order not found' });
            }
            return res.status(200).json({ message: 'Part order deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting part order' });
        }
    }
}

module.exports = new OrderPartController();
