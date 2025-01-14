const uuid = require("uuid");
const path = require("path");
const { Part } = require("../Models/models");
const ApiError = require("../Exception/ApiError");
const fs = require("fs");

class PartController {
    // Создание новой детали
    async createPart(req, res, next) {
        console.log("Запрос на создание детали:", req.body);
        console.log("Файлы в запросе:", req.files);
        try {
            const { id_type_part, id_category_part, name, price, model, brand, description, inSell } = req.body;
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
        console.log("Filter parameters:", { id_type_part, id_category_part, minPrice, maxPrice, searchQuery,sortPrice });

        // Дефолтные значения для пагинации и сортировки
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;
        const offset = (page - 1) * limit;

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
            if (minPrice) whereConditions.price.$gte = parseFloat(minPrice);
            if (maxPrice) whereConditions.price.$lte = parseFloat(maxPrice);
        }

        // Фильтрация по поисковому запросу
        if (searchQuery) {
            whereConditions.$or = [
                { name: { $regex: searchQuery, $options: 'i' } },
                { brand: { $regex: searchQuery, $options: 'i' } },
                { model: { $regex: searchQuery, $options: 'i' } },
            ];
        }

        // Сортировка по цене
        let sort = {};
        if (sortPrice === 'asc') {
            sort.price = 1;
        } else if (sortPrice === 'desc') {
            sort.price = -1;
        }

        console.log("Сортировка:", sort); // Логируем сортировку

        try {
            const parts = await Part.find(whereConditions).limit(limit).skip(offset).sort(sort);
            const totalCount = await Part.countDocuments(whereConditions);
            return res.json({ rows: parts, count: totalCount }); // Изменяем на rows для соответствия Redux
        } catch (e) {
            console.error("Ошибка при получении частей:", e.message); // Логируем ошибку
            return res.status(500).json({ error: e.message });
        }
    }

    // Получение одной детали по ID
    async getPartOne(req, res) {
        const { id } = req.params;
        try {
            const part = await Part.findById(id);
            if (!part) {
                return res.status(404).json({ error: 'Запись о детали не найдена' });
            }
            return res.json(part);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении детали' });
        }
    }

    // Удаление детали
    async deletePart(req, res) {
        const { id } = req.params;

        try {
            const part = await Part.findById(id);
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
            await Part.findByIdAndDelete(id);
            return res.json({ message: 'Запись о детали успешно удалена' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Не удалось удалить деталь' });
        }
    }

    // Редактирование детали
    async editPart(req, res) {
        const { id } = req.params;
        try {
            const { id_type_part, id_category_part, name, price, model, brand, inSell } = req.body;
            console.log(id, id_type_part, id_category_part, name, price, model, brand, inSell )
            const part = await Part.findById(id);
            if (!part) {
                return res.status(404).json({ error: 'Запись о детали не найдена' });
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
                part.id_type_part = id_type_part;
                part.id_category_part = id_category_part;
                part.name = name;
                part.price = price;
                part.model = model;
                part.brand = brand;
                part.inSell = inSell;
                part.img = newFileName;
            } else {
                // Если изображения нет, просто обновляем остальные поля
                part.id_type_part = id_type_part;
                part.id_category_part = id_category_part;
                part.name = name;
                part.price = price;
                part.model = model;
                part.brand = brand;
                part.inSell = inSell;
            }

            await part.save();
            return res.json({ message: 'Деталь успешно обновлена' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Не удалось обновить деталь' });
        }
    }
}

module.exports = new PartController();