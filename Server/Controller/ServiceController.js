const uuid = require("uuid");
const path = require("path");
const { Service } = require("../Models/models"); // Предполагается, что у вас есть модель Service для Mongoose
const ApiError = require("../Exception/ApiError");
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
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;
        const offset = (page - 1) * limit;

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
            if (minPrice) whereConditions.price.$gte = parseFloat(minPrice);
            if (maxPrice) whereConditions.price.$lte = parseFloat(maxPrice);
        }

        // Фильтрация по поисковому запросу
        if (searchQuery) {
            whereConditions.$or = [
                { name: { $regex: searchQuery, $options: 'i' } },
            ];
        }

        // Сортировка по цене
        let sort = {};
        if (sortPrice === 'asc') {
            sort.price = 1;
        } else if (sortPrice === 'desc') {
            sort.price = -1;
        }

        try {
            const services = await Service.find(whereConditions).limit(limit).skip(offset).sort(sort);
            const totalCount = await Service.countDocuments(whereConditions);
            return res.json({ rows: services, count: totalCount }); // Изменяем на rows для соответствия Redux
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    // Получение одной услуги по ID
    async getServiceOne(req, res) {
        const { id } = req.params;
        try {
            const service = await Service.findById(id);
            if (!service) {
                return res.status(404).json({ error: 'Запись о услуге не найдена' });
            }
            return res.json(service);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении услуги' });
        }
    }

    // Удаление услуги
    async deleteService(req, res) {
        const { id } = req.params;

        try {
            const service = await Service.findById(id);
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

            await Service.findByIdAndDelete(id);
            return res.json({ message: 'Запись о услуге успешно удалена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось удалить услугу' });
        }
    }

    // Редактирование услуги
    async editService(req, res) {
        const { id } = req.params;
        try {
            const { id_type_service, id_category_service, name, price, description, inSell } = req.body;

            const service = await Service.findById(id);
            if (!service) {
                return res.status(404).json({ error: 'Запись о услуге не найдена' });
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
                service.id_type_service = id_type_service;
                service.id_category_service = id_category_service;
                service.name = name;
                service.price = price;
                service.description = description;
                service.inSell = inSell;
                service.img = newFileName;
            } else {
                // Если изображения нет, просто обновляем остальные поля
                service.id_type_service = id_type_service;
                service.id_category_service = id_category_service;
                service.name = name;
                service.price = price;
                service.description = description;
                service.inSell = inSell;
            }

            await service.save();
            return res.json({ message: 'Услуга успешно обновлена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось обновить услугу' });
        }
    }
}

module.exports = new ServiceController();