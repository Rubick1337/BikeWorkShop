const { BikeOrder, Bike } = require("../Models/models");

class OrderBikeController {
    async createOrderBike(req, res) {
        try {
            const { id_bike, id_basket } = req.body;
            const order = await BikeOrder.create({ id_bike, id_basket });
            return res.json(order);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при создании заказа на велосипед' });
        }
    }

    async getOrderBikeOne(req, res) {
        const { id } = req.params;
        try {
            const bikeOrder = await BikeOrder.findById(id);
            if (!bikeOrder) {
                return res.status(404).json({ message: 'Заказ на велосипед не найден' });
            }
            return res.json(bikeOrder);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при получении заказа на велосипед' });
        }
    }

    async getOrderBikeAll(req, res) {
        try {
            const { id_user, id_basket } = req.query;

            if (!id_user || !id_basket) {
                return res.status(400).json({ message: 'id_user и id_basket обязательны для фильтрации' });
            }

            const orderBikes = await BikeOrder.find({ id_user, id_basket });

            return res.status(200).json(orderBikes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async deleteOrderBike(req, res) {
        const { id } = req.params;
        try {
            const order = await BikeOrder.findByIdAndDelete(id);
            if (!order) {
                return res.status(404).json({ message: 'Заказ на велосипед не найден' });
            }
            return res.status(200).json({ message: 'Заказ на велосипед успешно удален' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при удалении заказа на велосипед' });
        }
    }
}

module.exports = new OrderBikeController();