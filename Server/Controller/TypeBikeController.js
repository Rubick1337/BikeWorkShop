const {TypeBike, CategoryPart} = require("../Models/models");
const ApiError = require("../Exception/ApiError");

class TypeBikeController {
    async createTypeBike(req, res){
const {name} = req.body;
const type = await TypeBike.create({name})
        return res.json(type)
    }
    async getTypeBikeAll(req,res){
        const types = await TypeBike.findAll()
        return res.json(types)
    }
    async getTypeBikeOne(req,res){
        const {id } = req.params
        const typeBike = await TypeBike.findOne(
            {
                where:{id}
            }
        )
        return res.json(typeBike)
    }
    async deleteTypeBike(req,res){
        const { id } = req.query;

        try {
            const type = await TypeBike.findByPk(id);
            if (!type) {
                return res.status(404).json({ error: 'type record not found' });
            }

            await type.destroy();
            return res.json({ message: 'type record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete type' });
        }
    }
    async editTypeBike(req,res){
        const { id } = req.params;
        try {

            const { name } = req.body;

            const type = await TypeBike.findByPk(id);
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
module.exports = new TypeBikeController()