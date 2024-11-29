
const {Service} = require("../Models/models");
const ApiError = require("../Exception/ApiError");

class ServiceController {
    async creatService(req, res, next) {
        try{
            const {id_type_service,id_category_service,name,price} = req.body;

            const service = await Service.create({id_type_service,id_category_service,name,price})

            return res.json(service)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getServiceAll(req,res){
        let {id_type_service,id_category_service,limit,page} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let services;
        if(!id_type_service && !id_category_service){
            services = await Service.findAndCountAll({limit,offset})
        }
        if(id_type_service && !id_category_service){
            services = await Service.findAndCountAll({where:{id_type_service},limit,offset})
        }
        if(!id_type_service && id_category_service){
            services = await Service.findAndCountAll({where:{id_category_service},limit,offset})
        }
        if(id_type_service && id_category_service){
            services = await Service.findAndCountAll({where:{id_category_service,id_type_service},limit,offset})
        }
        return res.json(services)
    }
    async getServiceOne(req,res){
        const {id } = req.params
        const service = await Service.findOne(
            {
                where:{id}
            }
        )
        return res.json(service)
    }
    async deleteService(req,res){
        const { id } = req.params;

        try {
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'service record not found' });
            }

            await service.destroy();
            return res.json({ message: 'service record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete service' });
        }
    }
    async editService(req,res){
        try {

            const { id_type_service,id_category_service,name,price} = req.body;

            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'service rec not found' });
            }

            await service.update({ id_type_service,id_category_service,name,price });
            return res.json({ message: 'service updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update service' });
        }
    }
}
module.exports = new ServiceController()