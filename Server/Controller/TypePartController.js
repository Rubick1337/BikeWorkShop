const {TypePart} = require("../Models/models");
const ApiError = require("../Exception/ApiError");

class TypePartController {
    async createTypePart(req, res){
        const {name} = req.body;
        const type = await TypePart.create({name})
        return res.json(type)
    }
    async getTypePartAll(req,res){
        const types = await TypePart.findAll()
        return res.json(types)
    }
    async getTypePartOne(req,res){
        const {id } = req.params
        const typePart = await TypePart.findOne(
            {
                where:{id}
            }
        )
        return res.json(typePart)
    }
    async deleteTypePart(req,res){
        const { id } = req.query;

        try {
            const type = await TypePart.findByPk(id);
            if (!type) {
                return res.status(404).json({ error: 'type record not found' });
            }

            await type.destroy();
            return res.json({ message: 'type record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete type' });
        }
    }
    async editTypePart(req,res){
        const { id } = req.params;
        try {

            const { name } = req.body;

            const type = await TypePart.findByPk(id);
            if (!type) {
                return res.status(404).json({ error: 'type rec not found' });
            }

            await type.update({ name });
            return res.json({ message: 'type updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update type' });
        }
    }
}
module.exports = new TypePartController()