const ApiError = require('../Exception/ApiError');

class UserController {
    async registration(req, res){

    }
    async login(req,res){

    }
    async logout(req,res){

    }
    async refresh(req,res,next){
        const  {id}=req.query;
        if(!id){
           return next(ApiError.badRequest("Не задан Id"))
        }
        res.json(id);
    }
    async getOne(req,res){

    }
    async getAll(req,res){

    }
}
module.exports = new UserController()