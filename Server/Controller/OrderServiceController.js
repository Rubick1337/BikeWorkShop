const {ServiceOrder, PartOrder} = require("../Models/models");

class OrderServiceController {
    async createOrderService(req, res){
        const {id_service,id_basket} = req.body;
        const order = await ServiceOrder.create({id_service,id_basket})
        return res.json(order)
    }
    async getOrderServiceAll(req,res){
        try {
            const { id_user, id_basket } = req.query;

            if (!id_user || !id_basket) {
                return res.status(400).json({ message: 'id_user и id_basket обязательны для фильтрации' });
            }

            const orderServices = await ServiceOrder.findAll({
                where: {
                    id_user,
                    id_basket
                }
            });

            return res.status(200).json(orderServices);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}
module.exports = new OrderServiceController()