const {CategoryService} = require('../Models/models');
const ApiError = require("../Exception/ApiError");


class CategoryServiceController {
    async createCategoryService(req, res){
        const {name} = req.body;
        const category = await CategoryService.create({name})
        return res.json(category)
    }
    async getCategoryServiceAll(req,res){
        const categories = await CategoryService.findAll()
        return res.json(categories)
    }
    async getCategoryServiceOne(req,res,next){
        const {id } = req.params
        if(id == null)
        {
            return next(ApiError.badRequest("Id is required"))
        }
        const category = await CategoryService.findOne(
            {
                where:{id}
            }
        )
        return res.json(category)
    }
    async deleteCategoryService(req,res){
        const { id } = req.query;

        try {
            const category = await CategoryService.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'category record not found' });
            }

            await category.destroy();
            return res.json({ message: 'category record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete category' });
        }
    }
    async editCategoryService(req,res){
        const { id } = req.params;
        try {

            const { name } = req.body;

            const category = await CategoryService.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'category rec not found' });
            }

            await category.update({ name });
            return res.json({ message: 'category updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update category' });
        }
    }
}
module.exports = new CategoryServiceController()