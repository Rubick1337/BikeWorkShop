    const uuid = require("uuid")
    const path = require("path")
    const {Bike} = require("../Models/models");
    const ApiError = require("../Exception/ApiError");
    const Sequelize = require("sequelize");
    const fs = require("fs");

    class BikeController {
        async createBike(req, res,next){
            console.log("Запрос на создание велосипеда:", req.body);
            console.log("Файлы в запросе:", req.files);
            try{
                const {id_type_bike,id_category_bike,name,price,model,brand,inSell} = req.body;
                const {img} = req.files;
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..','static',fileName))

                const bike = await Bike.create({id_type_bike,id_category_bike,name,price,model,brand,inSell,img: fileName})

                return res.json(bike)
            }
            catch (e){
                next(ApiError.badRequest(e.message))
            }

        }
        async getBikeAll(req, res) {
            let { id_type_bike, id_category_bike, searchQuery, minPrice, maxPrice, limit, page, sortPrice } = req.query;
            console.log("Filter parameters:", { id_type_bike, id_category_bike, minPrice, maxPrice, searchQuery });
            // Дефолтные значения для пагинации и сортировки
            page = page || 1;
            limit = limit || 5;
            let offset = (page - 1) * limit;

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
                const bikes = await Bike.findAndCountAll({
                    where: whereConditions,
                    limit,
                    offset,
                    order
                });
                return res.json(bikes);
            } catch (e) {
                return res.status(500).json({ error: e.message });
            }
        }

        async getBikeOne(req,res){
            const {id } = req.params
            const bike = await Bike.findOne(
                {
                    where:{id}
                }
            )
            return res.json(bike)
        }
        async deleteBike(req, res) {
            const { id } = req.params;

            try {
                const bike = await Bike.findByPk(id);
                if (!bike) {
                    return res.status(404).json({ error: 'Запись о велосипеде не найдена' });
                }
                console.log("img" +bike.img)
                if (bike.img) {
                    const imagePath = path.resolve(__dirname, '..', 'static', bike.img);
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error('Ошибка при удалении изображения:', err);
                        }
                    });
                }

                // Удаляем саму запись о велосипеде
                await bike.destroy();
                return res.json({ message: 'Запись о велосипеде успешно удалена' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Не удалось удалить велосипед' });
            }
        }
        async editBike(req, res) {
            try {
                const { id_type_bike, id_category_bike, name, price, model, brand, inSell } = req.body;
                const { id } = req.params;
                console.log("Редактирование велосипеда с id: " + id);

                const bike = await Bike.findByPk(id);
                if (!bike) {
                    return res.status(404).json({ error: 'Bike not found' });
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

                    await bike.update({
                        id_type_bike,
                        id_category_bike,
                        name,
                        price,
                        model,
                        brand,
                        inSell,
                        img: newFileName,
                    });
                } else {
                    await bike.update({ id_type_bike, id_category_bike, name, price, model, brand, inSell });
                }

                return res.json({ message: 'Bike updated successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to update bike' });
            }
        }
    }
    module.exports = new BikeController()