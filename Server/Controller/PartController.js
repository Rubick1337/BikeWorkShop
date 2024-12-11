const uuid = require("uuid");
const path = require("path");
const { Part } = require("../Models/models");
const ApiError = require("../Exception/ApiError");
const Sequelize = require("sequelize");
const fs = require("fs");

class PartController {
    // Создание новой детали
    async createPart(req, res, next) {
        console.log("Запрос на создание детали:", req.body);
        console.log("Файлы в запросе:", req.files);
        try {
            const { id_type_part, id_category_part, name, price, model, brand,description, inSell } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const part = await Part.create({
                id_type_part,
                id_category_part,
                name,
                price,
                model,
                brand,
                description,
                inSell,
                img: fileName,
            });

            return res.json(part);
        } catch (e) {
            console.log("ошибка" + e.message);
            next(ApiError.badRequest(e.message));
        }
    }

    // Получение всех частей с фильтрацией и поиском
    async getPartAll(req, res) {
        let { id_type_part, id_category_part, searchQuery, minPrice, maxPrice, limit, page, sortPrice } = req.query;
        console.log("Filter parameters:", { id_type_part, id_category_part, minPrice, maxPrice, searchQuery });

        // Дефолтные значения для пагинации и сортировки
        page = page || 1;
        limit = limit || 5;
        let offset = (page - 1) * limit;

        // Объект условий фильтрации
        let whereConditions = {};

        // Фильтрация по типу детали
        if (id_type_part) {
            whereConditions.id_type_part = id_type_part;
        }

        // Фильтрация по категории детали
        if (id_category_part) {
            whereConditions.id_category_part = id_category_part;
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
                    { brand: { [Sequelize.Op.iLike]: `%${searchQuery}%` } },
                    { model: { [Sequelize.Op.iLike]: `%${searchQuery}%` } },
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
            const parts = await Part.findAndCountAll({
                where: whereConditions,
                limit,
                offset,
                order
            });
            return res.json(parts);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    // Получение одной детали по ID
    async getPartOne(req, res) {
        const { id } = req.params;
        const part = await Part.findOne({
            where: { id }
        });
        return res.json(part);
    }

    // Удаление детали
    async deletePart(req, res) {
        const { id } = req.params;

        try {
            const part = await Part.findByPk(id);
            if (!part) {
                return res.status(404).json({ error: 'Запись о детали не найдена' });
            }

            // Если есть изображение, удаляем его
            if (part.img) {
                const imagePath = path.resolve(__dirname, '..', 'static', part.img);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении изображения:', err);
                    }
                });
            }

            // Удаляем саму запись о детали
            await part.destroy();
            return res.json({ message: 'Запись о детали успешно удалена' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Не удалось удалить деталь' });
        }
    }

    // Редактирование детали
    async editPart(req, res) {
        try {
            const { id_type_part, id_category_part, name, price, model, brand,description, inSell } = req.body;
            const { id } = req.params;
            console.log("Запрос" + id_type_part, id_category_part, name, price, model, brand,description, inSell)
            console.log("Редактирование детали с id: " + id);

            const part = await Part.findByPk(id);
            if (!part) {
                return res.status(404).json({ error: 'Part not found' });
            }

            // Если есть новое изображение, обновляем его
            if (req.files && req.files.img) {
                const oldImg = part.img;

                if (oldImg) {
                    const oldImgPath = path.resolve(__dirname, '..', 'static', oldImg);
                    fs.unlinkSync(oldImgPath);
                }

                const { img } = req.files;
                const newFileName = uuid.v4() + ".jpg";
                await img.mv(path.resolve(__dirname, '..', 'static', newFileName));

                // Обновляем информацию о детали
                await part.update({
                    id_type_part,
                    id_category_part,
                    name,
                    price,
                    model,
                    brand,
                    inSell,
                    description,
                    img: newFileName,
                });
            } else {
                // Если изображения нет, просто обновляем остальные поля
                await part.update({ id_type_part, id_category_part, name, price, model, brand, inSell });
            }

            return res.json({ message: 'Part updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to update part' });
        }
    }
}

module.exports = new PartController();
