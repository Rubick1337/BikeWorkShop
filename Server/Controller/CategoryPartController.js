const {CategoryPart} = require("../Models/models");
const ApiError = require("../Exception/ApiError");

class CategoryPartController {
    async createCategoryPart(req, res){
        const {name} = req.body;
        const category = await CategoryPart.create({name})
        return res.json(category)
    }
    async getCategoryPartAll(req,res){
        const categories = await CategoryPart.findAll()
        return res.json(categories)
    }
    async getCategoryPartOne(req,res,next){
        const {id } = req.params
        if(id == null)
        {
            return next(ApiError.badRequest("Id is required"))
        }
        const category = await CategoryPart.findOne(
            {
                where:{id}
            }
        )
        return res.json(category)
    }
    async deleteCategoryPart(req,res){
        const { id } = req.query;

        try {
            const category = await CategoryPart.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'category record not found' });
            }

            await category.destroy();
            return res.json({ message: 'category record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete category' });
        }
    }
    async editCategoryPart(req,res){
        const { id } = req.params;
        try {

            const { name } = req.body;

            const category = await CategoryPart.findByPk(id);
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
module.exports = new CategoryPartController()