const ApiError = require('../Exception/ApiError');
const userService = require('../service/user-service');
const {validationResult } = require('express-validator');
const {User, CategoryBike} = require("../Models/models");
const {where} = require("sequelize");
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка валидации",errors.array()));
            }
            const { email, password, name, surname, adress, role } = req.body;
            const userData = await userService.register(email, password, name, surname, adress, role);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));  // Передаем ошибку в обработчик ошибок
        }
    }

    async login(req, res, next) {
        try {
            const { email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message)); // Передаем ошибку в обработчик
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await  userService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message)); // Передаем ошибку в обработчик
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await  userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData)
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message)); // Передаем ошибку в обработчик
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await User.findAll()
            return res.json(users)
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message)); // Передаем ошибку в обработчик
        }
    }
}

module.exports = new UserController();
