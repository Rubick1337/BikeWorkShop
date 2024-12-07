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
                const { email, password, name, surname, adress, role } = req.body;
                if (!email.trim() || !password.trim() || !name.trim() || !surname.trim() || !adress.trim()) {
                    return res.status(400).json({ message: "Все поля должны быть заполнены"});
                }
                const errors = validationResult(req);
                if(!errors.isEmpty()) {
                    return res.status(400).json({ message: "Ошибка валидации пароль от 3 до 32 или неправильно введена почта"});
                }
                const userData = await userService.register(email, password, name, surname, adress, role);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            } catch (e) {
                console.error(e);
                next(ApiError.Internal(e.message));  // Передаем ошибку в обработчик ошибок
                if (e.message.includes('с такой почтой')) {
                    return res.status(409).json({ message: e.message });
                }
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
            // Получаем refresh token из cookies
            const { refreshToken } = req.cookies;
            console.log('refreshToken из куки', refreshToken);
            if (!refreshToken) {
                throw ApiError.unauthorized("Refresh token not found");
            }

            // Вызываем сервис для обновления токенов
            const userData = await userService.refresh(refreshToken);

            // Устанавливаем новый refresh token в cookies
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
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
