const ApiError = require('../Exception/ApiError');
const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const { User } = require("../Models/models"); // Импорт модели пользователя
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, name, surname, adress, role } = req.body;
            console.log(email, password, name, surname, adress, role)
            // Проверка на пустые поля
            if (!email.trim() || !password.trim() || !name.trim() || !surname.trim() || !adress.trim()) {
                return res.status(400).json({ message: "Все поля должны быть заполнены" });
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
            return res.json(userData);

        } catch (e) {
            console.error(e);
            if (e.message.includes('с такой почтой')) {
                return res.status(409).json({ message: e.message });
            }
            next(ApiError.Internal(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                throw ApiError.unauthorized("Refresh token not found");
            }
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            return res.json(user);
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const users = await User.find({ role: { $ne: 'владелец' } })
                .limit(Number(limit))
                .skip(Number(offset));

            const totalCount = await User.countDocuments({ role: { $ne: 'владелец' } });

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
            const { role } = req.body;
            console.log(userId,role)
            if (!role) {
                return res.status(400).json({ message: "Роль не может быть пустой" });
            }

            const user = await User.findById(userId);
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