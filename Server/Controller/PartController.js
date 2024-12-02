const uuid = require("uuid");
const path = require("path");
const {Part} = require("../Models/models");
const ApiError = require("../Exception/ApiError");
const Sequelize = require("sequelize");

class PartController {
    async creatPart(req, res,next){
        try{
            const {id_type_part,id_category_part,name,price,model,brand,inSell} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..','static',fileName))

            const part = await Part.create({id_type_part,id_category_part,name,price,model,brand,inSell,img: fileName})

            return res.json(part)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getPartAll(req, res) {
        let {
            id_type_part,
            id_category_part,
            name,
            brand,
            model,
            price,
            limit,
            page,
            sortPrice
        } = req.query;

        page = page || 1;
        limit = limit || 5;
        let offset = page * limit - limit;

        // Объект условий фильтрации
        let whereConditions = {};

        // Фильтрация по типу детали
        if (id_type_part && !id_category_part) {
            whereConditions.id_type_part = id_type_part;
        }

        // Фильтрация по категории детали
        if (id_category_part && !id_type_part) {
            whereConditions.id_category_part = id_category_part;
        }

        // Фильтрация по типу и категории детали
        if (id_type_part && id_category_part) {
            whereConditions = {
                id_type_part,
                id_category_part
            };
        }

        // Поиск по имени (если введено)
        if (name) {
            whereConditions.name = {
                [Sequelize.Op.iLike]: `%${name}%`,  // Поиск по имени, игнорируя регистр
            };
        }

        // Поиск по бренду (если введено)
        if (brand) {
            whereConditions.brand = {
                [Sequelize.Op.iLike]: `%${brand}%`,
            };
        }

        // Поиск по модели (если введено)
        if (model) {
            whereConditions.model = {
                [Sequelize.Op.iLike]: `%${model}%`,
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

    async getPartOne(req,res){
        const {id } = req.params
        const part = await Part.findOne(
            {
                where:{id}
            }
        )
        return res.json(part)
    }
    async deletePart(req,res){
        const { id } = req.params;

        try {
            const part = await Part.findByPk(id);
            if (!part) {
                return res.status(404).json({ error: 'part record not found' });
            }

            await part.destroy();
            return res.json({ message: 'part record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete part' });
        }
    }
    async editPart(req,res){
        try {

            const { id,id_type_part,id_category_part,name,price,model,brand,inSell} = req.body;

            const part = await Part.findByPk(id);
            if (!part) {
                return res.status(404).json({ error: 'part rec not found' });
            }

            await part.update({id_type_part,id_category_part,name,price,model,brand,inSell});
            return res.json({ message: 'part updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update part' });
        }
    }
}
module.exports = new PartController()