const uuid = require("uuid");
const path = require("path");
const { Bike } = require("../Models/models");
const ApiError = require("../Exception/ApiError");
const fs = require("fs");

class BikeController {
    async createBike(req, res, next) {
        console.log("Запрос на создание велосипеда:", req.body);
        console.log("Файлы в запросе:", req.files);
        try {
            const { id_type_bike, id_category_bike, name, price, model, brand, inSell, description } = req.body;
            const { img } = req.files;
            const fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const bike = await Bike.create({ id_type_bike, id_category_bike, name, price, model, brand, inSell, description, img: fileName });

            return res.json(bike);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getBikeAll(req, res) {
        let {
            id_type_bike,
            id_category_bike,
            searchQuery,
            minPrice,
            maxPrice,
            limit,
            page,
            sortPrice
        } = req.query;

        console.log("Filter parameters:", { id_type_bike, id_category_bike, minPrice, maxPrice, searchQuery });

        // Дефолтные значения для пагинации и сортировки
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;
        const offset = (page - 1) * limit;

        // Объект условий фильтрации
        let whereConditions = {};

        // Фильтрация по типу велосипеда
        if (id_type_bike) {
            whereConditions.id_type_bike = id_type_bike;
        }

        // Фильтрация по категории велосипеда
        if (id_category_bike) {
            whereConditions.id_category_bike = id_category_bike;
        }

        // Фильтрация по диапазону цен
        if (minPrice || maxPrice) {
            whereConditions.price = {};
            if (minPrice) {
                const parsedMinPrice = parseFloat(minPrice);
                if (!isNaN(parsedMinPrice)) {
                    whereConditions.price.$gte = parsedMinPrice;
                }
            }
            if (maxPrice) {
                const parsedMaxPrice = parseFloat(maxPrice);
                if (!isNaN(parsedMaxPrice)) {
                    whereConditions.price.$lte = parsedMaxPrice;
                }
            }
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
        const order = sortPrice === 'asc' ? { price: 1 } : sortPrice === 'desc' ? { price: -1 } : {};

        try {
            const bikes = await Bike.find(whereConditions).sort(order).limit(limit).skip(offset);
            const count = await Bike.countDocuments(whereConditions);
            return res.json({ rows: bikes, count }); // Изменяем на rows для соответствия Redux
        } catch (e) {
            console.error('Ошибка при получении велосипедов:', e); // Логирование ошибки для отладки
            return res.status(500).json({ error: e.message });
        }
    }

    async getBikeOne(req, res) {
        const { id } = req.params;
        const bike = await Bike.findById(id);
        if (!bike) {
            return res.status(404).json({ error: 'Запись о велосипеде не найдена' });
        }
        return res.json(bike);
    }

    async deleteBike(req, res) {
        const { id } = req.params;

        try {
            const bike = await Bike.findById(id);
            if (!bike) {
                return res.status(404).json({ error: 'Запись о велосипеде не найдена' });
            }

            console.log("img", bike.img);
            if (bike.img) {
                const imagePath = path.resolve(__dirname, '..', 'static', bike.img);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении изображения:', err);
                    }
                });
            }

            // Удаление велосипеда
            await Bike.findByIdAndDelete(id);

            return res.json({ message: 'Запись о велосипеде успешно удалена' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Не удалось удалить велосипед' });
        }
    }

    async editBike(req, res) {
        try {
            const { id_type_bike, id_category_bike, name, price, model, brand, description, inSell } = req.body;
            const { id } = req.params;
            console.log("Редактирование велосипеда с id:", id);


            const bike = await Bike.findById(id);
            if (!bike) {
                return res.status(404).json({ error: 'Запись о велосипеде не найдена' });
            }

            if (req.files && req.files.img) {
                const oldImg = bike.img;

                if (oldImg) {
                    const oldImgPath = path.resolve(__dirname, '..', 'static', oldImg);
                    fs.unlinkSync(oldImgPath);
                }

                const { img } = req.files;
                const newFileName = uuid.v4() + ".jpg";

                await img.mv(path.resolve(__dirname, '..', 'static', newFileName));

                bike.img = newFileName; // Обновляем имя файла в документе
            }

            bike.id_type_bike = id_type_bike;
            bike.id_category_bike = id_category_bike;
            bike.name = name;
            bike.price = price;
            bike.model = model;
            bike.brand = brand;
            bike.inSell = inSell;
            bike.description = description;

            await bike.save(); // Сохраняем изменения в документе

            return res.json({ message: 'Велосипед обновлен успешно' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Не удалось обновить велосипед' });
        }
    }
}

module.exports = new BikeController();