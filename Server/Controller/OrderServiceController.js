const { ServiceOrder } = require("../Models/models");

class OrderServiceController {
    async createOrderService(req, res) {
        const { id_service, id_basket } = req.body;
        try {
            const order = await ServiceOrder.create({ id_service, id_basket });
            return res.json(order);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при создании заказа услуги' });
        }
    }

    async getOrderServiceOne(req, res) {
        const { id } = req.params;
        try {
            const service = await ServiceOrder.findOne({
                where: { id }
            });
            if (!service) {
                return res.status(404).json({ message: 'Order service not found' });
            }
            return res.json(service);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при получении заказа' });
        }
    }

    async getOrderServiceAll(req, res) {
        const { id_user, id_basket } = req.query;
        try {
            if (!id_user || !id_basket) {
                return res.status(400).json({ message: 'id_user и id_basket обязательны для фильтрации' });
            }

            const orderServices = await ServiceOrder.findAll({
                where: { id_user, id_basket }
            });

            return res.status(200).json(orderServices);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async deleteOrderService(req, res) {
        const { id } = req.params;
        try {
            const orderService = await ServiceOrder.destroy({
                where: { id }
            });
            if (!orderService) {
                return res.status(404).json({ message: 'Service order not found' });
            }
            return res.status(200).json({ message: 'Service order deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting service order' });
        }
    }
}

module.exports = new OrderServiceController();
