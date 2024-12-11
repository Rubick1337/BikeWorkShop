const uuid = require("uuid");
const path = require("path");
const { Service } = require("../Models/models");
const ApiError = require("../Exception/ApiError");
const Sequelize = require("sequelize");
const fs = require("fs");

class ServiceController {
    // Создание новой услуги
    async creatService(req, res, next) {
        console.log("Запрос на создание услуги:", req.body);
        console.log("Файлы в запросе:", req.files);
        try {
            const { id_type_service, id_category_service, name, price, description, inSell } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const service = await Service.create({
                id_type_service,
                id_category_service,
                name,
                price,
                description,
                inSell,
                img: fileName,
            });

            return res.json(service);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Получение всех услуг с фильтрацией и поиском
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
        const service = await Service.findOne({
            where: { id }
        });
        return res.json(service);
    }

    // Удаление услуги
    async deleteService(req, res) {
        const { id } = req.params;

        try {
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'Запись о услуге не найдена' });
            }

            // Если есть изображение, удаляем его
            if (service.img) {
                const imagePath = path.resolve(__dirname, '..', 'static', service.img);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении изображения:', err);
                    }
                });
            }

            await service.destroy();
            return res.json({ message: 'Запись о услуге успешно удалена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось удалить услугу' });
        }
    }

    // Редактирование услуги
    async editService(req, res) {
        try {
            const { id_type_service, id_category_service, name, price, description, inSell } = req.body;
            const { id } = req.params;
            console.log("Редактирование услуги с id: " + id);

            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'Service not found' });
            }

            // Если есть новое изображение, обновляем его
            if (req.files && req.files.img) {
                const oldImg = service.img;

                if (oldImg) {
                    const oldImgPath = path.resolve(__dirname, '..', 'static', oldImg);
                    fs.unlinkSync(oldImgPath);
                }

                const { img } = req.files;
                const newFileName = uuid.v4() + ".jpg";
                await img.mv(path.resolve(__dirname, '..', 'static', newFileName));

                // Обновляем информацию о услуге
                await service.update({
                    id_type_service,
                    id_category_service,
                    name,
                    price,
                    description,
                    inSell,
                    img: newFileName,
                });
            } else {
                // Если изображения нет, просто обновляем остальные поля
                await service.update({ id_type_service, id_category_service, name, price, description, inSell });
            }

            return res.json({ message: 'Service updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update service' });
        }
    }
}

module.exports = new ServiceController();
