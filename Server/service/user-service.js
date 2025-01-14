const { User } = require("../Models/models"); // Импорт модели пользователя
const tokenService = require("./token-service");
const ApiError = require("../Exception/ApiError");
const bcrypt = require("bcryptjs");
const UserDto = require("../dtos/user-dto");

class UserService {
    async register(email, password, name, surname, adress, role) {
        const candidate = await User.findOne({ email });
        if (candidate) {
            throw new Error(`Пользователь с такой почтой ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({ email, password: hashPassword, name, surname, adress, role });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.badRequest("Пользователь не найден");
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.badRequest("Неверный пароль");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        console.log(refreshToken + " - Заход в user-service");
        if (!refreshToken) {
            throw ApiError.unauthorized("Refresh token не найден");
        }
        const tokenFromDb = await tokenService.findToken(refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!tokenFromDb || !userData) {
            throw ApiError.unauthorized("Refresh token не найден");
        }

        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();