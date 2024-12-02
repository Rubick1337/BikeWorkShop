const {BikeOrder, Bike} = require("../Models/models");

class OrderBikeController {
    async createOrderBike(req, res){
        const {id_service,id_basket} = req.body;
        const order = await BikeOrder.create({id_service,id_basket})
        return res.json(order)

    }
    async getOrderBikeOne(req,res){
        const {id } = req.params
        const bike = await BikeOrder.findOne(
            {
                where:{id}
            }
        )
        if(!bike){
            return  res.status(404).json({ message: 'Bike order not found' })
        }
        return res.json(bike)
    }
    async getOrderBikeAll(req, res) {
        try {
            const { id_user, id_basket } = req.query;

            if (!id_user || !id_basket) {
                return res.status(400).json({ message: 'id_user и id_basket обязательны для фильтрации' });
            }

            const orderBikes = await OrderBike.findAll({
                where: {
                    id_user,
                    id_basket
                }
            });

            return res.status(200).json(orderBikes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

}
module.exports = new OrderBikeController()