const { CategoryBike } = require("../Models/models");
const ApiError = require("../Exception/ApiError");

class CategoryBikeController {
    async createCategoryBike(req, res) {
        try {
            const { name } = req.body;
            const category = await CategoryBike.create({ name });
            return res.json(category);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при создании категории' });
        }
    }

    async getCategoryBikeAll(req, res) {
        try {
            const categories = await CategoryBike.find();
            return res.json(categories);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении категорий' });
        }
    }

    async getCategoryBikeOne(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("Id is required"));
        }

        try {
            const category = await CategoryBike.findById(id);
            if (!category) {
                return res.status(404).json({ error: 'Запись категории не найдена' });
            }
            return res.json(category);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении категории' });
        }
    }

    async deleteCategoryBike(req, res) {
        const { id } = req.query;

        try {
            const category = await CategoryBike.findById(id);
            if (!category) {
                return res.status(404).json({ error: 'Запись категории не найдена' });
            }

            await category.remove();
            return res.json({ message: 'Запись категории успешно удалена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось удалить категорию' });
        }
    }

    async editCategoryBike(req, res) {
        const { id } = req.params;

        try {
            const { name } = req.body;
            const category = await CategoryBike.findById(id);

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

module.exports = new CategoryBikeController();