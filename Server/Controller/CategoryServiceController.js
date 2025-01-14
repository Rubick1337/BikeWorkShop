const { CategoryService } = require('../Models/models');
const ApiError = require("../Exception/ApiError");

class CategoryServiceController {
    async createCategoryService(req, res) {
        try {
            const { name } = req.body;
            const category = await CategoryService.create({ name });
            return res.json(category);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при создании категории услуги' });
        }
    }

    async getCategoryServiceAll(req, res) {
        try {
            const categories = await CategoryService.find();
            return res.json(categories);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении категорий услуг' });
        }
    }

    async getCategoryServiceOne(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("Id is required"));
        }

        try {
            const category = await CategoryService.findById(id);
            if (!category) {
                return res.status(404).json({ error: 'Запись категории услуги не найдена' });
            }
            return res.json(category);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении категории услуги' });
        }
    }

    async deleteCategoryService(req, res) {
        const { id } = req.query;

        try {
            const category = await CategoryService.findById(id);
            if (!category) {
                return res.status(404).json({ error: 'Запись категории услуги не найдена' });
            }

            await category.remove();
            return res.json({ message: 'Запись категории услуги успешно удалена' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось удалить категорию услуги' });
        }
    }

    async editCategoryService(req, res) {
        const { id } = req.params;

        try {
            const { name } = req.body;
            const category = await CategoryService.findById(id);

            if (!category) {
                return res.status(404).json({ error: 'Запись категории услуги не найдена' });
            }

            category.name = name;
            await category.save(); // Сохраняем изменения

            return res.json({ message: 'Категория услуги обновлена успешно' });
        } catch (error) {
            return res.status(500).json({ error: 'Не удалось обновить категорию услуги' });
        }
    }
}

module.exports = new CategoryServiceController();