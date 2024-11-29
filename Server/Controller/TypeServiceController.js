const {TypeService} = require("../Models/models")

class TypeServiceController {
    async createTypeService(req, res){
        const {name} = req.body;
        const type = await TypeService.create({name})
        return res.json(type)
    }
    async getTypeServiceAll(req,res){
        const types = await TypeService.findAll()
        return res.json(types)
    }
    async getTypeServiceOne(req,res){
        const {id } = req.params
        const typeService = await TypeService.findOne(
            {
                where:{id}
            }
        )
        return res.json(typeService)
    }
    async deleteTypeService(req,res){
        const { id } = req.query;

        try {
            const type = await TypeService.findByPk(id);
            if (!type) {
                return res.status(404).json({ error: 'type record not found' });
            }

            await type.destroy();
            return res.json({ message: 'type record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete type' });
        }
    }
    async editTypeService(req,res){
        const { id } = req.params;
        try {

            const { name } = req.body;

            const type = await TypeService.findByPk(id);
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
module.exports = new TypeServiceController()