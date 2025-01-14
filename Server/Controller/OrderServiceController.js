const { ServiceOrder } = require("../Models/models");

class OrderServiceController {
    // Создание нового заказа услуги
    async createOrderService(req, res) {
        const { id_service, id_basket } = req.body;
        try {
            const order = await ServiceOrder.create({ id_service, id_basket });
            return res.json(order);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при создании заказа услуги' });
        }
    }

    // Получение заказа услуги по ID
    async getOrderServiceOne(req, res) {
        const { id } = req.params;
        try {
            const service = await ServiceOrder.findById(id);
            if (!service) {
                return res.status(404).json({ message: 'Заказ услуги не найден' });
            }
            return res.json(service);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при получении заказа' });
        }
    }

    // Получение всех заказов услуг с фильтрацией по пользователю и корзине
    async getOrderServiceAll(req, res) {
        const { id_user, id_basket } = req.query;
        try {
            if (!id_user || !id_basket) {
                return res.status(400).json({ message: 'id_user и id_basket обязательны для фильтрации' });
            }

            const orderServices = await ServiceOrder.find({ id_user, id_basket });
            return res.status(200).json(orderServices);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // Удаление заказа услуги
    async deleteOrderService(req, res) {
        const { id } = req.params;
        try {
            const orderService = await ServiceOrder.findByIdAndDelete(id);
            if (!orderService) {
                return res.status(404).json({ message: 'Заказ услуги не найден' });
            }
            return res.status(200).json({ message: 'Заказ услуги успешно удален' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при удалении заказа услуги' });
        }
    }
}

module.exports = new OrderServiceController();