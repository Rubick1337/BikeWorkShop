const { TypeService } = require("../Models/models"); // Предполагается, что у вас есть модель TypeService для Mongoose

class TypeServiceController {
    // Создание нового типа услуги
    async createTypeService(req, res, next) {
        const { name } = req.body;
        try {
            const type = await TypeService.create({ name });
            return res.json(type);
        } catch (error) {
            next(new Error(error.message)); // Обработка ошибок
        }
    }

    // Получение всех типов услуг
    async getTypeServiceAll(req, res) {
        try {
            const types = await TypeService.find();
            return res.json(types);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении типов услуг' });
        }
    }

    // Получение одного типа услуги по ID
    async getTypeServiceOne(req, res) {
        const { id } = req.params;
        try {
            const typeService = await TypeService.findById(id);
            if (!typeService) {
                return res.status(404).json({ error: 'Тип услуги не найден' });
            }
            return res.json(typeService);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении типа услуги' });
        }
    }

    // Удаление типа услуги
    async deleteTypeService(req, res) {
        const { id } = req.query;

        try {
            const type = await TypeService.findById(id);
            if (!type) {
                return res.status(404).json({ error: 'Запись типа не найдена' });
            }

            await TypeService.findByIdAndDelete(id);
            return res.json({ message: 'Запись типа успешно удалена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось удалить тип' });
        }
    }

    // Редактирование типа услуги
    async editTypeService(req, res) {
        const { id } = req.params;
        try {
            const { name } = req.body;

            const type = await TypeService.findById(id);
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

module.exports = new TypeServiceController();