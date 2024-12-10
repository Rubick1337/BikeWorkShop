const { Service } = require("../Models/models");
const ApiError = require("../Exception/ApiError");
const Sequelize = require("sequelize");

class ServiceController {
    // Создание новой услуги
    async creatService(req, res, next) {
        try {
            const { id_type_service, id_category_service, name, price } = req.body;

            const service = await Service.create({ id_type_service, id_category_service, name, price });

            return res.json(service);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Получение всех услуг с фильтрами
    async getServiceAll(req, res) {
        let { id_type_service, id_category_service, searchQuery, minPrice, maxPrice, limit, page, sortPrice } = req.query;
        console.log("Filter parameters:", { id_type_service, id_category_service, minPrice, maxPrice, searchQuery });

        // Дефолтные значения для пагинации и сортировки
        page = page || 1;
        limit = limit || 5;
        let offset = (page - 1) * limit;

        // Объект условий фильтрации
        let whereConditions = {};

        // Фильтрация по типу услуги
        if (id_type_service) {
            whereConditions.id_type_service = id_type_service;
        }

        // Фильтрация по категории услуги
        if (id_category_service) {
            whereConditions.id_category_service = id_category_service;
        }

        // Фильтрация по диапазону цен
        if (minPrice || maxPrice) {
            whereConditions.price = {};
            if (minPrice) whereConditions.price[Sequelize.Op.gte] = minPrice;
            if (maxPrice) whereConditions.price[Sequelize.Op.lte] = maxPrice;
        }

        // Фильтрация по поисковому запросу
        if (searchQuery) {
            whereConditions = {
                ...whereConditions,
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.iLike]: `%${searchQuery}%` } },
                    { id_type_service: { [Sequelize.Op.iLike]: `%${searchQuery}%` } },
                    { id_category_service: { [Sequelize.Op.iLike]: `%${searchQuery}%` } },
                ]
            };
        }

        // Сортировка по цене
        let order = [];
        if (sortPrice === 'asc') {
            order = [['price', 'ASC']];
        } else if (sortPrice === 'desc') {
            order = [['price', 'DESC']];
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

    // Получение одной услуги по ID
    async getServiceOne(req, res) {
        const { id } = req.params;
        try {
            const service = await Service.findOne({
                where: { id }
            });
            if (!service) {
                return res.status(404).json({ error: 'Service not found' });
            }
            return res.json(service);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    // Удаление услуги
    async deleteService(req, res) {
        const { id } = req.params;

        try {
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'Service record not found' });
            }

            await service.destroy();
            return res.json({ message: 'Service record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete service' });
        }
    }

    // Редактирование услуги
    async editService(req, res) {
        const { id } = req.params;
        const { id_type_service, id_category_service, name, price } = req.body;

        try {
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'Service record not found' });
            }

            await service.update({ id_type_service, id_category_service, name, price });
            return res.json({ message: 'Service updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update service' });
        }
    }
}

module.exports = new ServiceController();
