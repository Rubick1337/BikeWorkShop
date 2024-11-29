const uuid = require("uuid");
const path = require("path");
const {Part} = require("../Models/models");
const ApiError = require("../Exception/ApiError");

class PartController {
    async creatPart(req, res,next){
        try{
            const {id_type_part,id_category_part,name,price,model,brand,inSell} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..','static',fileName))

            const part = await Part.create({id_type_part,id_category_part,name,price,model,brand,inSell,img: fileName})

            return res.json(part)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getPartAll(req,res){
        let {id_type_part,id_category_part,limit,page} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let parts;
        if(!id_type_part && !id_category_part){
            parts = await Part.findAndCountAll({limit,offset})
        }
        if(id_type_part && !id_category_part){
            parts = await Part.findAndCountAll({where:{id_type_part},limit,offset})
        }
        if(!id_type_part && id_category_part){
            parts = await Part.findAndCountAll({where:{id_category_part},limit,offset})
        }
        if(id_type_part && id_category_part){
            parts = await Part.findAndCountAll({where:{id_category_part,id_type_part},limit,offset})
        }
        return res.json(parts)
    }
    async getPartOne(req,res){
        const {id } = req.params
        const part = await Part.findOne(
            {
                where:{id}
            }
        )
        return res.json(part)
    }
    async deletePart(req,res){
        const { id } = req.params;

        try {
            const part = await Part.findByPk(id);
            if (!part) {
                return res.status(404).json({ error: 'part record not found' });
            }

            await part.destroy();
            return res.json({ message: 'part record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete part' });
        }
    }
    async editPart(req,res){
        try {

            const { id,id_type_part,id_category_part,name,price,model,brand,inSell} = req.body;

            const part = await Part.findByPk(id);
            if (!part) {
                return res.status(404).json({ error: 'part rec not found' });
            }

            await part.update({id_type_part,id_category_part,name,price,model,brand,inSell});
            return res.json({ message: 'part updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update part' });
        }
    }
}
module.exports = new PartController()