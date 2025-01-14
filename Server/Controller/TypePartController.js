const { TypePart } = require("../Models/models"); // Предполагается, что у вас есть модель TypePart для Mongoose
const ApiError = require("../Exception/ApiError");

class TypePartController {
    // Создание нового типа части
    async createTypePart(req, res, next) {
        const { name } = req.body;
        try {
            const type = await TypePart.create({ name });
            return res.json(type);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    // Получение всех типов частей
    async getTypePartAll(req, res) {
        try {
            const types = await TypePart.find();
            return res.json(types);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении типов частей' });
        }
    }

    // Получение одного типа части по ID
    async getTypePartOne(req, res) {
        const { id } = req.params;
        try {
            const typePart = await TypePart.findById(id);
            if (!typePart) {
                return res.status(404).json({ error: 'Тип части не найден' });
            }
            return res.json(typePart);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении типа части' });
        }
    }

    // Удаление типа части
    async deleteTypePart(req, res) {
        const { id } = req.query;

        try {
            const type = await TypePart.findById(id);
            if (!type) {
                return res.status(404).json({ error: 'Запись типа не найдена' });
            }

            await TypePart.findByIdAndDelete(id);
            return res.json({ message: 'Запись типа успешно удалена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось удалить тип' });
        }
    }

    // Редактирование типа части
    async editTypePart(req, res) {
        const { id } = req.params;
        try {
            const { name } = req.body;

            const type = await TypePart.findById(id);
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

module.exports = new TypePartController();