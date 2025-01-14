const { CategoryPart } = require("../Models/models");
const ApiError = require("../Exception/ApiError");

class CategoryPartController {
    async createCategoryPart(req, res) {
        try {
            const { name } = req.body;
            const category = await CategoryPart.create({ name });
            return res.json(category);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при создании категории' });
        }
    }

    async getCategoryPartAll(req, res) {
        try {
            const categories = await CategoryPart.find();
            return res.json(categories);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении категорий' });
        }
    }

    async getCategoryPartOne(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("Id is required"));
        }

        try {
            const category = await CategoryPart.findById(id);
            if (!category) {
                return res.status(404).json({ error: 'Запись категории не найдена' });
            }
            return res.json(category);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении категории' });
        }
    }

    async deleteCategoryPart(req, res) {
        const { id } = req.query;

        try {
            const category = await CategoryPart.findById(id);
            if (!category) {
                return res.status(404).json({ error: 'Запись категории не найдена' });
            }

            await category.remove();
            return res.json({ message: 'Запись категории успешно удалена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось удалить категорию' });
        }
    }

    async editCategoryPart(req, res) {
        const { id } = req.params;

        try {
            const { name } = req.body;
            const category = await CategoryPart.findById(id);

            if (!category) {
                return res.status(404).json({ error: 'Запись категории не найдена' });
            }

            category.name = name;
            await category.save(); // Сохраняем изменения

            return res.json({ message: 'Категория обновлена успешно' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось обновить категорию' });
        }
    }
}

module.exports = new CategoryPartController();