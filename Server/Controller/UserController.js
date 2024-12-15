const ApiError = require('../Exception/ApiError');
const userService = require('../service/user-service');
const {validationResult } = require('express-validator');
const {User, CategoryBike} = require("../Models/models");
const {where} = require("sequelize");
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");
const { Op } = require('sequelize');
class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, name, surname, adress, role } = req.body;

            // Проверка на пустые поля
            if (!email.trim() || !password.trim() || !name.trim() || !surname.trim() || !adress.trim()) {
                return res.status(400).json({ message: "Все поля должны быть заполнены, пустых не может быть" });
            }

            // Валидация
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка валидации: пароль от 3 до 32 символов или неправильно введена почта" });
            }

            // Регистрация пользователя
            const userData = await userService.register(email, password, name, surname, adress, role);

            // Установка cookie с refreshToken
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            // Отправка успешного ответа
            return res.json(userData);  // Ответ отправляется один раз

        } catch (e) {
            console.error(e);

            // Если ошибка связана с уже существующим пользователем, то передаем ошибку с кодом 409
            if (e.message.includes('с такой почтой')) {
                return res.status(409).json({ message: e.message });
            }

            // В других случаях передаем ошибку в middleware для обработки
            next(ApiError.Internal(e.message));
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
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const users = await User.findAll({
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    role: {
                        [Op.ne]: 'владелец',
                    }
                }
            });

            const totalCount = await User.count({
                where: {
                    role: {
                        [Op.ne]: 'владелец',
                    }
                }
            });

            return res.json({
                rows: users,
                count: totalCount
            });
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));
        }
    }


    async updateRole(req, res, next) {
        try {
            const { id: userId } = req.params;
            console.log(userId + "dassdasdadsadsa");
            const { role } = req.body;
            console.log(role,userId + "dassdasdadsadsa");
            if (!role) {
                return res.status(400).json({ message: "Роль не может быть пустой" });
            }

            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            user.role = role;
            await user.save();

            return res.json({ message: "Роль пользователя обновлена", user });
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));
        }
    }
}

module.exports = new UserController();
