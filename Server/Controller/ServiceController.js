
const {Service} = require("../Models/models");
const ApiError = require("../Exception/ApiError");
const Sequelize = require("sequelize");

class ServiceController {
    async creatService(req, res, next) {
        try{
            const {id_type_service,id_category_service,name,price} = req.body;

            const service = await Service.create({id_type_service,id_category_service,name,price})

            return res.json(service)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getServiceAll(req, res) {
        let {id_type_service, id_category_service, name, price, limit, page, sortPrice} = req.query;

        page = page || 1;
        limit = limit || 5;
        let offset = page * limit - limit;

        // Объект условий фильтрации
        let whereConditions = {};

        // Фильтрация по типу услуги
        if (id_type_service && !id_category_service) {
            whereConditions.id_type_service = id_type_service;
        }
        // Фильтрация по категории услуги
        if (id_category_service && !id_type_service) {
            whereConditions.id_category_service = id_category_service;
        }
        // Фильтрация по типу и категории услуги
        if (id_type_service && id_category_service) {
            whereConditions = {
                id_type_service,
                id_category_service
            };
        }
        // Поиск по имени (если введено)
        if (name) {
            whereConditions.name = {
                [Sequelize.Op.iLike]: `%${name}%`,  // Поиск по имени, игнорируя регистр
            };
        }
        // Поиск по цене (если введена точная цена)
        if (price) {
            whereConditions.price = price;
        }
        // Сортировка по цене
        let order = [];

        if (sortPrice === 'asc') {
            order = [['price', 'ASC']]; // Сортировка по возрастанию
        } else if (sortPrice === 'desc') {
            order = [['price', 'DESC']]; // Сортировка по убыванию
        }

        try {
            const services = await Service.findAndCountAll({
                where: whereConditions,
                limit,
                offset,
                order
            });

            return res.json(services);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async getServiceOne(req,res){
        const {id } = req.params
        const service = await Service.findOne(
            {
                where:{id}
            }
        )
        return res.json(service)
    }
    async deleteService(req,res){
        const { id } = req.params;

        try {
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'service record not found' });
            }

            await service.destroy();
            return res.json({ message: 'service record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete service' });
        }
    }
    async editService(req,res){
        try {

            const { id_type_service,id_category_service,name,price} = req.body;

            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'service rec not found' });
            }

            await service.update({ id_type_service,id_category_service,name,price });
            return res.json({ message: 'service updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update service' });
        }
    }
}
module.exports = new ServiceController()