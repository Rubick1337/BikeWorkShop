const uuid = require("uuid")
const path = require("path")
const {Bike} = require("../Models/models");
const ApiError = require("../Exception/ApiError");

class BikeController {
    async createBike(req, res,next){
        try{
            const {id_type_bike,id_category_bike,name,price,model,brand,inSell} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..','static',fileName))

            const bike = await Bike.create({id_type_bike,id_category_bike,name,price,model,brand,inSell,img: fileName})

            return res.json(bike)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }

    }
    // вывод с фильтрацией по типу и категории велосипеда с пингинацией
    async getBikeAll(req,res){
        let {id_type_bike,id_category_bike,limit,page} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let bikes;
        if(!id_type_bike && !id_category_bike){
            bikes = await Bike.findAndCountAll({limit,offset})
        }
        if(id_type_bike && !id_category_bike){
            bikes = await Bike.findAndCountAll({where:{id_type_bike},limit,offset})
        }
        if(!id_type_bike && id_category_bike){
            bikes = await Bike.findAndCountAll({where:{id_category_bike},limit,offset})
        }
        if(id_type_bike && id_category_bike){
            bikes = await Bike.findAndCountAll({where:{id_category_bike,id_type_bike},limit,offset})
        }
        return res.json(bikes)
    }
    async getBikeOne(req,res){
        const {id } = req.params
        const bike = await Bike.findOne(
            {
                where:{id}
            }
        )
        return res.json(bike)
    }
    async deleteBike(req,res){
        const { id } = req.params;

        try {
            const bike = await Bike.findByPk(id);
            if (!bike) {
                return res.status(404).json({ error: 'Bike record not found' });
            }

            await bike.destroy();
            return res.json({ message: 'Bike record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete Bike' });
        }
    }
    async editBike(req,res){
        try {

            const { id,id_type_bike,id_category_bike,name,price,model,brand,inSell } = req.body;

            const bike = await Bike.findByPk(id);
            if (!bike) {
                return res.status(404).json({ error: 'bike rec not found' });
            }

            await bike.update({ id_type_bike,id_category_bike,name,price,model,brand,inSell });
            return res.json({ message: 'bike updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update bike' });
        }
    }
}
module.exports = new BikeController()