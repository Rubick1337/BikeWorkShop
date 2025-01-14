const { TypeBike } = require("../Models/models"); // Предполагается, что у вас есть модель TypeBike для Mongoose
const ApiError = require("../Exception/ApiError");

class TypeBikeController {
    // Создание нового типа велосипеда
    async createTypeBike(req, res, next) {
        const { name } = req.body;
        try {
            const type = await TypeBike.create({ name });
            return res.json(type);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    // Получение всех типов велосипедов
    async getTypeBikeAll(req, res) {
        try {
            const types = await TypeBike.find();
            return res.json(types);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении типов велосипедов' });
        }
    }

    // Получение одного типа велосипеда по ID
    async getTypeBikeOne(req, res) {
        const { id } = req.params;
        try {
            const typeBike = await TypeBike.findById(id);
            if (!typeBike) {
                return res.status(404).json({ error: 'Тип велосипеда не найден' });
            }
            return res.json(typeBike);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении типа велосипеда' });
        }
    }

    // Удаление типа велосипеда
    async deleteTypeBike(req, res) {
        const { id } = req.query;

        try {
            const type = await TypeBike.findById(id);
            if (!type) {
                return res.status(404).json({ error: 'Запись типа не найдена' });
            }

            await TypeBike.findByIdAndDelete(id);
            return res.json({ message: 'Запись типа успешно удалена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось удалить тип' });
        }
    }

    // Редактирование типа велосипеда
    async editTypeBike(req, res) {
        const { id } = req.params;
        try {
            const { name } = req.body;

            const type = await TypeBike.findById(id);
            if (!type) {
                return res.status(404).json({ error: 'Тип не найден' });
            }

            type.name = name;
            await type.save();
            return res.json({ message: 'Тип успешно обновлен' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось обновить тип' });
        }
    }
}

module.exports = new TypeBikeController();