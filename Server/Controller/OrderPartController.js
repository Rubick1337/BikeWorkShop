const {PartOrder} = require("../Models/models");

class OrderPartController {
    async createOrderPart(req, res){
        const {id_part,id_basket} = req.body;
        const order = await PartOrder.create({id_part,id_basket})
        return res.json(order)
    }
    async getOrderPartOne(req,res){
        const {id } = req.params
        const part = await PartOrder.findOne(
            {
                where:{id}
            }
        )
        if(!part){
            return  res.status(404).json({ message: 'part order not found' })
        }
        return res.json(part)
    }

    async getOrderPartAll(req,res){
        try {
            const { id_user, id_basket } = req.query;

            if (!id_user || !id_basket) {
                return res.status(400).json({ message: 'id_user и id_basket обязательны для фильтрации' });
            }

            const orderParts = await PartOrder.findAll({
                where: {
                    id_user,
                    id_basket
                }
            });

            return res.status(200).json(orderParts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}
module.exports = new OrderPartController()